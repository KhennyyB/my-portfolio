import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Award, Target } from "lucide-react";
const AboutSection = () => {
  const highlights = [{
    icon: Briefcase,
    title: "Enterprise Analyst",
    description: "Currently at Iwosan Lagoon Hospitals, driving data-driven decisions"
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
  }];
  return <section id="about" className="py-20 relative md:py-[70px]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">About Me</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Passionate About <span className="gradient-text text-[#895bf5]">Data-Driven Solutions</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm <span className="text-foreground font-semibold">Ekene Okoli</span>, an Application Analyst and 
                Frontend Developer with over 3 years of experience transforming raw data into actionable 
                business insights.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My expertise spans across <span className="text-primary">Excel</span>, <span className="text-primary">SQL</span>, 
                and <span className="text-primary">data visualization</span>, with a proven track record of improving 
                decision-making processes and optimizing user experiences through data-driven approaches.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I thrive on solving complex business problems, from analyzing operational data to building 
                interactive dashboards that enable real-time monitoring and reduce manual reporting hours 
                significantly.
              </p>

              {/* Quick facts */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">Lagos, Nigeria</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  
                  
                </div>
              </div>
            </div>

            {/* Right content - Cards */}
            <div className="grid sm:grid-cols-2 gap-4 bg-inherit">
              {highlights.map((item, index) => <Card key={index} variant="glow" className="group cursor-default">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;