<?php

namespace App\Filament\Resources\Pages\Schemas;

use App\Models\MenuItem;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Oldal alapadatok')
                    ->description('Az oldal címe, URL azonosítója és sablonja')
                    ->columnSpanFull()
                    ->columns(1)
                    ->schema([
                        TextInput::make('title')
                            ->label('Oldal címe')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set, callable $get) {
                                if (empty($get('slug')) && !empty($state)) {
                                    $set('slug', \Illuminate\Support\Str::slug($state));
                                }
                            }),

                        TextInput::make('slug')
                            ->label('Slug (URL azonosító)')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->prefix('/'),

                        Select::make('parent_id')
                            ->label('Szülő oldal (opcionális)')
                            ->relationship('parent', 'title')
                            ->placeholder('— Főszintű oldal —')
                            ->searchable()
                            ->preload(),

                        Select::make('template')
                            ->label('Sablon')
                            ->options([
                                'default' => 'Alapértelmezett (Default)',
                                'stadium' => 'Stadion (Stadium)',
                                'history' => 'Történet (History)',
                                'contact' => 'Kapcsolat (Contact)',
                            ])
                            ->default('default')
                            ->required(),

                        TextInput::make('sort_order')
                            ->label('Sorrend')
                            ->numeric()
                            ->default(0),

                        Toggle::make('is_published')
                            ->label('Közzétéve (Nyilvánosan elérhető)')
                            ->default(true),
                    ]),

                Section::make('Megjelenés a weboldal menüjében')
                    ->description('Rendeld hozzá ezt az oldalt a fejléc vagy lábléc menühöz közvetlenül innen')
                    ->columnSpanFull()
                    ->columns(1)
                    ->schema([
                        Repeater::make('menuItems')
                            ->relationship('menuItems')
                            ->label('Menüpontok ehhez az oldalhoz')
                            ->addActionLabel('+ Hozzáadás a menühöz')
                            ->defaultItems(0)
                            ->columnSpanFull()
                            ->columns(1)
                            ->schema([
                                Hidden::make('link_type')->default('page'),

                                TextInput::make('title')
                                    ->label('Menüpont felirata')
                                    ->default(fn (callable $get) => $get('../../title') ?? '')
                                    ->required(),

                                Select::make('location')
                                    ->label('Menü típusa')
                                    ->options([
                                        'header' => 'Fejléc (Főmenü)',
                                        'footer' => 'Lábléc (Footer)',
                                    ])
                                    ->default('header')
                                    ->required(),

                                Select::make('parent_id')
                                    ->label('Szülő menüpont')
                                    ->placeholder('— Főszintű —')
                                    ->options(fn () => MenuItem::whereNull('parent_id')->pluck('title', 'id'))
                                    ->searchable()
                                    ->nullable(),

                                TextInput::make('sort_order')
                                    ->label('Sorrend')
                                    ->numeric()
                                    ->default(0),

                                Toggle::make('is_active')
                                    ->label('Aktív a menüben')
                                    ->default(true),
                            ]),
                    ]),

                Section::make('Tartalom & Kép')
                    ->columnSpanFull()
                    ->columns(1)
                    ->schema([
                        FileUpload::make('featured_image')
                            ->label('Kiemelt kép / Fejléc kép')
                            ->image()
                            ->disk('public')
                            ->directory('pages'),

                        RichEditor::make('content')
                            ->label('Tartalom')
                            ->fileAttachmentsDisk('public')
                            ->fileAttachmentsDirectory('pages/attachments'),
                    ]),

                Section::make('SEO Beállítások')
                    ->collapsed()
                    ->columnSpanFull()
                    ->columns(1)
                    ->schema([
                        TextInput::make('meta_title')
                            ->label('SEO Cím'),

                        Textarea::make('meta_description')
                            ->label('SEO Leírás'),
                    ]),
            ]);
    }
}
