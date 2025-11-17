import { Card } from "@/components/ui/card";
import type { DashboardData } from "@/types/dashboard";

interface SpendingLiquidityDonutProps {
  data: DashboardData;
  period: 30 | 60 | 90;
}

export const SpendingLiquidityDonut = ({ data, period }: SpendingLiquidityDonutProps) => {
  // Filter transactions based on period
  const now = new Date();
  const periodDaysAgo = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);
  
  const filteredTxns = data.txns.filter(t => {
    const date = new Date(t.date);
    return date >= periodDaysAgo && date <= now && t.sign === "debit";
  });

  // Calculate liquidity totals
  const liquidityTotals = { discretionary: 0, committed: 0, fixed: 0 };
  filteredTxns.forEach(txn => {
    const liquidity = txn.liquidity || "discretionary";
    liquidityTotals[liquidity as keyof typeof liquidityTotals] += txn.amount;
  });

  const total = liquidityTotals.discretionary + liquidityTotals.committed + liquidityTotals.fixed;
  
  const items = [
    { 
      label: "Discretionary", 
      value: liquidityTotals.discretionary, 
      color: "hsl(var(--chart-1))",
      pct: total > 0 ? (liquidityTotals.discretionary / total) * 100 : 0 
    },
    { 
      label: "Committed", 
      value: liquidityTotals.committed, 
      color: "hsl(var(--chart-2))",
      pct: total > 0 ? (liquidityTotals.committed / total) * 100 : 0 
    },
    { 
      label: "Fixed", 
      value: liquidityTotals.fixed, 
      color: "hsl(var(--chart-3))",
      pct: total > 0 ? (liquidityTotals.fixed / total) * 100 : 0 
    },
  ];

  // Create gradient for donut
  let currentPct = 0;
  const gradientStops = items
    .filter(item => item.pct > 0)
    .map((item) => {
      const startPct = currentPct;
      currentPct += item.pct;
      return `${item.color} ${startPct}% ${currentPct}%`;
    })
    .join(", ");

  return (
    <Card className="p-6 rounded-xl border border-border bg-card shadow-sm">
      <h3 className="font-semibold text-foreground mb-6">Spending Liquidity</h3>
      
      <div className="grid grid-cols-[200px_1fr] gap-6 items-center">
        {/* Donut Chart */}
        <div className="relative w-[180px] h-[180px] mx-auto">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(${gradientStops})`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[120px] h-[120px] rounded-full bg-card flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-foreground">{period}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">
                  {item.pct.toFixed(1)}%
                </span>
                <span className="text-sm text-muted-foreground min-w-[80px] text-right">
                  ${item.value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
