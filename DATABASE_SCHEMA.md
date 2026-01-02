# Database Schema Documentation

LifeLevels.AI uses Supabase (PostgreSQL) with Row Level Security (RLS) for secure, user-isolated data storage.

## Overview

The database is organized into three main areas:
1. **Core Tables** - User profiles, life levels, entries, and daily tracking
2. **Spiral Dynamics Tables** - Developmental assessment and progression
3. **Integration Tables** - External service connections (Plaid, wearables)

## Entity Relationship Diagram

```
┌──────────────────┐
│   auth.users     │◄──────────────────────────────────────────────┐
│   (Supabase)     │                                               │
└────────┬─────────┘                                               │
         │ 1:1                                                     │
         ▼                                                         │
┌──────────────────┐     1:N     ┌──────────────────┐              │
│     profiles     │◄────────────│   life_levels    │              │
│                  │             │                  │              │
└────────┬─────────┘             └────────┬─────────┘              │
         │                                │                        │
         │ 1:N                            │ 1:N                    │
         │                                ▼                        │
         │                       ┌──────────────────┐              │
         │                       │     entries      │              │
         │                       └──────────────────┘              │
         │                                                         │
         │ 1:N                            │ 1:N                    │
         │                                ▼                        │
         │                       ┌──────────────────┐              │
         │                       │  coach_actions   │              │
         │                       └──────────────────┘              │
         │                                                         │
         ├─────────────────────────────────────────────────────────┤
         │                                                         │
         │ 1:N     ┌──────────────────┐                           │
         ├────────►│   daily_tasks    │                           │
         │         └──────────────────┘                           │
         │                                                         │
         │ 1:N     ┌──────────────────┐                           │
         ├────────►│   supplements    │                           │
         │         └──────────────────┘                           │
         │                                                         │
         │ 1:N     ┌──────────────────┐                           │
         ├────────►│ journal_entries  │                           │
         │         └──────────────────┘                           │
         │                                                         │
         │ 1:N     ┌──────────────────┐                           │
         ├────────►│     streaks      │                           │
         │         └──────────────────┘                           │
         │                                                         │
         │ 1:N     ┌──────────────────┐                           │
         ├────────►│spiral_assessments│                           │
         │         └──────────────────┘                           │
         │                                                         │
         │ 1:1     ┌──────────────────┐                           │
         ├────────►│ spiral_progress  │                           │
         │         └──────────────────┘                           │
         │                                                         │
         │ 1:1     ┌────────────────────────┐                     │
         ├────────►│ spiral_journey_states  │                     │
         │         └────────────────────────┘                     │
         │                                                         │
         │ 1:N     ┌──────────────────┐                           │
         └────────►│  spiral_xp_log   │                           │
                   └──────────────────┘                           │
```

## Extensions

The following PostgreSQL extensions are enabled:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";    -- Cryptographic functions
CREATE EXTENSION IF NOT EXISTS "vector";      -- Vector embeddings for AI
```

## Custom Types

### life_level_category

Enumeration of the 7 life level categories:

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

## Core Tables

### profiles

Extends Supabase auth.users with application-specific user data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, FK → auth.users | User ID from auth |
| email | TEXT | UNIQUE, NOT NULL | User email |
| display_name | TEXT | | Display name |
| avatar_url | TEXT | | Profile picture URL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**RLS Policies:**
- Users can view/update/insert their own profile only

---

### life_levels

Stores goal configurations for each life category per user.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| category | life_level_category | NOT NULL | Category enum |
| goal_jsonb | JSONB | NOT NULL, DEFAULT '{}' | Goal configuration |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Unique Constraint:** (profile_id, category)

**Example goal_jsonb by category:**

```json
// mindset_maturity
{"meditation_minutes": 20, "gratitude_entries": 3, "goal_progress": 80}

// family_relationships
{"quality_time_hours": 2, "communication_score": 8}

// money
{"net_worth": 100000, "savings_rate": 20}

// fitness
{"weight": 180, "body_fat_percentage": 15, "workout_duration": 60}

// health
{"sleep_hours": 8, "sleep_quality": 8, "stress_level": 3}

// skill_building
{"study_hours": 1, "courses_completed": 1}

