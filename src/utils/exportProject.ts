import ExcelJS from "exceljs";
import { projectDetailData, projects } from "@/data/projectsData";

type ProjectId = keyof typeof projectDetailData;

const applyHeaderStyle = (row: ExcelJS.Row) => {
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF10B981" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  row.height = 25;
};

const applyDataStyle = (row: ExcelJS.Row) => {
  row.eachCell((cell) => {
    cell.border = {
      top: { style: "thin", color: { argb: "FFE0E0E0" } },
      left: { style: "thin", color: { argb: "FFE0E0E0" } },
      bottom: { style: "thin", color: { argb: "FFE0E0E0" } },
      right: { style: "thin", color: { argb: "FFE0E0E0" } },
    };
    cell.alignment = { vertical: "middle" };
  });
};

const addSheetTitle = (sheet: ExcelJS.Worksheet, title: string, colCount: number) => {
  const titleRow = sheet.addRow([title]);
  sheet.mergeCells(sheet.rowCount, 1, sheet.rowCount, colCount);
  titleRow.getCell(1).font = { bold: true, size: 14, color: { argb: "FF1F2937" } };
  titleRow.getCell(1).alignment = { horizontal: "center" };
  titleRow.height = 30;
  sheet.addRow([]);
};

const addDataTable = (
  sheet: ExcelJS.Worksheet,
  title: string,
  headers: string[],
  data: any[],
  formatters?: Record<string, (val: any) => any>
) => {
  addSheetTitle(sheet, title, headers.length);
  
  const headerRow = sheet.addRow(headers);
  applyHeaderStyle(headerRow);
  
  data.forEach((item) => {
    const rowData = headers.map((header) => {
      const key = header.toLowerCase().replace(/\s+/g, "");
      const value = Object.entries(item).find(
        ([k]) => k.toLowerCase().replace(/[_\s]/g, "") === key
      )?.[1];
      
      if (formatters && formatters[header]) {
        return formatters[header](value);
      }
      return value;
    });
    const row = sheet.addRow(rowData);
    applyDataStyle(row);
  });
  
  // Auto-fit columns
  sheet.columns.forEach((column) => {
    column.width = 18;
  });
  
  sheet.addRow([]);
  sheet.addRow([]);
};

