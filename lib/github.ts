const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const headers: HeadersInit = {
  'Accept': 'application/vnd.github.v3+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(GITHUB_TOKEN && {
    'Authorization': `Bearer ${GITHUB_TOKEN}`
  }),
}

export interface GitHubData {
  name: string
  description: string | null
  readme: string | null
  primaryLanguage: string | null
  languages: string[]
  stars: number
  forks: number
  topics: string[]
  commitCount: number
  daysActive: number
  lastPushed: string
  repoUrl: string
  homepageUrl: string | null
  createdAt: string
  owner: string
}

function parseGitHubUrl(input: string): {
  owner: string; repo: string
} | null {
  try {
    const cleaned = input
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/^github\.com\//, '')
      .replace(/\.git$/, '')
      .split('?')[0]
      .split('#')[0]
      .trim()

    const parts = cleaned.split('/').filter(Boolean)
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] }
    }
    return null
  } catch {
    return null
  }
}

async function fetchReadme(
  owner: string,
  repo: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers }
    )
    if (!res.ok) return null
    const data = await res.json()
    const decoded = Buffer
      .from(data.content, 'base64')
      .toString('utf-8')
    return decoded.slice(0, 3000)
  } catch {
    return null
  }
}

async function fetchCommitCount(
  owner: string,
  repo: string
): Promise<number> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
      { headers }
    )
    if (!res.ok) return 0

    const link = res.headers.get('link')
    if (!link) {
      const data = await res.json()
      return Array.isArray(data) ? data.length : 0
    }
    const match = link.match(/page=(\d+)>; rel="last"/)
    return match ? parseInt(match[1]) : 0
  } catch {
    return 0
  }
}

async function fetchLanguages(
  owner: string,
  repo: string
): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      { headers }
    )
    if (!res.ok) return []
    const data = await res.json()
    return Object.keys(data)
  } catch {
    return []
  }
}

export async function parseGitHubRepo(
  repoUrl: string
): Promise<GitHubData | null> {
  const parsed = parseGitHubUrl(repoUrl)
  if (!parsed) return null

  const { owner, repo } = parsed

  const repoRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers }
  )

  if (!repoRes.ok) {
    if (repoRes.status === 404) {
      throw new Error(
        'Repository not found or is private'
      )
    }
    throw new Error(
      `GitHub API error: ${repoRes.status}`
    )
  }

  const repoData = await repoRes.json()

  const [readme, commitCount, languages] =
    await Promise.all([
      fetchReadme(owner, repo),
      fetchCommitCount(owner, repo),
      fetchLanguages(owner, repo),
    ])

  const created = new Date(repoData.created_at)
  const now = new Date()
  const daysActive = Math.floor(
    (now.getTime() - created.getTime())
    / (1000 * 60 * 60 * 24)
  )

  return {
    name: repoData.name,
    description: repoData.description,
    readme,
    primaryLanguage: repoData.language,
    languages,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    topics: repoData.topics || [],
    commitCount,
    daysActive,
    lastPushed: repoData.pushed_at,
    repoUrl: repoData.html_url,
    homepageUrl: repoData.homepage || null,
    createdAt: repoData.created_at,
    owner,
  }
}
