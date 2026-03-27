import { Button } from "@/components/ui/button";
import { ArrowRight, Database, BarChart3, PieChart, TrendingUp, Code2, Layout } from "lucide-react";

const HEADSHOT = "/headshot.png"; // Base64-encoded image string

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden data-grid">

          <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
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
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-scale-in { animation: scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-glow { animation: glow-pulse 3s ease-in-out infinite; }
        .animate-ring-spin { animation: ring-spin 8s linear infinite; }
        .animate-ring-reverse { animation: ring-spin-reverse 6s linear infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #895bf5 0%, #c4a3ff 40%, #895bf5 60%, #6fa9ec 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
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


      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float delay-300" />
        
        {/* Floating data icons */}
        <div className="absolute top-1/4 left-[15%] text-primary/20 animate-float delay-100">
          <Database className="w-12 h-12" />
        </div>
        <div className="absolute top-1/3 right-[20%] text-primary/20 animate-float delay-200">
          <BarChart3 className="w-16 h-16" />
        </div>
        <div className="absolute bottom-1/4 left-[25%] text-primary/20 animate-float delay-400">
          <Code2 className="w-10 h-10" />
        </div>
        <div className="absolute bottom-1/3 right-[15%] text-primary/20 animate-float delay-500">
          <Layout className="w-14 h-14" />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Two-column layout: text left, photo right */}
          <div className="flex flex-col items-center gap-4 lg:gap-4">
            
          {/* Left column — text content */}
          <div className="flex-1 text-center lg:text-left"></div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">Open for opportunities</span>
          </div>

          {/* Right column — photo */}
          <div className="relative flex-shrink-0 opacity-0 animate-scale-in delay-300" style={{animationFillMode:'forwards'}}>

          {/* Glow backdrop */}
          <div className="absolute inset-0 rounded-full bg-[#895bf5]/20 blur-3xl scale-110" />

          {/* Spinning rings */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div className="photo-ring-outer" />
            <div className="photo-ring-inner" /> 

          {/* Dot accents on rings */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#895bf5] shadow-lg shadow-[#895bf5]/50" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#6fa9ec] shadow-lg shadow-[#6fa9ec]/50" />
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-2 h-2 rounded-full bg-[#895bf5]/70" />
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-2 h-2 rounded-full bg-[#6fa9ec]/70 shadow-lg shadow-[#6fa9ec]/40" />

          {/* Photo container */}
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 animate-glow relative z-10">
            <img
              src={HEADSHOT}
              alt="Ekene - Data Analyst & Frontend Developer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Floating badge — Excel/SQL */}
          <div className="absolute -bottom-4 -left-6 bg-white border border-border rounded-xl px-3 py-2 shadow-lg animate-float delay-200 z-20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs font-semibold text-foreground">SQL & Power BI</span>
            </div>
          </div>

          {/* Floating badge — React */}
          <div className="absolute -top-2 -right-6 bg-white border border-border rounded-xl px-3 py-2 shadow-lg animate-float delay-400 z-20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#895bf5] rounded-full" />
              <span className="text-xs font-semibold text-foreground">React Dev</span>
            </div>
          </div>
          </div>
          </div>
          </div>

          {/* Hi greeting */}
          <div className="opacity-0 animate-slide-up delay-200" style={{animationFillMode:'forwards'}}>
            <p className="text-xl md:text-2xl font-semibold text-muted-foreground mt-6 mb-2 tracking-wide">
              👋 Hi, I'm <span className="shimmer-text font-bold text-2xl md:text-3xl">Ekene</span>
            </p>
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 animate-slide-up">
            <span className="text-foreground">Data Analyst &</span>
            <br />
            <span className="gradient-text text-[#895bf5]">Frontend Developer</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up delay-100">4+ years of experience in Excel, SQL, Power BI & Frontend Development. I transform complex data into actionable insights and build responsive, user-friendly web applications.
          </p>

          {/* Skills tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-slide-up delay-200">
            {["Excel", "SQL", "Power BI", "React", "TypeScript", "Tailwind CSS"].map((skill) => <span key={skill} className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-inherit bg-white">
                {skill}
              </span>)}
          </div>

          {/* CTA Buttons */}
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
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto animate-fade-in delay-400">
            <div className="text-center text-[#6fa9ec]">
              <div className="text-3xl md:text-4xl font-bold gradient-text text-[#895bf5]">4+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text text-[#895bf5]">15+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text text-[#895bf5]">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-1/2 translate-y-1/2 right-6 animate-bounce rotate-90">
          
        </div>
      </div>
    </section>;
};
export default HeroSection;