// Supabase clients.
//  - `supabase`      : browser client, used ONLY for auth (magic link / session).
//  - `serviceClient` : server-only client that bypasses RLS. Never import in a
//                      client component.
//  - `requireUser`   : verifies the caller's session on API routes.
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Browser client — handles sign-in and keeps the session fresh across reloads.
export const supabase = createClient(
  url,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

// Server-only client (service role). Bypasses RLS — never expose to the browser.
export function serviceClient() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

// Verify the bearer token sent by the app. Returns the user, or null if the
// caller isn't signed in or isn't the allowed account.
export async function requireUser(request) {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;

  const { data, error } = await serviceClient().auth.getUser(token);
  if (error || !data || !data.user) return null;

  // Allowlist: only this email may read or write. Set ALLOWED_EMAIL in Vercel.
  const allowed = (process.env.ALLOWED_EMAIL || '').toLowerCase().trim();
  const email = (data.user.email || '').toLowerCase().trim();
  if (allowed && email !== allowed) return null;

  return data.user;
}
