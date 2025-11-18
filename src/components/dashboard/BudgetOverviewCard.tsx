import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, Pencil } from "lucide-react";
import { BudgetDonut } from "./BudgetDonut";
import { MonthlyStackedBars } from "./MonthlyStackedBars";
import type { DashboardData } from "@/types/dashboard";
import type { ViewMode } from "@/pages/Dashboard";

interface BudgetOverviewCardProps {
  data: DashboardData;
  period: 30 | 60 | 90;
  setPeriod: (period: 30 | 60 | 90) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onUpdateIncome: (newIncome: number) => void;
}

export const BudgetOverviewCard = ({
  data,
  period,
  setPeriod,
  viewMode,
  setViewMode,
  onUpdateIncome,
}: BudgetOverviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIncome, setEditedIncome] = useState(data.income.avgMonthly.toString());

  // Calculate deltas for current vs previous period
  const currentPeriodTxns = data.txns;
  
  // Get previous period transactions (same duration, shifted back)
  const oldestDate = new Date(Math.min(...currentPeriodTxns.map(t => new Date(t.date).getTime())));
  const newestDate = new Date(Math.max(...currentPeriodTxns.map(t => new Date(t.date).getTime())));
  const periodDays = Math.round((newestDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const previousPeriodStart = new Date(oldestDate);
  previousPeriodStart.setDate(previousPeriodStart.getDate() - periodDays);
  const previousPeriodEnd = new Date(oldestDate);
  
  const previousPeriodTxns = data.txns.filter(t => {
    const txDate = new Date(t.date);
    return txDate >= previousPeriodStart && txDate < previousPeriodEnd;
  });

  // Calculate totals for both periods
  const currentIncome = currentPeriodTxns
    .filter(t => t.sign === "credit")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const previousIncome = previousPeriodTxns
    .filter(t => t.sign === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentExpenses = currentPeriodTxns
    .filter(t => t.sign === "debit")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const previousExpenses = previousPeriodTxns
    .filter(t => t.sign === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const unspentIncome = currentIncome - currentExpenses;

  // Calculate percentage changes
  const incomeChange = previousIncome > 0 
    ? ((currentIncome - previousIncome) / previousIncome) * 100 
    : 0;
  
  const expensesChange = previousExpenses > 0 
    ? ((currentExpenses - previousExpenses) / previousExpenses) * 100 
    : 0;

  const getTrendIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (change: number) => {
    return change >= 0 ? "text-success" : "text-destructive";
  };

  const getExpenseTrendIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  const getExpenseTrendColor = (change: number) => {
    return change >= 0 ? "text-destructive" : "text-success";
  };

  const handleSave = () => {
    const newIncome = parseFloat(editedIncome);
    if (!isNaN(newIncome) && newIncome > 0) {
      onUpdateIncome(newIncome);
      setIsEditing(false);
    }
  };

  const views: Array<{ id: ViewMode; label: string }> = [
    { id: "category", label: "50/30/20" },
    { id: "subcategory", label: "Subcategory" },
    { id: "merchant", label: "Merchant" },
    { id: "liquidity", label: "Liquidity" },
  ];

  return (
    <Card className="shadow-soft">
      <CardContent className="p-6">
        {/* Section 1: Period Selector */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-muted-foreground">Period:</span>
          <div className="flex gap-2">
            {[30, 60, 90].map((days) => (
              <Button
                key={days}
                variant={period === days ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod(days as 30 | 60 | 90)}
              >
                {days}d
              </Button>
            ))}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Section 2: Income/Expenses/Unspent */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Income & Expenses Overview
              <span className="text-xs text-muted-foreground font-normal ml-2">
                (calculated from transactions)
              </span>
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              title="Edit monthly income"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Total Income */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Income</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-success">
                  ${currentIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              {previousIncome > 0 && (
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(incomeChange)}`}>
                  {getTrendIcon(incomeChange)({ className: "w-4 h-4" })}
                  <span className="font-medium">
                    {Math.abs(incomeChange).toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground text-xs">vs prev {period}d</span>
                </div>
              )}
            </div>

            {/* Total Expenses */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-destructive">
                  ${currentExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              {previousExpenses > 0 && (
                <div className={`flex items-center gap-1 text-sm ${getExpenseTrendColor(expensesChange)}`}>
                  {getExpenseTrendIcon(expensesChange)({ className: "w-4 h-4" })}
                  <span className="font-medium">
                    {Math.abs(expensesChange).toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground text-xs">vs prev {period}d</span>
                </div>
              )}
            </div>

            {/* Unspent Income */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Unspent Income</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">
                  ${unspentIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {((unspentIncome / currentIncome) * 100).toFixed(1)}% of income
              </p>
            </div>
          </div>
          
          {/* Average Monthly Income Row */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Monthly Income:</span>
              <span className="text-lg font-semibold">
                ${data.income.avgMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Section 3: Spending Breakdown */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold">
              Spending Breakdown
              <span className="text-xs text-muted-foreground font-normal ml-2">
                (calculated from transactions)
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {views.map((view) => (
                <Button
                  key={view.id}
                  variant={viewMode === view.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode(view.id)}
                >
                  {view.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BudgetDonut data={data} viewMode={viewMode} period={period} />
            <MonthlyStackedBars data={data} viewMode={viewMode} period={period} />
          </div>
        </div>
      </CardContent>

      {/* Edit Income Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Average Monthly Income</DialogTitle>
            <DialogDescription>
              Update your average monthly income to improve budget calculations and recommendations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
              <Input
                id="monthlyIncome"
                type="number"
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
    </Card>
  );
};
