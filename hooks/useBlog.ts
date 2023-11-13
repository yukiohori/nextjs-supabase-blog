/* eslint-disable no-console */
import { useAuth, useSession } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';

import { toast } from '@/hooks/useToast';
import { createClient } from '@/libs/supabase/client';
import { supabaseClient } from '@/libs/supabase/server';
import type { Blog, BlogInsert, BlogUpdate } from '@/types/database';

export const useBlog = (fetch?: boolean) => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const { session } = useSession();
  const { getToken } = useAuth();

  const fetchBlog = useCallback(async () => {
    try {
      const sp = createClient();
      const { data: blog, error } = await sp
        .from('blogs')
        .select('*, categories(id,name)')
        .order('id', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      setBlogList(blog || []);
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
      setBlogList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchBlogById = useCallback(async (blogId: number) => {
    try {
      const sp = createClient();
      const { data: blog, error } = await sp
        .from('blogs')
        .select('*, categories(id,name)')
        .match({ id: blogId })
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return blog;
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
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const insertBlog = useCallback(
    async (category: BlogInsert) => {
      try {
        if (!session) return null;
        const supabaseAccessToken = await getToken({
          template: 'supabase',
        });
        if (!supabaseAccessToken) return null;
        setIsLoading(true);
        const sb = await supabaseClient(supabaseAccessToken);
        const { error, data } = await sb
          .from('blogs')
          .insert([category])
          .select('*')
          .single();
        if (error) {
          throw new Error(error.message);
        }
        toast({
          title: 'Success',
          description: 'Blog created successfully',
        });
        fetchBlog();
        console.log({ data });
        return data;
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
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchBlog, getToken, session],
  );

  const updateBlog = useCallback(
    async (category: BlogUpdate) => {
      try {
        if (!session) return false;
        const supabaseAccessToken = await getToken({
          template: 'supabase',
        });
        if (!supabaseAccessToken) return false;
        setIsLoading(true);
        const sb = await supabaseClient(supabaseAccessToken);
        const { error } = await sb
          .from('blogs')
          .update(category)
          .match({ id: category.id });
        if (error) {
          throw new Error(error.message);
        }
        toast({
          title: 'Success',
          description: 'Blog updated successfully',
        });
        fetchBlog();
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
    [fetchBlog, getToken, session],
  );

  const deleteBlog = useCallback(
    async (id: number) => {
      if (!session) return;
      try {
        const supabaseAccessToken = await getToken({
          template: 'supabase',
        });
        if (!supabaseAccessToken) return;
        setIsLoading(true);
        const sb = await supabaseClient(supabaseAccessToken);
        const { error } = await sb.from('blogs').delete().match({ id });
        if (error) {
          throw new Error(error.message);
        }
        toast({
          title: 'Success',
          description: 'Blog deleted successfully',
        });
        fetchBlog();
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
    [fetchBlog, getToken, session],
  );

  useEffect(() => {
    if (fetch) {
      fetchBlog();
    }
  }, [fetch, fetchBlog]);

  return {
    fetchBlog,
    fetchBlogById,
    insertBlog,
    updateBlog,
    deleteBlog,
    isLoading,
    blogList,
  };
};
