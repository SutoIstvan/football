<?php

namespace App\Filament\Resources\Players\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PlayerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('first_name')
                    ->required(),
                TextInput::make('last_name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('squad_number')
                    ->numeric(),
                TextInput::make('position')
                    ->required(),
                DatePicker::make('date_of_birth'),
                TextInput::make('nationality')
                    ->required()
                    ->default('Magyar'),
                TextInput::make('height')
                    ->numeric(),
                TextInput::make('weight')
                    ->numeric(),
                TextInput::make('preferred_foot'),
                TextInput::make('photo'),
                Textarea::make('biography')
                    ->columnSpanFull(),
                DatePicker::make('joined_at'),
                DatePicker::make('contract_until'),
                Textarea::make('previous_clubs')
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->required(),
                Select::make('team_id')
                    ->relationship('team', 'name')
                    ->required(),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
