'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'error'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      return
    }

    setStatus('loading')

    const { error } = await supabase.from('waitlist').insert({ email })

    if (!error) {
      setStatus('success')
      return
    }

    // Postgres unique violation code
    if (error.code === '23505') {
      setStatus('duplicate')
    } else {
      setStatus('error')
    }
  }

  const message =
    status === 'duplicate' ? 'Already on the list!' :
    status === 'error' ? 'Something went wrong. Try again.' :
    null

  return (
    <div className="border border-white/5 rounded-xl p-6 max-w-md mx-auto">
      <p className="text-white font-semibold text-base mb-1">Not ready to buy?</p>
      <p className="text-gray-500 text-sm mb-5">Get notified when we add new features — free.</p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
          placeholder="your@email.com"
          disabled={status === 'success'}
          className="bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-amber-500/40 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-amber-500 text-black font-medium px-4 py-2 rounded-lg text-sm hover:bg-amber-400 transition-colors disabled:opacity-60 shrink-0"
        >
          {status === 'success' ? 'You\'re in ✓' : 'Notify me'}
        </button>
      </form>

      {message && (
        <p className={`mt-3 text-xs ${status === 'duplicate' ? 'text-amber-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
