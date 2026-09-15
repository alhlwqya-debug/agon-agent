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

function normalizeApp(a) {
  if (!a) return a;
  return {
    ...a,
    screenshots: normalizeArray(a.screenshots),
    tags: normalizeArray(a.tags),
  };
}

function normalizeApps(arr) {
  return (arr ?? []).map(normalizeApp);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const includeHidden = req.query.include_hidden === 'true';
      let query = supabase
        .from('apps')
        .select('*, category:categories(*)')
        .order('created_at', { ascending: false });
      if (!includeHidden) query = query.eq('is_hidden', false);
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(normalizeApps(data));
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const payload = {
        slug: body.slug,
        name: body.name,
        developer: body.developer,
        short_description: body.short_description,
        description: body.description ?? '',
        category_id: body.category_id ?? null,
        version: body.version ?? '1.0.0',
        size_mb: Number(body.size_mb) || 0,
        icon_url: body.icon_url ?? '',
        // store arrays as JSON strings (text columns)
        screenshots: JSON.stringify(body.screenshots ?? []),
        download_url: body.download_url ?? '',
        download_count: Number(body.download_count) || 0,
        rating: Number(body.rating) || 0,
        reviews_count: Number(body.reviews_count) || 0,
        system_requirements: body.system_requirements ?? '',
        tags: JSON.stringify(body.tags ?? []),
        changelog: body.changelog ?? '',
        is_featured: !!body.is_featured,
        is_hidden: !!body.is_hidden,
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await supabase
        .from('apps')
        .insert(payload)
        .select('*, category:categories(*)')
        .single();
      if (error) throw error;
      return res.status(201).json(normalizeApp(data));
    }

    if (req.method === 'PUT') {
      const { id, ...rest } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id is required' });
      const update = { ...rest, updated_at: new Date().toISOString() };
      if (Array.isArray(update.screenshots)) update.screenshots = JSON.stringify(update.screenshots);
      if (Array.isArray(update.tags)) update.tags = JSON.stringify(update.tags);
      const { data, error } = await supabase
        .from('apps')
        .update(update)
        .eq('id', id)
        .select('*, category:categories(*)')
        .single();
      if (error) throw error;
      return res.status(200).json(normalizeApp(data));
    }

    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id is required' });
      const { error } = await supabase.from('apps').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('apps api error:', err);
    res.status(500).json({ error: err.message });
  }
}
