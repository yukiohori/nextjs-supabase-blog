/* eslint-disable no-console */
import { useAuth, useSession } from '@clerk/nextjs';
import { useCallback } from 'react';

import { toast } from '@/hooks/useToast';
import { supabaseClient } from '@/libs/supabase/server';
import type { BlogCategoryInsert } from '@/types/database';

export const useBlogCategory = () => {
  const { session } = useSession();
  const { getToken } = useAuth();

  const insertBlogCategory = useCallback(
    async (blogCategories: BlogCategoryInsert[]) => {
      try {
        if (!session) return false;
        const supabaseAccessToken = await getToken({
          template: 'supabase',
        });
        if (!supabaseAccessToken) return false;
        const sb = await supabaseClient(supabaseAccessToken);
        const { error } = await sb.from('blog_category').insert(blogCategories);
        if (error) {
          throw new Error(error.message);
        }
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
      }
    },
    [getToken, session],
  );

  const deleteBlogCategory = useCallback(
    async (id: number) => {
      if (!session) return;
      try {
        const supabaseAccessToken = await getToken({
          template: 'supabase',
        });
        if (!supabaseAccessToken) return;
        const sb = await supabaseClient(supabaseAccessToken);
        const { error } = await sb
          .from('blog_category')
          .delete()
          .match({ blog_id: id });
        if (error) {
          throw new Error(error.message);
        }
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
      }
    },
    [getToken, session],
  );

  const updateBlogCategory = useCallback(
    async (BlogCategory: BlogCategoryInsert[], blogId?: number) => {
      if (blogId) {
        await deleteBlogCategory(blogId);
      }
      await insertBlogCategory(BlogCategory);
    },
    [deleteBlogCategory, insertBlogCategory],
  );

  return {
    updateBlogCategory,
  };
};
