export interface KovenInput {
  githubUrl: string
  xHandle: string
  buildPosts: string
  productUrl: string
  problemStatement: string
}

export interface OGData {
  title: string | null
  description: string | null
  image: string | null
  url: string
}

export interface UnifiedData {
  input: KovenInput
  github: {
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
  } | null
  og: OGData | null
  collectedAt: string
}
