import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit3, Trash2, Plus } from "lucide-react";
import type { Holding } from "@/types/financial";
import { toast } from "sonner";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface HoldingsTableProps {
  holdings: Holding[];
  onUpdate?: (id: string, updates: Partial<Holding>) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
}

export const HoldingsTable = ({ holdings, onUpdate, onDelete, onAdd }: HoldingsTableProps) => {
  const [editingCell, setEditingCell] = useState<{ id: string; field: keyof Holding } | null>(null);
  const [cellValue, setCellValue] = useState<any>("");

  const getLiquidityColor = (liquidity: string) => {
    switch (liquidity) {
      case "liquid": return "bg-success/10 text-success";
      case "semi_liquid": return "bg-warning/10 text-warning";
      case "illiquid": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const startCellEdit = (id: string, field: keyof Holding, currentValue: any) => {
    setEditingCell({ id, field });
    setCellValue(currentValue);
  };

  const saveCellEdit = () => {
    if (editingCell && onUpdate) {
      onUpdate(editingCell.id, { [editingCell.field]: cellValue });
      toast.success("Asset updated");
    }
    setEditingCell(null);
  };

  const isEditing = (id: string, field: keyof Holding) => editingCell?.id === id && editingCell?.field === field;

  const renderEditableCell = (holding: Holding, field: keyof Holding, displayValue: any, inputType: 'text' | 'number' | 'select' = 'text', selectOptions?: { value: string; label: string }[]) => {
    if (isEditing(holding.id, field)) {
      if (inputType === 'select') {
        return (
          <Select value={cellValue} onValueChange={(val) => { setCellValue(val); setTimeout(() => { onUpdate?.(holding.id, { [field]: val }); toast.success("Asset updated"); setEditingCell(null); }, 100); }}>
            <SelectTrigger className="h-8 w-full"><SelectValue /></SelectTrigger>
            <SelectContent>{selectOptions?.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
          </Select>
        );
      }
      return <Input type={inputType} value={cellValue} onChange={(e) => setCellValue(inputType === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)} onBlur={saveCellEdit} onKeyDown={(e) => { if (e.key === 'Enter') saveCellEdit(); if (e.key === 'Escape') setEditingCell(null); }} autoFocus className="h-8" />;
    }
    return <div onClick={() => startCellEdit(holding.id, field, holding[field])} className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded group flex items-center gap-2"><span>{displayValue}</span><Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" /></div>;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium text-muted-foreground">{holdings.length} {holdings.length === 1 ? 'Asset' : 'Assets'} <span className="text-xs font-normal">(from snapshot data)</span></h4>
        {onAdd && <Button onClick={onAdd} variant="outline" size="sm"><Plus className="w-4 h-4 mr-2" />Add Asset</Button>}
      </div>
      {holdings.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No holdings data available.</p> : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Account Type</TableHead><TableHead>Asset Class</TableHead><TableHead><div className="flex items-center gap-1">Liquidity<InfoTooltip content={<div className="space-y-2"><div className="font-semibold mb-2">Liquidity Classification:</div></div>} /></div></TableHead><TableHead className="text-right">Balance</TableHead><TableHead>Source</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow key={holding.id}>
                  <TableCell>{renderEditableCell(holding, 'name', holding.name, 'text')}</TableCell>
                  <TableCell>{renderEditableCell(holding, 'accountType', holding.accountType.replace('_', ' '), 'select', [{ value: 'checking', label: 'Checking' }, { value: 'savings', label: 'Savings' }, { value: 'brokerage', label: 'Brokerage' }, { value: 'other', label: 'Other' }])}</TableCell>
                  <TableCell>{renderEditableCell(holding, 'assetClass', holding.assetClass, 'select', [{ value: 'cash', label: 'Cash' }, { value: 'stocks', label: 'Stocks' }, { value: 'other', label: 'Other' }])}</TableCell>
                  <TableCell>{isEditing(holding.id, 'liquidity') ? renderEditableCell(holding, 'liquidity', holding.liquidity, 'select', [{ value: 'liquid', label: 'Liquid' }, { value: 'semi_liquid', label: 'Semi Liquid' }, { value: 'illiquid', label: 'Illiquid' }]) : <div onClick={() => startCellEdit(holding.id, 'liquidity', holding.liquidity)} className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded group inline-flex items-center gap-2"><Badge className={getLiquidityColor(holding.liquidity)}>{holding.liquidity.replace('_', ' ')}</Badge><Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-50" /></div>}</TableCell>
                  <TableCell className="text-right">{renderEditableCell(holding, 'balance', `$${holding.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'number')}</TableCell>
                  <TableCell><Badge variant="outline">{holding.source}</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm" onClick={() => { if (confirm(`Delete ${holding.name}?`)) { onDelete?.(holding.id); toast.success("Asset deleted"); } }}><Trash2 className="w-4 h-4 text-destructive" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {holdings.length > 0 && <div className="mt-4 pt-4 border-t flex justify-end"><p className="text-sm text-muted-foreground">Total Assets: <span className="font-semibold text-foreground">${holdings.reduce((sum, h) => sum + h.balance, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></p></div>}
    </>
  );
};
