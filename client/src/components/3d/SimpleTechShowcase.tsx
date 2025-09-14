import { useState, useEffect } from 'react'

interface TechCard {
  id: string
  name: string
  icon: string
  description: string
  color: string
  glowColor: string
}

const techCards: TechCard[] = [
  {
    id: 'snowflake',
    name: 'SNOWFLAKE',
    icon: '❄️',
    description: 'Cloud Data Platform',
    color: '#29B5E8',
    glowColor: '#4FC3F7'
  },
  {
    id: 'powerbi',
    name: 'POWER BI',
    icon: '📊',
    description: 'Business Intelligence',
    color: '#F2C811',
    glowColor: '#FFD54F'
  },
  {
    id: 'databricks',
    name: 'DATABRICKS',
    icon: '🧱',
    description: 'Unified Analytics Platform',
    color: '#FF3621',
    glowColor: '#FF6B6B'
  },
  {
    id: 'aiml',
    name: 'AI/ML',
    icon: '🤖',
    description: 'Machine Learning',
    color: '#00D4AA',
    glowColor: '#4ECDC4'
  },
  {
    id: 'fabric',
    name: 'MS FABRIC',
    icon: '🏭',
    description: 'Data & Analytics Platform',
    color: '#0078D4',
    glowColor: '#42A5F5'
  }
]

function FloatingTechCard({ card, delay = 0 }: { card: TechCard; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <div 
      className={`relative p-4 rounded-lg border-2 transition-all duration-1000 transform hover:scale-105 hover:rotate-1 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{
        borderColor: card.color,
        background: `linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(26, 26, 46, 0.9) 100%)`,
        boxShadow: `0 0 20px ${card.glowColor}40, inset 0 0 10px ${card.glowColor}20`,
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay * 0.2}s`
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-lg opacity-20 blur-md"
        style={{
          background: `linear-gradient(135deg, ${card.glowColor} 0%, transparent 70%)`,
          animation: `pulse 2s ease-in-out infinite`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Icon */}
        <div 
          className="text-4xl mb-2 animate-bounce"
          style={{ 
            color: card.color,
            textShadow: `0 0 10px ${card.glowColor}`,
            animationDelay: `${delay * 0.1}s`
          }}
        >
          {card.icon}
        </div>
        
        {/* Name */}
        <h3 
          className="text-sm font-bold mb-1 tracking-wider"
          style={{ color: card.color }}
        >
          {card.name}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-white/70 leading-tight">
          {card.description}
        </p>
      </div>
      
      {/* Connecting line */}
      <div 
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.glowColor}, transparent)`,
          animation: `lineGlow 3s ease-in-out infinite`
        }}
      />
    </div>
  )
}

export function SimpleTechShowcase({ 
  className = '',
  height = '300px',
  layout = 'horizontal'
}: {
  className?: string
  height?: string
  layout?: 'horizontal' | 'grid'
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % techCards.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ height }}
    >
      {/* Starfield background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Network connections */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {techCards.map((_, index) => (
          <line
            key={index}
            x1={`${20 + index * 15}%`}
            y1="50%"
            x2={`${35 + index * 15}%`}
            y2="50%"
            stroke="#4FC3F7"
            strokeWidth="1"
            strokeDasharray="5,5"
            style={{
              animation: `drawNetwork ${4 + index}s linear infinite`
            }}
          />
        ))}
      </svg>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center p-4">
        {layout === 'horizontal' ? (
          <div className="flex space-x-4 overflow-x-auto">
            {techCards.slice(0, 3).map((card, index) => (
              <FloatingTechCard 
                key={card.id} 
                card={card} 
                delay={index * 200}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {techCards.map((card, index) => (
              <FloatingTechCard 
                key={card.id} 
                card={card} 
                delay={index * 150}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Status indicator */}
      <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-2 text-cyan-400 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>ONLINE</span>
        </div>
      </div>
      
      {/* Tech count */}
      <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm border border-purple-400/30 rounded-lg p-2 text-purple-400 font-mono text-xs">
        <div className="text-center">
          <div className="text-sm font-bold">{techCards.length}</div>
          <div className="text-[10px] opacity-80">PLATFORMS</div>
        </div>
      </div>
    </div>
  )
}

export function CompactTechShowcase({ 
  className = '',
  height = '200px'
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
        background: 'linear-gradient(135deg, #0a0a23 0%, #1a1a3a 50%, #2a2a4a 100%)'
      }}
    >
      {/* Enhanced starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 200 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${2 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <SimpleTechShowcase 
          height="100%"
          layout="grid"
          className="w-full max-w-4xl"
        />
      </div>
      
      {/* System info overlay */}
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
    </div>
  )
}