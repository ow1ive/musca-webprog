import notFoundImage from '../assets/image/not-found.png';
import Button from '../components/Button';

function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center bg-white px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-[980px] items-center gap-8 md:grid-cols-[0.95fr_1.05fr]">
        <div className="mx-auto w-full max-w-[360px]">
          <img src={notFoundImage} alt="Illustration for 404 not found" className="w-full object-contain" />
        </div>

        <div>
          <h1 className="text-6xl font-bold leading-none text-[#171922] sm:text-7xl">404</h1>
          <h2 className="mt-3 text-3xl font-bold text-[#171922] sm:text-4xl">Something&apos;s missing.</h2>
          <p className="mt-4 max-w-md text-lg leading-8 text-zinc-700">
            We couldn't find the page you were looking for.
          </p>
          <Button to="/" className="mt-6 !bg-white hover:!bg-zinc-100">
            Go to website
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;