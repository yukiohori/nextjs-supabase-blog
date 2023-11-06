import Image from 'next/legacy/image';
import Link from 'next/link';

import { Technologies } from '@/components/organisms/Technologies';
import { Main } from '@/components/templates/Main';
import { Meta } from '@/layouts/Meta';

const Index = () => (
  <Main
    meta={
      <Meta
        title="NextJS Supabase Blog Starter"
        description="Supabase Blog starter code for your project."
      />
    }
  >
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
          <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
            <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
              Very proud to introduce
            </p>

            <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
              Revolutionary way to build the web
            </h1>

            <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random.
            </p>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="https://github.com/yukiohori/nextjs-supabase-blog"
                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Github
              </Link>

              <Link
                href="/tutorial"
                className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
              >
                Tutorial
              </Link>
            </div>
          </div>
          <div className="relative h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
            <Image
              src="/assets/images/home.webp"
              loading="lazy"
              layout="fill"
              alt="Photo by Fakurian Design"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </section>
      </div>
    </div>

    <Technologies />

    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Blog
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
            <Link
              href="/"
              className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
            >
              <Image
                src="/assets/images/home.webp"
                layout="fill"
                loading="lazy"
                alt="Photo by Minh Pham"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </Link>

            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                <Link
                  href="/"
                  className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                >
                  New trends in Tech
                </Link>
              </h2>

              <p className="mb-8 text-gray-500">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text.
              </p>

              <div className="mt-auto flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src="/assets/images/home.webp"
                      layout="fill"
                      loading="lazy"
                      alt="Photo by Brock Wegner"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div>
                    <span className="block text-indigo-500">Mike Lane</span>
                    <span className="block text-sm text-gray-400">
                      July 19, 2021
                    </span>
                  </div>
                </div>

                <span className="rounded border px-2 py-1 text-sm text-gray-500">
                  Article
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
            <Link
              href="/"
              className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
            >
              <Image
                src="/assets/images/home.webp"
                layout="fill"
                loading="lazy"
                alt="Photo by Lorenzo Herrera"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </Link>

            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                <Link
                  href="/"
                  className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                >
                  Working with legacy stacks
                </Link>
              </h2>

              <p className="mb-8 text-gray-500">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text.
              </p>

              <div className="mt-auto flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src="/assets/images/home.webp"
                      layout="fill"
                      loading="lazy"
                      alt="Photo by peter bucks"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div>
                    <span className="block text-indigo-500">Jane Jackobs</span>
                    <span className="block text-sm text-gray-400">
                      April 07, 2021
                    </span>
                  </div>
                </div>

                <span className="rounded border px-2 py-1 text-sm text-gray-500">
                  Article
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
            <Link
              href="/"
              className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
            >
              <Image
                src="/assets/images/home.webp"
                layout="fill"
                loading="lazy"
                alt="Photo by Magicle"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </Link>

            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                <Link
                  href="/"
                  className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                >
                  10 best smartphones for devs
                </Link>
              </h2>

              <p className="mb-8 text-gray-500">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text.
              </p>

              <div className="mt-auto flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src="/assets/images/home.webp"
                      layout="fill"
                      loading="lazy"
                      alt="Photo by Jassir Jonis"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div>
                    <span className="block text-indigo-500">Tylor Grey</span>
                    <span className="block text-sm text-gray-400">
                      March 15, 2021
                    </span>
                  </div>
                </div>

                <span className="rounded border px-2 py-1 text-sm text-gray-500">
                  Article
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
            <Link
              href="/"
              className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
            >
              <Image
                src="/assets/images/home.webp"
                layout="fill"
                loading="lazy"
                alt="Photo by Martin Sanchez"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </Link>

            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                <Link
                  href="/"
                  className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                >
                  8 High performance Notebooks
                </Link>
              </h2>

              <p className="mb-8 text-gray-500">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text.
              </p>

              <div className="mt-auto flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src="/assets/images/home.webp"
                      layout="fill"
                      loading="lazy"
                      alt="Photo by Aiony Haust"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div>
                    <span className="block text-indigo-500">Ann Park</span>
                    <span className="block text-sm text-gray-400">
                      January 27, 2021
                    </span>
                  </div>
                </div>

                <span className="rounded border px-2 py-1 text-sm text-gray-500">
                  Article
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Main>
);

export default Index;
