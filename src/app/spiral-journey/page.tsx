'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SpiralDynamicsAssessment } from '@/components/dashboard/spiral-dynamics-assessment'
import { DevelopmentalJourney, sampleJourneyData } from '@/components/dashboard/developmental-journey'
import { EnhancedAICoach, enhancedSampleCoachSuggestions } from '@/components/dashboard/enhanced-ai-coach'
import { SPIRAL_DYNAMICS_LEVELS } from '@/lib/constants'
import { Brain, TrendingUp, Target, Users, Sparkles, BarChart3 } from 'lucide-react'

interface AssessmentResults {
  primaryLevel: string
  levelInfo: {
    color: string
    name: string
    theme: string
    description: string
  }
  coaching: {
    motivators: readonly string[]
    growth_strategies: readonly string[]
    next_level_preparation: string
    communication_style: string
  }
}

export default function SpiralJourneyPage() {
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false)
  const [userSpiralLevel, setUserSpiralLevel] = useState<string>('orange')
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null)
  const [activeTab, setActiveTab] = useState<'assessment' | 'journey' | 'coaching' | 'insights'>('assessment')

  const handleAssessmentComplete = (primaryLevel: string, secondaryLevel: string, insights: AssessmentResults) => {
    setUserSpiralLevel(primaryLevel)
    setAssessmentResults(insights)
    setHasCompletedAssessment(true)
    setActiveTab('journey')
  }

  const handleAcceptSuggestion = (id: string) => {
    console.log('Accepted suggestion:', id)
    // Here you would typically update the suggestion status in your backend
  }

  const handleDismissSuggestion = (id: string) => {
    console.log('Dismissed suggestion:', id)
    // Here you would typically remove or mark the suggestion as dismissed
  }

  const handleGenerateNewSuggestions = () => {
    console.log('Generating new suggestions...')
    // Here you would typically call your AI service to generate new suggestions
  }

  const levelData = SPIRAL_DYNAMICS_LEVELS[userSpiralLevel as keyof typeof SPIRAL_DYNAMICS_LEVELS]

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Spiral Dynamics Journey</h1>
            <p className="text-muted-foreground">Discover your developmental level and accelerate your growth</p>
          </div>
        </div>

        {hasCompletedAssessment && levelData && (
          <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: levelData.color }}
            >
              {userSpiralLevel.toUpperCase()}
            </div>
            <div className="text-left">
              <div className="font-medium">{levelData.name}</div>
              <div className="text-sm text-muted-foreground">&quot;{levelData.theme}&quot;</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="flex rounded-lg border p-1 bg-muted/50">
          <Button
            variant={activeTab === 'assessment' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('assessment')}
            className="flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            Assessment
          </Button>
          <Button
            variant={activeTab === 'journey' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('journey')}
            className="flex items-center gap-2"
            disabled={!hasCompletedAssessment}
          >
            <TrendingUp className="w-4 h-4" />
            Journey
          </Button>
          <Button
            variant={activeTab === 'coaching' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('coaching')}
            className="flex items-center gap-2"
            disabled={!hasCompletedAssessment}
          >
            <Brain className="w-4 h-4" />
            AI Coaching
          </Button>
          <Button
            variant={activeTab === 'insights' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('insights')}
            className="flex items-center gap-2"
            disabled={!hasCompletedAssessment}
          >
            <BarChart3 className="w-4 h-4" />
            Insights
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'assessment' && (
          <SpiralDynamicsAssessment
            onAssessmentComplete={handleAssessmentComplete}
            className="w-full"
          />
        )}

        {activeTab === 'journey' && hasCompletedAssessment && (
          <DevelopmentalJourney
            currentLevel={userSpiralLevel as keyof typeof SPIRAL_DYNAMICS_LEVELS}
            progressInLevel={sampleJourneyData.progressInLevel}
            unlockedLevels={sampleJourneyData.unlockedLevels}
            onLevelSelect={(level) => console.log('Selected level:', level)}
            className="w-full"
          />
        )}

        {activeTab === 'coaching' && hasCompletedAssessment && (
          <EnhancedAICoach
            suggestions={enhancedSampleCoachSuggestions}
            userSpiralLevel={userSpiralLevel}
            onAcceptSuggestion={handleAcceptSuggestion}
            onDismissSuggestion={handleDismissSuggestion}
            onGenerateNew={handleGenerateNewSuggestions}
            className="w-full"
          />
        )}

        {activeTab === 'insights' && hasCompletedAssessment && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AQAL Quadrants Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  AQAL Quadrants
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">I (Interior)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Personal experience, consciousness, thoughts, feelings</p>
                    <div className="mt-2 text-xs text-purple-600">Examples: Meditation, self-reflection</div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">It (Exterior)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Biology, behavior, observable actions</p>
                    <div className="mt-2 text-xs text-blue-600">Examples: Exercise, sleep tracking</div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">We (Cultural)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Culture, shared meaning, relationships</p>
                    <div className="mt-2 text-xs text-green-600">Examples: Family time, community</div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">Its (Systems)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Systems, structures, institutions</p>
                    <div className="mt-2 text-xs text-orange-600">Examples: Financial systems, career</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Development Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Development Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessmentResults?.coaching && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Focus Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {assessmentResults.coaching.motivators.slice(0, 3).map((motivator: string, index: number) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                          >
                            {motivator}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Growth Strategy</h4>
                      <p className="text-xs text-muted-foreground">
                        {assessmentResults.coaching.growth_strategies[0]}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Next Level Preparation</h4>
                      <p className="text-xs text-muted-foreground bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
                        {assessmentResults.coaching.next_level_preparation}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Level Statistics */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Spiral Dynamics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(SPIRAL_DYNAMICS_LEVELS).map(([key, level]) => (
                    <div 
                      key={key}
                      className={`p-3 border rounded-lg transition-all ${
                        key === userSpiralLevel ? 'border-primary bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: level.color }}
                        />
                        <span className="text-sm font-medium">{level.name.split(' ')[0]}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{level.population}</p>
                      <p className="text-xs italic">&quot;{level.theme}&quot;</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Getting Started Guide */}
      {!hasCompletedAssessment && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <h4 className="font-medium text-sm">Take the Assessment</h4>
                  <p className="text-xs text-muted-foreground">Complete our 5-question assessment to identify your primary Spiral Dynamics level.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <h4 className="font-medium text-sm">Explore Your Journey</h4>
                  <p className="text-xs text-muted-foreground">View your developmental path and see what levels you can unlock next.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <h4 className="font-medium text-sm">Get AI Coaching</h4>
                  <p className="text-xs text-muted-foreground">Receive personalized suggestions tailored to your developmental level.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}