'use client'

import { useState } from 'react'

export function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="border border-white/10
        text-gray-400 text-sm px-4 py-2
        rounded-lg hover:bg-white/5
        transition-colors"
    >
      {copied ? 'Copied! ✓' : 'Copy link'}
    </button>
  )
}
