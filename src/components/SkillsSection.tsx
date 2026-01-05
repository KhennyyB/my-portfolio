import { Card, CardContent } from "@/components/ui/card";
import { 
  FileSpreadsheet, 
  Database, 
  BarChart3, 
  LineChart,
  Code2,
  Globe,
  Server,
  Users
} from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Microsoft Excel",
      icon: FileSpreadsheet,
      color: "from-emerald-500 to-green-600",
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
      color: "from-blue-500 to-cyan-600",
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
      color: "from-amber-500 to-orange-600",
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
      color: "from-purple-500 to-pink-600",
      skills: [
        "Storytelling with Data",
        "KPI Design & Tracking",
        "Trend Analysis Charts",
        "Executive Reporting",
        "Visual Best Practices",
      ],
    },
  ];

  const additionalSkills = [
    { icon: Code2, name: "JavaScript", level: "Intermediate" },
    { icon: Globe, name: "HTML/CSS", level: "Advanced" },
    { icon: Server, name: "Git & GitHub", level: "Intermediate" },
    { icon: Server, name: "API", level: "Intermediate" },
    { icon: Code2, name: "React", level: "Intermediate" },
    { icon: Globe, name: "Tailwind CSS", level: "Intermediate" },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/30 relative">
      <div className="absolute inset-0 data-grid opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Expertise</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized in turning complex datasets into clear, actionable insights using 
              industry-leading tools and technologies.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>

          {/* Main Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                variant="glow"
                className="group overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                      <category.icon className="w-7 h-7 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">Core Competency</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
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
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">Additional Skills</h3>
            <p className="text-sm text-muted-foreground">Frontend development & collaboration tools</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalSkills.map((skill, index) => (
              <Card key={index} variant="glass" className="group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">{skill.name}</h4>
                  <span className="text-xs text-muted-foreground">{skill.level}</span>
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
