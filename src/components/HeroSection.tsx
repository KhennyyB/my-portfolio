import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Database, BarChart3, PieChart, TrendingUp } from "lucide-react";
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
          <PieChart className="w-10 h-10" />
        </div>
        <div className="absolute bottom-1/3 right-[15%] text-primary/20 animate-float delay-500">
          <TrendingUp className="w-14 h-14" />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">Open for opportunities</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
            <span className="text-foreground">Data Analyst</span>
            <br />
            <span className="gradient-text text-[#895bf5]">Turning Data into Insights</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up delay-100">
            3+ years of experience in Excel, SQL & Power BI. I transform complex data 
            into actionable insights that drive business decisions and digital transformation.
          </p>

          {/* Skills tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-slide-up delay-200">
            {["Excel", "SQL", "Power BI", "Data Visualization", "EDA"].map(skill => <span key={skill} className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-inherit bg-white">
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
              <div className="text-3xl md:text-4xl font-bold gradient-text text-[#6fa9ec]">3+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text text-[#6fa9ec]">15+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text text-[#6fa9ec]">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>;
};
export default HeroSection;