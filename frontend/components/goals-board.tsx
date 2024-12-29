'use client'

import { ArrowDown, ArrowRight, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PRESET_GOALS = [
  "Exercise regularly","Lose weight","Eat healthier","Save more money",
  "Spend less time on social media","Learn a new skill or hobby","Read more books",
  "Quit smoking","Drink less alcohol","Get organized","Travel to new places",
  "Spend more time with family and friends","Reduce stress","Get more sleep",
  "Start a gratitude journal","Volunteer or give back to the community",
  "Improve time management","Pay off debt","Advance in your career",
  "Take better care of your mental health","Practice mindfulness or meditation",
  "Declutter and simplify your life","Cook more meals at home","Drink more water",
  "Learn a new language","Be more eco-friendly","Start a side hustle",
  "Stop procrastinating","Set boundaries and say no more often","Focus on self-care"
];

export default function GoalsBoard() {
  const [name, setName] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [presetGoals, setPresetGoals] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (!storedName) {
      router.push('/')
    } else {
      setName(storedName)
    }
  }, [router])

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      setGoals([...goals, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal))
    } else {
      setGoals([...goals, goal])
    }
  }

  const handleNext = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://qrv374p0-8000.inc1.devtunnels.ms/add_resolutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          resolutions: goals,
        }),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting goals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-16">
        {/* Main Heading */}
        <h1 className="text-center text-5xl md:text-7xl font-caveat font-bold tracking-tight">
          <span className="text-white drop-shadow-lg">V</span>
          <span className="text-white/90 drop-shadow-lg">isualise </span>
          <span className="text-white drop-shadow-lg">C</span>
          <span className="text-white/90 drop-shadow-lg">reate </span>
          <span className="text-white drop-shadow-lg">A</span>
          <span className="text-white/90 drop-shadow-lg">chieve</span>
          <div className="text-white drop-shadow-lg text-center mt-4">2025</div>
        </h1>

        <h2 className="text-center text-3xl md:text-4xl font-caveat font-bold text-white drop-shadow-lg">
          Welcome, {name}!
        </h2>

        {/* Search Input */}
        <div className="relative w-full">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your goals here"
            className="w-full h-14 pl-6 pr-12 rounded-full glassmorphism text-white font-caveat text-xl placeholder:text-white/70 placeholder:font-caveat placeholder:text-xl focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-white/70 hover:bg-transparent"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>

        {/* Selected Goals */}
        {goals.length > 0 && (
          <div className="glassmorphism rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-caveat text-white mb-4">Your Selected Goals:</h2>
            {goals.map((goal, index) => (
              <div key={index} className="flex items-center space-x-2 text-white font-caveat text-lg">
                <Check className="h-4 w-4" />
                <span>{goal}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Text and Button */}
        <div className="space-y-6 text-center">
          <p className="text-white font-caveat text-2xl md:text-3xl drop-shadow-lg">
            {"Can't think of anything? Find out the most common goals"}
          </p>
          <Button
            onClick={() => setPresetGoals(PRESET_GOALS)}
            className="glassmorphism text-white font-caveat font-bold text-lg px-8 py-6 h-auto border-0 hover:bg-white/30"
          >
            CHOOSE GOALS
          </Button>
        </div>

        {/* Preset Goals */}
        {presetGoals.length > 0 && (
          <div className="glassmorphism rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {presetGoals.map((goal, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Checkbox
                  id={`goal-${index}`}
                  checked={goals.includes(goal)}
                  onCheckedChange={() => toggleGoal(goal)}
                  className="border-white data-[state=checked]:bg-white/20 data-[state=checked]:text-white"
                />
                <label
                  htmlFor={`goal-${index}`}
                  className="text-white font-caveat text-lg cursor-pointer"
                >
                  {goal}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* Next Button */}
        {goals.length > 0 && (
          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={loading}
              className="rounded-full glassmorphism text-white font-caveat font-bold text-lg px-8 py-6 h-auto border-0 hover:bg-white/30"
            >
              {loading ? 'Submitting...' : 'NEXT'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

