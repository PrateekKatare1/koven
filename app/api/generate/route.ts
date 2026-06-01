import { NextRequest, NextResponse } from 'next/server'
import { parseGitHubRepo } from '@/lib/github'
import { scrapeProductUrl } from '@/lib/scraper'
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
        {
          error:
            'githubUrl, productUrl, and ' +
            'problemStatement are required',
        },
        { status: 400 }
      )
    }

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

    return NextResponse.json({
      success: true,
      data: unified,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Generation failed' },
      { status: 500 }
    )
  }
}
