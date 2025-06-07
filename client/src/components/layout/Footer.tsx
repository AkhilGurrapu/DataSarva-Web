import { Link, useLocation } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [, navigate] = useLocation();

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      navigate('/');
      
      setTimeout(() => {
        const elementId = href.substring(2);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(href);
      // Scroll to top when navigating to new pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const solutionsLinks = [
    { href: "/#snowflake", label: "Snowflake Integration" },
    { href: "/#databricks", label: "Databricks Solutions" },
    { href: "/#powerbi", label: "Power BI Implementations" },
    { href: "/#ai", label: "AI Applications" },
  ];

  const servicesLinks = [
    { href: "/#data-strategy", label: "Data Strategy" },
    { href: "/#cloud-architecture", label: "Cloud Architecture" },
    { href: "/#data-engineering", label: "Data Engineering" },
    { href: "/#analytics", label: "Analytics & Visualization" },
    { href: "/#ai-ml", label: "AI & Machine Learning" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/resources", label: "Resources" },
    { href: "/#contact", label: "Contact" },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ];

  return (
    <footer className="bg-neutral-800 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Data</span>
              <span className="text-primary/90">AI</span>
            </div>
            <p className="text-neutral-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Transforming businesses through data analytics and artificial intelligence solutions.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="https://facebook.com" 
                className="text-neutral-300 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-neutral-300 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-neutral-300 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                className="text-neutral-300 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Solutions</h3>
            <ul className="space-y-3 sm:space-y-4">
              {solutionsLinks.map((link) => (
                <li key={link.href}>
                  <button 
                    onClick={() => handleNavigation(link.href)}
                    className="text-neutral-300 hover:text-white transition-all duration-300 text-left text-sm sm:text-base"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Services</h3>
            <ul className="space-y-3 sm:space-y-4">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <button 
                    onClick={() => handleNavigation(link.href)}
                    className="text-neutral-300 hover:text-white transition-all duration-300 text-left text-sm sm:text-base"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-3 sm:space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <button 
                    onClick={() => handleNavigation(link.href)}
                    className="text-neutral-300 hover:text-white transition-all duration-300 text-left text-sm sm:text-base"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-neutral-400 mb-4 sm:mb-0 text-sm sm:text-base text-center sm:text-left">
            &copy; {currentYear} DataAI Consulting. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {legalLinks.map((link) => (
              <button 
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className="text-neutral-400 hover:text-white transition-all duration-300 text-sm sm:text-base"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
