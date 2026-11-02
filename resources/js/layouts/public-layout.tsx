import { Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Youtube,
} from 'lucide-react';
import React from 'react';

import PublicHeader, { NavigationItem } from '@/components/public-header';

interface SharedProps {
    clubSettings?: {
        name: string;
        tagline: string;
        phone: string;
        email: string;
        address: string;
        facebook: string;
        instagram: string;
        youtube: string;
        tiktok: string;
    };
    navigation?: {
        header: NavigationItem[];
        footer: NavigationItem[];
    };
    auth?: {
        user?: { name: string; email: string };
    };
}

export default function PublicLayout({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    const { props } = usePage<{ [key: string]: any } & SharedProps>();

    const clubSettings = props.clubSettings || {
        name: 'Paksi FC',
        tagline: 'A magyar csapat',
        phone: '+36 75 830 800',
        email: 'info@paksifc.hu',
        address: '7030 Paks, Fehérvári út 29.',
        facebook: 'https://facebook.com/paksifc',
        instagram: 'https://instagram.com/paksifc_official',
        youtube: 'https://youtube.com/@paksifc',
        tiktok: 'https://tiktok.com/@paksifc',
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-700 selection:text-white">
            {/* Header: Company logo on the left (vertically centered), 2-level layout on the right (utility bar & navigation menu) */}
            <PublicHeader clubSettings={clubSettings} navigation={props.navigation} />

            {/* Page Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-[#0b1f15] text-slate-300 mt-20 border-t-4 border-amber-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* Club Profile */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center">
                                    <div className="w-full h-full rounded-lg bg-[#006B3F] flex flex-col items-center justify-center text-white font-black text-xs">
                                        PFC
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-black text-xl text-white tracking-wide">
                                        PAKSI FC
                                    </h3>
                                    <p className="text-xs text-amber-400 font-semibold tracking-wider">
                                        A MAGYAR CSAPAT
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                A Paksi Futball Club a magyar élvonal meghatározó csapata, amely
                                büszkén képviseli a hazai labdarúgás értékeit kizárólag magyar
                                játékosokkal.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <a
                                    href={clubSettings.facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-lg bg-emerald-900/60 hover:bg-emerald-700 text-white flex items-center justify-center transition"
                                >
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a
                                    href={clubSettings.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-lg bg-emerald-900/60 hover:bg-emerald-700 text-white flex items-center justify-center transition"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a
                                    href={clubSettings.youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-lg bg-emerald-900/60 hover:bg-emerald-700 text-white flex items-center justify-center transition"
                                >
                                    <Youtube className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
                                Navigáció
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/hirek" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Hírek & Események
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/csapat" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Játékoskeret (NB I)
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/merkozesek" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Menetrend & Eredmények
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/tabella" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> OTP Bank Liga Tabella
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/media" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Fotók & Videótár
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Information / Club Pages */}
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
                                Információk
                            </h4>
                            <ul className="space-y-2 text-sm">
                                {props.navigation?.footer && props.navigation.footer.length > 0 ? (
                                    props.navigation.footer.map((item) => (
                                        <li key={item.id}>
                                            <Link
                                                href={item.resolved_url || item.url || '#'}
                                                target={item.opens_in_new_tab ? '_blank' : undefined}
                                                rel={item.opens_in_new_tab ? 'noreferrer' : undefined}
                                                className="hover:text-amber-400 transition flex items-center gap-1.5"
                                            >
                                                <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> {item.title}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <>
                                        <li>
                                            <Link href="/stadion" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                                <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Fehérvári úti Stadion
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/tortenet" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                                <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Klubtörténet (1952)
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/tamogatok" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                                <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Kiemelt Támogatók
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/kapcsolat" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                                <ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Elérhetőségek
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Contact details */}
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
                                Kapcsolat
                            </h4>
                            <div className="space-y-3 text-sm">
                                <p className="flex items-start gap-2.5">
                                    <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                                    <span>{clubSettings.address}</span>
                                </p>
                                <p className="flex items-center gap-2.5">
                                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>{clubSettings.phone}</span>
                                </p>
                                <p className="flex items-center gap-2.5">
                                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>{clubSettings.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                        <p>© 1952–2026 Paksi FC Kft. Minden jog fenntartva.</p>
                        <p className="flex items-center gap-1">
                            Hivatalos klubhonlap · Fejlesztve a legmodernebb technológiával
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
