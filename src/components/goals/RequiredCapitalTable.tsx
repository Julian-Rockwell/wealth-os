import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RpicResult, TimelineResult } from "@/utils/rpicCalculations";
import { TrendingDown } from "lucide-react";

interface RequiredCapitalTableProps {
  rpic: RpicResult;
  timeline: TimelineResult;
  startingCapital: number;
}

export function RequiredCapitalTable({ 
  rpic, 
  timeline, 
  startingCapital 
}: RequiredCapitalTableProps) {
  const rows = [
    {
      path: "Wealth OS Hybrid",
      capitalNeeded: rpic.targetCapitalActive,
      gap: timeline.wealthOS.gap,
      years: timeline.wealthOS.yearsToTarget,
      highlight: true,
    },
    {
      path: "Traditional Passive",
      capitalNeeded: rpic.targetCapitalPassive,
      gap: timeline.traditional.gap,
      years: timeline.traditional.yearsToTarget,
      highlight: false,
    },
  ];

  const savings = rpic.targetCapitalPassive - rpic.targetCapitalActive;
  const savingsPercent = (savings / rpic.targetCapitalPassive) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Required Capital Analysis</CardTitle>
        <CardDescription>
          Compare the capital requirements and timelines for each path
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Path</TableHead>
              <TableHead className="text-right">Capital Needed</TableHead>
              <TableHead className="text-right">Gap</TableHead>
              <TableHead className="text-right">Years</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.path} className={row.highlight ? "bg-success/5" : ""}>
                <TableCell className="font-medium">
                  {row.path}
                  {row.highlight && (
                    <Badge variant="outline" className="ml-2 text-xs bg-success text-success-foreground">
                      Recommended
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ${(row.capitalNeeded / 1000).toFixed(0)}K
                </TableCell>
                <TableCell className="text-right text-warning">
                  ${(row.gap / 1000).toFixed(0)}K
                </TableCell>
                <TableCell className="text-right">
                  {row.years.toFixed(1)}y
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Savings highlight */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-success" />
            <span className="font-semibold text-success">Capital Efficiency</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-success">
              ${(savings / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-muted-foreground">
              ({savingsPercent.toFixed(0)}% less capital required)
            </p>
          </div>
        </div>

        {/* Current position */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your Starting Capital</span>
            <span className="font-semibold">
              ${(startingCapital / 1000).toFixed(0)}K
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Progress to Wealth OS Target</span>
            <Badge variant="outline">
              {((startingCapital / rpic.targetCapitalActive) * 100).toFixed(1)}%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
