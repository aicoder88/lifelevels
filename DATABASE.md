# Database Schema Documentation

This document describes the complete database schema for LifeLevels.AI, implemented in Supabase (PostgreSQL).

## Overview

The database consists of 21 tables organized into the following domains:
- **Core User Data**: Profiles, life levels, entries, and daily tasks
- **AI Coaching**: Coach actions and suggestions
- **Journaling**: Encrypted journal entries with vector embeddings
- **Spiral Dynamics**: Assessment, progression, and gamification
- **Integrations**: Financial accounts and wearables

## Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";     -- Encryption functions
CREATE EXTENSION IF NOT EXISTS "vector";       -- Vector embeddings for AI search
```

## Custom Types

```sql
CREATE TYPE life_level_category AS ENUM (
  'mindset_maturity',
  'family_relationships',
  'money',
  'fitness',
  'health',
  'skill_building',
  'fun_joy'
);
```

---

## Core Tables

### profiles

User profiles extending Supabase auth.users.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, references auth.users |
| email | TEXT | User email (unique) |
| display_name | TEXT | Display name |
| avatar_url | TEXT | Avatar image URL |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### life_levels

Configuration for each user's 7 life categories.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| category | life_level_category | Category enum |
| goal_jsonb | JSONB | User's goals for this category |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Unique Constraint**: (profile_id, category)

**Default Goals Structure**:
```json
{
  "mindset_maturity": {
    "meditation_minutes": 20,
    "gratitude_entries": 3,
    "goal_progress": 80
  },
  "fitness": {
    "weight": 180,
    "body_fat_percentage": 15,
    "workout_duration": 60
  }
}
```

### entries

Metric entries tracking progress over time.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| level_id | UUID | References life_levels |
| ts | TIMESTAMPTZ | Entry timestamp |
| metric | JSONB | Metric data (varies by category) |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Indexes**: `(level_id, ts DESC)`, `(ts DESC)`

### daily_tasks

Daily checklist items with points.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| level_id | UUID | References life_levels (optional) |
| title | TEXT | Task title |
| description | TEXT | Task description |
| points | INTEGER | Points earned on completion |
| completed | BOOLEAN | Completion status |
| due_date | DATE | Due date |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes**: `(profile_id, due_date)`, `(completed)`

### streaks

Streak tracking per category.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| category | life_level_category | Category enum |
| current_streak | INTEGER | Current streak count |
| longest_streak | INTEGER | All-time longest streak |
| last_activity_date | DATE | Last activity date |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Unique Constraint**: (profile_id, category)

---

## AI Coaching Tables

### coach_actions

AI-generated suggestions and actions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| level_id | UUID | References life_levels |
| ts | TIMESTAMPTZ | Timestamp |
| suggestion | TEXT | AI suggestion text |
| ai_metadata | JSONB | AI model metadata |
| completed | BOOLEAN | Completion status |
| created_at | TIMESTAMPTZ | Creation timestamp |

### enhanced_coach_suggestions

Enhanced suggestions with Spiral Dynamics integration.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| level_id | UUID | References life_levels |
| title | TEXT | Suggestion title |
| description | TEXT | Full description |
| action_items | JSONB | Array of action items |
| estimated_time | TEXT | Time estimate |
| difficulty | TEXT | easy/medium/hard |
| impact | TEXT | low/medium/high |
| spiral_level | TEXT | Target spiral level |
| aqal_quadrant | TEXT | AQAL quadrant (I/It/We/Its) |
| developmental_insight | TEXT | Growth insight |
| next_level_prep | TEXT | Preparation for next level |
| suggestion_type | TEXT | Type of suggestion |
| completed | BOOLEAN | Completion status |
| dismissed | BOOLEAN | Dismissed status |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

---

## Journaling Tables

### journal_entries

Encrypted journal entries with AI embeddings.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| encrypted_content | TEXT | AES-256-GCM encrypted content |
| sentiment_score | FLOAT | AI sentiment analysis score |
| embedding | VECTOR(1536) | OpenAI text embedding |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes**:
- `(profile_id, created_at DESC)`
- Vector index using ivfflat with cosine distance

### supplements

Supplement tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| name | TEXT | Supplement name |
| qty_on_hand | INTEGER | Current quantity |
| dosage_schema | JSONB | Dosage schedule |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

---

## Spiral Dynamics Tables

### spiral_assessments

Spiral Dynamics assessment results.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| primary_level | TEXT | Primary spiral level |
| secondary_level | TEXT | Secondary level (optional) |
| level_scores | JSONB | Scores per level |
| assessment_responses | JSONB | Raw responses |
| insights | JSONB | AI-generated insights |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### spiral_progress

Current spiral level progress.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles (unique) |
| current_level | TEXT | Current spiral level |
| progress_in_level | INTEGER | 0-100 progress percentage |
| unlocked_levels | TEXT[] | Array of unlocked levels |
| level_completion_dates | JSONB | Completion dates per level |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### spiral_journey_states

6-step progression mechanics tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles (unique) |
| current_step | INTEGER | Current step (1-6) |
| step_progress | INTEGER | 0-100 progress in step |
| readiness_signals | JSONB | Detected readiness signals |
| problem_pressure_score | INTEGER | Problem-Pressure score |
| cognitive_bandwidth_score | INTEGER | Cognitive Bandwidth score |
| window_opportunity_open | BOOLEAN | Window of Opportunity open |
| next_level_glimpses_count | INTEGER | Glimpse count |
| supportive_container_strength | INTEGER | Container strength |
| practice_integration_score | INTEGER | Integration score |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**The 6 Progression Steps**:
1. Problem-Pressure
2. Cognitive Bandwidth
3. Window of Opportunity
4. Glimpse of Next Level
5. Supportive Container
6. Practice & Integration

### growth_challenges

Challenge definitions per spiral level.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| spiral_level | TEXT | Target spiral level |
| target_step | INTEGER | Which of 6 steps this addresses |
| challenge_type | TEXT | Type of challenge |
| title | TEXT | Challenge title |
| description | TEXT | Full description |
| upgrade_tools | JSONB | Tools for upgrade |
| xp_reward | INTEGER | XP earned on completion |
| difficulty_level | INTEGER | 1-5 difficulty |
| estimated_time | TEXT | Time estimate |
| success_criteria | JSONB | Success criteria |
| is_active | BOOLEAN | Active status |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Indexes**: `(spiral_level, target_step)`, `(is_active)`

### challenge_completions

User challenge completion log.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| challenge_id | UUID | References growth_challenges |
| completed_at | TIMESTAMPTZ | Completion timestamp |
| xp_earned | INTEGER | XP earned |
| quality_score | INTEGER | 1-5 quality rating |
| insights | JSONB | Completion insights |
| created_at | TIMESTAMPTZ | Creation timestamp |

### progression_triggers

Readiness detection triggers.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| trigger_type | TEXT | Type: problem_pressure, bandwidth_ready, etc. |
| trigger_data | JSONB | Trigger data |
| is_active | BOOLEAN | Active status |
| fired_at | TIMESTAMPTZ | When trigger fired |
| created_at | TIMESTAMPTZ | Creation timestamp |

### level_transitions

Level transition tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| from_level | TEXT | Previous level |
| to_level | TEXT | New level |
| transition_date | TIMESTAMPTZ | Transition date |
| preparation_duration | INTERVAL | Time in preparation |
| integration_score | INTEGER | Integration quality |
| success_indicators | JSONB | Success indicators |
| is_completed | BOOLEAN | Completion status |

### spiral_xp_log

XP earning log.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| xp_type | TEXT | foundation/growth_edge/integration/mastery/transition |
| xp_amount | INTEGER | XP amount |
| source_type | TEXT | challenge/daily_task/milestone/etc. |
| source_id | UUID | Source reference |
| spiral_level | TEXT | Level when earned |
| description | TEXT | Description |
| created_at | TIMESTAMPTZ | Creation timestamp |

### spiral_achievements

Achievement badges earned.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| achievement_type | TEXT | Type of achievement |
| achievement_name | TEXT | Achievement name |
| description | TEXT | Description |
| spiral_level | TEXT | Related spiral level |
| earned_at | TIMESTAMPTZ | When earned |
| metadata | JSONB | Additional data |

---

## Integration Tables

### financial_accounts

Plaid financial integration.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| plaid_account_id | TEXT | Plaid account ID (unique) |
| account_name | TEXT | Account name |
| account_type | TEXT | Account type |
| balance | DECIMAL(12,2) | Current balance |
| currency | TEXT | Currency code (default: USD) |
| last_synced | TIMESTAMPTZ | Last sync time |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### wearable_integrations

Wearable device integrations.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| profile_id | UUID | References profiles |
| provider | TEXT | fitbit/apple_health/garmin |
| access_token | TEXT | OAuth access token |
| refresh_token | TEXT | OAuth refresh token |
| last_synced | TIMESTAMPTZ | Last sync time |
| is_active | BOOLEAN | Active status |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Unique Constraint**: (profile_id, provider)

---

## Materialized Views

### dashboard_summary

Precomputed dashboard metrics for performance.

| Column | Type | Description |
|--------|------|-------------|
| profile_id | UUID | User ID |
| display_name | TEXT | User display name |
| overall_score | FLOAT | Calculated overall score |
| daily_completion_rate | FLOAT | Today's task completion % |
| max_current_streak | INTEGER | Highest current streak |
| last_updated | TIMESTAMPTZ | Last refresh time |

**Refresh**: Every 5 minutes via pg_cron (if enabled)

---

## Functions

### handle_new_user()

Trigger function for automatic user setup on signup.

Creates:
1. Profile record
2. 7 default life_levels (one per category)
3. 7 default streaks
4. Spiral journey initialization (defaults to Orange level)

### update_updated_at_column()

Trigger function to automatically update `updated_at` timestamps.

### initialize_spiral_journey(user_id, primary_level)

Initializes spiral journey for a user with specified starting level.

### refresh_dashboard_summary()

Refreshes the dashboard_summary materialized view.

---

## Row Level Security

All tables have RLS enabled. Policies ensure users can only access their own data:

```sql
-- Example policy
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can manage own life levels" ON life_levels
  FOR ALL USING (auth.uid() = profile_id);
```

---

## Indexes

The schema includes 35+ indexes for optimal query performance:

- Timestamp-based indexes for time-series queries
- Profile ID indexes for user data isolation
- Completion status indexes for filtering
- Vector indexes for semantic search (journal embeddings)

---

## Migration Guide

### Initial Setup

1. Enable required extensions in Supabase SQL Editor
2. Run the complete `supabase/schema.sql` file
3. Verify RLS policies are active
4. Test with a new user signup to verify triggers

### Generating TypeScript Types

```bash
npm run db:generate-types
```

This generates `src/lib/database.types.ts` from your Supabase schema.

### Database Reset (Development Only)

```bash
npm run db:reset
```

**Warning**: This destroys all data in your database.
