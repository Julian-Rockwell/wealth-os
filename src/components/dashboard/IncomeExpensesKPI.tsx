import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Minus, ChevronDown, ChevronUp } from "lucide-react";
import type { DashboardData } from "@/types/dashboard";
import { classifyTransactions } from "@/utils/transactionClassifier";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface IncomeExpensesKPIProps {
  data: DashboardData;
  period: 30 | 60 | 90;
}

export const IncomeExpensesKPI = ({ data, period }: IncomeExpensesKPIProps) => {
  const [incomeExpanded, setIncomeExpanded] = useState(false);
  const [expensesExpanded, setExpensesExpanded] = useState(false);

  // Calculate date ranges based on period
  const now = new Date();
  const periodDaysAgo = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);
  const doublePeriodDaysAgo = new Date(now.getTime() - (period * 2) * 24 * 60 * 60 * 1000);

  // Filter transactions for current period
  const currentPeriodTxns = data.txns.filter(t => {
    const date = new Date(t.date);
    return date >= periodDaysAgo && date <= now;
  });

  const previousPeriodTxns = data.txns.filter(t => {
    const date = new Date(t.date);
    return date >= doublePeriodDaysAgo && date < periodDaysAgo;
  });

  // Classify transactions using deterministic rules
  const currentClassification = classifyTransactions(currentPeriodTxns);
  const previousClassification = classifyTransactions(previousPeriodTxns);
  
  const totalIncome = currentClassification.totals.income;
  const currentExpenses = currentClassification.totals.expenses;
  const incomeByCategory = currentClassification.by_category.income;
  const expensesByCategory = currentClassification.by_category.expenses;

  // Calculate percentage changes
  const previousIncome = previousClassification.totals.income;
  const previousExpenses = previousClassification.totals.expenses;

  const incomeChange = previousIncome > 0 
    ? ((totalIncome - previousIncome) / previousIncome) * 100
    : 0;

  const expensesChange = previousExpenses > 0
    ? ((currentExpenses - previousExpenses) / previousExpenses) * 100
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Income Mini Card */}
      <Card className="p-6 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Income <span className="text-xs font-normal">(calculated from txns)</span>
          </h3>
          <DollarSign className="w-4 h-4 text-success" />
        </div>
        <p className="text-3xl font-bold tracking-tight text-success mb-2">
          ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-2 text-sm">
          {getTrendIcon(incomeChange)}
          <span className={getTrendColor(incomeChange)}>
            {incomeChange > 0 ? '+' : ''}{incomeChange.toFixed(1)}%
          </span>
          <span className="text-muted-foreground">vs prev {period}d</span>
        </div>
      </Card>

      {/* Expenses Mini Card */}
      <Card className="p-6 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Expenses <span className="text-xs font-normal">(calculated from txns)</span>
          </h3>
          <TrendingDown className="w-4 h-4 text-destructive" />
        </div>
        <p className="text-3xl font-bold tracking-tight text-destructive mb-2">
          ${currentExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-2 text-sm">
          {getExpenseTrendIcon(expensesChange)}
          <span className={getExpenseTrendColor(expensesChange)}>
            {expensesChange > 0 ? '+' : ''}{expensesChange.toFixed(1)}%
          </span>
          <span className="text-muted-foreground">vs prev {period}d</span>
        </div>
      </Card>
    </div>
  );
};
