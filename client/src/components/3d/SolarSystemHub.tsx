import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

interface TechPlanet {
  name: string
  position: [number, number, number]
  color: string
  size: number
  orbitRadius: number
  orbitSpeed: number
  icon: string
  description: string
  glowColor: string
  particleCount: number
}

const techPlanets: TechPlanet[] = [
  {
    name: 'Snowflake',
    position: [0, 0, 0],
    color: '#29B5E8',
    size: 0.8,
    orbitRadius: 6,
    orbitSpeed: 0.5,
    icon: '❄️',
    description: 'Cloud Data Platform',
    glowColor: '#4FC3F7',
    particleCount: 200
  },
  {
    name: 'Power BI',
    position: [0, 0, 0],
    color: '#F2C811',
    size: 0.7,
    orbitRadius: 8,
    orbitSpeed: 0.3,
    icon: '📊',
    description: 'Business Intelligence',
    glowColor: '#FFD54F',
    particleCount: 150
  },
  {
    name: 'Databricks',
    position: [0, 0, 0],
    color: '#FF3621',
    size: 0.9,
    orbitRadius: 10,
    orbitSpeed: 0.2,
    icon: '🧱',
    description: 'Unified Analytics Platform',
    glowColor: '#FF6B6B',
    particleCount: 300
  },
  {
    name: 'AI/ML',
    position: [0, 0, 0],
    color: '#00D4AA',
    size: 0.6,
    orbitRadius: 12,
    orbitSpeed: 0.15,
    icon: '🤖',
    description: 'Machine Learning',
    glowColor: '#4ECDC4',
    particleCount: 250
  },
  {
    name: 'Microsoft Fabric',
    position: [0, 0, 0],
    color: '#0078D4',
    size: 0.75,
    orbitRadius: 14,
    orbitSpeed: 0.1,
    icon: '🏭',
    description: 'Data & Analytics Platform',
    glowColor: '#42A5F5',
    particleCount: 180
  }
]

function DataSun() {
  const sunRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const sunGeometry = useMemo(() => new THREE.SphereGeometry(2, 64, 64), [])
  const glowGeometry = useMemo(() => new THREE.SphereGeometry(2.5, 32, 32), [])
  
  const sunMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    emissive: 0x2a5aa2,
    emissiveIntensity: 0.8,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.95
  }), [])

  const glowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x4a90e2,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending
  }), [])

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.x = state.clock.elapsedTime * 0.2
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.3
      const scale = hovered ? 1.2 : 1
      sunRef.current.scale.setScalar(scale)
    }
    
    if (glowRef.current) {
      glowRef.current.rotation.x = -state.clock.elapsedTime * 0.1
      glowRef.current.rotation.y = -state.clock.elapsedTime * 0.15
      const glowScale = hovered ? 1.3 : 1.1
      glowRef.current.scale.setScalar(glowScale)
    }
  })

  return (
    <group>
      <mesh
        ref={glowRef}
        geometry={glowGeometry}
        material={glowMaterial}
      />
      <mesh
        ref={sunRef}
        geometry={sunGeometry}
        material={sunMaterial}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </group>
  )
}

function ParticleSystem({ planet }: { planet: TechPlanet }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(planet.particleCount * 3)
    const colors = new Float32Array(planet.particleCount * 3)
    const color = new THREE.Color(planet.glowColor)
    
    for (let i = 0; i < planet.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = planet.orbitRadius + (Math.random() - 0.5) * 2
      const height = (Math.random() - 0.5) * 4
      
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius
      
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [planet])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={planet.particleCount}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          itemSize={3}
          count={planet.particleCount}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  )
}

function TechPlanetComponent({ planet }: { planet: TechPlanet }) {
  const planetRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const planetGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), [])
  const glowGeometry = useMemo(() => new THREE.SphereGeometry(1.2, 16, 16), [])
  
  const planetMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: planet.color,
    emissive: planet.color,
    emissiveIntensity: 0.4,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.9
  }), [planet.color])

  const glowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: planet.glowColor,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending
  }), [planet.glowColor])

  useFrame((state) => {
    if (planetRef.current) {
      const angle = state.clock.elapsedTime * planet.orbitSpeed
      planetRef.current.position.x = Math.cos(angle) * planet.orbitRadius
      planetRef.current.position.z = Math.sin(angle) * planet.orbitRadius
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
    
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? planet.size * 1.3 : planet.size)
    }
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(hovered ? planet.size * 1.5 : planet.size * 1.1)
    }
  })

  return (
    <group ref={planetRef}>
      <mesh
        ref={glowRef}
        geometry={glowGeometry}
        material={glowMaterial}
      />
      <mesh
        ref={meshRef}
        geometry={planetGeometry}
        material={planetMaterial}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <ParticleSystem planet={planet} />
    </group>
  )
}

