import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileSpreadsheet, 
  Database, 
  BarChart3, 
  LineChart,
  ExternalLink,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart
} from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Sales Performance Dashboard",
      description: "Comprehensive Excel dashboard analyzing sales performance across multiple regions with KPIs, trend analysis, and forecasting. Enabled real-time monitoring of revenue metrics and identified underperforming segments.",
      tools: ["Excel", "Pivot Tables", "Charts", "Conditional Formatting"],
      icon: FileSpreadsheet,
      color: "from-emerald-500 to-green-600",
      insights: [
        "20% reduction in reporting time",
        "Identified 3 key growth opportunities",
        "Automated monthly KPI tracking"
      ],
      metric: { icon: TrendingUp, value: "25%", label: "Revenue Growth Tracked" },
    },
    {
      title: "Customer Behavior Analysis",
      description: "SQL-based analysis of customer purchase patterns using complex joins, CTEs, and aggregations. Uncovered key insights about customer lifetime value, churn prediction, and purchasing trends.",
      tools: ["SQL", "CTEs", "Joins", "Aggregations"],
      icon: Database,
      color: "from-blue-500 to-cyan-600",
      insights: [
        "Segmented 10,000+ customers",
        "Identified high-value customer profiles",
        "Reduced churn by targeting at-risk users"
      ],
      metric: { icon: Users, value: "10K+", label: "Customers Analyzed" },
    },
    {
      title: "Business Intelligence Dashboard",
      description: "Interactive Power BI dashboard providing executive-level insights into operational efficiency, financial metrics, and departmental KPIs. Features drill-down capabilities and automated data refresh.",
      tools: ["Power BI", "DAX", "Data Modeling", "Visualization"],
      icon: BarChart3,
      color: "from-amber-500 to-orange-600",
      insights: [
        "Real-time data monitoring",
        "Executive decision support",
        "Cross-departmental visibility"
      ],
      metric: { icon: DollarSign, value: "15%", label: "Efficiency Increase" },
    },
    {
      title: "E-commerce Analytics Report",
      description: "Story-driven data visualization project analyzing e-commerce performance, customer journey, and conversion funnels. Created compelling visual narratives for stakeholder presentations.",
      tools: ["Data Visualization", "Excel", "Storytelling", "Charts"],
      icon: LineChart,
      color: "from-purple-500 to-pink-600",
      insights: [
        "Mapped complete customer journey",
        "Identified conversion bottlenecks",
        "Increased checkout rate insights"
      ],
      metric: { icon: ShoppingCart, value: "30%", label: "Conversion Insights" },
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world data analysis projects demonstrating expertise in Excel, SQL, 
              Power BI, and data visualization.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                variant="glow"
                className="group overflow-hidden"
              >
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
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, toolIndex) => (
                        <span
                          key={toolIndex}
                          className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground border border-border"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Key Insights */}
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Key Insights:</h4>
                      <ul className="space-y-2">
                        {project.insights.map((insight, insightIndex) => (
                          <li key={insightIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Interested in seeing more or discussing a project?
            </p>
            <Button
              variant="heroOutline"
              size="lg"
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Let's Work Together
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
