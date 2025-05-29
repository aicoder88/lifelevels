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

// Spiral Dynamics Developmental Levels
export const SPIRAL_DYNAMICS_LEVELS = {
  beige: {
    name: 'Beige (Instinctive)',
    color: '#F5F5DC',
    description: 'Survival: Basic needs, food, water, safety',
    mentality: 'Automatic, reflexive',
    population: '<0.01%',
    theme: 'Stay alive',
    keywords: ['survival', 'instinct', 'basic needs', 'automatic'],
    challenges: ['Physical survival', 'Meeting basic needs'],
    growth_edge: 'Safety and tribal belonging'
  },
  purple: {
    name: 'Purple (Magical/Animistic)',
    color: '#800080',
    description: 'Tribal, Animistic: Ritual, safety in group, magical thinking',
    mentality: 'Animistic, safety via traditions',
    population: '<0.1%',
    theme: 'Keep the spirits happy. Stay safe',
    keywords: ['tribal', 'ritual', 'tradition', 'magical thinking'],
    challenges: ['Group safety', 'Maintaining traditions'],
    growth_edge: 'Personal power and assertiveness'
  },
  red: {
    name: 'Red (Impulsive/Egocentric)',
    color: '#FF0000',
    description: 'Power-driven: Dominance, assertiveness, "might makes right"',
    mentality: 'Egocentric',
    population: '~20% of population, ~5% of influence',
    theme: 'Be powerful, don\'t get controlled',
    keywords: ['power', 'dominance', 'assertiveness', 'ego'],
    challenges: ['Gaining power', 'Avoiding control'],
    growth_edge: 'Order, rules, and higher purpose'
  },
  blue: {
    name: 'Blue (Rules/Order)',
    color: '#0000FF',
    description: 'Authoritarian Order: Religion, structure, right vs wrong',
    mentality: 'Absolutist',
    population: '~40% of population',
    theme: 'Live by the rules for reward later',
    keywords: ['order', 'rules', 'authority', 'right/wrong'],
    challenges: ['Following rules', 'Maintaining order'],
    growth_edge: 'Achievement and strategic thinking'
  },
  orange: {
    name: 'Orange (Achiever)',
    color: '#FFA500',
    description: 'Success-Oriented: Achievement, rationality, capitalism',
    mentality: 'Strategic, scientific',
    population: '~30% of population',
    theme: 'Strive, succeed, win',
    keywords: ['achievement', 'success', 'strategy', 'competition'],
    challenges: ['Achieving goals', 'Winning competition'],
    growth_edge: 'Community and multiple perspectives'
  },
  green: {
    name: 'Green (Sensitive)',
    color: '#008000',
    description: 'Relativistic, Pluralistic: Community, equality, feelings matter',
    mentality: 'Egalitarian, post-modern',
    population: '~15% of population',
    theme: 'All perspectives are valid. Connect and care',
    keywords: ['community', 'equality', 'feelings', 'pluralism'],
    challenges: ['Building consensus', 'Honoring all perspectives'],
    growth_edge: 'Systems thinking and integration'
  },
  yellow: {
    name: 'Yellow (Integral)',
    color: '#FFFF00',
    description: 'Systemic Thinker: Sees all levels as necessary',
    mentality: 'Flex-flow, adaptive, meta-awareness',
    population: '<5% of population',
    theme: 'Live fully, manage complexity, build systems',
    keywords: ['systems', 'integration', 'complexity', 'meta-awareness'],
    challenges: ['Managing complexity', 'Integrating perspectives'],
    growth_edge: 'Holistic consciousness'
  },
  turquoise: {
    name: 'Turquoise (Holistic)',
    color: '#40E0D0',
    description: 'Holistic, Unity-Consciousness: Global empathy, spiritual integration',
    mentality: 'Collective individualism',
    population: '<0.1% of population',
    theme: 'We are all one system',
    keywords: ['unity', 'holistic', 'global', 'spiritual'],
    challenges: ['Global integration', 'Unity consciousness'],
    growth_edge: 'Transpersonal awareness'
  },
  coral: {
    name: 'Coral & Beyond (Speculative)',
    color: '#FF7F50',
    description: 'Unitive/Transpersonal: Not well-formed yet',
    mentality: 'Fully awakened consciousness',
    population: '<0.01% of population',
    theme: 'Fully awakened consciousness',
    keywords: ['unitive', 'transpersonal', 'awakened', 'cosmic'],
    challenges: ['Cosmic consciousness', 'Universal integration'],
    growth_edge: 'Unknown territories'
  }
} as const

