import supabase from './db-client.js';

function normalizeArray(v) {
  if (v == null) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const slug = req.query.slug;
    if (!slug) return res.status(400).json({ error: 'slug required' });

    const { data, error } = await supabase
      .from('apps')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .eq('is_hidden', false)
      .maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'App not found' });

    return res.status(200).json({
      ...data,
      screenshots: normalizeArray(data.screenshots),
      tags: normalizeArray(data.tags),
    });
  } catch (err) {
    console.error('app detail error:', err);
    res.status(500).json({ error: err.message });
  }
}
