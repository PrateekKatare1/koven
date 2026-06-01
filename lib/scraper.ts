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

export async function scrapeProductUrl(
  productUrl: string
): Promise<OGData | null> {
  try {
    const url = normalizeUrl(productUrl)

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Koven/1.0)',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) return null

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

    return {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      url,
    }
  } catch {
    return null
  }
}