// AQAL Framework Quadrants
export const AQAL_QUADRANTS = {
  upper_left: {
    name: 'Upper Left (I)',
    description: 'Personal experience, consciousness, thoughts, feelings',
    focus: 'Individual Interior',
    examples: ['Meditation', 'Self-reflection', 'Emotional awareness', 'Personal values']
  },
  upper_right: {
    name: 'Upper Right (It)',
    description: 'Biology, behavior, observable actions',
    focus: 'Individual Exterior',
    examples: ['Exercise', 'Sleep tracking', 'Nutrition', 'Physical health metrics']
  },
  lower_left: {
    name: 'Lower Left (We)',
    description: 'Culture, shared meaning, relationships',
    focus: 'Collective Interior',
    examples: ['Family relationships', 'Community involvement', 'Shared values', 'Cultural practices']
  },
  lower_right: {
    name: 'Lower Right (Its)',
    description: 'Systems, structures, institutions',
    focus: 'Collective Exterior',
    examples: ['Financial systems', 'Career structures', 'Social institutions', 'Technology']
  }
} as const

// Developmental Lines
export const DEVELOPMENTAL_LINES = {
  cognitive: {
    name: 'Cognitive',
    description: 'Thinking, reasoning, problem-solving abilities',
    stages: ['Concrete', 'Formal', 'Post-formal', 'Meta-systemic']
  },
  emotional: {
    name: 'Emotional',
    description: 'Emotional intelligence and regulation',
    stages: ['Impulsive', 'Self-protective', 'Conformist', 'Conscientious', 'Autonomous']
  },
  moral: {
    name: 'Moral',
    description: 'Ethical reasoning and moral development',
    stages: ['Preconventional', 'Conventional', 'Postconventional', 'Integral']
  },
  interpersonal: {
    name: 'Interpersonal',
    description: 'Relationship skills and social awareness',
    stages: ['Egocentric', 'Ethnocentric', 'Worldcentric', 'Kosmocentric']
  },
  spiritual: {
    name: 'Spiritual',
    description: 'Spiritual awareness and development',
    stages: ['Archaic', 'Magic', 'Mythic', 'Rational', 'Pluralistic', 'Integral', 'Super-integral']
  }
} as const

