import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AnimatedStars() {
  const starsRef = useRef<THREE.Points>(null)
  
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(8000 * 3)
    const colors = new Float32Array(8000 * 3)
    const sizes = new Float32Array(8000)
    
    for (let i = 0; i < 8000; i++) {
      const radius = 200 + Math.random() * 500
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Enhanced color variation with stellar classes
      const starType = Math.random()
      if (starType < 0.3) {
        // Blue giants
        colors[i * 3] = 0.6 + Math.random() * 0.4
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3
        colors[i * 3 + 2] = 1.0
        sizes[i] = 2.5 + Math.random() * 1.5
      } else if (starType < 0.6) {
        // White stars
        const intensity = 0.8 + Math.random() * 0.2
        colors[i * 3] = intensity
        colors[i * 3 + 1] = intensity
        colors[i * 3 + 2] = intensity
        sizes[i] = 1.5 + Math.random() * 1.0
      } else if (starType < 0.8) {
        // Yellow stars (sun-like)
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.2
        sizes[i] = 1.8 + Math.random() * 0.8
      } else {
        // Red giants
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.1 + Math.random() * 0.2
        sizes[i] = 3.0 + Math.random() * 2.0
      }
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geometry
  }, [])

  const starMaterial = useMemo(() => new THREE.PointsMaterial({
    size: 1.5,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  }), [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.003
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.008
      starsRef.current.rotation.z = state.clock.elapsedTime * 0.002
    }
  })

  return (
    <points ref={starsRef} geometry={starGeometry} material={starMaterial} />
  )
}

function NebulaCloud() {
  const nebulaRef = useRef<THREE.Group>(null)
  
  const nebulaGeometry = useMemo(() => new THREE.SphereGeometry(150, 32, 32), [])
  const nebulaMaterials = useMemo(() => [
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x001155),
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x110033),
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x330011),
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide
    })
  ], [])

  useFrame((state) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = state.clock.elapsedTime * 0.003
      nebulaRef.current.rotation.x = state.clock.elapsedTime * 0.001
      nebulaRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.2) * 0.03)
    }
  })

  return (
    <group ref={nebulaRef}>
      {nebulaMaterials.map((material, index) => (
        <mesh 
          key={index} 
          geometry={nebulaGeometry} 
          material={material}
          scale={[1 + index * 0.1, 1 + index * 0.1, 1 + index * 0.1]}
        />
      ))}
    </group>
  )
}

function ShootingStars() {
  const shootingStarsRef = useRef<THREE.Group>(null)
  
  const trailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(6)
    positions[0] = 0; positions[1] = 0; positions[2] = 0
    positions[3] = -10; positions[4] = 0; positions[5] = 0
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  const trailMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  }), [])

  useFrame((state) => {
    if (shootingStarsRef.current) {
      shootingStarsRef.current.children.forEach((star, index) => {
        star.position.x += 2
        star.position.y += 0.5
        
        if (star.position.x > 100) {
          star.position.x = -100 - Math.random() * 50
          star.position.y = (Math.random() - 0.5) * 50
          star.position.z = (Math.random() - 0.5) * 100
        }
      })
    }
  })

  return (
    <group ref={shootingStarsRef}>
      {Array.from({ length: 3 }).map((_, index) => (
        <line key={index}>
          <bufferGeometry attach="geometry" {...trailGeometry} />
          <lineBasicMaterial attach="material" {...trailMaterial} />
        </line>
      ))}
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(1000 * 3)
    const colors = new Float32Array(1000 * 3)
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
      
      // Cyan particles with some variation
      colors[i * 3] = 0.2 + Math.random() * 0.3 // R
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2 // G
      colors[i * 3 + 2] = 1.0 // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geometry
  }, [])

  const particleMaterial = useMemo(() => new THREE.PointsMaterial({
    size: 1.2,
    transparent: true,
    opacity: 0.7,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  }), [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.005
    }
  })

  return (
    <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
  )
}

function CameraController() {
  const { camera } = useThree()
  
  useFrame((state) => {
    // Subtle camera movement for immersion
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 1
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.03) * 0.5
    camera.lookAt(0, 0, 0)
  })

  return null
}

export function StarTrekStarfield() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraController />
        
        {/* Enhanced atmospheric lighting */}
        <ambientLight intensity={0.08} color={0x444466} />
        <directionalLight position={[0, 0, 5]} intensity={0.15} color={0xffffff} />
        <pointLight position={[50, 50, 50]} intensity={0.1} color={0x4a90e2} />
        <pointLight position={[-50, -50, -50]} intensity={0.1} color={0xff3621} />
        
        <AnimatedStars />
        <NebulaCloud />
        <ShootingStars />
        <FloatingParticles />
        
        {/* Distant galaxy effect */}
        <mesh position={[0, 0, -200]}>
          <sphereGeometry args={[30, 32, 32]} />
          <meshBasicMaterial 
            color={0x001133} 
            transparent 
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Pulsar effect */}
        <mesh position={[100, 50, -100]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial 
            color={0x00ffff} 
            transparent 
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Canvas>
    </div>
  )
}