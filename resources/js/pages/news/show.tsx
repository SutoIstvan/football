import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    ChevronRight,
    Eye,
    Facebook,
    Share2,
    Shield,
    Tag as TagIcon,
    User,
} from 'lucide-react';
import React from 'react';
import PublicLayout from '../../layouts/public-layout';
import { storageUrl } from '../../lib/utils';

interface ArticleDetailProps {
    article: {
        id: number;
        title: string;
        slug: string;
        excerpt?: string;
        content: string;
        featured_image?: string;
        published_at: string;
        views_count: number;
        category?: { name: string; slug: string; color?: string };
        author?: { name: string };
        tags?: Array<{ id: number; name: string; slug: string }>;
    };
    relatedArticles: Array<{
        id: number;
        title: string;
        slug: string;
        featured_image?: string;
        published_at: string;
        category?: { name: string; color?: string };
    }>;
}

export default function ArticleShow({ article, relatedArticles }: ArticleDetailProps) {
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <PublicLayout>
            <Head title={`${article.title} | Paksi FC`} />

            {/* Breadcrumbs & Navigation */}
            <div className="bg-slate-100 border-b border-slate-200 py-3 px-4 sm:px-8">
                <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-slate-500">
                    <Link href="/" className="hover:text-emerald-700">
                        Főoldal
                    </Link>
                    <span>/</span>
                    <Link href="/hirek" className="hover:text-emerald-700">
                        Hírek
                    </Link>
                    <span>/</span>
                    <span className="text-slate-800 font-bold truncate max-w-xs sm:max-w-md">
                        {article.title}
                    </span>
                </div>
            </div>

            {/* Article Container */}
            <article className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
                <Link
                    href="/hirek"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Vissza a hírekhez
                </Link>

                {/* Article Header */}
                <header className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        {article.category && (
                            <span
                                className="px-3 py-1 rounded-lg text-xs font-bold text-white shadow"
                                style={{
                                    backgroundColor: article.category.color || '#006B3F',
                                }}
                            >
                                {article.category.name}
                            </span>
                        )}
                        <span className="text-xs text-slate-500 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(article.published_at)}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            {article.views_count} megtekintés
                        </span>
                        {article.author && (
                            <>
                                <span className="text-xs text-slate-400">·</span>
                                <span className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-slate-400" />
                                    {article.author.name}
                                </span>
                            </>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed border-l-4 border-amber-400 pl-4 py-1 italic bg-amber-50/50 rounded-r-xl">
                            {article.excerpt}
                        </p>
                    )}
                </header>

                {/* Featured Image */}
                {article.featured_image && (
                    <div className="rounded-3xl overflow-hidden shadow-xl aspect-video max-h-[480px] bg-slate-900">
                        <img
                            src={storageUrl(article.featured_image)}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Article Body Content (HTML from WYSIWYG) */}
                <div
                    className="prose prose-slate sm:prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-a:text-[#006B3F] hover:prose-a:underline py-4"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-2">
                            <TagIcon className="w-3.5 h-3.5" /> Címkék:
                        </span>
                        {article.tags.map((t) => (
                            <Link
                                key={t.id}
                                href={`/hirek?tag=${t.slug}`}
                                className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg transition"
                            >
                                #{t.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Share Box */}
                <div className="p-6 bg-slate-100 rounded-2xl flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-emerald-700" /> Oszd meg a cikket szurkolótársaiddal!
                    </span>
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: article.title,
                                    url: window.location.href,
                                });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('A link a vágólapra másolva!');
                            }
                        }}
                        className="bg-[#006B3F] hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                    >
                        Megosztás
                    </button>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="pt-12 border-t-2 border-slate-200 space-y-6">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                            Kapcsolódó Hírek
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/hirek/${rel.slug}`}
                                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                                >
                                    <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                        {rel.featured_image ? (
                                            <img
                                                src={storageUrl(rel.featured_image)}
                                                alt={rel.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-tr from-emerald-900 to-slate-800 flex items-center justify-center">
                                                <Shield className="w-10 h-10 text-emerald-400/40" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#006B3F] transition line-clamp-2">
                                            {rel.title}
                                        </h4>
                                        <span className="text-[11px] text-slate-400 mt-2">
                                            {formatDate(rel.published_at)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </PublicLayout>
    );
}

