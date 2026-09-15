import type { Category } from '../lib/types';

interface Props { categories: Category[]; selected: string | null; onSelect: (slug: string | null) => void; }

export default function CategoryPills({ categories, selected, onSelect }: Props) {
  return <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"><button onClick={() => onSelect(null)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition ${selected === null ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/30' : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'}`}>All</button>{categories.map((c) => <button key={c.id} onClick={() => onSelect(c.slug)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition ${selected === c.slug ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/30' : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'}`}>{c.name}</button>)}</div>;
}
