'use client';

import { useEffect, useState } from 'react';

import { Loading } from '@/components/atoms/Loading';
import { Button } from '@/components/ui/Button';
import { toast } from '@/hooks/useToast';
import { supabase } from '@/libs/supabase';
import type { Category } from '@/types/database';

const CategoryIndex = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const { data: categories } = await supabase.from('category').select('*');
      setCategoryList(categories || []);
    } catch (e) {
      setCategoryList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Category</h1>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              description: 'Your message has been sent.',
            });
          }}
        >
          Add to calendar
        </Button>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div className="flex flex-col items-center justify-center">
            {isLoading && (
              <div className="flex h-40 w-full items-center justify-center">
                <Loading />
              </div>
            )}
            {categoryList.map((category) => (
              <div key={category.id}>
                <span className="text-xl font-bold">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryIndex;
