import {
  BarChart2,
  Brain,
  Cloud,
  Database,
  LineChart,
  RefreshCw,
  Lightbulb,
  LayoutTemplate,
  TrendingUp,
  Settings,
  CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/lib/types";

const serviceApproach = [
  {
    icon: Lightbulb,
    title: "Discovery & Assessment",
    description: "Understanding your unique needs and challenges"
  },
  {
    icon: LayoutTemplate,
    title: "Solution Design",
    description: "Creating tailored strategies and implementation plans"
  },
  {
    icon: Settings,
    title: "Implementation",
    description: "Executing with precision and agility"
  },
  {
    icon: TrendingUp,
    title: "Optimization & Growth",
    description: "Continuous improvement and scaling"
  }
];

const services: Service[] = [
  {
    id: "data-strategy",
    title: "Data Strategy Patterns",
    description: "Analysis of successful data strategy implementations and architectural patterns across industries.",
    features: [
      "Governance framework studies",
      "Technology stack comparisons",
      "ROI case study analysis"
    ],
    icon: "BarChart2",
    color: "bg-primary-light"
  },
  {
    id: "ai-implementation",
    title: "AI Engineering Insights",
    description: "Deep exploration of AI/ML engineering practices, model deployment patterns, and MLOps workflows.",
    features: [
      "MLOps pipeline analysis",
      "Model deployment strategies",
      "LLM integration patterns"
    ],
    icon: "Brain",
    color: "bg-accent"
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture Studies",
    description: "Comprehensive analysis of cloud-native data architectures across AWS, Azure, and GCP platforms.",
    features: [
      "Multi-cloud architecture patterns",
      "Data lakehouse implementations",
      "Migration strategy analysis"
    ],
    icon: "Cloud",
    color: "bg-secondary"
  },
  {
    id: "data-engineering",
    title: "Data Engineering Mastery",
    description: "In-depth coverage of modern data engineering tools, patterns, and best practices.",
    features: [
      "dbt transformation patterns",
      "Airflow orchestration guides",
      "Real-time streaming architectures"
    ],
    icon: "Database",
    color: "bg-primary"
  },
  {
    id: "analytics",
    title: "Analytics Excellence",
    description: "Advanced analytics techniques, visualization best practices, and modern BI architecture patterns.",
    features: [
      "Modern BI architectures",
      "Advanced visualization techniques",
      "Self-service analytics patterns"
    ],
    icon: "LineChart",
    color: "bg-accent"
  },
  {
    id: "mlops",
    title: "MLOps & DataOps",
    description: "Implement best practices in ML operations and data operations for scalable, reliable systems.",
    features: [
      "CI/CD for ML pipelines",
      "Model monitoring & management",
      "Automated testing frameworks"
    ],
    icon: "RefreshCw",
    color: "bg-secondary"
  }
];

const iconComponents = {
  BarChart2,
  Brain,
  Cloud,
  Database,
  LineChart,
  RefreshCw,
  Lightbulb,
  LayoutTemplate,
  TrendingUp,
  Settings
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert Analysis & Insights</h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            In-depth analysis of data engineering patterns, architectural decisions, and implementation strategies across the modern data ecosystem.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-32">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">Our Approach</h3>
              <p className="text-neutral-700 mb-4 sm:mb-6 text-sm sm:text-base">
                We combine deep technical expertise with business acumen to deliver solutions that drive real business outcomes.
              </p>
              <div className="space-y-6 sm:space-y-8">
                {serviceApproach.map((approach, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <approach.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-sm sm:text-base">{approach.title}</h4>
                      <p className="text-xs sm:text-sm text-neutral-700">{approach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
              {services.map((service) => {
                const IconComponent = iconComponents[service.icon as keyof typeof iconComponents];
                
                return (
                  <Card key={service.id} className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${service.color} flex items-center justify-center text-white mr-3 sm:mr-4 flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold leading-tight">{service.title}</h3>
                      </div>
                      <p className="text-neutral-700 mb-3 sm:mb-4 text-sm sm:text-base flex-1">
                        {service.description}
                      </p>
                      <ul className="mb-4 space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle 
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-1 flex-shrink-0" 
                              style={{ color: "#0047AB" }}
                            />
                            <span className="text-xs sm:text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-md p-8 border-l-4 border-primary">
              <h3 className="text-xl font-bold mb-4">Engagement Models</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 bg-neutral-100 rounded-lg">
                  <div className="text-primary text-lg font-bold mb-2">Strategic Advisory</div>
                  <p className="text-center text-sm">Expert guidance for long-term data strategy and technology decisions</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-neutral-100 rounded-lg">
                  <div className="text-primary text-lg font-bold mb-2">Project-Based</div>
                  <p className="text-center text-sm">Focused engagements with clear deliverables and timelines</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-neutral-100 rounded-lg">
                  <div className="text-primary text-lg font-bold mb-2">Managed Services</div>
                  <p className="text-center text-sm">Ongoing support and optimization of your data ecosystem</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
