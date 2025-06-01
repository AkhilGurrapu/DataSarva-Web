import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current || !particlesRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Update CSS custom properties for 3D effects
      sectionRef.current.style.setProperty('--mouse-x', x.toString());
      sectionRef.current.style.setProperty('--mouse-y', y.toString());
      
      // Animate floating particles
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, index) => {
        const element = particle as HTMLElement;
        const speed = (index % 3 + 1) * 0.5;
        const offsetX = (x - 0.5) * speed * 100;
        const offsetY = (y - 0.5) * speed * 50;
        
        element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotateX(${offsetY * 0.5}deg) rotateY(${offsetX * 0.5}deg)`;
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-r from-primary to-accent pt-32 pb-24 md:pt-40 md:pb-32 text-white overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0047AB 0%, #4B0082 50%, #2E8B57 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
      }}
    >
      {/* Network Nodes Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Dots */}
        <div className="absolute inset-0">
          {Array.from({ length: 80 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                animation: `twinkle ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Network Connection Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40" style={{ zIndex: 1 }}>
          {/* Animated connection lines */}
          <path
            d="M100,100 Q300,200 500,150 T800,250 L1000,200"
            stroke="rgba(34, 197, 94, 0.6)"
            strokeWidth="2"
            fill="none"
            style={{
              strokeDasharray: '20 10',
              animation: 'drawNetwork 8s linear infinite'
            }}
          />
          <path
            d="M150,300 Q400,150 650,300 T900,200"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="1.5"
            fill="none"
            style={{
              strokeDasharray: '15 8',
              animation: 'drawNetwork 12s linear infinite reverse'
            }}
          />
          <path
            d="M50,250 Q200,400 400,250 T700,350 L950,300"
            stroke="rgba(168, 85, 247, 0.4)"
            strokeWidth="1"
            fill="none"
            style={{
              strokeDasharray: '10 5',
              animation: 'drawNetwork 10s linear infinite'
            }}
          />
        </svg>

        {/* Moving Network Nodes */}
        <div ref={particlesRef} className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${20 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
                animation: `nodeFloat ${6 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <div 
                className="w-4 h-4 bg-green-400 rounded-full"
                style={{
                  boxShadow: '0 0 15px rgba(34, 197, 94, 0.8)',
                  animation: `pulse ${2 + Math.random()}s ease-in-out infinite`
                }}
              />
              {/* Connection lines from each node */}
              <div 
                className="absolute top-2 left-2 w-20 h-px bg-gradient-to-r from-green-400 to-transparent opacity-60"
                style={{
                  transformOrigin: 'left center',
                  animation: `lineGlow ${3 + Math.random() * 2}s ease-in-out infinite`
                }}
              />
            </div>
          ))}
        </div>

        {/* 3D Geometric Shapes */}
        <div className="absolute top-20 right-20 opacity-30">
          <div 
            className="w-32 h-32 border-2 border-green-400"
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)',
              animation: 'float3D 8s ease-in-out infinite',
              transform: 'perspective(500px) rotateX(45deg) rotateY(45deg)'
            }}
          />
        </div>
        
        <div className="absolute bottom-32 left-16 opacity-25">
          <div 
            className="w-24 h-24 border border-blue-400"
            style={{
              borderRadius: '30%',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              animation: 'float3D 6s ease-in-out infinite reverse',
              transform: 'perspective(400px) rotateZ(45deg)'
            }}
          />
        </div>

        {/* Large Network Hub */}
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 opacity-40">
          <div 
            className="w-40 h-40 border-2 border-green-400 rounded-lg"
            style={{
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)',
              animation: 'networkHub 10s linear infinite',
              transform: 'perspective(600px) rotateX(30deg) rotateY(20deg)'
            }}
          >
            {/* Inner geometric pattern */}
            <div className="absolute inset-4 border border-green-300 rounded opacity-60">
              <div className="absolute inset-2 border border-green-200 rounded opacity-40" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transform Your Data Into Business Intelligence
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Leverage the power of data analytics and AI with our enterprise solutions and expert consulting services.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#products">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-neutral-100 w-full sm:w-auto"
                >
                  Explore Solutions
                </Button>
              </Link>
              <Link href="#contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white w-full sm:w-auto"
                >
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative h-[600px]">
              {/* Central Data Sphere */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div 
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/30 flex items-center justify-center relative"
                  style={{
                    animation: 'centralSphere 10s ease-in-out infinite',
                    boxShadow: '0 0 60px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {/* Inner rotating rings */}
                  <div 
                    className="absolute inset-4 border-2 border-green-400/50 rounded-full"
                    style={{ animation: 'rotateRing 15s linear infinite' }}
                  />
                  <div 
                    className="absolute inset-8 border border-blue-400/40 rounded-full"
                    style={{ animation: 'rotateRing 12s linear infinite reverse' }}
                  />
                  
                  {/* Central icon */}
                  <div className="text-4xl font-bold text-white">∞</div>
                </div>
              </div>

              {/* Floating Tech Modules */}
              <div 
                className="absolute top-16 left-16 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: 'floatModule 8s ease-in-out infinite',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80 font-mono">SNOWFLAKE</span>
                </div>
                <div className="text-2xl">❄️</div>
                <div className="text-xs text-white/60 mt-1">Cloud DW</div>
              </div>

              <div 
                className="absolute top-32 right-12 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: 'floatModule 8s ease-in-out infinite 2s',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80 font-mono">AI/ML</span>
                </div>
                <div className="text-2xl">🤖</div>
                <div className="text-xs text-white/60 mt-1">GPT • LLMs • GenAI</div>
              </div>

              <div 
                className="absolute bottom-24 left-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: 'floatModule 8s ease-in-out infinite 4s',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80 font-mono">DATABRICKS</span>
                </div>
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="20" width="24" height="6" rx="1" fill="#FF3621"/>
                  <rect x="6" y="14" width="20" height="6" rx="1" fill="#FF5722"/>
                  <rect x="8" y="8" width="16" height="6" rx="1" fill="#FF6B35"/>
                  <rect x="10" y="2" width="12" height="6" rx="1" fill="#FF8C42"/>
                </svg>
                <div className="text-xs text-white/60 mt-1">Unified Analytics</div>
              </div>

              <div 
                className="absolute bottom-16 right-20 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: 'floatModule 8s ease-in-out infinite 6s',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80 font-mono">MS FABRIC</span>
                </div>
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                  <path d="M4 8 Q8 4 16 8 Q24 12 28 8 Q24 16 16 12 Q8 8 4 16 Q8 20 16 16 Q24 20 28 16 Q24 24 16 20 Q8 16 4 24 Z" fill="url(#fabricGradient1)"/>
                  <path d="M6 12 Q12 8 20 12 Q26 16 24 20 Q18 16 10 20 Q6 16 6 12 Z" fill="url(#fabricGradient2)"/>
                  <defs>
                    <linearGradient id="fabricGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#40E0D0"/>
                      <stop offset="50%" stopColor="#20B2AA"/>
                      <stop offset="100%" stopColor="#008B8B"/>
                    </linearGradient>
                    <linearGradient id="fabricGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#48CAE4"/>
                      <stop offset="100%" stopColor="#0077B6"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-xs text-white/60 mt-1">Unified Platform</div>
              </div>

              <div 
                className="absolute top-1/2 left-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: 'floatModule 8s ease-in-out infinite 8s',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80 font-mono">POWER BI</span>
                </div>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#F59E0B" strokeWidth="1" fill="none"/>
                  <rect x="6" y="12" width="3" height="6" fill="#F59E0B"/>
                  <rect x="10" y="8" width="3" height="10" fill="#FBBF24"/>
                  <rect x="14" y="6" width="3" height="12" fill="#FCD34D"/>
                  <circle cx="18" cy="6" r="1" fill="#F59E0B"/>
                </svg>
                <div className="text-xs text-white/60 mt-1">Visualization</div>
              </div>

              {/* Data Flow Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Animated connection lines to central sphere */}
                {/* Snowflake (blue) */}
                <path
                  d="M80,80 Q200,150 240,300"
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="2"
                  fill="none"
                  style={{
                    strokeDasharray: '10 5',
                    animation: 'dataFlow 4s ease-in-out infinite'
                  }}
                />
                {/* AI/ML (purple) */}
                <path
                  d="M320,150 Q300,200 240,300"
                  stroke="rgba(168, 85, 247, 0.4)"
                  strokeWidth="2"
                  fill="none"
                  style={{
                    strokeDasharray: '8 4',
                    animation: 'dataFlow 4s ease-in-out infinite 1s'
                  }}
                />
                {/* Databricks (orange) */}
                <path
                  d="M80,450 Q160,380 240,300"
                  stroke="rgba(251, 146, 60, 0.4)"
                  strokeWidth="2"
                  fill="none"
                  style={{
                    strokeDasharray: '12 6',
                    animation: 'dataFlow 4s ease-in-out infinite 2s'
                  }}
                />
                {/* Microsoft Fabric (indigo) */}
                <path
                  d="M360,480 Q300,400 240,300"
                  stroke="rgba(129, 140, 248, 0.4)"
                  strokeWidth="2"
                  fill="none"
                  style={{
                    strokeDasharray: '6 3',
                    animation: 'dataFlow 4s ease-in-out infinite 3s'
                  }}
                />
                {/* Power BI (yellow) */}
                <path
                  d="M40,300 Q140,300 240,300"
                  stroke="rgba(234, 179, 8, 0.4)"
                  strokeWidth="2"
                  fill="none"
                  style={{
                    strokeDasharray: '8 6',
                    animation: 'dataFlow 4s ease-in-out infinite 4s'
                  }}
                />
              </svg>

              {/* Floating Data Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `particleFloat ${4 + Math.random() * 8}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 4}s`
                    }}
                  />
                ))}
              </div>

              {/* Holographic Display */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-3 rounded border border-cyan-400/50 font-mono text-xs text-cyan-400">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>SYSTEM STATUS</span>
                </div>
                <div className="space-y-1 text-[10px]">
                  <div>CPU: 97% ████████░</div>
                  <div>MEM: 84% ███████░░</div>
                  <div>NET: 156 Mbps ████████████</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
