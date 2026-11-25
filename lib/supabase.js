import { createClient } from '@supabase/supabase-js'

let cliente = null

export function getSupabase() {
  if (typeof window === 'undefined') return null
  if (!cliente) {
    cliente = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
    )
  }
  return cliente
}
