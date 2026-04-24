import { Linkedin, Mail, Github, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-border relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <a
                href="#"
                className="text-xl font-bold tracking-tight inline-block mb-1"
              >
                <span className="text-primary">Ekene</span>
                <span className="text-foreground">.dev</span>
              </a>
              <p className="text-xs text-muted-foreground">
                © {currentYear} Ekene Okoli. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { href: "https://linkedin.com/in/ekene-okoli", icon: Linkedin, label: "LinkedIn" },
                { href: "https://github.com/khennyyb", icon: Github, label: "GitHub" },
                { href: "mailto:khennyphresh@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <div className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary/50 transition-all bg-card">
                    <Icon className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>

            {/* Back to top */}
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full w-9 h-9"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
