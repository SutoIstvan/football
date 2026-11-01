<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Team;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(?string $teamSlug = null): Response
    {
        $team = $teamSlug
            ? Team::where('slug', $teamSlug)->where('is_active', true)->firstOrFail()
            : Team::where('slug', 'elso-csapat')->first() ?? Team::first();

        $players = Player::query()
            ->where('team_id', $team->id)
            ->active()
            ->ordered()
            ->get();

        $groupedPlayers = [
            'goalkeepers' => $players->where('position', 'goalkeeper')->values(),
            'defenders' => $players->where('position', 'defender')->values(),
            'midfielders' => $players->where('position', 'midfielder')->values(),
            'forwards' => $players->where('position', 'forward')->values(),
        ];

        $staff = $team->staff()->active()->ordered()->get();
        $allTeams = Team::query()->active()->ordered()->get(['id', 'name', 'slug']);

        return Inertia::render('team/index', [
            'currentTeam' => $team,
            'groupedPlayers' => $groupedPlayers,
            'staff' => $staff,
            'allTeams' => $allTeams,
        ]);
    }

    public function player(string $slug): Response
    {
        $player = Player::query()
            ->with(['team', 'seasonStats.competition', 'seasonStats.season'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('team/player', [
            'player' => $player,
        ]);
    }
}

