<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('slug', 200)->unique();
            $table->unsignedTinyInteger('squad_number')->nullable();
            $table->string('position'); // goalkeeper, defender, midfielder, forward
            $table->date('date_of_birth')->nullable();
            $table->string('nationality', 100)->default('Magyar');
            $table->unsignedSmallInteger('height')->nullable();
            $table->unsignedSmallInteger('weight')->nullable();
            $table->string('preferred_foot')->nullable(); // left, right, both
            $table->string('photo')->nullable();
            $table->text('biography')->nullable();
            $table->date('joined_at')->nullable();
            $table->date('contract_until')->nullable();
            $table->json('previous_clubs')->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['team_id', 'position']);
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
