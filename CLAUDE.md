# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Floating Thoughts is a Next.js 15 project that displays animated, floating thought cards on a dark background. It's a poetic visualization app that fetches thoughts from a CSV file and displays them as interactive floating elements.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint (note: linting errors are ignored during builds)

## Architecture & Key Components

### Core Structure
- **Next.js App Router** with TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Fonts**: Geist Sans/Mono, Playfair Display for serif text
- **Data Source**: External CSV file with Chinese content fields (时间, 内容, 标签)

### Main Components
- `app/page.tsx`: Main page with floating thoughts logic and CSV data fetching
- `components/floating-thought.tsx`: Individual thought card component with hover/click interactions
- `components/ui/`: shadcn/ui components (Button, etc.)

### Data Flow
1. Fetches thoughts from Vercel blob storage CSV URL
2. Parses CSV to extract content from "内容" column  
3. Falls back to hardcoded English art quotes if CSV fails
4. Displays thoughts as floating cards with random positions and directions
5. Cards appear every 4 seconds with 80% probability
6. Each card has 10-second lifecycle with fade-out animation

### Styling System
- **Dark theme**: Black background with gray-tinted cards
- **Animation directions**: up, diagonal-left, diagonal-right, diagonal-up-left, diagonal-up-right
- **Interactive states**: Hover pauses animation, click extends pause to 5 seconds
- **Responsive positioning**: Cards spawn in upper 45% of screen (10-45% from top)

### Build Configuration
- ESLint and TypeScript errors are ignored during builds (`ignoreBuildErrors: true`)
- Images are unoptimized for static deployment
- Uses absolute path aliases via `@/*` mapping

## Key Features
- Real-time CSV data fetching with fallback content
- Smooth CSS animations with pause/resume on interaction
- Random positioning system to avoid card overlap
- Refresh functionality to reset all active thoughts
- Chinese text support with appropriate font rendering