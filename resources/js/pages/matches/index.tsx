import { Head, Link, router } from '@inertiajs/react';
import { Calendar, ChevronRight, Clock, MapPin, Trophy } from 'lucide-react';
import React from 'react';
import PublicLayout from '../../layouts/public-layout';

interface MatchItem {
    id: number;
    round?: string;
    match_date: string;
    venue?: string;
    is_home: boolean;
    opponent_name: string;
    home_score?: number;
    away_score?: number;
    status: string;
    competition?: { name: string; short_name: string };
    events?: Array<{ id: number; minute: number; description?: string; type: string }>;
}

interface MatchesPageProps {
    matches: {
        data: MatchItem[];
        links: Array<{ url?: string; label: string; active: boolean }>;
    };
    seasons: Array<{ id: number; name: string; is_current: boolean }>;
    competitions: Array<{ id: number; name: string; short_name: string }>;
    currentSeasonId: number;
    currentStatus: string;
}

export default function MatchesIndex({
    matches,
    seasons,
    competitions,
    currentSeasonId,
    currentStatus,
}: MatchesPageProps) {
    const handleStatusFilter = (st: string) => {
        router.get('/merkozesek', {
            season_id: currentSeasonId,
            status: st,
        });
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
        });
    };

    const formatTime = (dateStr?: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <PublicLayout>
            <Head title="Mérkőzések & Menetrend | Paksi FC" />

            {/* Header Banner */}
            <div className="bg-[#006B3F] text-white py-12 px-4 sm:px-8 border-b-4 border-amber-400">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <span className="text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                            Paksi FC Menetrend
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1">
                            Mérkőzések & Eredmények
                        </h1>
                        <p className="text-emerald-100 text-sm mt-2 max-w-xl">
                            A Paksi FC hivatalos versenynaptára, bajnoki és kupa találkozók eredményei.
                        </p>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex bg-emerald-950/60 p-1.5 rounded-2xl border border-emerald-700/60">
                        <button
                            onClick={() => handleStatusFilter('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                                currentStatus === 'all'
                                    ? 'bg-amber-400 text-emerald-950'
                                    : 'text-emerald-100 hover:text-white'
                            }`}
                        >
                            Összes
                        </button>
                        <button
                            onClick={() => handleStatusFilter('upcoming')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                                currentStatus === 'upcoming'
                                    ? 'bg-amber-400 text-emerald-950'
                                    : 'text-emerald-100 hover:text-white'
                            }`}
                        >
                            Következő
                        </button>
                        <button
                            onClick={() => handleStatusFilter('finished')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                                currentStatus === 'finished'
                                    ? 'bg-amber-400 text-emerald-950'
                                    : 'text-emerald-100 hover:text-white'
                            }`}
                        >
                            Lejátszott
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-6">
                {matches.data.length > 0 ? (
                    matches.data.map((m) => {
                        const isFinished = m.status === 'finished';
                        const homeTeam = m.is_home ? 'Paksi FC' : m.opponent_name;
                        const awayTeam = m.is_home ? m.opponent_name : 'Paksi FC';

                        return (
                            <div
                                key={m.id}
                                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-center justify-between gap-6"
                            >
                                {/* Left: Info */}
                                <div className="space-y-1 text-center md:text-left min-w-[160px]">
                                    <span className="bg-slate-100 text-slate-700 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                                        {m.competition?.short_name || 'NB I'} · {m.round || 'Forduló'}
                                    </span>
                                    <p className="text-xs font-bold text-slate-900 mt-2 flex items-center justify-center md:justify-start gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                        {formatDate(m.match_date)}
                                    </p>
                                    <p className="text-xs text-slate-500 flex items-center justify-center md:justify-start gap-1">
                                        <Clock className="w-3 h-3 text-slate-400" />
                                        {formatTime(m.match_date)}
                                    </p>
                                    {m.venue && (
                                        <p className="text-[11px] text-slate-400 flex items-center justify-center md:justify-start gap-1">
                                            <MapPin className="w-3 h-3 text-slate-400" />
                                            {m.venue}
                                        </p>
                                    )}
                                </div>

                                {/* Center: Teams & Score */}
                                <div className="flex-1 flex items-center justify-center gap-4 sm:gap-8 w-full max-w-md">
                                    {/* Home team */}
                                    <div className="flex-1 text-right">
                                        <span
                                            className={`font-black text-sm sm:text-base ${
                                                homeTeam === 'Paksi FC'
                                                    ? 'text-emerald-800'
                                                    : 'text-slate-900'
                                            }`}
                                        >
                                            {homeTeam}
                                        </span>
                                    </div>

                                    {/* Score or Time */}
                                    <div className="shrink-0">
                                        {isFinished ? (
                                            <div className="bg-[#006B3F] text-amber-300 font-black text-xl sm:text-2xl px-5 py-2 rounded-2xl shadow-md min-w-[90px] text-center">
                                                {m.home_score} : {m.away_score}
                                            </div>
                                        ) : (
                                            <div className="bg-slate-100 border border-slate-200 text-slate-600 font-extrabold text-sm px-4 py-2 rounded-2xl min-w-[90px] text-center">
                                                {formatTime(m.match_date)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Away team */}
                                    <div className="flex-1 text-left">
                                        <span
                                            className={`font-black text-sm sm:text-base ${
                                                awayTeam === 'Paksi FC'
                                                    ? 'text-emerald-800'
                                                    : 'text-slate-900'
                                            }`}
                                        >
                                            {awayTeam}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Action / Status */}
                                <div className="shrink-0 text-center md:text-right">
                                    <span
                                        className={`inline-block text-xs font-bold uppercase px-3 py-1.5 rounded-xl ${
                                            isFinished
                                                ? 'bg-slate-100 text-slate-600'
                                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                                        }`}
                                    >
                                        {isFinished ? 'Végeredmény' : 'Várható'}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 text-slate-500 font-bold">
                        Nincs megjeleníthető mérkőzés.
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}

