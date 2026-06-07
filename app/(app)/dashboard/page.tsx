'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GeneratePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    githubUrl: '',
    xHandle: '',
    buildPosts: '',
    productUrl: '',
    problemStatement: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!form.githubUrl ||
        !form.productUrl ||
        !form.problemStatement) {
      setError(
        'GitHub URL, product URL, and problem statement are required.'
      )
      return
    }

    sessionStorage.setItem(
      'koven_form',
      JSON.stringify(form)
    )
    router.push('/generating')
  }

  const inputClass = `
    w-full bg-[#111] border border-white/10
    rounded-xl px-4 py-3 text-white
    placeholder-gray-600 focus:outline-none
    focus:border-amber-500/50 transition-colors
    text-sm
  `

  const labelClass = `
    block text-gray-500 text-xs tracking-widest
    uppercase mb-2 font-medium
  `

  return (
    <main style={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}
      className="px-4 py-12 md:px-6">
      <div className="max-w-2xl mx-auto">

        <div className="mb-12">
          <a href="/"
            className="text-gray-600 text-sm
              hover:text-gray-400 transition-colors">
            ← trykoven.com
          </a>
          <h1 className="text-white text-3xl
            font-bold mt-6">
            Generate your case study.
          </h1>
          <p className="text-gray-500 mt-2
            text-sm leading-relaxed">
            Paste your links. Koven reads
            everything and writes your story
            in under 5 minutes.
          </p>
        </div>

        <div className="space-y-6">

          <div>
            <label className={labelClass}>
              GitHub Repository URL *
            </label>
            <input
              type="text"
              placeholder="https://github.com/username/project"
              value={form.githubUrl}
              onChange={e => setForm({
                ...form, githubUrl: e.target.value
              })}
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
              onChange={e => setForm({
                ...form, productUrl: e.target.value
              })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              What problem does it solve? *
            </label>
            <input
              type="text"
              placeholder="One sentence. The real problem."
              value={form.problemStatement}
              onChange={e => setForm({
                ...form,
                problemStatement: e.target.value
              })}
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
              onChange={e => setForm({
                ...form, xHandle: e.target.value
              })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Paste 3-5 build-in-public posts
              <span className="text-gray-700 ml-2
                normal-case tracking-normal">
                (makes output 10x better)
              </span>
            </label>
            <textarea
              rows={6}
              placeholder={
                `day 4. auth is broken. shipping anyway.\n` +
                `rewrote the whole flow on day 6.\n` +
                `200 users in the first 24 hours.`
              }
              value={form.buildPosts}
              onChange={e => setForm({
                ...form, buildPosts: e.target.value
              })}
              className={inputClass + ' resize-none'}
            />
            <p className="text-gray-700 text-xs mt-2">
              Copy from your X threads.
              The more real, the better the output.
            </p>
          </div>

          {error && (
            <div className="border border-red-900/50
              bg-red-950/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">
                {error}
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-amber-500
              hover:bg-amber-400 text-black
              font-bold py-4 rounded-xl text-base
              transition-all duration-200"
          >
            Write my case study →
          </button>

        </div>
      </div>
    </main>
  )
}