// Level-specific coaching insights
export const SPIRAL_COACHING_INSIGHTS = {
  red: {
    motivators: ['Power', 'Respect', 'Immediate results', 'Competition'],
    communication_style: 'Direct, assertive, results-focused',
    growth_strategies: [
      'Set clear, achievable power goals',
      'Use competition as motivation',
      'Focus on immediate wins',
      'Respect their need for autonomy'
    ],
    blind_spots: ['Long-term planning', 'Others\' needs', 'Rules and structure'],
    next_level_preparation: 'Introduce structure and rules as tools for greater power'
  },
  blue: {
    motivators: ['Order', 'Purpose', 'Duty', 'Righteousness'],
    communication_style: 'Structured, respectful of authority, purpose-driven',
    growth_strategies: [
      'Align goals with higher purpose',
      'Create structured plans and routines',
      'Emphasize duty and responsibility',
      'Provide clear guidelines and expectations'
    ],
    blind_spots: ['Flexibility', 'Individual differences', 'Innovation'],
    next_level_preparation: 'Introduce strategic thinking and achievement metrics'
  },
  orange: {
    motivators: ['Achievement', 'Success', 'Efficiency', 'Recognition'],
    communication_style: 'Results-oriented, data-driven, competitive',
    growth_strategies: [
      'Set measurable achievement goals',
      'Use data and metrics for motivation',
      'Create competitive challenges',
      'Focus on efficiency and optimization'
    ],
    blind_spots: ['Relationships', 'Meaning beyond success', 'Sustainability'],
    next_level_preparation: 'Introduce community impact and multiple perspectives'
  },
  green: {
    motivators: ['Community', 'Equality', 'Authenticity', 'Harmony'],
    communication_style: 'Collaborative, empathetic, consensus-seeking',
    growth_strategies: [
      'Connect goals to community benefit',
      'Emphasize collaboration and sharing',
      'Honor feelings and relationships',
      'Create inclusive environments'
    ],
    blind_spots: ['Hierarchy', 'Efficiency', 'Difficult decisions'],
    next_level_preparation: 'Introduce systems thinking and healthy hierarchies'
  },
  yellow: {
    motivators: ['Understanding', 'Integration', 'Complexity', 'Flow'],
    communication_style: 'Adaptive, systemic, contextual',
    growth_strategies: [
      'Present complex, systemic challenges',
      'Allow for flexible, adaptive approaches',
      'Integrate multiple perspectives',
      'Focus on natural flow and emergence'
    ],
    blind_spots: ['Impatience with lower levels', 'Over-complexity'],
    next_level_preparation: 'Develop global and holistic awareness'
  },
  turquoise: {
    motivators: ['Unity', 'Global harmony', 'Spiritual integration', 'Wholeness'],
    communication_style: 'Holistic, intuitive, globally aware',
    growth_strategies: [
      'Connect to global and cosmic purposes',
      'Integrate spiritual and material dimensions',
      'Work with natural rhythms and cycles',
      'Focus on collective evolution'
    ],
    blind_spots: ['Practical implementation', 'Individual needs'],
    next_level_preparation: 'Explore transpersonal dimensions'
  }
} as const

// Enhanced coaching prompts with Spiral Dynamics integration
export const ENHANCED_COACH_PROMPTS = {
  ...COACH_PROMPTS,
  spiral_assessment: `Analyze the user's responses, goals, and behaviors to identify their primary Spiral Dynamics level. Look for patterns in their motivations, communication style, and challenges. Provide coaching suggestions that meet them where they are while gently preparing them for the next level of development.`,
  
  level_specific_coaching: {
    red: 'Focus on power, immediate results, and competition. Use direct language and respect their autonomy.',
    blue: 'Emphasize structure, purpose, and doing the right thing. Provide clear guidelines and connect to higher meaning.',
    orange: 'Highlight achievement, success metrics, and efficiency. Use data-driven approaches and competitive elements.',
    green: 'Connect to community impact, relationships, and shared values. Use collaborative and inclusive language.',
    yellow: 'Present systemic challenges and integration opportunities. Allow for complexity and adaptive approaches.',
    turquoise: 'Connect to global purposes and holistic integration. Work with natural flows and collective evolution.'
  },
  
  aqal_integration: `Consider all four AQAL quadrants when providing suggestions:
  - Individual Interior (I): Personal thoughts, feelings, consciousness
  - Individual Exterior (It): Behaviors, biology, observable actions
  - Collective Interior (We): Culture, relationships, shared meaning
  - Collective Exterior (Its): Systems, structures, institutions`
}

