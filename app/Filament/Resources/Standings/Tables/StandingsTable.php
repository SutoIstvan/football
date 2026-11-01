<?php

namespace App\Filament\Resources\Standings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class StandingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('season.name')
                    ->searchable(),
                TextColumn::make('competition.name')
                    ->searchable(),
                TextColumn::make('position')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('team_name')
                    ->searchable(),
                TextColumn::make('team_logo')
                    ->searchable(),
                TextColumn::make('played')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('won')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('drawn')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('lost')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('goals_for')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('goals_against')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('goal_difference')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('points')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_own_team')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
