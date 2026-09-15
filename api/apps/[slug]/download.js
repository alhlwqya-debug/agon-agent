import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const slug = req.query.slug;
    if (!slug) return res.status(400).json({ error: 'slug required' });

    const { data: app, error: fetchErr } = await supabase
      .from('apps')
      .select('id, download_count')
      .eq('slug', slug)
      .maybeSingle();
    if (fetchErr) throw fetchErr;
    if (!app) return res.status(404).json({ error: 'App not found' });

    const newCount = (app.download_count ?? 0) + 1;
    const { data, error } = await supabase
      .from('apps')
      .update({ download_count: newCount, updated_at: new Date().toISOString() })
      .eq('id', app.id)
      .select('download_count')
      .single();
    if (error) throw error;
    return res.status(200).json({ ok: true, download_count: data.download_count });
  } catch (err) {
    console.error('download api error:', err);
    res.status(500).json({ error: err.message });
  }
}
