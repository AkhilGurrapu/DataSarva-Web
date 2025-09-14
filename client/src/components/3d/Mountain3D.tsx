import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

interface Mountain3DProps {
  peaks?: number
  height?: number
  width?: number
  color?: string
  snowColor?: string
  animated?: boolean
}

function MountainPeaks({ peaks = 5, height = 8, width = 20, color = '#2C3E50', snowColor = '#FFFFFF' }: Mountain3DProps) {
  const mountainRef = useRef<THREE.Group>(null)
  
  const mountainGeometry = useMemo(() => {
    const points = []
    const segments = peaks * 4
    
    // Generate mountain silhouette
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width - width / 2
      const peakIndex = Math.floor(i / (segments / peaks))
      const localX = (i % (segments / peaks)) / (segments / peaks)
      
      // Create mountain peaks with varying heights
      let y = 0
      if (localX < 0.5) {
        y = Math.sin(localX * Math.PI) * (height * (0.7 + Math.random() * 0.6))
      } else {
        y = Math.sin((1 - localX) * Math.PI) * (height * (0.7 + Math.random() * 0.6))
      }
      
      // Add some noise for natural look
      y += (Math.random() - 0.5) * 0.5
      
      points.push(new THREE.Vector3(x, y, 0))
    }
    
    // Add base points
    points.unshift(new THREE.Vector3(-width / 2, 0, 0))
    points.push(new THREE.Vector3(width / 2, 0, 0))
    
    // Create extruded geometry
    const shape = new THREE.Shape()
    shape.moveTo(points[0].x, points[0].y)
    
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i].x, points[i].y)
    }
    
    const extrudeSettings = {
      depth: 4,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 2,
      bevelSize: 0.2,
      bevelThickness: 0.1
    }
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [peaks, height, width])
  
  const mountainMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.9,
    metalness: 0.1,
    side: THREE.DoubleSide
  }), [color])
  
  const snowCapGeometry = useMemo(() => {
    const points = []
    const segments = peaks * 4
    
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width - width / 2
      const peakIndex = Math.floor(i / (segments / peaks))
      const localX = (i % (segments / peaks)) / (segments / peaks)
      
      let y = 0
      if (localX < 0.5) {
        y = Math.sin(localX * Math.PI) * (height * (0.7 + Math.random() * 0.6))
      } else {
        y = Math.sin((1 - localX) * Math.PI) * (height * (0.7 + Math.random() * 0.6))
      }
      
      // Snow cap only on upper portions
      if (y > height * 0.6) {
        points.push(new THREE.Vector3(x, y, 0.1))
        points.push(new THREE.Vector3(x, y - height * 0.2, 0.1))
      }
    }
    
    if (points.length > 0) {
      const shape = new THREE.Shape()
      shape.moveTo(points[0].x, points[0].y)
      
      for (let i = 1; i < points.length / 2; i++) {
        shape.lineTo(points[i].x, points[i].y)
      }
      
      for (let i = points.length / 2; i < points.length; i++) {
        shape.lineTo(points[i].x, points[i].y)
      }
      
      const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: false
      }
      
      return new THREE.ExtrudeGeometry(shape, extrudeSettings)
    }
    
    return new THREE.BufferGeometry()
  }, [peaks, height, width])
  
  const snowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: snowColor,
    roughness: 0.3,
    metalness: 0.2,
    transparent: true,
    opacity: 0.9
  }), [snowColor])
  
  useFrame((state) => {
    if (mountainRef.current) {
      // Subtle breathing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.2) * 0.02
      mountainRef.current.scale.setScalar(scale)
      
      // Gentle rotation
      mountainRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })
  
  return (
    <group ref={mountainRef}>
      <mesh geometry={mountainGeometry} material={mountainMaterial} />
      <mesh geometry={snowCapGeometry} material={snowMaterial} />
    </group>
  )
}

function AtmosphericFog() {
  const fogRef = useRef<THREE.Mesh>(null)
  
  const fogGeometry = useMemo(() => new THREE.PlaneGeometry(40, 20, 32, 16), [])
  const fogMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  }), [])
  
  useFrame((state) => {
    if (fogRef.current) {
      fogRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      fogRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 2
      fogRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })
  
  return (
    <mesh ref={fogRef} geometry={fogGeometry} material={fogMaterial} />
  )
}

export function Mountain3D({ 
  peaks = 5, 
  height = 8, 
  width = 20, 
  color = '#2C3E50', 
  snowColor = '#FFFFFF',
  animated = true 
}: Mountain3DProps) {
  return (
    <div className="w-full h-[400px] relative overflow-hidden">
      <Canvas
        camera={{
          position: [0, 8, 25],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} color={0x404040} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8} 
          color={0xffffff}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight 
          position={[-10, 5, 10]} 
          intensity={0.3} 
          color={0xaabbff}
        />
        
        {/* Mountain peaks */}
        <MountainPeaks 
          peaks={peaks} 
          height={height} 
          width={width} 
          color={color} 
          snowColor={snowColor}
        />
        
        {/* Atmospheric fog */}
        <AtmosphericFog />
        
        {/* Additional mountain layers for depth */}
        <group position={[0, 0, -8]} scale={[1.2, 0.8, 1]}>
          <MountainPeaks 
            peaks={peaks + 1} 
            height={height * 0.7} 
            width={width * 1.1} 
            color="#34495E" 
            snowColor="#DDDDDD"
          />
        </group>
        
        <group position={[0, 0, -16]} scale={[1.5, 0.6, 1]}>
          <MountainPeaks 
            peaks={peaks + 2} 
            height={height * 0.5} 
            width={width * 1.3} 
            color="#3E4651" 
            snowColor="#CCCCCC"
          />
        </group>
      </Canvas>
    </div>
  )
}