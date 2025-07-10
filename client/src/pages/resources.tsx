import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, ArrowRight, Play } from "lucide-react";
import { Resource } from "@/lib/types";

// Extended resources list for the resource page
const resources: Resource[] = [
  {
    id: "whitepaper-1",
    title: "Modern Cloud Data Architecture: Best Practices for 2023",
    description: "Explore the key principles and components of a modern cloud data architecture that delivers scalability, security, and performance.",
    category: "whitepapers",
    readTime: "10 min read",
    image: "https://unsplash.com/photos/person-writing-on-white-paper-vw3Ahg4x1tY/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y2xvdWQlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzE3MzcxMzAxfDA&force=true&w=1920",
    link: "#whitepaper-1",
    linkText: "Download PDF",
    linkIcon: "Download"
  },
  {
    id: "casestudy-1",
    title: "Global Bank's Journey to Data-Driven Decision Making",
    description: "How a leading financial institution transformed their data architecture to enable faster, more accurate decision making.",
    category: "casestudies",
    readTime: "8 min read",
    image: "https://unsplash.com/photos/people-sitting-in-front-of-computer-monitors-jLJ8sCmm1U0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGJhbmslMjBkYXRhfGVufDB8fHx8MTcxNzM3MTMyM3ww&force=true&w=1920",
    link: "#casestudy-1",
    linkText: "Read Case Study",
    linkIcon: "ArrowRight"
  },
  {
    id: "guide-1",
    title: "Ultimate Guide to Snowflake Cost Optimization",
    description: "Practical strategies and techniques to optimize your Snowflake implementation for performance and cost efficiency.",
    category: "guides",
    readTime: "15 min read",
    image: "https://unsplash.com/photos/turned-on-gray-laptop-computer-hxkdPpZMCcE/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHNub3dmbGFrZSUyMGRhdGF8ZW58MHx8fHwxNzE3MzcxMzQxfDA&force=true&w=1920",
    link: "#guide-1",
    linkText: "Read Guide",
    linkIcon: "ArrowRight"
  },
  {
    id: "webinar-1",
    title: "Practical AI: From Hype to Business Impact",
    description: "Join industry experts as they discuss real-world AI implementations and how to measure ROI on your AI investments.",
    category: "webinars",
    readTime: "45 min",
    image: "https://unsplash.com/photos/woman-wearing-gray-blazer-8Nppf8IG54Y/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8d2ViaW5hcnxlbnwwfHx8fDE3MTczNzEzNTd8MA&force=true&w=1920",
    link: "#webinar-1",
    linkText: "Watch Webinar",
    linkIcon: "Play"
  },
  {
    id: "whitepaper-2",
    title: "Building a Robust Data Governance Framework",
    description: "Learn how to establish effective data governance practices that balance compliance requirements with business agility.",
    category: "whitepapers",
    readTime: "12 min read",
    image: "https://unsplash.com/photos/person-typing-on-laptop-computer-hpjSkU2UYSU/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZGF0YSUyMGdvdmVybmFuY2V8ZW58MHx8fHwxNzE3MzcxMzc0fDA&force=true&w=1920",
    link: "#whitepaper-2",
    linkText: "Download PDF",
    linkIcon: "Download"
  },
  {
    id: "guide-2",
    title: "Creating Effective Power BI Dashboards: A Complete Guide",
    description: "Step-by-step instructions for designing, building, and optimizing Power BI dashboards that drive insights and action.",
    category: "guides",
    readTime: "18 min read",
    image: "https://unsplash.com/photos/person-using-macbook-pro-on-desk-N_Y88TWmGwA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGRhc2hib2FyZHxlbnwwfHx8fDE3MTczNzEzODl8MA&force=true&w=1920",
    link: "#guide-2",
    linkText: "Read Guide",
    linkIcon: "ArrowRight"
  },
  {
    id: "casestudy-2",
    title: "Retail Giant Enhances Customer Insights with AI",
    description: "How a leading retailer used AI to gain deeper customer insights and personalize their shopping experience.",
    category: "casestudies",
    readTime: "9 min read",
    image: "https://unsplash.com/photos/silver-laptop-computer-on-table-near-white-ceramic-mug-Lks7vei-eAg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8cmV0YWlsJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3MTczNzE1NjZ8MA&force=true&w=1920",
    link: "#casestudy-2",
    linkText: "Read Case Study",
    linkIcon: "ArrowRight"
  },
  {
    id: "webinar-2",
    title: "Building a Data-Driven Culture in Your Organization",
    description: "Learn strategies for fostering a data-driven culture and overcoming common organizational challenges.",
    category: "webinars",
    readTime: "40 min",
    image: "https://unsplash.com/photos/group-of-people-sitting-on-chair-inside-room-UzHQozUhLG4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29ycG9yYXRlJTIwY3VsdHVyZXxlbnwwfHx8fDE3MTczNzE1ODZ8MA&force=true&w=1920",
    link: "#webinar-2",
    linkText: "Watch Webinar",
    linkIcon: "Play"
  },
  {
    id: "whitepaper-3",
    title: "The Future of AI in Enterprise Decision Making",
    description: "Explore how artificial intelligence is transforming enterprise decision making and what to expect in the next five years.",
    category: "whitepapers",
    readTime: "14 min read",
    image: "https://unsplash.com/photos/man-in-black-suit-discussing-on-projector-screen-XJXWbfSo2f0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YWklMjBidXNpbmVzc3xlbnwwfHx8fDE3MTczNzE2MDV8MA&force=true&w=1920",
    link: "#whitepaper-3",
    linkText: "Download PDF",
    linkIcon: "Download"
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

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filterResources = (resources: Resource[]) => {
    return resources
      .filter(resource => 
        activeFilter === "all" || resource.category === activeFilter
      )
      .filter(resource => 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const filteredResources = filterResources(resources);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Data Insights Hub</h1>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Explore our comprehensive library of data technology analysis, industry insights, and practical guides to stay ahead in the modern data landscape.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search resources..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
            </div>
          </div>

          {/* Resource Filters */}
          <div className="flex flex-wrap justify-center mb-12">
            <div className="flex flex-wrap gap-2 text-center">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                className={`rounded-full border ${
                  activeFilter === "all" 
                    ? "bg-primary text-white" 
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }`}
                onClick={() => setActiveFilter("all")}
              >
                All Resources
              </Button>
              <Button
                variant={activeFilter === "whitepapers" ? "default" : "outline"}
                className={`rounded-full border ${
                  activeFilter === "whitepapers" 
                    ? "bg-primary text-white" 
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }`}
                onClick={() => setActiveFilter("whitepapers")}
              >
                White Papers
              </Button>
              <Button
                variant={activeFilter === "casestudies" ? "default" : "outline"}
                className={`rounded-full border ${
                  activeFilter === "casestudies" 
                    ? "bg-primary text-white" 
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }`}
                onClick={() => setActiveFilter("casestudies")}
              >
                Case Studies
              </Button>
              <Button
                variant={activeFilter === "guides" ? "default" : "outline"}
                className={`rounded-full border ${
                  activeFilter === "guides" 
                    ? "bg-primary text-white" 
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }`}
                onClick={() => setActiveFilter("guides")}
              >
                Guides & Tutorials
              </Button>
              <Button
                variant={activeFilter === "webinars" ? "default" : "outline"}
                className={`rounded-full border ${
                  activeFilter === "webinars" 
                    ? "bg-primary text-white" 
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }`}
                onClick={() => setActiveFilter("webinars")}
              >
                Webinars
              </Button>
            </div>
          </div>

          {/* Resource Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => {
                const IconComponent = iconComponents[resource.linkIcon as keyof typeof iconComponents];
                
                return (
                  <Card 
                    key={resource.id}
                    className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
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
                        <span className="text-xs text-neutral-700">{resource.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                      <p className="text-neutral-700 mb-4 text-sm">
                        {resource.description}
                      </p>
                      <a 
                        href={resource.link} 
                        className={`${
                          resource.category === "guides" ? "text-accent" : 
                          resource.category === "casestudies" ? "text-secondary" : 
                          "text-primary"
                        } font-medium flex items-center hover:underline`}
                      >
                        {resource.linkText}
                        <IconComponent className="ml-1 w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-neutral-500 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No resources found</h3>
              <p className="text-neutral-700">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
