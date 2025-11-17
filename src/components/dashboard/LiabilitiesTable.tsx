import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, AlertTriangle, CheckCircle, Edit3, Trash2, Plus } from "lucide-react";
import type { Liability } from "@/types/financial";
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
  const [editingCell, setEditingCell] = useState<{ id: string; field: keyof Liability } | null>(null);
  const [cellValue, setCellValue] = useState<any>("");

  const isEditing = (id: string, field: keyof Liability) => editingCell?.id === id && editingCell?.field === field;

  const renderEditableCell = (liability: Liability, field: keyof Liability, displayValue: any, inputType: 'text' | 'number' | 'select' = 'text', selectOptions?: { value: string; label: string }[]) => {
    if (isEditing(liability.id, field)) {
      if (inputType === 'select') return <Select value={cellValue} onValueChange={(val) => { setCellValue(val); setTimeout(() => { onUpdate?.(liability.id, { [field]: val }); toast.success("Updated"); setEditingCell(null); }, 100); }}><SelectTrigger className="h-8"><SelectValue /></SelectTrigger><SelectContent>{selectOptions?.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent></Select>;
      return <Input type={inputType} value={cellValue} onChange={(e) => setCellValue(inputType === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)} onBlur={() => { if (editingCell && onUpdate) { onUpdate(editingCell.id, { [editingCell.field]: cellValue }); toast.success("Updated"); } setEditingCell(null); }} onKeyDown={(e) => { if (e.key === 'Enter') { onUpdate?.(liability.id, { [field]: cellValue }); setEditingCell(null); } }} autoFocus className="h-8" />;
    }
    return <div onClick={() => { setEditingCell({ id: liability.id, field }); setCellValue(liability[field]); }} className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded group flex items-center gap-2"><span>{displayValue}</span><Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-50" /></div>;
  };

  if (!liabilities?.length) return <div className="space-y-4"><div className="flex justify-between items-center"><h4 className="text-sm font-medium text-muted-foreground">0 Liabilities</h4>{onAdd && <Button onClick={onAdd} variant="outline" size="sm"><Plus className="w-4 h-4 mr-2" />Add Liability</Button>}</div><div className="text-center py-8 text-muted-foreground">No liabilities data.</div></div>;

  const total = liabilities.reduce((sum, l) => sum + l.balance, 0);
  const totalPayment = liabilities.reduce((sum, l) => sum + l.monthlyPayment, 0);
  const weightedAPR = liabilities.reduce((sum, l) => sum + (l.apr * l.balance), 0) / total;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><h4 className="text-sm font-medium text-muted-foreground">{liabilities.length} Liabilities <span className="text-xs font-normal">(from snapshot data)</span></h4>{onAdd && <Button onClick={onAdd} variant="outline" size="sm"><Plus className="w-4 h-4 mr-2" />Add Liability</Button>}</div>
      <div className="grid grid-cols-3 gap-4"><div className="p-4 rounded-lg border bg-card"><p className="text-xs text-muted-foreground mb-1">Total Debt</p><p className="text-lg font-bold text-destructive">${total.toLocaleString()}</p></div><div className="p-4 rounded-lg border bg-card"><p className="text-xs text-muted-foreground mb-1">Monthly Payment</p><p className="text-lg font-bold">${totalPayment.toLocaleString()}</p></div><div className="p-4 rounded-lg border bg-card"><p className="text-xs text-muted-foreground mb-1">Weighted Avg APR</p><p className="text-lg font-bold">{weightedAPR.toFixed(2)}%</p></div></div>
      <Table><TableHeader><TableRow><TableHead>Priority</TableHead><TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead className="text-right">APR</TableHead><TableHead className="text-right">Balance</TableHead><TableHead className="text-right">Monthly</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{liabilities.map((l) => { const p = getPriorityLevel(l.apr); const Icon = p.icon; return <TableRow key={l.id}><TableCell><Badge variant={p.color as any}><Icon className="w-3 h-3" />{p.label}</Badge></TableCell><TableCell>{renderEditableCell(l, 'name', l.name, 'text')}</TableCell><TableCell>{renderEditableCell(l, 'type', l.type.replace('_', ' '), 'select', [{ value: 'mortgage', label: 'Mortgage' }, { value: 'auto_loan', label: 'Auto Loan' }, { value: 'credit_card', label: 'Credit Card' }, { value: 'other', label: 'Other' }])}</TableCell><TableCell className="text-right">{renderEditableCell(l, 'apr', `${l.apr.toFixed(2)}%`, 'number')}</TableCell><TableCell className="text-right">{renderEditableCell(l, 'balance', `$${l.balance.toLocaleString()}`, 'number')}</TableCell><TableCell className="text-right">{renderEditableCell(l, 'monthlyPayment', `$${l.monthlyPayment.toLocaleString()}`, 'number')}</TableCell><TableCell className="text-right"><Button variant="ghost" size="sm" onClick={() => { if (confirm(`Delete ${l.name}?`)) { onDelete?.(l.id); toast.success("Deleted"); } }}><Trash2 className="w-4 h-4 text-destructive" /></Button></TableCell></TableRow>; })}</TableBody></Table>
    </div>
  );
};
