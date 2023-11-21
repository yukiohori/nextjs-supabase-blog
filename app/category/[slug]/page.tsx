/* eslint-disable react/no-danger */
import { notFound } from 'next/navigation';

import { BlogCard } from '@/components/organisms/BlogCard';
import { createClient } from '@/libs/supabase/client';

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
}: {
  params: { slug: string };
}) => {
  const supabase = createClient();
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .match({ name: decodeURIComponent(params.slug) })
    .single();

  if (error || !category) {
    notFound();
  }

  const { data: blogList } = await supabase
    .from('blog_category')
    .select(
      '*, categories(name),blogs(id,title,description, thumbnail, user_id, created_at, categories(id,name))',
    )
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
    </div>
  );
};

export default CategoryBlogByIdIndex;
