import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import type { FinancialSnapshot } from "@/types/financial";
import { calculateReadinessScore, type ReadinessFactor } from "@/utils/investmentCalculations";

interface ReadinessScoreProps {
  snapshot: FinancialSnapshot;
}

export function ReadinessScore({ snapshot }: ReadinessScoreProps) {
  const [emergencyFundMonths, setEmergencyFundMonths] = useState<number>(6);
  const result = calculateReadinessScore(snapshot, emergencyFundMonths);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusIcon = (status: ReadinessFactor["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const handleAddToActionPlan = () => {
    toast.success("Added to Action Plan");
  };

  const handleRemindMe = () => {
    toast.success("Reminder set for monthly review");
  };

  return (
    <div className="space-y-6">
      {/* Header with Score */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Investment Readiness Score</CardTitle>
              <CardDescription>
                Assess foundation across five factors before optimizing assets
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Emergency Fund</div>
                <Select
                  value={emergencyFundMonths.toString()}
                  onValueChange={(v) => setEmergencyFundMonths(Number(v))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="4">4 months</SelectItem>
                    <SelectItem value="5">5 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className={`text-5xl font-bold ${getScoreColor(result.totalScore)}`}>
                {result.totalScore}
              </div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </div>
            <div className="text-right flex-1 max-w-md">
              <Progress value={result.totalScore} className="h-4 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not Ready</span>
                <span>Caution</span>
                <span>Ready</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="font-medium">{result.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Factor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.factors.map((factor) => (
          <Card key={factor.name}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{factor.name}</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-mono text-xs">{factor.formula}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                {getStatusIcon(factor.status)}
                <div className="text-2xl font-bold">{factor.score}/20</div>
              </div>
              <p className="text-sm text-muted-foreground">{factor.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Plan */}
      {result.totalScore < 80 && result.actionPlan.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Action Plan</CardTitle>
            <CardDescription>
              Follow these steps to improve your readiness score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {result.actionPlan.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm flex-1">{step}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddToActionPlan}>
                Add to Action Plan
              </Button>
              <Button variant="outline" onClick={handleRemindMe}>
                Remind Me Monthly
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA based on score */}
      {result.totalScore >= 80 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">Ready to Proceed!</CardTitle>
            <CardDescription>
              Your financial foundation is solid. Continue to Step 2.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-green-600 hover:bg-green-700">
              Continue to Optimize Assets
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
