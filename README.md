# LifeLevels.AI

A beautiful, engaging dashboard that scores every "level" of life—Mindset & Maturity, Family/Relationships, Money, Fitness, Health, Skill-Building, Fun & Joy—with the purpose of helping users live a better life that is constantly and never-endingly improving.

**Now featuring Spiral Dynamics integration for personalized developmental coaching!**

## Features

- **Life Level Tracking**: Monitor 7 key areas of life with visual scoring
- **Spiral Dynamics Integration**: Personalized coaching based on your developmental level
- **AQAL Framework**: Holistic development across all dimensions of human experience
- **Beautiful Dashboard**: Radar charts, progress bars, and trend visualizations
- **AI Coach**: Level-specific suggestions tailored to your consciousness
- **Developmental Journey**: Visual progression through levels of human development
- **Daily Checklist**: Gamified task management with points and streaks
- **Progress Analytics**: Track improvements over time with detailed metrics
- **Privacy First**: End-to-end encryption for sensitive data
- **Responsive Design**: Works perfectly on desktop and mobile

## Spiral Dynamics Integration

LifeLevels incorporates the Spiral Dynamics model to provide coaching that meets you exactly where you are in your development:

### Assessment & Identification
- **5-Question Assessment**: Identify your primary developmental level
- **Detailed Results**: Understand your worldview, motivators, and communication style
- **Growth Insights**: Learn about your blind spots and next-level preparation

### Developmental Levels
| Level | Color | Focus |
|-------|-------|-------|
| Red | Power-focused | Immediate results, competitive drive |
| Blue | Structure-oriented | Purpose-driven, rule-based |
| Orange | Achievement-focused | Data-driven, success-oriented |
| Green | Community-centered | Relationship-building, consensus-seeking |
| Yellow | Systems-thinking | Complexity-aware, integrative |
| Turquoise | Holistic | Globally-conscious, unity-focused |

### AQAL Quadrants
- **I (Individual Interior)**: Personal experience, consciousness, meditation
- **It (Individual Exterior)**: Biology, behavior, fitness, health metrics
- **We (Collective Interior)**: Culture, relationships, shared meaning
- **Its (Collective Exterior)**: Systems, structures, financial planning

### Smart Features
- **Level-Specific Coaching**: AI suggestions tailored to your worldview
- **Growth Edge Preparation**: Guidance for advancing to the next level
- **AQAL Integration**: Balanced development across all quadrants
- **Visual Journey Map**: See your progression through all developmental levels

> Learn More: Check out our comprehensive [Spiral Dynamics Guide](SPIRAL_DYNAMICS_GUIDE.md) for detailed explanations and usage instructions.

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | Next.js 15 + React 19 | Fast SSR, App Router, Server Actions |
| **UI/UX** | Tailwind CSS + ShadCN + Radix UI | Beautiful, accessible components |
| **Charts** | Recharts | SVG-based, React-friendly charting |
| **State** | TanStack Query | Server state management |
| **Database** | Supabase (PostgreSQL + RLS) | Real-time, secure, scalable |
| **Auth** | Supabase Auth | Social logins, JWT, row-level security |
| **AI** | OpenAI GPT-4 | Intelligent coaching and insights |
| **Forms** | React Hook Form + Zod | Type-safe form validation |
| **Deployment** | Vercel | Edge functions, preview URLs |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   React     │  │  TanStack   │  │   Local Storage         │ │
│  │ Components  │  │   Query     │  │  (AI Memory, Settings)  │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                     Next.js 15 (App Router)                     │
│  ┌─────────────────────┐  ┌─────────────────────────────────┐  │
│  │   Server Components │  │   API Routes (/api/ai-coach)    │  │
│  │   (Data Fetching)   │  │   (OpenAI Integration)          │  │
│  └─────────────────────┘  └─────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                         Supabase                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │    Auth     │  │  PostgreSQL │  │   Row Level Security    │ │
│  │   (JWT)     │  │  (Database) │  │   (Data Isolation)      │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Authentication Flow
1. User signs up/logs in via Supabase Auth
2. Trigger automatically creates profile + default life levels
3. Row-Level Security restricts data access to owner only
4. JWT tokens managed via cookies (Supabase SSR)

### AI Integration Flow
1. Client stores OpenAI API key in localStorage (user-provided)
2. Requests go to `/api/ai-coach` endpoint
3. GPT-4 generates personalized responses with context
4. Falls back to rule-based logic if AI unavailable

## Quick Start

### Prerequisites

