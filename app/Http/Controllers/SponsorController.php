<?php

namespace App\Http\Controllers;

use App\Models\Sponsor;
use Inertia\Inertia;
use Inertia\Response;

class SponsorController extends Controller
{
    public function index(): Response
    {
        $sponsors = Sponsor::query()
            ->active()
            ->ordered()
            ->get();

        $groupedSponsors = [
            'main' => $sponsors->where('tier', 'main')->values(),
            'gold' => $sponsors->where('tier', 'gold')->values(),
            'silver' => $sponsors->where('tier', 'silver')->values(),
            'partner' => $sponsors->where('tier', 'partner')->values(),
        ];

        return Inertia::render('sponsors/index', [
            'groupedSponsors' => $groupedSponsors,
        ]);
    }
}

