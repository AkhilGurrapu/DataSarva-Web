import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

interface TechCard {
  id: string
  name: string
  icon: string
  description: string
  color: string
  glowColor: string
  position: [number, number, number]
  size: number
  logoUrl?: string
}

const techCards: TechCard[] = [
  {
    id: 'snowflake',
    name: 'SNOWFLAKE',
    icon: '❄️',
    description: 'Cloud Data Platform',
    color: '#29B5E8',
    glowColor: '#4FC3F7',
    position: [-8, 4, 0],
    size: 1.2,
    logoUrl: '/logos/snowflake.svg'
  },
  {
    id: 'powerbi',
    name: 'POWER BI',
    icon: '📊',
    description: 'Business Intelligence',
    color: '#F2C811',
    glowColor: '#FFD54F',
    position: [8, 2, 0],
    size: 1.0,
    logoUrl: '/logos/powerbi.svg'
  },
  {
    id: 'databricks',
    name: 'DATABRICKS',
    icon: '🧱',
    description: 'Unified Analytics Platform',
    color: '#FF3621',
    glowColor: '#FF6B6B',
    position: [0, 6, -2],
    size: 1.1,
    logoUrl: '/logos/databricks.svg'
  },
  {
    id: 'aiml',
    name: 'AI/ML',
    icon: '🤖',
    description: 'Machine Learning',
    color: '#00D4AA',
    glowColor: '#4ECDC4',
    position: [-6, -2, 1],
    size: 0.9,
    logoUrl: '/logos/aiml.svg'
  },
  {
    id: 'fabric',
    name: 'MS FABRIC',
    icon: '🏭',
    description: 'Data & Analytics Platform',
    color: '#0078D4',
    glowColor: '#42A5F5',
    position: [6, -2, 1],
    size: 1.0,
    logoUrl: '/logos/fabric.svg'
  }
]

function FloatingTechCard({ card }: { card: TechCard }) {
  const groupRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      
      // Floating motion
      groupRef.current.position.y = card.position[1] + Math.sin(time * 0.8 + card.position[0]) * 0.3
      groupRef.current.position.x = card.position[0] + Math.cos(time * 0.5 + card.position[1]) * 0.2
      
      // Gentle rotation
      groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.1
    }
    
    if (cardRef.current) {
      // Scale on hover
      const targetScale = hovered ? 1.1 : 1.0
      cardRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
    
    if (glowRef.current && glowRef.current.material) {
      // Pulsing glow
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = intensity * (hovered ? 1.5 : 1.0)
    }
  })

  const cardGeometry = useMemo(() => new THREE.PlaneGeometry(3, 2), [])
  const glowGeometry = useMemo(() => new THREE.PlaneGeometry(3.5, 2.5), [])
  
  const cardMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x1a1a2e,
    transparent: true,
    opacity: 0.8,
    roughness: 0.3,
    metalness: 0.1
  }), [])
  
  const glowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: card.glowColor,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending
  }), [card.glowColor])

  return (
    <group 
      ref={groupRef}
      position={card.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Glow background */}
      <mesh ref={glowRef} geometry={glowGeometry} material={glowMaterial} />
      
      {/* Main card */}
      <group ref={cardRef}>
        <mesh geometry={cardGeometry} material={cardMaterial}>
          {/* Border glow */}
          <lineSegments>
            <edgesGeometry args={[cardGeometry]} />
            <lineBasicMaterial color={card.color} transparent opacity={0.8} />
          </lineSegments>
        </mesh>
        
        {/* Tech logo icon */}
        <mesh position={[0, 0.3, 0.01]}>
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial 
            color={card.color}
            emissive={card.color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Connection lines */}
        <mesh position={[0, -0.8, 0.01]}>
          <planeGeometry args={[2, 0.05]} />
          <meshBasicMaterial 
            color={card.glowColor}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
      
      {/* Floating particles around card */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 0.785) * 2,
            Math.sin(i * 0.785) * 1.5,
            0.1
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial 
            color={card.glowColor}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

function NetworkConnections() {
  const linesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })
  
  const connectionLines = useMemo(() => {
    const lines = []
    for (let i = 0; i < techCards.length; i++) {
      for (let j = i + 1; j < techCards.length; j++) {
        const start = techCards[i].position
        const end = techCards[j].position
        
        const points = [
          new THREE.Vector3(start[0], start[1], start[2]),
          new THREE.Vector3(end[0], end[1], end[2])
        ]
        
        lines.push({
          geometry: new THREE.BufferGeometry().setFromPoints(points),
          color: techCards[i].glowColor
        })
      }
    }
    return lines
  }, [])
  
  return (
    <group ref={linesRef}>
      {connectionLines.map((line, index) => (
        <line key={index}>
          <bufferGeometry attach="geometry" {...line.geometry} />
          <lineBasicMaterial 
            attach="material" 
            color={line.color}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  )
}

function StarField() {
  const starsRef = useRef<THREE.Points>(null)
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const colors = new Float32Array(2000 * 3)
    
    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3
      
      // Random positions in sphere
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 100
      
      // Star colors
      const starColor = new THREE.Color()
      starColor.setHSL(0.6 + Math.random() * 0.4, 0.3 + Math.random() * 0.7, 0.5 + Math.random() * 0.5)
      
      colors[i3] = starColor.r
      colors[i3 + 1] = starColor.g
      colors[i3 + 2] = starColor.b
    }
    
    return { positions, colors }
  }, [])
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.005
    }
  })
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={2000}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          itemSize={3}
          count={2000}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        vertexColors
        sizeAttenuation={false}
      />
    </points>
  )
}

