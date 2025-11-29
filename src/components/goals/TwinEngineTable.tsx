import { useRef, useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  const [tableWidth, setTableWidth] = useState(0);
  const isSyncingRef = useRef(false);

  // Measure table width
  useEffect(() => {
    const container = bottomScrollRef.current;
    if (!container) return;

    const updateWidth = () => {
      const table = container.querySelector('table');
      if (table) {
        setTableWidth(table.scrollWidth);
      }
    };

    // Initial measurement with small delay for render
    const timer = setTimeout(updateWidth, 50);

    // Use ResizeObserver for dynamic updates
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(container);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [data]);

  // Sync scroll handlers
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

  // Table styles
  const thClass = "h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap";
  const tdClass = "p-4 align-middle whitespace-nowrap";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Cash Flow Ledger</CardTitle>
        <CardDescription>
          Tax Rate: {settings.taxRate}% (Grossed Up for W/D)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Top scrollbar */}
        {tableWidth > 0 && (
          <div 
            ref={topScrollRef}
            className="overflow-x-auto mb-2"
            onScroll={handleTopScroll}
          >
            <div style={{ width: tableWidth, height: 1 }} />
          </div>
        )}

        {/* Table with bottom scrollbar - using native elements */}
        <div 
          ref={bottomScrollRef}
          className="overflow-x-auto"
          onScroll={handleBottomScroll}
        >
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b">
                <th className={cn(thClass, "text-center")}>Year</th>
                <th className={cn(thClass, "text-center")}>Age</th>
                <th className={cn(thClass, "text-right")}>Act. Profit</th>
                <th className={cn(thClass, "text-right")}>Net Spillover</th>
                <th className={cn(thClass, "text-right")}>Pas. Bal</th>
                <th className={cn(thClass, "text-right")}>Pas. Growth</th>
                <th className={cn(thClass, "text-center")}>RPIC %</th>
                <th className={cn(thClass, "text-right")}>Other Inc.</th>
                <th className={cn(thClass, "text-right")}>Gross W/D</th>
                <th className={cn(thClass, "text-right")}>Net Wallet</th>
                <th className={cn(thClass, "text-right")}>Expenses</th>
                <th className={cn(thClass, "text-right")}>Trad. Bal</th>
                <th className={cn(thClass, "text-right")}>Trad. W/D</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {data.map((row) => (
                <tr 
                  key={row.year}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50",
                    row.isFreedom && "bg-green-50 dark:bg-green-950/20",
                    row.isCapHit && !row.isFreedom && "bg-blue-50 dark:bg-blue-950/20"
                  )}
                >
                  <td className={cn(tdClass, "text-center font-medium")}>{row.year}</td>
                  <td className={cn(tdClass, "text-center")}>{row.age}</td>
                  <td className={cn(tdClass, "text-right")}>
                    {row.activeBalance > 0 ? formatMoney(row.activeProfitGross) : '-'}
                  </td>
                  <td className={cn(tdClass, "text-right")}>
                    {row.spilloverNet > 0 ? formatMoney(row.spilloverNet) : '-'}
                  </td>
                  <td className={cn(tdClass, "text-right font-medium")}>
                    {formatMoney(row.passiveBalance)}
                  </td>
                  <td className={cn(tdClass, "text-right")}>
                    {formatMoney(row.passiveGrowth)}
                  </td>
                  <td className={cn(tdClass, "text-center")}>
                    <span className={cn(
                      "font-medium",
                      row.rpicScore >= 100 ? "text-green-600" : "text-muted-foreground"
                    )}>
                      {row.rpicScore.toFixed(1)}%
                    </span>
                  </td>
                  <td className={cn(tdClass, "text-right")}>
                    {row.retirementIncome > 0 ? formatMoney(row.retirementIncome) : '-'}
                  </td>
                  <td className={cn(tdClass, "text-right")}>
                    {row.withdrawalAmount > 0 ? formatMoney(row.withdrawalAmount) : '-'}
                  </td>
                  <td className={cn(tdClass, "text-right font-medium")}>
                    {row.netWallet > 0 ? formatMoney(row.netWallet) : '-'}
                  </td>
                  <td className={cn(tdClass, "text-right")}>
                    {formatMoney(row.expenses)}
                  </td>
                  <td className={cn(tdClass, "text-right text-muted-foreground")}>
                    {formatMoney(row.tradBalance)}
                  </td>
                  <td className={cn(tdClass, "text-right text-muted-foreground")}>
                    {row.tradWithdrawal > 0 ? formatMoney(row.tradWithdrawal) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
