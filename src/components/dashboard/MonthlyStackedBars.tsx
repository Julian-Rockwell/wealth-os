import { Card } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/info-tooltip";
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
    <div className="space-y-4">{/* No Card wrapper - will be inside SpendingVisualization */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Monthly Breakdown <span className="text-xs text-muted-foreground font-normal ml-2">(calculated from transaction history)</span></h3>
        <InfoTooltip content={
          <div className="space-y-2">
            <p><strong>How to read this:</strong></p>
            <p className="text-xs">Each bar shows your total spending for that month, broken down by category:</p>
            <p className="text-xs">• <span className="font-semibold">Needs</span> (blue): Essential expenses like housing, groceries, utilities</p>
            <p className="text-xs">• <span className="font-semibold">Wants</span> (yellow): Discretionary spending like dining, entertainment</p>
            <p className="text-xs">• <span className="font-semibold">Savings</span> (green): Investments and savings contributions</p>
          </div>
        } />
      </div>
      
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
    </div>
  );
};
