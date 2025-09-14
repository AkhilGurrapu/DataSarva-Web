import { ReactNode, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: 'vertical',
    })

    // Add event listeners for debugging
    lenisRef.current.on('scroll', (data: any) => {
      // Update CSS custom properties for scroll-based animations
      document.documentElement.style.setProperty('--scroll', data.scroll.toString())
      document.documentElement.style.setProperty('--scroll-progress', data.progress.toString())
      document.documentElement.style.setProperty('--scroll-velocity', data.velocity.toString())
    })

    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  // Expose scroll methods globally
  useEffect(() => {
    if (lenisRef.current) {
      (window as any).lenis = lenisRef.current
    }
  }, [])

  return <>{children}</>
}