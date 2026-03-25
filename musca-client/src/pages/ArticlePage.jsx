import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-0">
      <section className="border-b border-zinc-900 bg-[#efefef] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1400px] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Editorial Journal
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
              Insights on design systems, content strategy, and frontend craft.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              Browse practical writeups from our team, including layout critiques, copy techniques,
              and implementation notes that help teams ship more thoughtful digital experiences.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/about">Meet the Team</Button>
            </div>
          </div>

          <article className="overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80"
              alt="Notebook and laptop with article planning notes"
              className="h-[280px] w-full object-cover sm:h-[340px]"
            />
            <div className="p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Featured Story
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-900">How to design pages people actually read</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                A practical guide to hierarchy, rhythm, and message clarity, with examples from
                real product pages and campaign launches.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-[#efefef] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 w-full max-w-[1400px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Latest Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900 sm:text-3xl">Fresh reads from the studio</h2>
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <article className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80"
              alt="Website wireframes on a desktop monitor"
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Product Design</p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">Wireframe to polished interface in five passes</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Learn a lightweight iteration model that keeps teams aligned while steadily raising
                visual quality and interaction clarity.
              </p>
              <Button className="mt-4">Read More</Button>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=900&q=80"
              alt="Handwriting notes during content planning"
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Content Strategy</p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">Writing web copy that scans in under ten seconds</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Use section hooks, narrative cadence, and contrast in sentence length to keep your
                message readable on both desktop and mobile.
              </p>
              <Button className="mt-4">Read More</Button>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
              alt="Analytics dashboard on laptop"
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Performance</p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">Design decisions that improve conversion signals</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                A field guide to hierarchy, CTA emphasis, and layout spacing choices that improve
                user confidence and reduce drop-off.
              </p>
              <Button className="mt-4">Read More</Button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
