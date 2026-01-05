import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projects } from "@/data/projectsData";
const ProjectsSection = () => {
  const navigate = useNavigate();
  return <section id="projects" className="py-20 relative md:py-[128px]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Featured <span className="gradient-text text-[#6fa9ec]">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world data analysis projects demonstrating expertise in Excel, SQL, 
              Power BI, and data visualization.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => <Card key={index} variant="glow" className="group overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => navigate(`/project/${project.id}`)}>
                <CardContent className="p-0">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-br ${project.color} p-6`}>
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-xl bg-foreground/20 backdrop-blur-sm flex items-center justify-center">
                        <project.icon className="w-7 h-7 text-foreground" />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-foreground/90">
                          <project.metric.icon className="w-5 h-5" />
                          <span className="text-2xl font-bold">{project.metric.value}</span>
                        </div>
                        <span className="text-sm text-foreground/70">{project.metric.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, toolIndex) => <span key={toolIndex} className="px-3 py-1 rounded-full text-xs font-medium text-foreground border border-border bg-white">
                          {tool}
                        </span>)}
                    </div>

                    {/* Key Insights */}
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Key Insights:</h4>
                      <ul className="space-y-2">
                        {project.insights.map((insight, insightIndex) => <li key={insightIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {insight}
                          </li>)}
                      </ul>
                    </div>

                    {/* View Project Button */}
                    <div className="pt-2">
                      <span className="text-sm text-primary font-medium group-hover:underline">
                        View Full Analysis →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Interested in seeing more or discussing a project?
            </p>
            <Button variant="heroOutline" size="lg" onClick={() => {
            const element = document.getElementById("contact");
            if (element) element.scrollIntoView({
              behavior: "smooth"
            });
          }}>
              Let's Work Together
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default ProjectsSection;