<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlayerSeasonStat extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_id',
        'season_id',
        'competition_id',
        'appearances',
        'starts',
        'minutes_played',
        'goals',
        'assists',
        'yellow_cards',
        'red_cards',
        'clean_sheets',
    ];

    protected function casts(): array
    {
        return [
            'appearances' => 'integer',
            'starts' => 'integer',
            'minutes_played' => 'integer',
            'goals' => 'integer',
            'assists' => 'integer',
            'yellow_cards' => 'integer',
            'red_cards' => 'integer',
            'clean_sheets' => 'integer',
        ];
    }

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function competition(): BelongsTo
    {
        return $this->belongsTo(Competition::class);
    }
}