const exportSalesPerformance = async (workbook: ExcelJS.Workbook) => {
  const data = projectDetailData["sales-performance-dashboard"];
  
  // KPIs Sheet
  const kpiSheet = workbook.addWorksheet("KPIs Dashboard");
  addSheetTitle(kpiSheet, "Sales Performance KPIs", 4);
  
  const kpiHeaders = ["Metric", "Value", "Change", "Status"];
  const kpiHeaderRow = kpiSheet.addRow(kpiHeaders);
  applyHeaderStyle(kpiHeaderRow);
  
  data.kpis.forEach((kpi) => {
    const status = kpi.change.startsWith("+") ? "↑ Positive" : "↓ Negative";
    const row = kpiSheet.addRow([kpi.label, kpi.value, kpi.change, status]);
    applyDataStyle(row);
    row.getCell(4).font = { 
      color: { argb: kpi.change.startsWith("+") ? "FF10B981" : "FFEF4444" } 
    };
  });
  kpiSheet.columns.forEach((col) => (col.width = 20));

  // Sales by Region Sheet
  const regionSheet = workbook.addWorksheet("Sales by Region");
  addSheetTitle(regionSheet, "Regional Sales Performance", 4);
  
  const regionHeaders = ["Region", "Revenue (₦)", "Target (₦)", "Growth (%)"];
  const regionHeaderRow = regionSheet.addRow(regionHeaders);
  applyHeaderStyle(regionHeaderRow);
  
  data.salesByRegion.forEach((item) => {
    const row = regionSheet.addRow([
      item.region,
      item.revenue,
      item.target,
      item.growth,
    ]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "₦#,##0";
    row.getCell(3).numFmt = "₦#,##0";
    row.getCell(4).numFmt = "0%";
  });
  regionSheet.columns.forEach((col) => (col.width = 18));

  // Monthly Trend Sheet
  const trendSheet = workbook.addWorksheet("Monthly Trend");
  addSheetTitle(trendSheet, "Revenue Trend vs Forecast", 3);
  
  const trendHeaders = ["Month", "Actual Revenue (₦)", "Forecast (₦)"];
  const trendHeaderRow = trendSheet.addRow(trendHeaders);
  applyHeaderStyle(trendHeaderRow);
  
  data.monthlyTrend.forEach((item) => {
    const row = trendSheet.addRow([item.month, item.revenue, item.forecast]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "₦#,##0";
    row.getCell(3).numFmt = "₦#,##0";
  });
  trendSheet.columns.forEach((col) => (col.width = 22));

  // Top Products Sheet
  const productsSheet = workbook.addWorksheet("Top Products");
  addSheetTitle(productsSheet, "Top Performing Products", 3);
  
  const productHeaders = ["Product", "Sales (₦)", "Units Sold"];
  const productHeaderRow = productsSheet.addRow(productHeaders);
  applyHeaderStyle(productHeaderRow);
  
  data.topProducts.forEach((item) => {
    const row = productsSheet.addRow([item.name, item.sales, item.units]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "₦#,##0";
  });
  productsSheet.columns.forEach((col) => (col.width = 18));
};

const exportCustomerBehavior = async (workbook: ExcelJS.Workbook) => {
  const data = projectDetailData["customer-behavior-analysis"];
  
  // Customer Segments
  const segmentSheet = workbook.addWorksheet("Customer Segments");
  addSheetTitle(segmentSheet, "Customer Segmentation Analysis", 4);
  
  const segmentHeaders = ["Segment", "Customer Count", "Avg Spend (₦)", "Churn Risk (%)"];
  const segmentHeaderRow = segmentSheet.addRow(segmentHeaders);
  applyHeaderStyle(segmentHeaderRow);
  
  data.customerSegments.forEach((item) => {
    const row = segmentSheet.addRow([item.segment, item.count, item.avgSpend, item.churnRisk]);
    applyDataStyle(row);
    row.getCell(3).numFmt = "₦#,##0";
  });
  segmentSheet.columns.forEach((col) => (col.width = 20));

  // Purchase Patterns
  const patternSheet = workbook.addWorksheet("Purchase Patterns");
  addSheetTitle(patternSheet, "Weekly Purchase Patterns", 3);
  
  const patternHeaders = ["Day of Week", "Orders", "Avg Order Value (₦)"];
  const patternHeaderRow = patternSheet.addRow(patternHeaders);
  applyHeaderStyle(patternHeaderRow);
  
  data.purchasePatterns.forEach((item) => {
    const row = patternSheet.addRow([item.dayOfWeek, item.orders, item.avgValue]);
    applyDataStyle(row);
    row.getCell(3).numFmt = "₦#,##0";
  });
  patternSheet.columns.forEach((col) => (col.width = 22));

  // LTV
  const ltvSheet = workbook.addWorksheet("Customer LTV");
  addSheetTitle(ltvSheet, "Customer Lifetime Value by Cohort", 3);
  
  const ltvHeaders = ["Cohort", "LTV (₦)", "Retention (%)"];
  const ltvHeaderRow = ltvSheet.addRow(ltvHeaders);
  applyHeaderStyle(ltvHeaderRow);
  
  data.ltv.forEach((item) => {
    const row = ltvSheet.addRow([item.cohort, item.ltv, item.retention]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "₦#,##0";
  });
  ltvSheet.columns.forEach((col) => (col.width = 18));

  // SQL Queries
  const sqlSheet = workbook.addWorksheet("SQL Queries");
  addSheetTitle(sqlSheet, "SQL Queries Used in Analysis", 1);
  
  data.sqlQueries.forEach((query, index) => {
    sqlSheet.addRow([`Query ${index + 1}:`]);
    const queryRow = sqlSheet.addRow([query]);
    queryRow.getCell(1).font = { name: "Courier New", size: 10 };
    queryRow.getCell(1).alignment = { wrapText: true };
    sqlSheet.addRow([]);
  });
  sqlSheet.getColumn(1).width = 80;
};

const exportBusinessIntelligence = async (workbook: ExcelJS.Workbook) => {
  const data = projectDetailData["business-intelligence-dashboard"];
  
  // Dashboard Overview
  const overviewSheet = workbook.addWorksheet("Dashboard Overview");
  addSheetTitle(overviewSheet, "Power BI Dashboard - Executive Summary", 4);
  
  overviewSheet.addRow(["This Excel file contains the data used in the Power BI dashboard."]);
  overviewSheet.addRow(["To recreate the dashboard, import this data into Power BI Desktop."]);
  overviewSheet.addRow([]);

  // Operational Metrics
  const metricsHeaders = ["Metric", "Current Value", "Target", "Trend"];
  const metricsHeaderRow = overviewSheet.addRow(metricsHeaders);
  applyHeaderStyle(metricsHeaderRow);
  
  data.operationalMetrics.forEach((item) => {
    const row = overviewSheet.addRow([item.metric, item.current, item.target, item.trend.toUpperCase()]);
    applyDataStyle(row);
  });
  overviewSheet.columns.forEach((col) => (col.width = 25));

  // Department KPIs
  const deptSheet = workbook.addWorksheet("Department KPIs");
  addSheetTitle(deptSheet, "Department Budget vs Actual Performance", 4);
  
  const deptHeaders = ["Department", "Budget (₦)", "Actual (₦)", "Efficiency (%)"];
  const deptHeaderRow = deptSheet.addRow(deptHeaders);
  applyHeaderStyle(deptHeaderRow);
  
  data.departmentKPIs.forEach((item) => {
    const row = deptSheet.addRow([item.dept, item.budget, item.actual, item.efficiency]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "₦#,##0";
    row.getCell(3).numFmt = "₦#,##0";
  });
  deptSheet.columns.forEach((col) => (col.width = 20));

  // Financial Metrics
  const finSheet = workbook.addWorksheet("Financial Metrics");
  addSheetTitle(finSheet, "Quarterly Financial Performance (Millions ₦)", 4);
  
  const finHeaders = ["Quarter", "Revenue (₦M)", "Expenses (₦M)", "Profit (₦M)"];
  const finHeaderRow = finSheet.addRow(finHeaders);
  applyHeaderStyle(finHeaderRow);
  
  data.financialMetrics.forEach((item) => {
    const row = finSheet.addRow([item.quarter, item.revenue, item.expenses, item.profit]);
    applyDataStyle(row);
  });
  finSheet.columns.forEach((col) => (col.width = 18));
};

const exportEcommerceAnalytics = async (workbook: ExcelJS.Workbook) => {
  const data = projectDetailData["ecommerce-analytics-report"];
  
  // Conversion Funnel
  const funnelSheet = workbook.addWorksheet("Conversion Funnel");
  addSheetTitle(funnelSheet, "E-commerce Conversion Funnel Analysis", 3);
  
  const funnelHeaders = ["Stage", "Count", "Conversion Rate (%)"];
  const funnelHeaderRow = funnelSheet.addRow(funnelHeaders);
  applyHeaderStyle(funnelHeaderRow);
  
  data.conversionFunnel.forEach((item) => {
    const row = funnelSheet.addRow([item.stage, item.count, item.rate]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "#,##0";
  });
  funnelSheet.columns.forEach((col) => (col.width = 22));

  // Customer Journey
  const journeySheet = workbook.addWorksheet("Traffic Sources");
  addSheetTitle(journeySheet, "Customer Journey - Traffic Sources", 2);
  
  const journeyHeaders = ["Touchpoint", "Percentage (%)"];
  const journeyHeaderRow = journeySheet.addRow(journeyHeaders);
  applyHeaderStyle(journeyHeaderRow);
  
  data.customerJourney.forEach((item) => {
    const row = journeySheet.addRow([item.touchpoint, item.percentage]);
    applyDataStyle(row);
  });
  journeySheet.columns.forEach((col) => (col.width = 20));

  // Revenue by Category
  const revenueSheet = workbook.addWorksheet("Revenue by Category");
  addSheetTitle(revenueSheet, "Revenue Performance by Product Category", 3);
  
  const revenueHeaders = ["Category", "Revenue (₦)", "Orders"];
  const revenueHeaderRow = revenueSheet.addRow(revenueHeaders);
  applyHeaderStyle(revenueHeaderRow);
  
  data.revenueByCategory.forEach((item) => {
    const row = revenueSheet.addRow([item.category, item.revenue, item.orders]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "₦#,##0";
  });
  revenueSheet.columns.forEach((col) => (col.width = 20));
};

const exportOperationalEfficiency = async (workbook: ExcelJS.Workbook) => {
  const data = projectDetailData["operational-efficiency-analysis"];
  
  // Process Metrics
  const processSheet = workbook.addWorksheet("Process Improvements");
  addSheetTitle(processSheet, "Process Time Improvements (Minutes)", 4);
  
  const processHeaders = ["Process", "Before (min)", "After (min)", "Improvement (%)"];
  const processHeaderRow = processSheet.addRow(processHeaders);
  applyHeaderStyle(processHeaderRow);
  
  data.processMetrics.forEach((item) => {
    const row = processSheet.addRow([item.process, item.before, item.after, item.improvement]);
    applyDataStyle(row);
  });
  processSheet.columns.forEach((col) => (col.width = 20));

  // Resource Utilization
  const resourceSheet = workbook.addWorksheet("Resource Utilization");
  addSheetTitle(resourceSheet, "Resource Utilization Analysis", 3);
  
  const resourceHeaders = ["Resource", "Current Utilization (%)", "Optimal (%)"];
  const resourceHeaderRow = resourceSheet.addRow(resourceHeaders);
  applyHeaderStyle(resourceHeaderRow);
  
  data.resourceUtilization.forEach((item) => {
    const row = resourceSheet.addRow([item.resource, item.utilization, item.optimal]);
    applyDataStyle(row);
  });
  resourceSheet.columns.forEach((col) => (col.width = 25));

  // Weekly Trend
  const trendSheet = workbook.addWorksheet("Efficiency Trend");
  addSheetTitle(trendSheet, "Weekly Efficiency Trend", 3);
  
  const trendHeaders = ["Week", "Efficiency (%)", "Target (%)"];
  const trendHeaderRow = trendSheet.addRow(trendHeaders);
  applyHeaderStyle(trendHeaderRow);
  
  data.weeklyTrend.forEach((item) => {
    const row = trendSheet.addRow([item.week, item.efficiency, item.target]);
    applyDataStyle(row);
  });
  trendSheet.columns.forEach((col) => (col.width = 18));

  // SQL Queries
  const sqlSheet = workbook.addWorksheet("SQL Queries");
  addSheetTitle(sqlSheet, "SQL Analysis Queries", 1);
  
  data.sqlQueries.forEach((query, index) => {
    sqlSheet.addRow([`Query ${index + 1}:`]);
    const queryRow = sqlSheet.addRow([query]);
    queryRow.getCell(1).font = { name: "Courier New", size: 10 };
    queryRow.getCell(1).alignment = { wrapText: true };
    sqlSheet.addRow([]);
  });
  sqlSheet.getColumn(1).width = 80;
};

const exportPatientValidation = async (workbook: ExcelJS.Workbook) => {
  const data = projectDetailData["patient-data-validation"];
  
  // Validation Results
  const validationSheet = workbook.addWorksheet("Validation Results");
  addSheetTitle(validationSheet, "Patient Data Validation Summary", 4);
  
  const validationHeaders = ["Category", "Total Records", "Valid Records", "Errors"];
  const validationHeaderRow = validationSheet.addRow(validationHeaders);
  applyHeaderStyle(validationHeaderRow);
  
  data.validationResults.forEach((item) => {
    const row = validationSheet.addRow([item.category, item.total, item.valid, item.errors]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "#,##0";
    row.getCell(3).numFmt = "#,##0";
  });
  validationSheet.columns.forEach((col) => (col.width = 20));

  // Error Types
  const errorSheet = workbook.addWorksheet("Error Analysis");
  addSheetTitle(errorSheet, "Error Types and Severity", 3);
  
  const errorHeaders = ["Error Type", "Count", "Severity"];
  const errorHeaderRow = errorSheet.addRow(errorHeaders);
  applyHeaderStyle(errorHeaderRow);
  
  data.errorTypes.forEach((item) => {
    const row = errorSheet.addRow([item.type, item.count, item.severity]);
    applyDataStyle(row);
    const severityCell = row.getCell(3);
    if (item.severity === "High") {
      severityCell.font = { color: { argb: "FFEF4444" }, bold: true };
    } else if (item.severity === "Medium") {
      severityCell.font = { color: { argb: "FFF59E0B" } };
    }
  });
  errorSheet.columns.forEach((col) => (col.width = 20));

  // Migration Timeline
  const timelineSheet = workbook.addWorksheet("Migration Timeline");
  addSheetTitle(timelineSheet, "Data Migration Phases", 3);
  
  const timelineHeaders = ["Phase", "Status", "Records Processed"];
  const timelineHeaderRow = timelineSheet.addRow(timelineHeaders);
  applyHeaderStyle(timelineHeaderRow);
  
  data.migrationTimeline.forEach((item) => {
    const row = timelineSheet.addRow([item.phase, item.status, item.records]);
    applyDataStyle(row);
    row.getCell(3).numFmt = "#,##0";
  });
  timelineSheet.columns.forEach((col) => (col.width = 22));

  // Field Accuracy
  const accuracySheet = workbook.addWorksheet("Field Accuracy");
  addSheetTitle(accuracySheet, "Data Field Accuracy Rates", 2);
  
  const accuracyHeaders = ["Field", "Accuracy (%)"];
  const accuracyHeaderRow = accuracySheet.addRow(accuracyHeaders);
  applyHeaderStyle(accuracyHeaderRow);
  
  data.accuracy.forEach((item) => {
    const row = accuracySheet.addRow([item.field, item.accuracy]);
    applyDataStyle(row);
  });
  accuracySheet.columns.forEach((col) => (col.width = 22));
};

const exportPatientMonitoring = async (workbook: ExcelJS.Workbook) => {
  const data = projectDetailData["patient-monitoring-dashboard"];
  
  // Dashboard Overview
  const overviewSheet = workbook.addWorksheet("Dashboard Overview");
  addSheetTitle(overviewSheet, "Patient Data Monitoring Dashboard", 4);
  
  // Quality Metrics
  const metricsHeaders = ["Metric", "Current Value", "Target", "Status"];
  const metricsHeaderRow = overviewSheet.addRow(metricsHeaders);
  applyHeaderStyle(metricsHeaderRow);
  
  data.qualityMetrics.forEach((item) => {
    const status = item.value >= item.target ? "✓ Met" : "✗ Below Target";
    const row = overviewSheet.addRow([item.metric, item.value, item.target, status]);
    applyDataStyle(row);
  });
  overviewSheet.columns.forEach((col) => (col.width = 22));

  // Validation Progress
  const progressSheet = workbook.addWorksheet("Validation Progress");
  addSheetTitle(progressSheet, "Daily Validation Progress", 3);
  
  const progressHeaders = ["Day", "Records Validated", "Pending"];
  const progressHeaderRow = progressSheet.addRow(progressHeaders);
  applyHeaderStyle(progressHeaderRow);
  
  data.validationProgress.forEach((item) => {
    const row = progressSheet.addRow([item.day, item.validated, item.pending]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "#,##0";
    row.getCell(3).numFmt = "#,##0";
  });
  progressSheet.columns.forEach((col) => (col.width = 20));

  // Team Performance
  const teamSheet = workbook.addWorksheet("Team Performance");
  addSheetTitle(teamSheet, "Team Validation Performance", 3);
  
  const teamHeaders = ["Team", "Records Validated", "Accuracy (%)"];
  const teamHeaderRow = teamSheet.addRow(teamHeaders);
  applyHeaderStyle(teamHeaderRow);
  
  data.teamPerformance.forEach((item) => {
    const row = teamSheet.addRow([item.team, item.recordsValidated, item.accuracy]);
    applyDataStyle(row);
    row.getCell(2).numFmt = "#,##0";
  });
  teamSheet.columns.forEach((col) => (col.width = 20));

  // Reporting Hours Saved
  const hoursSheet = workbook.addWorksheet("Time Savings");
  addSheetTitle(hoursSheet, "Manual Reporting Hours - Before vs After Automation", 4);
  
  const hoursHeaders = ["Task", "Before (hours)", "After (hours)", "Hours Saved"];
  const hoursHeaderRow = hoursSheet.addRow(hoursHeaders);
  applyHeaderStyle(hoursHeaderRow);
  
  data.reportingHours.forEach((item) => {
    const saved = item.before - item.after;
    const row = hoursSheet.addRow([item.task, item.before, item.after, saved]);
    applyDataStyle(row);
    row.getCell(4).font = { color: { argb: "FF10B981" }, bold: true };
  });
  hoursSheet.columns.forEach((col) => (col.width = 22));
};

export const exportProjectData = async (projectId: string, projectTitle: string) => {
  const workbook = new ExcelJS.Workbook();
  
  workbook.creator = "Ekene Okoli - Data Analyst Portfolio";
  workbook.created = new Date();
  workbook.modified = new Date();
  
  const project = projects.find((p) => p.id === projectId);
  const isPowerBI = project?.tools.includes("Power BI");
  
  switch (projectId) {
    case "sales-performance-dashboard":
      await exportSalesPerformance(workbook);
      break;
    case "customer-behavior-analysis":
      await exportCustomerBehavior(workbook);
      break;
    case "business-intelligence-dashboard":
      await exportBusinessIntelligence(workbook);
      break;
    case "ecommerce-analytics-report":
      await exportEcommerceAnalytics(workbook);
      break;
    case "operational-efficiency-analysis":
      await exportOperationalEfficiency(workbook);
      break;
    case "patient-data-validation":
      await exportPatientValidation(workbook);
      break;
    case "patient-monitoring-dashboard":
      await exportPatientMonitoring(workbook);
      break;
  }

  // Generate and download file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { 
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const filename = isPowerBI 
    ? `${projectTitle.toLowerCase().replace(/\s+/g, "-")}-powerbi-data.xlsx`
    : `${projectTitle.toLowerCase().replace(/\s+/g, "-")}.xlsx`;
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
