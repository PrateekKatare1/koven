'use client'

import { useState } from 'react'

interface EmailGateProps {
  children: React.ReactNode
  skip?: boolean
}

export function EmailGate({ children, skip = false }: EmailGateProps) {
  const [email, setEmail] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)

  const checkPayment = async () => {
    if (!email.trim()) return
    setChecking(true)
    setError(null)

    try {
      const res = await fetch('/api/check-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()

      if (data.paid) {
        setUnlocked(true)
      } else {
        setError("No purchase found for this email. Buy access below.")
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setChecking(false)
    }
  }

  if (unlocked || skip) return <>{children}</>

  const earlyBirdUrl = process.env.NEXT_PUBLIC_POLAR_EARLY_BIRD_URL || '#'

  return (
    <main
      style={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}
      className="flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <p className="text-amber-500 text-xs tracking-widest uppercase mb-3">
            Koven
          </p>
          <h1 className="text-white text-2xl font-bold">
            Enter your email to continue
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Use the email you paid with.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkPayment()}
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors text-sm"
          />

          {error && (
            <div className="border border-red-900/50 bg-red-950/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={checkPayment}
            disabled={checking || !email.trim()}
            className="w-full py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {checking ? 'Checking...' : 'Continue →'}
          </button>

          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-gray-600 text-sm">
              {"Haven't bought yet? "}
              <a
                href={earlyBirdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                Get access for $7 →
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
