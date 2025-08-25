"use client"

import { useState, useEffect } from "react"
import { FloatingThought } from "@/components/floating-thought"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface ThoughtData {
  时间: string
  内容: string
  标签: string
}

const fallbackThoughts = [
  "Art is not what you see, but what you make others see.",
  "Every artist was first an amateur.",
  "Creativity takes courage.",
  "The purpose of art is washing the dust of daily life off our souls.",
  "Art enables us to find ourselves and lose ourselves at the same time.",
]

const directions = ["up", "diagonal-left", "diagonal-right", "diagonal-up-left", "diagonal-up-right"] as const

export default function FloatingThoughtsPage() {
  const [thoughts, setThoughts] = useState<string[]>(fallbackThoughts)
  const [isLoading, setIsLoading] = useState(true)

  const [activeThoughts, setActiveThoughts] = useState<
    Array<{
      id: number
      text: string
      delay: number
      direction: (typeof directions)[number]
      position: { top: string; left: string }
    }>
  >([])
  const [thoughtCounter, setThoughtCounter] = useState(0)

  const fetchThoughtsFromCSV = async () => {
    try {
      const response = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thoughts%20-%20thoughts-Ib9l5btrel0TdrWdndoe80izxa8MjM.csv",
      )
      const csvText = await response.text()

      // Simple CSV parsing (assuming no commas in content)
      const lines = csvText.split("\n")
      const headers = lines[0].split(",")

      const thoughtsData: string[] = []
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line) {
          const values = line.split(",")
          if (values.length >= 2) {
            // Extract content (内容) which should be the second column
            const content = values[1]?.replace(/"/g, "").trim()
            if (content) {
              thoughtsData.push(content)
            }
          }
        }
      }

      if (thoughtsData.length > 0) {
        setThoughts(thoughtsData)
        console.log(`[v0] Loaded ${thoughtsData.length} thoughts from CSV`)
      } else {
        console.log("[v0] No valid thoughts found in CSV, using fallback")
        setThoughts(fallbackThoughts)
      }
    } catch (error) {
      console.error("[v0] Error fetching CSV:", error)
      setThoughts(fallbackThoughts)
    } finally {
      setIsLoading(false)
    }
  }

  const generateRandomPosition = () => {
    const x = 10 + Math.random() * 80 // 10-90% from left
    const y = 10 + Math.random() * 35 // 10-45% from top (avoiding bottom area completely)

    return {
      top: `${y}%`,
      left: `${x}%`,
    }
  }

  const addRandomThought = () => {
    if (thoughts.length === 0) return

    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)]
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    const position = generateRandomPosition()

    const newThought = {
      id: thoughtCounter,
      text: randomThought,
      delay: 0,
      direction: randomDirection,
      position,
    }

    setActiveThoughts((prev) => [...prev, newThought])
    setThoughtCounter((prev) => prev + 1)

    // Remove thought after animation completes
    setTimeout(() => {
      setActiveThoughts((prev) => prev.filter((t) => t.id !== newThought.id))
    }, 10000)
  }

  const refreshThoughts = () => {
    setActiveThoughts([])
    setThoughtCounter(0)

    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => addRandomThought(), i * 500)
      }
    }, 500)
  }

  useEffect(() => {
    fetchThoughtsFromCSV()
  }, [])

  useEffect(() => {
    if (!isLoading && thoughts.length > 0) {
      // Initial thoughts
      refreshThoughts()

      const interval = setInterval(() => {
        if (Math.random() > 0.2) {
          // 80% chance to add a thought
          addRandomThought()
        }
      }, 4000) // Increased interval from 2000ms to 4000ms for slower card appearance

      return () => clearInterval(interval)
    }
  }, [isLoading, thoughts])

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
        <p className="text-white/60 text-lg">Loading thoughts...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <header className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
        <p className="text-white/80 text-center font-serif text-lg italic tracking-wide">
          "Thoughts drift like stars in the void of consciousness"
        </p>
      </header>

      <Button
        onClick={refreshThoughts}
        variant="outline"
        size="sm"
        className="absolute top-8 right-8 z-30 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/90 border-gray-600/30 text-gray-300 hover:text-white hover:border-gray-500/50"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </Button>

      {/* Floating Thoughts */}
      {activeThoughts.map((thought) => (
        <div
          key={thought.id}
          className="absolute"
          style={{
            top: thought.position.top,
            left: thought.position.left,
            transform: "translate(-50%, -50%)",
          }}
        >
          <FloatingThought text={thought.text} delay={thought.delay} direction={thought.direction} />
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-64 h-64 relative leading-10">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thinker-SNQkIz93gx87LnXBdEPjUHnYCyyxxO.webp"
            alt="The Thinker"
            className="w-full h-full object-contain opacity-60"
          />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-gray-400/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-white/15 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-gray-300/40 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-1500"></div>
      </div>
    </div>
  )
}
