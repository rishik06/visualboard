'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function WelcomePage() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      localStorage.setItem('userName', name.trim())
      router.push('/goals')
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-5xl md:text-7xl font-caveat font-bold tracking-tight text-white drop-shadow-lg">
          Welcome
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full h-14 pl-6 pr-12 rounded-full glassmorphism text-white font-caveat text-xl placeholder:text-white/70 placeholder:font-caveat placeholder:text-xl focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
          />
          <Button
            type="submit"
            className="w-full rounded-full glassmorphism text-white font-caveat font-bold text-lg px-8 py-6 h-auto border-0 hover:bg-white/30"
          >
            Start Setting Goals
          </Button>
        </form>
      </div>
    </div>
  )
}

