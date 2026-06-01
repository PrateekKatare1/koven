import { OGData } from '@/types'

function extractMeta(
  html: string,
  property: string
): string | null {
  const patterns = [
    new RegExp(
      `<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`,
      'i'
    ),
    new RegExp(
      `<meta[^>]*content=["']([^"']+)["'][^>]*property=["']${property}["']`,
      'i'
    ),
    new RegExp(
      `<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']+)["']`,
      'i'
    ),
    new RegExp(
      `<meta[^>]*content=["']([^"']+)["'][^>]*name=["']${property}["']`,
      'i'
    ),
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) return match[1].trim()
  }
  return null
}

function extractTitle(html: string): string | null {
  const match = html.match(
    /<title[^>]*>([^<]+)<\/title>/i
  )
  return match?.[1]?.trim() ?? null
}

function normalizeUrl(input: string): string {
  const cleaned = input.trim()
  if (cleaned.startsWith('http')) return cleaned
  return `https://${cleaned}`
}

function sanitizeText(text: string | null): string | null {
  if (!text) return null
  return text.replace(/\s+/g, ' ').trim()
}

async function scrapeWithMicrolink(
  url: string
): Promise<OGData | null> {
  try {
    const endpoint =
      `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=false`

    const res = await fetch(endpoint, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) return null

    const data = await res.json()

    if (data.status !== 'success') return null

    const { title, description, image } = data.data

    return {
      title: title ?? null,
      description: description ?? null,
      image: image?.url ?? null,
      url,
    }
  } catch {
    return null
  }
}

async function scrapeWithJina(
  url: string
): Promise<string | null> {
  try {
    const jinaUrl = `https://r.jina.ai/${url}`
    const res = await fetch(jinaUrl, {
      headers: { 'Accept': 'text/plain' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const text = await res.text()
    return text.slice(0, 2000)
  } catch {
    return null
  }
}

export async function scrapeProductUrl(
  productUrl: string
): Promise<OGData | null> {
  try {
    const url = normalizeUrl(productUrl)

    // Layer 1: Raw HTML (fast, works for static sites)
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Koven/1.0)',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (res.ok) {
      const html = await res.text()
      const first5k = html.slice(0, 5000)

      const ogTitle =
        extractMeta(first5k, 'og:title') ??
        extractMeta(first5k, 'twitter:title') ??
        extractTitle(first5k)

      const ogDescription =
        extractMeta(first5k, 'og:description') ??
        extractMeta(first5k, 'twitter:description') ??
        extractMeta(first5k, 'description')

      const ogImage =
        extractMeta(first5k, 'og:image') ??
        extractMeta(first5k, 'twitter:image')

      // If Layer 1 got real data → return it
      if (ogTitle || ogDescription) {
        return {
          title: sanitizeText(ogTitle),
          description: sanitizeText(ogDescription),
          image: ogImage ?? null,
          url,
        }
      }
    }

    // Layer 2: Microlink (handles JS-rendered sites)
    console.log(
      `Layer 1 failed for ${url}, trying Microlink...`
    )
    const microlink = await scrapeWithMicrolink(url)
    if (microlink) return microlink

    // Layer 3: Jina Reader (last resort)
    console.log(
      `Microlink failed for ${url}, trying Jina...`
    )
    const jinaContent = await scrapeWithJina(url)
    if (jinaContent) {
      return {
        title: url,
        description: jinaContent.slice(0, 200),
        image: null,
        url,
      }
    }

    return null
  } catch {
    return null
  }
}

export { scrapeWithJina }
