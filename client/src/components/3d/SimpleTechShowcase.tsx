import { useState, useEffect, useRef } from 'react'

interface TechNode {
  id: string
  name: string
  icon: string
  description: string
  color: string
  glowColor: string
  category: 'storage' | 'analytics' | 'compute' | 'ai' | 'platform'
  position: { x: number; y: number; angle: number }
  connections: string[]
}

const techNodes: TechNode[] = [
  {
    id: 'snowflake',
    name: 'SNOWFLAKE',
    icon: '❄️',
    description: 'Cloud Data Warehouse',
    color: '#29B5E8',
    glowColor: '#4FC3F7',
    category: 'storage',
    position: { x: 15, y: 30, angle: 0 },
    connections: ['powerbi', 'databricks', 'aiml']
  },
  {
    id: 'powerbi',
    name: 'POWER BI',
    icon: '📊',
    description: 'Business Intelligence',
    color: '#F2C811',
    glowColor: '#FFD54F',
    category: 'analytics',
    position: { x: 75, y: 25, angle: 72 },
    connections: ['snowflake', 'fabric']
  },
  {
    id: 'databricks',
    name: 'DATABRICKS',
    icon: '🧱',
    description: 'Unified Analytics',
    color: '#FF3621',
    glowColor: '#FF6B6B',
    category: 'compute',
    position: { x: 80, y: 70, angle: 144 },
    connections: ['snowflake', 'aiml', 'fabric']
  },
  {
    id: 'aiml',
    name: 'AI/ML',
    icon: '🤖',
    description: 'Machine Learning',
    color: '#00D4AA',
    glowColor: '#4ECDC4',
    category: 'ai',
    position: { x: 25, y: 75, angle: 216 },
    connections: ['snowflake', 'databricks', 'fabric']
  },
  {
    id: 'fabric',
    name: 'MS FABRIC',
    icon: '🏭',
    description: 'Integrated Platform',
    color: '#0078D4',
    glowColor: '#42A5F5',
    category: 'platform',
    position: { x: 50, y: 50, angle: 288 },
    connections: ['powerbi', 'databricks', 'aiml']
  }
]

interface DataParticle {
  id: string
  fromNode: string
  toNode: string
  progress: number
  color: string
}

function DataFlowParticle({
  fromPos,
  toPos,
  progress,
  color
}: {
  fromPos: { x: number; y: number }
  toPos: { x: number; y: number }
  progress: number
  color: string
}) {
  const x = fromPos.x + (toPos.x - fromPos.x) * progress
  const y = fromPos.y + (toPos.y - fromPos.y) * progress

  return (
    <div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}80`,
        transform: 'translate(-50%, -50%)',
        opacity: Math.sin(progress * Math.PI) // Fade in and out
      }}
    />
  )
}

function TechEcosystemNode({
  node,
  isActive,
  onHover,
  onLeave,
  orbitOffset = 0
}: {
  node: TechNode
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  orbitOffset?: number
}) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.02)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Add subtle orbital motion
  const orbitRadius = 3
  const orbitX = Math.cos(time + node.position.angle + orbitOffset) * orbitRadius
  const orbitY = Math.sin(time + node.position.angle + orbitOffset) * orbitRadius * 0.5

  return (
    <div
      className="absolute cursor-pointer transition-all duration-500 group"
      style={{
        left: `${node.position.x + orbitX}%`,
        top: `${node.position.y + orbitY}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 20 : 10
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Node Glow */}
      <div
        className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
          isActive ? 'opacity-60 scale-150' : 'opacity-20 scale-100'
        }`}
        style={{
          background: `radial-gradient(circle, ${node.glowColor}60 0%, transparent 70%)`,
          width: '80px',
          height: '80px',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Main Node */}
      <div
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
          isActive ? 'scale-125 border-opacity-100' : 'scale-100 border-opacity-60'
        }`}
        style={{
          borderColor: node.color,
          background: `radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)`,
          boxShadow: isActive
            ? `0 0 25px ${node.glowColor}60, inset 0 0 15px ${node.glowColor}20`
            : `0 0 15px ${node.glowColor}30, inset 0 0 8px ${node.glowColor}10`
        }}
      >
        {/* Icon */}
        <div
          className="text-2xl sm:text-3xl transition-all duration-300"
          style={{
            color: node.color,
            textShadow: `0 0 10px ${node.glowColor}80`,
            transform: isActive ? 'scale(1.2)' : 'scale(1)'
          }}
        >
          {node.icon}
        </div>
      </div>

      {/* Node Label */}
      <div
        className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center transition-all duration-300 ${
          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div
          className="text-xs sm:text-sm font-bold whitespace-nowrap px-2 py-1 rounded"
          style={{
            color: node.color,
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: `1px solid ${node.color}40`,
            textShadow: `0 0 5px ${node.glowColor}60`
          }}
        >
          {node.name}
        </div>
        <div className="text-xs text-white/80 mt-1 whitespace-nowrap">
          {node.description}
        </div>
      </div>

      {/* Pulse Ring */}
      <div
        className="absolute inset-0 rounded-full border opacity-40"
        style={{
          borderColor: node.color,
          animation: `pulseRing 3s ease-in-out infinite`,
          animationDelay: `${node.position.angle * 0.01}s`
        }}
      />
    </div>
  )
}

