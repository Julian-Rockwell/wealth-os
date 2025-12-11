import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Percent, Clock, AlertTriangle } from "lucide-react";

interface EquityOpportunity {
  assetName: string;
  assetType: string;
  homeValue: number;
  existingMortgage: number;
  equity: number;
  loanAmount: number;
  estimatedAPR: number;
  monthlyPayment: number;
  annualInterestCost: number;
  targetReturn: number;
  netGainYear1: number;
}

interface HELOCAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: EquityOpportunity | null;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function HELOCAnalysisDialog({ open, onOpenChange, opportunity }: HELOCAnalysisDialogProps) {
  if (!opportunity) return null;

  const { homeValue, existingMortgage, equity, loanAmount, estimatedAPR, monthlyPayment, annualInterestCost, targetReturn } = opportunity;

  // Generate 10-year projection
  const projection = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const interestCost = annualInterestCost;
    const tradingReturns = loanAmount * (targetReturn / 100);
    const netGain = tradingReturns - interestCost;
    const cumulative = netGain * year;
    return { year, interestCost, tradingReturns, netGain, cumulative };
  });

  // Scenario analysis
  const scenarios = [
    { name: "Best Case", rate: 30, color: "text-green-600" },
    { name: "Expected", rate: targetReturn, color: "text-primary" },
    { name: "Conservative", rate: 15, color: "text-amber-600" },
    { name: "Break-Even", rate: estimatedAPR, color: "text-muted-foreground" },
  ];

  const scenarioResults = scenarios.map(scenario => {
    const annualReturn = loanAmount * (scenario.rate / 100);
    const annualNet = annualReturn - annualInterestCost;
    const tenYearNet = annualNet * 10;
    return { ...scenario, annualReturn, annualNet, tenYearNet };
  });

  // Risk metrics
  const monthlyCashFlowImpact = monthlyPayment;
  const maxDownsideRisk = loanAmount; // Full loss of invested capital
  const tenYearTotalInterest = annualInterestCost * 10;
  const tenYearExpectedReturns = loanAmount * (targetReturn / 100) * 10;
  const tenYearNetProfit = tenYearExpectedReturns - tenYearTotalInterest;
  const effectiveROE = ((tenYearNetProfit / loanAmount) * 100) / 10; // Annualized
  const paybackMonths = annualInterestCost / (loanAmount * (targetReturn / 100) / 12);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            HELOC Investment Analysis - {opportunity.assetName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Loan Summary */}
          <Card>
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Loan Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Home Value</div>
                  <div className="font-semibold">{formatCurrency(homeValue)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Existing Mortgage</div>
                  <div className="font-semibold">{formatCurrency(existingMortgage)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Available Equity</div>
                  <div className="font-semibold">{formatCurrency(equity)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Max HELOC (80% LTV)</div>
                  <div className="font-semibold text-primary">{formatCurrency(loanAmount)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Est. APR</div>
                  <div className="font-semibold">{estimatedAPR.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Monthly Payment (Interest-Only)</div>
                  <div className="font-semibold">{formatCurrency(monthlyPayment)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 10-Year Projection */}
          <Card>
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                10-Year Projection
                <Badge variant="outline" className="ml-2 text-xs">
                  {targetReturn}% Target Return
                </Badge>
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Year</TableHead>
                      <TableHead className="text-right">Interest Cost</TableHead>
                      <TableHead className="text-right">Trading Returns</TableHead>
                      <TableHead className="text-right">Net Gain</TableHead>
                      <TableHead className="text-right">Cumulative</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projection.map(row => (
                      <TableRow key={row.year}>
                        <TableCell className="font-medium">{row.year}</TableCell>
                        <TableCell className="text-right text-destructive">{formatCurrency(row.interestCost)}</TableCell>
                        <TableCell className="text-right text-green-600">{formatCurrency(row.tradingReturns)}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(row.netGain)}</TableCell>
                        <TableCell className="text-right font-semibold text-primary">{formatCurrency(row.cumulative)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Scenario Analysis */}
          <Card>
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Percent className="h-4 w-4" />
                Scenario Analysis
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {scenarioResults.map(scenario => (
                  <div key={scenario.name} className="border rounded-lg p-3">
                    <div className={`text-sm font-medium ${scenario.color}`}>{scenario.name}</div>
                    <div className="text-xs text-muted-foreground mb-2">{scenario.rate}% return</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Annual Net:</span>
                        <span className={scenario.annualNet >= 0 ? "text-green-600" : "text-destructive"}>
                          {formatCurrency(scenario.annualNet)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>10-Year Net:</span>
                        <span className={scenario.tenYearNet >= 0 ? "text-green-600 font-semibold" : "text-destructive font-semibold"}>
                          {formatCurrency(scenario.tenYearNet)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card>
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Risk Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Monthly Cash Flow Impact</div>
                  <div className="font-semibold text-destructive">-{formatCurrency(monthlyCashFlowImpact)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Maximum Downside</div>
                  <div className="font-semibold text-destructive">{formatCurrency(maxDownsideRisk)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Effective Annual ROE</div>
                  <div className="font-semibold text-green-600">{effectiveROE.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Interest Payback Period</div>
                  <div className="font-semibold">{paybackMonths.toFixed(1)} months</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 10-Year Summary */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3">10-Year Summary (Expected Scenario)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Total Interest Paid</div>
                  <div className="font-semibold text-destructive">{formatCurrency(tenYearTotalInterest)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Total Expected Returns</div>
                  <div className="font-semibold text-green-600">{formatCurrency(tenYearExpectedReturns)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Net Profit</div>
                  <div className="text-xl font-bold text-primary">{formatCurrency(tenYearNetProfit)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Effective Annual ROE</div>
                  <div className="text-xl font-bold text-green-600">{effectiveROE.toFixed(1)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-xs text-muted-foreground text-center">
            For Illustration & Education Purposes Only. Actual returns may vary significantly.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
