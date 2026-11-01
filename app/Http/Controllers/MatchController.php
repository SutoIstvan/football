<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\Match_;
use App\Models\Season;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MatchController extends Controller
{
    public function index(Request $request): Response
    {
        $currentSeason = Season::where('is_current', true)->first();
        $seasonId = $request->query('season_id', $currentSeason?->id);
        $status = $request->query('status', 'all'); // 'all', 'upcoming', 'finished'

        $query = Match_::query()
            ->with(['competition', 'events.player'])
            ->where('season_id', $seasonId);

        if ($status === 'upcoming') {
            $query->upcoming();
        } elseif ($status === 'finished') {
            $query->finished();
        } else {
            $query->orderBy('match_date');
        }

        $matches = $query->paginate(12)->withQueryString();
        $seasons = Season::all(['id', 'name', 'is_current']);
        $competitions = Competition::all(['id', 'name', 'short_name']);

        return Inertia::render('matches/index', [
            'matches' => $matches,
            'seasons' => $seasons,
            'competitions' => $competitions,
            'currentSeasonId' => (int) $seasonId,
            'currentStatus' => $status,
        ]);
    }

    public function show(int $id): Response
    {
        $match = Match_::query()
            ->with(['competition', 'season', 'events.player', 'article'])
            ->findOrFail($id);

        return Inertia::render('matches/show', [
            'match' => $match,
        ]);
    }
}

