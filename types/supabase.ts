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
      blog_category: {
        Row: {
          blog_id: number;
          category_id: number;
          created_at: string;
        };
        Insert: {
          blog_id: number;
          category_id: number;
          created_at?: string;
        };
        Update: {
          blog_id?: number;
          category_id?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'blog_category_blog_id_fkey';
            columns: ['blog_id'];
            isOneToOne: false;
            referencedRelation: 'blogs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'blog_category_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      blogs: {
        Row: {
          content: string;
          created_at: string;
          description: string;
          id: number;
          thumbnail: string;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          description?: string;
          id?: number;
          thumbnail: string;
          title: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          description?: string;
          id?: number;
          thumbnail?: string;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      categories: {
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
