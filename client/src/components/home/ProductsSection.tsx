import { Link } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types";

const products: Product[] = [
  {
    id: "snowflake",
    title: "Snowflake Deep Dives",
    description: "Comprehensive analysis of Snowflake's architecture, cost optimization strategies, and performance tuning techniques.",
    features: [
      "Architecture breakdowns",
      "Cost optimization guides",
      "Performance benchmarks"
    ],
    image: "https://unsplash.com/photos/white-and-blue-light-1kLbjTVDJm4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZGF0YSUyMHZpc3VhbGl6YXRpb258ZW58MHx8fHwxNzE3MzcwNzE5fDA&force=true&w=1920",
    color: "text-primary",
    link: "#snowflake-details"
  },
  {
    id: "databricks",
    title: "Databricks Intelligence",
    description: "In-depth exploration of Databricks platform capabilities, lakehouse patterns, and ML engineering best practices.",
    features: [
      "Lakehouse architecture studies",
      "ML workflow patterns",
      "Delta Lake deep dives"
    ],
    image: "https://unsplash.com/photos/a-hand-pointing-at-a-computer-screen-BW0vK-FA3eg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8ZGF0YSUyMGFuYWx5dGljc3xlbnwwfHx8fDE3MTczNzA3Mzd8MA&force=true&w=1920",
    color: "text-secondary",
    link: "#databricks-details"
  },
  {
    id: "powerbi",
    title: "Power BI Mastery",
    description: "Advanced Power BI techniques, DAX optimization, and modern analytics patterns for enterprise implementations.",
    features: [
      "Advanced DAX patterns",
      "Performance optimization",
      "Modern analytics design"
    ],
    image: "https://unsplash.com/photos/person-typing-on-black-laptop-computer-npxXWgQ33ZQ/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZGF0YSUyMGltcGxlbWVudGF0aW9ufGVufDB8fHx8MTcxNzM3MDc2M3ww&force=true&w=1920",
    color: "text-primary",
    link: "#powerbi-details"
  },
  {
    id: "modern-stack",
    title: "Modern Data Stack",
    description: "Complete coverage of dbt, Fivetran, Airflow, and cloud platforms with practical implementation insights.",
    features: [
      "dbt transformation patterns",
      "ELT pipeline design",
      "Cloud architecture guides"
    ],
    image: "https://unsplash.com/photos/person-typing-on-silver-macbook-pro-MYbhN8KaaEc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fEFJJTIwYXBwbGljYXRpb25zfGVufDB8fHx8MTcxNzM3MDc5MHww&force=true&w=1920",
    color: "text-accent",
    link: "#modern-stack-details"
  }
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology Deep Dives</h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Comprehensive analysis and insights into the modern data stack technologies that power today's data-driven organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 h-full flex flex-col"
            >
              <div className="h-40 sm:h-48 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                  aria-label={`${product.title} illustration`}
                ></div>
              </div>
              <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" 
                   style={{ 
                     color: product.color === "text-primary" ? "#0047AB" : 
                            product.color === "text-secondary" ? "#2E8B57" : 
                            product.color === "text-accent" ? "#4B0082" : "#0047AB" 
                   }}
                >
                  {product.title}
                </h3>
                <p className="text-neutral-700 mb-3 sm:mb-4 text-sm sm:text-base flex-1">
                  {product.description}
                </p>
                <ul className="mb-4 sm:mb-6 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle 
                        className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-1 flex-shrink-0`} 
                        style={{ 
                          color: product.color === "text-primary" ? "#0047AB" : 
                                 product.color === "text-secondary" ? "#2E8B57" : 
                                 product.color === "text-accent" ? "#4B0082" : "#0047AB" 
                        }} 
                      />
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div 
                  className="font-medium flex items-center hover:underline cursor-pointer text-sm sm:text-base mt-auto" 
                  style={{ 
                    color: product.color === "text-primary" ? "#0047AB" : 
                           product.color === "text-secondary" ? "#2E8B57" : 
                           product.color === "text-accent" ? "#4B0082" : "#0047AB" 
                  }}
                  onClick={() => {
                    // Handle anchor links that point to sections on the same page
                    if (product.link.startsWith('#')) {
                      const targetElement = document.getElementById(product.link.substring(1));
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      window.location.href = product.link;
                    }
                  }}
                >
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
