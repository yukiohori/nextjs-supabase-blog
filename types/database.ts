import type { Database } from '@/types/supabase';

export type BlogCategoryRow = {
  id: number;
  name: string;
};

export type Category = Database['public']['Tables']['categories']['Row'];

export type CategoryInsert =
  Database['public']['Tables']['categories']['Insert'];

export type CategoryUpdate =
  Database['public']['Tables']['categories']['Update'];

export type BlogCategory = Database['public']['Tables']['blog_category']['Row'];

export type BlogCategoryInsert =
  Database['public']['Tables']['blog_category']['Insert'];

export type BlogCategoryUpdate =
  Database['public']['Tables']['blog_category']['Update'];

export type Blog = Database['public']['Tables']['blogs']['Row'] & {
  categories?: BlogCategoryRow[];
};

export type BlogInsert = Database['public']['Tables']['blogs']['Insert'];

export type BlogUpdate = Database['public']['Tables']['blogs']['Update'];
