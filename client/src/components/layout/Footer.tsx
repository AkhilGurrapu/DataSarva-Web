import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="text-2xl font-bold mb-6">
              <span className="text-white">Data</span>
              <span className="text-primary/90">AI</span>
            </div>
            <p className="text-neutral-300 mb-6">
              Transforming businesses through data analytics and artificial intelligence solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                className="text-neutral-300 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-neutral-300 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-neutral-300 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                className="text-neutral-300 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Solutions</h3>
            <ul className="space-y-4">
              {solutionsLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-neutral-300 hover:text-white transition-all duration-300">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-neutral-300 hover:text-white transition-all duration-300">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-neutral-300 hover:text-white transition-all duration-300">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-400 mb-4 md:mb-0">
            &copy; {currentYear} DataAI Consulting. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="text-neutral-400 hover:text-white transition-all duration-300">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
