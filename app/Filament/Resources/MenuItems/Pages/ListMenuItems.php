<?php

namespace App\Filament\Resources\MenuItems\Pages;

use App\Filament\Resources\MenuItems\MenuItemResource;
use App\Models\MenuItem;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListMenuItems extends ListRecords
{
    protected static string $resource = MenuItemResource::class;

    protected static ?string $title = 'Menüpontok';
    protected static ?string $breadcrumb = 'Lista';

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->label('Új menüpont hozzáadása'),
        ];
    }

    public function getTabs(): array
    {
        return [
            'all' => Tab::make('Összes menüpont')
                ->badge(MenuItem::count()),
            'header' => Tab::make('Fejléc (Főmenü)')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('location', 'header'))
                ->badge(MenuItem::where('location', 'header')->count()),
            'footer' => Tab::make('Lábléc (Footer)')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('location', 'footer'))
                ->badge(MenuItem::where('location', 'footer')->count()),
        ];
    }
}
