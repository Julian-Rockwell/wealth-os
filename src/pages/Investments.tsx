import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, TrendingUp } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { ReadinessScore } from "@/components/investments/ReadinessScore";
import { OptimizeAssets } from "@/components/investments/OptimizeAssets";
import { StrategySelection } from "@/components/investments/StrategySelection";
import { CapitalAllocation } from "@/components/investments/CapitalAllocation";
import { PaperTradingProgress } from "@/components/investments/PaperTradingProgress";
import { calculateReadinessScore } from "@/utils/investmentCalculations";
import type { TradingStrategy } from "@/types/trading";

export default function Investments() {
  const { snapshot, paperTradingData, selectedStrategy, setSelectedStrategy } = useFinancialData();
  const [activeTab, setActiveTab] = useState("readiness");

  // Calculate readiness score to determine gating
  const readinessResult = useMemo(() => {
    if (!snapshot) return null;
    return calculateReadinessScore(snapshot, 6);
  }, [snapshot]);

  const isReady = readinessResult && readinessResult.totalScore >= 80;
  const hasSelectedStrategy = selectedStrategy !== null;

  // Use paper trading data from context
  const isPaperTradingComplete = paperTradingData?.isReadyForLiveTrading || false;

  const handleStrategyConfirmed = (strategy: TradingStrategy) => {
    setSelectedStrategy(strategy);
    setActiveTab("paper-trading");
  };

  if (!snapshot) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Please load financial data from the Command Center first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Description */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/20">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Investment Planning</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>What you'll find here:</strong> A comprehensive 5-step process to prepare for active trading. 
              Start by assessing your financial foundation with the <strong>Readiness Score</strong>, then identify 
              opportunities to <strong>Optimize Assets</strong> (liquidate equity or pay off high-interest debt). 
              Next, select your <strong>Trading Strategy</strong> based on a personalized assessment. 
              Complete <strong>Paper Trading gates</strong> (40 trades, 95% adherence, 70% checklist) before unlocking 
              <strong>Capital Allocation</strong> where you'll define your trading account cap, emergency fund, 
              and feeding strategy for passive income.
            </p>
          </div>
        </div>
      </div>

      {!isReady && activeTab !== "readiness" && (
        <Alert variant="destructive">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Foundation score must be 80+ to enable next steps. Complete foundation first.
          </AlertDescription>
        </Alert>
      )}

      {!hasSelectedStrategy && (activeTab === "paper-trading" || activeTab === "allocation") && (
        <Alert variant="destructive">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Select a trading strategy before proceeding to Paper Trading.
          </AlertDescription>
        </Alert>
      )}

      {!isPaperTradingComplete && activeTab === "allocation" && (
        <Alert variant="destructive">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Complete Paper Trading gates (40 trades with ≥95% adherence + 70% checklist) before Capital Allocation.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="readiness">Readiness</TabsTrigger>
          <TabsTrigger value="optimize" disabled={!isReady}>
            <span className="flex items-center gap-2">
              {!isReady && <Lock className="h-3 w-3" />}
              Optimize
            </span>
          </TabsTrigger>
          <TabsTrigger value="strategy" disabled={!isReady}>
            <span className="flex items-center gap-2">
              {!isReady && <Lock className="h-3 w-3" />}
              Strategy
            </span>
          </TabsTrigger>
          <TabsTrigger value="paper-trading" disabled={!isReady || !hasSelectedStrategy}>
            <span className="flex items-center gap-2">
              {(!isReady || !hasSelectedStrategy) && <Lock className="h-3 w-3" />}
              Paper Trading
            </span>
          </TabsTrigger>
          <TabsTrigger value="allocation" disabled={!isReady || !hasSelectedStrategy || !isPaperTradingComplete}>
            <span className="flex items-center gap-2">
              {(!isReady || !hasSelectedStrategy || !isPaperTradingComplete) && <Lock className="h-3 w-3" />}
              Allocation
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="readiness" className="mt-6">
          <ReadinessScore snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="optimize" className="mt-6">
          {isReady ? (
            <OptimizeAssets snapshot={snapshot} />
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Complete the Readiness Score requirements (score ≥80) to unlock asset optimization.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="strategy" className="mt-6">
          {isReady ? (
            <StrategySelection onStrategyConfirmed={handleStrategyConfirmed} />
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Complete the Readiness Score requirements (score ≥80) to select your strategy.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="paper-trading" className="mt-6">
          {isReady && hasSelectedStrategy ? (
            paperTradingData ? (
              <PaperTradingProgress progress={paperTradingData} />
            ) : (
              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  No paper trading data available. Load sample data to see your progress.
                </AlertDescription>
              </Alert>
            )
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                {!isReady 
                  ? "Complete the Readiness Score requirements (score ≥80) first."
                  : "Select a trading strategy before starting paper trading."}
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="allocation" className="mt-6">
          {isReady && hasSelectedStrategy && isPaperTradingComplete ? (
            <CapitalAllocation snapshot={snapshot} />
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                {!isReady 
                  ? "Complete the Readiness Score requirements (score ≥80) first."
                  : !hasSelectedStrategy
                  ? "Select a trading strategy before proceeding to capital allocation."
                  : "Complete Paper Trading gates (40 trades + ≥95% adherence + 70% checklist) to unlock capital allocation."}
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
