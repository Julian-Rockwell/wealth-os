import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { DashboardData } from "@/types/dashboard";
import { classifyTransactions } from "@/utils/transactionClassifier";

interface UnspentIncomeCardProps {
  data: DashboardData;
  period: 30 | 60 | 90;
  onUpdateIncome?: (newMonthlyIncome: number) => void;
}

export const UnspentIncomeCard = ({ data, period, onUpdateIncome }: UnspentIncomeCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIncome, setEditedIncome] = useState(String(data.income.avgMonthly));

  // Calculate date ranges for current and previous periods
  const now = new Date();
  const periodDaysAgo = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);
  const doublePeriodDaysAgo = new Date(now.getTime() - (period * 2) * 24 * 60 * 60 * 1000);

  // Filter transactions for current period
  const currentPeriodTxns = data.txns.filter(t => {
    const date = new Date(t.date);
    return date >= periodDaysAgo && date <= now;
  });

  // Filter transactions for previous period
  const previousPeriodTxns = data.txns.filter(t => {
    const date = new Date(t.date);
    return date >= doublePeriodDaysAgo && date < periodDaysAgo;
  });

  // Classify transactions for both periods
  const currentClassification = classifyTransactions(currentPeriodTxns);
  const previousClassification = classifyTransactions(previousPeriodTxns);
  
  const totalIncome = currentClassification.totals.income;
  const totalExpenses = currentClassification.totals.expenses;
  const unspentIncome = totalIncome - totalExpenses;

  const previousIncome = previousClassification.totals.income;
  const previousExpenses = previousClassification.totals.expenses;

  // Calculate percentage changes
  const incomeChange = previousIncome > 0 
    ? ((totalIncome - previousIncome) / previousIncome) * 100
    : 0;

  const expensesChange = previousExpenses > 0
    ? ((totalExpenses - previousExpenses) / previousExpenses) * 100
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

  // For expenses, the color logic is inverted
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

  const handleSave = () => {
    const newIncome = parseFloat(editedIncome);
    if (!Number.isNaN(newIncome) && newIncome >= 0) {
      onUpdateIncome?.(newIncome);
      setIsEditing(false);
    }
  };

  return (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Income & Expenses Overview <span className="text-xs text-muted-foreground font-normal ml-2">(calculated from txns)</span></CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditedIncome(String(data.income.avgMonthly));
                setIsEditing(true);
              }}
              aria-label="Edit monthly income"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Total Income */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-muted-foreground">Total Income</span>
              </div>
              <p className="text-3xl font-bold text-success">
                ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1 text-sm">
                {getTrendIcon(incomeChange)}
                <span className={getTrendColor(incomeChange)}>
                  {incomeChange > 0 ? '+' : ''}{incomeChange.toFixed(1)}%
                </span>
                <span className="text-muted-foreground text-xs">vs prev {period}d</span>
              </div>
            </div>

            {/* Column 2: Total Expenses */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
              </div>
              <p className="text-3xl font-bold text-destructive">
                ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1 text-sm">
                {getExpenseTrendIcon(expensesChange)}
                <span className={getExpenseTrendColor(expensesChange)}>
                  {expensesChange > 0 ? '+' : ''}{expensesChange.toFixed(1)}%
                </span>
                <span className="text-muted-foreground text-xs">vs prev {period}d</span>
              </div>
            </div>

            {/* Column 3: Unspent Income */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Unspent Income</span>
              </div>
              <p className="text-3xl font-bold text-primary">
                ${unspentIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <div className="text-xs text-muted-foreground">
                Available for savings or investment
              </div>
            </div>
          </div>

          {/* Average Monthly Income Row */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Monthly Income</span>
              <span className="text-lg font-semibold">
                ${data.income.avgMonthly.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Income Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Average Monthly Income</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income</Label>
              <Input
                id="income"
                type="number"
                step="0.01"
                value={editedIncome}
                onChange={(e) => setEditedIncome(e.target.value)}
                placeholder="Enter monthly income"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
