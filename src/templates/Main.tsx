import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}
    <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
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

      <nav className="hidden gap-12 lg:flex">
        <Link href="/" className="text-lg font-semibold text-indigo-500">
          Home
        </Link>
        <Link
          href="/"
          className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
        >
          Features
        </Link>
        <Link
          href="/"
          className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
        >
          Pricing
        </Link>
        <Link
          href="/"
          className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
        >
          About
        </Link>
        <Link
          href="/sign-in/"
          className="border-none text-gray-700 hover:text-gray-900"
        >
          Sign in
        </Link>

        <Link
          href="/sign-up/"
          className="border-none text-gray-700 hover:text-gray-900"
        >
          Sign up
        </Link>
      </nav>
      <Link
        href="/"
        className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
      >
        Contact Sales
      </Link>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Menu
      </button>
    </header>

    <div className="mx-auto">
      <main className="py-5 text-xl">{props.children}</main>
      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{' '}
        <a href="https://yukiohori.com">YUKI OHORI</a>.
      </footer>
    </div>
  </div>
);

export { Main };
