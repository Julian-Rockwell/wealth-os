import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Holding } from "@/types/financial";

interface HoldingsTableProps {
  holdings: Holding[];
  onUpdate?: (id: string, updates: Partial<Holding>) => void;
}

export const HoldingsTable = ({ holdings, onUpdate }: HoldingsTableProps) => {
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

  return (
    <>
      {holdings.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No holdings data available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Asset Class</TableHead>
                <TableHead>Liquidity</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow key={holding.id}>
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
