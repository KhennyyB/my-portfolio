import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dataAnalysisProjects, webDevelopmentProjects } from "@/data/projectsData";

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => (
  <Card variant="glow" className="group overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]" onClick={onClick}>
    <CardContent className="p-0">
      {/* Preview Image */}
      {project.image ? (
        <div className="w-full h-48 overflow-hidden border-b border-border">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      ) : (
        /* Header with icon & metric */
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <project.icon className="w-7 h-7 text-primary" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-foreground/90">
                <project.metric.icon className="w-5 h-5" />
                <span className="text-2xl font-bold">{project.metric.value}</span>
              </div>
              {project.metric.label && <span className="text-sm text-foreground/70">{project.metric.label}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5 space-y-3">
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
          {project.tools.map((tool: string, toolIndex: number) => <span key={toolIndex} className="px-3 py-1 rounded-full text-xs font-medium text-foreground border border-border bg-white">
              {tool}
            </span>)}
        </div>

        {/* Key Insights */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Key Insights:</h4>
          <ul className="space-y-2">
            {project.insights.map((insight: string, insightIndex: number) => <li key={insightIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {insight}
              </li>)}
          </ul>
        </div>

        {/* View Project Button */}
        <div className="pt-2">
          <span className="text-sm text-primary font-medium group-hover:underline">
            {project.liveUrl ? "Visit Live Site →" : "View Full Analysis →"}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProjectsSection = () => {
  const navigate = useNavigate();

  return <section id="projects" className="py-20 relative md:py-[128px]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Featured <span className="gradient-text text-[#895bf5]">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world projects spanning data analysis and frontend web development.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>

          {/* Data Analysis Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-2">📊 Data Analysis</h3>
            <p className="text-muted-foreground mb-8">
              Projects demonstrating expertise in Excel, SQL, Power BI, and data visualization.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataAnalysisProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  onClick={() => navigate(`/project/${project.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Web Development Projects */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-2">💻 Web Development</h3>
            <p className="text-muted-foreground mb-8">
              Frontend projects built with modern technologies — React, TypeScript, and responsive design.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webDevelopmentProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  onClick={() => {
                    if (project.liveUrl) {
                      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                    } else {
                      navigate(`/project/${project.id}`);
                    }
                  }}
                />
              ))}
            </div>
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
