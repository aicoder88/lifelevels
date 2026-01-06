'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/main-layout'
import { APISettings } from '@/components/settings/api-settings'
import { aiMemory } from '@/lib/ai-memory'
import { Sparkles, Clock, Settings, CheckCircle2, ArrowRight, X } from 'lucide-react'

interface NextAction {
  id: string
  title: string
  description: string
  type: 'urgent' | 'important' | 'routine'
  estimatedTime: string
  category: string
  priority: number
  reasoning: string
}

interface Streak {
  current: number
  longest: number
  lastActivity: Date
}

interface UserContext {
  currentTime: Date
  timeOfDay: string
  isWorkDay: boolean
  completedToday: string[]
  schedule: {
    wakeTime: string
    sleepTime: string
    workStart: string
    workEnd: string
    workDays: string[]
  }
  supplements: Array<{
    name: string
    dosage: string
    timing: string
    lastTaken?: Date
  }>
  goals: Record<string, {
    target: string | number
    current: string | number
    deadline?: Date
    priority: number
  }>
  streaks: Record<string, Streak>
}

export default function SimplifiedHomePage() {
  const [nextAction, setNextAction] = useState<NextAction | null>(null)
  const [userContext, setUserContext] = useState<UserContext | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  // Get personalized greeting
  const getGreeting = () => {
    if (!userContext) return "Hello! 👋"
    
    const { timeOfDay } = userContext
    const greetings: Record<string, string> = {
      morning: "Good morning! 🌅",
      afternoon: "Good afternoon! ☀️",
      evening: "Good evening! 🌆",
      night: "Good night! 🌙"
    }
    return greetings[timeOfDay] || "Hello! 👋"
  }

  // Complete an action
  const completeAction = async (actionId: string) => {
    // Update AI memory
    aiMemory.completeAction(actionId)
    
    // Get new context and next action
    const context = aiMemory.getCurrentContext()
    const newAction = await aiMemory.determineNextAction()
    
    setUserContext(context)
    setNextAction(newAction)
  }

  // Initialize on component mount
  useEffect(() => {
    const initializeApp = async () => {
      // Get current context from AI memory
      const context = aiMemory.getCurrentContext()
      setUserContext(context)
      
      // Get the next action
      const action = await aiMemory.determineNextAction()
      setNextAction(action)
      setIsLoading(false)
    }
    
    initializeApp()
  }, [])

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(async () => {
      const context = aiMemory.getCurrentContext()
      setUserContext(context)
      
      // Check if we need a new action (time-sensitive actions)
      if (nextAction) {
        const newAction = await aiMemory.determineNextAction()
        if (newAction.id !== nextAction.id) {
          setNextAction(newAction)
        }
      }
    }, 60000)
    
    return () => clearInterval(interval)
  }, [nextAction])

  // Reset daily actions at midnight
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date()
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        aiMemory.resetDailyActions()
        // Refresh context
        const context = aiMemory.getCurrentContext()
        setUserContext(context)
      }
    }

    const interval = setInterval(checkMidnight, 60000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Analyzing your day...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  LifeLevels.AI
                </h1>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{userContext?.currentTime?.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  }) || new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Settings</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-6">
                <APISettings />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            {/* Greeting */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">{getGreeting()}</h2>
              <p className="text-muted-foreground text-lg">
                {userContext?.timeOfDay === 'morning' && "Let's start your day with intention"}
                {userContext?.timeOfDay === 'afternoon' && "Keep the momentum going"}
                {userContext?.timeOfDay === 'evening' && "Time to wind down and reflect"}
                {userContext?.timeOfDay === 'night' && "Rest well, tomorrow is a new day"}
                {!userContext?.timeOfDay && "Ready to make progress?"}
              </p>
            </div>

            {/* Next Action Card */}
            {nextAction && (
              <Card className="mb-8 border-2 border-primary/20 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">What to do right now</CardTitle>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      nextAction.type === 'urgent' ? 'bg-red-100 text-red-700' :
                      nextAction.type === 'important' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {nextAction.type}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{nextAction.title}</h3>
                    <p className="text-muted-foreground text-lg">{nextAction.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{nextAction.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="capitalize">{nextAction.category.replace('_', ' ')}</span>
                    </div>
                  </div>
                  
                  {/* AI Reasoning */}
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Why now:</span> {nextAction.reasoning}
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      size="lg" 
                      className="w-full text-lg py-6"
                      onClick={() => completeAction(nextAction.id)}
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Complete This Action
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Progress Summary */}
            <div className="text-center text-muted-foreground">
              <p className="text-sm">
                {userContext?.completedToday?.length || 0} actions completed today
              </p>
              <div className="flex justify-center gap-2 mt-2">
                {Array.from({ length: Math.min(userContext?.completedToday?.length || 0, 10) }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-primary rounded-full"></div>
                ))}
              </div>
              
              {/* Current Streaks */}
              {userContext?.streaks && Object.keys(userContext.streaks).length > 0 && (
                <div className="mt-4 flex justify-center gap-4 text-xs">
                  {Object.entries(userContext.streaks).slice(0, 3).map(([category, streak]: [string, Streak]) => (
                    <div key={category} className="flex items-center gap-1">
                      <span className="capitalize">{category.replace('_', ' ')}</span>
                      <span className="font-medium">{streak.current}🔥</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}
