import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, AlertTriangle, DollarSign, Calendar, Zap } from "lucide-react";
import { toast } from "sonner";
import type { FinancialSnapshot } from "@/types/financial";
import { calculateEquityOpportunities, calculateDebtPayoffScenarios } from "@/utils/investmentCalculations";

interface OptimizeAssetsProps {
  snapshot: FinancialSnapshot;
}

const formatCurrency = (value: number) => 
  value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export function OptimizeAssets({ snapshot }: OptimizeAssetsProps) {
  const equityOpportunities = calculateEquityOpportunities(snapshot);
  const debtPayoffScenarios = calculateDebtPayoffScenarios(snapshot.liabilities);

  const handleSeeAnalysis = () => {
    toast.info("Opening detailed analysis...");
  };

  const handleAddToPlan = () => {
    toast.success("Added to Action Plan");
  };

  const handleNotInterested = () => {
    toast.info("Noted. We won't show this opportunity again.");
  };

  const handleCreatePayoffPlan = () => {
    toast.success("Creating payoff plan...");
  };

  const handlePayOffImmediately = () => {
    toast.info("Redirecting to payment setup...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Asset Optimization Opportunities <span className="text-xs text-muted-foreground font-normal ml-2">(calculated from holdings and liabilities)</span></h3>
        <p className="text-sm text-muted-foreground">
          Prescriptive recommendations to maximize your financial position
        </p>
      </div>

      {/* Equity Liquidation Opportunities */}
      {equityOpportunities.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Real Estate Equity Opportunities (HELOC)
          </h4>
          
          {equityOpportunities.map((opp, index) => (
            <Card key={index} className="border-2 border-green-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-green-700">
                      SMART MONEY OPPORTUNITY DETECTED
                    </CardTitle>
                    <CardDescription>
                      {opp.assetName} - {opp.assetType}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {opp.netGainYear1.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                    <div className="text-xs text-muted-foreground">Potential Year 1 Net Gain</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Available Equity</div>
                    <div className="font-semibold">
                      {opp.equity.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Loan Amount (80% LTV)</div>
                    <div className="font-semibold">
                      {opp.loanAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Est. APR</div>
                    <div className="font-semibold">{opp.estimatedAPR}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    <div className="font-semibold">
                      {opp.monthlyPayment.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Target Return: {opp.targetReturn}% annually</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Break-even after loan costs: {opp.estimatedAPR + 2}% | Safety margin included
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    <strong>Risk Disclaimer:</strong> Active trading involves substantial risk. 
                    Consider paper trading first. Past performance doesn't guarantee future results.
                  </AlertDescription>
                </Alert>

                <div className="text-xs text-muted-foreground mb-4">
                  Rates last updated: {new Date().toLocaleDateString()} (Placeholder - not live rates)
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSeeAnalysis}>
                    See Detailed Analysis
                  </Button>
                  <Button variant="outline" onClick={handleAddToPlan}>
                    Add to Action Plan
                  </Button>
                  <Button variant="ghost" onClick={handleNotInterested}>
                    Not Interested
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* High-Interest Debt Payoff - REDESIGNED */}
      {debtPayoffScenarios.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Eliminate Toxic Debt to Maximize Cash Flow
          </h4>

          {debtPayoffScenarios.map((scenario, index) => (
            <Card key={index} className="border-2 border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  {scenario.name}
                  <span className="text-xs text-muted-foreground font-normal">(calculated from liabilities)</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Balance: <span className="font-semibold text-foreground">{formatCurrency(scenario.balance)}</span> at <span className="font-semibold text-destructive">{scenario.apr}% APR</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Current Payment Schedule - Red/Pink background */}
                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
                  <div className="font-medium mb-3 text-red-700 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Current Payment Schedule
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Payment</div>
                      <div className="font-semibold text-lg">{formatCurrency(scenario.currentPayment)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Timeline</div>
                      <div className="font-semibold text-lg">{scenario.currentMonths} months</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">You Spend</div>
                      <div className="font-semibold text-lg text-red-600 dark:text-red-400">{formatCurrency(scenario.currentTotalCost)}</div>
                    </div>
                    <div className="text-center">
                      {/* Empty placeholder for alignment */}
                    </div>
                  </div>
                </div>

                {/* Accelerated Payment Schedule - Yellow background */}
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                  <div className="font-medium mb-3 text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Accelerated Payment Schedule (1.5x)
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Payment</div>
                      <div className="font-semibold text-lg">{formatCurrency(scenario.acceleratedPayment)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Timeline</div>
                      <div className="font-semibold text-lg">{scenario.acceleratedMonths} months</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">You Spend</div>
                      <div className="font-semibold text-lg">{formatCurrency(scenario.acceleratedTotalCost)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">You Save</div>
                      <div className="font-semibold text-lg text-green-600 dark:text-green-400">{formatCurrency(scenario.acceleratedSavings)}</div>
                    </div>
                  </div>
                </div>

                {/* Lump Sum Payoff - Green background */}
                <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg">
                  <div className="font-medium mb-3 text-green-700 dark:text-green-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Lump Sum Payoff
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      {/* Empty placeholder for alignment */}
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Timeline</div>
                      <div className="font-semibold text-lg">Immediate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">You Spend</div>
                      <div className="font-semibold text-lg">{formatCurrency(scenario.lumpSumCost)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Interest Avoided</div>
                      <div className="font-semibold text-lg text-green-600 dark:text-green-400">{formatCurrency(scenario.interestAvoided)}</div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    <strong>Recommendation:</strong> {
                      scenario.recommendation === "immediate" 
                        ? "Pay off immediately if you have the funds available. The interest savings are substantial."
                        : "Consider accelerating payments to save time and money."
                    }
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  <Button onClick={handleCreatePayoffPlan}>
                    Create Payoff Plan
                  </Button>
                  {scenario.recommendation === "immediate" && (
                    <Button variant="outline" onClick={handlePayOffImmediately}>
                      Pay Off Immediately
                    </Button>
                  )}
                  <Button variant="ghost">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {equityOpportunities.length === 0 && debtPayoffScenarios.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground mb-4">
              No optimization opportunities detected at this time.
            </div>
            <p className="text-sm text-muted-foreground">
              Your assets are well-structured and you don't have high-interest debt requiring immediate attention.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
