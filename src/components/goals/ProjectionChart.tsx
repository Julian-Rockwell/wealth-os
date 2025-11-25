import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import type { ProjectionSettings } from "@/contexts/FinancialDataContext";
import { calculateProjectionRows } from "@/utils/projectionCalculations";

interface ProjectionChartProps {
  settings: ProjectionSettings;
  rows: any[]; // Not used, kept for interface compatibility
}

export function ProjectionChart({ settings }: ProjectionChartProps) {
  const rows = calculateProjectionRows(settings);
  
  const chartData = rows.map(row => ({
    year: row.year,
    "Trading Account": row.tradingAccount,
    "Passive Income": row.passiveIncome,
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Account and Passive Income</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="year" 
              className="text-xs"
            />
            <YAxis 
              className="text-xs"
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <ReferenceLine 
              y={settings.costOfLiving} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="5 5"
              label={{ value: 'Cost of Living', position: 'right', fill: 'hsl(var(--muted-foreground))' }}
            />
            <Line 
              type="monotone" 
              dataKey="Trading Account" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="Passive Income" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
