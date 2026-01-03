import { 
  FileSpreadsheet, 
  Database, 
  BarChart3, 
  LineChart,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  ClipboardCheck,
  HeartPulse
} from "lucide-react";

export const projects = [
  {
    id: "sales-performance-dashboard",
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
    id: "customer-behavior-analysis",
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
    id: "business-intelligence-dashboard",
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
    id: "ecommerce-analytics-report",
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
  {
    id: "operational-efficiency-analysis",
    title: "Operational Efficiency Analysis",
    description: "Analyzed operational data using SQL, identifying key performance metrics that guided executive planning and led to a 15% increase in efficiency. Delivered actionable insights for resource optimization.",
    tools: ["SQL", "Performance Metrics", "Data Analysis", "Reporting"],
    icon: Activity,
    color: "from-teal-500 to-emerald-600",
    insights: [
      "15% efficiency increase achieved",
      "Identified bottleneck processes",
      "Optimized resource allocation"
    ],
    metric: { icon: TrendingUp, value: "15%", label: "Efficiency Increase" },
  },
  {
    id: "patient-data-validation",
    title: "Patient Data Validation Project",
    description: "Successfully led the team in a data validation for patient medical records after migration of patient information, thus leading to accurate data integrity. Ensured 99.8% data accuracy post-migration.",
    tools: ["Data Validation", "SQL", "Quality Assurance", "Healthcare Data"],
    icon: ClipboardCheck,
    color: "from-rose-500 to-red-600",
    insights: [
      "99.8% data accuracy achieved",
      "Validated 50,000+ patient records",
      "Zero critical data loss incidents"
    ],
    metric: { icon: HeartPulse, value: "99.8%", label: "Data Accuracy" },
  },
  {
    id: "patient-monitoring-dashboard",
    title: "Patient Data Monitoring Dashboard",
    description: "Built interactive dashboards in Excel that enabled real-time monitoring of patient data validation and reduced manual reporting hours by 20%. Streamlined quality assurance workflows.",
    tools: ["Excel", "Dashboards", "Real-time Monitoring", "Automation"],
    icon: HeartPulse,
    color: "from-indigo-500 to-violet-600",
    insights: [
      "20% reduction in manual hours",
      "Real-time validation tracking",
      "Automated quality reports"
    ],
    metric: { icon: Activity, value: "20%", label: "Time Saved" },
  },
];

// Sample data for each project
export const projectDetailData = {
  "sales-performance-dashboard": {
    salesByRegion: [
      { region: "North", revenue: 245000, target: 220000, growth: 12 },
      { region: "South", revenue: 189000, target: 200000, growth: -5 },
      { region: "East", revenue: 312000, target: 280000, growth: 18 },
      { region: "West", revenue: 198000, target: 190000, growth: 8 },
    ],
    monthlyTrend: [
      { month: "Jan", revenue: 85000, forecast: 82000 },
      { month: "Feb", revenue: 92000, forecast: 88000 },
      { month: "Mar", revenue: 78000, forecast: 85000 },
      { month: "Apr", revenue: 105000, forecast: 95000 },
      { month: "May", revenue: 112000, forecast: 105000 },
      { month: "Jun", revenue: 128000, forecast: 115000 },
    ],
    topProducts: [
      { name: "Product A", sales: 45000, units: 1200 },
      { name: "Product B", sales: 38000, units: 950 },
      { name: "Product C", sales: 32000, units: 800 },
      { name: "Product D", sales: 28000, units: 720 },
      { name: "Product E", sales: 22000, units: 550 },
    ],
    kpis: [
      { label: "Total Revenue", value: "$944K", change: "+12.5%" },
      { label: "Avg Order Value", value: "$285", change: "+8.2%" },
      { label: "Customer Retention", value: "78%", change: "+5.1%" },
      { label: "New Customers", value: "1,245", change: "+22.3%" },
    ],
  },
  "customer-behavior-analysis": {
    customerSegments: [
      { segment: "High Value", count: 1250, avgSpend: 2500, churnRisk: 5 },
      { segment: "Regular", count: 4500, avgSpend: 850, churnRisk: 15 },
      { segment: "Occasional", count: 3200, avgSpend: 320, churnRisk: 35 },
      { segment: "At-Risk", count: 1050, avgSpend: 180, churnRisk: 65 },
    ],
    purchasePatterns: [
      { dayOfWeek: "Mon", orders: 1200, avgValue: 145 },
      { dayOfWeek: "Tue", orders: 1350, avgValue: 138 },
      { dayOfWeek: "Wed", orders: 1180, avgValue: 152 },
      { dayOfWeek: "Thu", orders: 1420, avgValue: 165 },
      { dayOfWeek: "Fri", orders: 1680, avgValue: 178 },
      { dayOfWeek: "Sat", orders: 2100, avgValue: 195 },
      { dayOfWeek: "Sun", orders: 1850, avgValue: 172 },
    ],
    ltv: [
      { cohort: "Q1 2023", ltv: 1250, retention: 82 },
      { cohort: "Q2 2023", ltv: 1180, retention: 78 },
      { cohort: "Q3 2023", ltv: 1320, retention: 85 },
      { cohort: "Q4 2023", ltv: 1450, retention: 88 },
    ],
    sqlQueries: [
      "WITH customer_segments AS (\n  SELECT customer_id,\n    SUM(order_total) as total_spent,\n    COUNT(*) as order_count\n  FROM orders\n  GROUP BY customer_id\n)",
      "SELECT segment,\n  AVG(total_spent) as avg_spend,\n  COUNT(*) as customer_count\nFROM customer_segments\nGROUP BY segment",
    ],
  },
  "business-intelligence-dashboard": {
    departmentKPIs: [
      { dept: "Sales", budget: 500000, actual: 485000, efficiency: 97 },
      { dept: "Marketing", budget: 350000, actual: 320000, efficiency: 109 },
      { dept: "Operations", budget: 420000, actual: 395000, efficiency: 106 },
      { dept: "HR", budget: 180000, actual: 175000, efficiency: 103 },
      { dept: "IT", budget: 280000, actual: 265000, efficiency: 106 },
    ],
    financialMetrics: [
      { quarter: "Q1", revenue: 2.4, expenses: 1.8, profit: 0.6 },
      { quarter: "Q2", revenue: 2.8, expenses: 2.0, profit: 0.8 },
      { quarter: "Q3", revenue: 3.1, expenses: 2.2, profit: 0.9 },
      { quarter: "Q4", revenue: 3.5, expenses: 2.4, profit: 1.1 },
    ],
    operationalMetrics: [
      { metric: "On-time Delivery", current: 94, target: 95, trend: "up" },
      { metric: "Customer Satisfaction", current: 4.2, target: 4.5, trend: "up" },
      { metric: "Employee Productivity", current: 87, target: 85, trend: "up" },
      { metric: "Process Efficiency", current: 82, target: 80, trend: "stable" },
    ],
  },
  "ecommerce-analytics-report": {
    conversionFunnel: [
      { stage: "Visitors", count: 50000, rate: 100 },
      { stage: "Product Views", count: 35000, rate: 70 },
      { stage: "Add to Cart", count: 12000, rate: 24 },
      { stage: "Checkout", count: 8000, rate: 16 },
      { stage: "Purchase", count: 5000, rate: 10 },
    ],
    customerJourney: [
      { touchpoint: "Social Media", percentage: 35 },
      { touchpoint: "Search Engine", percentage: 28 },
      { touchpoint: "Email", percentage: 18 },
      { touchpoint: "Direct", percentage: 12 },
      { touchpoint: "Referral", percentage: 7 },
    ],
    revenueByCategory: [
      { category: "Electronics", revenue: 125000, orders: 2500 },
      { category: "Clothing", revenue: 98000, orders: 4200 },
      { category: "Home & Garden", revenue: 75000, orders: 1800 },
      { category: "Sports", revenue: 52000, orders: 1300 },
      { category: "Books", revenue: 28000, orders: 3500 },
    ],
  },
  "operational-efficiency-analysis": {
    processMetrics: [
      { process: "Order Processing", before: 45, after: 32, improvement: 29 },
      { process: "Inventory Mgmt", before: 38, after: 28, improvement: 26 },
      { process: "Quality Check", before: 25, after: 20, improvement: 20 },
      { process: "Shipping Prep", before: 52, after: 42, improvement: 19 },
    ],
    resourceUtilization: [
      { resource: "Warehouse Staff", utilization: 85, optimal: 90 },
      { resource: "Machinery", utilization: 78, optimal: 85 },
      { resource: "Transport Fleet", utilization: 72, optimal: 80 },
      { resource: "IT Systems", utilization: 65, optimal: 75 },
    ],
    weeklyTrend: [
      { week: "W1", efficiency: 78, target: 85 },
      { week: "W2", efficiency: 82, target: 85 },
      { week: "W3", efficiency: 85, target: 85 },
      { week: "W4", efficiency: 88, target: 85 },
      { week: "W5", efficiency: 91, target: 85 },
      { week: "W6", efficiency: 93, target: 85 },
    ],
    sqlQueries: [
      "SELECT process_name,\n  AVG(completion_time) as avg_time,\n  COUNT(*) as total_tasks\nFROM operations_log\nWHERE date >= '2024-01-01'\nGROUP BY process_name",
    ],
  },
  "patient-data-validation": {
    validationResults: [
      { category: "Demographics", total: 50000, valid: 49850, errors: 150 },
      { category: "Medical History", total: 48000, valid: 47750, errors: 250 },
      { category: "Prescriptions", total: 125000, valid: 124500, errors: 500 },
      { category: "Lab Results", total: 180000, valid: 179200, errors: 800 },
    ],
    errorTypes: [
      { type: "Missing Fields", count: 450, severity: "Medium" },
      { type: "Format Errors", count: 320, severity: "Low" },
      { type: "Duplicate Records", count: 180, severity: "High" },
      { type: "Invalid References", count: 150, severity: "High" },
      { type: "Date Discrepancies", count: 100, severity: "Medium" },
    ],
    migrationTimeline: [
      { phase: "Extraction", status: "Complete", records: 403000 },
      { phase: "Transformation", status: "Complete", records: 403000 },
      { phase: "Validation", status: "Complete", records: 401300 },
      { phase: "Loading", status: "Complete", records: 401300 },
      { phase: "Verification", status: "Complete", records: 401300 },
    ],
    accuracy: [
      { field: "Patient ID", accuracy: 100 },
      { field: "Name", accuracy: 99.9 },
      { field: "DOB", accuracy: 99.7 },
      { field: "Medical Record #", accuracy: 99.8 },
      { field: "Insurance Info", accuracy: 99.5 },
    ],
  },
  "patient-monitoring-dashboard": {
    validationProgress: [
      { day: "Mon", validated: 2500, pending: 1200 },
      { day: "Tue", validated: 3200, pending: 800 },
      { day: "Wed", validated: 2800, pending: 950 },
      { day: "Thu", validated: 3500, pending: 600 },
      { day: "Fri", validated: 4200, pending: 400 },
    ],
    qualityMetrics: [
      { metric: "Accuracy Rate", value: 99.8, target: 99.5 },
      { metric: "Completeness", value: 98.5, target: 98.0 },
      { metric: "Timeliness", value: 96.2, target: 95.0 },
      { metric: "Consistency", value: 99.1, target: 98.5 },
    ],
    teamPerformance: [
      { team: "Team A", recordsValidated: 12500, accuracy: 99.9 },
      { team: "Team B", recordsValidated: 11800, accuracy: 99.7 },
      { team: "Team C", recordsValidated: 13200, accuracy: 99.8 },
      { team: "Team D", recordsValidated: 12500, accuracy: 99.6 },
    ],
    reportingHours: [
      { task: "Manual Reports", before: 12, after: 4 },
      { task: "Data Entry", before: 8, after: 2 },
      { task: "Error Checking", before: 6, after: 2 },
      { task: "Stakeholder Updates", before: 4, after: 2 },
    ],
  },
};
