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
      className={`relative p-2 sm:p-3 md:p-4 rounded-lg border transition-all duration-1000 transform hover:scale-105 min-h-[80px] sm:min-h-[100px] md:min-h-[120px] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{
        borderColor: `${card.color}40`,
        background: `linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)`,
        backdropFilter: 'blur(10px)',
        boxShadow: `0 0 15px ${card.glowColor}20, inset 0 0 5px ${card.glowColor}10`,
        animation: `gentleFloat 8s ease-in-out infinite`,
        animationDelay: `${delay * 0.2}s`
      }}
    >
      {/* Subtle glow effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-10 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${card.glowColor} 0%, transparent 60%)`,
          animation: `gentlePulse 4s ease-in-out infinite`
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center h-full flex flex-col justify-center">
        {/* Icon */}
        <div
          className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2"
          style={{
            color: card.color,
            textShadow: `0 0 8px ${card.glowColor}50`,
            animation: `gentleGlow 3s ease-in-out infinite`,
            animationDelay: `${delay * 0.1}s`
          }}
        >
          {card.icon}
        </div>

        {/* Name */}
        <h3
          className="text-xs sm:text-sm md:text-sm font-bold mb-1 tracking-wider leading-tight"
          style={{ color: card.color }}
        >
          {card.name}
        </h3>

        {/* Description */}
        <p className="text-[10px] sm:text-xs md:text-xs text-white/60 leading-tight px-1">
          {card.description}
        </p>
      </div>

      {/* Subtle connecting line */}
      <div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-px opacity-40"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.glowColor}60, transparent)`,
          animation: `subtleLineGlow 4s ease-in-out infinite`
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
      <div className="relative z-10 h-full flex items-center justify-center p-2 sm:p-4">
        {layout === 'horizontal' ? (
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 px-2 w-full">
            {techCards.map((card, index) => (
              <div key={card.id} className="flex-shrink-0 w-24 sm:w-32 md:w-40">
                <FloatingTechCard
                  card={card}
                  delay={index * 200}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 w-full max-w-6xl px-2">
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
        background: 'transparent',
        minHeight: '300px' // Ensure minimum height for mobile visibility
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