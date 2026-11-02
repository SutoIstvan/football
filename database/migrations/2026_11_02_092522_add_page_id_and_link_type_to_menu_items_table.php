<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('menu_items', function (Blueprint $table) {
            $table->string('link_type', 20)->default('url')->after('title');
            $table->foreignId('page_id')->nullable()->after('route_name')->constrained('pages')->nullOnDelete();
        });

        // Migrate existing records
        $pages = DB::table('pages')->get()->keyBy('slug');
        $items = DB::table('menu_items')->get();

        foreach ($items as $item) {
            $linkType = 'url';
            $pageId = null;

            if (!empty($item->route_name)) {
                $linkType = 'route';
            } elseif (!empty($item->url)) {
                $trimmedUrl = ltrim($item->url, '/');
                if (isset($pages[$trimmedUrl])) {
                    $linkType = 'page';
                    $pageId = $pages[$trimmedUrl]->id;
                } else {
                    $linkType = 'url';
                }
            } else {
                $linkType = 'none';
            }

            DB::table('menu_items')
                ->where('id', $item->id)
                ->update([
                    'link_type' => $linkType,
                    'page_id' => $pageId,
                ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('menu_items', function (Blueprint $table) {
            $table->dropForeign(['page_id']);
            $table->dropColumn(['link_type', 'page_id']);
        });
    }
};
