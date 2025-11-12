import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, AlertTriangle, DollarSign, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { FinancialSnapshot } from "@/types/financial";
import { calculateEquityOpportunities, calculateDebtPayoffScenarios } from "@/utils/investmentCalculations";

interface OptimizeAssetsProps {
  snapshot: FinancialSnapshot;
}

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
            Equity Liquidation Opportunities
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

      {/* High-Interest Debt Payoff */}
      {debtPayoffScenarios.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            High-Interest Debt Payoff Optimization ⭐
          </h4>

          {debtPayoffScenarios.map((scenario, index) => (
            <Card key={index} className="border-2 border-red-200">
              <CardHeader>
                <CardTitle>{scenario.name} <span className="text-xs text-muted-foreground font-normal">(strange calculation - fixed examples)</span></CardTitle>
                <CardDescription>
                  Current balance: {scenario.balance.toLocaleString("en-US", { style: "currency", currency: "USD" })} at {scenario.apr}% APR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Current Path */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="font-medium mb-2">Current Payment Schedule</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Time to Payoff</div>
                        <div className="font-semibold">{scenario.currentMonths} months</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Total Cost</div>
                        <div className="font-semibold">
                          {scenario.currentTotalCost.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accelerated Path */}
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="font-medium mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Accelerated Payment (1.5x)
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-muted-foreground">New Payment</div>
                        <div className="font-semibold">
                          {scenario.acceleratedPayment.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">New Timeline</div>
                        <div className="font-semibold">{scenario.acceleratedMonths} months</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">You Save</div>
                        <div className="font-semibold text-green-600">
                          {scenario.acceleratedSavings.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lump Sum */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="font-medium mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Lump Sum Payoff
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-muted-foreground">Total Savings</div>
                        <div className="font-semibold text-green-600 text-lg">
                          {scenario.lumpSumSavings.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Interest Avoided</div>
                        <div className="font-semibold">
                          {(scenario.currentTotalCost - scenario.balance).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </div>
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
