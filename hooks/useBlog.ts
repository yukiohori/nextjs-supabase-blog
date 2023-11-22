/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth, useSession } from '@clerk/nextjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { toast } from '@/hooks/useToast';
import { DASHBOARD_BLOG_PAGINATION } from '@/libs/constants';
import { createClient } from '@/libs/supabase/client';
import { supabaseClient } from '@/libs/supabase/server';
import type { Blog, BlogInsert, BlogUpdate } from '@/types/database';

const numberOfItems = DASHBOARD_BLOG_PAGINATION;

export const useBlog = (fetch?: boolean) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(
    Number(searchParams?.get('page')) || 1,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState<number | null>(null);
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const { session } = useSession();
  const { getToken } = useAuth();
  const isFetching = useRef(false);

  const offsetItems = useMemo(() => {
    return (pageNumber - 1) * numberOfItems;
  }, [pageNumber]);

  const fetchBlog = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    const currentPage = Number(searchParams?.get('page') || 1);
    const currentOffsetItems = (currentPage - 1) * numberOfItems;
    try {
      const sp = createClient();
      const {
        data: blog,
        error,
        count: totalCount,
      } = await sp
        .from('blogs')
        .select('*, categories(id,name)', { count: 'exact' })
        .range(currentOffsetItems, currentOffsetItems + numberOfItems - 1)
        .order('id', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      setBlogList(blog || []);
      setCount(totalCount);
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
      isFetching.current = false;
    }
  }, [offsetItems, searchParams]);

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
  }, [fetch]);

  useEffect(() => {
    fetchBlog();
  }, [searchParams]);

  const prevNextPage = useCallback(
    (action: 'prev' | 'next') => {
      const nextPageNumber =
        action === 'prev' ? pageNumber - 1 : pageNumber + 1;
      setPageNumber(nextPageNumber);
      router.push(`${pathname}?page=${nextPageNumber}`);
    },
    [pageNumber, pathname, router],
  );

  return {
    fetchBlog,
    fetchBlogById,
    insertBlog,
    updateBlog,
    deleteBlog,
    prevNextPage,
    isLoading,
    blogList,
    pageNumber,
    offsetItems,
    numberOfItems,
    count,
  };
};
