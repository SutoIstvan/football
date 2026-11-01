<?php

namespace App\Filament\Resources\Articles\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Cím')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('slug')
                    ->label('Slug (URL)')
                    ->required(),
                Select::make('category_id')
                    ->label('Kategória')
                    ->relationship('category', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),
                Select::make('tags')
                    ->label('Címkék')
                    ->relationship('tags', 'name')
                    ->multiple()
                    ->preload(),
                Select::make('author_id')
                    ->label('Szerző')
                    ->relationship('author', 'name')
                    ->default(fn () => auth()->id())
                    ->required()
                    ->searchable(),
                Select::make('status')
                    ->label('Állapot')
                    ->options([
                        'draft' => 'Piszkozat (Draft)',
                        'published' => 'Közzétéve (Published)',
                        'archived' => 'Archivált (Archived)',
                    ])
                    ->default('draft')
                    ->required(),
                DateTimePicker::make('published_at')
                    ->label('Közzététel dátuma')
                    ->default(now()),
                FileUpload::make('featured_image')
                    ->label('Kiemelt kép')
                    ->image()
                    ->disk('public')
                    ->directory('articles')
                    ->columnSpanFull(),
                Textarea::make('excerpt')
                    ->label('Rövid leírás / Bevezető')
                    ->rows(3)
                    ->columnSpanFull(),
                RichEditor::make('content')
                    ->label('Tartalom')
                    ->fileAttachmentsDisk('public')
                    ->fileAttachmentsDirectory('articles/attachments')
                    ->required()
                    ->columnSpanFull(),
                Toggle::make('is_featured')
                    ->label('Kiemelt hír (Főoldali slider)')
                    ->default(false),
                Toggle::make('is_pinned')
                    ->label('Rögzített hír')
                    ->default(false),
                TextInput::make('meta_title')
                    ->label('SEO Cím'),
                Textarea::make('meta_description')
                    ->label('SEO Leírás')
                    ->columnSpanFull(),
            ]);
    }
}
