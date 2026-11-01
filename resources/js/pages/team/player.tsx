import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    ChevronRight,
    MapPin,
    Shield,
    Trophy,
    User,
} from 'lucide-react';
import React from 'react';
import PublicLayout from '../../layouts/public-layout';

interface PlayerProps {
    player: {
        id: number;
        first_name: string;
        last_name: string;
        slug: string;
        squad_number?: number;
        position: string;
        date_of_birth?: string;
        nationality: string;
        height?: number;
        weight?: number;
        preferred_foot?: string;
        photo?: string;
        biography?: string;
        joined_at?: string;
        contract_until?: string;
        previous_clubs?: Array<{ name: string; years?: string }>;
        team?: { name: string; slug: string };
        seasonStats?: Array<{
            id: number;
            appearances: number;
            goals: number;
            assists: number;
            minutes_played: number;
            yellow_cards: number;
            red_cards: number;
            clean_sheets: number;
            competition?: { name: string; short_name: string };
            season?: { name: string };
        }>;
    };
}

export default function PlayerProfile({ player }: PlayerProps) {
    const positionNames: Record<string, string> = {
        goalkeeper: 'Kapus',
        defender: 'Védő',
        midfielder: 'Középpályás',
        forward: 'Támadó / Csatár',
    };

    const calculateAge = (dob?: string) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const age = calculateAge(player.date_of_birth);

    return (
        <PublicLayout>
            <Head title={`${player.last_name} ${player.first_name} #${player.squad_number} | Paksi FC`} />

            {/* Top Breadcrumb */}
            <div className="bg-slate-100 border-b border-slate-200 py-3 px-4 sm:px-8">
                <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-slate-500">
                    <Link href="/" className="hover:text-emerald-700">
                        Főoldal
                    </Link>
                    <span>/</span>
                    <Link href="/csapat" className="hover:text-emerald-700">
                        Csapat
                    </Link>
                    <span>/</span>
                    <span className="text-slate-800 font-bold">
                        {player.last_name} {player.first_name}
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-10">
                <Link
                    href="/csapat"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Vissza a teljes kerethez
                </Link>

                {/* Hero Player Card */}
                <div className="bg-gradient-to-br from-[#006B3F] via-[#094d2f] to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center md:items-end justify-between gap-8 border-4 border-amber-400">
                    <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                        <span className="text-[220px] font-black text-white leading-none">
                            #{player.squad_number}
                        </span>
                    </div>

                    <div className="space-y-4 relative z-10 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                            <span className="bg-amber-400 text-emerald-950 font-black text-sm px-3 py-1 rounded-xl shadow">
                                #{player.squad_number ?? '-'}
                            </span>
                            <span className="bg-emerald-950/80 text-emerald-200 border border-emerald-700 text-xs font-bold uppercase px-3 py-1 rounded-xl">
                                {positionNames[player.position] || player.position}
                            </span>
                            <span className="bg-emerald-900/60 text-white text-xs font-semibold px-3 py-1 rounded-xl">
                                {player.nationality}
                            </span>
                        </div>

                        <div>
                            <p className="text-xl sm:text-2xl font-bold text-amber-300 uppercase tracking-widest">
                                {player.last_name}
                            </p>
                            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                                {player.first_name}
                            </h1>
                        </div>

                        <p className="text-emerald-200 text-sm font-medium">
                            {player.team?.name || 'Paksi FC Első Csapat'}
                        </p>
                    </div>

                    {/* Big photo or badge */}
                    <div className="relative z-10 w-48 h-60 sm:w-64 sm:h-80 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
                        {player.photo ? (
                            <img
                                src={player.photo}
                                alt={`${player.last_name} ${player.first_name}`}
                                className="w-full h-full object-cover object-top rounded-xl"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-4">
                                <Shield className="w-24 h-24 text-emerald-300/40" />
                                <span className="font-black text-2xl text-amber-300 mt-2">
                                    #{player.squad_number}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Player Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
                            Életkor
                        </span>
                        <span className="text-xl font-black text-slate-900">
                            {age ? `${age} éves` : '—'}
                        </span>
                        {player.date_of_birth && (
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                                {player.date_of_birth}
                            </span>
                        )}
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
                            Magasság / Súly
                        </span>
                        <span className="text-xl font-black text-slate-900">
                            {player.height ? `${player.height} cm` : '—'}
                        </span>
                        {player.weight && (
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                                {player.weight} kg
                            </span>
                        )}
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
                            Erősebb láb
                        </span>
                        <span className="text-xl font-black text-slate-900 capitalize">
                            {player.preferred_foot === 'right'
                                ? 'Jobb'
                                : player.preferred_foot === 'left'
                                  ? 'Bal'
                                  : player.preferred_foot === 'both'
                                    ? 'Mindkettő'
                                    : 'Jobb'}
                        </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
                            Állampolgárság
                        </span>
                        <span className="text-xl font-black text-emerald-800">
                            {player.nationality} 🇭🇺
                        </span>
                    </div>
                </div>

                {/* Biography */}
                {player.biography && (
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                        <h2 className="text-xl font-black text-slate-900">Játékos Pályafutás & Bemutatás</h2>
                        <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                            {player.biography}
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}

