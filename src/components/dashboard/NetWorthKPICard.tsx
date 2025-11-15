import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Minus } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import type { FinancialSnapshot } from "@/types/financial";

interface NetWorthKPICardProps {
  snapshot: FinancialSnapshot;
}

export const NetWorthKPICard = ({ snapshot }: NetWorthKPICardProps) => {
  const { netWorth, trends } = snapshot;

  const series12m = trends.series12m || Array(12).fill(0);
  const chartData = series12m.map((value, index) => ({
    month: `M${index + 1}`,
    value,
  }));

  const hasHistoricalData = trends.series12m && trends.series12m.some(v => v !== 0);

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-3 h-3" />;
    if (value < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return "text-success";
    if (value < 0) return "text-destructive";
    return "text-warning";
  };

  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Net Worth <span className="text-xs font-normal">(calculated from snapshot)</span>
        </h3>
        <DollarSign className="w-4 h-4 text-muted-foreground" />
      </div>
      <p className="text-3xl font-bold tracking-tight mb-2">
        ${netWorth.net.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
      
      {/* 30/60/90 day trends in one line */}
      <div className="flex items-center gap-3 text-xs mb-4">
        <div className={`flex items-center gap-1 ${getTrendColor(trends.d30.abs)}`}>
          {getTrendIcon(trends.d30.abs)}
          <span>{trends.d30.pct >= 0 ? "+" : ""}{trends.d30.pct.toFixed(2)}% (30d)</span>
        </div>
        <div className={`flex items-center gap-1 ${getTrendColor(trends.d60.abs)}`}>
          {getTrendIcon(trends.d60.abs)}
          <span>{trends.d60.pct >= 0 ? "+" : ""}{trends.d60.pct.toFixed(2)}% (60d)</span>
        </div>
        <div className={`flex items-center gap-1 ${getTrendColor(trends.d90.abs)}`}>
          {getTrendIcon(trends.d90.abs)}
          <span>{trends.d90.pct >= 0 ? "+" : ""}{trends.d90.pct.toFixed(2)}% (90d)</span>
        </div>
      </div>

      {/* 12-Month Sparkline */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-2">12-Month Trend</h4>
        {!hasHistoricalData && (
          <p className="text-xs text-warning mb-2">Historical backfill pending</p>
        )}
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
            <Tooltip 
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Net Worth"]}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
              opacity={hasHistoricalData ? 1 : 0.3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
