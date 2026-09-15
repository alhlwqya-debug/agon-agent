import supabase from './db-client.js';
import { requireAdmin } from './_auth.js';

const ALLOWED_BUCKETS = ['icons', 'screenshots', 'apps'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    if (!(await requireAdmin(req, res))) return;

    const { fileName, fileBase64, contentType, bucket } = req.body || {};
    if (!fileName || !fileBase64) return res.status(400).json({ error: 'fileName and fileBase64 are required' });

    const bucketName = ALLOWED_BUCKETS.includes(bucket) ? bucket : 'icons';
    const buffer = Buffer.from(fileBase64, 'base64');
    const safeName = String(fileName).replace(/[^\w.\-]/g, '_');
    const path = `${Date.now()}-${safeName}`;

    const { error: uploadErr } = await supabase.storage.from(bucketName).upload(path, buffer, {
      contentType: contentType || 'application/octet-stream',
      upsert: true,
    });
    if (uploadErr) throw uploadErr;

    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(path);
    return res.status(200).json({ ok: true, url: urlData.publicUrl, path });
  } catch (err) {
    console.error('upload api error:', err);
    return res.status(500).json({ error: err.message });
  }
}
