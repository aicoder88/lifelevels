-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create custom types
CREATE TYPE life_level_category AS ENUM (
  'mindset_maturity',
  'family_relationships', 
  'money',
  'fitness',
  'health',
  'skill_building',
  'fun_joy'
);

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Life levels table
CREATE TABLE life_levels (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category life_level_category NOT NULL,
  goal_jsonb JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, category)
);

-- Entries table for tracking metrics
CREATE TABLE entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  level_id UUID REFERENCES life_levels(id) ON DELETE CASCADE NOT NULL,
  ts TIMESTAMPTZ DEFAULT NOW(),
  metric JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coach actions table for AI suggestions
CREATE TABLE coach_actions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  level_id UUID REFERENCES life_levels(id) ON DELETE CASCADE NOT NULL,
  ts TIMESTAMPTZ DEFAULT NOW(),
  suggestion TEXT NOT NULL,
  ai_metadata JSONB DEFAULT '{}',
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Supplements table
CREATE TABLE supplements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  qty_on_hand INTEGER DEFAULT 0,
  dosage_schema JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily tasks/checklist table
CREATE TABLE daily_tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  level_id UUID REFERENCES life_levels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  points INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  due_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journal entries table (encrypted)
CREATE TABLE journal_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  encrypted_content TEXT NOT NULL,
  sentiment_score FLOAT,
  embedding VECTOR(1536), -- For OpenAI embeddings
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Streaks tracking table
CREATE TABLE streaks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category life_level_category NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, category)
);

-- Spiral Dynamics assessment results
CREATE TABLE spiral_assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  primary_level TEXT NOT NULL,
  secondary_level TEXT,
  level_scores JSONB DEFAULT '{}',
  assessment_responses JSONB DEFAULT '{}',
  insights JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spiral Dynamics progress tracking
CREATE TABLE spiral_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  current_level TEXT NOT NULL,
  progress_in_level INTEGER DEFAULT 0, -- 0-100
  unlocked_levels TEXT[] DEFAULT ARRAY[]::TEXT[],
  level_completion_dates JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- Enhanced coach suggestions with Spiral Dynamics integration
CREATE TABLE enhanced_coach_suggestions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  level_id UUID REFERENCES life_levels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  action_items JSONB DEFAULT '[]',
  estimated_time TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  impact TEXT CHECK (impact IN ('low', 'medium', 'high')),
  spiral_level TEXT NOT NULL,
  aqal_quadrant TEXT NOT NULL,
  developmental_insight TEXT,
  next_level_prep TEXT,
  suggestion_type TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  dismissed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial accounts table (for Plaid integration)
CREATE TABLE financial_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plaid_account_id TEXT UNIQUE,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  balance DECIMAL(12,2),
  currency TEXT DEFAULT 'USD',
  last_synced TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wearable integrations table
CREATE TABLE wearable_integrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL, -- 'fitbit', 'apple_health', 'garmin', etc.
  access_token TEXT,
  refresh_token TEXT,
  last_synced TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, provider)
);

-- Create indexes for better performance
CREATE INDEX idx_entries_level_id_ts ON entries(level_id, ts DESC);
CREATE INDEX idx_entries_ts ON entries(ts DESC);
CREATE INDEX idx_coach_actions_level_id ON coach_actions(level_id);
CREATE INDEX idx_coach_actions_completed ON coach_actions(completed);
CREATE INDEX idx_daily_tasks_profile_due ON daily_tasks(profile_id, due_date);
CREATE INDEX idx_daily_tasks_completed ON daily_tasks(completed);
CREATE INDEX idx_journal_entries_profile_created ON journal_entries(profile_id, created_at DESC);
CREATE INDEX idx_journal_entries_embedding ON journal_entries USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_streaks_profile_category ON streaks(profile_id, category);
CREATE INDEX idx_financial_accounts_profile ON financial_accounts(profile_id);
CREATE INDEX idx_wearable_integrations_profile ON wearable_integrations(profile_id);
CREATE INDEX idx_spiral_assessments_profile ON spiral_assessments(profile_id);
CREATE INDEX idx_spiral_progress_profile ON spiral_progress(profile_id);
CREATE INDEX idx_enhanced_coach_suggestions_profile ON enhanced_coach_suggestions(profile_id);
CREATE INDEX idx_enhanced_coach_suggestions_level ON enhanced_coach_suggestions(level_id);
CREATE INDEX idx_enhanced_coach_suggestions_spiral_level ON enhanced_coach_suggestions(spiral_level);

