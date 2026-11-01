<?php

namespace App\Filament\Resources\MenuItems\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class MenuItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Cím')
                    ->required(),
                TextInput::make('url')
                    ->label('Egyéni URL (pl. /tortenet vagy https://...)'),
                TextInput::make('route_name')
                    ->label('Útvonal neve (pl. team.index, articles.index)'),
                Select::make('parent_id')
                    ->label('Szülő menüpont (almenühöz)')
                    ->relationship('parent', 'title')
                    ->searchable()
                    ->preload()
                    ->nullable(),
                Select::make('location')
                    ->label('Elhelyezkedés')
                    ->options([
                        'header' => 'Fejléc (Főmenü)',
                        'footer' => 'Lábléc (Footer)',
                    ])
                    ->default('header')
                    ->required(),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
                Toggle::make('opens_in_new_tab')
                    ->required(),
            ]);
    }
}
