import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DollarSign, Edit2, Check } from "lucide-react";

interface ExpenseBaselineCardProps {
  autoMonthlyExpenses: number;
  onExpensesConfirmed: (amount: number) => void;
}

export function ExpenseBaselineCard({ 
  autoMonthlyExpenses, 
  onExpensesConfirmed 
}: ExpenseBaselineCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [customAmount, setCustomAmount] = useState(autoMonthlyExpenses.toString());
  const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);

  const handleConfirm = () => {
    const amount = confirmedAmount || autoMonthlyExpenses;
    onExpensesConfirmed(amount);
  };

  const handleAdjust = () => {
    const amount = parseFloat(customAmount) || autoMonthlyExpenses;
    setConfirmedAmount(amount);
    setIsEditing(false);
    onExpensesConfirmed(amount);
  };

  const displayAmount = confirmedAmount || autoMonthlyExpenses;
  const annualAmount = displayAmount * 12;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Current Expense Baseline
        </CardTitle>
        <CardDescription>
          This reflects your current lifestyle based on analyzed transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Monthly Expenses</p>
            <p className="text-2xl font-bold text-foreground">
              ${displayAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Annual Expenses</p>
            <p className="text-2xl font-bold text-foreground">
              ${annualAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3 pt-4 border-t border-border">
            <Label htmlFor="custom-expenses">Custom Monthly Amount</Label>
            <div className="flex gap-2">
              <Input
                id="custom-expenses"
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <Button onClick={handleAdjust} size="icon">
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 pt-4 border-t border-border">
            {!confirmedAmount && (
              <Button onClick={handleConfirm} className="flex-1">
                Yes, this reflects my lifestyle
              </Button>
            )}
            <Button 
              onClick={() => setIsEditing(true)} 
              variant="outline"
              className="flex-1"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Adjust
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
