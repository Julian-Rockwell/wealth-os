import { Card } from "@/components/ui/card";
import type { DashboardData } from "@/types/dashboard";
import type { ViewMode } from "@/pages/Dashboard";

interface BudgetDonutProps {
  data: DashboardData;
  viewMode: ViewMode;
}

export const BudgetDonut = ({ data, viewMode }: BudgetDonutProps) => {
  const total = data.expenses.needs.total + data.expenses.wants.total + data.expenses.savings.total;
  
  const needsAngle = (data.expenses.needs.total / total) * 360;
  const wantsAngle = (data.expenses.wants.total / total) * 360;
  const savingsAngle = (data.expenses.savings.total / total) * 360;

  // Create conic gradient
  const conicGradient = `conic-gradient(
    hsl(var(--needs)) 0deg ${needsAngle}deg,
    hsl(var(--wants)) ${needsAngle}deg ${needsAngle + wantsAngle}deg,
    hsl(var(--savings)) ${needsAngle + wantsAngle}deg 360deg
  )`;

  return (
    <Card className="p-6 shadow-soft">
      <h3 className="font-semibold mb-4">Budget Distribution</h3>
      
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-needs" />
            <span className="text-sm">Needs</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{data.expenses.needs.pct.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">${data.expenses.needs.total.toFixed(0)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-wants" />
            <span className="text-sm">Wants</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{data.expenses.wants.pct.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">${data.expenses.wants.total.toFixed(0)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-savings" />
            <span className="text-sm">Savings</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{data.expenses.savings.pct.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">${data.expenses.savings.total.toFixed(0)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
