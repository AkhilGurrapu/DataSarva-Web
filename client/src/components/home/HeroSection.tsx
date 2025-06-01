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
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(1000px) rotateX(25deg) translateZ(-100px)',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        
        {/* Floating Particles */}
        <div ref={particlesRef} className="absolute inset-0">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'blur(0.5px)',
                boxShadow: '0 0 10px rgba(255,255,255,0.8)'
              }}
            />
          ))}
        </div>

        {/* 3D Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
          <div 
            className="w-full h-full border-2 border-white"
            style={{
              transform: 'perspective(400px) rotateX(45deg) rotateY(45deg)',
              animation: 'rotate3d 15s linear infinite'
            }}
          />
        </div>
        
        <div className="absolute bottom-20 right-20 w-24 h-24 opacity-30">
          <div 
            className="w-full h-full bg-white rounded-full"
            style={{
              transform: 'perspective(400px) rotateX(30deg)',
              animation: 'pulse 3s ease-in-out infinite, rotate3d 12s linear infinite reverse'
            }}
          />
        </div>

        {/* Data Visualization Elements */}
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-40">
          <svg width="120" height="80" viewBox="0 0 120 80" className="text-white">
            <path 
              d="M10,60 Q30,20 50,40 T90,30 L110,10" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ animation: 'drawLine 4s ease-in-out infinite' }}
            />
            {Array.from({ length: 6 }, (_, i) => (
              <circle
                key={i}
                cx={10 + i * 20}
                cy={60 - Math.random() * 40}
                r="3"
                fill="currentColor"
                style={{
                  animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </svg>
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
            <div className="relative">
              {/* Floating Data Cards with 3D Effects */}
              <div 
                className="bg-white p-6 rounded-lg shadow-lg mb-6 ml-12 transform transition-all duration-300 hover:scale-105"
                style={{
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  animation: 'float 6s ease-in-out infinite',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                }}
              >
                <div className="text-primary font-mono text-sm mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Snowflake Integration
                </div>
                <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded flex items-center justify-center relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 20px 20px, #0047AB 2px, transparent 2px)',
                      backgroundSize: '40px 40px',
                      animation: 'gridMove 8s linear infinite'
                    }}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-32 h-24 relative z-10">
                    <rect width="24" height="24" fill="#0047AB" rx="4" />
                    <path d="M12 6v12M7 12h10M8 9l8 6M8 15l8-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {/* Data flow animation */}
                  <div className="absolute top-2 right-2">
                    <div 
                      className="w-1 h-1 bg-blue-500 rounded-full"
                      style={{ animation: 'dataFlow 3s ease-in-out infinite' }}
                    />
                  </div>
                </div>
              </div>
              
              <div 
                className="bg-white p-6 rounded-lg shadow-lg mb-6 mr-12 transform transition-all duration-300 hover:scale-105"
                style={{
                  transform: 'perspective(1000px) rotateY(5deg)',
                  animation: 'float 6s ease-in-out infinite 2s',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                }}
              >
                <div className="text-accent font-mono text-sm mb-2 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  AI Applications
                </div>
                <div className="h-32 bg-gradient-to-br from-purple-50 to-purple-100 rounded flex items-center justify-center relative overflow-hidden">
                  {/* Neural network pattern */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
                        style={{
                          left: `${20 + (i % 3) * 30}%`,
                          top: `${20 + Math.floor(i / 3) * 25}%`,
                          animation: `pulse ${1 + Math.random()}s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-30">
                      <path d="M30,30 Q50,50 70,30 T90,70" stroke="#8B5CF6" strokeWidth="1" fill="none" />
                      <path d="M30,70 Q50,50 70,70 T90,30" stroke="#8B5CF6" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-32 h-24 relative z-10">
                    <rect width="24" height="24" fill="#4B0082" rx="4" />
                    <path d="M12 4v4M12 16v4M8 12H4M20 12h-4M7 7l2 2M15 15l2 2M7 17l2-2M15 9l2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              </div>
              
              <div 
                className="bg-white p-6 rounded-lg shadow-lg ml-6 transform transition-all duration-300 hover:scale-105"
                style={{
                  transform: 'perspective(1000px) rotateY(-3deg)',
                  animation: 'float 6s ease-in-out infinite 4s',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                }}
              >
                <div className="text-green-600 font-mono text-sm mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Real-time Analytics
                </div>
                <div className="h-32 bg-gradient-to-br from-green-50 to-green-100 rounded flex items-center justify-center relative overflow-hidden">
                  {/* Live data visualization */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full opacity-40">
                      {Array.from({ length: 20 }, (_, i) => (
                        <rect
                          key={i}
                          x={5 + i * 6}
                          y={60 - Math.random() * 40}
                          width="4"
                          height={Math.random() * 40 + 20}
                          fill="#10B981"
                          style={{
                            animation: `pulse ${1 + Math.random()}s ease-in-out infinite`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-32 h-24 relative z-10">
                    <rect width="24" height="24" fill="#2E8B57" rx="4" />
                    <path d="M3 12l2-2 4 4 6-6 6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="7" cy="12" r="1" fill="white" />
                    <circle cx="13" cy="8" r="1" fill="white" />
                    <circle cx="19" cy="14" r="1" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full opacity-60"
                    style={{
                      animation: `orbitRotate ${10 + i * 5}s linear infinite`,
                      animationDelay: `${i * 2}s`,
                      transformOrigin: '0 0'
                    }}
                  />
                ))}
              </div>

              {/* Floating code snippets */}
              <div className="absolute top-10 right-0 bg-gray-900 text-green-400 p-3 rounded font-mono text-xs opacity-80 transform rotate-3">
                <div>SELECT * FROM analytics</div>
                <div className="text-blue-400">WHERE insights {'>'} 0</div>
              </div>
              
              <div className="absolute bottom-10 left-0 bg-gray-900 text-yellow-400 p-3 rounded font-mono text-xs opacity-80 transform -rotate-2">
                <div>AI.predict(data)</div>
                <div className="text-green-400">// 97% accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
