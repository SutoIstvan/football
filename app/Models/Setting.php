<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'group',
        'key',
        'value',
        'type',
    ];

    public static function get(string $key, mixed $default = null): mixed
    {
        $parts = explode('.', $key);
        $group = $parts[0] ?? 'general';
        $settingKey = $parts[1] ?? $key;

        return Cache::rememberForever("settings.{$group}.{$settingKey}", function () use ($group, $settingKey, $default) {
            $setting = static::where('group', $group)->where('key', $settingKey)->first();

            if (! $setting) {
                return $default;
            }

            return match ($setting->type) {
                'boolean' => (bool) $setting->value,
                'json' => json_decode($setting->value, true),
                default => $setting->value,
            };
        });
    }

    public static function set(string $key, mixed $value, string $type = 'text'): void
    {
        $parts = explode('.', $key);
        $group = $parts[0] ?? 'general';
        $settingKey = $parts[1] ?? $key;

        if (is_array($value)) {
            $value = json_encode($value);
            $type = 'json';
        }

        if (is_bool($value)) {
            $value = $value ? '1' : '0';
            $type = 'boolean';
        }

        static::updateOrCreate(
            ['group' => $group, 'key' => $settingKey],
            ['value' => $value, 'type' => $type],
        );

        Cache::forget("settings.{$group}.{$settingKey}");
    }
}
