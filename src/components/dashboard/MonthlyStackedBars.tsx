import { Card } from "@/components/ui/card";
import type { DashboardData } from "@/types/dashboard";

interface MonthlyStackedBarsProps {
  data: DashboardData;
}

export const MonthlyStackedBars = ({ data }: MonthlyStackedBarsProps) => {
  // Group transactions by month
  const monthlyData = data.txns.reduce((acc, txn) => {
    if (txn.sign === "credit") return acc;
    
    const month = txn.date.slice(0, 7); // YYYY-MM
    if (!acc[month]) {
      acc[month] = { needs: 0, wants: 0, savings: 0 };
    }
    acc[month][txn.category === "need" ? "needs" : txn.category === "want" ? "wants" : "savings"] += txn.amount;
    return acc;
  }, {} as Record<string, { needs: number; wants: number; savings: number }>);

  const months = Object.keys(monthlyData).sort();
  const maxTotal = Math.max(...months.map(m => monthlyData[m].needs + monthlyData[m].wants + monthlyData[m].savings));

  return (
    <Card className="p-6 shadow-soft">
      <h3 className="font-semibold mb-4">Monthly Breakdown</h3>
      
      <div className="space-y-4">
        {months.map((month) => {
          const { needs, wants, savings } = monthlyData[month];
          const total = needs + wants + savings;
          const needsPct = (needs / total) * 100;
          const wantsPct = (wants / total) * 100;
          const savingsPct = (savings / total) * 100;

          return (
            <div key={month}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
                <span className="text-sm text-muted-foreground">${total.toFixed(0)}</span>
              </div>
              <div className="h-8 bg-secondary rounded-lg overflow-hidden flex">
                <div
                  className="bg-needs flex items-center justify-center text-xs text-white font-medium"
                  style={{ width: `${needsPct}%` }}
                  title={`Needs: $${needs.toFixed(0)}`}
                >
                  {needsPct > 15 && `${needsPct.toFixed(0)}%`}
                </div>
                <div
                  className="bg-wants flex items-center justify-center text-xs text-white font-medium"
                  style={{ width: `${wantsPct}%` }}
                  title={`Wants: $${wants.toFixed(0)}`}
                >
                  {wantsPct > 15 && `${wantsPct.toFixed(0)}%`}
                </div>
                <div
                  className="bg-savings flex items-center justify-center text-xs text-white font-medium"
                  style={{ width: `${savingsPct}%` }}
                  title={`Savings: $${savings.toFixed(0)}`}
                >
                  {savingsPct > 15 && `${savingsPct.toFixed(0)}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
