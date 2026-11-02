<?php

namespace App\Filament\Resources\Pages\Tables;

use App\Models\MenuItem;
use App\Models\Page;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class PagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order', 'asc')
            ->columns([
                TextColumn::make('title')
                    ->label('Oldal címe')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn (Page $record) => '/' . $record->slug),

                ImageColumn::make('featured_image')
                    ->label('Kép')
                    ->circular(),

                TextColumn::make('template')
                    ->label('Sablon')
                    ->badge()
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'default' => 'Alapértelmezett',
                        'stadium' => 'Stadion',
                        'history' => 'Történet',
                        'contact' => 'Kapcsolat',
                        default => $state,
                    })
                    ->color('gray'),

                TextColumn::make('menu_presence')
                    ->label('Menüben')
                    ->badge()
                    ->state(function (Page $record) {
                        $locations = $record->menuItems->pluck('location')->map(fn ($l) => match ($l) {
                            'header' => 'Fejléc',
                            'footer' => 'Lábléc',
                            default => $l,
                        })->unique()->all();

                        return !empty($locations) ? $locations : ['—'];
                    })
                    ->color(fn (Page $record) => $record->menuItems->isNotEmpty() ? 'success' : 'gray'),

                TextColumn::make('sort_order')
                    ->label('Sorrend')
                    ->numeric()
                    ->sortable(),

                IconColumn::make('is_published')
                    ->label('Közzétéve')
                    ->boolean(),

                TextColumn::make('updated_at')
                    ->label('Módosítva')
                    ->dateTime('Y.m.d H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TernaryFilter::make('is_published')
                    ->label('Közzététel állapota'),
                SelectFilter::make('template')
                    ->label('Sablon')
                    ->options([
                        'default' => 'Alapértelmezett',
                        'stadium' => 'Stadion',
                        'history' => 'Történet',
                        'contact' => 'Kapcsolat',
                    ]),
            ])
            ->recordActions([
                Action::make('addToMenu')
                    ->label('Menübe')
                    ->icon('heroicon-o-bars-3')
                    ->color('success')
                    ->modalHeading(fn (Page $record) => "Oldal hozzáadása a menühöz: {$record->title}")
                    ->modalDescription('Gyors hozzáadás a fejléc vagy lábléc navigációhoz')
                    ->schema([
                        TextInput::make('title')
                            ->label('Menüpont felirata')
                            ->default(fn (Page $record) => $record->title)
                            ->required(),
                        Select::make('location')
                            ->label('Elhelyezkedés')
                            ->options([
                                'header' => 'Fejléc (Főmenü)',
                                'footer' => 'Lábléc (Footer)',
                            ])
                            ->default('header')
                            ->required(),
                        Select::make('parent_id')
                            ->label('Szülő menüpont (Almenühöz)')
                            ->placeholder('— Főszintű menüpont —')
                            ->options(fn () => MenuItem::whereNull('parent_id')->pluck('title', 'id'))
                            ->searchable()
                            ->nullable(),
                        TextInput::make('sort_order')
                            ->label('Sorrend')
                            ->numeric()
                            ->default(0),
                    ])
                    ->action(function (Page $record, array $data) {
                        $record->menuItems()->create([
                            'title' => $data['title'],
                            'location' => $data['location'],
                            'parent_id' => $data['parent_id'] ?? null,
                            'sort_order' => $data['sort_order'] ?? 0,
                            'link_type' => 'page',
                            'is_active' => true,
                            'opens_in_new_tab' => false,
                        ]);

                        Notification::make()
                            ->title('Sikeresen hozzáadva a menühöz!')
                            ->success()
                            ->send();
                    }),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
