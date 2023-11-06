import type { Database } from '@/types/supabase';

export type Category = Database['public']['Tables']['category']['Row'];

export type CategoryInsert = Database['public']['Tables']['category']['Insert'];

export type CategoryUpdate = Database['public']['Tables']['category']['Update'];
