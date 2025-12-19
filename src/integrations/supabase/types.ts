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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string
          created_at: string
          delivery_method: string
          drop_id: string
          geo: string
          id: string
        }
        Insert: {
          address: string
          created_at?: string
          delivery_method: string
          drop_id: string
          geo: string
          id?: string
        }
        Update: {
          address?: string
          created_at?: string
          delivery_method?: string
          drop_id?: string
          geo?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_drop_id_fkey"
            columns: ["drop_id"]
            isOneToOne: false
            referencedRelation: "drops"
            referencedColumns: ["id"]
          },
        ]
      }
      billings: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      drops: {
        Row: {
          created_at: string
          geo: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          geo: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          geo?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      pack_archive: {
        Row: {
          address_id: string | null
          amount: number
          amount_without_discount: number
          archived_at: string
          billing: string | null
          card: string
          comments: string[] | null
          drop_id: string | null
          email: string | null
          id: string
          original_created_at: string | null
          original_pack_id: string
          pack_id: string
          password: string | null
          product_type: string
          quantity: number
          skup_id: string | null
          status: string
          store_name: string
          track_numbers: string[] | null
        }
        Insert: {
          address_id?: string | null
          amount: number
          amount_without_discount: number
          archived_at?: string
          billing?: string | null
          card: string
          comments?: string[] | null
          drop_id?: string | null
          email?: string | null
          id?: string
          original_created_at?: string | null
          original_pack_id: string
          pack_id: string
          password?: string | null
          product_type: string
          quantity: number
          skup_id?: string | null
          status: string
          store_name: string
          track_numbers?: string[] | null
        }
        Update: {
          address_id?: string | null
          amount?: number
          amount_without_discount?: number
          archived_at?: string
          billing?: string | null
          card?: string
          comments?: string[] | null
          drop_id?: string | null
          email?: string | null
          id?: string
          original_created_at?: string | null
          original_pack_id?: string
          pack_id?: string
          password?: string | null
          product_type?: string
          quantity?: number
          skup_id?: string | null
          status?: string
          store_name?: string
          track_numbers?: string[] | null
        }
        Relationships: []
      }
      packs: {
        Row: {
          address_id: string | null
          amount: number
          amount_without_discount: number
          billing: string | null
          card: string
          comments: string[] | null
          created_at: string
          delivered_at: string | null
          drop_id: string | null
          email: string | null
          id: string
          pack_id: string
          password: string | null
          product_type: string
          quantity: number
          skup_id: string | null
          status: string
          store_name: string
          track_numbers: string[] | null
        }
        Insert: {
          address_id?: string | null
          amount?: number
          amount_without_discount?: number
          billing?: string | null
          card: string
          comments?: string[] | null
          created_at?: string
          delivered_at?: string | null
          drop_id?: string | null
          email?: string | null
          id?: string
          pack_id: string
          password?: string | null
          product_type?: string
          quantity?: number
          skup_id?: string | null
          status?: string
          store_name: string
          track_numbers?: string[] | null
        }
        Update: {
          address_id?: string | null
          amount?: number
          amount_without_discount?: number
          billing?: string | null
          card?: string
          comments?: string[] | null
          created_at?: string
          delivered_at?: string | null
          drop_id?: string | null
          email?: string | null
          id?: string
          pack_id?: string
          password?: string | null
          product_type?: string
          quantity?: number
          skup_id?: string | null
          status?: string
          store_name?: string
          track_numbers?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "packs_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packs_drop_id_fkey"
            columns: ["drop_id"]
            isOneToOne: false
            referencedRelation: "drops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packs_skup_id_fkey"
            columns: ["skup_id"]
            isOneToOne: false
            referencedRelation: "skups"
            referencedColumns: ["id"]
          },
        ]
      }
      ref_processes: {
        Row: {
          additional_expenses: number | null
          boxer_expenses: number | null
          carrier_payment: number | null
          comments: string[] | null
          created_at: string
          delivery_date: string | null
          drop_id: string | null
          drop_payment: number | null
          id: string
          net_profit: number | null
          pack_id: string | null
          pack_name: string
          ref_method: string | null
          status: string
          store_name: string
          track_number: string | null
          write_date: string | null
        }
        Insert: {
          additional_expenses?: number | null
          boxer_expenses?: number | null
          carrier_payment?: number | null
          comments?: string[] | null
          created_at?: string
          delivery_date?: string | null
          drop_id?: string | null
          drop_payment?: number | null
          id?: string
          net_profit?: number | null
          pack_id?: string | null
          pack_name: string
          ref_method?: string | null
          status?: string
          store_name: string
          track_number?: string | null
          write_date?: string | null
        }
        Update: {
          additional_expenses?: number | null
          boxer_expenses?: number | null
          carrier_payment?: number | null
          comments?: string[] | null
          created_at?: string
          delivery_date?: string | null
          drop_id?: string | null
          drop_payment?: number | null
          id?: string
          net_profit?: number | null
          pack_id?: string | null
          pack_name?: string
          ref_method?: string | null
          status?: string
          store_name?: string
          track_number?: string | null
          write_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ref_processes_drop_id_fkey"
            columns: ["drop_id"]
            isOneToOne: false
            referencedRelation: "drops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ref_processes_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "packs"
            referencedColumns: ["id"]
          },
        ]
      }
      skups: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_archives: { Args: never; Returns: undefined }
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
