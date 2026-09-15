import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Loader2, AlertCircle } from 'lucide-react';
import supabase from '../lib/supabase';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user) {
    navigate('/admin', { replace: true });
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigte('/admin');
    } catch (err: any) {
      setError(err.message ?? 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div class="w-full max-w-md">
        <a href="/" class="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-xl">
            <Shield class="w-6 h-6 text-white" />
          </div>
        </a>
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl">
          <h1 class="text-2xl font-black text-center mb-2">Admin sign in</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Sign in with an administrator account.</p>
          <form onSubmit={submit} class="space-y-4">
            <div><label className="block text-sm font-medium mb-1.5">Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 outline-none text-sm" placeholder="admin@store.com" /></div>
            <div><label class="block text-sm font-medium mb-1.5">Password</label><input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 outline-none text-sm" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"óãÂöF—cà¢¶W'&÷"bbƒÆF—b6Æ73Ò&fÆW‚—FV×2×7F'BvÓ"Ó2&÷VæFVB×†Â&r×&VBÓSF&³¦&r×&VBÓ“Só3FW‡B×&VBÓsF&³§FW‡B×&VBÓ3FW‡B×6Ò#ãÄÆW'D6—&6ÆR6Æ74æÖSÒ'rÓB‚ÓB×BÓãR6‡&–æ²Ó"óãÇ7ãç¶W'&÷'ÓÂ÷7ããÂöF—câ—Ğ €€€€€€€€€€€€ñ‰ÕÑÑ½¸ÑåÁ”ô‰ÍÕ‰µ¥Ğˆ‘¥Í…‰±•õí±½…‘¥¹ô±…ÍÍ9…µ”ô‰Üµ™Õ±°Áà´ĞÁä´ÌÉ½Õ¹‘•µá°‰œµÉ…‘¥•¹ĞµÑ¼µÈ™É½´µÙ¥½±•Ğ´ØÀÀÑ¼µÁ¥¹¬´ØÀÀÑ•áĞµİ¡¥Ñ”™½¹ĞµÍ•µ¥‰½±Í¡…‘½Üµ±œÍ¡…‘½ÜµÙ¥½±•Ğ´ÔÀÀ¼ÌÀ¡½Ù•ÈéÍ¡…‘½Üµá°ÑÉ…¹Í¥Ñ¥½¸‘¥Í…‰±•é½Á…¥Ñä´ØÀ™±•à¥Ñ•µÌµ•¹Ñ•È©ÕÍÑ¥™äµ•¹Ñ•È…À´Èˆùí±½…‘¥¹œ€˜˜€ñ1½…‘•ÈÈ±…ÍÍ9…µ”ô‰Ü´Ğ ´Ğ…¹¥µ…Ñ”µÍÁ¥¸ˆ€¼ùôM¥¸¥¸ğ½‰ÕÑÑ½¸ø(€€€€€€€€€€ğ½™½É´ø(€€€€€€€€ğ½‘¥Øø(€€€€€€€€ñÀ±…ÍÌô‰Ñ•áĞµ•¹Ñ•ÈÑ•áĞµáÌÑ•áĞµÉ…ä´ÔÀÀµĞ´Øˆøñ„¡É•˜ôˆ¼ˆ±…ÍÌô‰¡½Ù•ÈéÑ•áĞµÙ¥½±•Ğ´ØÀÀˆûŠ@	…¬Ñ¼ÍÑ½É”ğ½„øğ½Àø(€€€€€€ğ½‘¥Øø(€€€€ğ½‘¥Øø(€€¤ì)ô(