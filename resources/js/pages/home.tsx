import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    ChevronRight,
    Clock,
    Eye,
    MapPin,
    Shield,
    Sparkles,
    Trophy,
    Users,
} from 'lucide-react';
import React from 'react';
import PublicLayout from '../layouts/public-layout';
import { storageUrl } from '../lib/utils';

interface ArticleItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    featured_image?: string;
    published_at: string;
    views_count: number;
    category?: { name: string; slug: string; color?: string };
    author?: { name: string };
}

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

interface StandingItem {
    id: number;
    position: number;
    team_name: string;
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

interface SponsorItem {
    id: number;
    name: string;
    logo?: string;
    website_url?: string;
    tier: string;
}

interface HomeProps {
    featuredArticles: ArticleItem[];
    latestArticles: ArticleItem[];
    nextMatch?: MatchItem;
    lastMatch?: MatchItem;
    standings: StandingItem[];
    sponsors: SponsorItem[];
}

export default function Home({
    featuredArticles,
    latestArticles,
    nextMatch,
    lastMatch,
    standings,
    sponsors,
}: HomeProps) {
    const mainHero = featuredArticles[0];
    const subHeroes = featuredArticles.slice(1, 3);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateStr?: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('hu-HU', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <PublicLayout>
            <Head title="Paksi FC - Hivatalos honlap | A magyar csapat" />

            {/* 1. HERO SECTION: FEATURED ARTICLES */}
            <section className="bg-gradient-to-b from-[#006B3F] via-[#084b2e] to-slate-900 text-white pt-6 pb-16 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Club statement badge */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="inline-flex items-center gap-1.5 bg-amber-400 text-emerald-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow">
                            <Sparkles className="w-3.5 h-3.5" />
                            Kiemelt Hírek
                        </span>
                        <span className="text-emerald-200 text-sm font-semibold tracking-wide">
                            Paksi FC Hivatalos Tájékoztatás
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Main Hero Card */}
                        {mainHero && (
                            <Link
                                href={`/hirek/${mainHero.slug}`}
                                className="lg:col-span-8 group relative rounded-3xl overflow-hidden shadow-2xl bg-slate-800 flex flex-col justify-end min-h-[420px] sm:min-h-[500px] border border-emerald-700/40 transform transition hover:-translate-y-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
                                <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply" />
                                
                                {mainHero.featured_image ? (
                                    <img
                                        src={storageUrl(mainHero.featured_image)}
                                        alt={mainHero.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#005230] to-[#0d7346] flex items-center justify-center opacity-70">
                                        <Shield className="w-48 h-48 text-emerald-400/20" />
                                    </div>
                                )}

                                <div className="relative z-20 p-6 sm:p-10 space-y-3">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        {mainHero.category && (
                                            <span
                                                className="px-3 py-1 rounded-lg text-xs font-bold text-white shadow"
                                                style={{
                                                    backgroundColor:
                                                        mainHero.category.color || '#006B3F',
                                                }}
                                            >
                                                {mainHero.category.name}
                                            </span>
                                        )}
                                        <span className="text-xs text-slate-300 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(mainHero.published_at)}
                                        </span>
                                    </div>

                                    <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight group-hover:text-amber-300 transition">
                                        {mainHero.title}
                                    </h1>

                                    {mainHero.excerpt && (
                                        <p className="text-slate-200 text-sm sm:text-base line-clamp-2 max-w-2xl">
                                            {mainHero.excerpt}
                                        </p>
                                    )}

                                    <div className="pt-2 flex items-center gap-2 text-amber-400 font-bold text-sm">
                                        <span>Elolvasom a teljes cikket</span>
                                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Sub Heroes Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            {subHeroes.map((art) => (
                                <Link
                                    key={art.id}
                                    href={`/hirek/${art.slug}`}
                                    className="group relative rounded-2xl overflow-hidden shadow-lg bg-slate-800 flex-1 min-h-[220px] flex flex-col justify-end p-6 border border-emerald-700/30 transform transition hover:-translate-y-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-emerald-950/30 z-10" />
                                    {art.featured_image && (
                                        <img
                                            src={storageUrl(art.featured_image)}
                                            alt={art.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    )}
                                    <div className="relative z-20 space-y-2">
                                        <div className="flex items-center gap-2 text-xs">
                                            {art.category && (
                                                <span className="bg-emerald-600/90 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                                                    {art.category.name}
                                                </span>
                                            )}
                                            <span className="text-slate-300">
                                                {formatDate(art.published_at)}
                                            </span>
                                        </div>
                                        <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition leading-snug">
                                            {art.title}
                                        </h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. MATCH CENTER WIDGET (LAST MATCH & NEXT MATCH) */}
            <section className="relative z-30 -mt-10 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {/* Last Match */}
                    <div className="p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-white">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                    Legutóbbi mérkőzés · {lastMatch?.competition?.short_name || 'NB I'}
                                </span>
                                <span className="text-xs font-bold text-slate-500">
                                    {formatDate(lastMatch?.match_date)}
                                </span>
                            </div>

                            <div className="py-4 flex items-center justify-around text-center">
                                {/* Home Team */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="w-14 h-14 rounded-2xl bg-[#006B3F] text-white flex items-center justify-center font-black text-sm shadow-md">
                                        PAKS
                                    </div>
                                    <span className="font-extrabold text-sm sm:text-base mt-2 text-slate-900">
                                        Paksi FC
                                    </span>
                                </div>

                                {/* Score */}
                                <div className="px-4 flex flex-col items-center">
                                    <div className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-700 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200">
                                        {lastMatch?.home_score ?? 2} : {lastMatch?.away_score ?? 0}
                                    </div>
                                    <span className="text-[11px] font-extrabold uppercase text-emerald-800 tracking-wider mt-1.5">
                                        Végeredmény
                                    </span>
                                </div>

                                {/* Away Team */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-black text-sm shadow-md">
                                        ÚJP
                                    </div>
                                    <span className="font-extrabold text-sm sm:text-base mt-2 text-slate-900">
                                        {lastMatch?.opponent_name || 'Újpest FC'}
                                    </span>
                                </div>
                            </div>

                            {/* Scorers */}
                            {lastMatch?.events && lastMatch.events.length > 0 && (
                                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                                    {lastMatch.events.map((ev) => (
                                        <div key={ev.id} className="flex items-center gap-1.5">
                                            <span className="font-bold text-emerald-700">⚽</span>
                                            <span>{ev.description}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {lastMatch?.venue || 'Fehérvári úti Stadion'}
                            </span>
                            <Link
                                href="/merkozesek"
                                className="font-bold text-emerald-700 hover:text-emerald-800 transition"
                            >
                                Meccs részletei →
                            </Link>
                        </div>
                    </div>

                    {/* Next Match */}
                    <div className="p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/30">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                                    Következő forduló · {nextMatch?.competition?.short_name || 'NB I'}
                                </span>
                                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                                    {formatDateTime(nextMatch?.match_date)}
                                </span>
                            </div>

                            <div className="py-4 flex items-center justify-around text-center">
                                {/* Opponent */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="w-14 h-14 rounded-2xl bg-[#005c2d] text-white flex items-center justify-center font-black text-sm shadow-md">
                                        FTC
                                    </div>
                                    <span className="font-extrabold text-sm sm:text-base mt-2 text-slate-900">
                                        {nextMatch?.opponent_name || 'Ferencvárosi TC'}
                                    </span>
                                </div>

                                {/* VS */}
                                <div className="px-4 flex flex-col items-center">
                                    <span className="text-2xl font-black text-slate-400 bg-slate-100 w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-200">
                                        VS
                                    </span>
                                    <span className="text-[11px] font-bold text-slate-500 mt-1.5">
                                        {nextMatch?.round || '12. forduló'}
                                    </span>
                                </div>

                                {/* Paksi FC */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="w-14 h-14 rounded-2xl bg-[#006B3F] text-white flex items-center justify-center font-black text-sm shadow-md">
                                        PAKS
                                    </div>
                                    <span className="font-extrabold text-sm sm:text-base mt-2 text-slate-900">
                                        Paksi FC
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {nextMatch?.venue || 'Groupama Aréna, Budapest'}
                            </span>
                            <Link
                                href="/merkozesek"
                                className="font-bold text-amber-600 hover:text-amber-700 transition"
                            >
                                Teljes menetrend →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MAIN CONTENT: LATEST NEWS & STANDINGS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Latest News Grid (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between border-b-2 border-emerald-800 pb-3">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                                <span className="w-3.5 h-7 bg-[#006B3F] rounded-sm" />
                                Friss Hírek & Cikkek
                            </h2>
                            <Link
                                href="/hirek"
                                className="text-sm font-bold text-[#006B3F] hover:text-emerald-800 transition flex items-center gap-1"
                            >
                                Összes hír <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {latestArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/hirek/${article.slug}`}
                                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col transform hover:-translate-y-1"
                                >
                                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                                        {article.featured_image ? (
                                            <img
                                                src={storageUrl(article.featured_image)}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center">
                                                <Shield className="w-16 h-16 text-emerald-400/30" />
                                            </div>
                                        )}
                                        {article.category && (
                                            <span
                                                className="absolute top-3 left-3 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md text-white shadow"
                                                style={{
                                                    backgroundColor:
                                                        article.category.color || '#006B3F',
                                                }}
                                            >
                                                {article.category.name}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                                <span>{formatDate(article.published_at)}</span>
                                                <span>·</span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    {article.views_count}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-slate-900 group-hover:text-[#006B3F] transition line-clamp-2 leading-snug">
                                                {article.title}
                                            </h3>
                                            {article.excerpt && (
                                                <p className="text-xs text-slate-600 line-clamp-2">
                                                    {article.excerpt}
                                                </p>
                                            )}
                                        </div>

                                        <div className="pt-2 text-xs font-bold text-[#006B3F] flex items-center gap-1">
                                            <span>Részletek</span>
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Standings Widget (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center justify-between border-b-2 border-emerald-800 pb-3">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                Tabella (NB I)
                            </h2>
                            <Link
                                href="/tabella"
                                className="text-xs font-bold text-[#006B3F] hover:underline"
                            >
                                Teljes tabella →
                            </Link>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-slate-100 text-slate-600 uppercase font-black text-[10px]">
                                    <tr>
                                        <th className="py-2.5 px-3 text-center">#</th>
                                        <th className="py-2.5 px-2">Csapat</th>
                                        <th className="py-2.5 px-2 text-center">M</th>
                                        <th className="py-2.5 px-2 text-center">GD</th>
                                        <th className="py-2.5 px-3 text-center font-extrabold text-slate-900">
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
                                                    : 'hover:bg-slate-50 text-slate-700'
                                            }`}
                                        >
                                            <td className="py-2.5 px-3 text-center font-bold">
                                                {team.position}
                                            </td>
                                            <td className="py-2.5 px-2 font-bold truncate max-w-[130px]">
                                                {team.team_name}
                                            </td>
                                            <td className="py-2.5 px-2 text-center text-slate-500">
                                                {team.played}
                                            </td>
                                            <td className="py-2.5 px-2 text-center text-slate-500">
                                                {team.goal_difference > 0
                                                    ? `+${team.goal_difference}`
                                                    : team.goal_difference}
                                            </td>
                                            <td className="py-2.5 px-3 text-center font-black text-sm text-[#006B3F]">
                                                {team.points}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Club Philosophy Banner */}
                        <div className="rounded-2xl p-6 bg-gradient-to-br from-[#006B3F] to-[#0b3820] text-white shadow-lg space-y-3">
                            <div className="flex items-center gap-2 text-amber-400">
                                <Shield className="w-5 h-5" />
                                <span className="font-black text-xs uppercase tracking-wider">
                                    Klubfilozófia
                                </span>
                            </div>
                            <h3 className="text-lg font-black leading-tight text-white">
                                Csak magyar játékosokkal az élvonalban!
                            </h3>
                            <p className="text-xs text-emerald-100/90 leading-relaxed">
                                A Paksi FC egyedülálló módon kizárólag magyar labdarúgókat foglalkoztatva
                                ér el folyamatos sikereket a hazai élvonalban és a Magyar Kupában.
                            </p>
                            <Link
                                href="/tortenet"
                                className="inline-block pt-1 text-xs font-bold text-amber-300 hover:text-white transition"
                            >
                                Ismerd meg klubunk történetét →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SPONSORS BANNER */}
            <section className="bg-slate-100 py-12 px-4 sm:px-8 border-t border-slate-200">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="text-center">
                        <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                            Kiemelt Támogatóink & Partnereink
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
                        {sponsors.map((sp) => (
                            <a
                                key={sp.id}
                                href={sp.website_url || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 flex items-center justify-center"
                            >
                                <span className="font-black text-slate-800 text-sm tracking-wide">
                                    {sp.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

