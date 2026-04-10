import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import articles from '../../assets/article-content.js';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((entry) => entry.name === name || entry.slug === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-0">
        <section className="border-b border-zinc-900 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl rounded-3xl border border-zinc-700 bg-zinc-100 p-8">
              <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
              <div className="mt-6">
                <Button to="/articles">Back to Articles</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-0">
      <section className="border-b border-zinc-900 bg-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Article
            </p>
            <h1 className="text-4xl font-bold leading-tight text-zinc-900">{article.title}</h1>
            <p className="mt-1 text-[10px] text-zinc-500">{article.category}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto h-[230px] w-full max-w-[520px] overflow-hidden rounded-[1.25rem] border-2 border-zinc-700 bg-zinc-200 sm:h-[330px]">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mx-auto mt-4 w-full max-w-[520px] space-y-3 text-zinc-700">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-[11px] leading-5 text-zinc-700 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
