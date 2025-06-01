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
      avatar: {
        Row: {
          avatar_id: number
          created_at: string
          is_main: boolean | null
          url: string
          user_id: string
        }
        Insert: {
          avatar_id?: number
          created_at?: string
          is_main?: boolean | null
          url: string
          user_id: string
        }
        Update: {
          avatar_id?: number
          created_at?: string
          is_main?: boolean | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "avatar_user_id_user_onepy_user_onepy_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_onepy"
            referencedColumns: ["user_onepy_id"]
          },
        ]
      }
      business_card: {
        Row: {
          business_card_id: number
          company: string | null
          created_at: string
          email: string | null
          image_url: string | null
          is_main: boolean | null
          name: string
          phone: string | null
          position: string | null
          user_id: string
        }
        Insert: {
          business_card_id?: number
          company?: string | null
          created_at?: string
          email?: string | null
          image_url?: string | null
          is_main?: boolean | null
          name: string
          phone?: string | null
          position?: string | null
          user_id: string
        }
        Update: {
          business_card_id?: number
          company?: string | null
          created_at?: string
          email?: string | null
          image_url?: string | null
          is_main?: boolean | null
          name?: string
          phone?: string | null
          position?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_card_user_id_user_onepy_user_onepy_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_onepy"
            referencedColumns: ["user_onepy_id"]
          },
        ]
      }
      business_card_image: {
        Row: {
          business_card_id: number
          business_card_image_id: number
          created_at: string
          description: string | null
          is_main: boolean | null
          url: string
        }
        Insert: {
          business_card_id?: number
          business_card_image_id?: number
          created_at?: string
          description?: string | null
          is_main?: boolean | null
          url: string
        }
        Update: {
          business_card_id?: number
          business_card_image_id?: number
          created_at?: string
          description?: string | null
          is_main?: boolean | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_card_image_business_card_id_business_card_business_car"
            columns: ["business_card_id"]
            isOneToOne: false
            referencedRelation: "business_card"
            referencedColumns: ["business_card_id"]
          },
        ]
      }
      center: {
        Row: {
          address_city: string
          address_detail: string | null
          address_dong: string | null
          address_gu: string
          area_info: Json | null
          building_meta: Json | null
          center_id: number
          created_at: string
          created_by: string
          elevator: Json | null
          lat: number | null
          lng: number | null
          memo: string | null
          name: string
          rate_info: Json | null
          total_area: number | null
          type: string
          updated_at: string
          view_count: number | null
          zipcode: string | null
        }
        Insert: {
          address_city: string
          address_detail?: string | null
          address_dong?: string | null
          address_gu: string
          area_info?: Json | null
          building_meta?: Json | null
          center_id?: number
          created_at?: string
          created_by: string
          elevator?: Json | null
          lat?: number | null
          lng?: number | null
          memo?: string | null
          name: string
          rate_info?: Json | null
          total_area?: number | null
          type: string
          updated_at?: string
          view_count?: number | null
          zipcode?: string | null
        }
        Update: {
          address_city?: string
          address_detail?: string | null
          address_dong?: string | null
          address_gu?: string
          area_info?: Json | null
          building_meta?: Json | null
          center_id?: number
          created_at?: string
          created_by?: string
          elevator?: Json | null
          lat?: number | null
          lng?: number | null
          memo?: string | null
          name?: string
          rate_info?: Json | null
          total_area?: number | null
          type?: string
          updated_at?: string
          view_count?: number | null
          zipcode?: string | null
        }
        Relationships: []
      }
      center_contractor_map: {
        Row: {
          center_contractor_map_id: number
          center_id: number
          company_id: string
          created_at: string
          is_main: boolean | null
        }
        Insert: {
          center_contractor_map_id?: number
          center_id: number
          company_id: string
          created_at?: string
          is_main?: boolean | null
        }
        Update: {
          center_contractor_map_id?: number
          center_id?: number
          company_id?: string
          created_at?: string
          is_main?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "center_contractor_map_center_id_center_center_id_fk"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "center"
            referencedColumns: ["center_id"]
          },
        ]
      }
      center_developer_map: {
        Row: {
          center_company_map_id: number
          center_id: number
          company_id: string
          created_at: string
          is_main: boolean | null
        }
        Insert: {
          center_company_map_id?: number
          center_id: number
          company_id: string
          created_at?: string
          is_main?: boolean | null
        }
        Update: {
          center_company_map_id?: number
          center_id?: number
          company_id?: string
          created_at?: string
          is_main?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "center_developer_map_center_id_center_center_id_fk"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "center"
            referencedColumns: ["center_id"]
          },
        ]
      }
      center_floorplan: {
        Row: {
          center_floorplan_id: number
          center_id: number
          created_at: string
          floor: number
          url: string
        }
        Insert: {
          center_floorplan_id?: number
          center_id: number
          created_at?: string
          floor: number
          url: string
        }
        Update: {
          center_floorplan_id?: number
          center_id?: number
          created_at?: string
          floor?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "center_floorplan_center_id_center_center_id_fk"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "center"
            referencedColumns: ["center_id"]
          },
        ]
      }
      center_history: {
        Row: {
          center_history_id: number
          center_id: number
          changed_by: string
          created_at: string
          data_after: Json
          data_before: Json | null
          reason: string | null
          version: number
        }
        Insert: {
          center_history_id?: number
          center_id: number
          changed_by: string
          created_at?: string
          data_after: Json
          data_before?: Json | null
          reason?: string | null
          version: number
        }
        Update: {
          center_history_id?: number
          center_id?: number
          changed_by?: string
          created_at?: string
          data_after?: Json
          data_before?: Json | null
          reason?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "center_history_center_id_center_center_id_fk"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "center"
            referencedColumns: ["center_id"]
          },
        ]
      }
      center_photo: {
        Row: {
          center_id: number
          center_photo_id: number
          created_at: string
          is_main: boolean | null
          url: string
        }
        Insert: {
          center_id: number
          center_photo_id?: number
          created_at?: string
          is_main?: boolean | null
          url: string
        }
        Update: {
          center_id?: number
          center_photo_id?: number
          created_at?: string
          is_main?: boolean | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "center_photo_center_id_center_center_id_fk"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "center"
            referencedColumns: ["center_id"]
          },
        ]
      }
      center_unit_price: {
        Row: {
          balcony_area: number | null
          building_price: number | null
          center_id: number
          center_unit_price_id: number
          code: string
          common_area: number | null
          created_by: string
          dong: string | null
          exclusive_area: number | null
          exclusive_price_per_py: number | null
          final_price: number | null
          final_price_per_py: number | null
          floor: number | null
          height: number | null
          land_area: number | null
          land_price: number | null
          parking_area: number | null
          price: number | null
          price_per_py: number | null
          record_date: string
          resale_price: number | null
          status: string | null
          supply_area: number | null
          unit: string | null
          unit_order: number | null
          updated_at: string
          usage: string | null
        }
        Insert: {
          balcony_area?: number | null
          building_price?: number | null
          center_id: number
          center_unit_price_id?: number
          code: string
          common_area?: number | null
          created_by: string
          dong?: string | null
          exclusive_area?: number | null
          exclusive_price_per_py?: number | null
          final_price?: number | null
          final_price_per_py?: number | null
          floor?: number | null
          height?: number | null
          land_area?: number | null
          land_price?: number | null
          parking_area?: number | null
          price?: number | null
          price_per_py?: number | null
          record_date?: string
          resale_price?: number | null
          status?: string | null
          supply_area?: number | null
          unit?: string | null
          unit_order?: number | null
          updated_at?: string
          usage?: string | null
        }
        Update: {
          balcony_area?: number | null
          building_price?: number | null
          center_id?: number
          center_unit_price_id?: number
          code?: string
          common_area?: number | null
          created_by?: string
          dong?: string | null
          exclusive_area?: number | null
          exclusive_price_per_py?: number | null
          final_price?: number | null
          final_price_per_py?: number | null
          floor?: number | null
          height?: number | null
          land_area?: number | null
          land_price?: number | null
          parking_area?: number | null
          price?: number | null
          price_per_py?: number | null
          record_date?: string
          resale_price?: number | null
          status?: string | null
          supply_area?: number | null
          unit?: string | null
          unit_order?: number | null
          updated_at?: string
          usage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "center_unit_price_center_id_center_center_id_fk"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "center"
            referencedColumns: ["center_id"]
          },
        ]
      }
      center_unit_price_history: {
        Row: {
          center_unit_price_history_id: number
          center_unit_price_id: number
          changed_by: string
          created_at: string
          data_after: Json
          data_before: Json | null
          reason: string | null
          version: number
        }
        Insert: {
          center_unit_price_history_id?: number
          center_unit_price_id: number
          changed_by: string
          created_at?: string
          data_after: Json
          data_before?: Json | null
          reason?: string | null
          version: number
        }
        Update: {
          center_unit_price_history_id?: number
          center_unit_price_id?: number
          changed_by?: string
          created_at?: string
          data_after?: Json
          data_before?: Json | null
          reason?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "center_unit_price_history_center_unit_price_id_center_unit_pric"
            columns: ["center_unit_price_id"]
            isOneToOne: false
            referencedRelation: "center_unit_price"
            referencedColumns: ["center_unit_price_id"]
          },
        ]
      }
      company: {
        Row: {
          address: string | null
          business_no: string
          company_id: string
          created_at: string
          email: string | null
          file_url: string | null
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          business_no: string
          company_id: string
          created_at?: string
          email?: string | null
          file_url?: string | null
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          business_no?: string
          company_id?: string
          created_at?: string
          email?: string | null
          file_url?: string | null
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      company_company_group_map: {
        Row: {
          company_company_group_map_id: number
          company_group_id: string
          company_id: string
          created_at: string
          is_main: boolean | null
        }
        Insert: {
          company_company_group_map_id?: number
          company_group_id: string
          company_id: string
          created_at?: string
          is_main?: boolean | null
        }
        Update: {
          company_company_group_map_id?: number
          company_group_id?: string
          company_id?: string
          created_at?: string
          is_main?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "company_company_group_map_company_group_id_company_group_compan"
            columns: ["company_group_id"]
            isOneToOne: false
            referencedRelation: "company_group"
            referencedColumns: ["company_group_id"]
          },
          {
            foreignKeyName: "company_company_group_map_company_id_company_company_id_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_file: {
        Row: {
          company_file_id: number
          company_id: string
          created_at: string
          description: string | null
          file_type: string
          is_main: boolean | null
          url: string
        }
        Insert: {
          company_file_id?: number
          company_id: string
          created_at?: string
          description?: string | null
          file_type: string
          is_main?: boolean | null
          url: string
        }
        Update: {
          company_file_id?: number
          company_id?: string
          created_at?: string
          description?: string | null
          file_type?: string
          is_main?: boolean | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_file_company_id_company_company_id_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_group: {
        Row: {
          company_group_id: string
          created_at: string
          description: string | null
          name: string
        }
        Insert: {
          company_group_id: string
          created_at?: string
          description?: string | null
          name: string
        }
        Update: {
          company_group_id?: string
          created_at?: string
          description?: string | null
          name?: string
        }
        Relationships: []
      }
      onepy_money_log: {
        Row: {
          amount: number
          created_at: string
          meta: Json | null
          onepy_money_log_id: number
          reason: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          meta?: Json | null
          onepy_money_log_id?: number
          reason?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          meta?: Json | null
          onepy_money_log_id?: number
          reason?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payment: {
        Row: {
          created_at: string
          meta: Json | null
          money_amount: number
          paid_amount: number
          payment_id: number
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          meta?: Json | null
          money_amount?: number
          paid_amount?: number
          payment_id?: number
          status: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          meta?: Json | null
          money_amount?: number
          paid_amount?: number
          payment_id?: number
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_log: {
        Row: {
          created_at: string
          meta: Json | null
          payment_id: number
          payment_log_id: number
          reason: string | null
          status: string
        }
        Insert: {
          created_at?: string
          meta?: Json | null
          payment_id?: number
          payment_log_id?: number
          reason?: string | null
          status: string
        }
        Update: {
          created_at?: string
          meta?: Json | null
          payment_id?: number
          payment_log_id?: number
          reason?: string | null
          status?: string
        }
        Relationships: []
      }
      real_money_log: {
        Row: {
          amount: number
          created_at: string
          meta: Json | null
          real_money_log_id: number
          reason: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          meta?: Json | null
          real_money_log_id?: number
          reason?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          meta?: Json | null
          real_money_log_id?: number
          reason?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_company_map: {
        Row: {
          company_id: string
          created_at: string
          is_main: boolean | null
          joined_at: string | null
          position: string | null
          user_company_map_id: number
          user_onepy_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          is_main?: boolean | null
          joined_at?: string | null
          position?: string | null
          user_company_map_id?: number
          user_onepy_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          is_main?: boolean | null
          joined_at?: string | null
          position?: string | null
          user_company_map_id?: number
          user_onepy_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_company_map_company_id_company_company_id_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_company_map_user_onepy_id_user_onepy_user_onepy_id_fk"
            columns: ["user_onepy_id"]
            isOneToOne: false
            referencedRelation: "user_onepy"
            referencedColumns: ["user_onepy_id"]
          },
        ]
      }
      user_onepy: {
        Row: {
          certification: Json | null
          created_at: string
          name: string
          nickname: string
          profile_image: string | null
          stats: Json | null
          updated_at: string
          user_onepy_id: string
        }
        Insert: {
          certification?: Json | null
          created_at?: string
          name: string
          nickname: string
          profile_image?: string | null
          stats?: Json | null
          updated_at?: string
          user_onepy_id: string
        }
        Update: {
          certification?: Json | null
          created_at?: string
          name?: string
          nickname?: string
          profile_image?: string | null
          stats?: Json | null
          updated_at?: string
          user_onepy_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
