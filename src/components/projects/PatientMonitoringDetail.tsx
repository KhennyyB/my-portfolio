import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

interface PatientMonitoringDetailProps {
  data: {
    validationProgress: Array<{ day: string; validated: number; pending: number }>;
    qualityMetrics: Array<{ metric: string; value: number; target: number }>;
    teamPerformance: Array<{ team: string; recordsValidated: number; accuracy: number }>;
    reportingHours: Array<{ task: string; before: number; after: number }>;
  };
}

const PatientMonitoringDetail = ({ data }: PatientMonitoringDetailProps) => {
  return (
    <div className="space-y-8">
      {/* Quality Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.qualityMetrics.map((metric, index) => (
          <Card key={index} variant="glow" className="p-4">
            <div className="text-sm text-muted-foreground">{metric.metric}</div>
            <div className="text-2xl font-bold text-foreground mt-1">{metric.value}%</div>
            <div className="text-xs mt-1">
              <span className={metric.value >= metric.target ? 'text-emerald-500' : 'text-amber-500'}>
                Target: {metric.target}%
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${metric.value >= metric.target ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Validation Progress */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Daily Validation Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.validationProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [value.toLocaleString(), '']}
                />
                <Legend />
                <Area type="monotone" dataKey="validated" name="Validated" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="pending" name="Pending" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.teamPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="team" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" domain={[99, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="recordsValidated" name="Records Validated" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {data.teamPerformance.map((team, index) => (
              <div key={index} className="p-3 rounded-lg bg-secondary/50 text-center">
                <div className="font-semibold text-foreground">{team.team}</div>
                <div className="text-sm text-emerald-500 mt-1">{team.accuracy}% accuracy</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reporting Hours Saved */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Manual Hours Reduction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.reportingHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="task" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))' } }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value} hours`, '']}
                />
                <Legend />
                <Bar dataKey="before" name="Before (Hours/Week)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="after" name="After (Hours/Week)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
            <div className="flex items-center justify-between">
              <span className="text-foreground font-medium">Total Hours Saved Per Week:</span>
              <span className="text-2xl font-bold text-indigo-400">
                {data.reportingHours.reduce((acc, curr) => acc + (curr.before - curr.after), 0)} hours
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Automated dashboards reduced manual reporting from {data.reportingHours.reduce((acc, curr) => acc + curr.before, 0)} to {data.reportingHours.reduce((acc, curr) => acc + curr.after, 0)} hours weekly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientMonitoringDetail;