// The 6 Mechanics of Moving Up - Core Progression System
export const PROGRESSION_MECHANICS = {
  1: {
    name: 'Problem-Pressure',
    description: 'Life throws challenges your current playbook can\'t solve',
    indicators: [
      'Current strategies aren\'t working',
      'Facing new types of problems',
      'Feeling stuck or frustrated',
      'External pressures increasing'
    ],
    activities: [
      'Identify current limitations',
      'Acknowledge what isn\'t working',
      'Embrace appropriate challenges',
      'Recognize need for growth'
    ]
  },
  2: {
    name: 'Cognitive Bandwidth',
    description: 'Your neural hardware can handle more complexity',
    indicators: [
      'Good sleep and energy levels',
      'Low stress and anxiety',
      'Mental clarity and focus',
      'Emotional stability'
    ],
    activities: [
      'Optimize sleep and health',
      'Manage stress levels',
      'Practice mindfulness',
      'Build mental resilience'
    ]
  },
  3: {
    name: 'Window of Opportunity',
    description: 'You\'re not in survival panic - there\'s bandwidth for exploration',
    indicators: [
      'Feeling safe and secure',
      'Open to new experiences',
      'Curious about possibilities',
      'Ready for change'
    ],
    activities: [
      'Create safe learning spaces',
      'Cultivate curiosity',
      'Embrace experimentation',
      'Stay open to feedback'
    ]
  },
  4: {
    name: 'Glimpse of Next Level',
    description: 'Role-model, book, insight - something lets you taste the next gear',
    indicators: [
      'Exposure to higher-level thinking',
      'Meeting advanced role models',
      'Reading transformative content',
      'Having breakthrough insights'
    ],
    activities: [
      'Seek inspiring role models',
      'Read developmental literature',
      'Attend growth-oriented events',
      'Practice new perspectives'
    ]
  },
  5: {
    name: 'Supportive Container',
    description: 'Mentor, peer group, or culture that doesn\'t punish the new worldview',
    indicators: [
      'Supportive relationships',
      'Growth-oriented community',
      'Safe practice environment',
      'Encouraging feedback'
    ],
    activities: [
      'Find growth-minded peers',
      'Seek mentorship',
      'Join supportive communities',
      'Create practice groups'
    ]
  },
  6: {
    name: 'Practice & Integration',
    description: 'Repeated action until the new values run on autopilot',
    indicators: [
      'Consistent new behaviors',
      'Natural new responses',
      'Integrated worldview',
      'Effortless application'
    ],
    activities: [
      'Daily practice routines',
      'Consistent application',
      'Reflection and adjustment',
      'Celebrate integration'
    ]
  }
} as const

// XP System Configuration
export const XP_SYSTEM = {
  types: {
    foundation: {
      name: 'Foundation XP',
      description: 'Basic level maintenance and stability',
      color: '#6b7280',
      multiplier: 1
    },
    growth_edge: {
      name: 'Growth Edge XP',
      description: 'Activities that stretch current capacity',
      color: '#f59e0b',
      multiplier: 1.5
    },
    integration: {
      name: 'Integration XP',
      description: 'Successfully incorporating new insights',
      color: '#10b981',
      multiplier: 2
    },
    mastery: {
      name: 'Mastery XP',
      description: 'Demonstrating consistent new-level behavior',
      color: '#8b5cf6',
      multiplier: 2.5
    },
    transition: {
      name: 'Transition XP',
      description: 'Successfully moving to next level',
      color: '#ef4444',
      multiplier: 5
    }
  },
  level_thresholds: {
    beige: { min: 0, max: 100 },
    purple: { min: 100, max: 500 },
    red: { min: 500, max: 1500 },
    blue: { min: 1500, max: 3000 },
    orange: { min: 3000, max: 5500 },
    green: { min: 5500, max: 8500 },
    yellow: { min: 8500, max: 12500 },
    turquoise: { min: 12500, max: 20000 },
    coral: { min: 20000, max: Infinity }
  }
} as const

