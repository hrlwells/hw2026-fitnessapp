// Supabase clients. Anon client for the browser/reads; service client for
// server-side writes in API routes (bypasses RLS with the service role key).
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Browser-safe client (anon key). Fine for reads while wide-open.
export const supabase = createClient(
  url,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Server-only client (service role). Never import this into a client component.
export function serviceClient() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}
