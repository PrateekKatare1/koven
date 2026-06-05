import Anthropic from '@anthropic-ai/sdk'
import { UnifiedData } from '@/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface CaseStudy {
  title: string
  oneLiner: string
  problem: string
  solution: string
  buildStory: string
  technicalDecisions: string[]
  results: string
  techStack: string[]
  quote: string
  timeline: string
  builderHandle: string
}

function buildPrompt(data: UnifiedData): string {
  const { input, github, og } = data

  const githubContext = github ? `
GITHUB REPOSITORY DATA:
- Project name: ${github.name}
- Description: ${github.description ?? 'not provided'}
- Primary language: ${github.primaryLanguage ?? 'unknown'}
- All languages: ${github.languages.join(', ')}
- Total commits: ${github.commitCount}
- Days active: ${github.daysActive} days
- Stars: ${github.stars}
- Topics: ${github.topics.join(', ') || 'none'}
- Live URL: ${github.homepageUrl ?? 'none'}
- README excerpt:
${github.readme ? github.readme.slice(0, 1500) : 'No README available'}
` : 'No GitHub data available'

  const ogContext = og?.title ? `
LIVE PRODUCT DATA:
- Page title: ${og.title}
- Description: ${og.description ?? 'none'}
- Product URL: ${og.url}
` : ''

  const buildPostsContext = input.buildPosts ? `
BUILD-IN-PUBLIC POSTS (written by the builder while building):
${input.buildPosts}

IMPORTANT: These posts contain the real decisions, pivots,
struggles, and breakthroughs. Use this language and these
specific details in the buildStory field. This is what makes
the output sound authentic — not generic.
` : ''

  return `You are writing a case study for a software developer
or indie builder. Your output must sound like the builder wrote
it themselves — honest, technical, specific, and human.

NOT corporate. NOT marketing speak. NOT "leverages cutting-edge
technology." Write like a builder talking to other builders.

Here is everything you know about this project:

PROBLEM STATEMENT (in the builder's own words):
${input.problemStatement}

BUILDER'S X HANDLE: @${input.xHandle || 'unknown'}

${githubContext}
${ogContext}
${buildPostsContext}

Write a case study and return ONLY a valid JSON object.
No markdown. No backticks. No preamble. No explanation.
Start your response with { and end with }.

The JSON must follow this exact schema:

{
  "title": "The project name, clean and simple",

  "oneLiner": "One sentence. What it does and who it's for.
               Max 15 words. No jargon.",

  "problem": "2-3 sentences describing the real problem this
              solves. Use the builder's language from their
              posts and problem statement. Make the reader
              feel the pain before reading the solution.",

  "solution": "2-3 sentences. What was built and how it solves
               the problem. Technical but readable. Mention the
               core technical approach without being a spec doc.",

  "buildStory": "3-5 sentences narrative of how this actually
                 got built. Pull from the build-in-public posts
                 for specific decisions, pivots, and moments.
                 Include the messy reality — what broke, what
                 was rewritten, what shipped anyway. This is the
                 most important field. Make it sound human.",

  "technicalDecisions": [
    "One specific technical decision made during the build",
    "Why one technology was chosen over another",
    "One architectural choice and the reasoning",
    "One thing that was cut or simplified and why"
  ],

  "results": "What happened after launch. Users, downloads,
              feedback, metrics. If no data available write
              what the builder was aiming for instead.",

  "techStack": ["Language1", "Framework1", "Tool1"],

  "quote": "One powerful sentence that captures the whole
            project. The kind of line someone would screenshot
            and share. Pull from the build posts if possible.",

  "timeline": "X days to ship / X weeks to ship",

  "builderHandle": "@${input.xHandle || 'builder'}"
}

Remember: write like a builder, not a marketer.
Specific details beat generic statements every time.
If build posts are provided — use their exact language.
Return ONLY the JSON object.`
}

export async function generateCaseStudy(
  data: UnifiedData
): Promise<CaseStudy> {
  const prompt = buildPrompt(data)

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const raw = content.text.trim()

  const jsonStart = raw.indexOf('{')
  const jsonEnd = raw.lastIndexOf('}')

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('Claude did not return valid JSON')
  }

  const jsonStr = raw.slice(jsonStart, jsonEnd + 1)

  try {
    const parsed = JSON.parse(jsonStr) as CaseStudy
    return parsed
  } catch {
    throw new Error('Failed to parse Claude JSON output')
  }
}
