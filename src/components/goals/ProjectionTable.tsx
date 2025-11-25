import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import type { ProjectionSettings } from "@/contexts/FinancialDataContext";
import { calculateProjectionRows, type ProjectionRow } from "@/utils/projectionCalculations";

interface ProjectionTableProps {
  settings: ProjectionSettings;
  onSettingsChange: (settings: ProjectionSettings) => void;
}

export function ProjectionTable({ settings, onSettingsChange }: ProjectionTableProps) {
  const [editingCell, setEditingCell] = useState<{ row: number; field: 'goalPercent' | 'cashInOut' } | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const parseCurrency = (value: string): number => {
    const cleaned = value.replace(/[^0-9-]/g, '');
    return parseInt(cleaned) || 0;
  };

  const calculateRows = (): ProjectionRow[] => {
    return calculateProjectionRows(settings);
  };

  const rows = calculateRows();
  const maxRpic = Math.max(...rows.map(r => r.rpicIndex));
  const goalYear = rows.find(r => r.rpicIndex > 100)?.year;
  const tradingLimitYear = rows.find(r => r.tradingAccount >= settings.accountSizeComfortable)?.year;

  const handleGoalPercentChange = (rowIndex: number, value: string) => {
    const newValue = Math.min(99, Math.max(0, parseInt(value) || 0));
    const newGoalPercents = [...settings.rowGoalPercents];
    newGoalPercents[rowIndex] = newValue;
    onSettingsChange({ ...settings, rowGoalPercents: newGoalPercents });
  };

  const handleCashInOutChange = (rowIndex: number, value: string) => {
    const newValue = parseCurrency(value);
    const newCashInOut = [...settings.rowCashInOut];
    newCashInOut[rowIndex] = newValue;
    onSettingsChange({ ...settings, rowCashInOut: newCashInOut });
  };

  const getRpicColor = (rpicIndex: number) => {
    if (rpicIndex < 100) return 'text-destructive';
    if (rpicIndex < 150) return 'text-orange-500';
    return 'text-green-600';
  };

  const getRpicBarWidth = (rpicIndex: number) => {
    if (maxRpic === 0) return 0;
    return Math.min(100, (rpicIndex / maxRpic) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goal Projection</CardTitle>
        <CardDescription>
          {goalYear && (
            <span className="text-sm font-medium text-primary">
              Based on the amount you picked, you will achieve your goal in the beginning of {goalYear}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Trading Account</TableHead>
                <TableHead>Goal %</TableHead>
                <TableHead>Trading Profits</TableHead>
                <TableHead>Cash In/Out</TableHead>
                <TableHead>Excess Profits</TableHead>
                <TableHead>Income Account</TableHead>
                <TableHead>Passive Income</TableHead>
                <TableHead>RPIC Index</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={row.year}>
                  <TableCell className="font-medium">{row.year}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {formatCurrency(row.tradingAccount)}
                      {tradingLimitYear === row.year && (
                        <Star className="w-4 h-4 text-primary fill-primary" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingCell?.row === idx && editingCell.field === 'goalPercent' ? (
                      <Input
                        type="number"
                        min="0"
                        max="99"
                        value={row.goalPercent}
                        onChange={(e) => handleGoalPercentChange(idx, e.target.value)}
                        onBlur={() => setEditingCell(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setEditingCell(null);
                          if (e.key === 'Escape') setEditingCell(null);
                        }}
                        autoFocus
                        className="w-20"
                      />
                    ) : (
                      <span 
                        onClick={() => setEditingCell({ row: idx, field: 'goalPercent' })}
                        className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
                      >
                        {row.goalPercent}%
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{formatCurrency(row.tradingProfits)}</TableCell>
                  <TableCell>
                    {editingCell?.row === idx && editingCell.field === 'cashInOut' ? (
                      <Input
                        type="text"
                        value={formatCurrency(row.cashInOut)}
                        onChange={(e) => handleCashInOutChange(idx, e.target.value)}
                        onBlur={() => setEditingCell(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setEditingCell(null);
                          if (e.key === 'Escape') setEditingCell(null);
                        }}
                        autoFocus
                        className="w-28"
                      />
                    ) : (
                      <span 
                        onClick={() => setEditingCell({ row: idx, field: 'cashInOut' })}
                        className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
                      >
                        {formatCurrency(row.cashInOut)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{formatCurrency(row.excessProfits)}</TableCell>
                  <TableCell>{formatCurrency(row.incomeAccount)}</TableCell>
                  <TableCell>{formatCurrency(row.passiveIncome)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className={`font-medium ${getRpicColor(row.rpicIndex)}`}>
                        {Math.ceil(row.rpicIndex)}%
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            row.rpicIndex < 100 ? 'bg-destructive' :
                            row.rpicIndex < 150 ? 'bg-orange-500' : 'bg-green-600'
                          }`}
                          style={{ width: `${getRpicBarWidth(row.rpicIndex)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
