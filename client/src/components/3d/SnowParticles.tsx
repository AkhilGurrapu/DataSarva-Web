import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

interface SnowParticlesProps {
  count?: number
  area?: number
  speed?: number
  size?: number
  opacity?: number
  color?: string
}

export function SnowParticles({ 
  count = 1000, 
  area = 50, 
  speed = 0.5, 
  size = 0.1,
  opacity = 0.8,
  color = '#FFFFFF'
}: SnowParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const { positions, velocities, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    
    const snowColor = new THREE.Color(color)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Random positions in 3D space
      positions[i3] = (Math.random() - 0.5) * area
      positions[i3 + 1] = Math.random() * area
      positions[i3 + 2] = (Math.random() - 0.5) * area
      
      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02 // slight horizontal drift
      velocities[i3 + 1] = -(Math.random() * 0.02 + 0.01) * speed // downward fall
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02 // slight depth drift
      
      // Random sizes
      sizes[i] = size * (0.5 + Math.random() * 1.5)
      
      // Varying white tones
      const intensity = 0.8 + Math.random() * 0.2
      colors[i3] = snowColor.r * intensity
      colors[i3 + 1] = snowColor.g * intensity
      colors[i3 + 2] = snowColor.b * intensity
    }
    
    return { positions, velocities, sizes, colors }
  }, [count, area, speed, size, color])
  
  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        
        // Update positions
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]
        
        // Reset particles that fall below or go out of bounds
        if (positions[i3 + 1] < -area / 2) {
          positions[i3] = (Math.random() - 0.5) * area
          positions[i3 + 1] = area / 2
          positions[i3 + 2] = (Math.random() - 0.5) * area
        }
        
        // Horizontal boundaries
        if (Math.abs(positions[i3]) > area / 2) {
          positions[i3] = (Math.random() - 0.5) * area
        }
        
        if (Math.abs(positions[i3 + 2]) > area / 2) {
          positions[i3 + 2] = (Math.random() - 0.5) * area
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          itemSize={1}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          itemSize={3}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        vertexColors
        sizeAttenuation={true}
      />
    </points>
  )
}

export function BlizzardEffect({ 
  count = 2000, 
  area = 60, 
  speed = 1.5, 
  size = 0.05,
  opacity = 0.6,
  color = '#FFFFFF'
}: SnowParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const { positions, velocities, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    
    const snowColor = new THREE.Color(color)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Random positions in 3D space
      positions[i3] = (Math.random() - 0.5) * area
      positions[i3 + 1] = Math.random() * area
      positions[i3 + 2] = (Math.random() - 0.5) * area
      
      // More dramatic wind effect
      velocities[i3] = (Math.random() - 0.5) * 0.1 * speed // stronger horizontal drift
      velocities[i3 + 1] = -(Math.random() * 0.05 + 0.02) * speed // faster downward fall
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.08 * speed // stronger depth drift
      
      // Smaller, more uniform sizes for blizzard effect
      sizes[i] = size * (0.8 + Math.random() * 0.4)
      
      // Slightly dimmer for blizzard atmosphere
      const intensity = 0.6 + Math.random() * 0.3
      colors[i3] = snowColor.r * intensity
      colors[i3 + 1] = snowColor.g * intensity
      colors[i3 + 2] = snowColor.b * intensity
    }
    
    return { positions, velocities, sizes, colors }
  }, [count, area, speed, size, color])
  
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      // Add wind sway effect
      const windStrength = Math.sin(state.clock.elapsedTime * 0.5) * 0.01
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        
        // Update positions with wind effect
        positions[i3] += velocities[i3] + windStrength
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]
        
        // Reset particles that fall below or go out of bounds
        if (positions[i3 + 1] < -area / 2) {
          positions[i3] = (Math.random() - 0.5) * area
          positions[i3 + 1] = area / 2
          positions[i3 + 2] = (Math.random() - 0.5) * area
        }
        
        // Horizontal boundaries
        if (Math.abs(positions[i3]) > area / 2) {
          positions[i3] = (Math.random() - 0.5) * area
        }
        
        if (Math.abs(positions[i3 + 2]) > area / 2) {
          positions[i3 + 2] = (Math.random() - 0.5) * area
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          itemSize={1}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          itemSize={3}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        vertexColors
        sizeAttenuation={true}
      />
    </points>
  )
}

export function SnowStorm({ 
  intensity = 'light',
  count,
  area = 50,
  speed = 0.8,
  size = 0.08,
  opacity = 0.7,
  color = '#FFFFFF'
}: SnowParticlesProps & { intensity?: 'light' | 'medium' | 'heavy' }) {
  const settings = useMemo(() => {
    switch (intensity) {
      case 'light':
        return { 
          count: count || 500, 
          speed: speed * 0.5, 
          size: size * 1.2, 
          opacity: opacity * 0.8 
        }
      case 'medium':
        return { 
          count: count || 1000, 
          speed: speed * 0.8, 
          size: size, 
          opacity: opacity 
        }
      case 'heavy':
        return { 
          count: count || 1500, 
          speed: speed * 1.2, 
          size: size * 0.8, 
          opacity: opacity * 1.1 
        }
      default:
        return { 
          count: count || 1000, 
          speed, 
          size, 
          opacity 
        }
    }
  }, [intensity, count, speed, size, opacity])
  
  return (
    <SnowParticles 
      count={settings.count}
      area={area}
      speed={settings.speed}
      size={settings.size}
      opacity={settings.opacity}
      color={color}
    />
  )
}