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
  FunnelChart,
  Funnel,
  LabelList,
  Cell,
  PieChart,
  Pie,
} from "recharts";

interface EcommerceAnalyticsDetailProps {
  data: {
    conversionFunnel: Array<{ stage: string; count: number; rate: number }>;
    customerJourney: Array<{ touchpoint: string; percentage: number }>;
    revenueByCategory: Array<{ category: string; revenue: number; orders: number }>;
  };
}

const EcommerceAnalyticsDetail = ({ data }: EcommerceAnalyticsDetailProps) => {
  const funnelColors = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"];
  const pieColors = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className="space-y-8">
      {/* Conversion Funnel */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Conversion Funnel Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value.toLocaleString()} (${props.payload.rate}%)`,
                      props.payload.stage
                    ]}
                  />
                  <Funnel dataKey="count" data={data.conversionFunnel}>
                    {data.conversionFunnel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={funnelColors[index]} />
                    ))}
                    <LabelList position="center" fill="#fff" dataKey="stage" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {data.conversionFunnel.map((stage, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: funnelColors[index] }}
                    />
                    <span className="font-medium text-foreground">{stage.stage}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">{stage.count.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{stage.rate}% of visitors</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Journey */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.customerJourney}
                    dataKey="percentage"
                    nameKey="touchpoint"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ touchpoint, percentage }) => `${touchpoint}: ${percentage}%`}
                  >
                    {data.customerJourney.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.revenueByCategory} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₦${v/1000}K`} />
                  <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                    {data.revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Story Insights */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Data Story: Key Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <h4 className="font-semibold text-foreground mb-2">Conversion Insight</h4>
              <p className="text-sm text-muted-foreground">
                70% of visitors view products, but only 24% add to cart. 
                Opportunity: Improve product page CTAs and urgency messaging.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
              <h4 className="font-semibold text-foreground mb-2">Traffic Insight</h4>
              <p className="text-sm text-muted-foreground">
                Social media drives 35% of traffic. 
                Recommendation: Increase social content investment and influencer partnerships.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
              <h4 className="font-semibold text-foreground mb-2">Revenue Insight</h4>
              <p className="text-sm text-muted-foreground">
                Electronics leads revenue despite fewer orders than Clothing. 
                Focus: High-value electronics promotions for maximum ROI.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcommerceAnalyticsDetail;
