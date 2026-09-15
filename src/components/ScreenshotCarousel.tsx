import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScreenshotCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return null;
  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  return <div className="relative"><div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 to-pink-100 dark:from-violet-950/40 dark:to-pink-950/40 ring-1 ring-gray-200 dark:ring-gray-800"><img src={images[idx]} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" /></div>{images.length > 1 && <><button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-black/70 transition" aria-label="Previous screenshot"><ChevronLeft className="w-5 h-5" /></button><button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-black/70 transition" aria-label="Next screenshot"><ChevronRight className="w-5 h-5" /></button><div className="flex justify-center gap-1.5 mt-3">{images.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-violet-600' : 'w-1.5 bg-gray-300 dark:bg-gray-700'}`} aria-label={`Go to screenshot ${i + 1}`} />)}</div></>}</div>;
}
