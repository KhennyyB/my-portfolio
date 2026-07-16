import { cloneElement, forwardRef, useEffect, useRef } from "react";
import type { HTMLAttributes, ReactElement } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { dataAnalysisProjects, webDevelopmentProjects } from "@/data/projectsData";

const ProjectCard = forwardRef<
  HTMLDivElement,
  { project: any; onCtaClick: () => void } & HTMLAttributes<HTMLDivElement>
>(({ project, onCtaClick, className, ...rest }, ref) => (
  <Card
    ref={ref}
    variant="glow"
    className={cn(
      "group w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] flex-shrink-0 overflow-hidden transition-transform hover:scale-[1.02]",
      className
    )}
    {...rest}
  >
    <CardContent className="p-0">
      {/* Preview Image */}
      {project.image ? (
        <div className="w-full h-28 sm:h-32 md:h-36 overflow-hidden border-b border-border">
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
        <div className="bg-card p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <project.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-foreground/90">
                <project.metric.icon className="w-4 h-4" />
                <span className="text-xl font-bold">{project.metric.value}</span>
              </div>
              {project.metric.label && (
                <span className="text-xs text-foreground/70">{project.metric.label}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <ExternalLink className="w-4 h-4 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <p className="text-muted-foreground text-xs leading-normal line-clamp-2">{project.description}</p>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5">
          {project.tools.slice(0, 3).map((tool: string, toolIndex: number) => (
            <span
              key={toolIndex}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium text-foreground border border-border bg-card"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Key Insights */}
        <div className="pt-2 border-t border-border">
          <h4 className="text-xs font-semibold text-foreground mb-1.5">Key Insights:</h4>
          <ul className="space-y-1">
            {project.insights.slice(0, 2).map((insight: string, insightIndex: number) => (
              <li key={insightIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="line-clamp-1">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* View Project Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={onCtaClick}
            className="text-xs text-primary font-medium hover:text-primary/80 transition-colors"
          >
            {project.liveUrl ? "Visit Live Site →" : "View Full Analysis →"}
          </button>
        </div>
      </div>
    </CardContent>
  </Card>
));
ProjectCard.displayName = "ProjectCard";

const AUTO_SCROLL_SPEED = 0.6; // pixels per animation frame

const ProjectCarousel = ({
  items,
  renderCard,
}: {
  items: any[];
  renderCard: (project: any) => ReactElement;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const loopStartRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const pausedRef = useRef(false);

  // The item list is rendered twice back-to-back so the auto-scroll can wrap
  // from the end of the first (real) set into the identical second (cloned)
  // set with no visible jump, then silently rewind by exactly one set's width.
  useEffect(() => {
    const measure = () => {
      const scrollEl = scrollRef.current;
      const loopStartEl = loopStartRef.current;
      if (!scrollEl || !loopStartEl) return;
      const scrollRect = scrollEl.getBoundingClientRect();
      const loopStartRect = loopStartEl.getBoundingClientRect();
      loopWidthRef.current = loopStartRect.left - scrollRect.left + scrollEl.scrollLeft;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  useEffect(() => {
    let rafId: number;

    const step = () => {
      const el = scrollRef.current;
      const loopWidth = loopWidthRef.current;
      if (el && loopWidth > 0) {
        if (!pausedRef.current) {
          el.scrollLeft += AUTO_SCROLL_SPEED;
        }
        if (el.scrollLeft >= loopWidth) {
          el.scrollLeft -= loopWidth;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const scrollByAmount = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction, behavior: "smooth" });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
      onTouchEnd={() => (pausedRef.current = false)}
      onTouchCancel={() => (pausedRef.current = false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((project, index) => cloneElement(renderCard(project), { key: `original-${index}` }))}
        {items.map((project, index) =>
          cloneElement(renderCard(project), {
            key: `clone-${index}`,
            "aria-hidden": true,
            ...(index === 0 ? { ref: loopStartRef } : {}),
          })
        )}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollByAmount(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card border border-border shadow-md items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollByAmount(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 flex w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card border border-border shadow-md items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

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
            <ProjectCarousel
              items={dataAnalysisProjects}
              renderCard={(project) => (
                <ProjectCard project={project} onCtaClick={() => navigate(`/project/${project.id}`)} />
              )}
            />
          </div>

          {/* Web Development */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-foreground mb-1">Web Development</h3>
            <p className="text-muted-foreground text-sm mb-8">
              Frontend projects built with React, TypeScript, and responsive design.
            </p>
            <ProjectCarousel
              items={webDevelopmentProjects}
              renderCard={(project) => (
                <ProjectCard
                  project={project}
                  onCtaClick={() => {
                    if (project.liveUrl) {
                      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                    } else {
                      navigate(`/project/${project.id}`);
                    }
                  }}
                />
              )}
            />
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
