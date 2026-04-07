import Button from '../components/Button';
import ArticleList from '../components/ArticleList';
import articleContent from '../assets/article-content';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-0">
      <section className="border-b border-zinc-900 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto w-full max-w-[1400px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Articles</p>
          <h1 className="mt-2 max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            Featured articles in a simple card grid
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
            A clean wireframe section for article thumbnails, titles, short descriptions, and one
            clear action per card.
          </p>
          <div className="mt-6">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Featured Articles
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Article card grid</h2>
          </div>

          <ArticleList articles={articleContent} />
        </div>
      </section>
    </div>
  );
};

export default ArticleListPage;