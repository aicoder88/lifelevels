# LifeLevels.AI 🚀

A beautiful, engaging dashboard that scores every "level" of life—Mindset & Maturity, Family/Relationships, Money, Fitness, Health, Skill-Building, Fun & Joy—with the purpose of helping users live a better life that is constantly and never-endingly improving.

**🌀 Now featuring Spiral Dynamics integration for personalized developmental coaching!**

## ✨ Features

- **🎯 Life Level Tracking**: Monitor 7 key areas of life with visual scoring
- **🌀 Spiral Dynamics Integration**: Personalized coaching based on your developmental level
- **🧩 AQAL Framework**: Holistic development across all dimensions of human experience
- **📊 Beautiful Dashboard**: Radar charts, progress bars, and trend visualizations
- **🤖 AI Coach**: Level-specific suggestions tailored to your consciousness
- **🗺️ Developmental Journey**: Visual progression through levels of human development
- **✅ Daily Checklist**: Gamified task management with points and streaks
- **📈 Progress Analytics**: Track improvements over time with detailed metrics
- **🔒 Privacy First**: End-to-end encryption for sensitive data
- **📱 Responsive Design**: Works perfectly on desktop and mobile

## 🌀 Spiral Dynamics Integration

LifeLevels now incorporates the groundbreaking Spiral Dynamics model to provide coaching that meets you exactly where you are in your development:

### 🎯 Assessment & Identification
- **5-Question Assessment**: Identify your primary developmental level
- **Detailed Results**: Understand your worldview, motivators, and communication style
- **Growth Insights**: Learn about your blind spots and next-level preparation

### 🎨 Developmental Levels
- **🔴 Red**: Power-focused, immediate results, competitive drive
- **🔵 Blue**: Structure-oriented, purpose-driven, rule-based
- **🟠 Orange**: Achievement-focused, data-driven, success-oriented
- **🟢 Green**: Community-centered, relationship-building, consensus-seeking
- **🟡 Yellow**: Systems-thinking, complexity-aware, integrative
- **🔵 Turquoise**: Holistic, globally-conscious, unity-focused

### 🧩 AQAL Quadrants
- **🧠 I (Individual Interior)**: Personal experience, consciousness, meditation
- **⚡ It (Individual Exterior)**: Biology, behavior, fitness, health metrics
- **👥 We (Collective Interior)**: Culture, relationships, shared meaning
- **🌐 Its (Collective Exterior)**: Systems, structures, financial planning

### 🚀 Smart Features
- **Level-Specific Coaching**: AI suggestions tailored to your worldview
- **Growth Edge Preparation**: Guidance for advancing to the next level
- **AQAL Integration**: Balanced development across all quadrants
- **Visual Journey Map**: See your progression through all developmental levels

> 📖 **Learn More**: Check out our comprehensive [Spiral Dynamics Guide](SPIRAL_DYNAMICS_GUIDE.md) for detailed explanations and usage instructions.

## 🛠 Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | Next.js 15 + React 19 | Fast SSR, App Router, Server Actions |
| **UI/UX** | Tailwind CSS + ShadCN + Radix UI | Beautiful, accessible components |
| **Charts** | Recharts | SVG-based, React-friendly charting |
| **State** | TanStack Query | Server state management |
| **Database** | Supabase (PostgreSQL + RLS) | Real-time, secure, scalable |
| **Auth** | Supabase Auth | Social logins, JWT, row-level security |
| **AI** | OpenAI GPT-4 | Intelligent coaching and insights |
| **Deployment** | Vercel | Edge functions, preview URLs |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account
- OpenAI API key (optional, for AI features)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd lifelevels
npm install
```

### 2. Environment Setup

Copy `.env.local` and fill in your credentials:

```bash
cp .env.local .env.local.example
```

Required environment variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI (optional)
OPENAI_API_KEY=your_openai_api_key

# Encryption (generate a 32-character key)
ENCRYPTION_KEY=your_32_character_encryption_key
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

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles and design system
├── components/
│   ├── ui/                # Reusable UI components (ShadCN style)
│   ├── dashboard/         # Dashboard-specific components
│   └── providers.tsx      # React Query and other providers
├── lib/
│   ├── supabase.ts        # Supabase client configuration
│   ├── database.types.ts  # TypeScript types for database
│   ├── constants.ts       # App constants and configurations
│   ├── utils.ts           # Utility functions
│   └── query-client.ts    # React Query configuration
└── ...
```

## 🎨 Design System

### Life Level Categories

1. **🧠 Mindset & Maturity** - Personal growth, emotional intelligence
2. **❤️ Family & Relationships** - Quality time, communication, connections
3. **💰 Money** - Financial health, wealth building, money management
4. **💪 Fitness** - Physical strength, endurance, body composition
5. **🏥 Health** - Overall wellness, sleep, stress management
6. **📚 Skill Building** - Learning, professional development
7. **🎉 Fun & Joy** - Recreation, hobbies, life enjoyment

### Color Palette

Each life level has its own color scheme for visual consistency:
- Mindset: Purple (`#8b5cf6`)
- Relationships: Pink (`#ec4899`)
- Money: Green (`#22c55e`)
- Fitness: Blue (`#3b82f6`)
- Health: Red (`#ef4444`)
- Skills: Indigo (`#6366f1`)
- Fun: Yellow (`#eab308`)

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Adding New Features

1. **New Life Level Metrics**: Update `database.types.ts` and add to constants
2. **New Dashboard Components**: Create in `components/dashboard/`
3. **New Pages**: Add to `app/` directory using App Router
4. **Database Changes**: Update `supabase/schema.sql` and run migrations

## 🔒 Security & Privacy

- **Row Level Security**: All data is protected by Supabase RLS policies
- **End-to-End Encryption**: Journal entries are encrypted client-side
- **Data Ownership**: Users own their data, can export/delete anytime
- **Privacy Controls**: Granular settings for AI data sharing

## 🤖 AI Features

The AI coach analyzes your data to provide:
- Personalized habit suggestions
- Goal optimization recommendations
- Trend analysis and insights
- Motivational content
- Progress celebration

AI features require an OpenAI API key and user consent.

## 📊 Data Model

### Core Tables

- **profiles**: User profiles and settings
- **life_levels**: Categories and goals for each user
- **entries**: Time-series data for all metrics
- **coach_actions**: AI-generated suggestions and actions
- **daily_tasks**: Gamified daily checklist items
- **journal_entries**: Encrypted personal reflections

### Integrations

- **Plaid**: Financial account syncing
- **Wearables**: Fitness tracker integration
- **Calendar**: Schedule and time tracking

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Recharts](https://recharts.org/) for beautiful data visualization
- [Radix UI](https://www.radix-ui.com/) for accessible components

---

**Built with ❤️ for better living through data-driven insights**

For questions or support, please open an issue or contact the development team.
