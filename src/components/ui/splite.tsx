'use client'

import { Suspense, lazy, Component, type ReactNode } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const FallbackUI = () => (
  <div className="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 120" className="w-16 h-16 sm:w-20 sm:h-20" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="60" rx="80" ry="35" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
      <circle cx="100" cy="60" r="22" fill="hsl(var(--primary))" opacity="0.2" className="animate-pulse" />
      <circle cx="100" cy="60" r="10" fill="hsl(var(--foreground))" opacity="0.3" className="animate-pulse" />
    </svg>
  </div>
);

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary fallback={<FallbackUI />}>
      <Suspense fallback={<FallbackUI />}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
