import { NextRequest, NextResponse } from 'next/server'
import { verifyCheckoutSession } from '@/lib/polar'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { checkoutId } = await req.json()

    if (!checkoutId) {
      return NextResponse.json(
        { paid: false },
        { status: 400 }
      )
    }

    const { paid, email } = await verifyCheckoutSession(
      checkoutId
    )

    if (!paid || !email) {
      return NextResponse.json({ paid: false })
    }

    // Save to paid_users
    await supabaseAdmin
      .from('paid_users')
      .upsert({ email })

    return NextResponse.json({ paid: true, email })
  } catch {
    return NextResponse.json(
      { paid: false },
      { status: 500 }
    )
  }
}
