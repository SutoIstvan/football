<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\Season;
use App\Models\Standing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StandingController extends Controller
{
    public function index(Request $request): Response
    {
        $currentSeason = Season::where('is_current', true)->first();
        $seasonId = $request->query('season_id', $currentSeason?->id);

        $nbi = Competition::where('slug', 'nb-i')->first();
        $competitionId = $request->query('competition_id', $nbi?->id);

        $standings = Standing::query()
            ->where('season_id', $seasonId)
            ->where('competition_id', $competitionId)
            ->ordered()
            ->get();

        $seasons = Season::all(['id', 'name', 'is_current']);
        $competitions = Competition::all(['id', 'name', 'short_name']);

        return Inertia::render('standings/index', [
            'standings' => $standings,
            'seasons' => $seasons,
            'competitions' => $competitions,
            'currentSeasonId' => (int) $seasonId,
            'currentCompetitionId' => (int) $competitionId,
        ]);
    }
}

