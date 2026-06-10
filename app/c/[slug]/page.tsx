import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { CopyButton } from '@/components/ui/copy-button'
import DownloadPDFButton from '@/components/DownloadPDFButton'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params
}: PageProps) {
  const { slug } = await params
  const { data } = await supabase
    .from('case_studies')
    .select('title, one_liner, builder_handle')
    .eq('slug', slug)
    .single()

  if (!data) return { title: 'Case Study — Koven' }

  const ogImageUrl = `https://trykoven.com/api/og/${slug}`

  return {
    title: `${data.title} — Case Study`,
    description: data.one_liner,
    openGraph: {
      title: `${data.title} — Case Study`,
      description: data.one_liner,
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
      }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} — Case Study`,
      description: data.one_liner,
      images: [ogImageUrl],
    },
  }
}

export default async function CaseStudyPage({
  params
}: PageProps) {
  const { slug } = await params
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) notFound()

  const rawData = data.raw_data as any
  const commitCount = rawData?.github?.commitCount
  const daysActive = rawData?.github?.daysActive
  const publicUrl =
    `https://trykoven.com/c/${slug}`

  const shareText = encodeURIComponent(
    `Just built my ${data.title} case study with @trykoven 🔥\n\n${data.one_liner}\n\nFull story:`
  )
  const shareUrl = encodeURIComponent(publicUrl)

  return (
    <main style={{
      backgroundColor: '#0f0f0f',
      minHeight: '100vh',
      color: '#fff',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.5s ease forwards;
        }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.2s; }
        .fade-up-3 { animation-delay: 0.3s; }
        .fade-up-4 { animation-delay: 0.4s; }
        .fade-up-5 { animation-delay: 0.5s; }
        .fade-up-6 { animation-delay: 0.6s; }
      `}</style>

      {/* Nav */}
      <nav className="border-b border-white/5
        px-6 py-4 sticky top-0
        bg-[#0f0f0f]/90 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto
          flex justify-between items-center">
          <a href="/"
            className="text-gray-600 text-sm
              hover:text-gray-400 transition-colors
              flex items-center gap-2">
            <span className="text-amber-500
              font-bold">K</span>
            Koven
          </a>
          <span className="text-gray-700
            text-xs font-mono hidden md:block">
            trykoven.com/c/{slug}
          </span>
          <a
            href={`https://trykoven.com`}
            target="_blank"
            className="text-xs border border-white/10
              text-gray-500 px-3 py-1.5 rounded-lg
              hover:bg-white/5 transition-colors"
          >
            Get yours →
          </a>
        </div>
      </nav>

      <div id="case-study-content" className="max-w-4xl mx-auto
        px-6 py-16">

        {/* Header */}
        <div className="mb-16 fade-up fade-up-1">
          <div className="flex items-start
            justify-between flex-wrap gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-gray-600 text-xs
                tracking-widest uppercase mb-3">
                Case Study
              </p>
              <h1 className="text-white text-4xl
                md:text-5xl font-bold">
                {data.title}
              </h1>
              <p className="text-gray-400 text-lg
                mt-3 max-w-xl leading-relaxed">
                {data.one_liner}
              </p>
            </div>

            <div className="text-right shrink-0 min-w-[140px]">
              <p className="text-gray-600 text-xs mb-1">
                Built by
              </p>
              <p className="text-white font-medium text-lg">
                {data.builder_handle}
              </p>
              <div className="flex gap-3 mt-3
                text-xs text-gray-600 justify-end">
                <a href={data.github_url}
                  target="_blank"
                  className="hover:text-gray-400
                    transition-colors">
                  GitHub ↗
                </a>
                <a href={data.product_url}
                  target="_blank"
                  className="hover:text-gray-400
                    transition-colors">
                  Live ↗
                </a>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {commitCount && (
              <div className="flex items-center gap-2
                bg-[#111] border border-white/5
                rounded-full px-4 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full
                  bg-amber-500" />
                <span className="text-gray-400 text-xs">
                  {commitCount.toLocaleString()} commits
                </span>
              </div>
            )}
            {daysActive && (
              <div className="flex items-center gap-2
                bg-[#111] border border-white/5
                rounded-full px-4 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full
                  bg-amber-500" />
                <span className="text-gray-400 text-xs">
                  {daysActive} days active
                </span>
              </div>
            )}
            {(data.tech_stack || []).map((tech: string) => (
              <span key={tech}
                className="bg-gray-900 border
                  border-white/5 text-gray-300
                  text-xs px-3 py-1.5 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5
          mb-16 fade-up fade-up-2" />

        {/* 2-col content */}
        <div className="grid md:grid-cols-2
          gap-12 mb-16 items-start">

          <div className="space-y-10
            fade-up fade-up-3">
            <div>
              <p className="text-amber-500 text-xs
                tracking-widest uppercase mb-4
                font-medium">
                The Problem
              </p>
              <p className="text-gray-400
                leading-relaxed">
                {data.problem}
              </p>
            </div>

            <div>
              <p className="text-amber-500 text-xs
                tracking-widest uppercase mb-4
                font-medium">
                The Solution
              </p>
              <p className="text-gray-400
                leading-relaxed">
                {data.solution}
              </p>
            </div>

            <div>
              <p className="text-amber-500 text-xs
                tracking-widest uppercase mb-4
                font-medium">
                Results
              </p>
              <p className="text-gray-400
                leading-relaxed">
                {data.results}
              </p>
            </div>
          </div>

          <div className="fade-up fade-up-4">
            <p className="text-amber-500 text-xs
              tracking-widest uppercase mb-4
              font-medium">
              How It Got Built
            </p>
            <p className="text-gray-400
              leading-relaxed mb-8">
              {data.build_story}
            </p>

            <p className="text-amber-500 text-xs
              tracking-widest uppercase mb-4
              font-medium">
              Technical Decisions
            </p>
            <div className="space-y-3">
              {(data.technical_decisions || [])
                .map((d: string, i: number) => (
                <div key={i}
                  className="flex gap-3 text-sm">
                  <span className="text-amber-500/60
                    mt-0.5 shrink-0">→</span>
                  <span className="text-gray-400
                    leading-relaxed">
                    {d}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="border border-amber-500/20
          bg-amber-950/10 rounded-2xl p-8
          md:p-12 mb-16 text-center
          fade-up fade-up-5">
          <p className="text-gray-600 text-xs
            tracking-widest uppercase mb-6">
            In Their Words
          </p>
          <blockquote className="text-white
            text-xl md:text-2xl font-medium
            leading-relaxed italic
            max-w-2xl mx-auto">
            "{data.quote}"
          </blockquote>
          <p className="text-gray-600 text-sm mt-6">
            — {data.builder_handle}
          </p>
        </div>

        {/* Share row */}
        <div id="share-row" className="flex flex-col sm:flex-row
          items-center justify-between gap-4
          border border-white/5 rounded-xl p-6
          fade-up fade-up-6">
          <div className="text-center sm:text-left">
            <p className="text-white font-medium
              text-sm">
              Share this case study
            </p>
            <p className="text-gray-600 text-xs
              mt-1 font-mono">
              trykoven.com/c/{slug}
            </p>
          </div>
          <div className="flex gap-3">
            <DownloadPDFButton
                projectName={data.title}
                title={data.title}
                oneLiner={data.one_liner}
                problem={data.problem}
                solution={data.solution}
                results={data.results}
                howItGotBuilt={data.build_story}
                technicalDecisions={data.technical_decisions ?? []}
                builderHandle={data.builder_handle}
                commitCount={rawData?.github?.commitCount}
                daysActive={rawData?.github?.daysActive}
                techStack={data.tech_stack ?? []}
                slug={slug}
              />
            <CopyButton url={publicUrl} />
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black
                text-sm font-medium px-4 py-2
                rounded-lg hover:bg-gray-100
                transition-colors"
            >
              Share on X
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5
        py-10">
        <div className="max-w-4xl mx-auto
          px-6 text-center">
          <p className="text-gray-700 text-sm">
            Generated by{' '}
            <a href="https://trykoven.com"
              className="text-amber-500/70
                hover:text-amber-400
                transition-colors">
              Koven
            </a>
            {' '}— turn your GitHub into a
            case study that gets you hired.
          </p>
          <a
            href="https://trykoven.com"
            className="inline-block mt-3
              bg-amber-500 text-black text-xs
              font-bold px-4 py-2 rounded-lg
              hover:bg-amber-400 transition-colors"
          >
            Get your case study — $9 →
          </a>
        </div>
      </footer>
    </main>
  )
}
