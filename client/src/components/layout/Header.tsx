import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

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

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md bg-white/95" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-2xl font-bold cursor-pointer">
              <span className="text-primary">Data</span>
              <span className="text-accent">AI</span>
            </a>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="text-neutral-800 hover:text-primary font-medium transition-all duration-300">
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-neutral-800" />
          ) : (
            <Menu className="h-6 w-6 text-neutral-800" />
          )}
        </button>

        {/* Contact Button (Desktop) */}
        <Link href="/#contact">
          <Button 
            className="hidden md:block bg-primary hover:bg-primary/90 text-white"
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden px-6 py-4 bg-white border-t border-neutral-200 ${
        isOpen ? "block" : "hidden"
      }`}>
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="text-neutral-800 hover:text-primary font-medium transition-all duration-300">
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/#contact">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
