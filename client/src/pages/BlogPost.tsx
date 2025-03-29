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

// Define a type for our section structure
interface Section {
  id: string;
  title: string;
}

const BlogPostPage = () => {
  const [location] = useLocation();
  const slug = location.split("/").pop();
  const [activeSection, setActiveSection] = useState("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  
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
      
      // Extract the slug from the post.link URL
      // The link format is "/blog/post-slug"
      const postSlug = post.link.split('/').pop();
      
      console.log('Fetching markdown for:', postSlug);
      
      // Fetch the markdown content
      fetch(`/src/data/blog-posts/${postSlug}.md`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load markdown content for ${postSlug}`);
          }
          return response.text();
        })
        .then(content => {
          setMarkdownContent(content);
          
          // Extract sections from the markdown content
          const extractedSections: Section[] = [];
          
          // First add the overview section manually
          extractedSections.push({ id: "overview-section", title: "Overview" });
          
          // Then extract all h2 headings to build the navigation
          const h2Matches = content.match(/## (.*?)(?=\n)/g);
          if (h2Matches) {
            h2Matches.forEach(match => {
              const title = match.replace('## ', '').trim();
              // Skip if it's an "Overview" section since we already added it
              if (title.toLowerCase() !== "overview") {
                const id = title.toLowerCase().replace(/[^\w]+/g, '-') + "-section";
                extractedSections.push({ id, title });
              }
            });
          }
          
          // Update the sections state
          setSections(extractedSections);
          
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error loading markdown:', error);
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [post]);
  
  useEffect(() => {
    // Handle scroll spy for the navigation
    const handleScroll = () => {
      // Find all section elements
      const sectionElements = document.querySelectorAll('section[id]');
      
      if (sectionElements.length === 0) return;
      
      // Find the current section
      let currentSection = "";
      
      for (let i = 0; i < sectionElements.length; i++) {
        const section = sectionElements[i];
        const rect = section.getBoundingClientRect();
        
        // When the section is near the top of the viewport
        if (rect.top <= 150) {
          currentSection = section.id;
        } else {
          // If we've already passed a section that's in view, stop checking
          break;
        }
      }
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    // Initial call to set the active section on load
    setTimeout(handleScroll, 500);
    
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
  
  // State for parsed markdown front matter
  const [frontMatter, setFrontMatter] = useState({
    title: post?.title || "",
    description: post?.description || "",
    date: post?.date || "",
    category: post?.category || "",
    estimatedTime: 30,
    skill_level: "Intermediate",
  });

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
                {/* Author info */}
                <div className="mb-8 flex items-center p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Author" 
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <div>
                    <h3 className="font-bold text-sm">Michael Chen</h3>
                    <p className="text-xs text-neutral-600">Data Science & AI Technical Lead</p>
                    <p className="text-xs text-neutral-500 mt-1">Last updated: {post.date}</p>
                  </div>
                </div>

                {/* Article metadata */}
                <div className="mb-8 pb-6 border-b border-neutral-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Title</p>
                      <p className="text-sm font-medium">{frontMatter.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Date</p>
                      <p className="text-sm">{frontMatter.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Category</p>
                      <p className="text-sm">{frontMatter.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Skill Level</p>
                      <p className="text-sm">{frontMatter.skill_level}</p>
                    </div>
                  </div>
                </div>
                
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
                    <>
                      {/* Render the actual markdown content */}
                      <div 
                        className="markdown-content" 
                        dangerouslySetInnerHTML={{ 
                          __html: markdownContent
                            // Process alerts/notes
                            .replace(/:::note([\s\S]*?):::/g, '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><div class="flex"><span class="text-blue-700 mr-2">ℹ️</span><div><h4 class="text-blue-700 font-medium">Note</h4><p class="text-blue-700">$1</p></div></div></div>')
                            .replace(/:::warning([\s\S]*?):::/g, '<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4"><div class="flex"><span class="text-yellow-700 mr-2">⚠️</span><div><h4 class="text-yellow-700 font-medium">Warning</h4><p class="text-yellow-700">$1</p></div></div></div>')
                            .replace(/:::tip([\s\S]*?):::/g, '<div class="bg-green-50 border-l-4 border-green-500 p-4 my-4"><div class="flex"><span class="text-green-700 mr-2">💡</span><div><h4 class="text-green-700 font-medium">Tip</h4><p class="text-green-700">$1</p></div></div></div>')
                            // Process headers with section IDs
                            .replace(/## (.*?)(?=\n)/g, '<section id="$1-section" class="mb-8"><h2 class="text-2xl font-bold mb-4" id="$1">$1</h2>')
                            .replace(/### (.*?)(?=\n)/g, '<h3 class="text-xl font-semibold mt-6 mb-3" id="$1">$1</h3>')
                            // Process code blocks
                            .replace(/```(.*?)\n([\s\S]*?)```/g, '<div class="bg-neutral-800 text-white p-4 rounded font-mono text-sm my-4"><pre class="whitespace-pre-wrap">$2</pre></div>')
                            // Process lists
                            .replace(/^\s*\d+\.\s+(.*?)$/gm, '<li>$1</li>')
                            .replace(/^\s*\*\s+(.*?)$/gm, '<li>$1</li>')
                            .replace(/(<li>.*?<\/li>\n)+/g, '<ol>$&</ol>')
                            // Process bold and italic text
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            // Process links
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
                            // Process paragraphs
                            .replace(/^(?!<[a-z]|$)(.*?)$/gm, '<p>$1</p>')
                            // Close sections
                            .replace(/<section id="(.*?)">([\s\S]*?)(?=<section id="|$)/g, '<section id="$1">$2</section>')
                        }} 
                      />
                      
                      {/* Next steps section */}
                      <div className="bg-neutral-50 p-6 rounded-lg mt-12">
                        <h3 className="text-xl font-bold mb-4">Next Steps</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border border-neutral-200 rounded p-4 bg-white">
                            <h4 className="font-semibold mb-2">Explore More Tutorials</h4>
                            <p className="text-sm text-neutral-600 mb-3">Discover other tutorials and guides in our knowledge center.</p>
                            <Button variant="outline" size="sm">View Tutorials</Button>
                          </div>
                          <div className="border border-neutral-200 rounded p-4 bg-white">
                            <h4 className="font-semibold mb-2">Join Our Community</h4>
                            <p className="text-sm text-neutral-600 mb-3">Connect with experts and peers to share knowledge and best practices.</p>
                            <Button variant="outline" size="sm">Join Community</Button>
                          </div>
                        </div>
                      </div>
                    </>
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