// Types for Products
export interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  color: string;
  link: string;
}

// Types for Services
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

// Types for Case Studies
export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  industry: string;
  category: string;
  results: string[];
  technologies: string[];
  image: string;
  link: string;
}

// Types for Testimonials
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  rating: number;
}

// Types for Resources
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: "whitepapers" | "casestudies" | "guides" | "webinars";
  readTime: string;
  image: string;
  link: string;
  linkText: string;
  linkIcon: string;
}

// Types for Blog Posts
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  link: string;
}

// Types for Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}
