import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Bookmark,
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  Tag,
  Star,
  ThumbsUp,
  BookMarked,
  Lightbulb,
  FileText,
  Filter,
  BarChart2,
  Brain,
  Database
} from "lucide-react";
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

// Learning paths
const learningPaths = [
  {
    title: "Data Engineering Fundamentals",
    description: "Master the core concepts and tools of modern data engineering",
    articles: 8,
    hours: 12,
    icon: <Database className="h-5 w-5 mr-2" />
  },
  {
    title: "AI & ML in Production",
    description: "Learn to deploy and manage AI/ML models in production environments",
    articles: 6,
    hours: 10,
    icon: <Brain className="h-5 w-5 mr-2" />
  },
  {
    title: "Business Intelligence Mastery",
    description: "Develop expertise in BI tools, dashboarding, and data storytelling",
    articles: 7,
    hours: 8,
    icon: <BarChart2 className="h-5 w-5 mr-2" />
  }
];

// Popular tags
const popularTags = [
  "Snowflake", "Databricks", "Power BI", "Python", "SQL", "Data Lake", 
  "Machine Learning", "Data Governance", "Data Mesh", "AI Ethics"
];

// Read time estimation function
const estimateReadTime = (description: string): number => {
  // Assume average reading speed of 200 words per minute
  const words = description.split(' ').length;
  // Add a base time of 3 minutes plus calculated time from description
  return Math.max(5, Math.ceil(words / 200) + 3);
};

// Component for each learning path card
const LearningPathCard = ({ path }: { path: any }) => (
  <Card className="rounded-lg hover:shadow-md transition-all duration-300 border-l-4 border-primary">
    <CardContent className="p-4 flex">
      <div className="bg-primary/10 rounded-full p-3 mr-3 flex-shrink-0">
        {path.icon}
      </div>
      <div>
        <h3 className="font-bold text-lg">{path.title}</h3>
        <p className="text-neutral-700 text-sm mb-2">{path.description}</p>
        <div className="flex items-center text-sm text-neutral-600">
          <FileText className="h-4 w-4 mr-1" />
          <span className="mr-3">{path.articles} articles</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>Approx. {path.hours} hours</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main blog post component with level indicator
const BlogPostCard = ({ post, featured = false }: { post: BlogPost, featured?: boolean }) => {
  const readTime = estimateReadTime(post.description);
  
  // Assign a difficulty level based on category and description
  const getDifficultyLevel = () => {
    if (post.category === "Tutorials" || post.title.includes("Getting Started")) {
      return "Beginner";
    } else if (post.title.includes("Advanced") || post.category === "Data Architecture") {
      return "Advanced";
    }
    return "Intermediate";
  };
  
  const difficulty = getDifficultyLevel();
  const difficultyColor = 
    difficulty === "Beginner" ? "bg-green-100 text-green-800" :
    difficulty === "Intermediate" ? "bg-blue-100 text-blue-800" :
    "bg-purple-100 text-purple-800";
  
  if (featured) {
    return (
      <Card className="rounded-xl shadow-md overflow-hidden bg-white border-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="h-full">
            <div 
              className="w-full h-full bg-cover bg-center min-h-[240px]"
              style={{ backgroundImage: `url(${post.image})` }}
              aria-label={`${post.title} illustration`}
            ></div>
          </div>
          <CardContent className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor} font-medium`}>
                  {difficulty}
                </span>
                <div className="flex items-center text-neutral-500 text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{post.date}</span>
                </div>
              </div>
              <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full mb-3">
                {post.category}
              </span>
              <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
              <p className="text-neutral-700 mb-4 text-sm line-clamp-3">
                {post.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-neutral-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{readTime} min read</span>
              </div>
              <a 
                href={post.link} 
                className="text-primary font-medium flex items-center hover:underline"
              >
                Read Post
                <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden bg-white border-none">
      <div className="h-40 overflow-hidden relative">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
          aria-label={`${post.title} illustration`}
        ></div>
        <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${difficultyColor} font-medium`}>
          {difficulty}
        </span>
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {post.category}
          </span>
          <div className="flex items-center text-neutral-500 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{post.date}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-neutral-600 mb-4 text-sm line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-neutral-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readTime} min read</span>
          </div>
          <a 
            href={post.link} 
            className="text-primary font-medium flex items-center hover:underline text-sm"
          >
            Read Post
            <ArrowRight className="ml-1 w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

// No need for imports here as they're already imported at the top

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All Categories");
  const [showFilters, setShowFilters] = useState(false);
  // State for different tabs
  const [activeTab, setActiveTab] = useState("all");
  
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
  
  // Get the featured post (first post or first in filtered list)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  // Get remaining posts
  const remainingPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];
  
  // Tutorial posts
  const tutorialPosts = blogPosts.filter(post => post.category === "Tutorials");
  
  // Add smooth scrolling to anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        const targetId = href?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-white py-12 mb-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Knowledge Center</h1>
              <p className="text-xl opacity-90 mb-8">
                Discover tutorials, guides, and insights to accelerate your data analytics journey
              </p>
              <div className="relative max-w-2xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for articles, tutorials, and more..."
                  className="pl-10 py-6 text-lg rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          {/* Learning Paths Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <BookMarked className="mr-2 h-6 w-6 text-primary" />
                Learning Paths
              </h2>
              <a href="#" className="text-primary font-medium flex items-center hover:underline">
                View all paths
                <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <LearningPathCard key={index} path={path} />
              ))}
            </div>
          </section>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-transparent border">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  All Content
                </TabsTrigger>
                <TabsTrigger 
                  value="tutorials" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Tutorials
                </TabsTrigger>
                <TabsTrigger 
                  value="articles" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Articles
                </TabsTrigger>
                <TabsTrigger 
                  value="saved" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Saved
                </TabsTrigger>
              </TabsList>
              
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-neutral-200">
                <h3 className="font-medium mb-3">Filter by category:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        activeCategory === category 
                          ? "bg-primary text-white" 
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      } transition-all duration-300`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <h3 className="font-medium mb-2">Popular tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700 cursor-pointer hover:bg-neutral-200"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <TabsContent value="all" className="mt-0">
              {/* Featured Article */}
              {featuredPost && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Featured</h2>
                  <BlogPostCard post={featuredPost} featured={true} />
                </div>
              )}
              
              {/* Recent Articles */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
                {remainingPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remainingPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-white rounded-lg">
                    <div className="text-neutral-400 mb-4">
                      <Search className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No articles found</h3>
                    <p className="text-neutral-600 max-w-md mx-auto">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="tutorials" className="mt-0">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Step-by-Step Tutorials</h2>
                  <div className="flex items-center text-neutral-700 text-sm">
                    <Lightbulb className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>Learn hands-on skills</span>
                  </div>
                </div>
                
                {tutorialPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorialPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-white rounded-lg">
                    <p className="text-neutral-600">No tutorials available in this category.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="articles" className="mt-0">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Articles & Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts
                    .filter(post => post.category !== "Tutorials")
                    .map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-0">
              <div className="text-center py-16 bg-white rounded-lg">
                <Bookmark className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No saved articles yet</h3>
                <p className="text-neutral-600 max-w-md mx-auto mb-6">
                  Save articles to read later by clicking the bookmark icon on any article.
                </p>
                <Button onClick={() => setActiveTab("all")}>
                  Browse Articles
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Page Navigation */}
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2">
              <Button variant="outline" className="px-4">
                1
              </Button>
              <Button variant="outline" className="px-4">
                2
              </Button>
              <Button variant="outline" className="px-4">
                3
              </Button>
              <Button variant="outline" className="px-4">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
