import { ImageResponse } from '@vercel/og'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data } = await supabase
    .from('case_studies')
    .select('title, one_liner, builder_handle, tech_stack')
    .eq('slug', params.slug)
    .single()

  const title = data?.title ?? 'Case Study'
  const oneLiner = data?.one_liner ??
    'Generated with Koven'
  const handle = data?.builder_handle ?? '@builder'
  const stack = (data?.tech_stack ?? [])
    .slice(0, 4)
    .join(' · ')

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0f0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: Koven badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div style={{
            background: '#f59e0b',
            color: '#000',
            fontWeight: 800,
            fontSize: '18px',
            padding: '6px 16px',
            borderRadius: '8px',
          }}>
            K
          </div>
          <span style={{
            color: '#6b7280',
            fontSize: '16px',
          }}>
            Case Study — trykoven.com
          </span>
        </div>

        {/* Middle: Title + one-liner */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <div style={{
            color: '#ffffff',
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: '800px',
          }}>
            {title}
          </div>
          <div style={{
            color: '#9ca3af',
            fontSize: '28px',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}>
            {oneLiner}
          </div>
        </div>

        {/* Bottom: handle + stack + branding */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <div style={{
              color: '#f59e0b',
              fontSize: '20px',
              fontWeight: 600,
            }}>
              {handle}
            </div>
            {stack && (
              <div style={{
                color: '#374151',
                fontSize: '16px',
              }}>
                {stack}
              </div>
            )}
          </div>

          <div style={{
            color: '#1f2937',
            fontSize: '16px',
            textAlign: 'right',
          }}>
            Built with Koven
          </div>
        </div>

        {/* Amber accent line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #f59e0b, #991b1b)',
        }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
