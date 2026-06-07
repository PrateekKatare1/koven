import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const email = body?.email

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ paid: false, error: 'Email required' }, { status: 400 })
  }

  const { data } = await supabaseAdmin
    .from('paid_users')
    .select('email')
    .eq('email', email.toLowerCase().trim())
    .single()

  return NextResponse.json({ paid: !!data })
}
