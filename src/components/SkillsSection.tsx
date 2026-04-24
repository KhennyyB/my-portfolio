import { Card, CardContent } from "@/components/ui/card";
import {
  FileSpreadsheet,
  Database,
  BarChart3,
  LineChart,
  Code2,
  Globe,
  Server,
  Layout,
  Palette,
  Smartphone,
} from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Microsoft Excel",
      icon: FileSpreadsheet,
      skills: [
        "Pivot Tables & Pivot Charts",
        "Advanced Functions (VLOOKUP, INDEX-MATCH)",
        "Interactive Dashboards",
        "Data Cleaning & Transformation",
        "KPI Reporting",
      ],
    },
    {
      title: "SQL",
      icon: Database,
      skills: [
        "Complex Joins & Subqueries",
        "Common Table Expressions (CTEs)",
        "Data Aggregation & Analysis",
        "Database Manipulation",
        "Query Optimization",
      ],
    },
    {
      title: "Power BI",
      icon: BarChart3,
      skills: [
        "DAX Formulas",
        "Interactive Dashboards",
        "Data Modeling",
        "Report Design",
        "Business Intelligence",
      ],
    },
    {
      title: "Data Visualization",
      icon: LineChart,
      skills: [
        "Storytelling with Data",
        "KPI Design & Tracking",
        "Trend Analysis Charts",
        "Executive Reporting",
        "Visual Best Practices",
      ],
    },
    {
      title: "React & TypeScript",
      icon: Code2,
      skills: [
        "Component Architecture",
        "Hooks & State Management",
        "TypeScript Integration",
        "React Router & SPA",
        "API Integration",
      ],
    },
    {
      title: "HTML, CSS & Tailwind",
      icon: Layout,
      skills: [
        "Semantic HTML5",
        "CSS Grid & Flexbox",
        "Tailwind CSS Utility-First",
        "Responsive Design",
        "Cross-Browser Compatibility",
      ],
    },
  ];

  const additionalSkills = [
    { icon: Server, name: "Git & GitHub", level: "Intermediate" },
    { icon: Server, name: "REST APIs", level: "Intermediate" },
    { icon: Palette, name: "Figma", level: "Basic" },
    { icon: Smartphone, name: "Responsive Design", level: "Advanced" },
    { icon: Globe, name: "SEO Basics", level: "Intermediate" },
    { icon: Code2, name: "Vite", level: "Intermediate" },
  ];

  return (
    <section id="skills" className="py-20 md:py-28 bg-secondary/20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header — centered but no divider */}
          <div className="text-center mb-14">
            <p className="text-primary font-mono text-xs tracking-wider uppercase mb-3">
              Expertise
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Technical Skills
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Data analysis and frontend development — turning datasets into clear insights and
              building modern, responsive interfaces.
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {skillCategories.map((category, index) => (
              <Card key={index} variant="glow" className="group overflow-hidden">
                <CardContent className="p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center gap-2.5 text-sm">
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-1">Also comfortable with</h3>
            <p className="text-sm text-muted-foreground mb-5">Tools & workflow</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {additionalSkills.map((skill, index) => (
              <Card key={index} variant="glass" className="group">
                <CardContent className="p-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <skill.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{skill.name}</h4>
                    <span className="text-xs text-muted-foreground">{skill.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
