import { Head } from '@inertiajs/react';
import { ExternalLink, Handshake, HeartHandshake, Shield } from 'lucide-react';
import React from 'react';
import PublicLayout from '../../layouts/public-layout';

interface SponsorItem {
    id: number;
    name: string;
    logo: string;
    website_url?: string;
    tier: 'main' | 'gold' | 'silver' | 'partner';
    description?: string;
}

interface SponsorsPageProps {
    groupedSponsors: {
        main: SponsorItem[];
        gold: SponsorItem[];
        silver: SponsorItem[];
        partner: SponsorItem[];
    };
}

export default function SponsorsIndex({ groupedSponsors }: SponsorsPageProps) {
    const tierConfig = [
        { key: 'main', title: 'Főtámogató', items: groupedSponsors.main, badge: 'Főtámogató' },
        { key: 'gold', title: 'Kiemelt Támogatók', items: groupedSponsors.gold, badge: 'Gold' },
        { key: 'silver', title: 'Támogatók', items: groupedSponsors.silver, badge: 'Silver' },
        { key: 'partner', title: 'Együttműködő Partnerek', items: groupedSponsors.partner, badge: 'Partner' },
    ];

    return (
        <PublicLayout>
            <Head title="Támogatóink & Partnereink | Paksi FC" />

            {/* Header Banner */}
            <div className="bg-[#006B3F] text-white py-12 px-4 sm:px-8 border-b-4 border-amber-400">
                <div className="max-w-7xl mx-auto">
                    <span className="text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                        Paksi FC Partnerek
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1 flex items-center gap-3">
                        <Handshake className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
                        Támogatóink & Szponzoraink
                    </h1>
                    <p className="text-emerald-100 text-sm mt-2 max-w-xl">
                        Köszönjük kiemelt partnereinknek a paksi labdarúgás és a magyar utánpótlás
                        töretlen támogatását!
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 space-y-16">
                {tierConfig.map((tier) => {
                    if (!tier.items || tier.items.length === 0) return null;

                    return (
                        <div key={tier.key} className="space-y-6">
                            <div className="flex items-center gap-3 border-b-2 border-emerald-800 pb-3">
                                <span className="bg-[#006B3F] text-amber-300 text-xs font-black uppercase px-3 py-1 rounded-md">
                                    {tier.badge}
                                </span>
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                    {tier.title}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {tier.items.map((sp) => (
                                    <div
                                        key={sp.id}
                                        className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition flex flex-col justify-between items-center text-center space-y-4"
                                    >
                                        <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shadow-inner">
                                            <Shield className="w-10 h-10 text-[#006B3F]" />
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="font-black text-lg text-slate-900">
                                                {sp.name}
                                            </h3>
                                            {sp.description && (
                                                <p className="text-xs text-slate-500 line-clamp-2">
                                                    {sp.description}
                                                </p>
                                            )}
                                        </div>

                                        {sp.website_url && (
                                            <a
                                                href={sp.website_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006B3F] hover:text-emerald-800 transition pt-2"
                                            >
                                                <span>Hivatalos weboldal</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </PublicLayout>
    );
}

