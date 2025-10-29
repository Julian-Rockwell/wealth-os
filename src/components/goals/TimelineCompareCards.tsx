import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TimelineResult } from "@/utils/rpicCalculations";
import { Calendar, TrendingUp, Zap } from "lucide-react";

interface TimelineCompareCardsProps {
  timeline: TimelineResult;
  startingCapital: number;
  monthlyContribution: number;
  onStartingCapitalChange: (value: number) => void;
  onMonthlyContributionChange: (value: number) => void;
}

export function TimelineCompareCards({
  timeline,
  startingCapital,
  monthlyContribution,
  onStartingCapitalChange,
  onMonthlyContributionChange,
}: TimelineCompareCardsProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline Inputs</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="starting-capital">Starting Capital</Label>
            <Input
              id="starting-capital"
              type="number"
              value={startingCapital}
              onChange={(e) => onStartingCapitalChange(parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
            <Input
              id="monthly-contribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => onMonthlyContributionChange(parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Traditional */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                Traditional Passive
              </CardTitle>
              <Badge variant="outline">7% / 4% rule</Badge>
            </div>
            <CardDescription>Standard index fund approach</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Years to RPIC</span>
                <span className="text-2xl font-bold">{timeline.traditional.yearsToTarget.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Freedom Date</span>
                <span className="font-semibold flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(timeline.traditional.freedomDate)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Capital Needed</span>
                <span className="font-semibold">
                  ${(timeline.traditional.capitalNeeded / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Gap to Close</span>
                <span className="font-semibold text-warning">
                  ${(timeline.traditional.gap / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wealth OS */}
        <Card className="border-2 border-success bg-success/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-success" />
                Wealth OS Hybrid
              </CardTitle>
              <Badge className="bg-success text-success-foreground">25% / 10% hybrid</Badge>
            </div>
            <CardDescription>Active + Passive strategy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Years to RPIC</span>
                <span className="text-2xl font-bold text-success">
                  {timeline.wealthOS.yearsToTarget.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Freedom Date</span>
                <span className="font-semibold flex items-center gap-1 text-success">
                  <Calendar className="h-4 w-4" />
                  {formatDate(timeline.wealthOS.freedomDate)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Capital Needed</span>
                <span className="font-semibold text-success">
                  ${(timeline.wealthOS.capitalNeeded / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Gap to Close</span>
                <span className="font-semibold text-warning">
                  ${(timeline.wealthOS.gap / 1000).toFixed(0)}K
                </span>
              </div>
            </div>

            {/* Phase breakdown */}
            <div className="pt-3 border-t border-border space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">3-Phase Timeline</p>
              <div className="flex justify-between text-xs">
                <span>Phase 1: {timeline.wealthOS.phase1Years.toFixed(1)}y</span>
                <span>Phase 2: {timeline.wealthOS.phase2Years.toFixed(1)}y</span>
                <span>Phase 3: {timeline.wealthOS.phase3Years.toFixed(1)}y</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timing Alert */}
      {timeline.timingAlert && (
        <Card className="border-warning bg-warning/10">
          <CardContent className="py-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">
              ⚠️ {timeline.timingAlert.message}
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Required monthly contribution to meet {timeline.timingGoal}-year goal:</strong>{" "}
              ${timeline.timingAlert.requiredMonthlyContribution.toFixed(0)}/month
            </p>
          </CardContent>
        </Card>
      )}

      {/* Delta */}
      {timeline.deltaYears > 0 && (
        <Card className="border-success bg-success/10">
          <CardContent className="py-4">
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-success" />
              <p className="text-sm font-semibold">
                Wealth OS gets you to RPIC{" "}
                <span className="text-success text-lg">{timeline.deltaYears.toFixed(1)} years faster</span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
