import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Minus } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { FinancialSnapshot } from "@/types/financial";

interface NetWorthKPIProps {
  snapshot: FinancialSnapshot;
}

export const NetWorthKPI = ({ snapshot }: NetWorthKPIProps) => {
  const { netWorth, trends } = snapshot;

  // Prepare 12-month chart data
  const series12m = trends.series12m || Array(12).fill(0);
  const chartData = series12m.map((value, index) => ({
    month: `M${index + 1}`,
    value,
  }));

  const hasHistoricalData = trends.series12m && trends.series12m.some(v => v !== 0);

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-success" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-warning" />;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return "text-success";
    if (value < 0) return "text-destructive";
    return "text-warning";
  };

  return (
    <div className="space-y-4">
      {/* Net Worth Card with 12M Trend */}
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Net Worth <span className="text-xs font-normal">(calculated from snapshot)</span></h3>
          <DollarSign className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-3xl font-bold mb-1">
          ${netWorth.net.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-2 text-sm mb-4">
          {getTrendIcon(trends.d30.abs)}
          <span className={getTrendColor(trends.d30.abs)}>
            {trends.d30.pct >= 0 ? "+" : ""}{trends.d30.pct.toFixed(2)}% (30d)
          </span>
        </div>

        {/* 12-Month Trend Line */}
        <div className="mt-4">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">12-Month Trend</h4>
          {!hasHistoricalData && (
            <p className="text-xs text-warning mb-2">Historical backfill pending</p>
          )}
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }}
                stroke="hsl(var(--muted-foreground))"
                hide
              />
              <YAxis hide />
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

      {/* Assets Card */}
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Total Assets</h3>
          <TrendingUp className="w-4 h-4 text-success" />
        </div>
        <p className="text-2xl font-bold text-success">
          ${netWorth.assets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </Card>

      {/* Liabilities Card */}
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Total Liabilities</h3>
          <TrendingDown className="w-4 h-4 text-destructive" />
        </div>
        <p className="text-2xl font-bold text-destructive">
          ${netWorth.liabilities.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </Card>

      {/* 30/60/90 Trends Card */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Trend Analysis</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getTrendIcon(trends.d30.abs)}
              <span className="text-sm">30 Days</span>
            </div>
            <span className={`text-sm font-semibold ${getTrendColor(trends.d30.abs)}`}>
              {trends.d30.abs >= 0 ? "+" : ""}${trends.d30.abs.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getTrendIcon(trends.d60.abs)}
              <span className="text-sm">60 Days</span>
            </div>
            <span className={`text-sm font-semibold ${getTrendColor(trends.d60.abs)}`}>
              {trends.d60.abs >= 0 ? "+" : ""}${trends.d60.abs.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getTrendIcon(trends.d90.abs)}
              <span className="text-sm">90 Days</span>
            </div>
            <span className={`text-sm font-semibold ${getTrendColor(trends.d90.abs)}`}>
              {trends.d90.abs >= 0 ? "+" : ""}${trends.d90.abs.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
