'use client'

import { useState } from 'react'

const styles = `
  @keyframes float-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(245,158,11,0.3); }
    50% { box-shadow: 0 0 40px rgba(245,158,11,0.6); }
  }
  @keyframes flow-right {
    0% { transform: translateX(-8px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateX(8px); opacity: 0; }
  }
  @keyframes card-in {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .animate-float { animation: float-up 0.8s ease forwards; }
  .animate-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .animate-flow { animation: flow-right 1.5s ease-in-out infinite; }
  .shimmer-text {
    background: linear-gradient(90deg, #f59e0b, #ffffff, #f59e0b);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }
  .cursor-blink { animation: blink 1s step-end infinite; }
  .card-animate { animation: card-in 0.6s ease forwards; }
  .input-card {
    animation: card-in 0.6s ease forwards;
    border: 1px solid rgba(255,255,255,0.08);
    background: #161616;
  }
  .input-card:nth-child(2) { animation-delay: 0.15s; opacity: 0; }
  .input-card:nth-child(3) { animation-delay: 0.3s; opacity: 0; }
`

export default function Home() {
  const earlyBirdUrl = process.env.NEXT_PUBLIC_POLAR_EARLY_BIRD_URL || '#'
  const builderPackUrl = process.env.NEXT_PUBLIC_POLAR_BUILDER_PACK_URL || '#'
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: '#fff' }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* NAVBAR */}
      <nav
        className="sticky top-0 z-50 backdrop-blur border-b border-white/5"
        style={{ backgroundColor: 'rgba(15,15,15,0.9)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-white text-xl">Koven</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 ml-1 mb-1" />
          </div>
          <div className="flex items-center gap-6">
            <a
              href={earlyBirdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-amber-500/50 text-amber-400 text-sm px-4 py-2 rounded-lg hover:bg-amber-500/10 transition-all"
            >
              Get early access →
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-4 md:px-6 text-center max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 border border-red-900/50 bg-red-950/30 text-red-400 text-xs tracking-widest px-3 py-1 rounded-full uppercase">
          For developers who ship but never get credit
        </div>

        <h1 className="mt-8 font-bold leading-tight">
          <div className="text-4xl md:text-7xl text-white">You&apos;ve built real things.</div>
          <div className="text-4xl md:text-7xl mt-2 shimmer-text">Nobody knows it.</div>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-gray-400 text-xl leading-relaxed">
          Paste your GitHub URL and build posts.
          Koven writes your case study in 5 minutes.
          Not a template — built from what you did.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <a
            href={earlyBirdUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-glow bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-all duration-200"
          >
            Get my case study — $9
          </a>
          <a
            href="#how-it-works"
            className="text-gray-500 text-sm hover:text-gray-300 underline underline-offset-4 transition-all"
          >
            See how it works ↓
          </a>
          <p className="text-gray-600 text-sm">
            One-time payment. No subscription. No fluff.
          </p>
        </div>
      </section>

      {/* PAIN BLOCK */}
      <section className="mt-32 px-4 md:px-6 max-w-2xl mx-auto">
        <div className="border border-red-900/30 bg-red-950/10 rounded-2xl p-10">
          <p className="text-red-500 text-xs tracking-widest uppercase font-medium mb-6">Sound familiar?</p>

          <div className="italic text-gray-400 leading-[1.9] text-lg space-y-4">
            <p>
              You spent 14 nights building something real.
              Debugging at 2am. Stack overflow tabs everywhere.
              Rewriting the auth flow on day 6 because it was wrong.
              Shipping anyway.
            </p>
            <p>
              You posted about it. You wrote the threads.
              You documented every decision because you were
              proud of the work.
            </p>
            <p className="text-gray-300">
              And then someone important asked:
              &ldquo;show me what you&apos;ve built.&rdquo;
            </p>
            <p>You sent a GitHub link.</p>
            <p className="text-gray-500 text-base">
              A wall of files. A README with three bullet points.
              Commit messages that say &lsquo;fix stuff&rsquo; and &lsquo;update&rsquo;.
              No context. No story. No why.
            </p>
          </div>

          <div className="border-t border-red-900/30 mt-8 pt-8">
            <p className="text-white font-semibold text-xl">
              The work was real.<br />
              The presentation wasn&apos;t.<br />
              That&apos;s the only reason they moved on.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-amber-500 font-medium text-lg">Koven fixes this.</p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mt-32 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl font-bold">
            Paste three links.<br />Get your story.
          </h2>
          <p className="mt-4 text-gray-500">
            Koven reads everything you&apos;ve already built in public.
            You&apos;ve done the work. It writes the story.
          </p>
        </div>

        {/* Desktop animation block */}
        <div
          className="hidden md:grid gap-4 items-center max-w-5xl mx-auto"
          style={{ gridTemplateColumns: '3fr 5fr 3fr' }}
        >
          {/* Input cards */}
          <div className="flex flex-col gap-3">
            <div className="input-card rounded-xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 6h6M5 8h4M5 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm font-medium">GitHub Repository</span>
              </div>
              <div className="mt-3 font-mono text-xs text-gray-600 space-y-1">
                <div>▸ 47 commits</div>
                <div>▸ 14 days active</div>
                <div>▸ README.md</div>
                <div>▸ 6 files changed</div>
                <div>▸ TypeScript · Next.js</div>
              </div>
            </div>

            <div className="input-card rounded-xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 font-bold text-sm">𝕏</span>
                </div>
                <span className="text-gray-300 text-sm font-medium">Build-in-public posts</span>
              </div>
              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <div>&ldquo;day 4. auth is broken again...&rdquo;</div>
                <div>&ldquo;rewrote the whole flow.&rdquo;</div>
                <div>&ldquo;shipped. finally.&rdquo;</div>
                <div>&ldquo;200 users in 24 hours.&rdquo;</div>
              </div>
            </div>

            <div className="input-card rounded-xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">↗</span>
                </div>
                <span className="text-gray-300 text-sm font-medium">Live product</span>
              </div>
              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <div>▸ yourproduct.com</div>
                <div>▸ OG: title + description</div>
                <div>▸ 200 active users</div>
                <div>▸ Product Hunt: #3</div>
              </div>
            </div>
          </div>

          {/* Engine */}
          <div className="flex flex-col items-center px-2">
            <div className="flex flex-col gap-2 mb-4 self-start">
              {[0, 0.5, 1].map((delay) => (
                <span
                  key={delay}
                  className="animate-flow text-2xl"
                  style={{ color: 'rgb(245,158,11)', animationDelay: `${delay}s` }}
                >
                  →
                </span>
              ))}
            </div>

            <div className="animate-glow border border-amber-500/40 bg-amber-950/10 rounded-2xl p-6 text-center w-full">
              <p className="text-amber-500 text-xs tracking-widest uppercase mb-4 font-medium">● KOVEN ENGINE</p>

              <div className="inline-flex items-center gap-2 bg-gray-900 border border-white/10 rounded-full px-3 py-1 mb-4">
                <span className="text-gray-400 text-xs">Powered by Claude Sonnet 4</span>
              </div>

              <div className="space-y-2 text-left">
                {[
                  { dot: 'bg-amber-500', text: 'text-gray-400', label: 'Parsing commit history...' },
                  { dot: 'bg-amber-500/60', text: 'text-gray-500', label: 'Reading X threads...' },
                  { dot: 'bg-amber-500/30', text: 'text-gray-600', label: 'Scraping product metadata...' },
                  { dot: 'bg-red-600', text: 'text-gray-400', label: 'Writing your story...' },
                ].map(({ dot, text, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                    <span className={text}>{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-gray-600 text-xs italic">Not a template. Built from your reality.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 self-end">
              {[0, 0.5, 1].map((delay) => (
                <span
                  key={delay}
                  className="animate-flow text-2xl"
                  style={{ color: 'rgb(245,158,11)', animationDelay: `${delay}s` }}
                >
                  →
                </span>
              ))}
            </div>
          </div>

          {/* Output preview */}
          <div className="border border-white/10 bg-[#111111] rounded-xl overflow-hidden">
            <div className="bg-[#161616] px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2 text-gray-600 text-xs font-mono">koven.so/c/buildtrack</span>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="text-white text-sm font-bold">BuildTrack</span>
                <span className="inline ml-2 bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded">live ↗</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Helps solo builders turn GitHub repos into shareable case studies.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed italic border-l-2 border-amber-500/40 pl-3">
                Started after noticing builders were sending GitHub links to hiring managers.
                Shipped v1 in 4 days. Rewrote auth on day 6. Launched to 200 users on day 14.
              </p>
              <div className="flex flex-wrap gap-1">
                {['Next.js', 'Supabase', 'Claude', 'Vercel'].map((t) => (
                  <span key={t} className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
              <div className="pt-3 border-t border-white/5">
                <div className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded text-center w-full">
                  View full case study →
                </div>
              </div>
              <p className="text-center text-gray-700 text-xs">Built with Koven</p>
            </div>
          </div>
        </div>

        {/* Mobile animation block */}
        <div className="md:hidden space-y-6 max-w-sm mx-auto">
          <div className="flex flex-col gap-3">
            <div className="input-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 6h6M5 8h4M5 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm font-medium">GitHub · X posts · Live product</span>
              </div>
              <div className="font-mono text-xs text-gray-600 space-y-1">
                <div>▸ 47 commits · 14 days active</div>
                <div>▸ Build threads + product URL</div>
              </div>
            </div>
          </div>

          <div className="text-center text-amber-500/60 text-lg">↓</div>

          <div className="animate-glow border border-amber-500/40 bg-amber-950/10 rounded-2xl p-6 text-center">
            <p className="text-amber-500 text-xs tracking-widest uppercase mb-3 font-medium">● KOVEN ENGINE</p>
            <p className="text-gray-600 text-xs italic">Not a template. Built from your reality.</p>
          </div>

          <div className="text-center text-amber-500/60 text-lg">↓</div>

          <div className="border border-white/10 bg-[#111111] rounded-xl overflow-hidden">
            <div className="bg-[#161616] px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2 text-gray-600 text-xs font-mono">koven.so/c/buildtrack</span>
            </div>
            <div className="p-4">
              <span className="text-white text-sm font-bold">BuildTrack</span>
              <span className="inline ml-2 bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded">live ↗</span>
              <p className="text-gray-400 text-xs leading-relaxed italic border-l-2 border-amber-500/40 pl-3 mt-3">
                Shipped v1 in 4 days. Rewrote auth on day 6. Launched to 200 users on day 14.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="mt-32 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full mb-4">
            Real output. Real project.
          </div>
          <h2 className="text-white text-4xl font-bold">This is what you get.</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            A real Koven-generated case study. This is what a hiring manager, investor,
            or client sees when you share your link.
          </p>
        </div>

        <div className="border border-white/10 bg-[#0d0d0d] rounded-2xl overflow-hidden max-w-3xl mx-auto">
          <div className="bg-[#111] px-6 py-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-600 text-sm font-mono hidden sm:block">koven.so/c/nova-ai-assistant</span>
            </div>
            <div className="bg-green-950 border border-green-800 text-green-400 text-xs px-3 py-1 rounded-full">
              ● Live
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <p className="text-gray-500 text-xs tracking-widest uppercase">Case Study</p>
                <h3 className="text-white text-3xl font-bold mt-1">Nova AI Assistant</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['AI', 'React', 'Socket.IO', 'OpenRouter'].map((tag) => (
                    <span key={tag} className="bg-gray-800/60 border border-white/5 text-gray-400 text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-xs mb-1">Built by</p>
                <p className="text-white font-medium">@Mayuri_dev</p>
                <div className="flex gap-3 mt-3 text-xs text-gray-600">
                  <span>47 commits</span>
                  <span>14 days</span>
                  <span>200+ users</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 my-8" />

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-amber-500 text-xs tracking-widest uppercase font-medium mb-3">The Problem</p>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Switching between Claude, GPT-4, and Llama for different tasks meant 4 different apps,
                  4 different UIs, and constantly losing context. There was no single interface that worked
                  across all providers in real time.
                </p>
                <div className="mt-8">
                  <p className="text-red-500 text-xs tracking-widest uppercase font-medium mb-3">The Solution</p>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Built Nova — a unified AI chat interface using React and Socket.IO for real-time
                    streaming, with OpenRouter as the provider layer. One interface. Every model.
                    Stateful memory across sessions.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-amber-500 text-xs tracking-widest uppercase font-medium mb-3">How It Got Built</p>
                <div className="space-y-4">
                  {[
                    { day: 'Day 1–2', text: 'Decided on Socket.IO over REST after testing latency' },
                    { day: 'Day 4', text: 'Rewrote the streaming handler — first version dropped tokens' },
                    { day: 'Day 6', text: 'OpenRouter integration done. All 12 models working.' },
                    { day: 'Day 9', text: 'Added stateful memory — the feature users asked for most' },
                    { day: 'Day 14', text: 'Launched. 200 users in 24 hours.' },
                  ].map(({ day, text }, i) => (
                    <div key={day} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        {i < 4 && <div className="w-px flex-1 bg-white/5 mt-1" />}
                      </div>
                      <div className="pb-2">
                        <p className="text-gray-300 text-sm font-medium">{day}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 my-8" />

            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: '200+', color: 'text-white', label: 'Users in 24hrs' },
                { value: '14', color: 'text-amber-400', label: 'Days to ship' },
                { value: '#3', color: 'text-white', label: 'Product Hunt' },
              ].map(({ value, color, label }) => (
                <div key={label} className="bg-[#111] border border-white/5 rounded-xl p-4">
                  <p className={`${color} text-2xl font-bold`}>{value}</p>
                  <p className="text-gray-600 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-gray-600 text-xs tracking-widest uppercase mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Socket.IO', 'OpenRouter', 'Node.js', 'Tailwind CSS', 'Vercel'].map((t) => (
                  <span key={t} className="bg-gray-900 border border-white/5 text-gray-300 text-sm px-3 py-1.5 rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center flex-wrap gap-4">
              <div>
                <span className="text-gray-500 text-sm">Built with</span>
                <span className="text-amber-400 font-medium ml-1">Koven</span>
              </div>
              <div className="flex gap-3">
                <button className="border border-white/10 text-gray-400 text-sm px-4 py-2 rounded-lg">← Back</button>
                <button className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg">View live product ↗</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">Your case study looks exactly like this.</p>
          <div className="mt-4 flex flex-col items-center gap-3">
            <span className="text-amber-500 text-2xl">↑</span>
            <a
              href={earlyBirdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl transition-all"
            >
              Get mine for $9 →
            </a>
          </div>
        </div>
      </section>

      {/* FEATURE BULLETS */}
      <section className="mt-32 px-4 md:px-6 max-w-5xl mx-auto">
        <h2 className="text-white text-4xl font-bold text-center mb-16">Built for builders who ship.</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-red-900/30 bg-red-950/10 rounded-2xl p-8">
            <div className="w-10 h-10 bg-red-900/30 rounded-xl flex items-center justify-center mb-6">
              <span className="text-red-500 text-xl font-bold">✗</span>
            </div>
            <p className="text-white font-bold text-lg mb-3">
              Stop losing to developers who present worse work better.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              The gap between getting the job and getting ignored isn&apos;t your skills. It&apos;s your story.
              Every opportunity you&apos;ve lost wasn&apos;t because your code was bad. It&apos;s because your code
              was invisible. Koven closes that gap.
            </p>
          </div>

          <div className="border border-amber-500/20 bg-amber-950/10 rounded-2xl p-8">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-amber-400 text-xl font-bold">𝕏</span>
            </div>
            <p className="text-white font-bold text-lg mb-3">
              Your build-in-public posts finally do something.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Every thread you wrote at 2am while debugging.
              Every decision you documented. Every &lsquo;day 6, rewrote everything&rsquo; post.
              Koven reads all of it and weaves it into a story a human can follow.
            </p>
          </div>

          <div className="border border-white/10 bg-white/2 rounded-2xl p-8">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl font-bold">↗</span>
            </div>
            <p className="text-white font-bold text-lg mb-3">
              One link. Every project. Ready in minutes.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              No more 3-hour Notion page assemblies.
              No more praying a GitHub repo speaks for itself.
              One shareable URL that tells the whole story —
              to a hiring manager, investor, or client.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="mt-32 px-4 md:px-6 max-w-4xl mx-auto">
        <h2 className="text-white text-4xl font-bold text-center mb-4">Simple pricing.</h2>
        <p className="text-center text-gray-500 mb-16">
          One-time payment. Yours forever.<br />
          No subscription. No monthly BS.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="border border-amber-500/40 bg-amber-950/10 rounded-2xl p-8">
            <p className="text-amber-500 text-xs tracking-widest uppercase font-medium mb-4">EARLY BIRD</p>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-6xl font-bold">$9</span>
              <span className="text-gray-600 text-sm">USD</span>
            </div>
            <p className="text-gray-600 text-sm mt-1 mb-6">One-time payment. No subscription.</p>
            <div className="border-t border-white/5 mb-6" />
            <div className="space-y-3">
              {[
                '1 fully designed case study page',
                'Shareable public URL (koven.so/c/you)',
                'PDF export for job applications',
                'Built from your real commits + posts',
                '48-hour refund guarantee',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <span className="text-amber-500 font-bold shrink-0">✓</span>
                  <span className="text-gray-300">{f}</span>
                </div>
              ))}
            </div>
            <a
              href={earlyBirdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block w-full text-center bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-all"
            >
              Get my case study — $9
            </a>
          </div>

          <div className="border border-white/10 bg-white/2 rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-red-900 border border-red-700 text-red-300 text-xs px-3 py-1 rounded-full whitespace-nowrap">
                Best value
              </span>
            </div>
            <p className="text-gray-500 text-xs tracking-widest uppercase font-medium mb-4">BUILDER PACK</p>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-6xl font-bold">$19</span>
              <span className="text-gray-600 text-sm">USD</span>
            </div>
            <p className="text-gray-600 text-sm mt-1 mb-6">One-time payment. No subscription.</p>
            <div className="border-t border-white/5 mb-6" />
            <div className="space-y-3">
              {[
                '5 case study pages',
                'Custom subdomain',
                'Priority generation',
                'Everything in Early Bird',
                'First to get new features',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <span className="text-amber-500 font-bold shrink-0">✓</span>
                  <span className="text-gray-300">{f}</span>
                </div>
              ))}
            </div>
            <a
              href={builderPackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block w-full text-center border border-white/20 hover:bg-white/5 text-white font-bold py-4 rounded-xl transition-all"
            >
              Get Builder Pack — $19
            </a>
          </div>
        </div>

      </section>

      {/* URGENCY */}
      <div className="max-w-2xl mx-auto text-center py-10 px-6">
        <p className="text-gray-500 text-sm mb-6">
          Early access pricing. Get in before it goes up.
        </p>
        <a
          href="mailto:prateekkatare1@gmail.com"
          className="text-amber-500/70 hover:text-amber-400 transition-colors underline underline-offset-4 text-sm"
        >
          Questions? Email prateekkatare1@gmail.com →
        </a>
      </div>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 mt-32">
        <h2 className="text-white text-4xl font-bold text-center mb-16">
          Questions.
        </h2>

        <div className="space-y-3">
          {[
            {
              q: "Will it sound like generic AI output?",
              a: "No. Koven doesn't start with a template. It starts with YOUR commits, YOUR build posts, and YOUR actual product. The output reads like you wrote it — because it's built entirely from what you actually did."
            },
            {
              q: "What if my repo is small or incomplete?",
              a: "It still works. Koven pulls from every signal available. Your commits say more than you think. The more you've built in public, the richer the output."
            },
            {
              q: "What if I don't like what it generates?",
              a: "Email within 48 hours for a full refund. No questions asked. We're not interested in keeping your $9 if Koven didn't deliver."
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="border border-white/8 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/2 transition-colors"
              >
                <span className="text-white font-medium text-sm md:text-base pr-4">
                  {faq.q}
                </span>
                <span className={`text-gray-500 text-xl shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-6">
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-32 border-t border-white/5 py-32 px-4 md:px-6 text-center">
        <h2 className="text-white text-5xl font-bold leading-tight">
          You&apos;ve already done<br />the hard part.
        </h2>
        <div className="mt-3 shimmer-text text-4xl md:text-5xl font-bold">You built something real.</div>

        <p className="mt-6 text-gray-500 text-xl max-w-xl mx-auto">
          Stop letting a GitHub link be the last impression you leave.
          Your commits tell the whole story. Koven writes it.
        </p>

        <a
          href={earlyBirdUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-block animate-glow bg-amber-500 hover:bg-amber-400 text-black font-bold px-12 py-5 rounded-xl text-lg transition-all"
        >
          Get my case study — $9
        </a>

        <p className="text-gray-600 text-sm mt-4">
          One-time payment. No subscription.
        </p>
      </section>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0
        md:hidden bg-[#0f0f0f]/95 backdrop-blur-sm
        border-t border-white/10 px-4 py-3
        flex items-center justify-between z-50">
        <div>
          <p className="text-white font-bold text-lg leading-none">
            $9
          </p>
          <p className="text-gray-600 text-xs mt-0.5">
            no subscription
          </p>
        </div>
        <a
          href={process.env.NEXT_PUBLIC_POLAR_EARLY_BIRD_URL}
          target="_blank"
          className="bg-amber-500 hover:bg-amber-400
            text-black font-bold px-6 py-2.5
            rounded-xl text-sm transition-colors"
        >
          Get access →
        </a>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-4 md:px-6 py-8 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center flex-wrap gap-4">
          <span className="text-gray-700 text-sm">© 2026 Koven · trykoven.com</span>
          <a href="mailto:prateekkatare1@gmail.com" className="text-amber-500/70 hover:text-amber-400 transition-colors text-sm">prateekkatare1@gmail.com</a>
          <div className="flex gap-6">
            <a href="/terms" className="text-gray-700 text-sm hover:text-gray-400 transition-colors">Terms</a>
            <a href="/privacy" className="text-gray-700 text-sm hover:text-gray-400 transition-colors">Privacy</a>
            <a href="/refund" className="text-gray-700 text-sm hover:text-gray-400 transition-colors">Refund</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
