import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Mountain3D } from './Mountain3D'
import { SnowParticles, BlizzardEffect, SnowStorm } from './SnowParticles'
import { DeviceOptimized3D } from './DeviceOptimized3D'

interface MountainEnvironmentProps {
  children?: React.ReactNode
  intensity?: 'light' | 'medium' | 'heavy'
  showSnow?: boolean
  showBlizzard?: boolean
  mountainColor?: string
  snowColor?: string
  height?: string
  className?: string
}

function MountainScene({ 
  intensity = 'medium', 
  showSnow = true, 
  showBlizzard = false,
  mountainColor = '#2C3E50',
  snowColor = '#FFFFFF'
}: Omit<MountainEnvironmentProps, 'children' | 'height' | 'className'>) {
  return (
    <>
      {/* Enhanced lighting for mountain environment */}
      <ambientLight intensity={0.3} color={0x404040} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color={0xffffff}
        castShadow
      />
      <directionalLight 
        position={[-10, 5, 10]} 
        intensity={0.4} 
        color={0xaabbff}
      />
      
      {/* Mountain peaks */}
      <group position={[0, -5, -20]}>
        <Mountain3D 
          peaks={5} 
          height={12} 
          width={30} 
          color={mountainColor} 
          snowColor={snowColor}
        />
      </group>
      
      {/* Multiple mountain layers for depth */}
      <group position={[15, -3, -30]} scale={[0.8, 0.7, 1]}>
        <Mountain3D 
          peaks={4} 
          height={10} 
          width={25} 
          color="#34495E" 
          snowColor="#DDDDDD"
        />
      </group>
      
      <group position={[-20, -4, -35]} scale={[1.2, 0.6, 1]}>
        <Mountain3D 
          peaks={6} 
          height={8} 
          width={35} 
          color="#3E4651" 
          snowColor="#CCCCCC"
        />
      </group>
      
      {/* Snow effects */}
      {showSnow && (
        <group position={[0, 0, 0]}>
          <SnowStorm 
            intensity={intensity}
            area={60}
            speed={0.8}
            size={0.1}
            opacity={0.7}
          />
        </group>
      )}
      
      {showBlizzard && (
        <group position={[0, 0, 0]}>
          <BlizzardEffect 
            count={2500}
            area={80}
            speed={1.5}
            size={0.06}
            opacity={0.6}
          />
        </group>
      )}
    </>
  )
}

export function MountainEnvironment({ 
  children, 
  intensity = 'medium', 
  showSnow = true, 
  showBlizzard = false,
  mountainColor = '#2C3E50',
  snowColor = '#FFFFFF',
  height = '100vh',
  className = ''
}: MountainEnvironmentProps) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      {/* 3D Mountain Background */}
      <Canvas
        camera={{
          position: [0, 5, 40],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: 'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)'
        }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <MountainScene 
            intensity={intensity}
            showSnow={showSnow}
            showBlizzard={showBlizzard}
            mountainColor={mountainColor}
            snowColor={snowColor}
          />
        </Suspense>
      </Canvas>
      
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div 
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)'
        }}
      />
    </div>
  )
}

export function MountainBackdrop({ 
  children,
  height = '600px',
  className = '',
  showSnow = true,
  intensity = 'light'
}: Pick<MountainEnvironmentProps, 'children' | 'height' | 'className' | 'showSnow' | 'intensity'>) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      {/* Simplified mountain background for sections */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(to bottom, 
              rgba(135, 206, 235, 0.8) 0%,
              rgba(152, 216, 232, 0.6) 30%,
              rgba(176, 224, 230, 0.4) 70%,
              rgba(255, 255, 255, 0.2) 100%
            ),
            linear-gradient(135deg, 
              #2C3E50 0%, 
              #34495E 25%, 
              #3E4651 50%, 
              #2C3E50 75%, 
              #34495E 100%
            )
          `
        }}
      />
      
      {/* Mountain silhouette using CSS */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/2 opacity-60"
        style={{
          background: `
            linear-gradient(to top, 
              #2C3E50 0%, 
              transparent 100%
            )
          `,
          clipPath: `polygon(
            0% 100%, 
            10% 80%, 
            20% 60%, 
            30% 70%, 
            40% 50%, 
            50% 40%, 
            60% 55%, 
            70% 35%, 
            80% 65%, 
            90% 45%, 
            100% 70%, 
            100% 100%
          )`
        }}
      />
      
      {/* CSS Snow effect overlay */}
      {showSnow && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          {/* CSS-based snow particles */}
          <div className="absolute inset-0 opacity-60">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-80"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `snowfall ${8 + Math.random() * 6}s linear infinite`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}