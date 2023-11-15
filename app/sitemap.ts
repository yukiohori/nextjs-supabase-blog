import type { MetadataRoute } from 'next';

import { createClient } from '@/libs/supabase/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.BASE_URL || '';
  const lastModified = new Date();
  const sp = createClient();
  const { data: blogs } = await sp.from('blogs').select();

  const blogPaths =
    blogs?.map((blog) => ({
      url: `${baseURL}/blog/${blog.id}`,
      lastModified: blog.updated_at
        ? new Date(blog.updated_at)
        : new Date(blog.created_at),
    })) || [];

  const defaultPaths = [
    {
      url: `${baseURL}/blog`,
      lastModified,
    },
    {
      url: `${baseURL}/category`,
      lastModified,
    },
    {
      url: `${baseURL}/sign-up`,
      lastModified,
    },
    {
      url: `${baseURL}/sign-in`,
      lastModified,
    },
    {
      url: `${baseURL}/tutorial`,
      lastModified,
    },
    {
      url: `${baseURL}/about`,
      lastModified,
    },
  ];

  const staticPaths = [
    {
      url: baseURL,
      lastModified,
    },
  ];

  return [...staticPaths, ...defaultPaths, ...blogPaths];
}
