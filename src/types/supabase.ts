export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string | null;
          deleted: boolean | null;
          id: number;
          image_url: string | null;
          name: string;
          show: boolean | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          deleted?: boolean | null;
          id?: number;
          image_url?: string | null;
          name: string;
          show?: boolean | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          deleted?: boolean | null;
          id?: number;
          image_url?: string | null;
          name?: string;
          show?: boolean | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
