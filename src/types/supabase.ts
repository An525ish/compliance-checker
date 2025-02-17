// src/types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          mfa_enabled: boolean
          last_login: string | null
        }
        Insert: {
          id?: string
          email: string
          mfa_enabled?: boolean
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          mfa_enabled?: boolean
          last_login?: string | null
        }
      }
      tables: {
        Row: {
          id: string
          name: string
          schema: string
          rls_enabled: boolean
          created_at: string
        }
        Insert: {
          name: string
          schema: string
          rls_enabled?: boolean
        }
        Update: {
          name?: string
          schema?: string
          rls_enabled?: boolean
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          pitr_enabled: boolean
          last_backup: string | null
          created_at: string
        }
        Insert: {
          name: string
          pitr_enabled?: boolean
          last_backup?: string | null
        }
        Update: {
          name?: string
          pitr_enabled?: boolean
          last_backup?: string | null
        }
      }
      compliance_logs: {
        Row: {
          id: string
          check_type: string
          status: string
          details: Json
          created_at: string
        }
        Insert: {
          check_type: string
          status: string
          details: Json
        }
        Update: {
          check_type?: string
          status?: string
          details?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rls_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          has_rls: boolean
        }[]
      }
      get_pitr_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          project_name: string
          has_pitr: boolean
          last_backup: string | null
        }[]
      }
    }
    Enums: {
      compliance_status: 'passing' | 'failing' | 'checking' | 'unknown'
    }
  }
}