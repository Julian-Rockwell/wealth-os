import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { ReadinessScore } from "@/components/investments/ReadinessScore";
import { OptimizeAssets } from "@/components/investments/OptimizeAssets";
import { CapitalAllocation } from "@/components/investments/CapitalAllocation";
import { PaperTradingProgress } from "@/components/investments/PaperTradingProgress";
import { calculateReadinessScore } from "@/utils/investmentCalculations";
import type { PaperTradingProgress as PaperTradingProgressType } from "@/types/trading";

export default function Investments() {
  const { snapshot } = useFinancialData();
  const [activeTab, setActiveTab] = useState("readiness");

  // Calculate readiness score to determine gating
  const readinessResult = useMemo(() => {
    if (!snapshot) return null;
    return calculateReadinessScore(snapshot, 6);
  }, [snapshot]);

  const isReady = readinessResult && readinessResult.totalScore >= 80;

  // Mock paper trading progress (in production, this would come from database/context)
  const paperTradingProgress: PaperTradingProgressType = {
    totalTrades: 35,
    requiredTrades: 40,
    adherenceRate: 92,
    requiredAdherence: 95,
    checklist: [],
    checklistScore: 65,
    requiredChecklistScore: 70,
    isReadyForLiveTrading: false,
  };

  const isPaperTradingComplete = paperTradingProgress.isReadyForLiveTrading;

  if (!snapshot) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Please load financial data from the Command Center first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Investment Planning</h2>
        <p className="text-muted-foreground mt-1">
          Assess readiness, optimize assets, and allocate capital strategically
        </p>
      </div>

      {!isReady && activeTab !== "readiness" && (
        <Alert variant="destructive">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Foundation score must be 80+ to enable next steps. Complete foundation first.
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="readiness">Readiness Score</TabsTrigger>
          <TabsTrigger value="optimize" disabled={!isReady}>
            <span className="flex items-center gap-2">
              {!isReady && <Lock className="h-3 w-3" />}
              Optimize Assets
            </span>
          </TabsTrigger>
          <TabsTrigger value="paper-trading" disabled={!isReady}>
            <span className="flex items-center gap-2">
              {!isReady && <Lock className="h-3 w-3" />}
              Paper Trading
            </span>
          </TabsTrigger>
          <TabsTrigger value="allocation" disabled={!isReady || !isPaperTradingComplete}>
            <span className="flex items-center gap-2">
              {(!isReady || !isPaperTradingComplete) && <Lock className="h-3 w-3" />}
              Capital Allocation
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

        <TabsContent value="paper-trading" className="mt-6">
          {isReady ? (
            <PaperTradingProgress progress={paperTradingProgress} />
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Complete the Readiness Score requirements (score ≥80) to start paper trading.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="allocation" className="mt-6">
          {isReady && isPaperTradingComplete ? (
            <CapitalAllocation snapshot={snapshot} />
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                {!isReady 
                  ? "Complete the Readiness Score requirements (score ≥80) first."
                  : "Complete Paper Trading gates (40 trades + ≥95% adherence + 70% checklist) to unlock capital allocation."}
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
