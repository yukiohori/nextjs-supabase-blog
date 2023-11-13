import { ImageCard } from '@/components/molecules/ImageCard';
import { createClient } from '@/libs/supabase/client';

const CategoryPage = async () => {
  const supabase = createClient();
  const { data: categoryList } = await supabase
    .from('category')
    .select()
    .match({ show: true })
    .order('id', { ascending: true });

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 md:px-8">
      <h1 className="mb-6 pt-24 text-center text-3xl font-bold">CATEGORY</h1>
      <div className="grid h-fit w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categoryList &&
          categoryList.map((category) => (
            <ImageCard
              key={category.id}
              image={category.image_url}
              title={category.name}
              link={`/category/${category.id}`}
            />
          ))}
      </div>
    </div>
  );
};
export default CategoryPage;
