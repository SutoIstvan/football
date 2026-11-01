<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('season_id')->constrained()->cascadeOnDelete();
            $table->foreignId('competition_id')->constrained()->cascadeOnDelete();
            $table->string('round', 50)->nullable();
            $table->dateTime('match_date');
            $table->string('venue', 200)->nullable();
            $table->boolean('is_home')->default(true);
            $table->string('opponent_name', 200);
            $table->string('opponent_logo')->nullable();
            $table->unsignedTinyInteger('home_score')->nullable();
            $table->unsignedTinyInteger('away_score')->nullable();
            $table->string('status')->default('scheduled'); // scheduled, live, finished, postponed, cancelled
            $table->unsignedInteger('attendance')->nullable();
            $table->string('referee', 100)->nullable();
            $table->text('summary')->nullable();
            $table->json('lineup')->nullable();
            $table->foreignId('article_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();

            $table->index(['season_id', 'competition_id']);
            $table->index(['status', 'match_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
