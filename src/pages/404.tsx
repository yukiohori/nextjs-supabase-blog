import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <svg
              width="95"
              height="94"
              viewBox="0 0 95 94"
              className="h-auto w-6 text-indigo-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>
            NextJS
          </Link>
          <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
            That&rsquo;s a 404
          </p>
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            Page not found
          </h1>

          <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
            The page you&rsquo;re looking for doesn&rsquo;t exist.
          </p>

          <Link
            href="/"
            className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
