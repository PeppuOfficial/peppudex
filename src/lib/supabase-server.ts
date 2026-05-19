/**
 * Supabase service-role client · server-only.
 *
 * Reads `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` from the
 * environment (set both in Vercel + `.env.local`). The service role
 * bypasses RLS · NEVER import this file into a client component.
 *
 * Returns null when env vars are missing so that local development
 * without Supabase credentials still type-checks. Callers should
 * surface a friendly error in that branch.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return cached;
}
