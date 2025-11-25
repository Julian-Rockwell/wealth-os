import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  LineChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine,
  ComposedChart
} from "recharts";
import type { ProjectionSettings } from "@/contexts/FinancialDataContext";
import { calculateChartData, calculateProjectionMilestones } from "@/utils/projectionCalculations";

interface IncomeLifestyleChartProps {
  settings: ProjectionSettings;
}

export function IncomeLifestyleChart({ settings }: IncomeLifestyleChartProps) {
  const chartData = calculateChartData(settings);
  const milestones = calculateProjectionMilestones(settings);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value.toFixed(0)}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">Year {label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between gap-4 text-sm">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-medium">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Income & Lifestyle Projection</CardTitle>
            <CardDescription>Realized income (start of year) vs. Cost of Living</CardDescription>
          </div>
          <ToggleGroup type="single" value="annual" className="h-8">
            <ToggleGroupItem value="annual" className="h-8 text-xs">
              Annual Income
            </ToggleGroupItem>
            <ToggleGroupItem value="networth" disabled className="h-8 text-xs">
              Net Worth
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="passiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="year" 
              className="text-xs"
            />
            <YAxis 
              className="text-xs"
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />

            {/* Milestone Reference Lines */}
            {milestones.wealthOSFreedomYear && (
              <ReferenceLine 
                x={milestones.wealthOSFreedomYear} 
                stroke="hsl(var(--success))" 
                strokeDasharray="5 5"
                label={{ 
                  value: 'Wealth OS Freedom', 
                  position: 'top', 
                  fill: 'hsl(var(--success))',
                  fontSize: 11
                }}
              />
            )}
            {milestones.stopTradingYear && (
              <ReferenceLine 
                x={milestones.stopTradingYear} 
                stroke="hsl(var(--primary))" 
                strokeDasharray="5 5"
                label={{ 
                  value: 'Stop Trading', 
                  position: 'top', 
                  fill: 'hsl(var(--primary))',
                  fontSize: 11,
                  offset: milestones.wealthOSFreedomYear && 
                    Math.abs(milestones.stopTradingYear - milestones.wealthOSFreedomYear) < 2 ? 15 : 0
                }}
              />
            )}
            {milestones.traditionalFreedomYear && (
              <ReferenceLine 
                x={milestones.traditionalFreedomYear} 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="5 5"
                label={{ 
                  value: 'Trad. Freedom', 
                  position: 'top', 
                  fill: 'hsl(var(--muted-foreground))',
                  fontSize: 11,
                  offset: ((milestones.wealthOSFreedomYear && 
                    Math.abs(milestones.traditionalFreedomYear - milestones.wealthOSFreedomYear) < 2) ||
                    (milestones.stopTradingYear && 
                    Math.abs(milestones.traditionalFreedomYear - milestones.stopTradingYear) < 2)) ? 15 : 0
                }}
              />
            )}

            {/* Series */}
            <Area 
              type="monotone" 
              dataKey="passiveIncome" 
              name="Passive Income"
              stroke="hsl(var(--success))" 
              fill="url(#passiveGradient)"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="activeProfitNet" 
              name="Active Profit (Net)"
              stroke="hsl(var(--primary))" 
              fill="url(#activeGradient)"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="otherIncome" 
              name="Other Income (SS/Pension)"
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="traditionalSafeIncome" 
              name="Trad. Safe Income (4%)"
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={1.5}
              strokeDasharray="8 4"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="adjustedExpenses" 
              name="Adjusted Expenses"
              stroke="hsl(var(--warning))" 
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
