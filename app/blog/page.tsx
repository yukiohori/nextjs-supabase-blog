import type { Metadata } from 'next';

import { BlogCard } from '@/components/organisms/BlogCard';
import { createClient } from '@/libs/supabase/client';

export const metadata: Metadata = {
  title: 'BLOG PAGE',
  description: 'This is a blog page. You can see all the blogs in this page.',
};

const CategoryPage = async () => {
  const supabase = createClient();
  const { data: blogList } = await supabase
    .from('blogs')
    .select('*, categories(id,name)');

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-8 md:px-8">
      <h1 className="mb-6 pt-32 text-center text-3xl font-bold">BLOG</h1>
      <div className="flex flex-col space-y-4">
        {blogList &&
          blogList.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              description={blog.description}
              category={blog.categories}
              image={blog.thumbnail}
            />
          ))}
      </div>
    </div>
  );
};
export default CategoryPage;
