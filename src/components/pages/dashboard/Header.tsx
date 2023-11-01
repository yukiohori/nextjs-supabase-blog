import Link from 'next/link';
import type { ReactNode } from 'react';

type HeaderProps = {
  user: ReactNode;
};

const Header = ({ user }: HeaderProps) => {
  return (
    <nav className="fixed z-30 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/dashboard" className="ml-2 flex md:mr-24">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
                Dashboard
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <div className="ml-3 flex items-center">{user}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Header };
