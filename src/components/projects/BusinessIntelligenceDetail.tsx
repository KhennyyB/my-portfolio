import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface BusinessIntelligenceDetailProps {
  data: {
    departmentKPIs: Array<{ dept: string; budget: number; actual: number; efficiency: number }>;
    financialMetrics: Array<{ quarter: string; revenue: number; expenses: number; profit: number }>;
    operationalMetrics: Array<{ metric: string; current: number; target: number; trend: string }>;
  };
}

const BusinessIntelligenceDetail = ({ data }: BusinessIntelligenceDetailProps) => {
  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-8">
      {/* Operational Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.operationalMetrics.map((metric, index) => (
          <Card key={index} variant="glow" className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{metric.metric}</span>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {typeof metric.current === 'number' && metric.current < 10 
                ? metric.current.toFixed(1) 
                : metric.current}
              {metric.metric.includes('%') || metric.metric.includes('Efficiency') || metric.metric.includes('Productivity') ? '%' : ''}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Target: {metric.target}{metric.metric.includes('Satisfaction') ? '' : '%'}
            </div>
          </Card>
        ))}
      </div>

      {/* Department KPIs */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Department Budget vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.departmentKPIs}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dept" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₦${v/1000}K`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Bar dataKey="budget" name="Budget" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Quarterly Financial Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.financialMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₦${v}M`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`₦${value}M`, '']}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
                <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444' }} />
                <Line type="monotone" dataKey="profit" name="Profit" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Efficiency Radar */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Department Efficiency Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.departmentKPIs}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="dept" stroke="hsl(var(--muted-foreground))" />
                <Radar name="Efficiency %" dataKey="efficiency" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessIntelligenceDetail;
