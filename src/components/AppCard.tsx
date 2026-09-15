import { Link } from 'react-router-dom';
import { Star, Download, HardDrive, ShieldCheck } from 'lucide-react';
import type { App } from '../lib/types';
import { formatNumber, formatSize } from '../lib/utils';

export default function AppCard({ app }: { app: App }) {
  return (
    <Link to={`/apps/${app.slug}`} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-violet-500 dark:hover:border-violet-500 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10">
      <div className="aspect-[4/3] bg-gradient-to-br from-violet-100 via-fuchsia-50 to-pink-100 dark:from-violet-950/40 dark:via-fuchsia-950/30 dark:to-pink-950/40 relative overflow-hidden">
        <img src={app.icon_url} alt={app.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        {app.is_featured && <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">Featured</span>}
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3 mb-2">
          <img src={app.icon_url} alt="" className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-200 dark:ring-gray-800" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%237c3aed"><rect width="24" height="24" rx="6"/></svg>'; }} />
          <div className="flex-1 min-w-0"><h3 className="font-bold truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition">{app.name}</h3><p className="text-xs text-gray-500 truncate">{app.developer}</p></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 min-h-[2.5rem]">{app.short_description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-3"><span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /><span className="font-semibold text-gray-900 dark:text-gray-100">{app.rating.toFixed(1)}</span></span><span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" />{formatSize(app.size_mb)}</span></div>
          <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" />{formatNumber(app.download_count)}</span>
        </div>
        <div className="flex items-center justify-between"><span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase"><ShieldCheck className="w-3 h-3" /> Verified</span><span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{app.category?.name ?? 'App'}</span></div>
      </div>
    </Link>
  );
}
