import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import type { Transaction, TransactionCategory, DashboardFilters } from "@/types/dashboard";

interface TransactionsListProps {
  transactions: Transaction[];
  onUpdate: (id: string, updates: Partial<Transaction>) => void;
  onDelete: (id: string) => void;
  filters: DashboardFilters;
}

export const TransactionsList = ({ transactions, onUpdate, onDelete, filters }: TransactionsListProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCount, setShowCount] = useState(15);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [form, setForm] = useState({
    merchant: "",
    desc: "",
    date: "",
    amount: "",
    category: "need" as TransactionCategory,
    subcategory: "",
  });

  const filteredTransactions = transactions
    .filter((txn) => txn.sign === "debit")
    .filter((txn) => {
      if (filters.category && filters.category !== "all") {
        if (txn.category !== filters.category) return false;
      }
      if (filters.searchTerm) {
        const matchesSearch = 
          txn.merchant.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          txn.desc.toLowerCase().includes(filters.searchTerm.toLowerCase());
        if (!matchesSearch) return false;
      }
      if (filters.minConfidence !== undefined) {
        if (txn.confidence * 100 >= filters.minConfidence) return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedTransactions = filteredTransactions.slice(0, showCount);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>
              Review and categorize your spending. Low confidence items are flagged.
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2"
          >
            {isCollapsed ? (
              <>
                <span className="text-sm">Show</span>
                <ChevronDown className="w-4 h-4" />
              </>
            ) : (
              <>
                <span className="text-sm">Hide</span>
                <ChevronUp className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent>
          <div className="space-y-2">
            {displayedTransactions.map((txn) => (
              <div
                key={txn.id}
                className={`p-3 rounded-lg border transition-colors hover:bg-secondary/30 ${
                  txn.confidence < 0.8 ? "bg-warning/5 border-warning/20" : "bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {txn.confidence < 0.8 && (
                        <AlertCircle className="w-4 h-4 text-warning flex-shrink-0" />
                      )}
                      <span className="font-medium truncate">{txn.merchant}</span>
                      <Badge variant="outline" className="text-xs ml-auto flex-shrink-0">
                        {(txn.confidence * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{new Date(txn.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>•</span>
                      <span className="truncate">{txn.subcategory}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-semibold text-lg">
                      ${txn.amount.toFixed(2)}
                    </span>
                    <Select
                      value={txn.category}
                      onValueChange={(value) => {
                        onUpdate(txn.id, { category: value as TransactionCategory });
                      }}
                    >
                      <SelectTrigger className="h-8 w-24 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="need">Need</SelectItem>
                        <SelectItem value="want">Want</SelectItem>
                        <SelectItem value="saving">Saving</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setEditing(txn);
                        setForm({
                          merchant: txn.merchant,
                          desc: txn.desc,
                          date: txn.date,
                          amount: String(txn.amount),
                          category: txn.category,
                          subcategory: txn.subcategory,
                        });
                      }}
                      aria-label={`Edit ${txn.merchant}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => {
                        if (confirm("Delete this transaction?")) onDelete(txn.id);
                      }}
                      aria-label={`Delete ${txn.merchant}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length > showCount && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCount(prev => prev + 15)}
              >
                Load More ({filteredTransactions.length - showCount} remaining)
              </Button>
            </div>
          )}

          {filteredTransactions.length > 0 && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing {displayedTransactions.length} of {filteredTransactions.length} transactions
            </div>
          )}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found matching your filters.
            </div>
          )}
        </CardContent>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="merchant">Merchant</Label>
              <Input id="merchant" value={form.merchant} onChange={(e) => setForm({ ...form, merchant: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="desc">Description</Label>
              <Input id="desc" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) => setForm({ ...form, category: value as TransactionCategory })}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="need">Need</SelectItem>
                  <SelectItem value="want">Want</SelectItem>
                  <SelectItem value="saving">Saving</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input id="subcategory" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button
              onClick={() => {
                if (!editing) return;
                const amountNum = parseFloat(form.amount);
                if (Number.isNaN(amountNum) || amountNum < 0) return;
                onUpdate(editing.id, {
                  merchant: form.merchant.trim(),
                  desc: form.desc.trim(),
                  date: form.date,
                  amount: amountNum,
                  category: form.category,
                  subcategory: form.subcategory.trim(),
                });
                setEditing(null);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {isCollapsed && (
        <CardContent>
          <div className="text-center text-sm text-muted-foreground py-4">
            {filteredTransactions.length} transactions hidden. Click Show to view.
          </div>
        </CardContent>
      )}
    </Card>
  );
};
