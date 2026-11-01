import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Info, MapPin, Phone, Shield } from 'lucide-react';
import React from 'react';
import PublicLayout from '../layouts/public-layout';

interface PageProps {
    page: {
        id: number;
        title: string;
        slug: string;
        content?: string;
        featured_image?: string;
        template: string;
        meta_title?: string;
        meta_description?: string;
    };
}

export default function StaticPageView({ page }: PageProps) {
    return (
        <PublicLayout>
            <Head title={`${page.meta_title || page.title} | Paksi FC`} />

            {/* Header Banner */}
            <div className="bg-[#006B3F] text-white py-14 px-4 sm:px-8 border-b-4 border-amber-400">
                <div className="max-w-4xl mx-auto space-y-2">
                    <span className="text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                        Paksi FC Hivatalos Információ
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                        {page.title}
                    </h1>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Vissza a főoldalra
                </Link>

                {/* Featured image if exists */}
                {page.featured_image && (
                    <div className="rounded-3xl overflow-hidden shadow-xl aspect-video max-h-[440px] bg-slate-900">
                        <img
                            src={page.featured_image}
                            alt={page.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Page body content (rendered HTML from WYSIWYG editor) */}
                <div
                    className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm prose prose-slate sm:prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-a:text-[#006B3F] hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: page.content || '' }}
                />
            </div>
        </PublicLayout>
    );
}

