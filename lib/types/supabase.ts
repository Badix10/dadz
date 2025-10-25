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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_type: string
          city: string
          country: string
          created_at: string | null
          id: string
          is_default: boolean | null
          postal_code: string
          profile_id: string
          street: string
          updated_at: string | null
        }
        Insert: {
          address_type: string
          city: string
          country?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          postal_code: string
          profile_id: string
          street: string
          updated_at?: string | null
        }
        Update: {
          address_type?: string
          city?: string
          country?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          postal_code?: string
          profile_id?: string
          street?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dish_categories: {
        Row: {
          created_at: string
          display_order: number
          id: string
          name: string
          restaurant_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          name: string
          restaurant_id: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dish_categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      dish_option_values: {
        Row: {
          display_order: number
          id: string
          is_default: boolean
          name: string
          option_id: string
          price_modifier: number
        }
        Insert: {
          display_order?: number
          id?: string
          is_default?: boolean
          name: string
          option_id: string
          price_modifier?: number
        }
        Update: {
          display_order?: number
          id?: string
          is_default?: boolean
          name?: string
          option_id?: string
          price_modifier?: number
        }
        Relationships: [
          {
            foreignKeyName: "dish_option_values_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "dish_options"
            referencedColumns: ["id"]
          },
        ]
      }
      dish_options: {
        Row: {
          dish_id: string
          display_order: number
          id: string
          is_required: boolean
          name: string
          type: string
        }
        Insert: {
          dish_id: string
          display_order?: number
          id?: string
          is_required?: boolean
          name: string
          type: string
        }
        Update: {
          dish_id?: string
          display_order?: number
          id?: string
          is_required?: boolean
          name?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "dish_options_dish_id_fkey"
            columns: ["dish_id"]
            isOneToOne: false
            referencedRelation: "dishes"
            referencedColumns: ["id"]
          },
        ]
      }
      dishes: {
        Row: {
          allergens: string[] | null
          calories: number | null
          category_id: string | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string | null
          is_available: boolean
          is_popular: boolean
          name: string
          preparation_time: number | null
          price: number
          restaurant_id: string
          slug: string
          updated_at: string
        }
        Insert: {
          allergens?: string[] | null
          calories?: number | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_available?: boolean
          is_popular?: boolean
          name: string
          preparation_time?: number | null
          price: number
          restaurant_id: string
          slug: string
          updated_at?: string
        }
        Update: {
          allergens?: string[] | null
          calories?: number | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_available?: boolean
          is_popular?: boolean
          name?: string
          preparation_time?: number | null
          price?: number
          restaurant_id?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dishes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "dish_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dishes_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_restaurants: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          restaurant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          restaurant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_restaurants_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_restaurants_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      restaurant_categories: {
        Row: {
          created_at: string
          display_order: number
          icon_url: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon_url?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          display_order?: number
          icon_url?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      restaurant_hours: {
        Row: {
          close_time: string
          day_of_week: number
          id: string
          is_closed: boolean
          open_time: string
          restaurant_id: string
        }
        Insert: {
          close_time: string
          day_of_week: number
          id?: string
          is_closed?: boolean
          open_time: string
          restaurant_id: string
        }
        Update: {
          close_time?: string
          day_of_week?: number
          id?: string
          is_closed?: boolean
          open_time?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_hours_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          profile_id: string
          rating: number
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          profile_id: string
          rating: number
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          profile_id?: string
          rating?: number
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          address: string
          category_id: string | null
          cover_image_url: string | null
          created_at: string
          delivery_fee_base: number
          delivery_fee_per_km: number
          delivery_time_max: number
          delivery_time_min: number
          description: string | null
          email: string | null
          id: string
          is_active: boolean
          is_open: boolean
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          max_delivery_distance: number
          minimum_order: number | null
          name: string
          phone: string | null
          price_range: string
          rating: number | null
          slug: string
          total_reviews: number | null
          updated_at: string
        }
        Insert: {
          address: string
          category_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          delivery_fee_base?: number
          delivery_fee_per_km?: number
          delivery_time_max: number
          delivery_time_min: number
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          is_open?: boolean
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          max_delivery_distance?: number
          minimum_order?: number | null
          name: string
          phone?: string | null
          price_range?: string
          rating?: number | null
          slug: string
          total_reviews?: number | null
          updated_at?: string
        }
        Update: {
          address?: string
          category_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          delivery_fee_base?: number
          delivery_fee_per_km?: number
          delivery_time_max?: number
          delivery_time_min?: number
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          is_open?: boolean
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          max_delivery_distance?: number
          minimum_order?: number | null
          name?: string
          phone?: string | null
          price_range?: string
          rating?: number | null
          slug?: string
          total_reviews?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "restaurant_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: { Args: { user_id: string }; Returns: boolean }
    }
    Enums: {
      user_role: "ADMIN" | "CLIENT" | "RESTO" | "DELIVERER"
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
    Enums: {
      user_role: ["ADMIN", "CLIENT", "RESTO", "DELIVERER"],
    },
  },
} as const