// Challenge Templates for Each Level
export const CHALLENGE_TEMPLATES: Record<string, Array<{
  title: string
  description: string
  type: string
  target_step: number
  xp_reward: number
  difficulty: number
  upgrade_tools: string[]
  estimated_time?: string
}>> = {
  red: [
    {
      title: 'Power Building Challenge',
      description: 'Demonstrate your strength and capability',
      type: 'power_building',
      target_step: 1,
      xp_reward: 50,
      difficulty: 2,
      upgrade_tools: ['martial_arts', 'strength_training', 'assertiveness_practice']
    },
    {
      title: 'Respect Earning Activity',
      description: 'Take action that earns recognition from others',
      type: 'respect_earning',
      target_step: 4,
      xp_reward: 75,
      difficulty: 3,
      upgrade_tools: ['leadership_moments', 'skill_demonstration', 'helping_others']
    }
  ],
  blue: [
    {
      title: 'Structure Creation',
      description: 'Build a system or routine that serves a higher purpose',
      type: 'structure_building',
      target_step: 6,
      xp_reward: 60,
      difficulty: 2,
      upgrade_tools: ['routine_creation', 'organization_systems', 'discipline_tracking']
    },
    {
      title: 'Service to Others',
      description: 'Contribute to something greater than yourself',
      type: 'service',
      target_step: 5,
      xp_reward: 80,
      difficulty: 3,
      upgrade_tools: ['volunteer_work', 'mentoring', 'community_service']
    }
  ],
  orange: [
    {
      title: 'Achievement Goal',
      description: 'Set and accomplish a measurable objective',
      type: 'achievement',
      target_step: 1,
      xp_reward: 70,
      difficulty: 3,
      upgrade_tools: ['goal_setting', 'metrics_tracking', 'optimization']
    },
    {
      title: 'Efficiency Improvement',
      description: 'Optimize a process or system for better results',
      type: 'optimization',
      target_step: 6,
      xp_reward: 65,
      difficulty: 2,
      upgrade_tools: ['process_analysis', 'automation', 'strategic_thinking']
    }
  ],
  green: [
    {
      title: 'Community Building',
      description: 'Strengthen relationships and build connections',
      type: 'community',
      target_step: 5,
      xp_reward: 75,
      difficulty: 3,
      upgrade_tools: ['active_listening', 'empathy_practice', 'conflict_resolution']
    },
    {
      title: 'Consensus Building',
      description: 'Facilitate agreement among diverse perspectives',
      type: 'consensus',
      target_step: 4,
      xp_reward: 85,
      difficulty: 4,
      upgrade_tools: ['facilitation', 'perspective_taking', 'collaborative_decision_making']
    }
  ],
  yellow: [
    {
      title: 'Systems Integration',
      description: 'Connect and integrate multiple complex systems',
      type: 'integration',
      target_step: 6,
      xp_reward: 90,
      difficulty: 4,
      upgrade_tools: ['systems_thinking', 'pattern_recognition', 'complexity_navigation']
    },
    {
      title: 'Meta-Cognitive Practice',
      description: 'Develop awareness of your own thinking processes',
      type: 'meta_cognition',
      target_step: 2,
      xp_reward: 80,
      difficulty: 3,
      upgrade_tools: ['mindfulness', 'self_reflection', 'cognitive_flexibility']
    }
  ]
} as const

// Achievement Badges Configuration
export const ACHIEVEMENT_BADGES = {
  progression: {
    first_step: {
      name: 'First Step',
      description: 'Completed your first progression challenge',
      icon: '🚀',
      xp_bonus: 25
    },
    level_up: {
      name: 'Level Up',
      description: 'Successfully transitioned to a new spiral level',
      icon: '⬆️',
      xp_bonus: 100
    },
    integration_master: {
      name: 'Integration Master',
      description: 'Completed 10 integration challenges',
      icon: '🧩',
      xp_bonus: 150
    }
  },
  consistency: {
    daily_streak_7: {
      name: 'Week Warrior',
      description: '7-day challenge completion streak',
      icon: '🔥',
      xp_bonus: 50
    },
    daily_streak_30: {
      name: 'Month Master',
      description: '30-day challenge completion streak',
      icon: '💪',
      xp_bonus: 200
    }
  },
  mastery: {
    level_mastery: {
      name: 'Level Mastery',
      description: 'Achieved 90%+ progress in current level',
      icon: '👑',
      xp_bonus: 300
    },
    mentor: {
      name: 'Mentor',
      description: 'Helped others in their developmental journey',
      icon: '🤝',
      xp_bonus: 100
    }
  }
} as const

// Readiness Detection Algorithms
export const READINESS_INDICATORS = {
  problem_pressure: {
    high_stress_tasks: { weight: 0.3, threshold: 3 },
    low_completion_rate: { weight: 0.4, threshold: 0.6 },
    repeated_failures: { weight: 0.3, threshold: 2 }
  },
  cognitive_bandwidth: {
    sleep_quality: { weight: 0.3, threshold: 7 },
    stress_level: { weight: 0.4, threshold: 4 },
    energy_level: { weight: 0.3, threshold: 7 }
  },
  window_opportunity: {
    recent_successes: { weight: 0.4, threshold: 2 },
    positive_mood: { weight: 0.3, threshold: 7 },
    available_time: { weight: 0.3, threshold: 30 }
  }
} as const