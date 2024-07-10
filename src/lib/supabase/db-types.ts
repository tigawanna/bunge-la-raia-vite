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
      admin: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          embedding: string | null
          gps: unknown | null
          id: number
          name: string
          user_id: string
          vibe_check: Json | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          embedding?: string | null
          gps?: unknown | null
          id?: number
          name: string
          user_id?: string
          vibe_check?: Json | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          embedding?: string | null
          gps?: unknown | null
          id?: number
          name?: string
          user_id?: string
          vibe_check?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          embedding: string | null
          gps: unknown | null
          id: number
          name: string
          period: string
          user_id: string
          vibe_check: Json | null
          vying_for: Database["public"]["Enums"]["positions"]
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          embedding?: string | null
          gps?: unknown | null
          id?: number
          name: string
          period: string
          user_id?: string
          vibe_check?: Json | null
          vying_for: Database["public"]["Enums"]["positions"]
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          embedding?: string | null
          gps?: unknown | null
          id?: number
          name?: string
          period?: string
          user_id?: string
          vibe_check?: Json | null
          vying_for?: Database["public"]["Enums"]["positions"]
        }
        Relationships: [
          {
            foreignKeyName: "candidate_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      constituencies: {
        Row: {
          county_id: number | null
          created_at: string
          gps: unknown | null
          id: number
          name: string
        }
        Insert: {
          county_id?: number | null
          created_at?: string
          gps?: unknown | null
          id?: number
          name: string
        }
        Update: {
          county_id?: number | null
          created_at?: string
          gps?: unknown | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "constituencies_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      counties: {
        Row: {
          created_at: string
          gps: unknown | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          gps?: unknown | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          gps?: unknown | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      mps: {
        Row: {
          contituency_id: number | null
          created_at: string
          from: string
          id: number
          name: string
          to: string | null
        }
        Insert: {
          contituency_id?: number | null
          created_at?: string
          from: string
          id?: number
          name: string
          to?: string | null
        }
        Update: {
          contituency_id?: number | null
          created_at?: string
          from?: string
          id?: number
          name?: string
          to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mps_contituency_id_fkey"
            columns: ["contituency_id"]
            isOneToOne: false
            referencedRelation: "constituencies"
            referencedColumns: ["id"]
          },
        ]
      }
      raia: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          embedding: string | null
          gps: unknown | null
          id: number
          name: string
          user_id: string
          vibe_check: Json | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          embedding?: string | null
          gps?: unknown | null
          id?: number
          name: string
          user_id?: string
          vibe_check?: Json | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          embedding?: string | null
          gps?: unknown | null
          id?: number
          name?: string
          user_id?: string
          vibe_check?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "raia_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      wards: {
        Row: {
          constituency_id: number
          created_at: string
          gps: unknown | null
          id: number
          name: string
        }
        Insert: {
          constituency_id: number
          created_at?: string
          gps?: unknown | null
          id?: number
          name: string
        }
        Update: {
          constituency_id?: number
          created_at?: string
          gps?: unknown | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "wards_constituency_id_fkey"
            columns: ["constituency_id"]
            isOneToOne: false
            referencedRelation: "constituencies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      positions: "mca" | "mp" | "governor" | "president"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
