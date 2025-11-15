import { Card } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import type { Liability } from "@/types/financial";

interface LiabilitiesKPICardProps {
  totalLiabilities: number;
  liabilities: Liability[];
}

export const LiabilitiesKPICard = ({ totalLiabilities, liabilities }: LiabilitiesKPICardProps) => {
  // Calculate monthly payment total
  const totalMonthlyPayment = liabilities.reduce((sum, l) => sum + l.monthlyPayment, 0);
  
  // Calculate weighted average APR
  const weightedAPR = totalLiabilities > 0
    ? liabilities.reduce((sum, l) => sum + (l.apr * l.balance), 0) / totalLiabilities
    : 0;

  return (
    <Card className="p-6 shadow-sm border-l-4 border-l-destructive">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Total Liabilities</h3>
        <TrendingDown className="w-4 h-4 text-destructive" />
      </div>
      <p className="text-3xl font-bold tracking-tight text-destructive mb-4">
        ${totalLiabilities.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
      
      <div className="space-y-1.5 pt-3 border-t">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Monthly Payment</span>
          <span className="text-sm font-semibold">
            ${totalMonthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Weighted Avg APR</span>
          <span className="text-sm font-semibold">{weightedAPR.toFixed(2)}%</span>
        </div>
      </div>
    </Card>
  );
};
