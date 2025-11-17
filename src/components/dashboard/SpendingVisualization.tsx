import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BudgetDonut } from "@/components/dashboard/BudgetDonut";
import { MonthlyStackedBars } from "@/components/dashboard/MonthlyStackedBars";
import type { DashboardData } from "@/types/dashboard";
import type { ViewMode } from "@/pages/Dashboard";

interface SpendingVisualizationProps {
  data: DashboardData;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  period: 30 | 60 | 90;
}

export const SpendingVisualization = ({ data, viewMode, setViewMode, period }: SpendingVisualizationProps) => {
  const views: Array<{ id: ViewMode; label: string }> = [
    { id: "category", label: "50/30/20" },
    { id: "subcategory", label: "Subcategory" },
    { id: "merchant", label: "Merchant" },
    { id: "liquidity", label: "Liquidity" },
  ];

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Spending Breakdown</CardTitle>
          <div className="flex flex-wrap gap-2">
            {views.map((view) => (
              <Button
                key={view.id}
                variant={viewMode === view.id ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(view.id)}
                className={viewMode === view.id ? "gradient-primary" : ""}
              >
                {view.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: BudgetDonut */}
          <div>
            <BudgetDonut data={data} viewMode={viewMode} period={period} />
          </div>
          {/* Right: MonthlyStackedBars */}
          <div>
            <MonthlyStackedBars data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
