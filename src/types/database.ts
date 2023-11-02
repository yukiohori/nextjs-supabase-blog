import type { Database } from '@/types/supabase';

export type Category = Database['public']['Tables']['category']['Row'];
