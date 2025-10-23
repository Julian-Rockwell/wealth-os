import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, AlertTriangle, CheckCircle, Edit3, Trash2, Check, X, Plus } from "lucide-react";
import type { Liability, LiabilityType } from "@/types/financial";
import { toast } from "sonner";

interface LiabilitiesTableProps {
  liabilities: Liability[];
  onUpdate?: (id: string, updates: Partial<Liability>) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
}

const getPriorityLevel = (apr: number) => {
  if (apr > 18) return { label: "URGENT", color: "destructive", icon: AlertCircle };
  if (apr >= 8) return { label: "Consider", color: "warning", icon: AlertTriangle };
  return { label: "Maintain", color: "success", icon: CheckCircle };
};

export const LiabilitiesTable = ({ liabilities, onUpdate, onDelete, onAdd }: LiabilitiesTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Liability>>({});

  const startEdit = (liability: Liability) => {
    setEditingId(liability.id);
    setEditForm(liability);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (editingId && onUpdate) {
      onUpdate(editingId, editForm);
      toast.success("Liability updated successfully");
      cancelEdit();
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete ${name}?`)) {
      onDelete?.(id);
      toast.success("Liability deleted successfully");
    }
  };

  if (!liabilities || liabilities.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-muted-foreground">0 Liabilities</h4>
          {onAdd && (
            <Button onClick={onAdd} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Liability
            </Button>
          )}
        </div>
        <div className="text-center py-8 text-muted-foreground">
          No liabilities data available. Click "Add Liability" to add your first liability.
        </div>
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
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-muted-foreground">
          {liabilities.length} {liabilities.length === 1 ? 'Liability' : 'Liabilities'}
        </h4>
        {onAdd && (
          <Button onClick={onAdd} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Liability
          </Button>
        )}
      </div>

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
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {liabilities
                .sort((a, b) => b.apr - a.apr)
                .map((liability) => {
                  const priority = getPriorityLevel(liability.apr);
                  const PriorityIcon = priority.icon;
                  
                  return (
                    <tr key={liability.id} className="hover:bg-muted/30 transition-colors">
                      {editingId === liability.id ? (
                        <>
                          <td className="p-3">
                            <Badge variant={getPriorityLevel(editForm.apr || 0).color as any} className="gap-1">
                              <PriorityIcon className="w-3 h-3" />
                              {getPriorityLevel(editForm.apr || 0).label}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Input
                              value={editForm.name || ""}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="h-8"
                            />
                          </td>
                          <td className="p-3">
                            <Select
                              value={editForm.type}
                              onValueChange={(value) => setEditForm({ ...editForm, type: value as LiabilityType })}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mortgage">Mortgage</SelectItem>
                                <SelectItem value="auto">Auto Loan</SelectItem>
                                <SelectItem value="student">Student Loan</SelectItem>
                                <SelectItem value="credit_card">Credit Card</SelectItem>
                                <SelectItem value="personal">Personal Loan</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              step="0.01"
                              value={editForm.apr || 0}
                              onChange={(e) => setEditForm({ ...editForm, apr: parseFloat(e.target.value) || 0 })}
                              className="h-8 text-right"
                            />
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              value={editForm.balance || 0}
                              onChange={(e) => setEditForm({ ...editForm, balance: parseFloat(e.target.value) || 0 })}
                              className="h-8 text-right"
                            />
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              value={editForm.monthlyPayment || 0}
                              onChange={(e) => setEditForm({ ...editForm, monthlyPayment: parseFloat(e.target.value) || 0 })}
                              className="h-8 text-right"
                            />
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              value={editForm.remainingTermMonths || 0}
                              onChange={(e) => setEditForm({ ...editForm, remainingTermMonths: parseInt(e.target.value) || 0 })}
                              className="h-8 text-right"
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1 justify-end">
                              <Button variant="ghost" size="icon" onClick={saveEdit} className="h-8 w-8">
                                <Check className="w-4 h-4 text-success" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={cancelEdit} className="h-8 w-8">
                                <X className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
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
                          <td className="p-3">
                            <div className="flex gap-1 justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => startEdit(liability)}
                                className="h-8 w-8"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(liability.id, liability.name)}
                                className="h-8 w-8"
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </>
                      )}
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
