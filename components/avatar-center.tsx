"use client"

import { Palette, Brush } from "lucide-react"

export function AvatarCenter() {
  return (
    <div className="relative z-20">
      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-100/90 to-rose-100/95 backdrop-blur-md border-2 border-rose-300/60 pulse-glow flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.4) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(244, 63, 94, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 1px, transparent 1px)
            `,
              backgroundSize: "25px 25px, 35px 35px, 18px 18px",
            }}
          />
        </div>

        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-200/30 to-amber-200/40 flex items-center justify-center shadow-inner relative">
          <div className="w-20 h-20 rounded-full bg-amber-50/95 flex items-center justify-center border border-rose-300/40">
            <div className="relative">
              <Palette className="w-10 h-10 text-rose-500 absolute" />
              <Brush className="w-6 h-6 text-amber-600 absolute top-2 left-2 opacity-80" />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-full border border-rose-300/30 animate-spin"
          style={{ animationDuration: "25s" }}
        >
          <div className="absolute top-2 left-1/2 w-2 h-2 bg-rose-400/70 rounded-full transform -translate-x-1/2" />
        </div>
        <div
          className="absolute inset-2 rounded-full border border-amber-300/25 animate-spin"
          style={{ animationDuration: "18s", animationDirection: "reverse" }}
        >
          <div className="absolute bottom-2 right-1/2 w-1.5 h-1.5 bg-amber-400/60 rounded-full transform translate-x-1/2" />
        </div>
      </div>
    </div>
  )
}
