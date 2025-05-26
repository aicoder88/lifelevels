'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/main-layout'
import { LifeLevelsRadarChart, sampleRadarData } from '@/components/dashboard/radar-chart'
import { ProgressOverview, sampleProgressData } from '@/components/dashboard/progress-overview'
import { DailyChecklist, sampleChecklistData } from '@/components/dashboard/daily-checklist'
import { AICoach, sampleCoachSuggestions } from '@/components/dashboard/ai-coach'
import { TrendingUp, Target, Calendar, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const [checklistItems, setChecklistItems] = useState(sampleChecklistData)
  const [coachSuggestions, setCoachSuggestions] = useState(sampleCoachSuggestions)

  const handleToggleChecklistItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const handleAcceptSuggestion = (id: string) => {
    setCoachSuggestions(suggestions =>
      suggestions.map(suggestion =>
        suggestion.id === id ? { ...suggestion, completed: true } : suggestion
      )
    )
  }

  const handleDismissSuggestion = (id: string) => {
    setCoachSuggestions(suggestions =>
      suggestions.filter(suggestion => suggestion.id !== id)
    )
  }

  const completedTasks = checklistItems.filter(item => item.completed).length
  const totalTasks = checklistItems.length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <MainLayout>
      <div className="min-h-full bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    LifeLevels.AI
                  </h1>
                </div>
                <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="font-medium">{Math.round(completionRate)}% Complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Level 7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-muted-foreground">
            Here's your life overview for today. You're doing great - keep up the momentum!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">74.2</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +2.3 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Daily Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 days</div>
              <p className="text-xs text-muted-foreground">
                Personal best: 28 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tasks Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedTasks}/{totalTasks}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(completionRate)}% complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level 7</div>
              <p className="text-xs text-muted-foreground">
                340/500 XP to Level 8
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Life Levels Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LifeLevelsRadarChart 
                    data={sampleRadarData} 
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* AI Coach */}
            <AICoach
              suggestions={coachSuggestions}
              onAcceptSuggestion={handleAcceptSuggestion}
              onDismissSuggestion={handleDismissSuggestion}
              onGenerateNew={() => {
                // In a real app, this would call an API to generate new suggestions
                console.log('Generating new suggestions...')
              }}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Progress Overview */}
            <ProgressOverview data={sampleProgressData} />

            {/* Daily Checklist */}
            <DailyChecklist
              items={checklistItems}
              onToggleItem={handleToggleChecklistItem}
              onAddItem={() => {
                // In a real app, this would open a modal to add new tasks
                console.log('Adding new task...')
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <span className="text-2xl">📊</span>
              <span className="text-sm">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <span className="text-2xl">🎯</span>
              <span className="text-sm">Set Goals</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <span className="text-2xl">📝</span>
              <span className="text-sm">Journal Entry</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <span className="text-2xl">🤖</span>
              <span className="text-sm">Chat with AI</span>
            </Button>
          </div>
        </div>
      </main>
      </div>
    </MainLayout>
  )
}
