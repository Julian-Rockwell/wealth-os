import { useState } from "react";
import { useFinancialData } from "@/contexts/FinancialDataContext";

import { KpiPanel } from "@/components/dashboard/KpiPanel";
import { ViewToggle } from "@/components/dashboard/ViewToggle";
import { FiltersCard } from "@/components/dashboard/FiltersCard";
import { BudgetDonut } from "@/components/dashboard/BudgetDonut";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MonthlyStackedBars } from "@/components/dashboard/MonthlyStackedBars";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { KeyInsights } from "@/components/dashboard/KeyInsights";
import { PersonalizedRecommendations } from "@/components/dashboard/PersonalizedRecommendations";
import { NetWorthKPI } from "@/components/dashboard/NetWorthKPI";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { HoldingsTable } from "@/components/dashboard/HoldingsTable";
import { LiabilitiesTable } from "@/components/dashboard/LiabilitiesTable";
import { LiquidAssetsPanel } from "@/components/dashboard/LiquidAssetsPanel";
import { AssetAllocationView } from "@/components/dashboard/AssetAllocationView";
import { useDashboardData } from "@/hooks/useDashboardData";
import type { FinancialSnapshot } from "@/types/financial";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle, Database } from "lucide-react";
import { SAMPLE_REYNOLDS_DATA } from "@/utils/sampleData";
import { toast } from "sonner";
export type ViewMode = "category" | "subcategory" | "merchant" | "liquidity" | "custom";

interface DashboardProps {
  onContinue?: () => void;
}

export default function Dashboard({ onContinue }: DashboardProps = {}) {
  const [viewMode, setViewMode] = useState<ViewMode>("category");
  const { data, updateTransaction, deleteTransaction, filters, setFilters } = useDashboardData();
  const { snapshot, setSnapshot, resetAllData } = useFinancialData();
  const [reviewed, setReviewed] = useState(false);

  const handleLoadSampleData = () => {
    if (confirm("Load Reynolds Family demo data? This will replace any existing data.")) {
      resetAllData();
      setSnapshot(SAMPLE_REYNOLDS_DATA);
      toast.success("Sample data loaded successfully!");
    }
  };

  const handleContinueToAnalyzer = () => {
    if (!reviewed || !snapshot) {
      return;
    }
    
    // Update snapshot with reviewed flag
    const updatedSnapshot = {
      ...snapshot,
      uiFlags: {
        ...snapshot.uiFlags,
        reviewedIn11: true,
      },
    };
    setSnapshot(updatedSnapshot);
    
    // Call onContinue callback
    onContinue?.();
  };

  // If no snapshot, show message
  if (!snapshot) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Empty State Banner */}
          <div className="mb-6 p-8 rounded-lg bg-card border-2 border-dashed text-center">
            <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Data Loaded</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Load the Reynolds Family demo to see a complete financial snapshot
            </p>
            <Button onClick={handleLoadSampleData} className="gradient-primary">
              <Database className="w-4 h-4 mr-2" />
              Load Sample Data
            </Button>
          </div>

          <div className="grid lg:grid-cols-[320px,1fr] gap-6">
            {/* Left Column - KPIs */}
            <div className="space-y-6">
              <KpiPanel data={data} />
            </div>

            {/* Right Column - Visualizations & Data */}
            <div className="space-y-6">
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <BudgetDonut data={data} viewMode={viewMode} />
                <MonthlyStackedBars data={data} />
              </div>

              <FiltersCard data={data} filters={filters} setFilters={setFilters} />

              <TransactionsTable 
                transactions={data.txns} 
                onUpdate={updateTransaction}
                onDelete={deleteTransaction}
                filters={filters}
              />

              <KeyInsights data={data} />

              <PersonalizedRecommendations data={data} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // New Command Center with Financial Snapshot
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Backfill Alert */}
        {snapshot.analyzedPeriod.totalMonths < 3 && (
          <div className="mb-6 p-4 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-medium">Limited Historical Data</p>
                <p className="text-xs text-muted-foreground">
                  Add more transaction history to unlock full trend analysis. Current coverage: {snapshot.analyzedPeriod.totalMonths} month(s). Target: 3+ months.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-[360px,1fr] gap-6">
          {/* Left Column - KPIs & Status */}
          <div className="space-y-6">
            <NetWorthKPI snapshot={snapshot} />
            <ConnectionStatus accounts={snapshot.accounts} />
            <LiquidAssetsPanel holdings={snapshot.holdings} />
          </div>

          {/* Right Column - Data & Visualizations */}
          <div className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <BudgetDonut data={data} viewMode={viewMode} />
              <MonthlyStackedBars data={data} />
            </div>

            {/* Unified Data Table Card with Tabs */}
            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-6">Financial Data</h3>
              
              <Tabs defaultValue="holdings" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="holdings">Holdings & Assets</TabsTrigger>
                  <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>

                <TabsContent value="holdings" className="mt-6">
                  <HoldingsTable holdings={snapshot.holdings} />
                </TabsContent>

                <TabsContent value="liabilities" className="mt-6">
                  <LiabilitiesTable liabilities={snapshot.liabilities} />
                </TabsContent>

                <TabsContent value="transactions" className="mt-6">
                  <FiltersCard data={data} filters={filters} setFilters={setFilters} />
                  <div className="mt-4">
                    <TransactionsTable 
                      transactions={data.txns} 
                      onUpdate={updateTransaction}
                      onDelete={deleteTransaction}
                      filters={filters}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Asset Allocation */}
            <AssetAllocationView holdings={snapshot.holdings} />

            {/* Insights & Recommendations */}
            <KeyInsights data={data} />
            <PersonalizedRecommendations data={data} />

            {/* Placeholders for Phase 2 */}
            <Card className="p-6 shadow-soft border-dashed">
              <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Cash Flow Analysis</h3>
              <p className="text-sm text-muted-foreground">Phase 2: Detailed income vs expenses over time</p>
            </Card>
            
            <Card className="p-6 shadow-soft border-dashed">
              <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Reports & Exports</h3>
              <p className="text-sm text-muted-foreground">Phase 2: Generate detailed PDF/CSV reports</p>
            </Card>

            {/* Footer with review checkbox and continue button */}
            <div className="flex items-center justify-between p-6 bg-card rounded-lg shadow-soft border">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="reviewed" 
                  checked={reviewed}
                  onCheckedChange={(checked) => setReviewed(checked === true)}
                />
                <Label htmlFor="reviewed" className="text-sm font-medium cursor-pointer">
                  I reviewed my data and it's accurate
                </Label>
              </div>
              <Button 
                size="lg"
                disabled={!reviewed}
                onClick={handleContinueToAnalyzer}
                className="gradient-primary"
              >
                Save Data Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
