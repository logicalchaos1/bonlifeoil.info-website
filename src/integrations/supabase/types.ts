export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          indexed_at: string | null
          is_indexed: boolean | null
          meta_description: string | null
          primary_keyword: string | null
          published_at: string | null
          redirect_slug: string | null
          schema_markup: Json | null
          secondary_keywords: string[] | null
          slug: string
          status: string
          title: string
          town_id: string | null
          updated_at: string
          word_count: number | null
        }
        Insert: {
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          indexed_at?: string | null
          is_indexed?: boolean | null
          meta_description?: string | null
          primary_keyword?: string | null
          published_at?: string | null
          redirect_slug?: string | null
          schema_markup?: Json | null
          secondary_keywords?: string[] | null
          slug: string
          status?: string
          title: string
          town_id?: string | null
          updated_at?: string
          word_count?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          indexed_at?: string | null
          is_indexed?: boolean | null
          meta_description?: string | null
          primary_keyword?: string | null
          published_at?: string | null
          redirect_slug?: string | null
          schema_markup?: Json | null
          secondary_keywords?: string[] | null
          slug?: string
          status?: string
          title?: string
          town_id?: string | null
          updated_at?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_town_id_fkey"
            columns: ["town_id"]
            isOneToOne: false
            referencedRelation: "dr_towns"
            referencedColumns: ["id"]
          },
        ]
      }
      citations: {
        Row: {
          blog_post_id: string | null
          citation_type: string | null
          created_at: string
          id: string
          source_name: string
          source_url: string | null
          status: string | null
        }
        Insert: {
          blog_post_id?: string | null
          citation_type?: string | null
          created_at?: string
          id?: string
          source_name: string
          source_url?: string | null
          status?: string | null
        }
        Update: {
          blog_post_id?: string | null
          citation_type?: string | null
          created_at?: string
          id?: string
          source_name?: string
          source_url?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citations_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      dr_towns: {
        Row: {
          created_at: string
          hotel_count: number | null
          id: string
          is_tourist_zone: boolean | null
          name: string
          province: string
          slug: string
        }
        Insert: {
          created_at?: string
          hotel_count?: number | null
          id?: string
          is_tourist_zone?: boolean | null
          name: string
          province: string
          slug: string
        }
        Update: {
          created_at?: string
          hotel_count?: number | null
          id?: string
          is_tourist_zone?: boolean | null
          name?: string
          province?: string
          slug?: string
        }
        Relationships: []
      }
      indexing_log: {
        Row: {
          blog_post_id: string | null
          created_at: string
          id: string
          response_data: Json | null
          status: string
          url: string
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          response_data?: Json | null
          status?: string
          url: string
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          response_data?: Json | null
          status?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "indexing_log_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          business_type: string | null
          company: string | null
          created_at: string
          email: string | null
          id: string
          message: string | null
          monthly_consumption: string | null
          name: string
          phone: string | null
          referral_code: string | null
          source: string
        }
        Insert: {
          business_type?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          monthly_consumption?: string | null
          name: string
          phone?: string | null
          referral_code?: string | null
          source?: string
        }
        Update: {
          business_type?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          monthly_consumption?: string | null
          name?: string
          phone?: string | null
          referral_code?: string | null
          source?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referral_code: string
          referral_count: number | null
          referrer_company: string
          referrer_email: string
          referrer_name: string
          referrer_phone: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          referral_code: string
          referral_count?: number | null
          referrer_company: string
          referrer_email: string
          referrer_name: string
          referrer_phone?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          referral_code?: string
          referral_count?: number | null
          referrer_company?: string
          referrer_email?: string
          referrer_name?: string
          referrer_phone?: string | null
        }
        Relationships: []
      }
      seo_keywords: {
        Row: {
          created_at: string
          difficulty: number | null
          id: string
          is_used: boolean | null
          keyword: string
          search_volume: number | null
          town_id: string | null
        }
        Insert: {
          created_at?: string
          difficulty?: number | null
          id?: string
          is_used?: boolean | null
          keyword: string
          search_volume?: number | null
          town_id?: string | null
        }
        Update: {
          created_at?: string
          difficulty?: number | null
          id?: string
          is_used?: boolean | null
          keyword?: string
          search_volume?: number | null
          town_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_keywords_town_id_fkey"
            columns: ["town_id"]
            isOneToOne: false
            referencedRelation: "dr_towns"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_metrics: {
        Row: {
          avg_position: number | null
          blog_post_id: string | null
          clicks: number | null
          created_at: string
          ctr: number | null
          id: string
          impressions: number | null
          recorded_date: string
        }
        Insert: {
          avg_position?: number | null
          blog_post_id?: string | null
          clicks?: number | null
          created_at?: string
          ctr?: number | null
          id?: string
          impressions?: number | null
          recorded_date?: string
        }
        Update: {
          avg_position?: number | null
          blog_post_id?: string | null
          clicks?: number | null
          created_at?: string
          ctr?: number | null
          id?: string
          impressions?: number | null
          recorded_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_metrics_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_blog_redirect: {
        Args: { p_slug: string }
        Returns: string | null
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
