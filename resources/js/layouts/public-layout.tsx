import { Link, usePage } from '@inertiajs/react';
import {
    Calendar,
    ChevronRight,
    Facebook,
    Flame,
    Instagram,
    Mail,
    MapPin,
    Menu,
    Phone,
    Shield,
    Trophy,
    Users,
    X,
    Youtube,
} from 'lucide-react';
import React, { useState } from 'react';

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
        header: Array<{ id: number; title: string; url?: string; route_name?: string }>;
        footer: Array<{ id: number; title: string; url?: string; route_name?: string }>;
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const navLinks = [
        { label: 'Főoldal', href: '/' },
        { label: 'Hírek', href: '/hirek' },
        { label: 'Csapat', href: '/csapat' },
        { label: 'Mérkőzések', href: '/merkozesek' },
        { label: 'Tabella', href: '/tabella' },
        { label: 'Média', href: '/media' },
        { label: 'Támogatók', href: '/tamogatok' },
        { label: 'Stadion', href: '/stadion' },
        { label: 'Kapcsolat', href: '/kapcsolat' },
    ];

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-700 selection:text-white">
            {/* Top Bar */}
            <div className="bg-[#0b2416] text-emerald-100 text-xs py-2 px-4 sm:px-8 border-b border-emerald-900/60">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-amber-400" />
                            {clubSettings.tagline}
                        </span>
                        <span className="hidden md:inline text-emerald-400/60">|</span>
                        <span className="hidden md:inline-flex items-center gap-1 text-emerald-300">
                            <MapPin className="w-3 h-3" /> {clubSettings.address}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2.5">
                            <a
                                href={clubSettings.facebook}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-amber-400 transition"
                                title="Facebook"
                            >
                                <Facebook className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href={clubSettings.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-amber-400 transition"
                                title="Instagram"
                            >
                                <Instagram className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href={clubSettings.youtube}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-amber-400 transition"
                                title="YouTube"
                            >
                                <Youtube className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <span className="text-emerald-400/60">|</span>
                        <a
                            href="/admin"
                            className="text-amber-300 hover:text-white font-medium transition flex items-center gap-1"
                        >
                            Админка (Filament)
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header / Navigation */}
            <header className="sticky top-0 z-50 bg-[#006B3F] text-white shadow-xl shadow-emerald-950/20 border-b border-emerald-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
                    {/* Club Logo & Brand */}
                    <Link href="/" className="flex items-center gap-3.5 group">
                        <div className="w-13 h-13 rounded-2xl bg-white p-1.5 shadow-md shadow-emerald-950/30 flex items-center justify-center transform group-hover:scale-105 transition">
                            <div className="w-full h-full rounded-xl bg-[#006B3F] border-2 border-amber-400 flex flex-col items-center justify-center text-white font-black leading-none">
                                <span className="text-[10px] tracking-widest text-amber-300">PAKSI</span>
                                <span className="text-base font-extrabold text-white">FC</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="font-black text-2xl tracking-tight text-white group-hover:text-amber-300 transition">
                                    PAKSI FC
                                </span>
                                <span className="bg-amber-400 text-emerald-950 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider">
                                    1952
                                </span>
                            </div>
                            <span className="text-xs text-emerald-200 font-medium tracking-wide">
                                A MAGYAR CSAPAT
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center gap-1">
                        {navLinks.map((item) => {
                            const isActive =
                                item.href === '/'
                                    ? currentPath === '/'
                                    : currentPath.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-3.5 py-2 rounded-lg text-sm font-bold tracking-wide transition relative ${isActive
                                        ? 'text-white bg-emerald-900/60 shadow-inner'
                                        : 'text-emerald-100 hover:text-white hover:bg-emerald-700/60'
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/merkozesek"
                            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs uppercase px-4 py-2.5 rounded-xl shadow-md transition transform hover:-translate-y-0.5 flex items-center gap-1.5"
                        >
                            <Calendar className="w-3.5 h-3.5" />
                            Meccsek
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="xl:hidden p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-emerald-700 focus:outline-none"
                        aria-label="Menü"
                    >
                        {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="xl:hidden bg-[#07331e] border-t border-emerald-800 px-4 pt-3 pb-6 space-y-1">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2.5 rounded-lg text-base font-bold text-white hover:bg-emerald-700/70"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-emerald-800/80 flex flex-col gap-2">
                            <a
                                href="/admin"
                                className="block text-center py-2.5 bg-amber-400 text-emerald-950 rounded-lg font-bold text-sm"
                            >
                                Vezérlőpult (Adminisztráció)
                            </a>
                        </div>
                    </div>
                )}
            </header>

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
                            <ul className="space-y-2 text-sm">
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