-- Create materialized view for dashboard performance
CREATE MATERIALIZED VIEW dashboard_summary AS
SELECT 
  p.id as profile_id,
  p.display_name,
  -- Overall scores
  COALESCE(AVG(
    CASE 
      WHEN ll.category = 'mindset_maturity' THEN 
        COALESCE((latest_entries.metric->>'meditation_minutes')::float / NULLIF((ll.goal_jsonb->>'meditation_minutes')::float, 0) * 100, 0)
      WHEN ll.category = 'fitness' THEN 
        COALESCE((latest_entries.metric->>'workout_duration')::float / NULLIF((ll.goal_jsonb->>'workout_duration')::float, 0) * 100, 0)
      WHEN ll.category = 'health' THEN 
        COALESCE((latest_entries.metric->>'sleep_hours')::float / NULLIF((ll.goal_jsonb->>'sleep_hours')::float, 0) * 100, 0)
      ELSE 50 -- Default score
    END
  ), 0) as overall_score,
  -- Task completion rate
  COALESCE(
    (SELECT COUNT(*) FROM daily_tasks dt WHERE dt.profile_id = p.id AND dt.completed = true AND dt.due_date = CURRENT_DATE)::float /
    NULLIF((SELECT COUNT(*) FROM daily_tasks dt WHERE dt.profile_id = p.id AND dt.due_date = CURRENT_DATE), 0) * 100,
    0
  ) as daily_completion_rate,
  -- Current streaks
  COALESCE(MAX(s.current_streak), 0) as max_current_streak,
  -- Last updated
  NOW() as last_updated
FROM profiles p
LEFT JOIN life_levels ll ON ll.profile_id = p.id
LEFT JOIN LATERAL (
  SELECT e.metric
  FROM entries e
  WHERE e.level_id = ll.id
  ORDER BY e.ts DESC
  LIMIT 1
) latest_entries ON true
LEFT JOIN streaks s ON s.profile_id = p.id
GROUP BY p.id, p.display_name;

-- Create unique index on materialized view
CREATE UNIQUE INDEX idx_dashboard_summary_profile ON dashboard_summary(profile_id);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE life_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wearable_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE spiral_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE spiral_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE enhanced_coach_suggestions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Life levels policies
CREATE POLICY "Users can manage own life levels" ON life_levels FOR ALL USING (auth.uid() = profile_id);

-- Entries policies
CREATE POLICY "Users can manage own entries" ON entries FOR ALL USING (
  auth.uid() = (SELECT profile_id FROM life_levels WHERE id = level_id)
);

-- Coach actions policies
CREATE POLICY "Users can manage own coach actions" ON coach_actions FOR ALL USING (
  auth.uid() = (SELECT profile_id FROM life_levels WHERE id = level_id)
);

-- Supplements policies
CREATE POLICY "Users can manage own supplements" ON supplements FOR ALL USING (auth.uid() = profile_id);

-- Daily tasks policies
CREATE POLICY "Users can manage own daily tasks" ON daily_tasks FOR ALL USING (auth.uid() = profile_id);

-- Journal entries policies
CREATE POLICY "Users can manage own journal entries" ON journal_entries FOR ALL USING (auth.uid() = profile_id);

-- Streaks policies
CREATE POLICY "Users can manage own streaks" ON streaks FOR ALL USING (auth.uid() = profile_id);

-- Financial accounts policies
CREATE POLICY "Users can manage own financial accounts" ON financial_accounts FOR ALL USING (auth.uid() = profile_id);

-- Wearable integrations policies
CREATE POLICY "Users can manage own wearable integrations" ON wearable_integrations FOR ALL USING (auth.uid() = profile_id);

-- Spiral assessments policies
CREATE POLICY "Users can manage own spiral assessments" ON spiral_assessments FOR ALL USING (auth.uid() = profile_id);

-- Spiral progress policies
CREATE POLICY "Users can manage own spiral progress" ON spiral_progress FOR ALL USING (auth.uid() = profile_id);

-- Enhanced coach suggestions policies
CREATE POLICY "Users can manage own enhanced coach suggestions" ON enhanced_coach_suggestions FOR ALL USING (auth.uid() = profile_id);

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  
  -- Create default life levels
  INSERT INTO public.life_levels (profile_id, category, goal_jsonb)
  VALUES 
    (NEW.id, 'mindset_maturity', '{"meditation_minutes": 20, "gratitude_entries": 3, "goal_progress": 80}'),
    (NEW.id, 'family_relationships', '{"quality_time_hours": 2, "communication_score": 8}'),
    (NEW.id, 'money', '{"net_worth": 100000, "savings_rate": 20}'),
    (NEW.id, 'fitness', '{"weight": 180, "body_fat_percentage": 15, "workout_duration": 60}'),
    (NEW.id, 'health', '{"sleep_hours": 8, "sleep_quality": 8, "stress_level": 3}'),
    (NEW.id, 'skill_building', '{"study_hours": 1, "courses_completed": 1}'),
    (NEW.id, 'fun_joy', '{"leisure_hours": 2, "social_activities": 3}');
  
  -- Create default streaks
  INSERT INTO public.streaks (profile_id, category, current_streak, longest_streak)
  SELECT NEW.id, category, 0, 0
  FROM unnest(enum_range(NULL::life_level_category)) AS category;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_life_levels_updated_at BEFORE UPDATE ON life_levels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_supplements_updated_at BEFORE UPDATE ON supplements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_tasks_updated_at BEFORE UPDATE ON daily_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_streaks_updated_at BEFORE UPDATE ON streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_accounts_updated_at BEFORE UPDATE ON financial_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wearable_integrations_updated_at BEFORE UPDATE ON wearable_integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_dashboard_summary()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY dashboard_summary;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule materialized view refresh (requires pg_cron extension)
-- SELECT cron.schedule('refresh-dashboard', '*/5 * * * *', 'SELECT refresh_dashboard_summary();');