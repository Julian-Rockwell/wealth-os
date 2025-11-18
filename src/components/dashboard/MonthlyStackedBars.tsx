import { InfoTooltip } from "@/components/ui/info-tooltip";
import type { DashboardData } from "@/types/dashboard";
import type { ViewMode } from "@/pages/Dashboard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { filterOperationalTransactions } from "@/utils/transactionClassifier";

interface MonthlyStackedBarsProps {
  data: DashboardData;
  viewMode: ViewMode;
  period: 30 | 60 | 90;
}

export const MonthlyStackedBars = ({ data, viewMode, period }: MonthlyStackedBarsProps) => {
  const getColorForKey = (key: string, mode: ViewMode): string => {
    if (mode === "category") {
      if (key === "Needs") return "hsl(var(--needs))";
      if (key === "Wants") return "hsl(var(--wants))";
      if (key === "Savings") return "hsl(var(--savings))";
    }
    
    if (mode === "liquidity") {
      if (key === "Discretionary") return "hsl(var(--wants))";
      if (key === "Committed") return "hsl(var(--needs))";
      if (key === "Fixed") return "hsl(var(--savings))";
    }

    // For subcategory and merchant, use varied colors
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ];
    const hash = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getTitle = () => {
    switch (viewMode) {
      case "category": return "Monthly Breakdown (Last 3 Months)";
      case "subcategory": return "Top 5 Subcategories by Month";
      case "merchant": return "Top 5 Merchants by Month";
      case "liquidity": return "Liquidity Breakdown by Month";
      default: return "Monthly Breakdown";
    }
  };

  const getTooltipContent = () => {
    switch (viewMode) {
      case "category":
        return (
          <div className="space-y-2">
            <p><strong>How to read this:</strong></p>
            <p className="text-xs">Each column shows your total spending for that month, stacked by category:</p>
            <p className="text-xs">• <span className="font-semibold">Needs</span>: Essential expenses</p>
            <p className="text-xs">• <span className="font-semibold">Wants</span>: Discretionary spending</p>
            <p className="text-xs">• <span className="font-semibold">Savings</span>: Investments and savings</p>
          </div>
        );
      case "liquidity":
        return (
          <div className="space-y-2">
            <p><strong>Liquidity View:</strong></p>
            <p className="text-xs">• <span className="font-semibold">Discretionary</span>: Can cut quickly</p>
            <p className="text-xs">• <span className="font-semibold">Committed</span>: Harder to reduce</p>
            <p className="text-xs">• <span className="font-semibold">Fixed</span>: Locked in commitments</p>
          </div>
        );
      case "subcategory":
        return <p className="text-xs">Top 5 spending subcategories by total volume</p>;
      case "merchant":
        return <p className="text-xs">Top 5 merchants by total spending</p>;
      default:
        return <p className="text-xs">Monthly spending breakdown</p>;
    }
  };

  const getMonthlyDataByViewMode = () => {
    const { operationalDebits } = filterOperationalTransactions(data.txns.filter(t => t.sign === "debit"));
    
    // Group by month
    const monthlyGroups: Record<string, typeof operationalDebits> = {};
    operationalDebits.forEach(txn => {
      const month = txn.date.slice(0, 7); // YYYY-MM
      if (!monthlyGroups[month]) monthlyGroups[month] = [];
      monthlyGroups[month].push(txn);
    });

    const sortedMonths = Object.keys(monthlyGroups).sort();
    const last3Months = sortedMonths.slice(-3);

    if (viewMode === "category") {
      return last3Months.map(month => {
        const txns = monthlyGroups[month];
        const needs = txns.filter(t => t.category === "need").reduce((sum, t) => sum + t.amount, 0);
        const wants = txns.filter(t => t.category === "want").reduce((sum, t) => sum + t.amount, 0);
        const savings = txns.filter(t => t.category === "saving").reduce((sum, t) => sum + t.amount, 0);
        
        return {
          month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short" }),
          Needs: Math.round(needs),
          Wants: Math.round(wants),
          Savings: Math.round(savings),
        };
      });
    }

    if (viewMode === "liquidity") {
      return last3Months.map(month => {
        const txns = monthlyGroups[month];
        const discretionary = txns.filter(t => t.category === "want").reduce((sum, t) => sum + t.amount, 0);
        const committed = txns.filter(t => t.category === "need").reduce((sum, t) => sum + t.amount, 0);
        const fixed = txns.filter(t => t.category === "saving").reduce((sum, t) => sum + t.amount, 0);
        
        return {
          month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short" }),
          Discretionary: Math.round(discretionary),
          Committed: Math.round(committed),
          Fixed: Math.round(fixed),
        };
      });
    }

    if (viewMode === "subcategory") {
      // Find top 5 subcategories across all months
      const subcategoryTotals: Record<string, number> = {};
      operationalDebits.forEach(txn => {
        if (!subcategoryTotals[txn.subcategory]) subcategoryTotals[txn.subcategory] = 0;
        subcategoryTotals[txn.subcategory] += txn.amount;
      });
      const top5Subcategories = Object.entries(subcategoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([sub]) => sub);

      return last3Months.map(month => {
        const txns = monthlyGroups[month];
        const result: Record<string, string | number> = {
          month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short" }),
        };
        top5Subcategories.forEach(sub => {
          result[sub] = Math.round(txns.filter(t => t.subcategory === sub).reduce((sum, t) => sum + t.amount, 0));
        });
        return result;
      });
    }

    if (viewMode === "merchant") {
      // Find top 5 merchants across all months
      const merchantTotals: Record<string, number> = {};
      operationalDebits.forEach(txn => {
        if (!merchantTotals[txn.merchant]) merchantTotals[txn.merchant] = 0;
        merchantTotals[txn.merchant] += txn.amount;
      });
      const top5Merchants = Object.entries(merchantTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([merch]) => merch);

      return last3Months.map(month => {
        const txns = monthlyGroups[month];
        const result: Record<string, string | number> = {
          month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short" }),
        };
        top5Merchants.forEach(merch => {
          result[merch] = Math.round(txns.filter(t => t.merchant === merch).reduce((sum, t) => sum + t.amount, 0));
        });
        return result;
      });
    }

    return [];
  };

  const chartData = getMonthlyDataByViewMode();
  const dataKeys = chartData.length > 0 
    ? Object.keys(chartData[0]).filter(k => k !== "month") 
    : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">
          {getTitle()} 
          <span className="text-xs text-muted-foreground font-normal ml-2">
            (calculated from transaction history)
          </span>
        </h3>
        <InfoTooltip content={getTooltipContent()} />
      </div>
      
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => `$${value}`}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="square"
            />
            {dataKeys.map((key) => (
              <Bar 
                key={key} 
                dataKey={key} 
                stackId="stack" 
                fill={getColorForKey(key, viewMode)}
                radius={[0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          No transaction data available for the selected period
        </div>
      )}
    </div>
  );
};
