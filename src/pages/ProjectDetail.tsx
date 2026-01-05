import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download } from "lucide-react";
import { projects, projectDetailData } from "@/data/projectsData";
import { exportProjectData } from "@/utils/exportProject";
import SalesPerformanceDetail from "@/components/projects/SalesPerformanceDetail";
import CustomerBehaviorDetail from "@/components/projects/CustomerBehaviorDetail";
import BusinessIntelligenceDetail from "@/components/projects/BusinessIntelligenceDetail";
import EcommerceAnalyticsDetail from "@/components/projects/EcommerceAnalyticsDetail";
import OperationalEfficiencyDetail from "@/components/projects/OperationalEfficiencyDetail";
import PatientValidationDetail from "@/components/projects/PatientValidationDetail";
import PatientMonitoringDetail from "@/components/projects/PatientMonitoringDetail";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const data = projectDetailData[projectId as keyof typeof projectDetailData];

  const renderProjectContent = () => {
    switch (projectId) {
      case "sales-performance-dashboard":
        return <SalesPerformanceDetail data={data as any} />;
      case "customer-behavior-analysis":
        return <CustomerBehaviorDetail data={data as any} />;
      case "business-intelligence-dashboard":
        return <BusinessIntelligenceDetail data={data as any} />;
      case "ecommerce-analytics-report":
        return <EcommerceAnalyticsDetail data={data as any} />;
      case "operational-efficiency-analysis":
        return <OperationalEfficiencyDetail data={data as any} />;
      case "patient-data-validation":
        return <PatientValidationDetail data={data as any} />;
      case "patient-monitoring-dashboard":
        return <PatientMonitoringDetail data={data as any} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{project.title} | Ekene Okoli Portfolio</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/#projects")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground font-mono hidden md:block">
                {project.tools.join(" • ")}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportProjectData(project.id, project.title)}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${project.color} py-16`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-foreground/20 backdrop-blur-sm flex items-center justify-center">
                <project.icon className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {project.title}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <project.metric.icon className="w-5 h-5 text-foreground/80" />
                  <span className="text-xl font-semibold text-foreground/90">
                    {project.metric.value}
                  </span>
                  <span className="text-foreground/70">{project.metric.label}</span>
                </div>
              </div>
            </div>
            <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 rounded-full bg-foreground/20 backdrop-blur-sm text-sm font-medium text-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-foreground mb-4">Key Insights</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {project.insights.map((insight, index) => (
                <Card key={index} variant="glass" className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">{insight}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {renderProjectContent()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <Button 
            onClick={() => navigate("/#contact")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Interested in this project? Let's talk
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
