import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function ContentSections() {
  // Removed heavy scroll animations for better performance

  return (
    <div className="relative">
      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Comprehensive Data Platform
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build, deploy, and scale modern data solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                🤖
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">AI/ML Pipeline</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                End-to-end machine learning workflows with automated model training, validation, and deployment
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li>• AutoML & Neural Architecture Search</li>
                <li>• Model Versioning & Experiment Tracking</li>
                <li>• Real-time Model Serving</li>
                <li>• A/B Testing Framework</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                📊
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Real-time Analytics</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Stream processing and real-time dashboards for instant insights and decision-making
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li>• Event Stream Processing</li>
                <li>• Interactive Dashboards</li>
                <li>• Custom Metrics & KPIs</li>
                <li>• Anomaly Detection</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:border-green-400/50 transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                🔧
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Data Engineering</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Robust data pipelines and infrastructure for scalable data processing and storage
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li>• ETL/ELT Pipeline Management</li>
                <li>• Data Quality Monitoring</li>
                <li>• Schema Evolution</li>
                <li>• Data Lineage Tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Resources Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Learning Resources
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive guides, tutorials, and documentation to accelerate your data journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:border-teal-400/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                📚
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Documentation</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Comprehensive guides covering setup, configuration, and best practices
              </p>
              <Link href="/docs">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold w-full sm:w-auto">
                  Browse Docs
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                🎓
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Tutorials</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Step-by-step tutorials from beginner to advanced levels
              </p>
              <Link href="/tutorials">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full sm:w-auto">
                  Start Learning
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                💡
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Examples</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Real-world examples and use cases with complete source code
              </p>
              <Link href="/examples">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold w-full sm:w-auto">
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}