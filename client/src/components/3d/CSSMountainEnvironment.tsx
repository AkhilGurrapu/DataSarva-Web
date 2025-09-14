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

export function CSSMountainEnvironment({ 
  children, 
  intensity = 'medium', 
  showSnow = true, 
  showBlizzard = false,
  mountainColor = '#2C3E50',
  snowColor = '#FFFFFF',
  height = '100vh',
  className = ''
}: MountainEnvironmentProps) {
  const getSnowCount = () => {
    switch (intensity) {
      case 'light': return 30
      case 'medium': return 60
      case 'heavy': return 100
      default: return 60
    }
  }

  const getBlizzardCount = () => {
    return showBlizzard ? 150 : 0
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      {/* Mountain Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(to bottom, 
              rgba(135, 206, 235, 0.9) 0%,
              rgba(152, 216, 232, 0.7) 30%,
              rgba(176, 224, 230, 0.5) 70%,
              rgba(255, 255, 255, 0.3) 100%
            ),
            linear-gradient(135deg, 
              ${mountainColor} 0%, 
              #34495E 25%, 
              #3E4651 50%, 
              ${mountainColor} 75%, 
              #34495E 100%
            )
          `
        }}
      />
      
      {/* Mountain Layers */}
      <div className="absolute inset-0 z-1">
        {/* Back mountain layer */}
        <div 
          className="absolute bottom-0 left-0 w-full h-2/3 opacity-40"
          style={{
            background: `linear-gradient(to top, #3E4651 0%, transparent 100%)`,
            clipPath: `polygon(0% 100%, 8% 75%, 15% 45%, 25% 65%, 35% 35%, 45% 25%, 55% 45%, 65% 20%, 75% 55%, 85% 30%, 95% 60%, 100% 100%)`
          }}
        />
        
        {/* Middle mountain layer */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/2 opacity-60"
          style={{
            background: `linear-gradient(to top, #34495E 0%, transparent 100%)`,
            clipPath: `polygon(0% 100%, 12% 85%, 22% 55%, 32% 75%, 42% 45%, 52% 35%, 62% 60%, 72% 30%, 82% 70%, 92% 40%, 100% 100%)`
          }}
        />
        
        {/* Front mountain layer */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/3 opacity-80"
          style={{
            background: `linear-gradient(to top, ${mountainColor} 0%, transparent 100%)`,
            clipPath: `polygon(0% 100%, 10% 90%, 20% 70%, 30% 85%, 40% 60%, 50% 50%, 60% 75%, 70% 40%, 80% 80%, 90% 55%, 100% 100%)`
          }}
        />
        
        {/* Snow caps */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/3 opacity-70"
          style={{
            background: `linear-gradient(to top, transparent 60%, ${snowColor} 100%)`,
            clipPath: `polygon(0% 100%, 10% 90%, 20% 70%, 30% 85%, 40% 60%, 50% 50%, 60% 75%, 70% 40%, 80% 80%, 90% 55%, 100% 100%)`
          }}
        />
      </div>
      
      {/* Snow particles */}
      {showSnow && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {Array.from({ length: getSnowCount() }, (_, i) => (
            <div
              key={`snow-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `snowfall ${8 + Math.random() * 6}s linear infinite`,
                animationDelay: `${Math.random() * 4}s`,
                transform: `scale(${0.5 + Math.random() * 1})`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Blizzard particles */}
      {showBlizzard && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {Array.from({ length: getBlizzardCount() }, (_, i) => (
            <div
              key={`blizzard-${i}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `blizzard ${4 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `scale(${0.3 + Math.random() * 0.7})`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Atmospheric effects */}
      <div className="absolute inset-0 z-5">
        {/* Clouds */}
        <div className="absolute top-1/4 left-1/4 w-32 h-16 bg-white/10 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-24 h-12 bg-white/15 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/6 w-28 h-14 bg-white/12 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
      
      {/* Gradient overlay for better readability */}
      <div 
        className="absolute inset-0 z-15 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)'
        }}
      />
    </div>
  )
}

export function CSSMountainBackdrop({ 
  children,
  height = '600px',
  className = '',
  showSnow = true,
  intensity = 'light'
}: Pick<MountainEnvironmentProps, 'children' | 'height' | 'className' | 'showSnow' | 'intensity'>) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      {/* Simplified mountain background */}
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
      
      {/* Mountain silhouette */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/2 opacity-60"
        style={{
          background: `linear-gradient(to top, #2C3E50 0%, transparent 100%)`,
          clipPath: `polygon(0% 100%, 10% 80%, 20% 60%, 30% 70%, 40% 50%, 50% 40%, 60% 55%, 70% 35%, 80% 65%, 90% 45%, 100% 70%, 100% 100%)`
        }}
      />
      
      {/* CSS Snow particles */}
      {showSnow && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          {Array.from({ length: intensity === 'light' ? 25 : 50 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `snowfall ${8 + Math.random() * 6}s linear infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}