import { Link } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types";

const products: Product[] = [
  {
    id: "snowflake",
    title: "Snowflake Integration",
    description: "Seamlessly integrate and optimize your Snowflake data warehouse with our specialized tools and services.",
    features: [
      "Data warehouse optimization",
      "Cost management",
      "Security enhancements"
    ],
    image: "https://unsplash.com/photos/white-and-blue-light-1kLbjTVDJm4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZGF0YSUyMHZpc3VhbGl6YXRpb258ZW58MHx8fHwxNzE3MzcwNzE5fDA&force=true&w=1920",
    color: "text-primary",
    link: "#snowflake-details"
  },
  {
    id: "databricks",
    title: "Databricks Solutions",
    description: "Accelerate your big data analytics and machine learning workflows with our Databricks expertise.",
    features: [
      "Lakehouse architecture",
      "ML workflow optimization",
      "Delta Lake implementations"
    ],
    image: "https://unsplash.com/photos/a-hand-pointing-at-a-computer-screen-BW0vK-FA3eg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8ZGF0YSUyMGFuYWx5dGljc3xlbnwwfHx8fDE3MTczNzA3Mzd8MA&force=true&w=1920",
    color: "text-secondary",
    link: "#databricks-details"
  },
  {
    id: "powerbi",
    title: "Power BI Implementations",
    description: "Transform your data into compelling visualizations and interactive dashboards with our Power BI expertise.",
    features: [
      "Custom dashboard creation",
      "Data modeling & optimization",
      "Integration with data sources"
    ],
    image: "https://unsplash.com/photos/person-typing-on-black-laptop-computer-npxXWgQ33ZQ/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZGF0YSUyMGltcGxlbWVudGF0aW9ufGVufDB8fHx8MTcxNzM3MDc2M3ww&force=true&w=1920",
    color: "text-primary",
    link: "#powerbi-details"
  },
  {
    id: "ai",
    title: "AI Applications",
    description: "Create intelligent applications powered by cutting-edge AI models tailored to your business needs.",
    features: [
      "Custom AI model development",
      "Predictive analytics",
      "AI integration & deployment"
    ],
    image: "https://unsplash.com/photos/person-typing-on-silver-macbook-pro-MYbhN8KaaEc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fEFJJTIwYXBwbGljYXRpb25zfGVufDB8fHx8MTcxNzM3MDc5MHww&force=true&w=1920",
    color: "text-accent",
    link: "#ai-details"
  }
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solutions</h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Powerful data analytics and AI products designed to transform how you interact with your data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                  aria-label={`${product.title} illustration`}
                ></div>
              </div>
              <CardContent className="p-6">
                <h3 className={`text-xl font-bold mb-3 ${product.color}`}>{product.title}</h3>
                <p className="text-neutral-700 mb-4">
                  {product.description}
                </p>
                <ul className="mb-6 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle 
                        className={`w-4 h-4 mr-2 mt-1 flex-shrink-0`} 
                        style={{ 
                          color: product.color === "text-primary" ? "#0047AB" : 
                                 product.color === "text-secondary" ? "#2E8B57" : 
                                 product.color === "text-accent" ? "#4B0082" : "#0047AB" 
                        }} 
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className={`${product.color} font-medium flex items-center hover:underline cursor-pointer`} onClick={() => window.location.href = product.link}>
                  Learn more
                  <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
