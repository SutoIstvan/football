<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'link_type',
        'page_id',
        'url',
        'route_name',
        'parent_id',
        'location',
        'sort_order',
        'is_active',
        'opens_in_new_tab',
    ];

    protected $appends = [
        'resolved_url',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'opens_in_new_tab' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'parent_id');
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class, 'page_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'parent_id')->orderBy('sort_order');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeHeader($query)
    {
        return $query->where('location', 'header');
    }

    public function scopeFooter($query)
    {
        return $query->where('location', 'footer');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    public function scopeRoots($query)
    {
        return $query->whereNull('parent_id')->orderBy('sort_order');
    }

    public function getResolvedUrlAttribute(): string
    {
        if ($this->link_type === 'page' && $this->page) {
            return '/' . ltrim($this->page->slug, '/');
        }

        if ($this->link_type === 'none') {
            return '#';
        }

        if (($this->link_type === 'route' || empty($this->link_type)) && $this->route_name) {
            if (\Illuminate\Support\Facades\Route::has($this->route_name)) {
                return route($this->route_name, [], false);
            }
        }

        if ($this->page_id && $this->page) {
            return '/' . ltrim($this->page->slug, '/');
        }

        return $this->url ?? '#';
    }
}
