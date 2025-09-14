import { useState } from "react";
import { ArrowRight, Download, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Resource } from "@/lib/types";
import { CSSMountainBackdrop } from "@/components/3d/CSSMountainEnvironment";

const resources: Resource[] = [
  {
    id: "whitepaper-1",
    title: "The AI Revolution in Data Analytics: 2024 Trends Report",
    description: "Comprehensive analysis of how artificial intelligence is transforming data analytics, featuring real-world case studies and implementation strategies.",
    category: "whitepapers",
    readTime: "12 min read",
    image: "https://unsplash.com/photos/person-writing-on-white-paper-vw3Ahg4x1tY/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y2xvdWQlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzE3MzcxMzAxfDA&force=true&w=1920",
    link: "#whitepaper-1",
    linkText: "Download PDF",
    linkIcon: "Download"
  },
  {
    id: "casestudy-1",
    title: "Fortune 500 Company's ML-Powered Analytics Transformation",
    description: "How a major enterprise deployed machine learning models to automate their data pipeline and achieved 40% faster insights delivery.",
    category: "casestudies",
    readTime: "8 min read",
    image: "https://unsplash.com/photos/people-sitting-in-front-of-computer-monitors-jLJ8sCmm1U0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGJhbmslMjBkYXRhfGVufDB8fHx8MTcxNzM3MTMyM3ww&force=true&w=1920",
    link: "#casestudy-1",
    linkText: "Read Case Study",
    linkIcon: "ArrowRight"
  },
  {
    id: "guide-1",
    title: "Complete Guide to MLOps: From Development to Production",
    description: "Step-by-step guide to implementing MLOps practices, including model versioning, automated testing, and continuous deployment.",
    category: "guides",
    readTime: "20 min read",
    image: "https://unsplash.com/photos/turned-on-gray-laptop-computer-hxkdPpZMCcE/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHNub3dmbGFrZSUyMGRhdGF8ZW58MHx8fHwxNzE3MzcxMzQxfDA&force=true&w=1920",
    link: "#guide-1",
    linkText: "Read Guide",
    linkIcon: "ArrowRight"
  },
  {
    id: "webinar-1",
    title: "Real-Time AI Analytics: Building Streaming ML Pipelines",
    description: "Deep dive into creating real-time machine learning pipelines with Apache Kafka, Spark, and modern ML frameworks.",
    category: "webinars",
    readTime: "50 min",
    image: "https://unsplash.com/photos/woman-wearing-gray-blazer-8Nppf8IG54Y/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8d2ViaW5hcnxlbnwwfHx8fDE3MTczNzEzNTd8MA&force=true&w=1920",
    link: "#webinar-1",
    linkText: "Watch Webinar",
    linkIcon: "Play"
  },
  {
    id: "whitepaper-2",
    title: "RAG Systems in Production: Architecture and Best Practices",
    description: "Comprehensive guide to building and deploying Retrieval-Augmented Generation systems for enterprise applications.",
    category: "whitepapers",
    readTime: "15 min read",
    image: "https://unsplash.com/photos/person-typing-on-laptop-computer-hpjSkU2UYSU/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZGF0YSUyMGdvdmVybmFuY2V8ZW58MHx8fHwxNzE3MzcxMzc0fDA&force=true&w=1920",
    link: "#whitepaper-2",
    linkText: "Download PDF",
    linkIcon: "Download"
  },
  {
    id: "guide-2",
    title: "Open Source AI Tools: Your Complete Toolkit",
    description: "Curated collection of the best open-source AI and ML tools, with installation guides and practical examples.",
    category: "guides",
    readTime: "25 min read",
    image: "https://unsplash.com/photos/person-using-macbook-pro-on-desk-N_Y88TWmGwA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGRhc2hib2FyZHxlbnwwfHx8fDE3MTczNzEzODl8MA&force=true&w=1920",
    link: "#guide-2",
    linkText: "Read Guide",
    linkIcon: "ArrowRight"
  }
];

