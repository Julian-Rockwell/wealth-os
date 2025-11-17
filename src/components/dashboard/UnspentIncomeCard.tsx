import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, DollarSign, TrendingUp } from "lucide-react";
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

  // Calculate date range for the period
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - period);

  // Filter transactions for the current period
  const periodTransactions = data.txns.filter(txn => {
    const txnDate = new Date(txn.date);
    return txnDate >= startDate && txnDate <= endDate;
  });

  // Classify transactions to get real income and expenses for the period
  const classified = classifyTransactions(periodTransactions);
  
  const totalIncomeForPeriod = classified.totals.income;
  const totalExpenses = classified.totals.expenses;
  const unspentIncome = totalIncomeForPeriod - totalExpenses;

  const handleSave = () => {
    const newIncome = parseFloat(editedIncome);
    if (!Number.isNaN(newIncome) && newIncome >= 0) {
      onUpdateIncome?.(newIncome);
      setIsEditing(false);
    }
  };

  return (
    <>
      <Card className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 shadow-sm">
        <div className="p-6">
          {/* Header with title and edit button */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Unspent Income <span className="text-xs text-muted-foreground font-normal ml-2">(strange calculation)</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Income not allocated to expenses in this {period}-day period
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditedIncome(String(data.income.avgMonthly));
                setIsEditing(true);
              }}
              className="h-8 w-8"
              aria-label="Edit income"
            >
              <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </Button>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column: Income, Expenses, Avg Monthly Income */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">Total Income ({period} days)</span>
                </div>
                <span className="font-semibold text-success">
                  ${totalIncomeForPeriod.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                <span className="text-sm text-muted-foreground">Total Expenses ({period} days)</span>
                <span className="font-semibold text-destructive">
                  -${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                <span className="text-sm text-muted-foreground">Avg Monthly Income</span>
                <span className="font-semibold">
                  ${data.income.avgMonthly.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Right column: Large Unspent Income */}
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gradient-to-br from-success/10 to-success/20 border-2 border-success/30">
              <span className="text-sm text-muted-foreground mb-2">Unspent</span>
              <p className="text-4xl font-bold tracking-tight text-success">
                ${unspentIncome.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Income Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Monthly Income</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-income">Average Monthly Income</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="monthly-income"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editedIncome}
                  onChange={(e) => setEditedIncome(e.target.value)}
                  className="pl-7"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                This will update your average monthly income used for calculations
              </p>
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
