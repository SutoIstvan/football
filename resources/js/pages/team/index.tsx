import { Head, Link } from '@inertiajs/react';
import { Calendar, ChevronRight, Shield, User, Users } from 'lucide-react';
import React from 'react';
import PublicLayout from '../../layouts/public-layout';

interface PlayerItem {
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
}

interface StaffItem {
    id: number;
    first_name: string;
    last_name: string;
    role: string;
    photo?: string;
}

interface TeamProps {
    currentTeam: {
        id: number;
        name: string;
        slug: string;
        description?: string;
    };
    groupedPlayers: {
        goalkeepers: PlayerItem[];
        defenders: PlayerItem[];
        midfielders: PlayerItem[];
        forwards: PlayerItem[];
    };
    staff: StaffItem[];
    allTeams: Array<{ id: number; name: string; slug: string }>;
}

export default function TeamIndex({
    currentTeam,
    groupedPlayers,
    staff,
    allTeams,
}: TeamProps) {
    const positionSections = [
        { title: 'Kapusok', key: 'goalkeepers', players: groupedPlayers.goalkeepers, badge: 'GK' },
        { title: 'Védők', key: 'defenders', players: groupedPlayers.defenders, badge: 'DF' },
        { title: 'Középpályások', key: 'midfielders', players: groupedPlayers.midfielders, badge: 'MF' },
        { title: 'Támadók', key: 'forwards', players: groupedPlayers.forwards, badge: 'FW' },
    ];

    const calculateAge = (dob?: string) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return (
        <PublicLayout>
            <Head title={`${currentTeam.name} | Paksi FC Keret`} />

            {/* Header Banner */}
            <div className="bg-[#006B3F] text-white py-12 px-4 sm:px-8 border-b-4 border-amber-400">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <span className="text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                            Paksi FC Csapatkeret
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1">
                            {currentTeam.name}
                        </h1>
                        <p className="text-emerald-100 text-sm mt-2 max-w-xl">
                            {currentTeam.description ||
                                'A kizárólag magyar játékosokból álló büszke élvonalbeli zöld-fehér csapat.'}
                        </p>
                    </div>

                    {/* Team Switcher Tabs */}
                    <div className="flex flex-wrap gap-2 bg-emerald-950/60 p-1.5 rounded-2xl border border-emerald-700/60">
                        {allTeams.map((t) => (
                            <Link
                                key={t.id}
                                href={`/csapat/${t.slug}`}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                                    currentTeam.slug === t.slug
                                        ? 'bg-amber-400 text-emerald-950 shadow-md'
                                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
                                }`}
                            >
                                {t.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-20">
                {/* 1. Players by Position */}
                {positionSections.map((sec) => (
                    <section key={sec.key} className="space-y-8">
                        <div className="flex items-center gap-3 border-b-2 border-emerald-800 pb-3">
                            <span className="bg-[#006B3F] text-amber-300 font-black text-xs px-2.5 py-1 rounded-md">
                                {sec.badge}
                            </span>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                {sec.title}
                            </h2>
                            <span className="text-xs font-bold text-slate-400 ml-auto">
                                {sec.players.length} játékos
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {sec.players.map((p) => {
                                const age = calculateAge(p.date_of_birth);
                                return (
                                    <Link
                                        key={p.id}
                                        href={`/csapat/jatekos/${p.slug}`}
                                        className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col transform hover:-translate-y-2 relative"
                                    >
                                        {/* Shirt number watermark */}
                                        <div className="absolute top-2 right-3 z-20">
                                            <span className="text-2xl font-black text-amber-400 bg-emerald-950/80 px-2.5 py-1 rounded-xl shadow">
                                                #{p.squad_number ?? '-'}
                                            </span>
                                        </div>

                                        {/* Photo container */}
                                        <div className="relative aspect-[4/5] bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 overflow-hidden flex items-end justify-center">
                                            {p.photo ? (
                                                <img
                                                    src={p.photo}
                                                    alt={`${p.last_name} ${p.first_name}`}
                                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-t from-emerald-950 via-[#006B3F] to-emerald-800 text-white p-4">
                                                    <span className="text-6xl font-black text-amber-400/30">
                                                        #{p.squad_number}
                                                    </span>
                                                    <Shield className="w-16 h-16 text-emerald-300/40 mt-2" />
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                                            
                                            <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
                                                <p className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
                                                    {p.last_name}
                                                </p>
                                                <h3 className="text-xl font-black leading-tight text-white group-hover:text-amber-300 transition">
                                                    {p.first_name}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Player mini meta */}
                                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                                            <span>
                                                {age ? `${age} éves` : 'Magyar'}
                                            </span>
                                            {p.height && (
                                                <span>{p.height} cm / {p.weight} kg</span>
                                            )}
                                            <span className="font-bold text-[#006B3F] flex items-center gap-0.5">
                                                Adatlap <ChevronRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                ))}

                {/* 2. Coaching Staff */}
                {staff.length > 0 && (
                    <section className="space-y-8 pt-8 border-t-2 border-slate-200">
                        <div className="border-b-2 border-emerald-800 pb-3">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                                <Users className="w-6 h-6 text-[#006B3F]" />
                                Szakmai Stáb & Vezetőség
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {staff.map((s) => (
                                <div
                                    key={s.id}
                                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition text-center space-y-3"
                                >
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#006B3F] to-emerald-700 text-white mx-auto flex items-center justify-center font-black text-xl shadow">
                                        {s.last_name.charAt(0)}{s.first_name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-base text-slate-900">
                                            {s.last_name} {s.first_name}
                                        </h4>
                                        <p className="text-xs font-bold text-[#006B3F] mt-1">
                                            {s.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </PublicLayout>
    );
}

