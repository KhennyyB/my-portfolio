import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dataAnalysisProjects, webDevelopmentProjects } from "@/data/projectsData";

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => (
  <Card
    variant="glow"
    className="group overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
    onClick={onClick}
  >
    <CardContent className="p-0">
      {/* Preview Image */}
      {project.image ? (
        <div className="w-full h-48 overflow-hidden border-b border-border">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
            width={600}
            height={192}
          />
        </div>
      ) : (
        <div className="bg-card p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <project.icon className="w-7 h-7 text-primary" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-foreground/90">
                <project.metric.icon className="w-5 h-5" />
                <span className="text-2xl font-bold">{project.metric.value}</span>
              </div>
              {project.metric.label && (
                <span className="text-sm text-foreground/70">{project.metric.label}</span>
              )}
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
        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

        {/* Tools */}
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool: string, toolIndex: number) => (
            <span
              key={toolIndex}
              className="px-3 py-1 rounded-full text-xs font-medium text-foreground border border-border bg-card"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Key Insights */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Key Insights:</h4>
          <ul className="space-y-2">
            {project.insights.map((insight: string, insightIndex: number) => (
              <li key={insightIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {insight}
              </li>
            ))}
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

  return (
    <section id="projects" className="py-20 relative md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-primary font-mono text-xs tracking-wider uppercase mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Selected Work
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Real-world projects spanning data analysis and frontend web development.
            </p>
          </div>

          {/* Data Analysis */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-foreground mb-1">Data Analysis</h3>
            <p className="text-muted-foreground text-sm mb-8">
              Excel, SQL, Power BI, and data visualization work.
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

          {/* Web Development */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-foreground mb-1">Web Development</h3>
            <p className="text-muted-foreground text-sm mb-8">
              Frontend projects built with React, TypeScript, and responsive design.
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
            <p className="text-muted-foreground text-sm mb-4">
              Want to see more or discuss a project?
            </p>
            <Button
              variant="heroOutline"
              size="lg"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in Touch
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
