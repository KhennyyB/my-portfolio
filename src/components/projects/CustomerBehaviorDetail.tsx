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
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface CustomerBehaviorDetailProps {
  data: {
    customerSegments: Array<{ segment: string; count: number; avgSpend: number; churnRisk: number }>;
    purchasePatterns: Array<{ dayOfWeek: string; orders: number; avgValue: number }>;
    ltv: Array<{ cohort: string; ltv: number; retention: number }>;
    sqlQueries: string[];
  };
}

const CustomerBehaviorDetail = ({ data }: CustomerBehaviorDetailProps) => {
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-8">
      {/* Customer Segments */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.customerSegments}
                    dataKey="count"
                    nameKey="segment"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ segment, count }) => `${segment}: ${count}`}
                  >
                    {data.customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Segment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.customerSegments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: colors[index] }}
                    />
                    <span className="font-medium text-foreground">{segment.segment}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Avg Spend: ${segment.avgSpend}</div>
                    <div className={`text-xs ${segment.churnRisk > 30 ? 'text-destructive' : 'text-emerald-500'}`}>
                      Churn Risk: {segment.churnRisk}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Patterns */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Weekly Purchase Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.purchasePatterns}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dayOfWeek" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="avgValue" name="Avg Order Value" stroke="#f59e0b" strokeWidth={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Customer LTV */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Customer Lifetime Value by Cohort</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ltv}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="cohort" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v}`} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="ltv" name="LTV ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="retention" name="Retention (%)" stroke="#8b5cf6" strokeWidth={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* SQL Queries */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>SQL Queries Used</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.sqlQueries.map((query, index) => (
              <pre key={index} className="p-4 rounded-lg bg-secondary/50 text-sm font-mono text-foreground overflow-x-auto">
                {query}
              </pre>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerBehaviorDetail;
