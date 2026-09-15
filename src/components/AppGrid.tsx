import { useEffect, useState, useMemo } from 'react';
import { Loader2, PackageX } from 'lucide-react';
import AppCard from '../components/AppCard';
import type { App, Category } from '../lib/types';

export default function AppGrid({ query, category }: { query: string; category: string | null }) {
  const [apps, setApps] = useState<App[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([fetch('/api/apps').then((r) => r.json()), fetch('/api/categories').then((r) => r.json())])
      .then(([appsData, catsData]) => { setApps(Array.isArray(appsData) ? appsData : []); setCategories(Array.isArray(catsData) ? catsData : []); })
      .catch((err) => console.error('Load failed', err)).finally(() => setLoading(false));
  }, []);
  const filtered = useMemo(() => { const q = query.trim().toLowerCase(); return apps.filter((a) => !a.is_hidden).filter((a) => (category ? a.category?.slug === category : true)).filter((a) => q ? a.name.toLowerCase().includes(q) || a.developer.toLowerCase().includes(q) || a.short_description.toLowerCase().includes(q) || (a.tags ?? []).some((t) => t.toLowerCase().includes(q)) : true); }, [apps, query, category]);
  if (loading) return <div className="flex flex-col items-center justify-center py-32 gap-3"><Loader2 className="w-10 h-10 animate-spin text-violet-500" /><p className="text-sm text-gray-500">Loading the store…</p></div>;
  if (filtered.length === 0) return <div className="flex flex-col items-center justify-center py-32 gap-3 text-center"><div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center"><PackageX className="w-10 h-10 text-gray-400" /></div><h3 className="text-lg font-semibold">No apps found</h3><p className="text-sm text-gray-500 max-w-sm">Try adjusting your search or category filters to discover more apps.</p></div>;
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{filtered.map((app) => <AppCard key={app.id} app={app} />)}</div>;
}