function OrbitRings() {
  const ringsRef = useRef<THREE.Group>(null)
  
  const ringGeometries = useMemo(() => {
    return techPlanets.map(planet => 
      new THREE.RingGeometry(planet.orbitRadius - 0.02, planet.orbitRadius + 0.02, 128)
    )
  }, [])

  const ringMaterials = useMemo(() => {
    return techPlanets.map(planet => 
      new THREE.MeshBasicMaterial({
        color: planet.glowColor,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      })
    )
  }, [])

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={ringsRef}>
      {techPlanets.map((planet, index) => (
        <mesh 
          key={index}
          rotation={[Math.PI / 2, 0, 0]}
          geometry={ringGeometries[index]}
          material={ringMaterials[index]}
        />
      ))}
    </group>
  )
}

function DataFlowLines() {
  const linesRef = useRef<THREE.Group>(null)
  
  const lineGeometries = useMemo(() => {
    return techPlanets.map(planet => {
      const points = []
      for (let i = 0; i <= 200; i++) {
        const angle = (i / 200) * Math.PI * 2
        const x = Math.cos(angle) * planet.orbitRadius
        const z = Math.sin(angle) * planet.orbitRadius
        const y = Math.sin(angle * 6) * 0.8 + Math.cos(angle * 3) * 0.3
        points.push(new THREE.Vector3(x, y, z))
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      return geometry
    })
  }, [])

  const lineMaterials = useMemo(() => {
    return techPlanets.map(planet => 
      new THREE.LineBasicMaterial({
        color: planet.glowColor,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      })
    )
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <group ref={linesRef}>
      {techPlanets.map((planet, index) => (
        <line key={index}>
          <bufferGeometry attach="geometry" {...lineGeometries[index]} />
          <lineBasicMaterial attach="material" {...lineMaterials[index]} />
        </line>
      ))}
    </group>
  )
}

function CameraController() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const radius = 25 + Math.sin(state.clock.elapsedTime * 0.15) * 3
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.08) * radius
    camera.position.y = 15 + Math.sin(state.clock.elapsedTime * 0.12) * 8
    camera.position.z = Math.cos(state.clock.elapsedTime * 0.08) * radius
    camera.lookAt(0, 0, 0)
  })

  return null
}

export function SolarSystemHub() {
  return (
    <div className="w-full h-[600px] relative overflow-hidden">
      <Canvas
        camera={{
          position: [20, 15, 20],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraController />
        
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.2} color={0x404040} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={0.6} 
          color={0xffffff}
          castShadow
        />
        <pointLight 
          position={[0, 0, 0]} 
          intensity={1.5} 
          color={0x4a90e2}
          distance={50}
          decay={1}
        />
        
        {/* Additional atmospheric lighting */}
        <pointLight position={[30, 20, 0]} intensity={0.3} color={0x29B5E8} />
        <pointLight position={[-30, 20, 0]} intensity={0.3} color={0xFF3621} />
        <pointLight position={[0, 20, 30]} intensity={0.3} color={0x00D4AA} />
        <pointLight position={[0, 20, -30]} intensity={0.3} color={0xF2C811} />
        
        <DataSun />
        <OrbitRings />
        <DataFlowLines />
        
        {techPlanets.map((planet, index) => (
          <TechPlanetComponent key={index} planet={planet} />
        ))}
      </Canvas>
      
      {/* Enhanced overlay UI */}
      <div className="absolute top-4 left-4 text-white z-10">
        <div className="text-lg font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          🌟 DataSarva Universe
        </div>
        <div className="text-xs opacity-80 mb-2">Interactive Tech Solar System</div>
        <div className="text-xs opacity-60">
          Hover over planets to explore technologies
        </div>
      </div>
      
      {/* Tech planet labels */}
      <div className="absolute bottom-4 left-4 text-white z-10">
        <div className="text-xs font-medium mb-1">Tech Planets:</div>
        <div className="grid grid-cols-2 gap-1 text-xs opacity-80">
          {techPlanets.map((planet, index) => (
            <div key={index} className="flex items-center gap-1">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: planet.glowColor }}
              ></div>
              <span>{planet.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Performance indicator */}
      <div className="absolute top-4 right-4 text-white z-10 text-xs opacity-60">
        Enhanced 3D Mode
      </div>
    </div>
  )
}