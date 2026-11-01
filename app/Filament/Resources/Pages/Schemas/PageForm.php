<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Oldal címe')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('slug')
                    ->label('Slug (URL)')
                    ->required(),
                Select::make('parent_id')
                    ->label('Szülő oldal')
                    ->relationship('parent', 'title')
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
                    ->label('Közzétéve')
                    ->default(true),
                FileUpload::make('featured_image')
                    ->label('Fejléc kép')
                    ->image()
                    ->disk('public')
                    ->directory('pages')
                    ->columnSpanFull(),
                RichEditor::make('content')
                    ->label('Tartalom')
                    ->fileAttachmentsDisk('public')
                    ->fileAttachmentsDirectory('pages/attachments')
                    ->columnSpanFull(),
                TextInput::make('meta_title')
                    ->label('SEO Cím'),
                Textarea::make('meta_description')
                    ->label('SEO Leírás')
                    ->columnSpanFull(),
            ]);
    }
}
