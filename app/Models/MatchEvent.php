<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MatchEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'match_id',
        'player_id',
        'type',
        'minute',
        'extra_minute',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'minute' => 'integer',
            'extra_minute' => 'integer',
        ];
    }

    public function match(): BelongsTo
    {
        return $this->belongsTo(Match_::class, 'match_id');
    }

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function getTimeDisplayAttribute(): string
    {
        if ($this->extra_minute) {
            return "{$this->minute}+{$this->extra_minute}'";
        }

        return "{$this->minute}'";
    }
}
