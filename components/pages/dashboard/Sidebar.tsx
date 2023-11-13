import {
  BookText,
  Github,
  LayoutDashboard,
  LifeBuoy,
  List,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type SidebarProps = {
  logout?: ReactNode;
};

export const Sidebar = ({ logout }: SidebarProps) => {
  return (
    <aside
      className="fixed left-0 top-0 z-20 hidden h-full w-64 shrink-0 flex-col pt-16 font-normal duration-75 lg:flex"
      aria-label="Sidebar"
    >
      <div className="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white pt-0 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
          <div className="flex-1 space-y-1 divide-y divide-gray-200 bg-white px-3 dark:divide-gray-700 dark:bg-gray-800">
            <ul className="space-y-2 pb-2">
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <LayoutDashboard />
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <ul id="dropdown-crud" className="space-y-2 py-2">
                  <li>
                    <Link
                      href="/dashboard/blog"
                      className="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <BookText />
                      <span className="ml-3">Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/category"
                      className="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <List />
                      <span className="ml-3">Category</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/user-profile/"
                      className="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <User />
                      <span className="ml-3">Profile</span>
                    </Link>
                  </li>
                  <li className="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                    <LogOut />
                    <span className="ml-3">{logout}</span>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="space-y-2 pt-2">
              <Link
                href="https://github.com/yukiohori/nextjs-supabase-blog"
                target="_blank"
                className="group flex items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Github />
                <span className="ml-3">GitHub Repository</span>
              </Link>
              <Link
                href="https://github.com/yukiohori/nextjs-supabase-blog/issues"
                target="_blank"
                className="group flex items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <LifeBuoy />
                <span className="ml-3">Support</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 hidden w-full justify-center space-x-4 bg-white p-4 dark:bg-gray-800 lg:flex">
          <Link
            href="/"
            data-tooltip-target="tooltip-settings"
            className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <Settings />
          </Link>
        </div>
      </div>
    </aside>
  );
};
