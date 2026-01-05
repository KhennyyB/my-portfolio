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
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

interface PatientValidationDetailProps {
  data: {
    validationResults: Array<{ category: string; total: number; valid: number; errors: number }>;
    errorTypes: Array<{ type: string; count: number; severity: string }>;
    migrationTimeline: Array<{ phase: string; status: string; records: number }>;
    accuracy: Array<{ field: string; accuracy: number }>;
  };
}

const PatientValidationDetail = ({ data }: PatientValidationDetailProps) => {
  const getSeverityColor = (severity: string) => {
    if (severity === "High") return "#ef4444";
    if (severity === "Medium") return "#f59e0b";
    return "#10b981";
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === "High") return <AlertCircle className="w-4 h-4 text-destructive" />;
    if (severity === "Medium") return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <CheckCircle className="w-4 h-4 text-emerald-500" />;
  };

  return (
    <div className="space-y-8">
      {/* Migration Timeline */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Migration Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between gap-4">
            {data.migrationTimeline.map((phase, index) => (
              <div key={index} className="flex-1 min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="font-medium text-foreground">{phase.phase}</span>
                </div>
                <div className="text-sm text-muted-foreground">{phase.records.toLocaleString()} records</div>
                <div className="text-xs text-emerald-500">{phase.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Validation Results by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.validationResults}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v/1000}K`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [value.toLocaleString(), '']}
                />
                <Legend />
                <Bar dataKey="valid" name="Valid Records" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="errors" name="Errors" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Error Types and Accuracy */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Error Types & Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.errorTypes.map((error, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(error.severity)}
                    <span className="font-medium text-foreground">{error.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground font-semibold">{error.count}</span>
                    <span 
                      className="px-2 py-1 rounded text-xs"
                      style={{ 
                        backgroundColor: `${getSeverityColor(error.severity)}20`,
                        color: getSeverityColor(error.severity)
                      }}
                    >
                      {error.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Field Accuracy Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.accuracy.map((field, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground">{field.field}</span>
                    <span className="text-sm font-semibold text-emerald-500">{field.accuracy}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${field.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Validation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
              <div className="text-3xl font-bold text-emerald-500">99.8%</div>
              <div className="text-sm text-muted-foreground">Overall Accuracy</div>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center">
              <div className="text-3xl font-bold text-blue-500">403K</div>
              <div className="text-sm text-muted-foreground">Total Records</div>
            </div>
            <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-center">
              <div className="text-3xl font-bold text-rose-500">1,200</div>
              <div className="text-sm text-muted-foreground">Errors Fixed</div>
            </div>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-center">
              <div className="text-3xl font-bold text-amber-500">0</div>
              <div className="text-sm text-muted-foreground">Critical Failures</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientValidationDetail;