function EnhancedTechScene() {
  const { camera } = useThree()
  
  useFrame((state) => {
    // Gentle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 2
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.03) * 1
    camera.lookAt(0, 0, 0)
  })
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} color={0x404040} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.5} 
        color={0xffffff}
      />
      <pointLight 
        position={[0, 0, 0]} 
        intensity={0.8} 
        color={0x4FC3F7}
        distance={30}
      />
      
      {/* Background stars */}
      <StarField />
      
      {/* Network connections */}
      <NetworkConnections />
      
      {/* Tech cards */}
      {techCards.map((card, index) => (
        <FloatingTechCard key={index} card={card} />
      ))}
    </>
  )
}

export function EnhancedTechLogos({ 
  className = '',
  height = '600px'
}: {
  className?: string
  height?: string
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      <Canvas
        camera={{
          position: [0, 0, 20],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        style={{ 
          background: 'linear-gradient(135deg, #0a0a23 0%, #1a1a3a 50%, #2a2a4a 100%)'
        }}
        gl={{ antialias: true, alpha: false }}
      >
        <EnhancedTechScene />
      </Canvas>
      
      {/* Overlay UI elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left info panel */}
        <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3 text-cyan-400 font-mono text-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>SYSTEM ONLINE</span>
          </div>
          <div className="text-[10px] opacity-80">
            <div>NET: 98.7% ████████░</div>
            <div>CPU: 45.2% ████░░░░░</div>
            <div>MEM: 67.1% ██████░░░</div>
          </div>
        </div>
        
        {/* Bottom right tech count */}
        <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm border border-purple-400/30 rounded-lg p-3 text-purple-400 font-mono text-xs">
          <div className="text-center">
            <div className="text-lg font-bold">{techCards.length}</div>
            <div className="text-[10px] opacity-80">TECH PLATFORMS</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CompactTechShowcase({ 
  className = '',
  height = '300px'
}: {
  className?: string
  height?: string
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        
        {techCards.slice(0, 3).map((card, index) => (
          <FloatingTechCard 
            key={index} 
            card={{
              ...card,
              position: [(index - 1) * 4, 0, 0]
            }} 
          />
        ))}
      </Canvas>
    </div>
  )
}