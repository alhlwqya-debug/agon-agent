import supabase from './db-client.js';

export async function requireAdmin(req, res) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return null;
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    res.status(401).json({ error: 'Invalid authentication token' });
    return null;
  }

  const user = data.user;
  const role = user.app_metadata?.role;
  const configuredEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const emailAllowed = user.email && configuredEmails.includes(user.email.toLowerCase());

  if (role !== 'admin' && !emailAllowed) {
    res.status(403).json({ error: 'Administrator access required' });
    return null;
  }

  return user;
}
