import { useRef, useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TwinEngineRow, TwinEngineSettings } from "@/utils/twinEngineCalculations";

interface TwinEngineTableProps {
  data: TwinEngineRow[];
  settings: TwinEngineSettings;
}

// Condensed money format: $20,000 -> $20k, $1,186,229 -> $1.19M
const formatMoneyCondensed = (value: number) => {
  if (value === 0) return '-';
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${Math.round(value)}`;
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

  // Sticky column width
  const stickyColWidth = 55;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Cash Flow Ledger</CardTitle>
        <CardDescription>
          Tax Rate: {settings.taxRate}% (Grossed Up for W/D) • Projection to Age {data[data.length - 1]?.age || settings.targetAge || 106}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {/* Top scrollbar */}
        {tableWidth > 0 && (
          <div 
            ref={topScrollRef}
            className="overflow-x-auto mx-6 mb-2"
            onScroll={handleTopScroll}
            style={{ height: 12 }}
          >
            <div style={{ width: tableWidth, height: 1 }} />
          </div>
        )}

        {/* Table container with sticky headers and columns */}
        <div 
          ref={bottomScrollRef}
          className="overflow-x-auto overflow-y-auto max-h-[600px] mx-6 mb-6"
          onScroll={handleBottomScroll}
        >
          <table className="w-full caption-bottom text-sm border-collapse">
            {/* Group Headers - Sticky */}
            <thead className="sticky top-0 z-20 bg-background">
              <tr className="border-b bg-muted/30">
                <th 
                  className="h-8 px-2 text-center align-middle font-semibold whitespace-nowrap text-xs border-b-2 sticky left-0 z-30 bg-muted/30"
                  style={{ width: stickyColWidth, minWidth: stickyColWidth }}
                >
                  Year
                </th>
                <th 
                  className="h-8 px-2 text-center align-middle font-semibold whitespace-nowrap text-xs border-b-2 border-r sticky z-30 bg-muted/30"
                  style={{ left: stickyColWidth, width: stickyColWidth, minWidth: stickyColWidth }}
                >
                  Age
                </th>
                {/* Renamed: Active Engine -> Active Trading */}
                <th className="h-8 px-2 text-center align-middle font-semibold whitespace-nowrap text-xs border-b-2 border-r bg-primary/5" colSpan={3}>Active Trading</th>
                {/* Renamed: Passive Engine -> Passive Income */}
                <th className="h-8 px-2 text-center align-middle font-semibold whitespace-nowrap text-xs border-b-2 border-r bg-green-500/5" colSpan={3}>Passive Income</th>
                <th className="h-8 px-2 text-center align-middle font-semibold whitespace-nowrap text-xs border-b-2 border-r bg-amber-500/5" colSpan={5}>Wallet & Lifestyle</th>
                <th className="h-8 px-2 text-center align-middle font-semibold whitespace-nowrap text-xs border-b-2 bg-muted/50" colSpan={2}>Traditional</th>
              </tr>
              <tr className="border-b bg-background">
                {/* Sticky Year column header */}
                <th 
                  className="h-10 px-2 text-center align-middle font-medium text-muted-foreground whitespace-nowrap text-xs sticky left-0 z-30 bg-background"
                  style={{ width: stickyColWidth, minWidth: stickyColWidth }}
                >
                  
                </th>
                {/* Sticky Age column header */}
                <th 
                  className="h-10 px-2 text-center align-middle font-medium text-muted-foreground whitespace-nowrap text-xs border-r sticky z-30 bg-background"
                  style={{ left: stickyColWidth, width: stickyColWidth, minWidth: stickyColWidth }}
                >
                  
                </th>
                {/* Active Trading - Added Balance column, renamed headers */}
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">Balance</th>
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">Profit</th>
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs border-r">Excess</th>
                {/* Passive Income */}
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">Balance</th>
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">Growth</th>
                <th className="h-10 px-2 text-center align-middle font-medium text-muted-foreground whitespace-nowrap text-xs border-r">RPIC</th>
                {/* Wallet & Lifestyle - renamed W/D to DISTRIB. */}
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">Other</th>
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">DISTRIB.</th>
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">Net</th>
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">Gap</th>
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs border-r">Exp</th>
                {/* Traditional - renamed W/D to DISTRIB. */}
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">Bal</th>
                <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground whitespace-nowrap text-xs">DISTRIB.</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr 
                  key={row.year}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50",
                    row.isFreedom && "bg-green-50 dark:bg-green-950/20",
                    row.isCapHit && !row.isFreedom && "bg-blue-50 dark:bg-blue-950/20"
                  )}
                >
                  {/* Sticky Year */}
                  <td 
                    className={cn(
                      "p-2 align-middle whitespace-nowrap text-sm text-center font-medium sticky left-0 z-10",
                      row.isFreedom && "bg-green-50 dark:bg-green-950/20",
                      row.isCapHit && !row.isFreedom && "bg-blue-50 dark:bg-blue-950/20",
                      !row.isFreedom && !row.isCapHit && "bg-background"
                    )}
                    style={{ width: stickyColWidth, minWidth: stickyColWidth }}
                  >
                    {row.year}
                  </td>
                  {/* Sticky Age */}
                  <td 
                    className={cn(
                      "p-2 align-middle whitespace-nowrap text-sm text-center border-r sticky z-10",
                      row.isFreedom && "bg-green-50 dark:bg-green-950/20",
                      row.isCapHit && !row.isFreedom && "bg-blue-50 dark:bg-blue-950/20",
                      !row.isFreedom && !row.isCapHit && "bg-background"
                    )}
                    style={{ left: stickyColWidth, width: stickyColWidth, minWidth: stickyColWidth }}
                  >
                    {row.age}
                  </td>
                  {/* Active Trading - Added Balance column */}
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right font-medium">
                    {formatMoneyCondensed(row.activeBalance)}
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right">
                    {row.activeBalance > 0 ? formatMoneyCondensed(row.activeProfitGross) : '-'}
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right border-r">
                    {row.spilloverNet > 0 ? formatMoneyCondensed(row.spilloverNet) : '-'}
                  </td>
                  {/* Passive Income */}
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right font-medium">
                    {formatMoneyCondensed(row.passiveBalance)}
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right">
                    {formatMoneyCondensed(row.passiveGrowth)}
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-center border-r">
                    <span className={cn(
                      "font-medium",
                      row.rpicScore >= 100 ? "text-green-600" : "text-muted-foreground"
                    )}>
                      {row.rpicScore.toFixed(0)}%
                    </span>
                  </td>
                  {/* Wallet & Lifestyle */}
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right">
                    {row.retirementIncome > 0 ? formatMoneyCondensed(row.retirementIncome) : '-'}
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right">
                    {row.withdrawalAmount > 0 ? formatMoneyCondensed(row.withdrawalAmount) : '-'}
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right font-medium">
                    {row.netWallet > 0 ? formatMoneyCondensed(row.netWallet) : '-'}
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right">
                    <span className={cn(
                      row.expenseShortfall > 0 ? "text-destructive font-medium" : "text-muted-foreground"
                    )}>
                      {row.expenseShortfall > 0 ? formatMoneyCondensed(row.expenseShortfall) : '-'}
                    </span>
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right border-r">
                    {formatMoneyCondensed(row.grossExpenses)}
                  </td>
                  {/* Traditional */}
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right text-muted-foreground">
                    {formatMoneyCondensed(row.tradBalance)}
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap text-sm text-right text-muted-foreground">
                    {row.tradWithdrawal > 0 ? formatMoneyCondensed(row.tradWithdrawal) : '-'}
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
