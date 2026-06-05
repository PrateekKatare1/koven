import { NextRequest, NextResponse } from 'next/server'
import { parseGitHubRepo } from '@/lib/github'
import { scrapeProductUrl } from '@/lib/scraper'
import { generateCaseStudy } from '@/lib/claude'
import { supabaseAdmin, generateSlug } from '@/lib/supabase'
import { KovenInput, UnifiedData } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      githubUrl,
      xHandle,
      buildPosts,
      productUrl,
      problemStatement,
    } = body as KovenInput

    if (!githubUrl || !productUrl || !problemStatement) {
      return NextResponse.json(
        { error: 'githubUrl, productUrl and problemStatement are required' },
        { status: 400 }
      )
    }

    // Step 1: Collect all data in parallel
    const [github, og] = await Promise.all([
      parseGitHubRepo(githubUrl).catch(() => null),
      scrapeProductUrl(productUrl).catch(() => null),
    ])

    const unified: UnifiedData = {
      input: {
        githubUrl,
        xHandle: xHandle || '',
        buildPosts: buildPosts || '',
        productUrl,
        problemStatement,
      },
      github,
      og,
      collectedAt: new Date().toISOString(),
    }

    // Step 2: Generate with Claude
    const caseStudy = await generateCaseStudy(unified)

    // Step 3: Generate slug — use caseStudy.title as fallback so we never
    // produce a meaningless 'project' slug when GitHub parsing fails
    const slug = generateSlug(
      xHandle || github?.owner || 'builder',
      github?.name || caseStudy.title
    )

    // Step 4: Save to Supabase
    const { error } = await supabaseAdmin
      .from('case_studies')
      .insert({
        slug,
        title: caseStudy.title,
        one_liner: caseStudy.oneLiner,
        problem: caseStudy.problem,
        solution: caseStudy.solution,
        build_story: caseStudy.buildStory,
        technical_decisions: caseStudy.technicalDecisions,
        results: caseStudy.results,
        tech_stack: caseStudy.techStack,
        quote: caseStudy.quote,
        timeline: caseStudy.timeline,
        builder_handle: caseStudy.builderHandle,
        github_url: githubUrl,
        product_url: productUrl,
        raw_data: unified,
      })

    if (error) {
      console.error('Supabase error:', error)
      throw new Error('Failed to save case study')
    }

    return NextResponse.json({
      success: true,
      slug,
      url: `/c/${slug}`,
      caseStudy,
    })

  } catch (error: any) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Generation failed' },
      { status: 500 }
    )
  }
}
