'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const STEPS = [
  {
    id: 1,
    label: 'Reading your commits',
    detail: 'Pulling your GitHub history and README',
    icon: '{ }',
  },
  {
    id: 2,
    label: 'Scraping your product',
    detail: 'Extracting title and description',
    icon: '↗',
  },
  {
    id: 3,
    label: 'Pulling your build story',
    detail: 'Reading your build-in-public posts',
    icon: '𝕏',
  },
  {
    id: 4,
    label: 'Claude is writing',
    detail: 'Generating your case study',
    icon: '✦',
  },
  {
    id: 5,
    label: 'Saving your story',
    detail: 'Creating your public page',
    icon: '↓',
  },
]

export default function GeneratingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(2)
  const [elapsed, setElapsed] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    const raw = sessionStorage.getItem('koven_form')
    if (!raw) {
      router.push('/generate')
      return
    }

    const form = JSON.parse(raw)

    let stepIdx = 0
    let ms = 0
    const TOTAL = 19000

    const progressTimer = setInterval(() => {
      ms += 200
      setProgress(Math.min((ms / TOTAL) * 93, 93))
      setElapsed(Math.floor(ms / 1000))
    }, 200)

    const stepTimer = setInterval(() => {
      stepIdx = Math.min(stepIdx + 1, STEPS.length - 1)
      setCurrentStep(stepIdx)
    }, 3200)

    fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        clearInterval(progressTimer)
        clearInterval(stepTimer)
        setProgress(100)
        setCurrentStep(STEPS.length - 1)

        if (data.success && data.slug) {
          sessionStorage.removeItem('koven_form')
          setTimeout(() => {
            router.push(`/c/${data.slug}`)
          }, 800)
        } else {
          setError(
            data.error || 'Something went wrong.'
          )
        }
      })
      .catch(() => {
        clearInterval(progressTimer)
        clearInterval(stepTimer)
        setError(
          'Generation failed. Please try again.'
        )
      })

    return () => {
      clearInterval(progressTimer)
      clearInterval(stepTimer)
    }
  }, [router])

  if (error) {
    return (
      <main style={{
        backgroundColor: '#0f0f0f',
        minHeight: '100vh'
      }}
        className="flex items-center
          justify-center px-6">
        <div className="max-w-md w-full
          text-center">
          <div className="w-16 h-16 bg-red-950/30
            border border-red-900/40 rounded-2xl
            flex items-center justify-center
            mx-auto mb-6">
            <span className="text-red-500 text-2xl">
              ⚠
            </span>
          </div>
          <h2 className="text-white font-bold
            text-xl mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-500 text-sm
            leading-relaxed mb-6">
            {error}
          </p>
          <div className="flex gap-3
            justify-center">
            <button
              onClick={() => {
                setError('')
                window.location.reload()
              }}
              className="bg-amber-500 text-black
                font-bold px-6 py-3 rounded-xl
                text-sm hover:bg-amber-400
                transition-colors"
            >
              Try again
            </button>
            <a
              href="mailto:hi@trykoven.com"
              className="border border-white/10
                text-gray-400 px-6 py-3 rounded-xl
                text-sm hover:bg-white/5
                transition-colors"
            >
              Email support
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{
      backgroundColor: '#0f0f0f',
      minHeight: '100vh'
    }}
      className="flex items-center
        justify-center px-6">
      <div className="max-w-lg w-full">

        {/* Top label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center
            gap-2 bg-amber-500/10 border
            border-amber-500/20 rounded-full
            px-4 py-2 mb-6">
            <div className="w-2 h-2 rounded-full
              bg-amber-500 animate-pulse" />
            <span className="text-amber-500 text-sm">
              Koven is writing your story
            </span>
          </div>

          <h1 className="text-white text-3xl
            font-bold mb-2">
            Building your case study.
          </h1>
          <p className="text-gray-600 text-sm">
            Reading your real data.
            Writing your real story.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-2 flex justify-between
          items-center">
          <p className="text-white text-sm
            font-medium">
            {STEPS[currentStep]?.label}...
          </p>
          <p className="text-gray-600 text-xs
            font-mono">
            {elapsed}s / ~18s
          </p>
        </div>

        <div className="w-full bg-[#111]
          rounded-full h-1 mb-2">
          <div
            className="h-1 rounded-full bg-amber-500
              transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-600 text-xs mb-10">
          {STEPS[currentStep]?.detail}
        </p>

        {/* Steps */}
        <div className="space-y-4">
          {STEPS.map((step, idx) => (
            <div key={step.id}
              className="flex items-center gap-4">

              <div className={`
                w-10 h-10 rounded-xl flex items-center
                justify-center text-sm font-mono
                shrink-0 transition-all duration-500
                ${idx < currentStep
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : idx === currentStep
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-[#111] text-gray-700 border border-white/5'}
              `}>
                {idx < currentStep
                  ? '✓'
                  : step.icon}
              </div>

              <div className="flex-1">
                <p className={`
                  text-sm font-medium
                  transition-all duration-300
                  ${idx < currentStep
                    ? 'text-gray-600 line-through'
                    : idx === currentStep
                    ? 'text-white'
                    : 'text-gray-700'}
                `}>
                  {step.label}
                </p>
                {idx === currentStep && (
                  <p className="text-gray-600
                    text-xs mt-0.5
                    animate-pulse">
                    {step.detail}
                  </p>
                )}
              </div>

              {idx === currentStep && (
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5
                        rounded-full bg-amber-500"
                      style={{
                        animation: `bounce-dot
                          1s ease-in-out
                          ${i * 0.15}s infinite`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-700
          text-xs mt-12">
          Don't close this tab.
          You'll be redirected automatically.
        </p>
      </div>

      <style>{`
        @keyframes bounce-dot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </main>
  )
}
