import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import type { FinancialSnapshot } from "@/types/financial";

interface NetWorthKPIProps {
  snapshot: FinancialSnapshot;
}

export const NetWorthKPI = ({ snapshot }: NetWorthKPIProps) => {
  const { netWorth, trends } = snapshot;

  return (
    <div className="space-y-4">
      {/* Net Worth Card */}
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Net Worth</h3>
          <DollarSign className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-3xl font-bold mb-1">
          ${netWorth.net.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-2 text-sm">
          {trends.d30.abs >= 0 ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          <span className={trends.d30.abs >= 0 ? "text-success" : "text-destructive"}>
            {trends.d30.pct >= 0 ? "+" : ""}{trends.d30.pct.toFixed(2)}% (30d)
          </span>
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
            <span className="text-sm">30 Days</span>
            <span className={`text-sm font-semibold ${trends.d30.abs >= 0 ? "text-success" : "text-destructive"}`}>
              {trends.d30.abs >= 0 ? "+" : ""}${trends.d30.abs.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">60 Days</span>
            <span className={`text-sm font-semibold ${trends.d60.abs >= 0 ? "text-success" : "text-destructive"}`}>
              {trends.d60.abs >= 0 ? "+" : ""}${trends.d60.abs.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">90 Days</span>
            <span className={`text-sm font-semibold ${trends.d90.abs >= 0 ? "text-success" : "text-destructive"}`}>
              {trends.d90.abs >= 0 ? "+" : ""}${trends.d90.abs.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
