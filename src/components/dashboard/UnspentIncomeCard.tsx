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
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Unspent Income</CardTitle>
                <CardDescription>
                  Income not allocated to expenses in this {period}-day period
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditedIncome(String(data.income.avgMonthly));
                setIsEditing(true);
              }}
              aria-label="Edit income"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Unspent Income Display */}
            <div className="p-4 rounded-lg bg-background/50 border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Unspent</span>
                <span className={`text-2xl font-bold ${unspentIncome >= 0 ? 'text-success' : 'text-destructive'}`}>
                  ${Math.abs(unspentIncome).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              {unspentIncome < 0 && (
                <p className="text-xs text-destructive mt-2">
                  You've spent ${Math.abs(unspentIncome).toFixed(2)} more than your income
                </p>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded bg-background/30">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">Total Income ({period} days)</span>
                </div>
                <span className="font-semibold">
                  ${totalIncomeForPeriod.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-background/30">
                <span className="text-muted-foreground">Total Expenses ({period} days)</span>
                <span className="font-semibold text-destructive">
                  -${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-background/30 border-t pt-3 mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Avg Monthly Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted-foreground">
                    ${data.income.avgMonthly.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      setEditedIncome(String(data.income.avgMonthly));
                      setIsEditing(true);
                    }}
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
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
