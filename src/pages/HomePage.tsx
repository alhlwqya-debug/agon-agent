import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CategoryPills from '../components/CategoryPills';
import AppGrid from '../components/AppGrid';
import type { Category } from '../lib/types';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(d => setCategories(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);
  return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <Header onSearch={setQuery} />
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Hero />
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight">Browse the store</h2>
        <p className="text-sm text-gray-500 mt-1">{query ? `Results for "${query}"` : category ? `Category: ${categories.find(c => c.slug === category)?.name ?? ''}` : 'Hand-picked apps across every category'}</p>
        <CategoryPills categories={categories} selected={category} onSelect={setCategory} />
      </div>
      <AppGrid query={query} category={category} />
    </main>
    <Footer />
  </div>;
}
