import { lazy } from 'react'

// Lazy load 3D components for better performance
export const StarTrekStarfield = lazy(() => 
  import('./StarTrekStarfield').then(module => ({ default: module.StarTrekStarfield }))
)

export const SolarSystemHub = lazy(() => 
  import('./SolarSystemHub').then(module => ({ default: module.SolarSystemHub }))
)