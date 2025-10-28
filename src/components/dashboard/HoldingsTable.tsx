import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit3, Trash2, Check, X, Plus } from "lucide-react";
import type { Holding, AccountType, AssetClass, Liquidity } from "@/types/financial";
import { toast } from "sonner";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface HoldingsTableProps {
  holdings: Holding[];
  onUpdate?: (id: string, updates: Partial<Holding>) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
}

export const HoldingsTable = ({ holdings, onUpdate, onDelete, onAdd }: HoldingsTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Holding>>({});

  const getLiquidityColor = (liquidity: string) => {
    switch (liquidity) {
      case "liquid":
        return "bg-success/10 text-success";
      case "semi_liquid":
        return "bg-warning/10 text-warning";
      case "illiquid":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const startEdit = (holding: Holding) => {
    setEditingId(holding.id);
    setEditForm(holding);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (editingId && onUpdate) {
      onUpdate(editingId, editForm);
      toast.success("Asset updated successfully");
      cancelEdit();
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete ${name}?`)) {
      onDelete?.(id);
      toast.success("Asset deleted successfully");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium text-muted-foreground">
          {holdings.length} {holdings.length === 1 ? 'Asset' : 'Assets'}
        </h4>
        {onAdd && (
          <Button onClick={onAdd} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        )}
      </div>

      {holdings.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No holdings data available. Click "Add Asset" to add your first asset.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Asset Class</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Liquidity
                    <InfoTooltip
                      content={
                        <div className="space-y-2">
                          <div className="font-semibold mb-2">Liquidity Classification:</div>
                          <div className="space-y-1">
                            <div>
                              <span className="text-success">● Liquid</span> (&lt;1 week)
                              <div className="text-xs text-muted-foreground ml-4">
                                Checking, Savings, Money market
                              </div>
                            </div>
                            <div>
                              <span className="text-warning">● Semi-Liquid</span> (1-4 weeks)
                              <div className="text-xs text-muted-foreground ml-4">
                                Brokerage stocks/bonds, Taxable investments
                              </div>
                            </div>
                            <div>
                              <span className="text-destructive">● Illiquid</span> (&gt;4 weeks)
                              <div className="text-xs text-muted-foreground ml-4">
                                Real estate, Vehicles, 401(k)/IRA
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow key={holding.id}>
                  {editingId === holding.id ? (
                    <>
                      <TableCell>
                        <Input
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={editForm.accountType}
                          onValueChange={(value) => setEditForm({ ...editForm, accountType: value as AccountType })}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="brokerage">Brokerage</SelectItem>
                            <SelectItem value="401k">401k</SelectItem>
                            <SelectItem value="IRA">IRA</SelectItem>
                            <SelectItem value="real_estate">Real Estate</SelectItem>
                            <SelectItem value="vehicle">Vehicle</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={editForm.assetClass}
                          onValueChange={(value) => setEditForm({ ...editForm, assetClass: value as AssetClass })}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="stocks">Stocks</SelectItem>
                            <SelectItem value="bonds">Bonds</SelectItem>
                            <SelectItem value="real_estate">Real Estate</SelectItem>
                            <SelectItem value="commodities">Commodities</SelectItem>
                            <SelectItem value="crypto">Crypto</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={editForm.liquidity}
                          onValueChange={(value) => setEditForm({ ...editForm, liquidity: value as Liquidity })}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="liquid">Liquid</SelectItem>
                            <SelectItem value="semi_liquid">Semi-Liquid</SelectItem>
                            <SelectItem value="illiquid">Illiquid</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={editForm.balance || 0}
                          onChange={(e) => setEditForm({ ...editForm, balance: parseFloat(e.target.value) || 0 })}
                          className="h-8 text-right"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {holding.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" onClick={saveEdit} className="h-8 w-8">
                            <Check className="w-4 h-4 text-success" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={cancelEdit} className="h-8 w-8">
                            <X className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">{holding.name}</TableCell>
                      <TableCell className="capitalize">{holding.accountType.replace("_", " ")}</TableCell>
                      <TableCell className="capitalize">{holding.assetClass}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getLiquidityColor(holding.liquidity)}>
                          {holding.liquidity.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${holding.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {holding.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEdit(holding)}
                            className="h-8 w-8"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(holding.id, holding.name)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Assets</span>
          <span className="text-lg font-bold text-success">
            ${holdings.reduce((sum, h) => sum + h.balance, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </>
  );
};
