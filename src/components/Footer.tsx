import { Linkedin, Mail, Github, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <a href="#" className="text-xl font-bold tracking-tight inline-block mb-2">
                <span className="gradient-text">Ekene</span>
                <span className="text-foreground">.dev</span>
              </a>
              <p className="text-sm text-muted-foreground">
                © {currentYear} Ekene Okoli. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/ekene-okoli-93480816b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline text-sm">LinkedIn</span>
              </a>
              
              <a
                href="mailto:khennyphresh@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline text-sm">Email</span>
              </a>
            </div>

            {/* Back to top */}
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>

          {/* Bottom text */}
          <div className="mt-8 pt-8 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              Data Analyst • Excel Expert • SQL Developer • Business Intelligence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
