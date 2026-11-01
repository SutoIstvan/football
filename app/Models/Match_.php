<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Match_ extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $fillable = [
        'season_id',
        'competition_id',
        'round',
        'match_date',
        'venue',
        'is_home',
        'opponent_name',
        'opponent_logo',
        'home_score',
        'away_score',
        'status',
        'attendance',
        'referee',
        'summary',
        'lineup',
        'article_id',
    ];

    protected function casts(): array
    {
        return [
            'match_date' => 'datetime',
            'is_home' => 'boolean',
            'home_score' => 'integer',
            'away_score' => 'integer',
            'attendance' => 'integer',
            'lineup' => 'array',
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

    public function events(): HasMany
    {
        return $this->hasMany(MatchEvent::class, 'match_id')->orderBy('minute');
    }

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(Gallery::class, 'match_id');
    }

    public function getScoreAttribute(): ?string
    {
        if ($this->home_score === null || $this->away_score === null) {
            return null;
        }

        return "{$this->home_score} - {$this->away_score}";
    }

    public function getResultAttribute(): ?string
    {
        if ($this->home_score === null || $this->away_score === null) {
            return null;
        }

        $ownScore = $this->is_home ? $this->home_score : $this->away_score;
        $oppScore = $this->is_home ? $this->away_score : $this->home_score;

        if ($ownScore > $oppScore) return 'win';
        if ($ownScore < $oppScore) return 'loss';
        return 'draw';
    }

    public function scopeUpcoming($query)
    {
        return $query->where('status', 'scheduled')
            ->where('match_date', '>=', now())
            ->orderBy('match_date');
    }

    public function scopeFinished($query)
    {
        return $query->where('status', 'finished')
            ->orderByDesc('match_date');
    }

    public function scopeForSeason($query, int $seasonId)
    {
        return $query->where('season_id', $seasonId);
    }
}
