<?php

namespace App\Filament\Resources\Matches;

use App\Filament\Resources\Matches\Pages\CreateMatch;
use App\Filament\Resources\Matches\Pages\EditMatch;
use App\Filament\Resources\Matches\Pages\ListMatches;
use App\Filament\Resources\Matches\Schemas\MatchForm;
use App\Filament\Resources\Matches\Tables\MatchesTable;
use App\Models\Match_;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MatchResource extends Resource
{
    protected static ?string $model = Match_::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    protected static string | \UnitEnum | null $navigationGroup = 'Merkozesek';
    protected static ?string $navigationLabel = 'Merkozesek';
    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return MatchForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MatchesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMatches::route('/'),
            'create' => CreateMatch::route('/create'),
            'edit' => EditMatch::route('/{record}/edit'),
        ];
    }
}
