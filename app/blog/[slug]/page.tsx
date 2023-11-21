/* eslint-disable react/no-danger */
import { clerkClient } from '@clerk/nextjs';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/Badge';
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

  if (!blog) {
    notFound();
  }

  const convertContent = (content: string) => {
    return { __html: content };
  };

  const user = await clerkClient.users.getUser(blog?.user_id);

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col px-4 pb-8 md:px-8">
      <h1 className="mb-3 pt-32 text-center text-3xl font-bold">
        {blog.title}
      </h1>
      <div className="mx-auto mb-6 mt-2 flex flex-row flex-wrap">
        {blog.categories.map((cat) => (
          <Badge className="mr-2 mt-2" key={cat.id}>
            {cat.name}
          </Badge>
        ))}
      </div>
      <div className="mb-6 flex items-end justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={user.imageUrl}
              layout="fill"
              loading="lazy"
              alt={`Photo by ${user.firstName} ${user.lastName}`}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div>
            <span className="block text-indigo-500">
              {user.firstName} {user.lastName}
            </span>
            <span className="block text-sm text-gray-400">
              {new Date(blog.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div
        className="min-h-[400px] w-full overflow-hidden"
        dangerouslySetInnerHTML={convertContent(blog.content)}
      />
    </div>
  );
};

export default BlogContentByIdIndex;
