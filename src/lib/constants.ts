import { LifeLevelCategory } from './database.types'

export const LIFE_LEVEL_CATEGORIES: Record<LifeLevelCategory, {
  label: string
  description: string
  icon: string
  color: string
  defaultGoals: Record<string, number>
}> = {
  mindset_maturity: {
    label: 'Mindset & Maturity',
    description: 'Personal growth, emotional intelligence, and mental resilience',
    icon: '🧠',
    color: 'purple',
    defaultGoals: {
      meditation_minutes: 20,
      gratitude_entries: 3,
      goal_progress: 80,
      self_reflection_score: 8,
      growth_mindset_score: 8
    }
  },
  family_relationships: {
    label: 'Family & Relationships',
    description: 'Quality time, communication, and meaningful connections',
    icon: '❤️',
    color: 'pink',
    defaultGoals: {
      quality_time_hours: 2,
      communication_score: 8,
      conflict_resolution_score: 8,
      intimacy_score: 8
    }
  },
  money: {
    label: 'Money',
    description: 'Financial health, wealth building, and money management',
    icon: '💰',
    color: 'green',
    defaultGoals: {
      net_worth: 100000,
      savings_rate: 20,
      investment_return: 8
    }
  },
  fitness: {
    label: 'Fitness',
    description: 'Physical strength, endurance, and body composition',
    icon: '💪',
    color: 'blue',
    defaultGoals: {
      weight: 180,
      body_fat_percentage: 15,
      workout_duration: 60,
      calories_burned: 500
    }
  },
  health: {
    label: 'Health',
    description: 'Overall wellness, sleep, stress management, and vitality',
    icon: '🏥',
    color: 'red',
    defaultGoals: {
      sleep_hours: 8,
      sleep_quality: 8,
      stress_level: 3,
      energy_level: 8,
      mood_score: 8
    }
  },
  skill_building: {
    label: 'Skill Building',
    description: 'Learning, professional development, and expertise growth',
    icon: '📚',
    color: 'indigo',
    defaultGoals: {
      study_hours: 1,
      courses_completed: 1,
      practice_sessions: 5,
      skill_level: 8
    }
  },
  fun_joy: {
    label: 'Fun & Joy',
    description: 'Recreation, hobbies, adventures, and life enjoyment',
    icon: '🎉',
    color: 'yellow',
    defaultGoals: {
      leisure_hours: 2,
      social_activities: 3,
      hobbies_time: 1,
      adventure_score: 7,
      creativity_score: 7
    }
  }
}

export const SCORE_RANGES = {
  EXCELLENT: { min: 90, max: 100, label: 'Excellent', color: 'green' },
  GOOD: { min: 80, max: 89, label: 'Good', color: 'blue' },
  FAIR: { min: 70, max: 79, label: 'Fair', color: 'yellow' },
  NEEDS_IMPROVEMENT: { min: 60, max: 69, label: 'Needs Improvement', color: 'orange' },
  POOR: { min: 0, max: 59, label: 'Poor', color: 'red' }
}

export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  light: '#f8fafc',
  dark: '#1e293b'
}

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500
}

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

export const API_ENDPOINTS = {
  openai: 'https://api.openai.com/v1',
  plaid: {
    sandbox: 'https://sandbox.plaid.com',
    development: 'https://development.plaid.com',
    production: 'https://production.plaid.com'
  }
}

export const ENCRYPTION_CONFIG = {
  algorithm: 'aes-256-gcm',
  keyLength: 32,
  ivLength: 16,
  tagLength: 16
}

export const COACH_PROMPTS = {
  system: `You are a personal life coach AI for LifeLevels.AI. Your role is to analyze user data across 7 life categories and provide actionable, personalized suggestions for improvement. Always be encouraging, specific, and practical in your recommendations.`,
  
  categories: {
    mindset_maturity: 'Focus on mental resilience, emotional intelligence, and personal growth habits.',
    family_relationships: 'Emphasize communication, quality time, and relationship building activities.',
    money: 'Provide financial planning, budgeting, and wealth-building strategies.',
    fitness: 'Suggest workout routines, exercise progressions, and physical activity goals.',
    health: 'Recommend wellness practices, sleep optimization, and stress management techniques.',
    skill_building: 'Propose learning paths, skill development activities, and knowledge acquisition strategies.',
    fun_joy: 'Encourage recreational activities, hobbies, and life enjoyment practices.'
  }
}

export const DEFAULT_DASHBOARD_LAYOUT = {
  radar: { x: 0, y: 0, w: 6, h: 4 },
  progress: { x: 6, y: 0, w: 6, h: 2 },
  trends: { x: 6, y: 2, w: 6, h: 2 },
  checklist: { x: 0, y: 4, w: 4, h: 4 },
  coach: { x: 4, y: 4, w: 8, h: 4 }
}

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const

export const LOCAL_STORAGE_KEYS = {
  THEME: 'lifelevels-theme',
  DASHBOARD_LAYOUT: 'lifelevels-dashboard-layout',
  USER_PREFERENCES: 'lifelevels-user-preferences'
} as const