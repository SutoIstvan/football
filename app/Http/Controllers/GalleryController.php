<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::query()
            ->withCount('items')
            ->published()
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('media/index', [
            'galleries' => $galleries,
        ]);
    }

    public function show(string $slug): Response
    {
        $gallery = Gallery::query()
            ->with(['items' => fn ($q) => $q->ordered()])
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('media/show', [
            'gallery' => $gallery,
        ]);
    }
}

