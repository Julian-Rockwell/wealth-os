import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Minus, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import type { DashboardData } from "@/types/dashboard";
import { classifyTransactions, validate50_30_20 } from "@/utils/transactionClassifier";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoTooltip } from "@/components/ui/info-tooltip";

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

  // Calculate 50/30/20 validation
  const totalExpenses = data.expenses.needs.total + data.expenses.wants.total + data.expenses.savings.total;
  const validation = validate50_30_20(
    data.income.avgMonthly * data.period.months,
    data.expenses.needs.total,
    data.expenses.wants.total,
    data.expenses.savings.total
  );

  return (
    <div className="space-y-4">
      {/* 50/30/20 Budget Alerts */}
      {validation.alerts.length > 0 && (
        <Alert variant="destructive" className="shadow-soft">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold text-sm">Budget Rule Violations (50/30/20)</p>
              {validation.alerts.map((alert, idx) => (
                <p key={idx} className="text-xs">{alert}</p>
              ))}
              <div className="mt-3 p-3 bg-background/50 rounded text-xs space-y-1">
                <p><strong>Recommended Actions:</strong></p>
                {data.expenses.needs.pct > 50 && (
                  <p>• Review Needs: Focus on Rent/Mortgage, Groceries, and Utilities for optimization</p>
                )}
                {data.expenses.wants.pct > 30 && (
                  <p>• Reduce Wants: Cut discretionary spending in Dining Out, Entertainment, Shopping</p>
                )}
                {data.expenses.savings.pct < 20 && (
                  <p>• Increase Savings: Aim to save at least 20% by reducing expenses or increasing income</p>
                )}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* 50/30/20 Progress Card */}
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            50/30/20 Budget Rule
            <InfoTooltip content={
              <div className="space-y-2">
                <p><strong>The 50/30/20 Rule:</strong></p>
                <p>• <strong>50% Needs:</strong> Essential expenses (rent, groceries, utilities, insurance)</p>
                <p>• <strong>30% Wants:</strong> Discretionary spending (dining out, entertainment, hobbies)</p>
                <p>• <strong>20% Savings:</strong> Emergency fund, investments, retirement, debt payoff</p>
              </div>
            } />
          </h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Needs</span>
              <span className={data.expenses.needs.pct > 55 ? "text-destructive" : data.expenses.needs.pct < 45 ? "text-success" : "text-muted-foreground"}>
                {data.expenses.needs.pct.toFixed(1)}% / 50%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-needs rounded-full transition-all"
                style={{ width: `${Math.min(data.expenses.needs.pct * 2, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Wants</span>
              <span className={data.expenses.wants.pct > 35 ? "text-destructive" : data.expenses.wants.pct < 25 ? "text-warning" : "text-muted-foreground"}>
                {data.expenses.wants.pct.toFixed(1)}% / 30%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-wants rounded-full transition-all"
                style={{ width: `${Math.min((data.expenses.wants.pct / 30) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Savings</span>
              <span className={data.expenses.savings.pct < 15 ? "text-destructive" : data.expenses.savings.pct > 25 ? "text-success" : "text-muted-foreground"}>
                {data.expenses.savings.pct.toFixed(1)}% / 20%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-savings rounded-full transition-all"
                style={{ width: `${Math.min((data.expenses.savings.pct / 20) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

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
