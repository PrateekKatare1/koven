import { NextRequest, NextResponse } from 'next/server'
import { paddle } from '@/lib/paddle'

export async function POST(req: NextRequest) {
  const signature = req.headers.get('paddle-signature') ?? ''
  const rawBody = await req.text()

  try {
    const event = await paddle.webhooks.unmarshal(
      rawBody,
      process.env.PADDLE_WEBHOOK_SECRET!,
      signature
    )

    switch (event.eventType) {
      case 'transaction.completed': {
        const transaction = event.data as any
        const email = transaction.customer?.email
        const priceId = transaction.items?.[0]?.price?.id

        if (!email) break

        // TODO Day 6: mark user as paid in Supabase
        console.log(`Payment completed: ${email} — ${priceId}`)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Paddle webhook error:', err)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}
