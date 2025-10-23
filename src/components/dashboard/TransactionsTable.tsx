import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Transaction, TransactionCategory, DashboardFilters } from "@/types/dashboard";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

interface TransactionsTableProps {
  transactions: Transaction[];
  onUpdate: (id: string, updates: Partial<Transaction>) => void;
  filters: DashboardFilters;
}

export const TransactionsTable = ({ transactions, onUpdate, filters }: TransactionsTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredTransactions = transactions
    .filter((txn) => txn.sign === "debit")
    .filter((txn) => {
      if (filters.searchTerm) {
        return txn.merchant.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
               txn.desc.toLowerCase().includes(filters.searchTerm.toLowerCase());
      }
      return true;
    })
    .slice(0, 50); // Show first 50 transactions

  const getCategoryColor = (category: TransactionCategory) => {
    switch (category) {
      case "need": return "bg-needs";
      case "want": return "bg-wants";
      case "saving": return "bg-savings";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="shadow-soft overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Transactions</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Click any category to edit. Low confidence transactions are highlighted.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2"
        >
          {isCollapsed ? (
            <>
              <span className="text-sm">Expand</span>
              <ChevronDown className="w-4 h-4" />
            </>
          ) : (
            <>
              <span className="text-sm">Collapse</span>
              <ChevronUp className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
      
      {!isCollapsed && (
        <>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-secondary/50 text-xs sticky top-0">
                <tr>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Merchant</th>
                  <th className="text-right p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Category</th>
                  <th className="text-left p-3 font-medium">Subcategory</th>
                  <th className="text-right p-3 font-medium">Confidence</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className={`border-b hover:bg-secondary/30 transition-colors ${
                      txn.confidence < 0.8 ? "bg-warning/5" : ""
                    }`}
                  >
                    <td className="p-3 whitespace-nowrap">
                      {new Date(txn.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {txn.confidence < 0.8 && (
                          <AlertCircle className="w-4 h-4 text-warning flex-shrink-0" />
                        )}
                        <span className="truncate max-w-[200px]">{txn.merchant}</span>
                      </div>
                    </td>
                    <td className="p-3 text-right font-medium">${txn.amount.toFixed(2)}</td>
                    <td className="p-3">
                      <Select
                        value={txn.category}
                        onValueChange={(value) => {
                          onUpdate(txn.id, { category: value as TransactionCategory });
                        }}
                      >
                        <SelectTrigger className="h-7 w-24 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="need">Need</SelectItem>
                          <SelectItem value="want">Want</SelectItem>
                          <SelectItem value="saving">Saving</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3">
                      <span className="text-xs text-muted-foreground">{txn.subcategory}</span>
                    </td>
                    <td className="p-3 text-right">
                      <Badge
                        variant={txn.confidence >= 0.8 ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {(txn.confidence * 100).toFixed(0)}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 50 && (
            <div className="p-4 text-center text-sm text-muted-foreground border-t">
              Showing first 50 transactions. Use filters to narrow results.
            </div>
          )}
        </>
      )}
      
      {isCollapsed && (
        <div className="p-4 text-center text-sm text-muted-foreground">
          {filteredTransactions.length} transactions hidden. Click Expand to view.
        </div>
      )}
    </Card>
  );
};
