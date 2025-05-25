import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: number;
          user_id: string;
          title: string;
          slug: string;
          venmo_username: string;
          drink_amount: number;
          created_at: string;
          button_text?: string
        };
        Insert: {
          id?: number;
          user_id: string;
          title: string;
          slug: string;
          venmo_username: string;
          drink_amount: number;
          created_at?: string;
          button_text?: string
        };
        Update: {
          id?: number;
          user_id?: string;
          title?: string;
          slug?: string;
          venmo_username?: string;
          drink_amount?: number;
          created_at?: string;
          button_text?: string
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
