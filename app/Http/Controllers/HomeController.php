<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Match_;
use App\Models\Sponsor;
use App\Models\Standing;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featuredArticles = Article::query()
            ->with(['category', 'author:id,name'])
            ->published()
            ->featured()
            ->latest('published_at')
            ->take(5)
            ->get();

        $latestArticles = Article::query()
            ->with(['category', 'author:id,name'])
            ->published()
            ->latest('published_at')
            ->take(6)
            ->get();

        $nextMatch = Match_::query()
            ->with(['competition', 'season'])
            ->upcoming()
            ->first();

        $lastMatch = Match_::query()
            ->with(['competition', 'events.player'])
            ->finished()
            ->first();

        $standings = Standing::query()
            ->forCurrentSeason()
            ->ordered()
            ->take(8)
            ->get();

        $sponsors = Sponsor::query()
            ->active()
            ->ordered()
            ->get();

        return Inertia::render('home', [
            'featuredArticles' => $featuredArticles,
            'latestArticles' => $latestArticles,
            'nextMatch' => $nextMatch,
            'lastMatch' => $lastMatch,
            'standings' => $standings,
            'sponsors' => $sponsors,
        ]);
    }
}