export function DataEcosystemHub({
  className = '',
  height = '500px'
}: {
  className?: string
  height?: string
}) {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [dataParticles, setDataParticles] = useState<DataParticle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate flowing data particles
  useEffect(() => {
    const interval = setInterval(() => {
      if (!activeNode) return

      const sourceNode = techNodes.find(n => n.id === activeNode)
      if (!sourceNode) return

      const newParticles: DataParticle[] = sourceNode.connections.map((targetId, index) => ({
        id: `${activeNode}-${targetId}-${Date.now()}-${index}`,
        fromNode: activeNode,
        toNode: targetId,
        progress: 0,
        color: sourceNode.glowColor
      }))

      setDataParticles(prev => [...prev, ...newParticles])
    }, 500)

    return () => clearInterval(interval)
  }, [activeNode])

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setDataParticles(prev =>
        prev
          .map(particle => ({
            ...particle,
            progress: particle.progress + 0.02
          }))
          .filter(particle => particle.progress < 1)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const getNodePosition = (nodeId: string) => {
    const node = techNodes.find(n => n.id === nodeId)
    return node ? node.position : { x: 50, y: 50 }
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height, minHeight: '400px' }}
    >
      {/* Quantum Background */}
      <div className="absolute inset-0">
        {/* Starfield */}
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}

        {/* Energy Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4FC3F7" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Central Energy Core */}
        <div
          className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0, 100, 200, 0.1) 0%, transparent 70%)',
            animation: 'centralPulse 4s ease-in-out infinite'
          }}
        />
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {activeNode &&
          techNodes
            .find(n => n.id === activeNode)
            ?.connections.map(targetId => {
              const sourcePos = getNodePosition(activeNode)
              const targetPos = getNodePosition(targetId)
              const sourceNode = techNodes.find(n => n.id === activeNode)

              return (
                <line
                  key={`${activeNode}-${targetId}`}
                  x1={`${sourcePos.x}%`}
                  y1={`${sourcePos.y}%`}
                  x2={`${targetPos.x}%`}
                  y2={`${targetPos.y}%`}
                  stroke={sourceNode?.glowColor || '#4FC3F7'}
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  opacity="0.8"
                  style={{
                    animation: `energyFlow 2s linear infinite`
                  }}
                />
              )
            })}
      </svg>

      {/* Data Flow Particles */}
      {dataParticles.map(particle => {
        const fromPos = getNodePosition(particle.fromNode)
        const toPos = getNodePosition(particle.toNode)

        return (
          <DataFlowParticle
            key={particle.id}
            fromPos={fromPos}
            toPos={toPos}
            progress={particle.progress}
            color={particle.color}
          />
        )
      })}

      {/* Technology Nodes */}
      {techNodes.map((node, index) => (
        <TechEcosystemNode
          key={node.id}
          node={node}
          isActive={activeNode === node.id}
          onHover={() => setActiveNode(node.id)}
          onLeave={() => setActiveNode(null)}
          orbitOffset={index * 0.5}
        />
      ))}


    </div>
  )
}

export function SimpleTechShowcase({
  className = '',
  height = '400px'
}: {
  className?: string
  height?: string
  layout?: 'horizontal' | 'grid'
}) {
  // Use the new ecosystem design for all layouts
  return <DataEcosystemHub className={className} height={height} />
}

export function CompactTechShowcase({ 
  className = '',
  height = '300px'
}: {
  className?: string
  height?: string
}) {
  return (
    <SimpleTechShowcase 
      className={className}
      height={height}
      layout="horizontal"
    />
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
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        height,
        background: 'transparent',
        minHeight: '300px'
      }}
    >
      {/* Subtle starfield that blends with background */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Gentle snowfall animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${-10 + Math.random() * 20}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animation: `gentleSnowfall ${8 + Math.random() * 6}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center p-2 sm:p-4">
        <SimpleTechShowcase
          height="100%"
          layout="grid"
          className="w-full max-w-4xl"
        />
      </div>
    </div>
  )
}