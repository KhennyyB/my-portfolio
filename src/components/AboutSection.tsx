import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Award, Target, Code2, Layout } from "lucide-react";
const AboutSection = () => {
  const highlights = [{
    icon: Briefcase,
    title: "Enterprise Analyst",
    description: "Currently at Iwosan Lagoon Hospitals, driving data-driven decisions"
  }, {
    icon: Code2,
    title: "Frontend Developer",
    description: "Building responsive, modern web applications with React & TypeScript"
  }, {
    icon: GraduationCap,
    title: "Certified Professional",
    description: "ALX Africa Certified Data Analyst & Software Engineer"
  }, {
    icon: Award,
    title: "Proven Results",
    description: "15% efficiency increase through data analysis insights"
  }, {
    icon: Target,
    title: "Business Impact",
    description: "30% reduction in data errors through process optimization"
  }, {
    icon: Layout,
    title: "Web Solutions",
    description: "Delivering pixel-perfect, accessible interfaces for real-world products"
  }];
  return <section id="about" className="py-16 md:py-20 lg:py-[70px] relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-mono text-xs sm:text-sm tracking-wider uppercase">About Me</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 leading-tight px-2">
              Data Analyst & <span className="gradient-text text-[#895bf5]">Frontend Developer</span>
            </h2>
            <div className="w-16 md:w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
            {/* Left content */}
            <div className="space-y-4 md:space-y-6 px-2 md:px-0">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">I am an Application/Data Analyst and Frontend Web Developer with over 4 years of experience transforming raw data into actionable business insights and building modern web applications.</p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                My expertise spans across <span className="text-primary font-semibold">Excel</span>, <span className="text-primary font-semibold">SQL</span>, 
                <span className="text-primary font-semibold"> data visualization</span>, and <span className="text-primary font-semibold">frontend development</span> with 
                React, TypeScript, and modern CSS frameworks, with a proven track record of improving 
                decision-making processes and delivering polished user experiences.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">I thrive on solving complex business problems, from analyzing operational data and building interactive dashboards to crafting responsive, accessible web applications that delight users.</p>

              {/* Quick facts */}
              <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            {/* Right content - Cards */}
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 bg-inherit px-2 md:px-0">
              {highlights.map((item, index) => <Card key={index} variant="glow" className="group cursor-default h-full">
                  <CardContent className="p-4 md:p-6 flex flex-col h-full">
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <item.icon className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base text-foreground mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;