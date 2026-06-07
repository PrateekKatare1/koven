import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { supabaseAdmin } from '@/lib/supabase'

function verifySignature(
  rawBody: string,
  webhookId: string,
  webhookTimestamp: string,
  signature: string,
  secret: string
): boolean {
  try {
    const message = `${webhookId}.${webhookTimestamp}.${rawBody}`
    const hmac = createHmac('sha256', secret)
    hmac.update(message)
    const expected = `v1,${hmac.digest('base64')}`
    return expected === signature
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  const webhookId = req.headers.get('webhook-id') ?? ''
  const webhookTimestamp = req.headers.get('webhook-timestamp') ?? ''
  const webhookSignature = req.headers.get('webhook-signature') ?? ''
  const secret = process.env.POLAR_WEBHOOK_SECRET ?? ''

  if (!verifySignature(rawBody, webhookId, webhookTimestamp, webhookSignature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.type === 'order.created') {
    const email = event.data?.customer?.email
    if (email) {
      const { error } = await supabaseAdmin
        .from('paid_users')
        .upsert(
          { email: email.toLowerCase().trim(), created_at: new Date().toISOString() },
          { onConflict: 'email' }
        )

      if (error) {
        console.error('Supabase upsert error:', error)
        return NextResponse.json({ error: 'Failed to record purchase' }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
