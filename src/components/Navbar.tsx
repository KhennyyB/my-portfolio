import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    href: "#about",
    label: "About"
  }, {
    href: "#skills",
    label: "Skills"
  }, {
    href: "#projects",
    label: "Projects"
  }, {
    href: "#contact",
    label: "Contact"
  }];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="text-xl md:text-2xl font-bold tracking-tight" onClick={e => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}>
            <span className="gradient-text text-[#895bf5]">Ekene</span>
            <span className="text-foreground">.dev</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium">
                {link.label}
              </button>)}
            <a href="/Ekene_Okoli_Resume.pdf" download className="rounded-md bg-[#895bf5]">
              <Button variant="hero" size="sm">
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border">
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map(link => <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-left py-2">
                  {link.label}
                </button>)}
              <a href="/Ekene_Okoli_Resume.pdf" download className="mt-2">
                <Button variant="hero" size="sm" className="w-full">
                  <Download className="w-4 h-4" />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;