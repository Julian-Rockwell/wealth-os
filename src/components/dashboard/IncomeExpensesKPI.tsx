import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Minus, ChevronDown, ChevronUp } from "lucide-react";
import type { DashboardData, Transaction } from "@/types/dashboard";
import { classifyTransactions } from "@/utils/transactionClassifier";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { IncomeSummaryCard } from "./IncomeSummaryCard";

interface IncomeExpensesKPIProps {
  data: DashboardData;
  period: 30 | 60 | 90;
  onUpdateTransaction?: (id: string, updates: Partial<Transaction>) => void;
}

export const IncomeExpensesKPI = ({ data, period, onUpdateTransaction }: IncomeExpensesKPIProps) => {
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
    <div className="space-y-6">
      {/* Income Summary Card with Edit */}
      {onUpdateTransaction && (
        <IncomeSummaryCard 
          data={data} 
          period={period}
          onUpdate={onUpdateTransaction}
        />
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
      {/* Income Card */}
      <Card className="p-6 shadow-soft">
        <Collapsible open={incomeExpanded} onOpenChange={setIncomeExpanded}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Income</h3>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-success" />
              <CollapsibleTrigger className="p-1 hover:bg-muted rounded">
                {incomeExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </CollapsibleTrigger>
            </div>
          </div>
          <p className="text-3xl font-bold text-success mb-1">
            ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-2 text-sm">
            {getTrendIcon(incomeChange)}
            <span className={getTrendColor(incomeChange)}>
              {incomeChange >= 0 ? "+" : ""}{incomeChange.toFixed(1)}% vs prev {period}d
            </span>
          </div>
          
          <CollapsibleContent className="mt-4 pt-4 border-t space-y-2">
            {Object.entries(incomeByCategory).map(([category, amount]) => 
              amount > 0 && (
                <div key={category} className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{category}</span>
                  <span className="font-medium">${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )
            )}
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Expenses Card */}
      <Card className="p-6 shadow-soft">
        <Collapsible open={expensesExpanded} onOpenChange={setExpensesExpanded}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Expenses</h3>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-destructive" />
              <CollapsibleTrigger className="p-1 hover:bg-muted rounded">
                {expensesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </CollapsibleTrigger>
            </div>
          </div>
          <p className="text-3xl font-bold text-destructive mb-1">
            ${currentExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-2 text-sm">
            {getExpenseTrendIcon(expensesChange)}
            <span className={getExpenseTrendColor(expensesChange)}>
              {expensesChange >= 0 ? "+" : ""}{expensesChange.toFixed(1)}% vs prev {period}d
            </span>
          </div>
          
          <CollapsibleContent className="mt-4 pt-4 border-t space-y-2">
            {Object.entries(expensesByCategory).map(([category, amount]) => 
              amount > 0 && (
                <div key={category} className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{category.replace('_', ' ')}</span>
                  <span className="font-medium">${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )
            )}
          </CollapsibleContent>
        </Collapsible>
      </Card>
      </div>
    </div>
  );
};
