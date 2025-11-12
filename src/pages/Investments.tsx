import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock, TrendingUp, AlertCircle } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { ReadinessScore } from "@/components/investments/ReadinessScore";
import { OptimizeAssets } from "@/components/investments/OptimizeAssets";
import { StrategySelection } from "@/components/investments/StrategySelection";
// import { CapitalAllocation } from "@/components/investments/CapitalAllocation";
import { PaperTradingProgress } from "@/components/investments/PaperTradingProgress";
import { NextActionCard } from "@/components/investments/NextActionCard";
import { BrokerStatusPanel } from "@/components/investments/BrokerStatusPanel";
import { BrokerSetupWizard } from "@/components/investments/BrokerSetupWizard";
import { calculateReadinessScore } from "@/utils/investmentCalculations";
import type { TradingStrategy } from "@/types/trading";

export default function Investments() {
  const { snapshot, paperTradingData, selectedStrategy, setSelectedStrategy, brokerSetup } = useFinancialData();
  const [activeTab, setActiveTab] = useState("readiness");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Calculate readiness score to determine gating
  const readinessResult = useMemo(() => {
    if (!snapshot) return null;
    return calculateReadinessScore(snapshot, 6);
  }, [snapshot]);

  // TESTING MODE: All tabs unlocked for demo/testing purposes
  const isReady = true;
  const hasSelectedStrategy = true;
  const isPaperTradingComplete = true;

  const handleStrategyConfirmed = (strategy: TradingStrategy) => {
    setSelectedStrategy(strategy);
    setActiveTab("broker-setup");
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
              Next, select your <strong>Trading Strategy</strong> based on a personalized assessment, then complete 
              <strong>Broker Setup</strong> to choose and configure your trading account. 
              Complete <strong>Paper Trading gates</strong> (40 trades, 95% adherence, 70% checklist) to complete 
              the preparation process.
            </p>
          </div>
        </div>
      </div>

      {/* Warning Alert when Foundation Score < 80 */}
      {readinessResult && readinessResult.totalScore < 80 && (
        <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950/20">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900 dark:text-red-200">
            <strong>Foundation Score Below Recommended Level ({readinessResult.totalScore}/100)</strong>
            <p className="mt-2">
              While you can explore Strategy Selection and Broker Setup, we strongly recommend 
              strengthening your financial foundation first. Proceeding without a solid base 
              may increase risk. Review the Readiness tab for specific recommendations.
            </p>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="readiness">Readiness</TabsTrigger>
          <TabsTrigger value="optimize">Optimize</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="broker-setup">Broker Setup</TabsTrigger>
          <TabsTrigger value="paper-trading">Paper Trading</TabsTrigger>
          {/* <TabsTrigger value="allocation">Allocation</TabsTrigger> */}
        </TabsList>

        <TabsContent value="readiness" className="mt-6">
          <ReadinessScore snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="optimize" className="mt-6">
          <OptimizeAssets snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="strategy" className="mt-6">
          <StrategySelection onStrategyConfirmed={handleStrategyConfirmed} />
        </TabsContent>

        <TabsContent value="broker-setup" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {readinessResult && (
                <NextActionCard 
                  readinessScore={readinessResult.totalScore}
                  onOpenWizard={() => setIsWizardOpen(true)}
                />
              )}
            </div>
            
            <div className="lg:col-span-1">
              <BrokerStatusPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="paper-trading" className="mt-6">
          {paperTradingData ? (
            <PaperTradingProgress progress={paperTradingData} />
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                No paper trading data available. Load sample data to see your progress.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* <TabsContent value="allocation" className="mt-6">
          <CapitalAllocation snapshot={snapshot} />
        </TabsContent> */}
      </Tabs>

      {selectedStrategy && (
        <BrokerSetupWizard
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
          selectedStrategy={selectedStrategy}
          initialStep={brokerSetup?.wizardStep || 1}
          onComplete={() => setActiveTab("paper-trading")}
        />
      )}
    </div>
  );
}
