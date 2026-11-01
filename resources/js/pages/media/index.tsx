import { Head, Link } from '@inertiajs/react';
import { Camera, Image as ImageIcon, Play, Video } from 'lucide-react';
import React from 'react';
import PublicLayout from '../../layouts/public-layout';
import { storageUrl } from '../../lib/utils';

interface GalleryItem {
    id: number;
    title: string;
    slug: string;
    description?: string;
    cover_image?: string;
    type: 'photo' | 'video';
    items_count?: number;
    published_at?: string;
}

interface MediaPageProps {
    galleries: {
        data: GalleryItem[];
        links: Array<{ url?: string; label: string; active: boolean }>;
    };
}

export default function MediaIndex({ galleries }: MediaPageProps) {
    return (
        <PublicLayout>
            <Head title="Médiatár & Galériák | Paksi FC" />

            {/* Header Banner */}
            <div className="bg-[#006B3F] text-white py-12 px-4 sm:px-8 border-b-4 border-amber-400">
                <div className="max-w-7xl mx-auto">
                    <span className="text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                        Paksi FC Médiatár
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1 flex items-center gap-3">
                        <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
                        Fotók & Videók
                    </h1>
                    <p className="text-emerald-100 text-sm mt-2 max-w-xl">
                        Mérkőzés képgalériák, edzés pillanatok, videós összefoglalók és interjúk.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
                {galleries.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleries.data.map((gal) => (
                            <div
                                key={gal.id}
                                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col transform hover:-translate-y-1.5"
                            >
                                <div className="relative aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
                                    {gal.cover_image ? (
                                        <img
                                            src={storageUrl(gal.cover_image)}
                                            alt={gal.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-emerald-400/40">
                                            {gal.type === 'video' ? (
                                                <Video className="w-16 h-16" />
                                            ) : (
                                                <ImageIcon className="w-16 h-16" />
                                            )}
                                        </div>
                                    )}

                                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-xl">
                                        {gal.type === 'video' ? (
                                            <>
                                                <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                <span>Videó</span>
                                            </>
                                        ) : (
                                            <>
                                                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                                                <span>Fotóalbum</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#006B3F] transition line-clamp-2">
                                            {gal.title}
                                        </h3>
                                        {gal.description && (
                                            <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                                                {gal.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                        <span>PFC Média</span>
                                        <span className="font-bold text-[#006B3F]">
                                            Megtekintés →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-slate-200">
                        <Camera className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-bold text-base">
                            Hamarosan érkeznek a legfrissebb mérkőzés galériák és videók!
                        </p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}

