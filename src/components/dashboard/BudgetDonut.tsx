import { Card } from "@/components/ui/card";
import type { DashboardData } from "@/types/dashboard";
import type { ViewMode } from "@/pages/Dashboard";

interface BudgetDonutProps {
  data: DashboardData;
  viewMode: ViewMode;
}

export const BudgetDonut = ({ data, viewMode }: BudgetDonutProps) => {
  // Calculate data based on viewMode
  const getViewData = () => {
    switch (viewMode) {
      case "category":
        return {
          title: "50/30/20 Distribution",
          items: [
            { label: "Needs (50%)", value: data.expenses.needs.total, color: "bg-needs", pct: data.expenses.needs.pct },
            { label: "Wants (30%)", value: data.expenses.wants.total, color: "bg-wants", pct: data.expenses.wants.pct },
            { label: "Savings (20%)", value: data.expenses.savings.total, color: "bg-savings", pct: data.expenses.savings.pct },
          ]
        };
      
      case "subcategory":
        const allSubs = [
          ...Object.entries(data.expenses.needs.subs).map(([k, v]) => ({ label: k, value: v, color: "bg-needs" })),
          ...Object.entries(data.expenses.wants.subs).map(([k, v]) => ({ label: k, value: v, color: "bg-wants" })),
          ...Object.entries(data.expenses.savings.subs).map(([k, v]) => ({ label: k, value: v, color: "bg-savings" })),
        ].sort((a, b) => b.value - a.value).slice(0, 5);
        const subsTotal = allSubs.reduce((sum, item) => sum + item.value, 0);
        return {
          title: "Top 5 Subcategories",
          items: allSubs.map(item => ({
            ...item,
            pct: (item.value / subsTotal) * 100
          }))
        };
      
      case "merchant":
        const merchantTotals: Record<string, number> = {};
        data.txns.filter(t => t.sign === "debit").forEach(txn => {
          merchantTotals[txn.merchant] = (merchantTotals[txn.merchant] || 0) + txn.amount;
        });
        const topMerchants = Object.entries(merchantTotals)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5);
        const merchTotal = topMerchants.reduce((sum, [, v]) => sum + v, 0);
        return {
          title: "Top 5 Merchants",
          items: topMerchants.map(([merchant, value]) => ({
            label: merchant,
            value,
            color: "bg-primary",
            pct: (value / merchTotal) * 100
          }))
        };
      
      case "liquidity":
        const liquidityData = data.txns.filter(t => t.sign === "debit").reduce((acc, txn) => {
          const category = txn.subcategory.includes("Rent") || txn.subcategory.includes("Insurance") ? "fixed" :
                          txn.subcategory.includes("Emergency") || txn.subcategory.includes("Debt") ? "committed" :
                          "discretionary";
          acc[category] = (acc[category] || 0) + txn.amount;
          return acc;
        }, {} as Record<string, number>);
        const liqTotal = Object.values(liquidityData).reduce((sum, v) => sum + v, 0);
        return {
          title: "Spending Liquidity",
          items: [
            { label: "Fixed Expenses", value: liquidityData.fixed || 0, color: "bg-destructive", pct: ((liquidityData.fixed || 0) / liqTotal) * 100 },
            { label: "Committed", value: liquidityData.committed || 0, color: "bg-warning", pct: ((liquidityData.committed || 0) / liqTotal) * 100 },
            { label: "Discretionary", value: liquidityData.discretionary || 0, color: "bg-success", pct: ((liquidityData.discretionary || 0) / liqTotal) * 100 },
          ]
        };
      
      default:
        return {
          title: "Budget Distribution",
          items: [
            { label: "Needs", value: data.expenses.needs.total, color: "bg-needs", pct: data.expenses.needs.pct },
            { label: "Wants", value: data.expenses.wants.total, color: "bg-wants", pct: data.expenses.wants.pct },
            { label: "Savings", value: data.expenses.savings.total, color: "bg-savings", pct: data.expenses.savings.pct },
          ]
        };
    }
  };

  const viewData = getViewData();
  const total = viewData.items.reduce((sum, item) => sum + item.value, 0);

  // Calculate angles for conic gradient
  let currentAngle = 0;
  const gradientStops = viewData.items.map((item, index) => {
    const angle = (item.value / total) * 360;
    const start = currentAngle;
    currentAngle += angle;
    return `hsl(var(--${item.color.replace('bg-', '')})) ${start}deg ${currentAngle}deg`;
  }).join(', ');

  const conicGradient = `conic-gradient(${gradientStops})`;

  return (
    <Card className="p-6 shadow-soft">
      <h3 className="font-semibold mb-4">{viewData.title}</h3>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div
          className="w-full h-full rounded-full"
          style={{ background: conicGradient }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{data.period.months}</p>
                <p className="text-xs text-muted-foreground">Months</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {viewData.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
              <span className="text-sm truncate">{item.label}</span>
            </div>
            <div className="text-right ml-2">
              <p className="text-sm font-semibold">{item.pct.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">${item.value.toFixed(0)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
