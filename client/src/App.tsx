import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/about";
import Resources from "@/pages/resources";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/BlogPost";
import { StarTrekStarfield } from "@/components/3d";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { ScrollAnimations } from "@/components/animations/ScrollAnimations";
import { Suspense } from "react";

// Define blog post routes for proper navigation
const blogRoutes = [
  "create-microsoft-fabric-lakehouse",
  "building-ml-pipeline-databricks-tutorial",
  "business-leaders-guide-data-governance",
  "optimizing-snowflake-performance",
  "ethical-considerations-ai-development",
  "implementing-data-mesh-architecture",
  "power-bi-vs-tableau",
  "getting-started-spark-databricks",
  "ai-trends-reshaping-enterprise-data-analytics"
];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/resources" component={Resources} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScrollProvider>
        {/* Enhanced 3D Star Trek background */}
        <Suspense fallback={<div />}>
          <StarTrekStarfield />
        </Suspense>
        
        {/* Keep original CSS background for compatibility */}
        <div className="star-trek-bg"></div>
        
        {/* Floating data streams - enhanced with GSAP */}
        <div className="data-stream" style={{ left: '10%', animationDelay: '0s' }}></div>
        <div className="data-stream" style={{ left: '30%', animationDelay: '2s' }}></div>
        <div className="data-stream" style={{ left: '50%', animationDelay: '4s' }}></div>
        <div className="data-stream" style={{ left: '70%', animationDelay: '6s' }}></div>
        <div className="data-stream" style={{ left: '90%', animationDelay: '8s' }}></div>
        
        {/* GSAP scroll animations */}
        <ScrollAnimations />
        
        <Router />
        <Toaster />
      </SmoothScrollProvider>
    </QueryClientProvider>
  );
}

export default App;
