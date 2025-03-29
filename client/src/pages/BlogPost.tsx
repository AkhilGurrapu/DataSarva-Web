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

interface CodeBlockProps {
  language: string;
  code: string;
}

// Code Block Component
const CodeBlock = ({ language, code }: CodeBlockProps) => {
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
  
  // Find the blog post data from our mock data
  const post = blogPosts.find((p: BlogPost) => {
    const postSlug = p.link.split("/").pop();
    return postSlug === slug;
  });
  
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
                
                {/* Article Content - this would be dynamically generated from your CMS */}
                <div className="prose max-w-none">
                  {/* Overview Section */}
                  <section id="section-overview" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <p className="mb-4">
                      Large-scale data analytics solutions have traditionally been built around a data warehouse, in which data is stored in relational tables and queried using SQL. The growth in "big data" (characterized by high volumes, variety, and velocity of new data assets) together with the availability of low-cost storage and cloud-scale distributed compute technologies has led to an approach to analytical data in which, the data itself is often stored in files in a data lake, rather than imposed with a fixed schema.
                    </p>
                    <p className="mb-4">
                      However, many data engineers and analysts need to benefit from the best features of both of these approaches by combining them in a data lakehouse; in which data is stored in files in a data lake and a relational schema is applied to them as a metadata layer so that they can be queried using traditional SQL semantics.
                    </p>
                  </section>
                  
                  {/* Prerequisites Section */}
                  <section id="section-prerequisites" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                    <p className="mb-4">To complete this exercise, you will need:</p>
                    <ul className="list-disc pl-6 mb-6">
                      <li>Access to a Microsoft Fabric environment</li>
                      <li>Basic understanding of SQL concepts</li>
                      <li>Understanding of data lakes and warehouses</li>
                    </ul>
                    
                    <Note>
                      This lab takes approximately 30 minutes to complete.
                    </Note>
                  </section>
                  
                  {/* Setup Section */}
                  <section id="section-setup" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Setting up the environment</h2>
                    <p className="mb-4">
                      In Microsoft Fabric, a lakehouse provides highly scalable file storage in a OneLake store (built on Azure Data Lake Store Gen2) with a metadata for relational objects such as tables and views based on the open source Delta Lake table format. Delta Lake enables you to define a schema of tables in your lakehouse that you can query using SQL.
                    </p>
                    
                    <Note type="warning">
                      You need a Microsoft Fabric trial to complete this exercise.
                    </Note>
                  </section>
                  
                  {/* Step 1 */}
                  <section id="section-step1" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Create a workspace</h2>
                    <p className="mb-4">Before working with data in Fabric, create a workspace with the Fabric trial enabled.</p>
                    
                    <Step number={1} title="Navigate to the Microsoft Fabric home page">
                      <p className="mb-4">Go to <a href="https://app.fabric.microsoft.com" className="text-primary hover:underline">https://app.fabric.microsoft.com</a> in a browser, and sign in with your Fabric credentials.</p>
                    </Step>
                    
                    <Step number={2} title="Select Workspaces">
                      <p className="mb-4">In the menu bar on the left, select <strong>Workspaces</strong> (the icon looks similar to ⬡).</p>
                    </Step>
                    
                    <Step number={3} title="Create a new workspace">
                      <p className="mb-4">Create a new workspace with a name of your choice, selecting a licensing mode in the <strong>Advanced</strong> section that includes Fabric capacity (Trial, Premium, or Fabric).</p>
                      
                      <CodeBlock 
                        language="bash" 
                        code='# Example PowerShell command (if using automation)
New-FabricWorkspace -Name "DataAnalytics-Workshop" -CapacityType "Trial"'
                      />
                    </Step>
                    
                    <Step number={4} title="Verify the workspace">
                      <p className="mb-4">When your new workspace opens, it should be empty. You'll now create a Data Engineering experience in this workspace.</p>
                      
                      <img 
                        src="https://microsoftlearning.github.io/mslearn-fabric/Instructions/Labs/images/create-workspace.png" 
                        alt="Empty Fabric workspace" 
                        className="w-full rounded-md border border-neutral-200 shadow-sm mb-4"
                      />
                    </Step>
                  </section>
                  
                  {/* Step 2 */}
                  <section id="section-step2" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Create a lakehouse</h2>
                    <p className="mb-4">Now that you have a workspace, it's time to create a lakehouse to store your data.</p>
                    
                    <Step number={1} title="Create a new lakehouse">
                      <p className="mb-4">In your Fabric workspace:</p>
                      <ol className="list-decimal pl-6 mb-4">
                        <li>Select the <strong>Data Engineering</strong> experience from the experience switcher at the bottom left.</li>
                        <li>On the Data Engineering home page, select the <strong>Lakehouse</strong> tile to create a new lakehouse.</li>
                        <li>In the <strong>New lakehouse</strong> dialog box, enter the name "Data-Lakehouse" for your lakehouse, then select <strong>Create</strong>.</li>
                      </ol>
                      
                      <Note type="tip">
                        Creating a lakehouse provisions both a storage layer and a compute engine, allowing you to immediately start querying and analyzing data.
                      </Note>
                    </Step>
                    
                    <Step number={2} title="Explore the lakehouse interface">
                      <p className="mb-4">After a few seconds, a new lakehouse will be created and its interface will be displayed. You should see something like this:</p>
                      
                      <img 
                        src="https://microsoftlearning.github.io/mslearn-fabric/Instructions/Labs/images/new-lakehouse.png" 
                        alt="New lakehouse interface" 
                        className="w-full rounded-md border border-neutral-200 shadow-sm mb-4"
                      />
                      
                      <p className="mb-4">The lakehouse interface includes:</p>
                      <ul className="list-disc pl-6 mb-4">
                        <li>A <strong>Tables</strong> folder where you can define and work with tables</li>
                        <li>A <strong>Files</strong> section where you can explore the underlying files in the lakehouse</li>
                        <li>A query pane where you can run SQL code against the tables</li>
                      </ul>
                    </Step>
                  </section>
                  
                  {/* Step 3 */}
                  <section id="section-step3" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Load and query data</h2>
                    
                    <Step number={1} title="Upload a sample file">
                      <p className="mb-4">Let's load some data into the lakehouse:</p>
                      <ol className="list-decimal pl-6 mb-4">
                        <li>Download the <a href="https://aka.ms/fabric-lakehouse-data" className="text-primary hover:underline">sample data file</a> to your local machine.</li>
                        <li>In the lakehouse interface, select the <strong>Files</strong> section.</li>
                        <li>On the toolbar, select <strong>Upload</strong> {'->'} <strong>Upload files</strong>.</li>
                        <li>Browse to and select the downloaded data file, then click <strong>Open</strong>.</li>
                      </ol>
                      
                      <CodeBlock 
                        language="sql" 
                        code="-- Example SQL query to view the table after loading
SELECT TOP 100 * FROM sales_data;"
                      />
                    </Step>
                    
                    <Step number={2} title="Create a table from the file">
                      <p className="mb-4">Now that we have a file in our lakehouse, let's create a table from it:</p>
                      <ol className="list-decimal pl-6 mb-4">
                        <li>Right-click the uploaded file and select <strong>Load to Tables</strong>.</li>
                        <li>In the dialog box, accept the default settings and select <strong>Load</strong>.</li>
                      </ol>
                      
                      <Note>
                        The data is being loaded into a Delta table. Delta provides transaction logs, data versioning, and other advanced features.
                      </Note>
                    </Step>
                  </section>
                  
                  {/* Step 4 */}
                  <section id="section-step4" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Visualize results</h2>
                    
                    <Step number={1} title="Query the data">
                      <p className="mb-4">Now that we have a table, let's query it:</p>
                      <CodeBlock 
                        language="sql" 
                        code="SELECT 
  YEAR(OrderDate) AS Year,
  MONTH(OrderDate) AS Month,
  SUM(SalesAmount) AS TotalSales
FROM 
  sales_data
GROUP BY 
  YEAR(OrderDate),
  MONTH(OrderDate)
ORDER BY 
  Year, Month;"
                      />
                    </Step>
                    
                    <Step number={2} title="Create a visualization">
                      <p className="mb-4">Let's turn these results into a visualization:</p>
                      <ol className="list-decimal pl-6 mb-4">
                        <li>Run the query above.</li>
                        <li>After the results appear, select the <strong>Chart</strong> view.</li>
                        <li>Choose <strong>Line chart</strong> as the visualization type.</li>
                        <li>Configure the chart settings:
                          <ul className="list-disc pl-6 mb-2">
                            <li>X-axis: Month</li>
                            <li>Y-axis: TotalSales</li>
                            <li>Legend: Year</li>
                          </ul>
                        </li>
                      </ol>
                      
                      <img 
                        src="https://microsoftlearning.github.io/mslearn-fabric/Instructions/Labs/images/sales-visualization.png" 
                        alt="Sales visualization" 
                        className="w-full rounded-md border border-neutral-200 shadow-sm mb-4"
                      />
                    </Step>
                  </section>
                  
                  {/* Conclusion */}
                  <section id="section-conclusion" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                    <p className="mb-4">
                      In this exercise, you explored how to create a lakehouse in Microsoft Fabric. You learned how to:
                    </p>
                    <ul className="list-disc pl-6 mb-6">
                      <li>Create a workspace with Fabric enabled</li>
                      <li>Create a lakehouse to store data</li>
                      <li>Upload files to the lakehouse</li>
                      <li>Create tables from the files</li>
                      <li>Query and visualize the data</li>
                    </ul>
                    
                    <p className="mb-4">
                      Lakehouses combine the best features of data lakes and data warehouses, providing both the flexibility of files and the structure of tables. This allows you to work with your data using familiar SQL semantics while maintaining the advantages of a data lake architecture.
                    </p>
                    
                    <div className="bg-neutral-100 p-6 rounded-lg mt-8">
                      <h3 className="text-xl font-bold mb-4">Further Learning</h3>
                      <p className="mb-4">
                        To learn more about Microsoft Fabric lakehouses, explore these resources:
                      </p>
                      <ul className="list-disc pl-6">
                        <li><a href="#" className="text-primary hover:underline">Microsoft Fabric documentation</a></li>
                        <li><a href="#" className="text-primary hover:underline">Delta Lake documentation</a></li>
                        <li><a href="#" className="text-primary hover:underline">Advanced data engineering in Fabric</a></li>
                      </ul>
                    </div>
                  </section>
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
                            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">{relatedPost.category}</span>
                            <h3 className="font-bold mt-2 mb-1">{relatedPost.title}</h3>
                            <p className="text-sm text-neutral-600 line-clamp-2">{relatedPost.description}</p>
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