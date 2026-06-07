'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import type { CaseStudy } from '@/lib/claude'
import { EmailGate } from '@/components/ui/email-gate'

const LOADING_STATES = [
  'Reading your commits...',
  'Scraping your product...',
  'Pulling your build posts...',
  'Writing your story...',
  'Almost there...',
]

function DashboardContent() {
  const searchParams = useSearchParams()

  const [sessionChecked, setSessionChecked] = useState(false)
  const [sessionVerified, setSessionVerified] = useState(false)

  const [form, setForm] = useState({
    githubUrl: '',
    xHandle: '',
    buildPosts: '',
    productUrl: '',
    problemStatement: '',
  })

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [result, setResult] = useState<{
    slug: string
    caseStudy: CaseStudy
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session')

    if (!sessionId) {
      setSessionChecked(true)
      return
    }

    fetch('/api/verify-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkoutId: sessionId }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.paid) setSessionVerified(true)
      })
      .catch(() => {})
      .finally(() => setSessionChecked(true))
  }, [searchParams])

  const handleSubmit = async () => {
    if (!form.githubUrl || !form.productUrl || !form.problemStatement) {
      setError('GitHub URL, product URL, and problem statement are required.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    let i = 0
    setLoadingText(LOADING_STATES[0])
    const interval = setInterval(() => {
      i = Math.min(i + 1, LOADING_STATES.length - 1)
      setLoadingText(LOADING_STATES[i])
    }, 2000)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      let data: any
      try {
        data = await res.json()
      } catch {
        throw new Error('Server returned an invalid response')
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Generation failed')
      }

      setResult({
        slug: data.slug,
        caseStudy: data.caseStudy,
      })
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  const inputClass = `
    w-full bg-[#111] border border-white/10 rounded-xl
    px-4 py-3 text-white placeholder-gray-600
    focus:outline-none focus:border-amber-500/50
    transition-colors text-sm
  `

  const labelClass = "block text-gray-500 text-xs tracking-widest uppercase mb-2 font-medium"

  if (!sessionChecked) {
    return (
      <main
        style={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}
        className="flex items-center justify-center"
      >
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-amber-500"
              style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </div>
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}</style>
      </main>
    )
  }

  return (
    <EmailGate skip={sessionVerified}>
      <main style={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}
        className="px-4 py-12 md:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <a href="/" className="text-gray-600 text-sm hover:text-gray-400 transition-colors">
              ← trykoven.com
            </a>
            <h1 className="text-white text-3xl font-bold mt-6">
              Generate your case study.
            </h1>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              Paste your links below. Koven reads everything
              and writes your story in under 5 minutes.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">

            <div>
              <label className={labelClass}>
                GitHub Repository URL *
              </label>
              <input
                type="text"
                placeholder="https://github.com/username/project"
                value={form.githubUrl}
                onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Live Product URL *
              </label>
              <input
                type="text"
                placeholder="https://yourproduct.com"
                value={form.productUrl}
                onChange={e => setForm({ ...form, productUrl: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                What problem does it solve? *
              </label>
              <input
                type="text"
                placeholder="One sentence. The real problem, not the feature."
                value={form.problemStatement}
                onChange={e => setForm({ ...form, problemStatement: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Your X Handle
              </label>
              <input
                type="text"
                placeholder="@yourusername"
                value={form.xHandle}
                onChange={e => setForm({ ...form, xHandle: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Paste 3-5 build-in-public posts
                <span className="text-gray-700 ml-2 normal-case tracking-normal">
                  (optional but makes output 10x better)
                </span>
              </label>
              <textarea
                rows={6}
                placeholder={
                  `day 4. auth is broken again. shipping anyway.\n` +
                  `rewrote the whole flow on day 6.\n` +
                  `200 users in the first 24 hours.`
                }
                value={form.buildPosts}
                onChange={e => setForm({ ...form, buildPosts: e.target.value })}
                className={inputClass + ' resize-none'}
              />
              <p className="text-gray-700 text-xs mt-2">
                Copy from your X threads. The more real, the better the output.
              </p>
            </div>

            {error && (
              <div className="border border-red-900/50 bg-red-950/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`
                w-full py-4 rounded-xl font-bold text-base
                transition-all duration-200
                ${loading
                  ? 'bg-amber-500/20 text-amber-500/50 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-black'
                }
              `}
            >
              {loading ? loadingText : 'Write my case study →'}
            </button>

            {loading && (
              <div className="flex justify-center">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-amber-500"
                      style={{
                        animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Result */}
          {result && (
            <div className="mt-16 border border-white/10 rounded-2xl overflow-hidden">

              {/* Success bar */}
              <div className="bg-green-950/30 border-b border-green-900/30 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-green-400 text-sm font-medium">
                    Case study generated
                  </span>
                </div>
                <a
                  href={`/c/${result.slug}`}
                  target="_blank"
                  className="bg-white text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  View public page →
                </a>
              </div>

              {/* Preview */}
              <div className="p-6 space-y-6 bg-[#0d0d0d]">

                <div>
                  <p className="text-amber-500 text-xs tracking-widest uppercase mb-1">
                    Title
                  </p>
                  <p className="text-white font-bold text-xl">
                    {result.caseStudy.title}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {result.caseStudy.oneLiner}
                  </p>
                </div>

                <div>
                  <p className="text-amber-500 text-xs tracking-widest uppercase mb-1">
                    The Story
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {result.caseStudy.buildStory}
                  </p>
                </div>

                <div className="border border-amber-500/20 bg-amber-950/10 rounded-xl p-4">
                  <p className="text-amber-400 text-xs tracking-widests uppercase mb-2">
                    Shareable Quote
                  </p>
                  <p className="text-white text-sm font-medium italic leading-relaxed">
                    &ldquo;{result.caseStudy.quote}&rdquo;
                  </p>
                </div>

                <div>
                  <p className="text-amber-500 text-xs tracking-widest uppercase mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.caseStudy.techStack.map(tech => (
                      <span
                        key={tech}
                        className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <p className="text-gray-600 text-xs">
                    Your public URL:
                    <span className="text-amber-500 ml-2">
                      trykoven.com/c/{result.slug}
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://trykoven.com/c/${result.slug}`
                      )
                    }}
                    className="text-gray-500 text-xs hover:text-white transition-colors"
                  >
                    Copy link
                  </button>
                </div>
              </div>
            </div>
          )}

          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
          `}</style>
        </div>
      </main>
    </EmailGate>
  )
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  )
}
