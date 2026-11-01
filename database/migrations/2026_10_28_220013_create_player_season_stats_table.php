<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('player_season_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();
            $table->foreignId('season_id')->constrained()->cascadeOnDelete();
            $table->foreignId('competition_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('appearances')->default(0);
            $table->unsignedSmallInteger('starts')->default(0);
            $table->unsignedInteger('minutes_played')->default(0);
            $table->unsignedSmallInteger('goals')->default(0);
            $table->unsignedSmallInteger('assists')->default(0);
            $table->unsignedSmallInteger('yellow_cards')->default(0);
            $table->unsignedSmallInteger('red_cards')->default(0);
            $table->unsignedSmallInteger('clean_sheets')->default(0);
            $table->timestamps();

            $table->unique(['player_id', 'season_id', 'competition_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_season_stats');
    }
};
