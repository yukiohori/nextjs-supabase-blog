import type { Metadata } from 'next';
import Image from 'next/legacy/image';
import Link from 'next/link';

import { ImageCard } from '@/components/molecules/ImageCard';
import { BlogTopCard } from '@/components/organisms/BlogTopCard';
import { Technologies } from '@/components/organisms/Technologies';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/libs/supabase/client';

export const metadata: Metadata = {
  title: 'NEXTJS STARTER HOME PAGE',
  description: 'This is a home page. You can see home in this page.',
};

const Page = async () => {
  const sp = createClient();
  const { data: blogList } = await sp
    .from('blogs')
    .select('*, categories(id,name)')
    .order('id', { ascending: false })
    .limit(8);

  const { data: categoryList } = await sp
    .from('categories')
    .select('*')
    .match({ show: true })
    .order('id', { ascending: true })
    .limit(8);

  return (
    <>
      <div className="pb-6 pt-40 sm:pb-8 lg:pb-12">
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
                placeholder text. It shares some characteristics of a real
                written text but is random.
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

                <Link
                  href="/dashboard"
                  className="inline-block rounded-lg bg-slate-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-slate-500 focus-visible:ring active:bg-slate-900 md:text-base"
                >
                  Go to Dashboard
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
            {blogList?.map((blog) => (
              <BlogTopCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                image={blog.thumbnail}
                link={`/blog/${blog.id}`}
                userId={blog.user_id}
                createdAt={blog.created_at}
                category={blog.categories}
              />
            ))}
          </div>
        </div>
        <div className="my-4 flex w-full justify-center">
          <Link href="/blog">
            <Button>See More Blogs</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Categories
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random or otherwise generated.
            </p>
          </div>
          <div className="grid h-fit w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoryList &&
              categoryList.map((category) => (
                <ImageCard
                  key={category.id}
                  image={category.image_url}
                  title={category.name}
                  link={`/category/${category.name}`}
                />
              ))}
          </div>
          <div className="my-4 flex w-full justify-center">
            <Link href="/category">
              <Button>See More Categories</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
