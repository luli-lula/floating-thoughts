"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingThoughtProps {
  text: string
  delay: number
  direction: "up" | "diagonal-left" | "diagonal-right" | "diagonal-up-left" | "diagonal-up-right"
  className?: string
}

export function FloatingThought({ text, delay, direction, className }: FloatingThoughtProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setIsClicked(false)
      }, 5000) // 5 second pause when clicked
      return () => clearTimeout(timer)
    }
  }, [isClicked])

  const getDirectionStyles = () => {
    switch (direction) {
      case "diagonal-left":
        return { "--float-x": "-60px", "--float-y": "-100px" }
      case "diagonal-right":
        return { "--float-x": "60px", "--float-y": "-100px" }
      case "diagonal-up-left":
        return { "--float-x": "-40px", "--float-y": "-150px" }
      case "diagonal-up-right":
        return { "--float-x": "40px", "--float-y": "-150px" }
      default:
        return {}
    }
  }

  const getAnimationClass = () => {
    if (direction === "up") return "float-up"
    return "float-diagonal"
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "absolute pointer-events-auto z-10 transition-all duration-300",
        getAnimationClass(),
        (isPaused || isClicked) && "animation-paused",
        className,
      )}
      style={getDirectionStyles() as React.CSSProperties}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => setIsClicked(!isClicked)}
    >
      <div
        className={cn(
          "bg-gray-900/95 backdrop-blur-md border border-gray-600/40 rounded-xl px-8 py-5 shadow-2xl",
          "hover:scale-110 hover:bg-gray-800/98 hover:border-gray-400/80 hover:shadow-white/20 hover:shadow-2xl transition-all duration-500",
          "max-w-md min-w-[280px] text-left cursor-pointer relative overflow-hidden",
          (isPaused || isClicked) && "scale-110 bg-gray-800/98 border-gray-400/80 shadow-white/20 shadow-2xl",
          isClicked && "ring-2 ring-gray-400/50",
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 to-gray-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent" />

        <p className="text-base font-serif text-gray-50 leading-relaxed relative z-10 italic font-medium">{text}</p>

        <div
          className={cn(
            "absolute bottom-2 right-2 w-2 h-2 rounded-full transition-all duration-300",
            isClicked ? "bg-blue-400 animate-pulse" : "bg-gray-400/70 animate-pulse",
          )}
        />

        {isPaused && !isClicked && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap opacity-75">
            点击暂停阅读
          </div>
        )}
      </div>
    </div>
  )
}
