import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/lib/types";

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
  }
];

const BlogPreviewSection = () => {
  return (
    <section className="py-20 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">From Our Blog</h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Stay updated with our latest insights, tutorials, and industry trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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

        <div className="text-center mt-12">
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            size="lg"
            asChild
          >
            <a href="/blog">Visit Our Blog</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
