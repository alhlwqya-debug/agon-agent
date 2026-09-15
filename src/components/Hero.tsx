import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-8 sm:p-12 mb-10 shadow-2xl shadow-violet-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-pink-400/30 blur-3xl" />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-semibold mb-4"><Sparkles className="w-3 h-3" /> New season · Curated drops</span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mb-3">Discover & download the apps you love.</h1>
        <p className="text-white/80 text-base sm:text-lg max-w-xl mb-6">A blazing-fast app store with handpicked tools, games and utilities — vetted, scanned and ready to install in seconds.</p>
        <div className="flex flex-wrap gap-4 text-white/90 text-sm"><span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-yellow-300" /> Lightning fast</span><span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-300" /> Verified & safe</span><span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-pink-200" /> Daily updates</span></div>
      </div>
    </section>
  );
}