// Map of category to colors
const categoryColors: Record<string, string> = {
  whitepapers: "bg-primary",
  casestudies: "bg-secondary",
  guides: "bg-accent",
  webinars: "bg-primary"
};

// Map of link icon to component
const iconComponents = {
  ArrowRight,
  Download,
  Play
};

const ResourcesSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterResources = (resources: Resource[]) => {
    if (activeFilter === "all") return resources;
    return resources.filter(resource => resource.category === activeFilter);
  };

  return (
    <CSSMountainBackdrop 
      height="auto"
      className="py-20 relative overflow-hidden"
      showSnow={true}
      intensity="medium"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Knowledge Center
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Access comprehensive resources, guides, and insights to accelerate your data and AI journey
          </p>
        </div>

        {/* Resource Filters */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="flex flex-wrap gap-2 text-center">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              className={`rounded-full border ${
                activeFilter === "all" 
                  ? "bg-white/20 backdrop-blur-sm text-white border-white/40" 
                  : "border-white/40 text-white hover:bg-white/20 hover:backdrop-blur-sm"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All Resources
            </Button>
            <Button
              variant={activeFilter === "whitepapers" ? "default" : "outline"}
              className={`rounded-full border ${
                activeFilter === "whitepapers" 
                  ? "bg-white/20 backdrop-blur-sm text-white border-white/40" 
                  : "border-white/40 text-white hover:bg-white/20 hover:backdrop-blur-sm"
              }`}
              onClick={() => setActiveFilter("whitepapers")}
            >
              White Papers
            </Button>
            <Button
              variant={activeFilter === "casestudies" ? "default" : "outline"}
              className={`rounded-full border ${
                activeFilter === "casestudies" 
                  ? "bg-white/20 backdrop-blur-sm text-white border-white/40" 
                  : "border-white/40 text-white hover:bg-white/20 hover:backdrop-blur-sm"
              }`}
              onClick={() => setActiveFilter("casestudies")}
            >
              Case Studies
            </Button>
            <Button
              variant={activeFilter === "guides" ? "default" : "outline"}
              className={`rounded-full border ${
                activeFilter === "guides" 
                  ? "bg-white/20 backdrop-blur-sm text-white border-white/40" 
                  : "border-white/40 text-white hover:bg-white/20 hover:backdrop-blur-sm"
              }`}
              onClick={() => setActiveFilter("guides")}
            >
              Guides & Tutorials
            </Button>
            <Button
              variant={activeFilter === "webinars" ? "default" : "outline"}
              className={`rounded-full border ${
                activeFilter === "webinars" 
                  ? "bg-white/20 backdrop-blur-sm text-white border-white/40" 
                  : "border-white/40 text-white hover:bg-white/20 hover:backdrop-blur-sm"
              }`}
              onClick={() => setActiveFilter("webinars")}
            >
              Webinars
            </Button>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterResources(resources).map((resource) => {
            const IconComponent = iconComponents[resource.linkIcon as keyof typeof iconComponents];
            
            return (
              <Card 
                key={resource.id}
                className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40"
              >
                <div className="h-48 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${resource.image})` }}
                    aria-label={`${resource.title} illustration`}
                  ></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Badge 
                      variant="default" 
                      className={`${categoryColors[resource.category]} text-white text-xs font-bold py-1 px-2 rounded mr-2`}
                    >
                      {resource.category === "whitepapers" ? "White Paper" : 
                       resource.category === "casestudies" ? "Case Study" : 
                       resource.category === "guides" ? "Guide" : "Webinar"}
                    </Badge>
                    <span className="text-xs text-white/70">{resource.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{resource.title}</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    {resource.description}
                  </p>
                  <a 
                    href={resource.link} 
                    className="text-cyan-400 font-medium flex items-center hover:underline hover:text-cyan-300"
                  >
                    {resource.linkText}
                    <IconComponent className="ml-1 w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white"
            size="lg"
            asChild
          >
            <a href="/resources">View All Resources</a>
          </Button>
        </div>
      </div>
    </CSSMountainBackdrop>
  );
};

export default ResourcesSection;
