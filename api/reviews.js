import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const appId = Number(req.query.app_id);
      if (!appId) return res.status(400).json({ error: 'app_id required' });
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('app_id', appId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data ?? []);
    }

    if (req.method === 'POST') {
      const { app_id, user_name, rating, comment } = req.body || {};
      if (!app_id || !user_name || !comment) {
        return res.status(400).json({ error: 'app_id, user_name and comment required' });
      }
      const safeRating = Math.max(1, Math.min(5, Number(rating) || 5));

      const { data, error } = await supabase
        .from('reviews')
        .insert({ app_id, user_name, rating: safeRating, comment })
        .select()
        .single();
      if (error) throw error;

      const { data: allReviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('app_id', app_id);
      const reviews_count = allReviews?.length ?? 1;
      const rating_avg =
        reviews_count > 0
          ? Math.round(((allReviews ?? []).reduce((s, r) => s + (r.rating ?? 0), 0) / reviews_count) * 10) / 10
          : safeRating;
      await supabase
        .from('apps')
        .update({ reviews_count, rating: rating_avg, updated_at: new Date().toISOString() })
        .eq('id', app_id);

      return res.status(201).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('reviews api error:', err);
    res.status(500).json({ error: err.message });
  }
}
