import defaultArticles from './article-content';

const STORAGE_KEY = 'musca-dashboard-articles';

const slugify = (value) => String(value ?? '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const normalizeArticle = (article, index = 0) => {
  const title = String(article.title ?? '').trim() || `Untitled Article ${index + 1}`;
  const slug = slugify(article.slug ?? article.name ?? title) || `article-${index + 1}`;
  const content = Array.isArray(article.content)
    ? article.content.map((part) => String(part)).filter(Boolean)
    : [String(article.content ?? article.excerpt ?? '').trim()].filter(Boolean);

  return {
    name: slug,
    slug,
    title,
    image: article.image ?? defaultArticles[0]?.image,
    category: String(article.category ?? 'General').trim(),
    excerpt: String(article.excerpt ?? '').trim(),
    readTime: String(article.readTime ?? '5 min read').trim(),
    content: content.length ? content : ['Content coming soon.'],
  };
};

export const getDashboardArticles = () => {
  if (typeof window === 'undefined') {
    return defaultArticles.map((article, index) => normalizeArticle(article, index));
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultArticles.map((article, index) => normalizeArticle(article, index));
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return defaultArticles.map((article, index) => normalizeArticle(article, index));
    }
    return parsed.map((article, index) => normalizeArticle(article, index));
  } catch {
    return defaultArticles.map((article, index) => normalizeArticle(article, index));
  }
};

export const saveDashboardArticles = (articles) => {
  if (typeof window === 'undefined') return;
  const normalized = Array.isArray(articles)
    ? articles.map((article, index) => normalizeArticle(article, index))
    : defaultArticles.map((article, index) => normalizeArticle(article, index));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
};

export const toArticleSlug = (value) => slugify(value);
