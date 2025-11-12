import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, CheckCircle2, AlertTriangle } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { generateSixMonthPlan } from "@/utils/sixMonthPlanGenerator";
import { calculateMonthlyExpenses, calculateLiquidAssets } from "@/utils/investmentCalculations";
import type { SixMonthPlan } from "@/types/sixMonthPlan";
import { useEffect, useState } from "react";

interface SixMonthPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  foundationScore?: number;
}

export function SixMonthPlanDialog({ open, onOpenChange, foundationScore = 0 }: SixMonthPlanDialogProps) {
  const { snapshot, dashboardData, monthlyIncome, rpicResult, sixMonthPlan, setSixMonthPlan } = useFinancialData();
  const [plan, setPlan] = useState<SixMonthPlan | null>(sixMonthPlan);

  useEffect(() => {
    if (open && !plan && snapshot && dashboardData) {
      // Generate plan when dialog opens
      const monthlyExpenses = calculateMonthlyExpenses(snapshot.stagingTxns);
      const liquidAssets = calculateLiquidAssets(snapshot.holdings);
      const avgMonthlyIncome = monthlyIncome || (dashboardData.income.avgMonthly);
      const avgMonthlyExpenses = monthlyExpenses;
      const cashFlowMonthly = avgMonthlyIncome - avgMonthlyExpenses;
      const emergencyFundReq = monthlyExpenses * 6;
      const highAprDebts = snapshot.liabilities
        .filter(l => l.apr > 18)
        .map(l => ({
          id: l.id,
          name: l.name,
          type: l.type,
          apr: l.apr,
          balance: l.balance,
          monthlyPayment: l.monthlyPayment
        }));
      const allDebts = snapshot.liabilities.map(l => ({
        id: l.id,
        name: l.name,
        apr: l.apr,
        balance: l.balance,
        monthlyPayment: l.monthlyPayment
      }));
      const availableCapital = Math.max(liquidAssets - emergencyFundReq, 0);

      const generatedPlan = generateSixMonthPlan({
        currentMonthExpenses: monthlyExpenses,
        avgMonthlyIncome,
        avgMonthlyExpenses,
        cashFlowMonthly,
        liquidAssets,
        emergencyFundReq,
        highAprDebts,
        allDebts,
        readinessScore: foundationScore,
        rpicMonthly: rpicResult?.monthlyRpic || 0,
        rpicAnnual: rpicResult?.annualRpic || 0,
        availableCapital
      });

      setPlan(generatedPlan);
      setSixMonthPlan(generatedPlan);
    }
  }, [open, plan, snapshot, dashboardData, monthlyIncome, foundationScore, rpicResult, setSixMonthPlan]);

  const handleDownload = () => {
    if (!plan) return;
    const dataStr = JSON.stringify(plan, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial-plan-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (!plan) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generating Your 6-Month Plan...</DialogTitle>
            <DialogDescription>
              Analyzing your financial data and creating a personalized action plan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your 6-Month Foundation Plan</DialogTitle>
          <DialogDescription>
            Personalized action plan based on your current financial snapshot
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Snapshot Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Monthly Expenses</div>
                <div className="font-semibold">${plan.inputs.currentMonthExpenses.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Monthly Income</div>
                <div className="font-semibold">${plan.inputs.avgMonthlyIncome.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Cash Flow</div>
                <div className={`font-semibold ${plan.inputs.cashFlowMonthly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${plan.inputs.cashFlowMonthly.toFixed(0)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Liquid Assets</div>
                <div className="font-semibold">${plan.inputs.liquidAssets.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Emergency Fund Target</div>
                <div className="font-semibold">${plan.inputs.emergencyFundReq.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">High-APR Debt</div>
                <div className="font-semibold text-red-600">
                  ${plan.inputs.highAprDebts.reduce((sum, d) => sum + d.balance, 0).toFixed(0)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Breakdown */}
          {plan.months.map((month) => (
            <Card key={month.monthIndex}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Month {month.monthIndex}: {month.theme}
                  </CardTitle>
                  <Badge variant="secondary">
                    {month.tasks.length} tasks
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tasks */}
                <div className="space-y-3">
                  {month.tasks.map((task) => (
                    <div key={task.id} className="border-l-2 border-primary pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">{task.details}</div>
                        </div>
                        {task.estMonthlyImpact && (
                          <Badge variant="outline" className="ml-2">
                            +${task.estMonthlyImpact}
                          </Badge>
                        )}
                        {task.amount && (
                          <Badge variant="outline" className="ml-2">
                            ${task.amount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-xs text-muted-foreground">Cash Flow</div>
                    <div className="text-sm font-semibold">${month.kpis.cashFlowRunRate.toFixed(0)}/mo</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Emergency Fund</div>
                    <Progress value={month.kpis.emergencyFundProgress} className="h-2 mt-1" />
                    <div className="text-xs mt-1">{month.kpis.emergencyFundProgress.toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">High-APR Debt</div>
                    <div className="text-sm font-semibold text-red-600">${month.kpis.highAprBalance.toFixed(0)}</div>
                  </div>
                </div>

                {/* Blocked Actions */}
                {month.blockedActions && month.blockedActions.length > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3 mt-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium text-yellow-900 dark:text-yellow-100">Blocked: {month.blockedActions[0].name}</div>
                        <div className="text-yellow-700 dark:text-yellow-300 text-xs mt-1">
                          {month.blockedActions[0].unblocksWhen}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Final Summary */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-lg">6-Month Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                  <div className="text-xl font-bold text-green-600">
                    +${plan.rollup.totalMonthlySavings}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Interest Saved</div>
                  <div className="text-xl font-bold text-green-600">
                    ${plan.rollup.totalInterestSaved.toFixed(0)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Emergency Fund</div>
                  <div className="text-xl font-bold">
                    ${plan.rollup.emergencyFundEnding.toFixed(0)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Projected Score</div>
                  <div className="text-xl font-bold">
                    {plan.rollup.readinessProjected}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Next Step</div>
                  <div className="text-sm text-muted-foreground">
                    {plan.rollup.nextStep === "paper_trading" 
                      ? "You're ready to proceed to Paper Trading!" 
                      : "Continue building your foundation for sustainable investing"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Plan
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
