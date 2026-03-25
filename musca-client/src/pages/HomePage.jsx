import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-0">
      <section className="border-b border-zinc-900 bg-[#efefef] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1400px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Creative Web Studio
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
              Design pages that feel clear, editorial, and conversion-ready.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              We build modern page systems where layout, copy, and imagery work together. Every
              section has a purpose, every interaction stays lightweight, and every page tells a
              cohesive story from headline to call-to-action.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
              <Button to="/articles">Read Insights</Button>
            </div>
          </div>

          <figure className="overflow-hidden rounded-3xl border border-zinc-300 bg-zinc-100 shadow-[0_20px_50px_rgba(24,24,27,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80"
              alt="Desk setup with laptop and planning boards"
              className="h-[280px] w-full object-cover sm:h-[360px]"
            />
          </figure>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-[#efefef] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-5 w-full max-w-[1400px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Studio Metrics
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900 sm:text-3xl">The momentum behind our work</h2>
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-3">
            <p className="text-2xl font-bold text-zinc-900">48</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Launches Delivered
            </p>
          </article>
          <article className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-3">
            <p className="text-2xl font-bold text-zinc-900">17</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Active Brands
            </p>
          </article>
          <article className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-3">
            <p className="text-2xl font-bold text-zinc-900">92%</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Repeat Partnerships
            </p>
          </article>
          <article className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-3">
            <p className="text-2xl font-bold text-zinc-900">7 Days</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Avg. Concept Sprint
            </p>
          </article>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-[#efefef] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 w-full max-w-[1400px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Core Services
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900 sm:text-3xl">What we create with our clients</h2>
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] gap-4 md:grid-cols-3">
          <article className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80"
              alt="Code editor with product interface"
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-900">Landing Page Systems</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                We design modular landing page sections that can scale from campaign pages to
                multi-product showcases without losing visual consistency.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80"
              alt="Team discussing product strategy"
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-900">Content Architecture</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                From headlines to supporting paragraphs, we structure copy so users can scan fast,
                understand the offer, and move confidently through the page.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
              alt="Creative planning board with sticky notes"
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-900">Visual Direction</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                We pair typography, spacing, and image curation into a single visual language so
                each page feels intentional, not template-driven.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
