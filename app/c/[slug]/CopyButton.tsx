'use client'

export function CopyButton({ slug }: { slug: string }) {
  return (
    <button
      onClick={() =>
        navigator.clipboard.writeText(`https://trykoven.com/c/${slug}`)
      }
      className="border border-white/10 text-gray-400 text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      Copy link
    </button>
  )
}
