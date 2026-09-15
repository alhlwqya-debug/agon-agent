import { Star } from 'lucide-react';

export default function StarRating({ value, onChange, size = 18, readonly = false }: { value: number; onChange?: (v: number) => void; size?: number; readonly?: boolean; }) {
  return <div className="inline-flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button type="button" key={n} disabled={readonly} onClick={() => !readonly && onChange?.(n)} className={`transition ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}><Star width={size} height={size} className={n <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-700'} /></button>)}</div>;
}
