import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { CopyButton } from './CopyButton'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params
  const { data } = await supabase
    .from('case_studies')
    .select('title, one_liner')
    .eq('slug', slug)
    .single()

  if (!data) return { title: 'Case Study — Koven' }

  return {
    title: `${data.title} — Case Study`,
    description: data.one_liner,
  }
}

export default async function CaseStudyPage({
  params,
}: PageProps) {
  const { slug } = await params
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) notFound()

  return (
    <main style={{
      backgroundColor: '#0f0f0f',
      minHeight: '100vh',
      color: '#fff',
    }}>

      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <a href="/" className="text-gray-600 text-sm hover:text-gray-400 transition-colors">
            Koven
          </a>
          <span className="text-gray-700 text-xs font-mono">
            {slug}
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-gray-600 text-xs tracking-widest uppercase mb-3">
                Case Study
              </p>
              <h1 className="text-white text-4xl md:text-5xl font-bold">
                {data.title}
              </h1>
              <p className="text-gray-400 text-lg mt-3 max-w-xl leading-relaxed">
                {data.one_liner}
              </p>
            </div>

            <div className="text-right">
              <p className="text-gray-600 text-xs mb-1">Built by</p>
              <p className="text-white font-medium">{data.builder_handle}</p>
              <div className="flex gap-3 mt-3 text-xs text-gray-600 justify-end">
                <a
                  href={data.github_url}
                  target="_blank"
                  className="hover:text-gray-400 transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href={data.product_url}
                  target="_blank"
                  className="hover:text-gray-400 transition-colors"
                >
                  Live Product ↗
                </a>
              </div>
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-6">
            {(data.tech_stack || []).map((tech: string) => (
              <span
                key={tech}
                className="bg-gray-900 border border-white/5 text-gray-300 text-sm px-3 py-1.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-16" />

        {/* 2-col content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">

          {/* Left */}
          <div className="space-y-10">
            <div>
              <p className="text-amber-500 text-xs tracking-widest uppercase mb-4 font-medium">
                The Problem
              </p>
              <p className="text-gray-400 leading-relaxed">{data.problem}</p>
            </div>

            <div>
              <p className="text-amber-500 text-xs tracking-widest uppercase mb-4 font-medium">
                The Solution
              </p>
              <p className="text-gray-400 leading-relaxed">{data.solution}</p>
            </div>

            <div>
              <p className="text-amber-500 text-xs tracking-widest uppercase mb-4 font-medium">
                Results
              </p>
              <p className="text-gray-400 leading-relaxed">{data.results}</p>
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="text-amber-500 text-xs tracking-widest uppercase mb-4 font-medium">
              How It Got Built
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">{data.build_story}</p>

            <p className="text-gray-600 text-xs tracking-widest uppercase mb-4 font-medium">
              Technical Decisions
            </p>
            <div className="space-y-3">
              {(data.technical_decisions || []).map(
                (decision: string, i: number) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-amber-500/60 mt-0.5 flex-shrink-0">{'→'}</span>
                    <span className="text-gray-400 leading-relaxed">{decision}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Quote section */}
        <div className="border border-amber-500/20 bg-amber-950/10 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <p className="text-gray-600 text-xs tracking-widest uppercase mb-6">
            In Their Words
          </p>
          <blockquote className="text-white text-xl md:text-2xl font-medium leading-relaxed italic max-w-2xl mx-auto">
            "{data.quote}"
          </blockquote>
          <p className="text-gray-600 text-sm mt-6">— {data.builder_handle}</p>
        </div>

        {/* Share row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/5 rounded-xl p-6">
          <div>
            <p className="text-white font-medium text-sm">Share this case study</p>
            <p className="text-gray-600 text-xs mt-1 font-mono">
              trykoven.com/c/{slug}
            </p>
          </div>
          <div className="flex gap-3">
            <CopyButton slug={slug} />
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `My case study for ${data.title}: https://trykoven.com/c/${slug}\n\nGenerated with @trykoven`
              )}`}
              target="_blank"
              className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Share on X
            </a>
          </div>
        </div>
      </div>

      {/* Footer — the viral loop */}
      <footer className="border-t border-white/5 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-700 text-sm">
            This case study was generated by{' '}
            <a
              href="https://trykoven.com"
              className="text-amber-500/70 hover:text-amber-400 transition-colors"
            >
              Koven
            </a>
            {' '}— turn your GitHub repos into case studies that get you hired.
          </p>
        </div>
      </footer>
    </main>
  )
}
