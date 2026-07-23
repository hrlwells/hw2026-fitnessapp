// GET  /api/log      -> { logs: { "YYYY-MM-DD": {day obj}, ... } }
// POST /api/log      -> upsert one day: { log_date, data:{...} }
import { serviceClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sb = serviceClient();
  const { data, error } = await sb
    .from('fitness_log').select('log_date, data, updated_at').order('log_date', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const logs = {};
  let lastSaved = null;
  for (const row of data || []) {
    logs[row.log_date] = row.data || {};
    if (row.updated_at && (!lastSaved || row.updated_at > lastSaved)) lastSaved = row.updated_at;
  }
  return NextResponse.json({ logs, lastSaved });
}

export async function POST(request) {
  const sb = serviceClient();
  const body = await request.json();
  if (!body.log_date) {
    return NextResponse.json({ error: 'log_date required' }, { status: 400 });
  }
  const { error } = await sb.from('fitness_log').upsert(
    { log_date: body.log_date, data: body.data || {}, updated_at: new Date().toISOString() },
    { onConflict: 'log_date' }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE /api/log -> wipe all day logs (used by the Setup "reset" button).
export async function DELETE() {
  const sb = serviceClient();
  const { error } = await sb.from('fitness_log').delete().neq('log_date', '1900-01-01');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
