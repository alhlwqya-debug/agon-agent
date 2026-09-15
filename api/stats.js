import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const [{ data: apps }, { data: categories }, { data: reviews }] = await Promise.all([
      supabase.from('apps').select('id, download_count, rating, is_featured, is_hidden'),
      supabase.from('categories').select('id'),
      supabase.from('reviews').select('id'),
    ]);

    const totalDownloads = (apps ?? []).reduce((s, a) => s + (a.download_count ?? 0), 0);
    const featured = (apps ?? []).filter((a) => a.is_featured).length;
    const hidden = (apps ?? []).filter((a) => a.is_hidden).length;
    const avgRating =
      apps && apps.length
        ? Math.round((apps.reduce((s, a) => s + (a.rating ?? 0), 0) / apps.length) * 10) / 10
        : 0;

    return res.status(200).json({
      totalApps: apps?.length ?? 0,
      totalDownloads,
      totalCategories: categories?.length ?? 0,
      totalReviews: reviews?.length ?? 0,
      featured,
      hidden,
      avgRating,
    });
  } catch (err) {
    console.error('stats api error:', err);
    res.status(500).json({ error: err.message });
  }
}
