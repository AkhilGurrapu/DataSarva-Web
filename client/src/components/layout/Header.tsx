import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, navigate] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/#products", label: "Products" },
    { href: "/#services", label: "Services" },
    { href: "/#resources", label: "Resources" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      navigate('/');
      
      // Allow time for navigation to complete before scrolling
      setTimeout(() => {
        const elementId = href.substring(2);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md bg-white/95" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div 
            onClick={() => navigate('/')} 
            className="text-xl sm:text-2xl font-bold cursor-pointer"
          >
            <span className="text-primary">Data</span>
            <span className="text-accent">AI</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <div 
              key={link.href} 
              onClick={() => handleNavigation(link.href)} 
              className="text-neutral-800 hover:text-primary font-medium transition-all duration-300 cursor-pointer text-sm xl:text-base"
            >
              {link.label}
            </div>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="lg:hidden flex items-center p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-800" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-800" />
          )}
        </button>

        {/* Contact Button (Desktop) */}
        <Button 
          onClick={() => handleNavigation("/#contact")}
          className="hidden lg:block bg-primary hover:bg-primary/90 text-white text-sm xl:text-base px-4 xl:px-6"
        >
          Get Started
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden px-4 sm:px-6 py-4 bg-white border-t border-neutral-200 shadow-lg ${
        isOpen ? "block" : "hidden"
      }`}>
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <div 
              key={link.href} 
              onClick={() => handleNavigation(link.href)} 
              className="text-neutral-800 hover:text-primary font-medium transition-all duration-300 cursor-pointer py-2 text-base"
            >
              {link.label}
            </div>
          ))}
          <Button 
            onClick={() => handleNavigation("/#contact")}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 mt-4"
          >
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
