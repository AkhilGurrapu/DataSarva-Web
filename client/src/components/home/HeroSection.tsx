import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { EnhancedTechLogos } from "@/components/3d/SimpleTechShowcase";
import { CSSMountainEnvironment } from "@/components/3d/CSSMountainEnvironment";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

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

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrolled = window.pageYOffset;
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      
      // Enhanced parallax effect for background elements
      const parallaxElements = section.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.2;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px) scale(${1 + scrolled * 0.0001})`;
      });

      // Advanced content animations based on scroll position
      const scrollPercent = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      
      // Title slide-in animation
      if (titleRef.current) {
        const titleTransform = Math.max(0, (1 - scrollPercent) * 50);
        titleRef.current.style.transform = `translateY(-${titleTransform}px)`;
        titleRef.current.style.opacity = Math.max(0.3, scrollPercent).toString();
      }
      
      // Content fade and slide animation
      if (contentRef.current) {
        const contentTransform = Math.max(0, (1 - scrollPercent) * 30);
        contentRef.current.style.transform = `translateY(${contentTransform}px)`;
        contentRef.current.style.opacity = Math.max(0.5, scrollPercent).toString();
      }
      
      // Visual section 3D rotation effect
      if (visualRef.current) {
        const rotateX = (1 - scrollPercent) * 15;
        const rotateY = (1 - scrollPercent) * 10;
        visualRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      // Advanced tech module animations
      const techModules = section.querySelectorAll('.tech-module');
      techModules.forEach((module, index) => {
        const element = module as HTMLElement;
        const moduleScrollOffset = scrolled * (0.1 + index * 0.02);
        const rotateValue = scrolled * 0.1 + index * 10;
        element.style.transform = `translateY(${moduleScrollOffset}px) rotate(${rotateValue}deg) scale(${1 + scrollPercent * 0.1})`;
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      
      // Initial animation trigger
      handleScroll();
      
      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <CSSMountainEnvironment 
      height="100vh"
      showSnow={true}
      intensity="light"
      className="relative overflow-hidden"
    >
      <section 
        ref={sectionRef}
        className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 text-white overflow-hidden"
      >
      {/* Network Nodes Background */}
      <div className="absolute inset-0 overflow-hidden parallax-bg">
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
        <div className="absolute top-20 right-20 opacity-30 parallax-bg">
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
        
        <div className="absolute bottom-32 left-16 opacity-25 parallax-bg">
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
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 opacity-40 parallax-bg">
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          <div className="w-full lg:w-3/5 mb-8 sm:mb-10 lg:mb-0 text-center lg:text-left">
            <div ref={titleRef} className="mb-6 sm:mb-8" style={{ opacity: 0.3 }}>
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white/20">
                <span className="text-cyan-400">🚀</span> DataSarva Universe
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                AI & Analytics
                <br />
                <span className="text-white">Resource Hub</span>
              </h1>
            </div>
            
            <div ref={contentRef} className="space-y-6 sm:space-y-8" style={{ opacity: 0.5 }}>
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-cyan-100">
                  Transform your data journey with comprehensive resources, tools, and insights
                </p>
                <p className="text-lg sm:text-xl opacity-90 leading-relaxed max-w-2xl">
                  From machine learning frameworks to real-time analytics, discover cutting-edge solutions that power modern data-driven organizations.
                </p>
              </div>
              
              {/* Key Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">AI</div>
                    <div>
                      <h3 className="font-semibold">AI/ML Resources</h3>
                      <p className="text-sm opacity-80">Models, frameworks & tools</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">📊</div>
                    <div>
                      <h3 className="font-semibold">Analytics Platform</h3>
                      <p className="text-sm opacity-80">Real-time insights & BI</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:border-green-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold">🔧</div>
                    <div>
                      <h3 className="font-semibold">Open Source Tools</h3>
                      <p className="text-sm opacity-80">Free community resources</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:border-orange-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">📚</div>
                    <div>
                      <h3 className="font-semibold">Learning Hub</h3>
                      <p className="text-sm opacity-80">Tutorials & documentation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Link href="#products">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold w-full sm:w-auto transform hover:scale-105 transition-all duration-300"
                  >
                    🚀 Explore Resources
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white w-full sm:w-auto transform hover:scale-105 transition-all duration-300"
                  >
                    💎 Free Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div ref={visualRef} className="w-full lg:w-2/5">
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]"
                 style={{
                   animation: 'slideInFromRight 1s ease-out',
                   animationDelay: '0.8s',
                   opacity: '0',
                   animationFillMode: 'forwards'
                 }}>
              
              {/* Enhanced Tech Logos Display */}
              <div className="absolute top-0 left-0 w-full h-full">
                <EnhancedTechLogos height="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </CSSMountainEnvironment>
  );
};

export default HeroSection;
