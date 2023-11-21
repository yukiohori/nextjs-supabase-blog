import type { Metadata } from 'next';

import { ImageCard } from '@/components/molecules/ImageCard';
import { createClient } from '@/libs/supabase/client';

export const metadata: Metadata = {
  title: 'CATEGORY PAGE',
  description:
    'This is a category page. You can see all the blogs in this category.',
};

const CategoryPage = async () => {
  const supabase = createClient();
  const { data: categoryList } = await supabase
    .from('categories')
    .select('*')
    .match({ show: true })
    .order('id', { ascending: true });

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-8 md:px-8">
      <h1 className="mb-6 pt-32 text-center text-3xl font-bold">
        CATEGORY {categoryList?.length}
      </h1>
      <div className="grid min-h-[400px] w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
    </div>
  );
};
export default CategoryPage;
