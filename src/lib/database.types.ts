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
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      life_levels: {
        Row: {
          id: string
          profile_id: string
          category: LifeLevelCategory
          goal_jsonb: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          category: LifeLevelCategory
          goal_jsonb: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          category?: LifeLevelCategory
          goal_jsonb?: Json
          created_at?: string
          updated_at?: string
        }
      }
      entries: {
        Row: {
          id: string
          level_id: string
          ts: string
          metric: Json
          created_at: string
        }
        Insert: {
          id?: string
          level_id: string
          ts?: string
          metric: Json
          created_at?: string
        }
        Update: {
          id?: string
          level_id?: string
          ts?: string
          metric?: Json
          created_at?: string
        }
      }
      coach_actions: {
        Row: {
          id: string
          level_id: string
          ts: string
          suggestion: string
          ai_metadata: Json
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          level_id: string
          ts?: string
          suggestion: string
          ai_metadata?: Json
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          level_id?: string
          ts?: string
          suggestion?: string
          ai_metadata?: Json
          completed?: boolean
          created_at?: string
        }
      }
      supplements: {
        Row: {
          id: string
          profile_id: string
          name: string
          qty_on_hand: number
          dosage_schema: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          name: string
          qty_on_hand: number
          dosage_schema: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          name?: string
          qty_on_hand?: number
          dosage_schema?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      life_level_category: LifeLevelCategory
    }
  }
}

export type LifeLevelCategory = 
  | 'mindset_maturity'
  | 'family_relationships'
  | 'money'
  | 'fitness'
  | 'health'
  | 'skill_building'
  | 'fun_joy'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type LifeLevel = Database['public']['Tables']['life_levels']['Row']
export type Entry = Database['public']['Tables']['entries']['Row']
export type CoachAction = Database['public']['Tables']['coach_actions']['Row']
export type Supplement = Database['public']['Tables']['supplements']['Row']

// Specific metric types for different categories
export interface FitnessMetrics {
  weight?: number
  body_fat_percentage?: number
  muscle_mass?: number
  hrv?: number
  resting_heart_rate?: number
  workout_duration?: number
  calories_burned?: number
}

export interface MoneyMetrics {
  net_worth?: number
  income?: number
  expenses?: number
  savings_rate?: number
  investment_return?: number
}

export interface HealthMetrics {
  sleep_hours?: number
  sleep_quality?: number
  stress_level?: number
  energy_level?: number
  mood_score?: number
}

export interface RelationshipMetrics {
  quality_time_hours?: number
  communication_score?: number
  conflict_resolution_score?: number
  intimacy_score?: number
}

export interface SkillMetrics {
  study_hours?: number
  courses_completed?: number
  certifications_earned?: number
  practice_sessions?: number
  skill_level?: number
}

export interface MindsetMetrics {
  meditation_minutes?: number
  gratitude_entries?: number
  goal_progress?: number
  self_reflection_score?: number
  growth_mindset_score?: number
}

export interface FunMetrics {
  leisure_hours?: number
  social_activities?: number
  hobbies_time?: number
  adventure_score?: number
  creativity_score?: number
}