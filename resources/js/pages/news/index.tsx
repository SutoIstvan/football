import { Head, Link, router } from '@inertiajs/react';
import { Calendar, ChevronRight, Eye, Search, Tag as TagIcon } from 'lucide-react';
import React, { useState } from 'react';
import PublicLayout from '../../layouts/public-layout';

interface ArticleItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    featured_image?: string;
    published_at: string;
    views_count: number;
    category?: { name: string; slug: string; color?: string };
    tags?: Array<{ id: number; name: string; slug: string }>;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url?: string;
    prev_page_url?: string;
    links: Array<{ url?: string; label: string; active: boolean }>;
}

interface NewsIndexProps {
    articles: PaginatedData<ArticleItem>;
    categories: Array<{ id: number; name: string; slug: string; color?: string; articles_count: number }>;
    tags: Array<{ id: number; name: string; slug: string; articles_count: number }>;
    currentCategory?: string;
    currentTag?: string;
    search?: string;
}

export default function NewsIndex({
    articles,
    categories,
    tags,
    currentCategory,
    currentTag,
    search: initialSearch,
}: NewsIndexProps) {
    const [searchVal, setSearchVal] = useState(initialSearch || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/hirek', {
            category: currentCategory,
            tag: currentTag,
            q: searchVal || undefined,
        });
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <PublicLayout>
            <Head title="Hírek & Cikkek | Paksi FC" />

            {/* Header Banner */}
            <div className="bg-[#006B3F] text-white py-12 px-4 sm:px-8 border-b-4 border-amber-400">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <span className="text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                            Paksi FC Hírarchívum
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1">
                            Hírek & Események
                        </h1>
                        <p className="text-emerald-100 text-sm mt-2 max-w-xl">
                            Minden hivatalos klubhír, mérkőzés beszámoló, átigazolási információ és
                            utánpótlás eredmény egy helyen.
                        </p>
                    </div>

                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="relative w-full md:w-80">
                        <input
                            type="text"
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            placeholder="Keresés a hírekben..."
                            className="w-full bg-emerald-950/60 border border-emerald-600/80 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        <Search className="w-4 h-4 text-emerald-300 absolute left-4 top-3.5" />
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
                {/* Category Pills Filter */}
                <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
                    <Link
                        href="/hirek"
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                            !currentCategory && !currentTag
                                ? 'bg-[#006B3F] text-white shadow-emerald-900/20'
                                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                    >
                        Összes kategória
                    </Link>

                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/hirek?category=${cat.slug}`}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
                                currentCategory === cat.slug
                                    ? 'bg-[#006B3F] text-white'
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            <span>{cat.name}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-bold">
                                {cat.articles_count}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Articles Grid */}
                {articles.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.data.map((art) => (
                            <Link
                                key={art.id}
                                href={`/hirek/${art.slug}`}
                                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col transform hover:-translate-y-1.5"
                            >
                                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                                    {art.featured_image ? (
                                        <img
                                            src={art.featured_image}
                                            alt={art.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-tr from-emerald-900 to-slate-900 flex items-center justify-center">
                                            <span className="font-black text-3xl text-emerald-300/30">
                                                PAKS
                                            </span>
                                        </div>
                                    )}
                                    {art.category && (
                                        <span
                                            className="absolute top-3 left-3 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md text-white shadow"
                                            style={{
                                                backgroundColor: art.category.color || '#006B3F',
                                            }}
                                        >
                                            {art.category.name}
                                        </span>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <span>{formatDate(art.published_at)}</span>
                                            <span>·</span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3.5 h-3.5" />
                                                {art.views_count}
                                            </span>
                                        </div>

                                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-[#006B3F] transition line-clamp-2 leading-snug">
                                            {art.title}
                                        </h3>

                                        {art.excerpt && (
                                            <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                                {art.excerpt}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#006B3F]">
                                        <span>Részletes cikk</span>
                                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                        <p className="text-slate-500 font-bold text-base">
                            Nem található hír a megadott feltételekkel.
                        </p>
                        <Link
                            href="/hirek"
                            className="inline-block mt-4 text-xs font-bold text-[#006B3F] underline"
                        >
                            Összes hír megjelenítése
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {articles.links.length > 3 && (
                    <div className="mt-12 flex justify-center items-center gap-1.5">
                        {articles.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                                    link.active
                                        ? 'bg-[#006B3F] text-white shadow'
                                        : !link.url
                                          ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}

