'use client'

import { useState, useRef } from 'react'

interface Props {
  projectName: string
  title: string
  oneLiner: string
  problem: string
  solution: string
  results: string
  howItGotBuilt: string
  technicalDecisions: string[]
  builderHandle: string
  commitCount?: number
  daysActive?: number
  techStack?: string[]
  slug: string
}

export default function DownloadPDFButton(props: Props) {
  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle')
  const printRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    setStatus('generating')

    const { toPng } = await import('html-to-image')
    const { jsPDF } = await import('jspdf')

    const node = printRef.current
    if (!node) return

    node.style.left = '0'
    node.style.opacity = '1'
    node.style.pointerEvents = 'none'

    await new Promise(r => setTimeout(r, 150))

    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#0f0f0f',
      width: 794,
      height: 1123,
    })

    node.style.left = '-9999px'
    node.style.opacity = '0'

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    })

    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()

    pdf.addImage(dataUrl, 'PNG', 0, 0, pageW, pageH)

    const filename = props.projectName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    pdf.save(`${filename}-case-study.pdf`)

    setStatus('done')
    setTimeout(() => setStatus('idle'), 2500)
  }

  const label = {
    idle: 'Download as PDF',
    generating: 'Generating...',
    done: 'Downloaded ✓',
  }[status]

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={status !== 'idle'}
        style={{
          border: '1px solid rgba(245,158,11,0.3)',
          color: status === 'done' ? '#4ade80' : '#fbbf24',
          background: 'transparent',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: status !== 'idle' ? 'not-allowed' : 'pointer',
          opacity: status === 'generating' ? 0.7 : 1,
          transition: 'all 0.2s',
        }}
      >
        {label}
      </button>

      {/* Off-screen PDF canvas — hex/rgb colors only, no Tailwind classes */}
      <div
        ref={printRef}
        style={{
          position: 'fixed',
          top: 0,
          left: '-9999px',
          opacity: 0,
          width: '794px',
          height: '1123px',
          overflow: 'hidden',
          backgroundColor: '#0f0f0f',
          color: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          padding: '40px 48px',
          boxSizing: 'border-box',
          zIndex: -1,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#6b7280', textTransform: 'uppercase' }}>
            Case Study
          </span>
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '0 0 8px 0', color: '#ffffff', lineHeight: 1.15 }}>
          {props.title}
        </h1>
        <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 16px 0' }}>
          {props.oneLiner}
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {props.commitCount && (
            <span style={{ background: '#1f1f1f', border: '1px solid #2d2d2d', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: '#9ca3af' }}>
              ● {props.commitCount} commits
            </span>
          )}
          {props.daysActive && (
            <span style={{ background: '#1f1f1f', border: '1px solid #2d2d2d', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: '#9ca3af' }}>
              ● {props.daysActive} days active
            </span>
          )}
          {props.techStack?.map(t => (
            <span key={t} style={{ background: '#1f1f1f', border: '1px solid #2d2d2d', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: '#d1d5db' }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ height: '1px', background: '#1f1f1f', marginBottom: '24px' }} />

        {/* Two-column body */}
        <div style={{ display: 'flex', gap: '40px', marginBottom: '24px' }}>
          {/* Left col */}
          <div style={{ flex: 1 }}>
            <Section label="THE PROBLEM" body={props.problem} />
            <Section label="THE SOLUTION" body={props.solution} />
            <Section label="RESULTS" body={props.results} />
          </div>

          {/* Right col */}
          <div style={{ flex: 1 }}>
            <Section label="HOW IT GOT BUILT" body={props.howItGotBuilt} />

            {props.technicalDecisions?.length > 0 && (
              <div>
                <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#f59e0b', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                  TECHNICAL DECISIONS
                </span>
                {props.technicalDecisions.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ color: '#f59e0b', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>→</span>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>{d}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid #1f1f1f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#4b5563' }}>
            trykoven.com/c/{props.slug}
          </span>
          <span style={{ fontSize: '11px', color: '#f59e0b', opacity: 0.6 }}>
            Generated with Koven
          </span>
        </div>
      </div>
    </>
  )
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#f59e0b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
        {label}
      </span>
      <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
        {body}
      </p>
    </div>
  )
}
