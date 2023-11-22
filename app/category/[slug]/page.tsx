/* eslint-disable react/no-danger */
import clsx from 'clsx';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlogCard } from '@/components/organisms/BlogCard';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/libs/supabase/client';

type SearchParamsProps = {
  params: { slug: string };
  searchParams: {
    page: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .match({ name: decodeURIComponent(params.slug) })
    .single();
  if (!category) {
    return { title: '', description: '' };
  }
  return {
    title: category.name,
    description: `This is blogs which is related to ${category.name}`,
  };
}

const CategoryBlogByIdIndex = async ({
  params,
  searchParams,
}: SearchParamsProps) => {
  const pageNumber = Number(searchParams.page ?? 1);
  const numberOfItems = 2;
  const offsetItems = (pageNumber - 1) * numberOfItems;
  const supabase = createClient();
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .match({ name: decodeURIComponent(params.slug) })
    .single();

  if (error || !category) {
    notFound();
  }

  const { data: blogList, count } = await supabase
    .from('blog_category')
    .select(
      '*, categories(name),blogs(id,title,description, thumbnail, user_id, created_at, categories(id,name))',
      { count: 'exact' },
    )
    .range(offsetItems, offsetItems + numberOfItems - 1)
    .match({ category_id: category.id });

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-8 md:px-8">
      <h1 className="mb-6 pt-32 text-center text-3xl font-bold">
        {decodeURIComponent(params.slug)}
      </h1>
      <div className="flex min-h-[400px] w-full flex-col space-y-4">
        {blogList && blogList.length === 0 && (
          <p className="text-center">No blogs in this category</p>
        )}
        {blogList &&
          blogList
            .filter((item) => item.blogs)
            .map((item) => {
              if (!item.blogs) return null;
              return (
                <BlogCard
                  key={item.blogs.id}
                  id={item.blogs.id}
                  title={item.blogs.title}
                  description={item.blogs.description}
                  category={item.blogs.categories}
                  image={item.blogs.thumbnail}
                  userId={item.blogs.user_id}
                  createdAt={item.blogs.created_at}
                />
              );
            })}
      </div>
      {blogList && blogList.length !== 0 && (
        <div className="mt-6 flex w-full items-center justify-center space-x-4">
          <Link
            className={clsx(pageNumber - 1 === 0 && 'pointer-events-none')}
            href={`/blog?page=${pageNumber - 1 === 0 ? 1 : pageNumber - 1}`}
          >
            <Button disabled={pageNumber - 1 === 0}>Prev</Button>
          </Link>
          <Link
            className={clsx(
              (pageNumber + 1) * numberOfItems > (count || 0) &&
                'pointer-events-none',
            )}
            href={`/blog?page=${
              (pageNumber + 1) * numberOfItems > (count || 0)
                ? pageNumber
                : pageNumber + 1
            }`}
          >
            <Button disabled={(pageNumber + 1) * numberOfItems > (count || 0)}>
              Next
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryBlogByIdIndex;
