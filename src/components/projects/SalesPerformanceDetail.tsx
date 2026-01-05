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
  Cell,
} from "recharts";

interface SalesPerformanceDetailProps {
  data: {
    salesByRegion: Array<{ region: string; revenue: number; target: number; growth: number }>;
    monthlyTrend: Array<{ month: string; revenue: number; forecast: number }>;
    topProducts: Array<{ name: string; sales: number; units: number }>;
    kpis: Array<{ label: string; value: string; change: string }>;
  };
}

const SalesPerformanceDetail = ({ data }: SalesPerformanceDetailProps) => {
  const colors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.kpis.map((kpi, index) => (
          <Card key={index} variant="glow" className="p-4">
            <div className="text-sm text-muted-foreground">{kpi.label}</div>
            <div className="text-2xl font-bold text-foreground mt-1">{kpi.value}</div>
            <div className={`text-sm mt-1 ${kpi.change.startsWith('+') ? 'text-emerald-500' : 'text-destructive'}`}>
              {kpi.change}
            </div>
          </Card>
        ))}
      </div>

      {/* Sales by Region */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Sales Performance by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.salesByRegion} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₦${v/1000}K`} />
                <YAxis dataKey="region" type="category" stroke="hsl(var(--muted-foreground))" width={60} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[0, 4, 4, 0]} />
                <Bar dataKey="target" name="Target" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Revenue Trend vs Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
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
                <Line type="monotone" dataKey="revenue" name="Actual Revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
                <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₦${v/1000}K`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'sales' ? `₦${value.toLocaleString()}` : value.toLocaleString(),
                    name === 'sales' ? 'Sales' : 'Units'
                  ]}
                />
                <Legend />
                <Bar dataKey="sales" name="Sales (₦)" fill="#10b981" radius={[4, 4, 0, 0]}>
                  {data.topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPerformanceDetail;
