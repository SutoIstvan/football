<?php

namespace App\Http\Middleware;

use App\Models\MenuItem;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'navigation' => [
                'header' => MenuItem::query()
                    ->active()
                    ->header()
                    ->roots()
                    ->with(['children' => fn ($query) => $query->active()->ordered()])
                    ->ordered()
                    ->get(),
                'footer' => MenuItem::query()->active()->footer()->ordered()->get(),
            ],
            'clubSettings' => [
                'name' => 'Paksi FC',
                'tagline' => 'A magyar csapat',
                'phone' => Setting::get('contact.phone', '+36 75 830 800'),
                'email' => Setting::get('contact.email', 'info@paksifc.hu'),
                'address' => Setting::get('contact.address', '7030 Paks, Fehérvári út 29.'),
                'facebook' => Setting::get('social.facebook', 'https://facebook.com/paksifc'),
                'instagram' => Setting::get('social.instagram', 'https://instagram.com/paksifc_official'),
                'youtube' => Setting::get('social.youtube', 'https://youtube.com/@paksifc'),
                'tiktok' => Setting::get('social.tiktok', 'https://tiktok.com/@paksifc'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
