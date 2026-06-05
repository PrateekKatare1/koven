import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey
)

export function generateSlug(
  handle: string,
  projectName: string
): string {
  const cleanHandle = handle
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

  const cleanProject = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  const base = `${cleanHandle}-${cleanProject}`
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 6)

  return `${base}-${random}`
}
