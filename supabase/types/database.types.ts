export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          latitude: number | null
          longitude: number | null
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
          latitude?: number | null
          longitude?: number | null
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
          latitude?: number | null
          longitude?: number | null
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
    }
    Enums: {
      user_role: "ADMIN" | "CLIENT" | "RESTO" | "DELIVERER"
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
