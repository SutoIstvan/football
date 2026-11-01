<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Standing extends Model
{
    use HasFactory;

    protected $fillable = [
        'season_id',
        'competition_id',
        'position',
        'team_name',
        'team_logo',
        'played',
        'won',
        'drawn',
        'lost',
        'goals_for',
        'goals_against',
        'goal_difference',
        'points',
        'is_own_team',
    ];

    protected function casts(): array
    {
        return [
            'position' => 'integer',
            'played' => 'integer',
            'won' => 'integer',
            'drawn' => 'integer',
            'lost' => 'integer',
            'goals_for' => 'integer',
            'goals_against' => 'integer',
            'goal_difference' => 'integer',
            'points' => 'integer',
            'is_own_team' => 'boolean',
        ];
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function competition(): BelongsTo
    {
        return $this->belongsTo(Competition::class);
    }

    public function scopeForCurrentSeason($query)
    {
        return $query->whereHas('season', fn ($q) => $q->where('is_current', true));
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('position');
    }
}
