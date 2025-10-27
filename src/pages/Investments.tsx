import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { ReadinessScore } from "@/components/investments/ReadinessScore";
import { OptimizeAssets } from "@/components/investments/OptimizeAssets";
import { CapitalAllocation } from "@/components/investments/CapitalAllocation";
import { calculateReadinessScore } from "@/utils/investmentCalculations";

export default function Investments() {
  const { snapshot } = useFinancialData();
  const [activeTab, setActiveTab] = useState("readiness");

  // Calculate readiness score to determine gating
  const readinessResult = useMemo(() => {
    if (!snapshot) return null;
    return calculateReadinessScore(snapshot, 6);
  }, [snapshot]);

  const isReady = readinessResult && readinessResult.totalScore >= 80;

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
            Foundation score must be 80+ to enable Optimization. Complete foundation first.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="readiness">Readiness Score</TabsTrigger>
          <TabsTrigger value="optimize" disabled={!isReady}>
            <span className="flex items-center gap-2">
              {!isReady && <Lock className="h-3 w-3" />}
              Optimize Assets
            </span>
          </TabsTrigger>
          <TabsTrigger value="allocation" disabled={!isReady}>
            <span className="flex items-center gap-2">
              {!isReady && <Lock className="h-3 w-3" />}
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

        <TabsContent value="allocation" className="mt-6">
          {isReady ? (
            <CapitalAllocation snapshot={snapshot} />
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Complete the Readiness Score requirements (score ≥80) to unlock capital allocation.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
