import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { DashboardData } from "@/types/dashboard";

interface MonthlyStackedBarsProps {
  data: DashboardData;
}

export const MonthlyStackedBars = ({ data }: MonthlyStackedBarsProps) => {
  const [viewMode, setViewMode] = useState<"50/30/20" | "subcategory" | "merchant" | "liquidity">("50/30/20");

  // Generate colors for dynamic categories
  const generateColors = (data: Record<string, Record<string, number>>) => {
    const allCategories = new Set<string>();
    Object.values(data).forEach(month => {
      Object.keys(month).forEach(cat => allCategories.add(cat));
    });
    
    const chartColors = [
      "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", 
      "hsl(var(--chart-4))", "hsl(var(--chart-5))"
    ];
    
    const colorMap: Record<string, string> = {};
    Array.from(allCategories).forEach((cat, i) => {
      colorMap[cat] = chartColors[i % chartColors.length];
    });
    
    return colorMap;
  };

  // Calculate monthly data based on view mode
  const getMonthlyData = () => {
    switch (viewMode) {
      case "50/30/20":
        const categoryData = data.txns.reduce((acc, txn) => {
          if (txn.sign === "credit") return acc;
          const month = txn.date.slice(0, 7);
          if (!acc[month]) acc[month] = { needs: 0, wants: 0, savings: 0 };
          acc[month][txn.category === "need" ? "needs" : txn.category === "want" ? "wants" : "savings"] += txn.amount;
          return acc;
        }, {} as Record<string, Record<string, number>>);
        return { data: categoryData, colors: { needs: "hsl(var(--needs))", wants: "hsl(var(--wants))", savings: "hsl(var(--savings))" } };

      case "subcategory":
        const subcategoryData = data.txns.reduce((acc, txn) => {
          if (txn.sign === "credit") return acc;
          const month = txn.date.slice(0, 7);
          if (!acc[month]) acc[month] = {};
          if (!acc[month][txn.subcategory]) acc[month][txn.subcategory] = 0;
          acc[month][txn.subcategory] += txn.amount;
          return acc;
        }, {} as Record<string, Record<string, number>>);
        return { data: subcategoryData, colors: generateColors(subcategoryData) };

      case "merchant":
        const merchantData = data.txns.reduce((acc, txn) => {
          if (txn.sign === "credit") return acc;
          const month = txn.date.slice(0, 7);
          if (!acc[month]) acc[month] = {};
          if (!acc[month][txn.merchant]) acc[month][txn.merchant] = 0;
          acc[month][txn.merchant] += txn.amount;
          return acc;
        }, {} as Record<string, Record<string, number>>);
        return { data: merchantData, colors: generateColors(merchantData) };

      case "liquidity":
        const liquidityData = data.txns.reduce((acc, txn) => {
          if (txn.sign === "credit") return acc;
          const month = txn.date.slice(0, 7);
          const liquidity = txn.liquidity || "discretionary";
          if (!acc[month]) acc[month] = { discretionary: 0, committed: 0, fixed: 0 };
          acc[month][liquidity] += txn.amount;
          return acc;
        }, {} as Record<string, Record<string, number>>);
        return { data: liquidityData, colors: { discretionary: "hsl(var(--chart-1))", committed: "hsl(var(--chart-2))", fixed: "hsl(var(--chart-3))" } };

      default:
        return { data: {}, colors: {} };
    }
  };

  const { data: monthlyData, colors } = getMonthlyData();
  const months = Object.keys(monthlyData).sort().slice(-3); // Last 3 months

  return (
    <Card className="p-6 rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Monthly Breakdown (Last 3 Months)</h3>
        
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-auto">
          <TabsList className="inline-flex h-9 rounded-lg border bg-muted p-0.5">
            <TabsTrigger value="50/30/20" className="px-3 py-1.5 text-sm rounded-md data-[state=active]:bg-background">
              50/30/20
            </TabsTrigger>
            <TabsTrigger value="subcategory" className="px-3 py-1.5 text-sm rounded-md data-[state=active]:bg-background">
              Subcategory
            </TabsTrigger>
            <TabsTrigger value="merchant" className="px-3 py-1.5 text-sm rounded-md data-[state=active]:bg-background">
              Merchant
            </TabsTrigger>
            <TabsTrigger value="liquidity" className="px-3 py-1.5 text-sm rounded-md data-[state=active]:bg-background">
              Liquidity
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-4">
        {months.map((month) => {
          const monthData = monthlyData[month];
          if (!monthData) return null;
          
          const categories = Object.keys(monthData);
          const total = Object.values(monthData).reduce((sum, val) => sum + (val as number), 0);
          
          // Get top 5 categories for this month (for subcategory/merchant views)
          const topCategories = categories
            .map(cat => ({ cat, value: monthData[cat] }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

          return (
            <div key={month}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
                <span className="text-sm text-muted-foreground">${total.toFixed(0)}</span>
              </div>
              <div className="h-8 bg-muted rounded-lg overflow-hidden flex">
                {(viewMode === "subcategory" || viewMode === "merchant" ? topCategories : categories.map(cat => ({ cat, value: monthData[cat] }))).map(({ cat, value }) => {
                  const pct = (value / total) * 100;
                  const color = colors[cat] || "hsl(var(--muted-foreground))";
                  
                  return (
                    <div
                      key={cat}
                      className="flex items-center justify-center text-xs text-white font-medium"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                      title={`${cat}: $${value.toFixed(0)}`}
                    >
                      {pct > 15 && `${pct.toFixed(0)}%`}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
