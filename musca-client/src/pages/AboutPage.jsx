import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-0">
      <section className="border-b border-zinc-900 bg-[#efefef] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1400px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Our Studio
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
              We combine strategic writing, visual craft, and practical frontend systems.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              Our process starts with understanding your audience and ends with pages that feel
              polished and usable. We do not separate design from content: structure, images, and
              language are shaped together so every section feels intentional.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>

          <figure className="overflow-hidden rounded-3xl border border-zinc-300 bg-zinc-100 shadow-[0_20px_50px_rgba(24,24,27,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
              alt="Creative team discussing website concepts"
              className="h-[280px] w-full object-cover sm:h-[360px]"
            />
          </figure>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-[#efefef] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 w-full max-w-[1400px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Snapshot
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900 sm:text-3xl">A quick profile of how we work</h2>
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-3">
            <p className="text-2xl font-bold text-zinc-900">6+</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Years In Web
            </p>
          </article>
          <article className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-3">
            <p className="text-2xl font-bold text-zinc-900">120</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Content Pieces
            </p>
          </article>
          <article className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-3">
            <p className="text-2xl font-bold text-zinc-900">34</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Product Sprints
            </p>
          </article>
          <article className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-3">
            <p className="text-2xl font-bold text-zinc-900">4.9/5</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Client Rating
            </p>
          </article>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-[#efefef] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1400px] gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <article className="rounded-2xl border border-zinc-700 bg-zinc-100 p-5">
              <h3 className="text-lg font-semibold text-zinc-900">Our Mission</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">
                We help teams explain complex products in simple, memorable ways. That means clean
                structure, fewer distractions, and copy that sounds human while staying precise.
              </p>
            </article>
            <article className="rounded-2xl border border-zinc-700 bg-zinc-100 p-5">
              <h3 className="text-lg font-semibold text-zinc-900">Our Process</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">
                Discovery and positioning come first. We then draft content outlines, design the
                visual rhythm, and prototype sections quickly so decisions are made with clarity.
              </p>
            </article>
            <article className="rounded-2xl border border-zinc-700 bg-zinc-100 p-5">
              <h3 className="text-lg font-semibold text-zinc-900">Our Promise</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">
                You get pages that look professional and perform in real use. We optimize for
                readability, scannability, and action, not decorative noise.
              </p>
            </article>
          </div>

          <aside className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"
              alt="Workshop session with collaborative planning"
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Team Culture
              </p>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                We run compact teams that collaborate tightly with founders, marketers, and product
                managers. Every sprint ends with something visible and measurable.
              </p>
              <Button className="mt-5">Start a Project</Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
