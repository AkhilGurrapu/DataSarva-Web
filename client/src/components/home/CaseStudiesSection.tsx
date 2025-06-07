import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaseStudy } from "@/lib/types";

const caseStudies: CaseStudy[] = [
  {
    id: "financial-services",
    title: "Global Bank Achieves 40% Faster Insights with Snowflake Migration",
    description: "How we helped a leading financial institution modernize their data architecture and accelerate analytics workflows.",
    industry: "Financial Services",
    category: "Data Analytics",
    results: ["40% faster analytics", "$2.5M annual savings"],
    technologies: ["Snowflake", "Power BI"],
    image: "https://unsplash.com/photos/a-woman-sitting-at-a-desk-with-a-laptop-jLJ8sCmm1U0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGZpbmFuY2lhbCUyMHNlcnZpY2VzfGVufDB8fHx8MTcxNzM3MTEwOXww&force=true&w=1920",
    link: "#case-study-1"
  },
  {
    id: "healthcare",
    title: "Healthcare Provider Improves Patient Outcomes with AI",
    description: "Implementing predictive analytics to enhance care delivery and reduce readmission rates.",
    industry: "Healthcare",
    category: "AI",
    results: ["23% reduction in readmissions", "15% increase in patient satisfaction"],
    technologies: ["Databricks", "AI/ML"],
    image: "https://unsplash.com/photos/person-holding-silver-pen-near-white-printer-paper-L8tWZT4CcVQ/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8aGVhbHRoY2FyZXxlbnwwfHx8fDE3MTczNzExMzV8MA&force=true&w=1920",
    link: "#case-study-2"
  },
  {
    id: "retail",
    title: "E-commerce Leader Scales Data Pipeline for Peak Season",
    description: "Building a resilient, scalable data architecture to handle 10x traffic during holiday seasons.",
    industry: "Retail",
    category: "Data Engineering",
    results: ["99.99% uptime during peak", "5x faster data processing"],
    technologies: ["Snowflake", "Databricks"],
    image: "https://unsplash.com/photos/silver-imac-beside-white-ceramic-mug-on-table-IClZBVw5W5A/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZWNvbW1lcmNlfGVufDB8fHx8MTcxNzM3MTE1MXww&force=true&w=1920",
    link: "#case-study-3"
  },
  {
    id: "manufacturing",
    title: "Smart Factory Achieves 30% Reduction in Downtime",
    description: "Implementing IoT analytics and predictive maintenance to optimize manufacturing operations.",
    industry: "Manufacturing",
    category: "IoT Analytics",
    results: ["30% less equipment downtime", "22% increase in OEE"],
    technologies: ["IoT", "Power BI", "Azure"],
    image: "https://unsplash.com/photos/a-person-standing-in-a-warehouse-holding-a-clipboard-7lGpvjvLAKo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fG1hbnVmYWN0dXJpbmd8ZW58MHx8fHwxNzE3MzcxMTcxfDA&force=true&w=1920",
    link: "#case-study-4"
  }
];

const CaseStudiesSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl mx-auto">
            See how we've helped organizations transform their data operations and achieve measurable business results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {caseStudies.map((caseStudy) => (
            <div key={caseStudy.id} className="bg-neutral-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex flex-col xl:flex-row h-full">
                <div className="xl:w-2/5">
                  <div 
                    className="h-48 sm:h-56 xl:h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${caseStudy.image})` }}
                    aria-label={`${caseStudy.title} illustration`}
                  ></div>
                </div>
                <div className="xl:w-3/5 p-4 sm:p-6 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                    <Badge 
                      variant="default" 
                      className="bg-primary text-white text-xs font-bold py-1 px-2 rounded"
                    >
                      {caseStudy.industry}
                    </Badge>
                    <Badge 
                      variant="default" 
                      className={`${caseStudy.category === 'AI' ? 'bg-accent' : 'bg-secondary'} text-white text-xs font-bold py-1 px-2 rounded`}
                    >
                      {caseStudy.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{caseStudy.title}</h3>
                  <p className="text-neutral-700 mb-3 sm:mb-4 text-sm sm:text-base flex-1">
                    {caseStudy.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 space-y-3 sm:space-y-0 sm:space-x-4">
                    <div>
                      <div className="text-xs sm:text-sm font-bold mb-1">Results:</div>
                      {caseStudy.results.map((result, index) => (
                        <div key={index} className="text-xs sm:text-sm text-neutral-700">{result}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold mb-1">Technologies:</div>
                      <div className="text-xs sm:text-sm text-neutral-700">{caseStudy.technologies.join(", ")}</div>
                    </div>
                  </div>
                  <a 
                    href={caseStudy.link} 
                    className="text-primary font-medium flex items-center hover:underline text-sm sm:text-base mt-auto"
                  >
                    Read full case study
                    <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            size="lg"
          >
            View All Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;