import { ReactNode, useEffect, useState } from 'react'
import { useMobile } from '@/hooks/use-mobile'

interface DeviceOptimized3DProps {
  children: ReactNode
  fallback?: ReactNode
  enabledOnMobile?: boolean
}

interface PerformanceProfile {
  isLowPerformance: boolean
  deviceMemory: number
  hardwareConcurrency: number
  effectiveType: string
  batteryLevel: number
  isCharging: boolean
  gpuTier: 'low' | 'medium' | 'high'
}

export function DeviceOptimized3D({ 
  children, 
  fallback, 
  enabledOnMobile = false 
}: DeviceOptimized3DProps) {
  const isMobile = useMobile()
  const [performanceProfile, setPerformanceProfile] = useState<PerformanceProfile>({
    isLowPerformance: false,
    deviceMemory: 0,
    hardwareConcurrency: 0,
    effectiveType: 'unknown',
    batteryLevel: 1,
    isCharging: true,
    gpuTier: 'medium'
  })

  useEffect(() => {
    const checkPerformance = async () => {
      const nav = navigator as any
      const connection = nav.connection || nav.mozConnection || nav.webkitConnection
      
      let profile: PerformanceProfile = {
        isLowPerformance: false,
        deviceMemory: nav.deviceMemory || 4,
        hardwareConcurrency: nav.hardwareConcurrency || 4,
        effectiveType: connection?.effectiveType || '4g',
        batteryLevel: 1,
        isCharging: true,
        gpuTier: 'medium'
      }

      // Check WebGL support and performance
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      
      if (!gl) {
        profile.isLowPerformance = true
        profile.gpuTier = 'low'
      } else {
        // Check GPU renderer for performance hints
        const webglContext = gl as WebGLRenderingContext
        const debugInfo = webglContext.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          const renderer = webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          if (renderer && typeof renderer === 'string') {
            if (renderer.toLowerCase().includes('intel') || 
                renderer.toLowerCase().includes('software') ||
                renderer.toLowerCase().includes('mesa')) {
              profile.gpuTier = 'low'
            } else if (renderer.toLowerCase().includes('nvidia') || 
                       renderer.toLowerCase().includes('amd') ||
                       renderer.toLowerCase().includes('radeon')) {
              profile.gpuTier = 'high'
            }
          }
        }
      }
      
      // Check for slow network
      if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
        profile.isLowPerformance = true
      }
      
      // Check for low memory (threshold lowered to 2GB for mobile compatibility)
      if (nav.deviceMemory && nav.deviceMemory < 2) {
        profile.isLowPerformance = true
      }
      
      // Check for low CPU cores (threshold lowered to 2 for mobile)
      if (nav.hardwareConcurrency && nav.hardwareConcurrency < 2) {
        profile.isLowPerformance = true
      }
      
      // Check battery status
      if (nav.getBattery) {
        try {
          const battery = await nav.getBattery()
          profile.batteryLevel = battery.level
          profile.isCharging = battery.charging
          
          // Enable power saving mode when battery is low
          if (!battery.charging && battery.level < 0.2) {
            profile.isLowPerformance = true
          }
        } catch (error) {
          console.log('Battery API not available')
        }
      }

      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        profile.isLowPerformance = true
      }

      // Performance heuristics based on combined factors
      if (profile.gpuTier === 'low' && profile.deviceMemory < 4) {
        profile.isLowPerformance = true
      }

      setPerformanceProfile(profile)
    }

    checkPerformance()
  }, [])

  // Determine if 3D should be enabled
  const should3DBeEnabled = () => {
    // Always disable on low performance devices
    if (performanceProfile.isLowPerformance) return false
    
    // Check mobile preference
    if (isMobile && !enabledOnMobile) return false
    
    // Enable for high-performance devices
    if (performanceProfile.gpuTier === 'high' && performanceProfile.deviceMemory >= 4) {
      return true
    }
    
    // Enable for medium-performance devices that aren't mobile
    if (!isMobile && performanceProfile.gpuTier === 'medium') {
      return true
    }
    
    return false
  }

  if (!should3DBeEnabled()) {
    return fallback || (
      <div className="h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg">
        <div className="text-white text-center p-8">
          <div className="text-4xl mb-4">⚡</div>
          <div className="text-lg font-bold mb-2">Performance Mode</div>
          <div className="text-sm opacity-80 mb-4">
            3D visualization disabled for optimal performance
          </div>
          <div className="text-xs opacity-60">
            {isMobile ? 'Mobile device detected' : 'Low performance device detected'}
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 text-xs opacity-40 space-y-1">
              <div>Memory: {performanceProfile.deviceMemory}GB</div>
              <div>CPU Cores: {performanceProfile.hardwareConcurrency}</div>
              <div>GPU: {performanceProfile.gpuTier}</div>
              <div>Network: {performanceProfile.effectiveType}</div>
              <div>Battery: {Math.round(performanceProfile.batteryLevel * 100)}%</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
}