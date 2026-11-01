<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('match_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('match_id')->constrained()->cascadeOnDelete();
            $table->foreignId('player_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type'); // goal, own_goal, yellow_card, red_card, substitution_in, substitution_out, penalty_scored, penalty_missed
            $table->unsignedTinyInteger('minute');
            $table->unsignedTinyInteger('extra_minute')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();

            $table->index('match_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_events');
    }
};
