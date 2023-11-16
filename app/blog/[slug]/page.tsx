/* eslint-disable react/no-danger */
import { redirect } from 'next/navigation';

import { createClient } from '@/libs/supabase/client';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: blog } = await supabase
    .from('blogs')
    .select('*, categories(id,name)')
    .match({ id: params.slug })
    .single();
  if (!blog) {
    return { title: '', description: '' };
  }
  return { title: blog.title, description: blog.description };
}

const BlogContentByIdIndex = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const supabase = createClient();
  const { data: blog } = await supabase
    .from('blogs')
    .select('*, categories(id,name)')
    .match({ id: params.slug })
    .single();

  const convertContent = (content: string) => {
    return { __html: content };
  };

  if (!blog) {
    redirect('/404');
  }

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-8 md:px-8">
      <h1 className="mb-6 pt-32 text-center text-3xl font-bold">
        {blog.title}
      </h1>
      <div
        className="min-h-[400px] w-full overflow-hidden"
        dangerouslySetInnerHTML={convertContent(blog.content)}
      />
    </div>
  );
};

export default BlogContentByIdIndex;
