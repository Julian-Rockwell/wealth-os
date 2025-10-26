import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Minus } from "lucide-react";
import type { DashboardData } from "@/types/dashboard";
import { classifyTransactions } from "@/utils/transactionClassifier";

interface IncomeExpensesKPIProps {
  data: DashboardData;
}

export const IncomeExpensesKPI = ({ data }: IncomeExpensesKPIProps) => {
  // Classify transactions using deterministic rules
  const classification = classifyTransactions(data.txns);
  
  const totalIncome = classification.totals.income;
  const totalExpenses = classification.totals.expenses;

  // Calculate trends (last 30 days vs previous 30 days)
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Filter transactions by date range and classification
  const last30DaysTxns = data.txns.filter(t => {
    const date = new Date(t.date);
    return date >= thirtyDaysAgo && date <= now;
  });

  const previous30DaysTxns = data.txns.filter(t => {
    const date = new Date(t.date);
    return date >= sixtyDaysAgo && date < thirtyDaysAgo;
  });

  const last30Classification = classifyTransactions(last30DaysTxns);
  const previous30Classification = classifyTransactions(previous30DaysTxns);

  const last30DaysIncome = last30Classification.totals.income;
  const previous30DaysIncome = previous30Classification.totals.income;
  const last30DaysExpenses = last30Classification.totals.expenses;
  const previous30DaysExpenses = previous30Classification.totals.expenses;

  // Calculate percentage changes
  const incomeChange = previous30DaysIncome > 0 
    ? ((last30DaysIncome - previous30DaysIncome) / previous30DaysIncome) * 100
    : 0;

  const expensesChange = previous30DaysExpenses > 0
    ? ((last30DaysExpenses - previous30DaysExpenses) / previous30DaysExpenses) * 100
    : 0;

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

  // For expenses, the color logic is inverted (increase is bad, decrease is good)
  const getExpenseTrendColor = (value: number) => {
    if (value > 0) return "text-destructive";
    if (value < 0) return "text-success";
    return "text-warning";
  };

  const getExpenseTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-destructive" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-success" />;
    return <Minus className="w-4 h-4 text-warning" />;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Income Card */}
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Income</h3>
          <DollarSign className="w-4 h-4 text-success" />
        </div>
        <p className="text-3xl font-bold text-success mb-1">
          ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-2 text-sm">
          {getTrendIcon(incomeChange)}
          <span className={getTrendColor(incomeChange)}>
            {incomeChange >= 0 ? "+" : ""}{incomeChange.toFixed(1)}% vs last 30d
          </span>
        </div>
      </Card>

      {/* Expenses Card */}
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Expenses</h3>
          <DollarSign className="w-4 h-4 text-destructive" />
        </div>
        <p className="text-3xl font-bold text-destructive mb-1">
          ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-2 text-sm">
          {getExpenseTrendIcon(expensesChange)}
          <span className={getExpenseTrendColor(expensesChange)}>
            {expensesChange >= 0 ? "+" : ""}{expensesChange.toFixed(1)}% vs last 30d
          </span>
        </div>
      </Card>
    </div>
  );
};
