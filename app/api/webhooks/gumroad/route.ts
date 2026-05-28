import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.formData()

  const email = body.get('email')
  const productId = body.get('product_id')
  const paid = body.get('paid')

  if (paid !== 'true') {
    return NextResponse.json({ received: true })
  }

  console.log(`Gumroad sale: ${email} — product ${productId}`)

  return NextResponse.json({ received: true })
}
