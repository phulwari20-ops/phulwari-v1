/**
 * Single source of truth for Supabase credentials.
 *
 * Why this file exists:
 * Supabase renamed the browser-safe key from "anon key" to "publishable key".
 * Different files in this project were reading different variable names, so a
 * deployment that only defined one of them left half the app throwing
 * "Your project's URL and Key are required to create a Supabase client!".
 * That is what broke the birthday reservation form and blanked the party
 * packages section in production.
 *
 * Every accepted spelling is resolved here, so no route can drift again.
 *
 * NOTE: these are the *publishable* credentials. Next.js inlines every
 * NEXT_PUBLIC_* value into the browser bundle anyway, so they are public by
 * design and safe to keep as a build-time fallback. Row Level Security in
 * Postgres is what actually protects the data — never put the service_role
 * key here.
 */

const FALLBACK_URL = 'https://ftnbzukwjvgxdnkrvuer.supabase.co'
const FALLBACK_KEY = 'sb_publishable_GFV9g9M3vPdFlOtFZ_dnEA_bR2Cm0HV'

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim() !== '') return value.trim()
  }
  return undefined
}

export function getSupabaseUrl(): string {
  const url = firstNonEmpty(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_URL,
    FALLBACK_URL
  )
  if (!url) {
    throw new Error(
      'Supabase URL missing. Set NEXT_PUBLIC_SUPABASE_URL in your environment.'
    )
  }
  return url
}

export function getSupabaseKey(): string {
  const key = firstNonEmpty(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    process.env.SUPABASE_ANON_KEY,
    FALLBACK_KEY
  )
  if (!key) {
    throw new Error(
      'Supabase key missing. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ' +
        '(or NEXT_PUBLIC_SUPABASE_ANON_KEY) in your environment.'
    )
  }
  return key
}

/** True when credentials came from the environment rather than the fallback. */
export function isSupabaseConfiguredFromEnv(): boolean {
  return Boolean(
    firstNonEmpty(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_URL) &&
      firstNonEmpty(
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        process.env.SUPABASE_PUBLISHABLE_KEY,
        process.env.SUPABASE_ANON_KEY
      )
  )
}
