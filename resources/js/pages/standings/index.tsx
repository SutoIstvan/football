import { Head } from '@inertiajs/react';
import { Shield, Trophy } from 'lucide-react';
import React from 'react';
import PublicLayout from '../../layouts/public-layout';

interface StandingItem {
    id: number;
    position: number;
    team_name: string;
    team_logo?: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goals_for: number;
    goals_against: number;
    goal_difference: number;
    points: number;
    is_own_team: boolean;
}

interface StandingsPageProps {
    standings: StandingItem[];
    seasons: Array<{ id: number; name: string; is_current: boolean }>;
    competitions: Array<{ id: number; name: string; short_name: string }>;
    currentSeasonId: number;
    currentCompetitionId: number;
}

export default function StandingsIndex({
    standings,
    seasons,
    competitions,
    currentSeasonId,
}: StandingsPageProps) {
    return (
        <PublicLayout>
            <Head title="Tabella - OTP Bank Liga (NB I) | Paksi FC" />

            {/* Header Banner */}
            <div className="bg-[#006B3F] text-white py-12 px-4 sm:px-8 border-b-4 border-amber-400">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <span className="text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                            Magyar Bajnokság
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-1 flex items-center gap-3">
                            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
                            OTP Bank Liga Tabella
                        </h1>
                        <p className="text-emerald-100 text-sm mt-2 max-w-xl">
                            A labdarúgó NB I aktuális bajnoki tabellája a 2025/2026-os szezonban.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-100 text-slate-700 uppercase font-black text-xs border-b border-slate-200">
                                <tr>
                                    <th className="py-4 px-4 text-center">Hely</th>
                                    <th className="py-4 px-4">Klub / Csapat</th>
                                    <th className="py-4 px-3 text-center" title="Mérkőzés">M</th>
                                    <th className="py-4 px-3 text-center" title="Győzelem">Gy</th>
                                    <th className="py-4 px-3 text-center" title="Döntetlen">D</th>
                                    <th className="py-4 px-3 text-center" title="Vereség">V</th>
                                    <th className="py-4 px-3 text-center" title="Gólkülönbség">Gólok</th>
                                    <th className="py-4 px-3 text-center" title="Gólkülönbség">GK</th>
                                    <th className="py-4 px-5 text-center font-black text-slate-900 bg-slate-200/60">
                                        Pont
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {standings.map((team) => (
                                    <tr
                                        key={team.id}
                                        className={`transition ${
                                            team.is_own_team
                                                ? 'bg-emerald-50 font-black text-emerald-950 border-l-4 border-emerald-600'
                                                : team.position <= 3
                                                  ? 'hover:bg-slate-50 text-slate-900'
                                                  : team.position >= 11
                                                    ? 'hover:bg-red-50/50 text-slate-700'
                                                    : 'hover:bg-slate-50 text-slate-700'
                                        }`}
                                    >
                                        <td className="py-3.5 px-4 text-center font-extrabold">
                                            <span
                                                className={`inline-flex items-center justify-center w-7 h-7 rounded-xl text-xs font-bold ${
                                                    team.position === 1
                                                        ? 'bg-amber-400 text-slate-950 shadow'
                                                        : team.position === 2
                                                          ? 'bg-emerald-700 text-white shadow'
                                                          : team.position === 3
                                                            ? 'bg-slate-300 text-slate-800'
                                                            : team.position >= 11
                                                              ? 'bg-red-100 text-red-800'
                                                              : 'bg-slate-100 text-slate-700'
                                                }`}
                                            >
                                                {team.position}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 font-bold text-base flex items-center gap-3">
                                            {team.is_own_team && (
                                                <Shield className="w-4 h-4 text-[#006B3F] shrink-0" />
                                            )}
                                            <span
                                                className={
                                                    team.is_own_team
                                                        ? 'text-[#006B3F] font-black'
                                                        : 'text-slate-900'
                                                }
                                            >
                                                {team.team_name}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-3 text-center text-slate-600 font-semibold">
                                            {team.played}
                                        </td>
                                        <td className="py-3.5 px-3 text-center text-slate-600">
                                            {team.won}
                                        </td>
                                        <td className="py-3.5 px-3 text-center text-slate-600">
                                            {team.drawn}
                                        </td>
                                        <td className="py-3.5 px-3 text-center text-slate-600">
                                            {team.lost}
                                        </td>
                                        <td className="py-3.5 px-3 text-center text-slate-500 text-xs">
                                            {team.goals_for} - {team.goals_against}
                                        </td>
                                        <td className="py-3.5 px-3 text-center font-bold text-slate-700">
                                            {team.goal_difference > 0
                                                ? `+${team.goal_difference}`
                                                : team.goal_difference}
                                        </td>
                                        <td className="py-3.5 px-5 text-center font-black text-lg text-[#006B3F] bg-slate-50/80">
                                            {team.points}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-amber-400" />
                        <span>Bajnok (BL selejtező)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-emerald-700" />
                        <span>Konferencia Liga selejtező (2-3. hely)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-red-200" />
                        <span>Kieső helyek (11-12. hely)</span>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

