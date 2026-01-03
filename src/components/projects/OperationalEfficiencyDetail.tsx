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

interface OperationalEfficiencyDetailProps {
  data: {
    processMetrics: Array<{ process: string; before: number; after: number; improvement: number }>;
    resourceUtilization: Array<{ resource: string; utilization: number; optimal: number }>;
    weeklyTrend: Array<{ week: string; efficiency: number; target: number }>;
    sqlQueries: string[];
  };
}

const OperationalEfficiencyDetail = ({ data }: OperationalEfficiencyDetailProps) => {
  return (
    <div className="space-y-8">
      {/* Process Improvements */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Process Time Improvements (Minutes)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.processMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="process" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [`${value} min`, name]}
                />
                <Legend />
                <Bar dataKey="before" name="Before" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="after" name="After" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {data.processMetrics.map((metric, index) => (
              <div key={index} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
                <div className="text-2xl font-bold text-emerald-500">{metric.improvement}%</div>
                <div className="text-xs text-muted-foreground">{metric.process}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Efficiency Trend */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Weekly Efficiency Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[70, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Legend />
                <Line type="monotone" dataKey="efficiency" name="Efficiency" stroke="#14b8a6" strokeWidth={3} dot={{ fill: '#14b8a6' }} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Resource Utilization */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Resource Utilization Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.resourceUtilization} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="resource" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Legend />
                <Bar dataKey="utilization" name="Current" fill="#14b8a6" radius={[0, 4, 4, 0]}>
                  {data.resourceUtilization.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.utilization >= entry.optimal ? '#10b981' : '#f59e0b'} 
                    />
                  ))}
                </Bar>
                <Bar dataKey="optimal" name="Optimal" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* SQL Queries */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>SQL Analysis Queries</CardTitle>
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

export default OperationalEfficiencyDetail;
