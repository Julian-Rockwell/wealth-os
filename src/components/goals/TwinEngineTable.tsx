import { useRef, useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { TwinEngineRow, TwinEngineSettings } from "@/utils/twinEngineCalculations";

interface TwinEngineTableProps {
  data: TwinEngineRow[];
  settings: TwinEngineSettings;
}

const formatMoney = (value: number) => {
  if (value === 0) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export function TwinEngineTable({ data, settings }: TwinEngineTableProps) {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [tableWidth, setTableWidth] = useState(0);
  const isSyncingRef = useRef(false);

  // Measure table width using ResizeObserver
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const updateWidth = () => {
      setTableWidth(table.scrollWidth);
    };

    // Initial measurement
    updateWidth();

    // Use ResizeObserver for dynamic updates
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(table);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data]);

  // Sync scroll handlers with flag to prevent loops
  const handleTopScroll = useCallback(() => {
    if (isSyncingRef.current) return;
    if (topScrollRef.current && bottomScrollRef.current) {
      isSyncingRef.current = true;
      bottomScrollRef.current.scrollLeft = topScrollRef.current.scrollLeft;
      requestAnimationFrame(() => {
        isSyncingRef.current = false;
      });
    }
  }, []);

  const handleBottomScroll = useCallback(() => {
    if (isSyncingRef.current) return;
    if (topScrollRef.current && bottomScrollRef.current) {
      isSyncingRef.current = true;
      topScrollRef.current.scrollLeft = bottomScrollRef.current.scrollLeft;
      requestAnimationFrame(() => {
        isSyncingRef.current = false;
      });
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Cash Flow Ledger</CardTitle>
        <CardDescription>
          Tax Rate: {settings.taxRate}% (Grossed Up for W/D)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Top scrollbar (mirror) */}
        {tableWidth > 0 && (
          <div 
            ref={topScrollRef}
            className="overflow-x-auto mb-2 scrollbar-thin"
            onScroll={handleTopScroll}
            style={{ overflowY: 'hidden' }}
          >
            <div style={{ width: tableWidth, height: 12 }} />
          </div>
        )}

        {/* Table with bottom scrollbar */}
        <div 
          ref={bottomScrollRef}
          className="overflow-x-auto"
          onScroll={handleBottomScroll}
        >
          <Table ref={tableRef}>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Year</TableHead>
                <TableHead className="text-center">Age</TableHead>
                <TableHead className="text-right">Act. Profit</TableHead>
                <TableHead className="text-right">Net Spillover</TableHead>
                <TableHead className="text-right">Pas. Bal</TableHead>
                <TableHead className="text-right">Pas. Growth</TableHead>
                <TableHead className="text-center">RPIC %</TableHead>
                <TableHead className="text-right">Other Inc.</TableHead>
                <TableHead className="text-right">Gross W/D</TableHead>
                <TableHead className="text-right">Net Wallet</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Trad. Bal</TableHead>
                <TableHead className="text-right">Trad. W/D</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow 
                  key={row.year}
                  className={cn(
                    row.isFreedom && "bg-green-50 dark:bg-green-950/20",
                    row.isCapHit && !row.isFreedom && "bg-blue-50 dark:bg-blue-950/20"
                  )}
                >
                  <TableCell className="text-center font-medium">{row.year}</TableCell>
                  <TableCell className="text-center">{row.age}</TableCell>
                  <TableCell className="text-right">
                    {row.activeBalance > 0 ? formatMoney(row.activeProfitGross) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.spilloverNet > 0 ? formatMoney(row.spilloverNet) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatMoney(row.passiveBalance)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatMoney(row.passiveGrowth)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={cn(
                      "font-medium",
                      row.rpicScore >= 100 ? "text-green-600" : "text-muted-foreground"
                    )}>
                      {row.rpicScore.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {row.retirementIncome > 0 ? formatMoney(row.retirementIncome) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.withdrawalAmount > 0 ? formatMoney(row.withdrawalAmount) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {row.netWallet > 0 ? formatMoney(row.netWallet) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatMoney(row.expenses)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatMoney(row.tradBalance)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {row.tradWithdrawal > 0 ? formatMoney(row.tradWithdrawal) : '-'}
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
