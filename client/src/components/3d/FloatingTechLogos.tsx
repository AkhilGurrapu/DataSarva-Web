import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

interface TechLogo {
  name: string
  icon: string
  color: string
  glowColor: string
  position: [number, number, number]
  size: number
  speed: number
}

const techLogos: TechLogo[] = [
  {
    name: 'Snowflake',
    icon: '❄️',
    color: '#29B5E8',
    glowColor: '#4FC3F7',
    position: [-8, 2, 0],
    size: 1.2,
    speed: 0.8
  },
  {
    name: 'Power BI',
    icon: '📊',
    color: '#F2C811',
    glowColor: '#FFD54F',
    position: [8, 1, 0],
    size: 1.0,
    speed: 0.6
  },
  {
    name: 'Databricks',
    icon: '🧱',
    color: '#FF3621',
    glowColor: '#FF6B6B',
    position: [0, 3, -2],
    size: 1.1,
    speed: 0.7
  },
  {
    name: 'AI/ML',
    icon: '🤖',
    color: '#00D4AA',
    glowColor: '#4ECDC4',
    position: [-5, -1, 1],
    size: 0.9,
    speed: 0.9
  },
  {
    name: 'Microsoft Fabric',
    icon: '🏭',
    color: '#0078D4',
    glowColor: '#42A5F5',
    position: [5, -1, 1],
    size: 1.0,
    speed: 0.5
  }
]

function FloatingTechLogo({ logo }: { logo: TechLogo }) {
  const logoRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (logoRef.current) {
      const time = state.clock.elapsedTime
      
      // Floating motion
      logoRef.current.position.y = logo.position[1] + Math.sin(time * logo.speed) * 0.5
      logoRef.current.rotation.y = time * 0.3
      logoRef.current.rotation.z = Math.sin(time * 0.7) * 0.1
      
      // Scale animation
      const scale = hovered ? 1.3 : 1.0
      logoRef.current.scale.setScalar(scale * logo.size)
    }
    
    if (glowRef.current && glowRef.current.material) {
      // Pulsing glow effect
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = intensity * (hovered ? 1.5 : 1.0)
    }
  })
  
  return (
    <group 
      ref={logoRef}
      position={logo.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial 
          color={logo.glowColor}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Main logo sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={logo.color}
          emissive={logo.color}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {/* Particle ring */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[1.2, 1.4, 16]} />
        <meshBasicMaterial 
          color={logo.glowColor}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function FloatingTechLogosScene({ 
  scale = 1, 
  animated = true
}: { 
  scale?: number
  animated?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current && animated) {
      // Slow rotation of the entire group
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {techLogos.map((logo, index) => (
        <FloatingTechLogo key={index} logo={logo} />
      ))}
    </group>
  )
}

export function FloatingTechLogos({ 
  scale = 1, 
  spacing = 1,
  animated = true,
  className = ''
}: { 
  scale?: number
  spacing?: number
  animated?: boolean
  className?: string
}) {
  return (
    <div className={`w-full h-[300px] ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[0, 0, 10]} intensity={0.5} color={0x4FC3F7} />
        
        <FloatingTechLogosScene scale={scale} animated={animated} />
      </Canvas>
    </div>
  )
}

function TechLogoBannerScene({ 
  direction = 'horizontal',
  speed = 1
}: {
  direction?: 'horizontal' | 'vertical'
  speed?: number
}) {
  const bannerRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (bannerRef.current) {
      if (direction === 'horizontal') {
        bannerRef.current.position.x = Math.sin(state.clock.elapsedTime * speed) * 2
      } else {
        bannerRef.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 1
      }
    }
  })
  
  return (
    <group ref={bannerRef}>
      {techLogos.map((logo, index) => (
        <group 
          key={index}
          position={[
            direction === 'horizontal' ? (index - 2) * 4 : 0,
            direction === 'vertical' ? (index - 2) * 2 : 0,
            0
          ]}
          scale={[0.6, 0.6, 0.6]}
        >
          <FloatingTechLogo logo={logo} />
        </group>
      ))}
    </group>
  )
}

export function TechLogoBanner({ 
  direction = 'horizontal',
  speed = 1,
  className = ''
}: {
  direction?: 'horizontal' | 'vertical'
  speed?: number
  className?: string
}) {
  return (
    <div className={`w-full h-[200px] ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 12],
          fov: 50,
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        
        <TechLogoBannerScene direction={direction} speed={speed} />
      </Canvas>
    </div>
  )
}

function TechLogoOrbitScene({ 
  radius = 8,
  speed = 0.5
}: {
  radius?: number
  speed?: number
}) {
  const orbitRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * speed
    }
  })
  
  return (
    <>
      <group ref={orbitRef}>
        {techLogos.map((logo, index) => {
          const angle = (index / techLogos.length) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          
          return (
            <group 
              key={index}
              position={[x, 0, z]}
              scale={[0.8, 0.8, 0.8]}
            >
              <FloatingTechLogo logo={logo} />
            </group>
          )
        })}
      </group>
      
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
        <meshBasicMaterial 
          color={0x4FC3F7}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}

export function TechLogoOrbit({ 
  radius = 8,
  speed = 0.5,
  className = ''
}: {
  radius?: number
  speed?: number
  className?: string
}) {
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas
        camera={{
          position: [0, 5, 20],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[0, 0, 0]} intensity={1} color={0x4FC3F7} />
        
        <TechLogoOrbitScene radius={radius} speed={speed} />
      </Canvas>
    </div>
  )
}