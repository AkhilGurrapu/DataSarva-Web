import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { EnhancedTechLogos } from "@/components/3d/SimpleTechShowcase";
// Removed CSSMountainEnvironment import for better performance

const HeroSection = () => {
  // Simplified component without heavy animations

  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 text-white overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      {/* Simplified background */}
      <div className="absolute inset-0 opacity-20">
        {/* Simple starfield */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full w-1 h-1"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          <div className="w-full lg:w-3/5 mb-8 sm:mb-10 lg:mb-0 text-center lg:text-left">
            <div className="mb-6 sm:mb-8">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white/20">
                <span className="text-cyan-400">🚀</span> DataSarva Universe
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                AI & Analytics
                <br />
                <span className="text-white">Resource Hub</span>
              </h1>
            </div>

            <div className="space-y-6 sm:space-y-8">
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
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      AI
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">AI/ML Resources</h3>
                      <p className="text-sm text-white/80">Models, frameworks & tools</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-lg">
                      📊
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Analytics Platform</h3>
                      <p className="text-sm text-white/80">Real-time insights & BI</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:border-green-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg flex items-center justify-center text-white text-lg">
                      🔧
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Open Source Tools</h3>
                      <p className="text-sm text-white/80">Free community resources</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:border-orange-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white text-lg">
                      📚
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Learning Hub</h3>
                      <p className="text-sm text-white/80">Tutorials & documentation</p>
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
          <div className="w-full lg:w-2/5">
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              {/* Enhanced Tech Logos Display */}
              <div className="absolute top-0 left-0 w-full h-full">
                <EnhancedTechLogos height="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