// fun_joy
{"leisure_hours": 2, "social_activities": 3}
```

---

### entries

Time-series data for tracking metrics per life level.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| level_id | UUID | FK → life_levels, NOT NULL | Parent level |
| ts | TIMESTAMPTZ | DEFAULT NOW() | Entry timestamp |
| metric | JSONB | NOT NULL, DEFAULT '{}' | Metric values |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Indexes:**
- idx_entries_level_id_ts: (level_id, ts DESC)
- idx_entries_ts: (ts DESC)

---

### coach_actions

AI-generated coaching suggestions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| level_id | UUID | FK → life_levels, NOT NULL | Related level |
| ts | TIMESTAMPTZ | DEFAULT NOW() | Suggestion time |
| suggestion | TEXT | NOT NULL | Suggestion text |
| ai_metadata | JSONB | DEFAULT '{}' | AI model info |
| completed | BOOLEAN | DEFAULT FALSE | Completion status |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

---

### daily_tasks

Gamified daily checklist items with points.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| level_id | UUID | FK → life_levels | Optional category link |
| title | TEXT | NOT NULL | Task title |
| description | TEXT | | Task description |
| points | INTEGER | DEFAULT 0 | Points for completion |
| completed | BOOLEAN | DEFAULT FALSE | Completion status |
| due_date | DATE | DEFAULT CURRENT_DATE | Due date |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Indexes:**
- idx_daily_tasks_profile_due: (profile_id, due_date)
- idx_daily_tasks_completed: (completed)

---

### supplements

Supplement tracking with dosage schemas.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| name | TEXT | NOT NULL | Supplement name |
| qty_on_hand | INTEGER | DEFAULT 0 | Current quantity |
| dosage_schema | JSONB | DEFAULT '{}' | Dosage configuration |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

---

### journal_entries

Encrypted personal reflections with AI embeddings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| encrypted_content | TEXT | NOT NULL | AES-256-GCM encrypted |
| sentiment_score | FLOAT | | Sentiment analysis result |
| embedding | VECTOR(1536) | | OpenAI embedding vector |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Indexes:**
- idx_journal_entries_profile_created: (profile_id, created_at DESC)
- idx_journal_entries_embedding: USING ivfflat (embedding vector_cosine_ops)

---

### streaks

Activity streak tracking per category.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| category | life_level_category | NOT NULL | Category |
| current_streak | INTEGER | DEFAULT 0 | Current streak days |
| longest_streak | INTEGER | DEFAULT 0 | All-time longest |
| last_activity_date | DATE | | Last activity date |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Unique Constraint:** (profile_id, category)

---

## Spiral Dynamics Tables

### spiral_assessments

Stores assessment results and level scores.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| primary_level | TEXT | NOT NULL | Primary developmental level |
| secondary_level | TEXT | | Secondary level |
| level_scores | JSONB | DEFAULT '{}' | Scores per level |
| assessment_responses | JSONB | DEFAULT '{}' | Raw responses |
| insights | JSONB | DEFAULT '{}' | Generated insights |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Example level_scores:**
```json
{
  "beige": 10,
  "purple": 25,
  "red": 40,
  "blue": 60,
  "orange": 85,
  "green": 55,
  "yellow": 30,
  "turquoise": 15
}
```

---

### spiral_progress

Current developmental level and progression tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL, UNIQUE | Owner |
| current_level | TEXT | NOT NULL | Current primary level |
| progress_in_level | INTEGER | DEFAULT 0 | 0-100 progress |
| unlocked_levels | TEXT[] | DEFAULT '{}' | Array of unlocked levels |
| level_completion_dates | JSONB | DEFAULT '{}' | Completion timestamps |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

---

### spiral_journey_states

Tracks progress through the 6 Mechanics of Moving Up.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL, UNIQUE | Owner |
| current_step | INTEGER | DEFAULT 1 | Current step (1-6) |
| step_progress | INTEGER | DEFAULT 0 | 0-100 progress |
| readiness_signals | JSONB | DEFAULT '{}' | Readiness indicators |
| problem_pressure_score | INTEGER | DEFAULT 0 | Step 1 score |
| cognitive_bandwidth_score | INTEGER | DEFAULT 100 | Step 2 score |
| window_opportunity_open | BOOLEAN | DEFAULT FALSE | Step 3 status |
| next_level_glimpses_count | INTEGER | DEFAULT 0 | Step 4 count |
| supportive_container_strength | INTEGER | DEFAULT 0 | Step 5 score |
| practice_integration_score | INTEGER | DEFAULT 0 | Step 6 score |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**The 6 Steps:**
1. Problem-Pressure
2. Cognitive Bandwidth
3. Window of Opportunity
4. Glimpse of Next Level
5. Supportive Container
6. Practice & Integration

---

### growth_challenges

Database of developmental challenges per level.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| spiral_level | TEXT | NOT NULL | Target spiral level |
| target_step | INTEGER | NOT NULL | Which of 6 steps |
| challenge_type | TEXT | NOT NULL | Challenge category |
| title | TEXT | NOT NULL | Challenge title |
| description | TEXT | NOT NULL | Challenge description |
| upgrade_tools | JSONB | DEFAULT '[]' | Tools/resources |
| xp_reward | INTEGER | DEFAULT 10 | XP for completion |
| difficulty_level | INTEGER | DEFAULT 1 | 1-5 difficulty |
| estimated_time | TEXT | DEFAULT '15 minutes' | Time estimate |
| success_criteria | JSONB | DEFAULT '{}' | Completion criteria |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**RLS Policy:** Anyone can read active challenges (read-only)

---

### challenge_completions

User challenge completion history.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| challenge_id | UUID | FK → growth_challenges, NOT NULL | Completed challenge |
| completed_at | TIMESTAMPTZ | DEFAULT NOW() | Completion time |
| xp_earned | INTEGER | DEFAULT 0 | XP earned |
| quality_score | INTEGER | | 1-5 quality rating |
| insights | JSONB | DEFAULT '{}' | User insights |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

---

### spiral_xp_log

XP earnings audit trail.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| xp_type | TEXT | NOT NULL | XP category |
| xp_amount | INTEGER | NOT NULL | Amount earned |
| source_type | TEXT | NOT NULL | Source of XP |
| source_id | UUID | | Reference to source |
| spiral_level | TEXT | NOT NULL | Level at earning |
| description | TEXT | | Description |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**XP Types:**
- `foundation` (1× multiplier)
- `growth_edge` (1.5× multiplier)
- `integration` (2× multiplier)
- `mastery` (2.5× multiplier)
- `transition` (5× multiplier)

---

### spiral_achievements

Achievement badges earned by users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| achievement_type | TEXT | NOT NULL | Achievement category |
| achievement_name | TEXT | NOT NULL | Badge name |
| description | TEXT | | Badge description |
| spiral_level | TEXT | | Level context |
| earned_at | TIMESTAMPTZ | DEFAULT NOW() | Earned timestamp |
| metadata | JSONB | DEFAULT '{}' | Additional data |

---

### progression_triggers

Readiness signals for level advancement.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| trigger_type | TEXT | NOT NULL | Trigger category |
| trigger_data | JSONB | DEFAULT '{}' | Trigger details |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| fired_at | TIMESTAMPTZ | | When triggered |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Trigger Types:**
- `problem_pressure`
- `bandwidth_ready`
- `opportunity_window`
- `glimpse_exposure`
- `container_support`
- `integration_complete`

---

### level_transitions

Level change history.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| from_level | TEXT | NOT NULL | Previous level |
| to_level | TEXT | NOT NULL | New level |
| transition_date | TIMESTAMPTZ | DEFAULT NOW() | Transition time |
| preparation_duration | INTERVAL | | Time in preparation |
| integration_score | INTEGER | DEFAULT 0 | Integration quality |
| success_indicators | JSONB | DEFAULT '{}' | Success metrics |
| is_completed | BOOLEAN | DEFAULT FALSE | Completion status |

---

## Integration Tables

### enhanced_coach_suggestions

AI suggestions with Spiral Dynamics integration.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| level_id | UUID | FK → life_levels | Related life level |
| title | TEXT | NOT NULL | Suggestion title |
| description | TEXT | NOT NULL | Full description |
| action_items | JSONB | DEFAULT '[]' | Action steps |
| estimated_time | TEXT | | Time estimate |
| difficulty | TEXT | CHECK ('easy', 'medium', 'hard') | Difficulty |
| impact | TEXT | CHECK ('low', 'medium', 'high') | Impact level |
| spiral_level | TEXT | NOT NULL | Spiral context |
| aqal_quadrant | TEXT | NOT NULL | AQAL quadrant |
| developmental_insight | TEXT | | Growth insight |
| next_level_prep | TEXT | | Next level guidance |
| suggestion_type | TEXT | NOT NULL | Suggestion category |
| completed | BOOLEAN | DEFAULT FALSE | Completion status |
| dismissed | BOOLEAN | DEFAULT FALSE | Dismissed status |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

---

### financial_accounts

Plaid integration for financial tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| plaid_account_id | TEXT | UNIQUE | Plaid account ID |
| account_name | TEXT | NOT NULL | Account name |
| account_type | TEXT | NOT NULL | Account type |
| balance | DECIMAL(12,2) | | Current balance |
| currency | TEXT | DEFAULT 'USD' | Currency code |
| last_synced | TIMESTAMPTZ | | Last sync time |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

---

### wearable_integrations

Fitness tracker connections.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Auto-generated |
| profile_id | UUID | FK → profiles, NOT NULL | Owner |
| provider | TEXT | NOT NULL | Provider name |
| access_token | TEXT | | OAuth access token |
| refresh_token | TEXT | | OAuth refresh token |
| last_synced | TIMESTAMPTZ | | Last sync time |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Unique Constraint:** (profile_id, provider)

**Supported Providers:**
- `fitbit`
- `apple_health`
- `garmin`
- `whoop`
- `oura`

---

## Materialized Views

### dashboard_summary

Pre-computed dashboard metrics for performance.

| Column | Type | Description |
|--------|------|-------------|
| profile_id | UUID | User ID |
| display_name | TEXT | User name |
| overall_score | NUMERIC | Calculated overall score |
| daily_completion_rate | NUMERIC | Today's task completion % |
| max_current_streak | INTEGER | Highest current streak |
| last_updated | TIMESTAMPTZ | View refresh time |

**Refresh:** Every 5 minutes via pg_cron (if enabled)

```sql
SELECT cron.schedule('refresh-dashboard', '*/5 * * * *', 'SELECT refresh_dashboard_summary();');
```

---

## Functions & Triggers

### handle_new_user()

Automatically creates profile and default data on user signup.

```sql
-- Triggered by: AFTER INSERT ON auth.users
-- Creates:
--   1. Profile record
--   2. Default life_levels for all 7 categories
--   3. Default streaks for all categories
--   4. Initial spiral journey state (orange level)
```

### update_updated_at_column()

Automatically updates `updated_at` timestamp on row updates.

Applied to tables:
- profiles
- life_levels
- supplements
- daily_tasks
- journal_entries
- streaks
- financial_accounts
- wearable_integrations
- spiral_journey_states

### initialize_spiral_journey(user_id, primary_level)

Initializes spiral journey state and progress for a user.

```sql
SELECT initialize_spiral_journey('user-uuid', 'orange');
```

### refresh_dashboard_summary()

Refreshes the dashboard_summary materialized view.

```sql
SELECT refresh_dashboard_summary();
```

---

## Row Level Security (RLS)

All tables have RLS enabled. General policy pattern:

```sql
-- User can only access their own data
CREATE POLICY "Users can manage own [table]"
ON [table] FOR ALL
USING (auth.uid() = profile_id);
```

### Special Cases

**entries & coach_actions:**
Access through parent life_levels table:
```sql
USING (auth.uid() = (SELECT profile_id FROM life_levels WHERE id = level_id))
```

**growth_challenges:**
Read-only access for all authenticated users:
```sql
CREATE POLICY "Anyone can read active challenges"
ON growth_challenges FOR SELECT
USING (is_active = true);
```

---

## Indexes

Performance indexes on frequently queried columns:

| Table | Index | Columns |
|-------|-------|---------|
| entries | idx_entries_level_id_ts | (level_id, ts DESC) |
| entries | idx_entries_ts | (ts DESC) |
| coach_actions | idx_coach_actions_level_id | (level_id) |
| coach_actions | idx_coach_actions_completed | (completed) |
| daily_tasks | idx_daily_tasks_profile_due | (profile_id, due_date) |
| daily_tasks | idx_daily_tasks_completed | (completed) |
| journal_entries | idx_journal_entries_profile_created | (profile_id, created_at DESC) |
| journal_entries | idx_journal_entries_embedding | ivfflat (embedding vector_cosine_ops) |
| streaks | idx_streaks_profile_category | (profile_id, category) |
| spiral_assessments | idx_spiral_assessments_profile | (profile_id) |
| spiral_progress | idx_spiral_progress_profile | (profile_id) |
| growth_challenges | idx_growth_challenges_level_step | (spiral_level, target_step) |
| growth_challenges | idx_growth_challenges_active | (is_active) |
| spiral_xp_log | idx_spiral_xp_log_profile | (profile_id) |
| spiral_xp_log | idx_spiral_xp_log_level | (spiral_level) |

---

## Migration Guide

### Applying Schema

1. Create a new Supabase project
2. Navigate to SQL Editor in Supabase Dashboard
3. Copy contents of `supabase/schema.sql`
4. Execute the SQL

### Generating TypeScript Types

```bash
npm run db:generate-types
```

This generates `src/lib/database.types.ts` with TypeScript interfaces.

### Resetting Database (Development)

```bash
npm run db:reset
```

**Warning:** This deletes all data!

---

## Backup & Recovery

### Manual Backup

Use Supabase Dashboard → Database → Backups

### Point-in-Time Recovery

Available on Pro plan and above.

### Export Data

```sql
-- Export all user data
SELECT * FROM profiles WHERE id = 'user-uuid';
SELECT * FROM life_levels WHERE profile_id = 'user-uuid';
SELECT * FROM entries WHERE level_id IN (SELECT id FROM life_levels WHERE profile_id = 'user-uuid');
-- ... repeat for other tables
```

---

## Security Considerations

1. **RLS Enabled:** All tables use Row Level Security
2. **Service Role:** Only backend can bypass RLS
3. **Encryption:** Journal entries use AES-256-GCM
4. **Tokens:** OAuth tokens stored securely, refresh as needed
5. **Audit:** XP log provides activity audit trail
