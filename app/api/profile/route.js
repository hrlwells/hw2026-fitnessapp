// GET  /api/profile -> { profile: {...} }
// POST /api/profile -> upsert profile: { data:{...} }
import { serviceClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sb = serviceClient();
  const { data, error } = await sb
    .from('fitness_profile').select('data').eq('id', 1).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ profile: data ? data.data : null });
}

export async function POST(request) {
  const sb = serviceClient();
  const body = await request.json();
  const { error } = await sb.from('fitness_profile').upsert(
    { id: 1, data: body.data || {}, updated_at: new Date().toISOString() },
    { onConflict: 'id' }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
