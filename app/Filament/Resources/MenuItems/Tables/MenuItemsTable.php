<?php

namespace App\Filament\Resources\MenuItems\Tables;

use App\Models\MenuItem;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class MenuItemsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order', 'asc')
            ->columns([
                TextColumn::make('title')
                    ->label('Menüpont neve')
                    ->searchable()
                    ->formatStateUsing(function ($state, MenuItem $record) {
                        if ($record->parent_id) {
                            return '↳ ' . $state;
                        }
                        return $state;
                    })
                    ->description(fn (MenuItem $record) => $record->parent ? 'Szülő: ' . $record->parent->title : null)
                    ->weight(fn (MenuItem $record) => $record->parent_id ? 'normal' : 'bold'),

                TextColumn::make('location')
                    ->label('Elhelyezkedés')
                    ->badge()
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'header' => 'Fejléc (Főmenü)',
                        'footer' => 'Lábléc (Footer)',
                        default => $state,
                    })
                    ->color(fn ($state) => match ($state) {
                        'header' => 'success',
                        'footer' => 'info',
                        default => 'gray',
                    }),

                TextColumn::make('link_type')
                    ->label('Típus')
                    ->badge()
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'page' => 'Oldal',
                        'route' => 'Útvonal',
                        'url' => 'Külső URL',
                        'none' => 'Csoport',
                        default => 'Egyéb',
                    })
                    ->color(fn ($state) => match ($state) {
                        'page' => 'success',
                        'route' => 'info',
                        'url' => 'warning',
                        'none' => 'gray',
                        default => 'gray',
                    }),

                TextColumn::make('target_destination')
                    ->label('Hivatkozás célja / URL')
                    ->state(function (MenuItem $record) {
                        if ($record->link_type === 'page') {
                            return $record->page ? $record->page->title . " (/{$record->page->slug})" : 'Oldal nem található';
                        }
                        if ($record->link_type === 'route') {
                            return $record->route_name ?? '—';
                        }
                        if ($record->link_type === 'url') {
                            return $record->url ?? '—';
                        }
                        return '—';
                    })
                    ->color('gray')
                    ->limit(40),

                TextColumn::make('sort_order')
                    ->label('Sorrend')
                    ->numeric()
                    ->sortable(),

                IconColumn::make('is_active')
                    ->label('Aktív')
                    ->boolean(),

                IconColumn::make('opens_in_new_tab')
                    ->label('Új lap')
                    ->boolean()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('location')
                    ->label('Elhelyezkedés')
                    ->options([
                        'header' => 'Fejléc (Főmenü)',
                        'footer' => 'Lábléc (Footer)',
                    ]),
                SelectFilter::make('link_type')
                    ->label('Típus')
                    ->options([
                        'page' => 'Oldal',
                        'route' => 'Útvonal',
                        'url' => 'Egyéni / Külső URL',
                        'none' => 'Csoport',
                    ]),
                TernaryFilter::make('is_active')
                    ->label('Csak aktívak'),
            ])
            ->recordActions([
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
