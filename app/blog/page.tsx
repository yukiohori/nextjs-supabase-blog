import clsx from 'clsx';
import type { Metadata } from 'next';
import Link from 'next/link';

import { BlogCard } from '@/components/organisms/BlogCard';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/libs/supabase/client';

export const metadata: Metadata = {
  title: 'BLOG PAGE',
  description: 'This is a blog page. You can see all the blogs in this page.',
};

type SearchParamsProps = {
  searchParams: {
    page: string;
  };
};

const BlogListPage = async ({ searchParams }: SearchParamsProps) => {
  const pageNumber = Number(searchParams.page ?? 1);
  const numberOfItems = 10;
  const offsetItems = (pageNumber - 1) * numberOfItems;
  const supabase = createClient();
  const { data: blogList, count } = await supabase
    .from('blogs')
    .select('*, categories(id,name)', { count: 'exact' })
    .range(offsetItems, offsetItems + numberOfItems - 1)
    .order('id', { ascending: false });

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-8 md:px-8">
      <h1 className="mb-6 pt-32 text-center text-3xl font-bold">BLOG</h1>
      <div className="flex w-full flex-col space-y-4">
        {blogList &&
          blogList.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              description={blog.description}
              category={blog.categories}
              image={blog.thumbnail}
              userId={blog.user_id}
              createdAt={blog.created_at}
            />
          ))}
      </div>
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
    </div>
  );
};
export default BlogListPage;
