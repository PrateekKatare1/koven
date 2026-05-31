import { NextRequest, NextResponse } from 'next/server'
import { parseGitHubRepo } from '@/lib/github'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { repoUrl } = body

    if (!repoUrl) {
      return NextResponse.json(
        { error: 'repoUrl is required' },
        { status: 400 }
      )
    }

    const data = await parseGitHubRepo(repoUrl)

    if (!data) {
      return NextResponse.json(
        { error: 'Could not parse this GitHub URL' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Parser failed' },
      { status: 500 }
    )
  }
}
