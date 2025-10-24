import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Transaction, TransactionCategory, DashboardFilters } from "@/types/dashboard";
import { AlertCircle, ChevronDown, ChevronUp, Edit2, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TransactionsTableProps {
  transactions: Transaction[];
  onUpdate: (id: string, updates: Partial<Transaction>) => void;
  onDelete?: (id: string) => void;
  filters: DashboardFilters;
}

export const TransactionsTable = ({ transactions, onUpdate, onDelete, filters }: TransactionsTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editMerchant, setEditMerchant] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const startEditing = (txn: Transaction) => {
    setEditingId(txn.id);
    setEditAmount(txn.amount.toString());
    setEditMerchant(txn.merchant);
  };

  const saveEditing = () => {
    if (editingId) {
      onUpdate(editingId, {
        amount: parseFloat(editAmount) || 0,
        merchant: editMerchant,
      });
      setEditingId(null);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditAmount("");
    setEditMerchant("");
  };

  const filteredTransactions = transactions
    .filter((txn) => txn.sign === "debit")
    .filter((txn) => {
      if (filters.searchTerm) {
        const matchesSearch = txn.merchant.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
               txn.desc.toLowerCase().includes(filters.searchTerm.toLowerCase());
        if (!matchesSearch) return false;
      }
      if (filters.minConfidence !== undefined) {
        // Filter for confidence LESS than the threshold
        if (txn.confidence * 100 >= filters.minConfidence) return false;
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
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold">Transaction Details</h4>
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
              <thead className="bg-secondary text-xs sticky top-0 z-10">
                <tr>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Merchant</th>
                  <th className="text-right p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Category</th>
                  <th className="text-left p-3 font-medium">Subcategory</th>
                  <th className="text-right p-3 font-medium">Confidence</th>
                  <th className="text-center p-3 font-medium">Actions</th>
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
                      {editingId === txn.id ? (
                        <Input
                          value={editMerchant}
                          onChange={(e) => setEditMerchant(e.target.value)}
                          className="h-7 w-full text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          {txn.confidence < 0.8 && (
                            <AlertCircle className="w-4 h-4 text-warning flex-shrink-0" />
                          )}
                          <span className="truncate max-w-[200px]">{txn.merchant}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-right font-medium">
                      {editingId === txn.id ? (
                        <Input
                          type="number"
                          step="0.01"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="h-7 w-24 text-sm text-right"
                        />
                      ) : (
                        `$${txn.amount.toFixed(2)}`
                      )}
                    </td>
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
                    <td className="p-3">
                      {editingId === txn.id ? (
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={saveEditing}
                            className="h-7 w-7 p-0"
                          >
                            <Check className="w-4 h-4 text-success" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEditing}
                            className="h-7 w-7 p-0"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditing(txn)}
                            className="h-7 w-7 p-0"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          {onDelete && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                onDelete(txn.id);
                                toast.success("Transaction deleted");
                              }}
                              className="h-7 w-7 p-0"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 50 && (
            <div className="text-center text-sm text-muted-foreground border-t pt-4">
              Showing first 50 transactions. Use filters to narrow results.
            </div>
          )}
        </>
      )}
      
      {isCollapsed && (
        <div className="text-center text-sm text-muted-foreground py-4">
          {filteredTransactions.length} transactions hidden. Click Expand to view.
        </div>
      )}
    </div>
  );
};
