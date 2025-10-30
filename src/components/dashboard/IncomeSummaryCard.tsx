import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, DollarSign } from "lucide-react";
import type { DashboardData, Transaction } from "@/types/dashboard";

interface IncomeSummaryCardProps {
  data: DashboardData;
  period: 30 | 60 | 90;
  onUpdate: (id: string, updates: Partial<Transaction>) => void;
}

export const IncomeSummaryCard = ({ data, period, onUpdate }: IncomeSummaryCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedTransactions, setEditedTransactions] = useState<Record<string, number>>({});

  // Calculate date range based on period
  const now = new Date();
  const periodDaysAgo = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);

  // Filter income transactions for current period
  const incomeTransactions = data.txns.filter(t => {
    const date = new Date(t.date);
    const subcategory = t.subcategory?.toLowerCase() || "";
    return t.sign === "credit" && 
           date >= periodDaysAgo && 
           date <= now &&
           (subcategory.includes("income") || subcategory.includes("payroll") || subcategory.includes("salary"));
  });

  // Calculate average monthly income
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const months = period / 30;
  const avgMonthlyIncome = totalIncome / months;

  // Calculate new average with edited values
  const getNewAvgIncome = () => {
    const editedTotal = incomeTransactions.reduce((sum, t) => {
      const amount = editedTransactions[t.id] !== undefined ? editedTransactions[t.id] : t.amount;
      return sum + amount;
    }, 0);
    return editedTotal / months;
  };

  const handleAmountChange = (id: string, amount: number) => {
    setEditedTransactions(prev => ({ ...prev, [id]: amount }));
  };

  const handleSave = () => {
    // Update all edited transactions
    Object.entries(editedTransactions).forEach(([id, amount]) => {
      onUpdate(id, { amount });
    });
    
    // Reset and close
    setEditedTransactions({});
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setEditedTransactions({});
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Average Monthly Income</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-5 h-5 text-success" />
          <p className="text-3xl font-bold text-success">
            ${avgMonthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Based on {incomeTransactions.length} income transaction{incomeTransactions.length !== 1 ? 's' : ''} in last {period} days
        </p>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Edit Income Sources</DialogTitle>
            <DialogDescription>
              Review and edit your income transactions. Changes will recalculate your budget analysis.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {incomeTransactions.map(txn => (
                <div key={txn.id} className="border-b pb-3 last:border-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{txn.desc}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(txn.date).toLocaleDateString()} • {txn.merchant}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">$</span>
                      <Input 
                        type="number" 
                        value={editedTransactions[txn.id] !== undefined ? editedTransactions[txn.id] : txn.amount}
                        onChange={(e) => handleAmountChange(txn.id, parseFloat(e.target.value) || 0)}
                        className="w-32 h-9"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <DialogFooter className="flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">New Average Monthly Income:</p>
              <p className="text-lg font-bold text-success">
                ${getNewAvgIncome().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};