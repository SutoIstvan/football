<?php

namespace App\Filament\Resources\MenuItems\Schemas;

use App\Models\MenuItem;
use App\Models\Page;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class MenuItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Alapadatok')
                    ->description('A menüpont elnevezése és elhelyezkedése a weboldalon')
                    ->columnSpanFull()
                    ->columns(1)
                    ->schema([
                        TextInput::make('title')
                            ->label('Menüpont felirata')
                            ->placeholder('pl. Hírek, Kapcsolat, Klubtörténet')
                            ->required()
                            ->maxLength(100),

                        Select::make('location')
                            ->label('Menü típusa / Elhelyezkedés')
                            ->options([
                                'header' => 'Fejléc (Főmenü)',
                                'footer' => 'Lábléc (Footer)',
                            ])
                            ->default('header')
                            ->required()
                            ->live(),

                        Select::make('parent_id')
                            ->label('Szülő menüpont (Almenühöz)')
                            ->placeholder('— Főszintű menüpont (nincs szülője) —')
                            ->options(function (callable $get, ?MenuItem $record) {
                                $location = $get('location') ?? 'header';
                                return MenuItem::query()
                                    ->where('location', $location)
                                    ->whereNull('parent_id')
                                    ->when($record?->id, fn ($q) => $q->where('id', '!=', $record->id))
                                    ->pluck('title', 'id');
                            })
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->helperText('Ha almenüt szeretnél (pl. Klub alatt Stadion), válaszd ki a szülőt.'),

                        TextInput::make('sort_order')
                            ->label('Megjelenési sorrend')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->helperText('Kisebb szám előrébb jelenik meg (pl. 0, 10, 20).'),
                    ]),

                Section::make('Hivatkozás célja')
                    ->description('Válaszd ki, hogy a menüpont egy belső oldalra, rendszer funkcióra vagy külső linkre mutasson')
                    ->columnSpanFull()
                    ->columns(1)
                    ->schema([
                        ToggleButtons::make('link_type')
                            ->label('Hivatkozás típusa')
                            ->options([
                                'page' => 'Oldal (Page)',
                                'route' => 'Rendszer útvonal',
                                'url' => 'Egyéni / Külső URL',
                                'none' => 'Csak tároló (Nincs link)',
                            ])
                            ->icons([
                                'page' => 'heroicon-o-document-text',
                                'route' => 'heroicon-o-arrow-top-right-on-square',
                                'url' => 'heroicon-o-globe-alt',
                                'none' => 'heroicon-o-folder',
                            ])
                            ->colors([
                                'page' => 'success',
                                'route' => 'info',
                                'url' => 'warning',
                                'none' => 'gray',
                            ])
                            ->default('page')
                            ->inline()
                            ->live()
                            ->required(),

                        // 1. Ha Oldal
                        Select::make('page_id')
                            ->label('Válassz oldalt')
                            ->placeholder('Válassz egy meglévő oldalt...')
                            ->options(fn () => Page::query()->orderBy('title')->pluck('title', 'id'))
                            ->searchable()
                            ->preload()
                            ->visible(fn (callable $get) => $get('link_type') === 'page')
                            ->required(fn (callable $get) => $get('link_type') === 'page')
                            ->live()
                            ->afterStateUpdated(function ($state, callable $set, callable $get) {
                                if ($state && empty($get('title'))) {
                                    $page = Page::find($state);
                                    if ($page) {
                                        $set('title', $page->title);
                                    }
                                }
                            })
                            ->helperText(function (callable $get) {
                                $pageId = $get('page_id');
                                if ($pageId && $page = Page::find($pageId)) {
                                    return "Cél URL: /{$page->slug} (Sablon: {$page->template})";
                                }
                                return 'A menüpont automatikusan ennek az oldalnak a címére és URL-jére fog mutatni.';
                            }),

                        // 2. Ha Rendszer útvonal
                        Select::make('route_name')
                            ->label('Rendszer modul / Útvonal')
                            ->placeholder('Válassz rendszer oldalt...')
                            ->options([
                                'home' => 'Főoldal (/)',
                                'articles.index' => 'Hírek (/hirek)',
                                'team.index' => 'Csapatkeret (/csapat)',
                                'matches.index' => 'Mérkőzések (/merkozesek)',
                                'standings.index' => 'Tabella (/tabella)',
                                'galleries.index' => 'Média & Galéria (/media)',
                                'sponsors.index' => 'Támogatók (/tamogatok)',
                            ])
                            ->searchable()
                            ->visible(fn (callable $get) => $get('link_type') === 'route')
                            ->required(fn (callable $get) => $get('link_type') === 'route')
                            ->helperText('A rendszer beépített moduljai.'),

                        // 3. Ha Egyéni URL
                        TextInput::make('url')
                            ->label('Egyéni vagy külső URL')
                            ->placeholder('pl. https://facebook.com/paksifc vagy /egyedi-link')
                            ->visible(fn (callable $get) => $get('link_type') === 'url')
                            ->required(fn (callable $get) => $get('link_type') === 'url')
                            ->helperText('Külső weboldal esetén teljes URL-t adj meg (pl. https://...), belső link esetén / jellel kezdd.'),
                    ]),

                Section::make('További beállítások')
                    ->columnSpanFull()
                    ->columns(1)
                    ->schema([
                        Toggle::make('is_active')
                            ->label('Aktív (Megjelenik a weboldalon)')
                            ->default(true),

                        Toggle::make('opens_in_new_tab')
                            ->label('Megnyitás új lapon (target="_blank")')
                            ->default(false)
                            ->hidden(fn (callable $get) => $get('link_type') === 'none'),
                    ]),
            ]);
    }
}
