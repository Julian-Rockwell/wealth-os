import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Lock, Unlock } from "lucide-react";
import type { PaperTradingProgress } from "@/types/trading";

interface PaperTradingProgressProps {
  progress: PaperTradingProgress;
}

// Default checklist items (25 points)
const DEFAULT_CHECKLIST = [
  { category: "Planning", item: "Written trading plan with entry/exit rules", required: true },
  { category: "Planning", item: "Risk management strategy defined", required: true },
  { category: "Planning", item: "Position sizing rules established", required: true },
  { category: "Planning", item: "Stop-loss and take-profit levels identified", required: true },
  { category: "Psychology", item: "Emotional trading triggers documented", required: true },
  { category: "Psychology", item: "Daily pre-market routine established", required: true },
  { category: "Psychology", item: "Loss acceptance protocol in place", required: true },
  { category: "Technical", item: "Platform proficiency demonstrated", required: true },
  { category: "Technical", item: "Order types mastered (limit, stop, etc.)", required: true },
  { category: "Technical", item: "Chart reading skills validated", required: true },
  { category: "Technical", item: "Indicator interpretation documented", required: true },
  { category: "Risk", item: "Max loss per trade defined (1-2% rule)", required: true },
  { category: "Risk", item: "Daily loss limit established", required: true },
  { category: "Risk", item: "Account drawdown threshold set", required: true },
  { category: "Risk", item: "Portfolio correlation analyzed", required: true },
  { category: "Execution", item: "Trade journal maintained consistently", required: true },
  { category: "Execution", item: "Post-trade review process implemented", required: true },
  { category: "Execution", item: "Mistake documentation system in place", required: true },
  { category: "Execution", item: "Win/loss analysis conducted", required: true },
  { category: "Strategy", item: "Strategy backtested with historical data", required: false },
  { category: "Strategy", item: "Multiple timeframes analyzed", required: false },
  { category: "Strategy", item: "Market condition adaptations planned", required: false },
  { category: "Advanced", item: "Volatility impact understood", required: false },
  { category: "Advanced", item: "Correlation with market indices tracked", required: false },
  { category: "Advanced", item: "Tax implications researched", required: false },
];

export function PaperTradingProgress({ progress }: PaperTradingProgressProps) {
  const tradesProgress = (progress.totalTrades / progress.requiredTrades) * 100;
  const adherenceProgress = progress.adherenceRate;
  const checklistProgress = progress.checklistScore;

  const tradesGateMet = progress.totalTrades >= progress.requiredTrades;
  const adherenceGateMet = progress.adherenceRate >= progress.requiredAdherence;
  const checklistGateMet = progress.checklistScore >= progress.requiredChecklistScore;

  const checklist = progress.checklist.length > 0 ? progress.checklist : DEFAULT_CHECKLIST.map((item, idx) => ({
    id: `check-${idx}`,
    ...item,
    completed: false,
  }));

  const groupedChecklist = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof checklist>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Paper Trading Gates <span className="text-xs text-muted-foreground font-normal ml-2">(fixed examples)</span></h3>
        <p className="text-sm text-muted-foreground">
          Complete these requirements before live trading with real capital
        </p>
      </div>

      {/* Overall Status */}
      <Alert variant={progress.isReadyForLiveTrading ? "default" : "destructive"}>
        {progress.isReadyForLiveTrading ? (
          <Unlock className="h-4 w-4" />
        ) : (
          <Lock className="h-4 w-4" />
        )}
        <AlertDescription>
          {progress.isReadyForLiveTrading ? (
            <span className="text-success-foreground font-semibold">
              ✅ All gates passed! You're ready for live trading.
            </span>
          ) : (
            <span>
              🚫 Complete all three gates below before proceeding to Capital Allocation.
            </span>
          )}
        </AlertDescription>
      </Alert>

      {/* Gate 1: Paper Trades */}
      <Card className={tradesGateMet ? "border-success" : "border-warning"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Gate 1: Paper Trade Volume</CardTitle>
            <Badge variant={tradesGateMet ? "default" : "outline"}>
              {tradesGateMet ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
              {progress.totalTrades} / {progress.requiredTrades}
            </Badge>
          </div>
          <CardDescription>Complete at least 40 paper trades</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={Math.min(tradesProgress, 100)} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {tradesGateMet
              ? "✅ Trade volume requirement met"
              : `${progress.requiredTrades - progress.totalTrades} more trades needed`}
          </p>
        </CardContent>
      </Card>

      {/* Gate 2: Plan Adherence */}
      <Card className={adherenceGateMet ? "border-success" : "border-warning"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Gate 2: Plan Adherence</CardTitle>
            <Badge variant={adherenceGateMet ? "default" : "outline"}>
              {adherenceGateMet ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
              {progress.adherenceRate.toFixed(1)}%
            </Badge>
          </div>
          <CardDescription>Maintain ≥95% adherence to your trading plan</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={adherenceProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {adherenceGateMet
              ? "✅ Plan adherence requirement met"
              : `Need ${(progress.requiredAdherence - progress.adherenceRate).toFixed(1)}% more adherence`}
          </p>
        </CardContent>
      </Card>

      {/* Gate 3: Checklist */}
      <Card className={checklistGateMet ? "border-success" : "border-warning"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Gate 3: Trading Readiness Checklist</CardTitle>
            <Badge variant={checklistGateMet ? "default" : "outline"}>
              {checklistGateMet ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
              {progress.checklistScore.toFixed(0)}%
            </Badge>
          </div>
          <CardDescription>Complete ≥70% of the 25-point readiness checklist</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={checklistProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {checklistGateMet
              ? "✅ Checklist score requirement met"
              : `${(progress.requiredChecklistScore - progress.checklistScore).toFixed(0)}% more completion needed`}
          </p>

          {/* Checklist Details */}
          <div className="space-y-3 mt-4">
            {Object.entries(groupedChecklist).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold mb-2">{category}</h4>
                <div className="space-y-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 text-xs">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <span className={item.completed ? "text-foreground" : "text-muted-foreground"}>
                        {item.item}
                        {item.required && <span className="text-destructive ml-1">*</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
