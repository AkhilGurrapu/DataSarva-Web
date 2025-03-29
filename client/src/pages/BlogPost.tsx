import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  Copy, 
  Check, 
  Download,
  CheckCircle,
  Info,
  AlertTriangle, 
  BookOpen,
  Link as LinkIcon
} from "lucide-react";
import { BlogPost } from "@/lib/types";
import { blogPosts } from "../data/blogPosts";
import { Button } from "@/components/ui/button";
import { parseMarkdown, markdownToHtml } from "@/lib/markdown";

// Code Block Component
const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900 rounded-md overflow-hidden mb-6">
      <div className="flex justify-between items-center px-4 py-2 bg-neutral-800 text-white">
        <span className="text-xs font-mono">{language}</span>
        <button 
          onClick={copyToClipboard}
          className="text-neutral-400 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-white">
        <code className="font-mono text-sm">{code}</code>
      </pre>
    </div>
  );
};

// Note Component
const Note = ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "tip" }) => {
  const bgColor = 
    type === "info" ? "bg-blue-50 border-blue-200" :
    type === "warning" ? "bg-amber-50 border-amber-200" :
    "bg-green-50 border-green-200";
  
  const textColor = 
    type === "info" ? "text-blue-800" :
    type === "warning" ? "text-amber-800" :
    "text-green-800";
  
  const Icon = 
    type === "info" ? Info :
    type === "warning" ? AlertTriangle :
    CheckCircle;
  
  const title = 
    type === "info" ? "Note" :
    type === "warning" ? "Warning" :
    "Tip";
  
  return (
    <div className={`${bgColor} ${textColor} border-l-4 p-4 mb-6 rounded-r-md`}>
      <div className="flex items-center mb-2">
        <Icon className="h-5 w-5 mr-2" />
        <span className="font-bold">{title}</span>
      </div>
      <div className="ml-7">{children}</div>
    </div>
  );
};

// Step Component
const Step = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
          {number}
        </span>
        {title}
      </h3>
      <div className="ml-11">{children}</div>
    </div>
  );
};

const BlogPostPage = () => {
  const [location] = useLocation();
  const slug = location.split("/").pop();
  const [activeSection, setActiveSection] = useState("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Find the blog post data from our mock data
  const post = blogPosts.find((p: BlogPost) => {
    const postSlug = p.link.split("/").pop();
    return postSlug === slug;
  });
  
  // In a real implementation, we would fetch the markdown content from an API
  useEffect(() => {
    if (post) {
      setIsLoading(true);
      setError(null);
      
      // Fetch the markdown content
      fetch(`/src/data/blog-posts/${slug}.md`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to load markdown content');
          }
          return response.text();
        })
        .then(content => {
          setMarkdownContent(content);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error loading markdown:', error);
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [post, slug]);
  
  useEffect(() => {
    // Handle scroll spy for the navigation
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Find all section headings
      const sections = document.querySelectorAll('[id^="section-"]');
      
      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.getBoundingClientRect().top <= 200) {
          const id = section.getAttribute('id');
          if (id !== activeSection) {
            setActiveSection(id || "");
          }
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);
  
  if (!post) {
    return (
      <div>
        <Header />
        <main className="pt-32 pb-20 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
              <p className="mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
              <Button onClick={() => window.location.href = "/blog"}>
                Return to Blog
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const readTime = Math.max(5, Math.ceil(post.description.split(' ').length / 200) + 5);
  
  // Example sections for this blog post 
  // In a real implementation, these would come from your CMS or database
  const sections = [
    { id: "section-overview", title: "Overview" },
    { id: "section-prerequisites", title: "Prerequisites" },
    { id: "section-setup", title: "Setting up the environment" },
    { id: "section-step1", title: "Step 1: Create a workspace" },
    { id: "section-step2", title: "Step 2: Create a lakehouse" },
    { id: "section-step3", title: "Step 3: Load and query data" },
    { id: "section-step4", title: "Step 4: Visualize results" },
    { id: "section-conclusion", title: "Conclusion" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-20">
        {/* Navigation breadcrumb */}
        <div className="bg-neutral-100 py-3 border-b border-neutral-200 mb-8">
          <div className="container mx-auto px-6">
            <div className="flex items-center text-sm">
              <a href="/blog" className="text-neutral-600 hover:text-primary transition-colors">
                Blog
              </a>
              <ChevronRight className="h-4 w-4 mx-2 text-neutral-400" />
              <a href={`/blog/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-neutral-600 hover:text-primary transition-colors">
                {post.category}
              </a>
              <ChevronRight className="h-4 w-4 mx-2 text-neutral-400" />
              <span className="text-neutral-900 font-medium truncate max-w-[200px] md:max-w-md">
                {post.title}
              </span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar navigation */}
            <div className="w-full md:w-1/4 md:pr-6 md:border-r md:border-neutral-200 mb-8 md:mb-0">
              <div className="md:sticky md:top-28">
                <Button
                  variant="outline"
                  className="mb-6 flex items-center w-full md:w-auto"
                  onClick={() => window.location.href = "/blog"}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
                
                <h2 className="font-bold mb-4 text-lg">In this article</h2>
                <ul className="space-y-2 mb-6">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a 
                        href={`#${section.id}`}
                        className={`block py-1 border-l-2 pl-3 text-sm hover:text-primary transition-colors ${
                          activeSection === section.id 
                            ? "border-primary text-primary font-medium" 
                            : "border-neutral-200 text-neutral-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(section.id);
                          if (element) {
                            const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
                            window.scrollTo({top: y, behavior: 'smooth'});
                            setActiveSection(section.id);
                          }
                        }}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-neutral-100 p-4 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    Reading Info
                  </h3>
                  <div className="text-sm text-neutral-700 space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-neutral-500" />
                      <span>{readTime} min read</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-neutral-500" />
                      <span>Updated: {post.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Share this article</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="px-2">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4 md:pl-8">
              <div className="max-w-3xl">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                    {post.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
                  
                  <div className="mb-8">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-auto rounded-xl shadow-md"
                    />
                  </div>
                </div>
                
                {/* Article Content */}
                <div className="prose max-w-none">
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 text-red-800 p-4 rounded-md">
                      <h3 className="font-bold mb-2">Error Loading Content</h3>
                      <p>{error}</p>
                    </div>
                  ) : (
                    <div 
                      className="markdown-content" 
                      dangerouslySetInnerHTML={{ 
                        __html: markdownToHtml(markdownContent) 
                      }} 
                    />
                  )}
                </div>
                
                {/* Related Articles */}
                <div className="mt-16 border-t border-neutral-200 pt-8">
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts
                      .filter((p: BlogPost) => p.id !== post.id && p.category === post.category)
                      .slice(0, 2)
                      .map((relatedPost: BlogPost) => (
                        <a 
                          key={relatedPost.id} 
                          href={relatedPost.link}
                          className="block bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={relatedPost.image} 
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                              {relatedPost.category}
                            </span>
                            <h3 className="font-bold mt-2 mb-1">{relatedPost.title}</h3>
                            <p className="text-sm text-neutral-600 line-clamp-2">
                              {relatedPost.description}
                            </p>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;