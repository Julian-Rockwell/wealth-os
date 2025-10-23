import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import type { Liability } from "@/types/financial";

interface LiabilitiesTableProps {
  liabilities: Liability[];
  onUpdate?: (liability: Liability) => void;
}

const getPriorityLevel = (apr: number) => {
  if (apr > 18) return { label: "URGENT", color: "destructive", icon: AlertCircle };
  if (apr >= 8) return { label: "Consider", color: "warning", icon: AlertTriangle };
  return { label: "Maintain", color: "success", icon: CheckCircle };
};

export const LiabilitiesTable = ({ liabilities, onUpdate }: LiabilitiesTableProps) => {
  if (!liabilities || liabilities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No liabilities data available
      </div>
    );
  }

  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.balance, 0);
  const totalMonthlyPayment = liabilities.reduce((sum, l) => sum + l.monthlyPayment, 0);
  
  // Calculate weighted average APR
  const weightedAPR = liabilities.reduce((sum, l) => sum + (l.apr * l.balance), 0) / totalLiabilities;

  // Group by type
  const byType = liabilities.reduce((acc, l) => {
    if (!acc[l.type]) {
      acc[l.type] = { balance: 0, count: 0 };
    }
    acc[l.type].balance += l.balance;
    acc[l.type].count += 1;
    return acc;
  }, {} as Record<string, { balance: number; count: number }>);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Total Debt</p>
          <p className="text-lg font-bold text-destructive">
            ${totalLiabilities.toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </p>
        </div>
        <div className="p-4 rounded-lg border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
          <p className="text-lg font-bold">
            ${totalMonthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </p>
        </div>
        <div className="p-4 rounded-lg border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Weighted Avg APR</p>
          <p className="text-lg font-bold">
            {weightedAPR.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Liabilities Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Priority</th>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-right p-3 font-medium">APR</th>
                <th className="text-right p-3 font-medium">Balance</th>
                <th className="text-right p-3 font-medium">Monthly Payment</th>
                <th className="text-right p-3 font-medium">Term (mo)</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {liabilities
                .sort((a, b) => b.apr - a.apr) // Sort by APR descending
                .map((liability) => {
                  const priority = getPriorityLevel(liability.apr);
                  const PriorityIcon = priority.icon;
                  
                  return (
                    <tr key={liability.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <Badge variant={priority.color as any} className="gap-1">
                          <PriorityIcon className="w-3 h-3" />
                          {priority.label}
                        </Badge>
                      </td>
                      <td className="p-3 font-medium">{liability.name}</td>
                      <td className="p-3 capitalize">{liability.type.replace("_", " ")}</td>
                      <td className="p-3 text-right">
                        <span className="font-semibold">
                          {liability.apr.toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-3 text-right font-medium">
                        ${liability.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-3 text-right">
                        ${liability.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-3 text-right">
                        {liability.remainingTermMonths}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Breakdown by Type */}
      <div className="p-4 rounded-lg border bg-muted/30">
        <h4 className="text-sm font-medium mb-3">Breakdown by Type</h4>
        <div className="space-y-2">
          {Object.entries(byType).map(([type, data]) => (
            <div key={type} className="flex justify-between items-center text-sm">
              <span className="capitalize">{type.replace("_", " ")} ({data.count})</span>
              <span className="font-semibold">
                ${data.balance.toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Legend */}
      <div className="p-4 rounded-lg border bg-card">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Priority Levels</h4>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <div>
              <p className="font-semibold">URGENT</p>
              <p className="text-muted-foreground">&gt;18% APR</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <div>
              <p className="font-semibold">Consider</p>
              <p className="text-muted-foreground">8-18% APR</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            <div>
              <p className="font-semibold">Maintain</p>
              <p className="text-muted-foreground">&lt;8% APR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
