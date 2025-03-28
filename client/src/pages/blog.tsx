import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Calendar } from "lucide-react";
import { BlogPost } from "@/lib/types";

// Extended blog posts list for the blog page
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "5 AI Trends Reshaping Enterprise Data Analytics in 2023",
    description: "Explore the latest advancements in AI and how they're transforming how enterprises derive value from their data.",
    date: "June 15, 2023",
    category: "AI & Machine Learning",
    image: "https://unsplash.com/photos/people-sitting-on-chair-looking-at-the-person-standing-HyTwtsk8XqA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8QUklMjB0cmVuZHN8ZW58MHx8fHwxNzE3MzcxNDIzfDA&force=true&w=1920",
    link: "/blog/ai-trends-reshaping-enterprise-data-analytics"
  },
  {
    id: "2",
    title: "Building an End-to-End ML Pipeline with Databricks",
    description: "A step-by-step tutorial for implementing a production-ready machine learning pipeline using Databricks.",
    date: "May 28, 2023",
    category: "Tutorials",
    image: "https://unsplash.com/photos/gray-laptop-computer-showing-codes-8bghKxNU1j0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fG1hY2hpbmUlMjBsZWFybmluZ3xlbnwwfHx8fDE3MTczNzE0NTF8MA&force=true&w=1920",
    link: "/blog/ml-pipeline-databricks-tutorial"
  },
  {
    id: "3",
    title: "The Business Leader's Guide to Data Governance",
    description: "Understanding why data governance matters and how to implement it effectively in your organization.",
    date: "May 10, 2023",
    category: "Data Strategy",
    image: "https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-with-laptop-and-monitor-NBPhiA3UorA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8YnVzaW5lc3MlMjBsZWFkZXJ8ZW58MHx8fHwxNzE3MzcxNDcwfDA&force=true&w=1920",
    link: "/blog/business-leaders-guide-data-governance"
  },
  {
    id: "4",
    title: "Optimizing Snowflake Performance: Advanced Techniques",
    description: "Learn advanced techniques for optimizing query performance and managing costs in your Snowflake environment.",
    date: "April 22, 2023",
    category: "Snowflake",
    image: "https://unsplash.com/photos/person-looking-at-computer-monitor-8qEB0fTe9Vw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHNub3dmbGFrZSUyMGRhdGF8ZW58MHx8fHwxNzE3MzcxNjQ1fDA&force=true&w=1920",
    link: "/blog/optimizing-snowflake-performance"
  },
  {
    id: "5",
    title: "Ethical Considerations in AI Development",
    description: "Exploring the ethical challenges and best practices in developing artificial intelligence solutions.",
    date: "April 5, 2023",
    category: "AI & Ethics",
    image: "https://unsplash.com/photos/robot-toy-on-white-surface-734mbWSojr8/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8QUklMjBldGhpY3N8ZW58MHx8fHwxNzE3MzcxNjY1fDA&force=true&w=1920",
    link: "/blog/ethical-considerations-ai-development"
  },
  {
    id: "6",
    title: "Implementing a Data Mesh Architecture",
    description: "A comprehensive guide to implementing a data mesh architecture in your organization.",
    date: "March 18, 2023",
    category: "Data Architecture",
    image: "https://unsplash.com/photos/person-using-macbook-pro-on-brown-wooden-table-IgUR1iX0mqM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZGF0YSUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MTczNzE2ODV8MA&force=true&w=1920",
    link: "/blog/implementing-data-mesh-architecture"
  },
  {
    id: "7",
    title: "Power BI vs. Tableau: Choosing the Right BI Tool",
    description: "A detailed comparison of two leading business intelligence platforms to help you make the right choice for your organization.",
    date: "March 3, 2023",
    category: "Business Intelligence",
    image: "https://unsplash.com/photos/woman-in-blue-shirt-sitting-beside-table-UBhpOIHnazM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8YnVzaW5lc3MlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8fHwxNzE3MzcxNzA3fDA&force=true&w=1920",
    link: "/blog/power-bi-vs-tableau"
  },
  {
    id: "8",
    title: "Getting Started with Apache Spark on Databricks",
    description: "A beginner's guide to setting up and running Apache Spark workloads in the Databricks environment.",
    date: "February 14, 2023",
    category: "Tutorials",
    image: "https://unsplash.com/photos/person-typing-on-laptop-computer-b1Hg7QI-zcc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8ZGF0YWJyaWNrc3xlbnwwfHx8fDE3MTczNzE3MjV8MA&force=true&w=1920",
    link: "/blog/getting-started-spark-databricks"
  }
];

// Blog categories
const categories = [
  "All Categories",
  "AI & Machine Learning",
  "Tutorials",
  "Data Strategy",
  "Snowflake",
  "AI & Ethics",
  "Data Architecture",
  "Business Intelligence"
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All Categories");

  const filterBlogPosts = (posts: BlogPost[]) => {
    return posts
      .filter(post => 
        activeCategory === "All Categories" || post.category === activeCategory
      )
      .filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const filteredPosts = filterBlogPosts(blogPosts);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Stay updated with our latest insights, tutorials, and industry trends.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full border ${
                  activeCategory === category 
                    ? "bg-primary text-white border-primary" 
                    : "border-neutral-300 text-neutral-700 hover:border-primary hover:text-primary"
                } transition-all duration-300`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card 
                  key={post.id}
                  className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.image})` }}
                      aria-label={`${post.title} illustration`}
                    ></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-4 w-4 text-neutral-500 mr-1" />
                      <span className="text-xs text-neutral-700">{post.date}</span>
                      <span className="mx-2">•</span>
                      <span className="text-xs text-neutral-700">{post.category}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                    <p className="text-neutral-700 mb-4 text-sm">
                      {post.description}
                    </p>
                    <a 
                      href={post.link} 
                      className="text-primary font-medium flex items-center hover:underline"
                    >
                      Read Post
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-neutral-500 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
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

export default Blog;
