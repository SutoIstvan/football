<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Competition;
use App\Models\Gallery;
use App\Models\GalleryItem;
use App\Models\Match_;
use App\Models\MatchEvent;
use App\Models\MenuItem;
use App\Models\Page;
use App\Models\Player;
use App\Models\Season;
use App\Models\Setting;
use App\Models\Sponsor;
use App\Models\Staff;
use App\Models\Standing;
use App\Models\Tag;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@paksifc.hu'],
            [
                'name' => 'Paksi FC Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Categories
        $categories = [
            ['name' => 'Mérkőzés beszámoló', 'slug' => 'merkozes-beszamolo', 'description' => 'Mérkőzések összefoglalói, értékelések', 'color' => '#006B3F', 'sort_order' => 1],
            ['name' => 'Átigazolás', 'slug' => 'atigazolas', 'description' => 'Játékosmozgások, szerződéshosszabbítások', 'color' => '#C5A645', 'sort_order' => 2],
            ['name' => 'Klub hírek', 'slug' => 'klub-hirek', 'description' => 'Hivatalos klubhírek és közlemények', 'color' => '#1A1A2E', 'sort_order' => 3],
            ['name' => 'Utánpótlás', 'slug' => 'utanpotlas', 'description' => 'Akadémia és korosztályos csapatok hírei', 'color' => '#2E7D32', 'sort_order' => 4],
            ['name' => 'Sajtó', 'slug' => 'sajto', 'description' => 'Sajtótájékoztatók, interjúk', 'color' => '#0288D1', 'sort_order' => 5],
        ];
        foreach ($categories as $cat) {
            ArticleCategory::firstOrCreate(['slug' => $cat['slug']], $cat);
        }

        // 3. Tags
        $tags = ['NB I', 'Paksi FC', 'Magyar Kupa', 'Böde Dániel', 'Bognár György', 'Konferencia Liga', 'Győzelem', 'Fehérvári úti Stadion'];
        foreach ($tags as $tag) {
            Tag::firstOrCreate(['name' => $tag], ['slug' => Str::slug($tag)]);
        }

        // 4. Seasons
        $season = Season::firstOrCreate(
            ['name' => '2025/2026'],
            [
                'start_date' => '2025-07-20',
                'end_date' => '2026-05-30',
                'is_current' => true,
            ]
        );

        // 5. Competitions
        $nbi = Competition::firstOrCreate(
            ['slug' => 'nb-i'],
            ['name' => 'OTP Bank Liga (NB I)', 'short_name' => 'NB I', 'sort_order' => 1]
        );
        $mk = Competition::firstOrCreate(
            ['slug' => 'magyar-kupa'],
            ['name' => 'MOL Magyar Kupa', 'short_name' => 'MK', 'sort_order' => 2]
        );
        $uefa = Competition::firstOrCreate(
            ['slug' => 'uefa-konferencia-liga'],
            ['name' => 'UEFA Konferencia Liga', 'short_name' => 'ECL', 'sort_order' => 3]
        );

        // 6. Teams
        $firstTeam = Team::firstOrCreate(
            ['slug' => 'elso-csapat'],
            ['name' => 'Első csapat (NB I)', 'description' => 'A Paksi FC felnőtt első csapata az élvonalban', 'sort_order' => 1, 'is_active' => true]
        );
        $nb3Team = Team::firstOrCreate(
            ['slug' => 'paksi-fc-ii'],
            ['name' => 'Paksi FC II (NB III)', 'description' => 'Tartalékcsapat a harmadosztályban', 'sort_order' => 2, 'is_active' => true]
        );
        $u19Team = Team::firstOrCreate(
            ['slug' => 'utanpotlas-u19'],
            ['name' => 'Utánpótlás U19', 'description' => 'U19-es korosztályos csapat', 'sort_order' => 3, 'is_active' => true]
        );

        // 7. Players (Paksi FC First Team)
        $players = [
            ['first_name' => 'Barnabás', 'last_name' => 'Simon', 'number' => 1, 'pos' => 'goalkeeper', 'dob' => '2004-03-05', 'height' => 192, 'weight' => 84, 'foot' => 'right'],
            ['first_name' => 'Ádám', 'last_name' => 'Kovácsik', 'number' => 25, 'pos' => 'goalkeeper', 'dob' => '1991-04-04', 'height' => 194, 'weight' => 88, 'foot' => 'right'],
            ['first_name' => 'Ákos', 'last_name' => 'Kinyik', 'number' => 2, 'pos' => 'defender', 'dob' => '1993-05-12', 'height' => 189, 'weight' => 82, 'foot' => 'right'],
            ['first_name' => 'Bence', 'last_name' => 'Lenzsér', 'number' => 24, 'pos' => 'defender', 'dob' => '1996-04-09', 'height' => 185, 'weight' => 78, 'foot' => 'right'],
            ['first_name' => 'János', 'last_name' => 'Szabó', 'number' => 30, 'pos' => 'defender', 'dob' => '1989-07-11', 'height' => 183, 'weight' => 76, 'foot' => 'left'],
            ['first_name' => 'Attila', 'last_name' => 'Osváth', 'number' => 11, 'pos' => 'defender', 'dob' => '1995-12-10', 'height' => 176, 'weight' => 72, 'foot' => 'right'],
            ['first_name' => 'Bence', 'last_name' => 'Ötvös', 'number' => 22, 'pos' => 'defender', 'dob' => '1998-03-13', 'height' => 187, 'weight' => 80, 'foot' => 'right'],
            ['first_name' => 'József', 'last_name' => 'Windecker', 'number' => 8, 'pos' => 'midfielder', 'dob' => '1992-12-02', 'height' => 184, 'weight' => 79, 'foot' => 'right'],
            ['first_name' => 'Kristóf', 'last_name' => 'Papp', 'number' => 5, 'pos' => 'midfielder', 'dob' => '1993-05-14', 'height' => 185, 'weight' => 78, 'foot' => 'right'],
            ['first_name' => 'Balázs', 'last_name' => 'Balogh', 'number' => 14, 'pos' => 'midfielder', 'dob' => '1990-06-11', 'height' => 178, 'weight' => 73, 'foot' => 'both'],
            ['first_name' => 'Bálint', 'last_name' => 'Vécsei', 'number' => 21, 'pos' => 'midfielder', 'dob' => '1993-07-13', 'height' => 186, 'weight' => 81, 'foot' => 'left'],
            ['first_name' => 'Szabolcs', 'last_name' => 'Mezei', 'number' => 18, 'pos' => 'midfielder', 'dob' => '2000-10-18', 'height' => 172, 'weight' => 67, 'foot' => 'left'],
            ['first_name' => 'Dániel', 'last_name' => 'Böde', 'number' => 13, 'pos' => 'forward', 'dob' => '1986-10-24', 'height' => 190, 'weight' => 96, 'foot' => 'right'],
            ['first_name' => 'János', 'last_name' => 'Hahn', 'number' => 9, 'pos' => 'forward', 'dob' => '1995-03-15', 'height' => 183, 'weight' => 77, 'foot' => 'right'],
            ['first_name' => 'Zsolt', 'last_name' => 'Haraszti', 'number' => 10, 'pos' => 'forward', 'dob' => '1991-11-04', 'height' => 177, 'weight' => 72, 'foot' => 'left'],
            ['first_name' => 'Norbert', 'last_name' => 'Könyves', 'number' => 7, 'pos' => 'forward', 'dob' => '1989-06-10', 'height' => 186, 'weight' => 80, 'foot' => 'right'],
        ];

        $i = 1;
        foreach ($players as $p) {
            Player::firstOrCreate(
                ['slug' => Str::slug("{$p['last_name']}-{$p['first_name']}")],
                [
                    'first_name' => $p['first_name'],
                    'last_name' => $p['last_name'],
                    'squad_number' => $p['number'],
                    'position' => $p['pos'],
                    'date_of_birth' => $p['dob'],
                    'nationality' => 'Magyar',
                    'height' => $p['height'],
                    'weight' => $p['weight'],
                    'preferred_foot' => $p['foot'],
                    'team_id' => $firstTeam->id,
                    'is_active' => true,
                    'sort_order' => $i++,
                ]
            );
        }

        // 8. Staff
        $staffMembers = [
            ['first_name' => 'György', 'last_name' => 'Bognár', 'role' => 'Vezetőedző (Head Coach)', 'sort' => 1],
            ['first_name' => 'Tamás', 'last_name' => 'Kiss', 'role' => 'Pályaedző (Assistant Coach)', 'sort' => 2],
            ['first_name' => 'Norbert', 'last_name' => 'Csernyánszki', 'role' => 'Kapusedző (Goalkeeping Coach)', 'sort' => 3],
            ['first_name' => 'Gábor', 'last_name' => 'Kovács', 'role' => 'Erőnléti edző (Fitness Coach)', 'sort' => 4],
            ['first_name' => 'Dr. Zoltán', 'last_name' => 'Varga', 'role' => 'Csapatorvos (Team Doctor)', 'sort' => 5],
        ];
        foreach ($staffMembers as $s) {
            Staff::firstOrCreate(
                ['slug' => Str::slug("{$s['last_name']}-{$s['first_name']}")],
                [
                    'first_name' => $s['first_name'],
                    'last_name' => $s['last_name'],
                    'role' => $s['role'],
                    'team_id' => $firstTeam->id,
                    'sort_order' => $s['sort'],
                    'is_active' => true,
                ]
            );
        }

        // 9. Sample Articles
        $matchCat = ArticleCategory::where('slug', 'merkozes-beszamolo')->first();
        $clubCat = ArticleCategory::where('slug', 'klub-hirek')->first();

        Article::firstOrCreate(
            ['slug' => 'magabiztos-gyozelem-a-fehervari-uti-stadionban'],
            [
                'title' => 'Magabiztos győzelem a Fehérvári úti Stadionban',
                'excerpt' => 'Csapatunk kiváló játékkal, Böde Dániel és Windecker József góljaival 2-0-s győzelmet aratott a hétvégi bajnoki fordulóban.',
                'content' => '<p>Fantasztikus hangulatban, telt ház előtt fogadtuk ellenfelünket a Fehérvári úti Stadionban. Csapatunk az első perctől kezdve magához ragadta a kezdeményezést, és a fegyelmezett védekezés mellett veszélyes támadásokat vezetett.</p><p>A 28. percben Windecker József remek fejessel szerezte meg a vezetést, majd a második félidőben a csereként beálló közönségkedvenc, Böde Dániel állította be a 2-0-s végeredményt.</p><p><strong>Bognár György vezetőedző értékelése:</strong> <em>"Megérdemelt győzelmet arattunk. A játékosok pontosan betartották a megbeszélt taktikát. Köszönjük szurkolóinknak a fantasztikus buzdítást!"</em></p>',
                'category_id' => $matchCat->id,
                'author_id' => $admin->id,
                'status' => 'published',
                'is_featured' => true,
                'is_pinned' => true,
                'published_at' => now()->subDays(1),
                'views_count' => 1420,
            ]
        );

        Article::firstOrCreate(
            ['slug' => 'bode-daniel-ujabb-merfoldkohoz-erkezett'],
            [
                'title' => 'Böde Dániel újabb mérföldkőhöz érkezett a zöld-fehér mezben',
                'excerpt' => 'A klub ikonikus támadója újabb emlékezetes gólt szerzett a Paksi FC színeiben.',
                'content' => '<p>Böde Dániel ismét bebizonyította, hogy a paksi futball élő legendája. A rutinos támadó legutóbbi fellépésével újabb fejezetet írt a klub történetébe.</p><p>A mérkőzést követően így nyilatkozott: <em>"Mindig megtiszteltetés ezt a mezt viselni. Csak az számít, hogy a csapat nyerjen, és a paksi emberek büszkék lehessenek ránk."</em></p>',
                'category_id' => $clubCat->id,
                'author_id' => $admin->id,
                'status' => 'published',
                'is_featured' => true,
                'is_pinned' => false,
                'published_at' => now()->subDays(3),
                'views_count' => 890,
            ]
        );

        // 10. Matches
        $lastMatch = Match_::firstOrCreate(
            ['match_date' => '2026-10-24 17:00:00', 'opponent_name' => 'Újpest FC'],
            [
                'season_id' => $season->id,
                'competition_id' => $nbi->id,
                'round' => '11. forduló',
                'venue' => 'Fehérvári úti Stadion, Paks',
                'is_home' => true,
                'opponent_name' => 'Újpest FC',
                'home_score' => 2,
                'away_score' => 0,
                'status' => 'finished',
                'attendance' => 3800,
                'referee' => 'Karakó Ferenc',
                'summary' => 'Magabiztos hazai győzelem a zöld-fehéreknél.',
            ]
        );

        MatchEvent::firstOrCreate(
            ['match_id' => $lastMatch->id, 'minute' => 28, 'type' => 'goal'],
            ['description' => 'GÓL! Windecker József fejesgólja (1-0)']
        );
        MatchEvent::firstOrCreate(
            ['match_id' => $lastMatch->id, 'minute' => 74, 'type' => 'goal'],
            ['description' => 'GÓL! Böde Dániel közelről a kapuba lő (2-0)']
        );

        $nextMatch = Match_::firstOrCreate(
            ['match_date' => '2026-11-01 15:30:00', 'opponent_name' => 'Ferencvárosi TC'],
            [
                'season_id' => $season->id,
                'competition_id' => $nbi->id,
                'round' => '12. forduló',
                'venue' => 'Groupama Aréna, Budapest',
                'is_home' => false,
                'opponent_name' => 'Ferencvárosi TC',
                'status' => 'scheduled',
            ]
        );

        // 11. Standings (NB I)
        $teamsStandings = [
            ['pos' => 1, 'team' => 'Ferencvárosi TC', 'p' => 11, 'w' => 8, 'd' => 2, 'l' => 1, 'gf' => 24, 'ga' => 8, 'pts' => 26, 'own' => false],
            ['pos' => 2, 'team' => 'Paksi FC', 'p' => 11, 'w' => 7, 'd' => 2, 'l' => 2, 'gf' => 22, 'ga' => 12, 'pts' => 23, 'own' => true],
            ['pos' => 3, 'team' => 'Puskás Akadémia FC', 'p' => 11, 'w' => 7, 'd' => 1, 'l' => 3, 'gf' => 19, 'ga' => 11, 'pts' => 22, 'own' => false],
            ['pos' => 4, 'team' => 'MTK Budapest', 'p' => 11, 'w' => 6, 'd' => 2, 'l' => 3, 'gf' => 18, 'ga' => 14, 'pts' => 20, 'own' => false],
            ['pos' => 5, 'team' => 'Fehérvár FC', 'p' => 11, 'w' => 5, 'd' => 2, 'l' => 4, 'gf' => 16, 'ga' => 15, 'pts' => 17, 'own' => false],
            ['pos' => 6, 'team' => 'Diósgyőri VTK', 'p' => 11, 'w' => 4, 'd' => 3, 'l' => 4, 'gf' => 15, 'ga' => 16, 'pts' => 15, 'own' => false],
            ['pos' => 7, 'team' => 'Újpest FC', 'p' => 11, 'w' => 4, 'd' => 2, 'l' => 5, 'gf' => 14, 'ga' => 17, 'pts' => 14, 'own' => false],
            ['pos' => 8, 'team' => 'Zalaegerszegi TE', 'p' => 11, 'w' => 3, 'd' => 3, 'l' => 5, 'gf' => 12, 'ga' => 16, 'pts' => 12, 'own' => false],
            ['pos' => 9, 'team' => 'Nyíregyháza Spartacus', 'p' => 11, 'w' => 3, 'd' => 2, 'l' => 6, 'gf' => 11, 'ga' => 18, 'pts' => 11, 'own' => false],
            ['pos' => 10, 'team' => 'ETO FC Győr', 'p' => 11, 'w' => 2, 'd' => 4, 'l' => 5, 'gf' => 10, 'ga' => 17, 'pts' => 10, 'own' => false],
            ['pos' => 11, 'team' => 'Debreceni VSC', 'p' => 11, 'w' => 2, 'd' => 3, 'l' => 6, 'gf' => 13, 'ga' => 20, 'pts' => 9, 'own' => false],
            ['pos' => 12, 'team' => 'Kecskeméti TE', 'p' => 11, 'w' => 1, 'd' => 2, 'l' => 8, 'gf' => 7, 'ga' => 22, 'pts' => 5, 'own' => false],
        ];

        foreach ($teamsStandings as $ts) {
            Standing::firstOrCreate(
                ['season_id' => $season->id, 'competition_id' => $nbi->id, 'position' => $ts['pos']],
                [
                    'team_name' => $ts['team'],
                    'played' => $ts['p'],
                    'won' => $ts['w'],
                    'drawn' => $ts['d'],
                    'lost' => $ts['l'],
                    'goals_for' => $ts['gf'],
                    'goals_against' => $ts['ga'],
                    'goal_difference' => $ts['gf'] - $ts['ga'],
                    'points' => $ts['pts'],
                    'is_own_team' => $ts['own'],
                ]
            );
        }

        // 12. Static Pages
        Page::firstOrCreate(
            ['slug' => 'stadion'],
            [
                'title' => 'Fehérvári úti Stadion',
                'template' => 'stadium',
                'is_published' => true,
                'content' => '<h2>Fehérvári úti Stadion</h2><p>A Paksi FC otthona a modernizált Fehérvári úti Stadion. A létesítmény 6 150 néző befogadására alkalmas, fedett lelátókkal és modern kiszolgáló helyiségekkel rendelkezik.</p><h3>Fontos adatok:</h3><ul><li><strong>Cím:</strong> 7030 Paks, Fehérvári út 29.</li><li><strong>Befogadóképesség:</strong> 6 150 ülőhely</li><li><strong>Világítás:</strong> 1 400 lux</li><li><strong>Fűfajta:</strong> Hibrid gyepszőnyeg automata öntözőrendszerrel és pályafűtéssel</li></ul>',
                'sort_order' => 1,
            ]
        );

        Page::firstOrCreate(
            ['slug' => 'tortenet'],
            [
                'title' => 'Klubtörténet',
                'template' => 'history',
                'is_published' => true,
                'content' => '<h2>A Paksi FC Története</h2><p>A Paksi Sportegyesület labdarúgó szakosztálya 1952-ben alakult meg. A zöld-fehér klub történetének legnagyobb sikereit a 2000-es évektől érte el.</p><p>2006-ban jutott fel először a magyar élvonalba (NB I), és azóta megszakítás nélkül az első osztály tagja! A klub büszke arra az egyedülálló filozófiájára, hogy kizárólag magyar labdarúgókat foglalkoztat.</p><h3>Főbb sikereink:</h3><ul><li>Magyar Kupa győztes (2024)</li><li>NB I bajnoki ezüstérmes (2010/11, 2023/24)</li><li>Ligakupa győztes (2011)</li><li>Nemzetközi kupaszereplések (Európa Liga, Konferencia Liga)</li></ul>',
                'sort_order' => 2,
            ]
        );

        Page::firstOrCreate(
            ['slug' => 'kapcsolat'],
            [
                'title' => 'Kapcsolat',
                'template' => 'contact',
                'is_published' => true,
                'content' => '<h2>Lépjen kapcsolatba velünk!</h2><p><strong>Paksi FC Kft.</strong></p><p><strong>Cím:</strong> 7030 Paks, Fehérvári út 29.</p><p><strong>Telefon:</strong> +36 75 830 800</p><p><strong>E-mail:</strong> info@paksifc.hu</p><p><strong>Sajtókapcsolat:</strong> sajto@paksifc.hu</p>',
                'sort_order' => 3,
            ]
        );

        // 13. Sponsors
        $sponsors = [
            ['name' => 'MVM Paksi Atomerőmű', 'logo' => '/images/sponsors/mvm.png', 'website_url' => 'https://atomeromu.mvm.hu', 'tier' => 'main', 'sort_order' => 1],
            ['name' => 'Tippmix (Szerencsejáték Zrt.)', 'logo' => '/images/sponsors/tippmix.png', 'website_url' => 'https://tippmix.hu', 'tier' => 'gold', 'sort_order' => 2],
            ['name' => 'OTP Bank', 'logo' => '/images/sponsors/otp.png', 'website_url' => 'https://otpbank.hu', 'tier' => 'gold', 'sort_order' => 3],
            ['name' => 'Paks Város Önkormányzata', 'logo' => '/images/sponsors/paks.png', 'website_url' => 'https://paks.hu', 'tier' => 'silver', 'sort_order' => 4],
            ['name' => '2Rule Sportruházat', 'logo' => '/images/sponsors/2rule.png', 'website_url' => 'https://2rule.hu', 'tier' => 'partner', 'sort_order' => 5],
        ];
        foreach ($sponsors as $sp) {
            Sponsor::firstOrCreate(['name' => $sp['name']], $sp);
        }

        // 14. Menu Items
        $menuItems = [
            ['title' => 'Főoldal', 'route_name' => 'home', 'location' => 'header', 'sort_order' => 1],
            ['title' => 'Hírek', 'route_name' => 'articles.index', 'location' => 'header', 'sort_order' => 2],
            ['title' => 'Csapat', 'route_name' => 'team.index', 'location' => 'header', 'sort_order' => 3],
            ['title' => 'Mérkőzések', 'route_name' => 'matches.index', 'location' => 'header', 'sort_order' => 4],
            ['title' => 'Tabella', 'route_name' => 'standings.index', 'location' => 'header', 'sort_order' => 5],
            ['title' => 'Média', 'route_name' => 'galleries.index', 'location' => 'header', 'sort_order' => 6],
            ['title' => 'Klub', 'url' => '/tortenet', 'location' => 'header', 'sort_order' => 7],
            ['title' => 'Stadion', 'url' => '/stadion', 'location' => 'header', 'sort_order' => 8],
            ['title' => 'Kapcsolat', 'url' => '/kapcsolat', 'location' => 'header', 'sort_order' => 9],
        ];
        foreach ($menuItems as $mi) {
            MenuItem::firstOrCreate(['title' => $mi['title'], 'location' => $mi['location']], $mi);
        }

        // 15. Settings
        $settings = [
            ['group' => 'general', 'key' => 'site_name', 'value' => 'Paksi FC', 'type' => 'text'],
            ['group' => 'general', 'key' => 'tagline', 'value' => 'A magyar csapat', 'type' => 'text'],
            ['group' => 'general', 'key' => 'founded_year', 'value' => '1952', 'type' => 'text'],
            ['group' => 'contact', 'key' => 'address', 'value' => '7030 Paks, Fehérvári út 29.', 'type' => 'text'],
            ['group' => 'contact', 'key' => 'phone', 'value' => '+36 75 830 800', 'type' => 'text'],
            ['group' => 'contact', 'key' => 'email', 'value' => 'info@paksifc.hu', 'type' => 'text'],
            ['group' => 'social', 'key' => 'facebook', 'value' => 'https://facebook.com/paksifc', 'type' => 'text'],
            ['group' => 'social', 'key' => 'instagram', 'value' => 'https://instagram.com/paksifc_official', 'type' => 'text'],
            ['group' => 'social', 'key' => 'youtube', 'value' => 'https://youtube.com/@paksifc', 'type' => 'text'],
            ['group' => 'social', 'key' => 'tiktok', 'value' => 'https://tiktok.com/@paksifc', 'type' => 'text'],
        ];
        foreach ($settings as $st) {
            Setting::firstOrCreate(['group' => $st['group'], 'key' => $st['key']], $st);
        }
    }
}
