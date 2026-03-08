'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 120" className="w-16 h-16 sm:w-20 sm:h-20" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="60" rx="80" ry="35" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
            <circle cx="100" cy="60" r="22" fill="hsl(var(--primary))" opacity="0.2" className="animate-pulse" />
            <circle cx="100" cy="60" r="10" fill="hsl(var(--foreground))" opacity="0.3" className="animate-pulse" />
          </svg>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
