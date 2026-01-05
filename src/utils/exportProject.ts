import { projectDetailData } from "@/data/projectsData";

type ProjectId = keyof typeof projectDetailData;

const convertToCSV = (data: any[], headers?: string[]): string => {
  if (!data.length) return "";
  
  const keys = headers || Object.keys(data[0]);
  const headerRow = keys.join(",");
  
  const rows = data.map((item) =>
    keys.map((key) => {
      const value = item[key];
      // Escape quotes and wrap in quotes if contains comma
      if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(",")
  );
  
  return [headerRow, ...rows].join("\n");
};

const formatProjectData = (projectId: ProjectId): string => {
  const data = projectDetailData[projectId];
  let csvContent = "";
  
  switch (projectId) {
    case "sales-performance-dashboard": {
      const d = data as typeof projectDetailData["sales-performance-dashboard"];
      csvContent += "=== KPIs ===\n";
      csvContent += convertToCSV(d.kpis) + "\n\n";
      csvContent += "=== Sales By Region ===\n";
      csvContent += convertToCSV(d.salesByRegion) + "\n\n";
      csvContent += "=== Monthly Trend ===\n";
      csvContent += convertToCSV(d.monthlyTrend) + "\n\n";
      csvContent += "=== Top Products ===\n";
      csvContent += convertToCSV(d.topProducts);
      break;
    }
    case "customer-behavior-analysis": {
      const d = data as typeof projectDetailData["customer-behavior-analysis"];
      csvContent += "=== Customer Segments ===\n";
      csvContent += convertToCSV(d.customerSegments) + "\n\n";
      csvContent += "=== Purchase Patterns ===\n";
      csvContent += convertToCSV(d.purchasePatterns) + "\n\n";
      csvContent += "=== Lifetime Value by Cohort ===\n";
      csvContent += convertToCSV(d.ltv) + "\n\n";
      csvContent += "=== SQL Queries Used ===\n";
      csvContent += d.sqlQueries.join("\n\n");
      break;
    }
    case "business-intelligence-dashboard": {
      const d = data as typeof projectDetailData["business-intelligence-dashboard"];
      csvContent += "=== Department KPIs ===\n";
      csvContent += convertToCSV(d.departmentKPIs) + "\n\n";
      csvContent += "=== Financial Metrics ===\n";
      csvContent += convertToCSV(d.financialMetrics) + "\n\n";
      csvContent += "=== Operational Metrics ===\n";
      csvContent += convertToCSV(d.operationalMetrics);
      break;
    }
    case "ecommerce-analytics-report": {
      const d = data as typeof projectDetailData["ecommerce-analytics-report"];
      csvContent += "=== Conversion Funnel ===\n";
      csvContent += convertToCSV(d.conversionFunnel) + "\n\n";
      csvContent += "=== Customer Journey ===\n";
      csvContent += convertToCSV(d.customerJourney) + "\n\n";
      csvContent += "=== Revenue By Category ===\n";
      csvContent += convertToCSV(d.revenueByCategory);
      break;
    }
    case "operational-efficiency-analysis": {
      const d = data as typeof projectDetailData["operational-efficiency-analysis"];
      csvContent += "=== Process Metrics ===\n";
      csvContent += convertToCSV(d.processMetrics) + "\n\n";
      csvContent += "=== Resource Utilization ===\n";
      csvContent += convertToCSV(d.resourceUtilization) + "\n\n";
      csvContent += "=== Weekly Trend ===\n";
      csvContent += convertToCSV(d.weeklyTrend) + "\n\n";
      csvContent += "=== SQL Queries Used ===\n";
      csvContent += d.sqlQueries.join("\n\n");
      break;
    }
    case "patient-data-validation": {
      const d = data as typeof projectDetailData["patient-data-validation"];
      csvContent += "=== Validation Results ===\n";
      csvContent += convertToCSV(d.validationResults) + "\n\n";
      csvContent += "=== Error Types ===\n";
      csvContent += convertToCSV(d.errorTypes) + "\n\n";
      csvContent += "=== Migration Timeline ===\n";
      csvContent += convertToCSV(d.migrationTimeline) + "\n\n";
      csvContent += "=== Field Accuracy ===\n";
      csvContent += convertToCSV(d.accuracy);
      break;
    }
    case "patient-monitoring-dashboard": {
      const d = data as typeof projectDetailData["patient-monitoring-dashboard"];
      csvContent += "=== Validation Progress ===\n";
      csvContent += convertToCSV(d.validationProgress) + "\n\n";
      csvContent += "=== Quality Metrics ===\n";
      csvContent += convertToCSV(d.qualityMetrics) + "\n\n";
      csvContent += "=== Team Performance ===\n";
      csvContent += convertToCSV(d.teamPerformance) + "\n\n";
      csvContent += "=== Reporting Hours ===\n";
      csvContent += convertToCSV(d.reportingHours);
      break;
    }
  }
  
  return csvContent;
};

export const exportProjectData = (projectId: string, projectTitle: string) => {
  const csvContent = formatProjectData(projectId as ProjectId);
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const filename = `${projectTitle.toLowerCase().replace(/\s+/g, "-")}-data.csv`;
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
