import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HEADSHOT = "/headshot.png";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(137,91,245,0.3), 0 0 60px rgba(137,91,245,0.1); }
          50% { box-shadow: 0 0 40px rgba(137,91,245,0.6), 0 0 100px rgba(137,91,245,0.2); }
        }
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ring-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-glow { animation: glow-pulse 3s ease-in-out infinite; }
        .photo-ring-outer {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 2px dashed rgba(137,91,245,0.4);
          animation: ring-spin 12s linear infinite;
        }
        .photo-ring-inner {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(111,169,236,0.3);
          animation: ring-spin-reverse 8s linear infinite;
        }
      `}</style>

      {/* Subtle background wash */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float delay-300" />
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center gap-4">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">Open for opportunities</span>
            </div>

            {/* Photo */}
            <div className="relative flex-shrink-0 opacity-0 animate-scale-in delay-300" style={{ animationFillMode: 'forwards' }}>
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110" />
              <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                <div className="photo-ring-outer" />
                <div className="photo-ring-inner" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-foreground shadow-lg shadow-accent-foreground/50" />
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-muted/30 animate-glow relative z-10">
                  <img
                    src={HEADSHOT}
                    alt="Ekene - Data Analyst & Frontend Developer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Floating badges */}
                <div className="absolute -bottom-4 -left-6 bg-card border border-border rounded-xl px-3 py-2 shadow-lg animate-float delay-200 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs font-semibold text-foreground">SQL & Power BI</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-6 bg-card border border-border rounded-xl px-3 py-2 shadow-lg animate-float delay-400 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-xs font-semibold text-foreground">React Dev</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="opacity-0 animate-slide-up delay-200" style={{ animationFillMode: 'forwards' }}>
            <p className="text-xl md:text-2xl font-semibold text-muted-foreground mt-6 mb-2 tracking-wide">
              👋 Hi, I'm <span className="text-primary font-bold text-2xl md:text-3xl">Ekene</span>
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 animate-slide-up">
            <span className="text-foreground">Data Analyst &</span>
            <br />
            <span className="text-primary">Frontend Developer</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up delay-100">
            4+ years turning raw data into business decisions with Excel, SQL & Power BI — and building the interfaces people actually use.
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-slide-up delay-200">
            {["Excel", "SQL", "Power BI", "React", "TypeScript", "Tailwind CSS"].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground bg-card"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-300">
            <Button variant="hero" size="xl" onClick={() => scrollToSection("projects")}>
              View Projects
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => scrollToSection("contact")}>
              Contact Me
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mt-16 max-w-sm mx-auto animate-fade-in delay-400">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">4+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
