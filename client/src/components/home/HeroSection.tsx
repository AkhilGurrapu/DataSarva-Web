import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-accent pt-32 pb-24 md:pt-40 md:pb-32 text-white">
      <div className="container mx-auto px-6">
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
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 ml-12">
                <div className="text-primary font-mono text-sm mb-2">Snowflake Integration</div>
                <div className="h-32 bg-neutral-100 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-32 h-24">
                    <rect width="24" height="24" fill="#0047AB" rx="4" />
                    <path d="M12 6v12M7 12h10M8 9l8 6M8 15l8-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 mr-12">
                <div className="text-accent font-mono text-sm mb-2">AI Applications</div>
                <div className="h-32 bg-neutral-100 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-32 h-24">
                    <rect width="24" height="24" fill="#4B0082" rx="4" />
                    <path d="M12 4v4M12 16v4M8 12H4M20 12h-4M7 7l2 2M15 15l2 2M7 17l2-2M15 9l2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg ml-6">
                <div className="text-secondary font-mono text-sm mb-2">Databricks Solutions</div>
                <div className="h-32 bg-neutral-100 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-32 h-24">
                    <rect width="24" height="24" fill="#2E8B57" rx="4" />
                    <path d="M6 8h12M6 12h12M6 16h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="9" cy="8" r="1" fill="white" />
                    <circle cx="12" cy="12" r="1" fill="white" />
                    <circle cx="15" cy="16" r="1" fill="white" />
                  </svg>
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