- Node.js 18+
- npm 8+
- Supabase account
- OpenAI API key (optional, for AI features)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd lifelevels
npm install
```

### 2. Environment Setup

Create `.env.local` with your credentials:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI (Optional - for AI features)
OPENAI_API_KEY=your_openai_api_key

# Encryption (Required - generate a 32+ character key)
ENCRYPTION_KEY=your_32_character_encryption_key

# Optional Integrations
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the schema in Supabase SQL Editor:
   ```sql
   -- Copy and paste contents from supabase/schema.sql
   ```
3. Enable Row Level Security in your Supabase dashboard

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dashboard!

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Main dashboard homepage
│   ├── layout.tsx               # Root layout with providers
│   ├── globals.css              # Global styles & design system
│   ├── analytics/page.tsx       # Analytics & trends dashboard
│   ├── calendar/page.tsx        # Calendar view & habit tracking
│   ├── coach/page.tsx           # AI coach interaction page
│   ├── goals/page.tsx           # Goal management page
│   ├── spiral-journey/page.tsx  # Spiral Dynamics progression
│   └── levels/                  # Life level category pages
│       ├── health/page.tsx
│       ├── mindset_maturity/page.tsx
│       └── money/page.tsx
├── components/
│   ├── ui/                      # ShadCN UI components
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── radar-chart.tsx
│   │   ├── progress-overview.tsx
│   │   ├── ai-coach.tsx
│   │   ├── enhanced-ai-coach.tsx
│   │   ├── spiral-dynamics-assessment.tsx
│   │   ├── daily-checklist.tsx
│   │   └── developmental-journey.tsx
│   ├── spiral-journey/          # Spiral Dynamics system
│   │   ├── progression-engine/
│   │   │   ├── step-tracker.tsx
│   │   │   └── challenge-generator.tsx
│   │   └── gamification/
│   │       └── xp-system.tsx
│   ├── layout/
│   │   ├── main-layout.tsx
│   │   └── sidebar.tsx
│   ├── settings/
│   │   └── api-settings.tsx
│   └── providers.tsx
├── lib/
│   ├── supabase.ts              # Supabase client (browser & server)
│   ├── database.types.ts        # TypeScript types for DB
│   ├── constants.ts             # App constants & configurations
│   ├── ai-memory.ts             # Client-side AI memory service
│   ├── openai-service.ts        # OpenAI API wrapper
│   ├── query-client.ts          # React Query configuration
│   └── utils.ts                 # Utility functions
└── api/
    └── ai-coach/route.ts        # AI coach API endpoint
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbo mode) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run db:generate-types` | Generate TypeScript types from Supabase |
| `npm run db:reset` | Reset development database |
| `npm run db:migrate` | Run database migrations |
| `npm run analyze` | Analyze bundle size |

## API Reference

### POST /api/ai-coach
Get coaching advice based on context.

**Request:**
```json
{
  "context": "morning routine planning",
  "currentAction": "meditation",
  "userMessage": "What should I focus on today?"
}
```

**Response:**
```json
{
  "advice": "Based on your morning routine, I recommend...",
  "tokenUsage": {
    "prompt": 150,
    "completion": 100
  }
}
```

### PUT /api/ai-coach
Generate personalized next action.

**Request:**
```json
{
  "schedule": {
    "work_start": "9:00",
    "work_end": "17:00"
  },
  "completedTasks": ["meditation", "workout"],
  "goals": {
    "mindset": 80,
    "fitness": 70
  },
  "streaks": {
    "meditation": 5,
    "workout": 3
  }
}
```

**Response:**
```json
{
  "action": {
    "title": "15-minute reading session",
    "description": "Continue your skill-building streak",
    "type": "skill_building",
    "time": "10:00",
    "priority": "medium",
    "reasoning": "Your skill-building is at 65%, this will help balance your development."
  }
}
```

## Life Level Categories

| Category | Metrics | Color |
|----------|---------|-------|
| **Mindset & Maturity** | meditation_minutes, gratitude_entries, goal_progress | Purple (#8b5cf6) |
| **Family & Relationships** | quality_time_hours, communication_score | Pink (#ec4899) |
| **Money** | net_worth, savings_rate | Green (#22c55e) |
| **Fitness** | weight, body_fat_percentage, workout_duration | Blue (#3b82f6) |
| **Health** | sleep_hours, sleep_quality, stress_level | Red (#ef4444) |
| **Skill Building** | study_hours, courses_completed | Indigo (#6366f1) |
| **Fun & Joy** | leisure_hours, social_activities | Yellow (#eab308) |

## Testing

The project uses Jest and React Testing Library for testing.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

```
__tests__/
├── components/           # Component tests
├── lib/                  # Utility function tests
└── api/                  # API route tests
```

## Security & Privacy

- **Row Level Security**: All data protected by Supabase RLS policies
- **End-to-End Encryption**: Journal entries encrypted (AES-256-GCM)
- **Data Ownership**: Users own their data, can export/delete anytime
- **Privacy Controls**: Granular settings for AI data sharing
- **No URL Parameters**: Sensitive data never exposed in URLs

## Data Model

See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for complete documentation.

### Core Tables
- **profiles**: User profiles (extends auth.users)
- **life_levels**: 7 categories with JSONB goals per user
- **entries**: Time-series metric data
- **streaks**: Activity streak tracking
- **daily_tasks**: Gamified checklist items
- **journal_entries**: Encrypted reflections

### Spiral Dynamics Tables
- **spiral_assessments**: Assessment results & scores
- **spiral_progress**: Current level & progression
- **spiral_journey_states**: 6-step mechanic tracking
- **growth_challenges**: Level-specific challenges
- **spiral_xp_log**: XP earnings history
- **spiral_achievements**: Badge tracking

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Deployment

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Related Documentation

- [Spiral Dynamics Guide](SPIRAL_DYNAMICS_GUIDE.md)
- [Database Schema](DATABASE_SCHEMA.md)
- [Spiral Progression Implementation](SPIRAL_PROGRESSION_IMPLEMENTATION.md)
- [Spiral Progression Plan](SPIRAL_PROGRESSION_PLAN.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Recharts](https://recharts.org/) for data visualization
- [Radix UI](https://www.radix-ui.com/) for accessible components

---

**Built for better living through data-driven insights**

For questions or support, please open an issue or contact the development team.
