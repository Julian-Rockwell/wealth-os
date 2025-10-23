import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Liability } from "@/types/financial";

interface LiabilitiesTableProps {
  liabilities: Liability[];
  onUpdate?: (id: string, updates: Partial<Liability>) => void;
}

export const LiabilitiesTable = ({ liabilities, onUpdate }: LiabilitiesTableProps) => {
  const getAPRColor = (apr: number) => {
    if (apr > 18) return "bg-destructive/10 text-destructive";
    if (apr >= 8) return "bg-warning/10 text-warning";
    return "bg-success/10 text-success";
  };

  return (
    <Card className="p-6 shadow-soft">
      <h3 className="font-semibold mb-4">Liabilities</h3>
      
      {liabilities.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No liabilities data available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>APR</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">Monthly Payment</TableHead>
                <TableHead className="text-right">Term (Months)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liabilities.map((liability) => (
                <TableRow key={liability.id}>
                  <TableCell className="font-medium">{liability.name}</TableCell>
                  <TableCell className="capitalize">{liability.type.replace("_", " ")}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getAPRColor(liability.apr)}>
                      {liability.apr.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${liability.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right">
                    ${liability.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right">
                    {liability.remainingTermMonths}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Liabilities</span>
          <span className="text-lg font-bold text-destructive">
            ${liabilities.reduce((sum, l) => sum + l.balance, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </Card>
  );
};
