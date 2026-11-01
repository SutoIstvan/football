<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(Request $request): Response
    {
        $categorySlug = $request->query('category');
        $tagSlug = $request->query('tag');
        $search = $request->query('q');

        $query = Article::query()
            ->with(['category', 'author:id,name', 'tags'])
            ->published()
            ->latest('published_at');

        if ($categorySlug) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
        }

        if ($tagSlug) {
            $query->whereHas('tags', fn ($q) => $q->where('slug', $tagSlug));
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $articles = $query->paginate(9)->withQueryString();

        $categories = ArticleCategory::query()
            ->active()
            ->ordered()
            ->withCount(['articles' => fn ($q) => $q->published()])
            ->get();

        $tags = Tag::query()
            ->withCount(['articles' => fn ($q) => $q->published()])
            ->orderByDesc('articles_count')
            ->take(12)
            ->get();

        return Inertia::render('news/index', [
            'articles' => $articles,
            'categories' => $categories,
            'tags' => $tags,
            'currentCategory' => $categorySlug,
            'currentTag' => $tagSlug,
            'search' => $search,
        ]);
    }

    public function show(string $slug): Response
    {
        $article = Article::query()
            ->with(['category', 'author:id,name', 'tags'])
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        $article->incrementViews();

        $relatedArticles = Article::query()
            ->with(['category'])
            ->published()
            ->where('id', '!=', $article->id)
            ->where('category_id', $article->category_id)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('news/show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}

