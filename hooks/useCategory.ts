/* eslint-disable no-console */
import { useAuth, useSession } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';

import { toast } from '@/hooks/useToast';
import { createClient } from '@/libs/supabase/client';
import { supabaseClient } from '@/libs/supabase/server';
import type {
  Category,
  CategoryInsert,
  CategoryUpdate,
} from '@/types/database';

export const useCategory = (fetch?: boolean) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const { session } = useSession();
  const { getToken } = useAuth();

  const fetchCategories = useCallback(async () => {
    try {
      const sp = createClient();
      const { data: categories } = await sp
        .from('categories')
        .select('*')
        .order('id', { ascending: false });
      setCategoryList(categories || []);
    } catch (e) {
      setCategoryList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const insertCategory = useCallback(
    async (category: CategoryInsert) => {
      try {
        if (!session) return false;
        const supabaseAccessToken = await getToken({
          template: 'supabase',
        });
        if (!supabaseAccessToken) return false;
        setIsLoading(true);
        const sb = await supabaseClient(supabaseAccessToken);
        const { error } = await sb.from('categories').insert([category]);
        if (error) {
          throw new Error(error.message);
        }
        toast({
          title: 'Success',
          description: 'Category created successfully',
        });
        fetchCategories();
        return true;
      } catch (e) {
        const errorMessage =
          e instanceof Error
            ? e.message
            : 'An unknown error occurred. Please try again later or contact support if the issue persists';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCategories, getToken, session],
  );

  const updateCategory = useCallback(
    async (category: CategoryUpdate) => {
      try {
        if (!session) return false;
        const supabaseAccessToken = await getToken({
          template: 'supabase',
        });
        if (!supabaseAccessToken) return false;
        setIsLoading(true);
        const sb = await supabaseClient(supabaseAccessToken);
        const { error } = await sb
          .from('categories')
          .update(category)
          .match({ id: category.id });
        if (error) {
          throw new Error(error.message);
        }
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
        fetchCategories();
        return true;
      } catch (e) {
        const errorMessage =
          e instanceof Error
            ? e.message
            : 'An unknown error occurred. Please try again later or contact support if the issue persists';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCategories, getToken, session],
  );

  const deleteCategory = useCallback(
    async (id: number) => {
      if (!session) return;
      try {
        const supabaseAccessToken = await getToken({
          template: 'supabase',
        });
        if (!supabaseAccessToken) return;
        setIsLoading(true);
        const sb = await supabaseClient(supabaseAccessToken);
        const { error } = await sb.from('categories').delete().match({ id });
        if (error) {
          throw new Error(error.message);
        }
        toast({
          title: 'Success',
          description: 'Category deleted successfully',
        });
        fetchCategories();
      } catch (e) {
        const errorMessage =
          e instanceof Error
            ? e.message
            : 'An unknown error occurred. Please try again later or contact support if the issue persists';

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCategories, getToken, session],
  );

  useEffect(() => {
    if (fetch) {
      fetchCategories();
    }
  }, [fetch, fetchCategories]);

  return {
    fetchCategories,
    insertCategory,
    updateCategory,
    deleteCategory,
    isLoading,
    categoryList,
  };
};
