<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\StandingController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

// Főoldal
Route::get('/', [HomeController::class, 'index'])->name('home');

// Hírek
Route::prefix('hirek')->name('articles.')->group(function () {
    Route::get('/', [ArticleController::class, 'index'])->name('index');
    Route::get('/{slug}', [ArticleController::class, 'show'])->name('show');
});

// Csapat
Route::prefix('csapat')->name('team.')->group(function () {
    Route::get('/jatekos/{slug}', [TeamController::class, 'player'])->name('player');
    Route::get('/{teamSlug?}', [TeamController::class, 'index'])->name('index');
});

// Mérkőzések
Route::prefix('merkozesek')->name('matches.')->group(function () {
    Route::get('/', [MatchController::class, 'index'])->name('index');
    Route::get('/{id}', [MatchController::class, 'show'])->name('show');
});

// Tabella
Route::get('/tabella', [StandingController::class, 'index'])->name('standings.index');

// Média
Route::prefix('media')->name('galleries.')->group(function () {
    Route::get('/', [GalleryController::class, 'index'])->name('index');
    Route::get('/{slug}', [GalleryController::class, 'show'])->name('show');
});

// Támogatók
Route::get('/tamogatok', [SponsorController::class, 'index'])->name('sponsors.index');

// Auth Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';

// Dinamikus statikus oldalak (pl. /stadion, /tortenet, /kapcsolat)
Route::get('/{slug}', [PageController::class, 'show'])->name('pages.show');
