import { useFinancialData } from "@/contexts/FinancialDataContext";
import { NetWorthKPI } from "@/components/dashboard/NetWorthKPI";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { LiquidAssetsPanel } from "@/components/dashboard/LiquidAssetsPanel";
import { HoldingsTable } from "@/components/dashboard/HoldingsTable";
import { LiabilitiesTable } from "@/components/dashboard/LiabilitiesTable";
import { AssetAllocationView } from "@/components/dashboard/AssetAllocationView";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_REYNOLDS_DATA } from "@/utils/sampleData";
import { toast } from "sonner";
import type { Holding, Liability } from "@/types/financial";

export default function NetWorthDashboard() {
  const { snapshot, setSnapshot, resetAllData } = useFinancialData();

  const handleLoadSampleData = () => {
    if (confirm("Load Reynolds Family demo data? This will replace any existing data.")) {
      resetAllData();
      setSnapshot(SAMPLE_REYNOLDS_DATA);
      toast.success("Sample data loaded successfully!");
    }
  };

  if (!snapshot) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 p-8 rounded-lg bg-card border-2 border-dashed text-center">
            <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Data Loaded</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Load sample data or add your financial information in the "Automatic Account Aggregation" tab
            </p>
            <Button onClick={handleLoadSampleData} className="gradient-primary">
              <Database className="w-4 h-4 mr-2" />
              Load Sample Data
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

          {/* Right Column - Data Tables */}
          <div className="space-y-6">
            {/* Holdings & Liabilities Tables */}
            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-6">Financial Data</h3>
              
              <Tabs defaultValue="holdings" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="holdings">Holdings & Assets</TabsTrigger>
                  <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
                </TabsList>

                <TabsContent value="holdings" className="mt-6">
                  <HoldingsTable 
                    holdings={snapshot.holdings}
                    onUpdate={(id, updates) => {
                      const updated = snapshot.holdings.map(h => 
                        h.id === id ? { ...h, ...updates } : h
                      );
                      setSnapshot({ ...snapshot, holdings: updated });
                    }}
                    onDelete={(id) => {
                      const updated = snapshot.holdings.filter(h => h.id !== id);
                      setSnapshot({ ...snapshot, holdings: updated });
                    }}
                    onAdd={() => {
                      const newHolding: Holding = {
                        id: `holding-${Date.now()}`,
                        accountId: "manual-1",
                        name: "New Asset",
                        accountType: "other",
                        assetClass: "other",
                        liquidity: "liquid",
                        balance: 0,
                        currency: "USD",
                        source: "manual",
                      };
                      setSnapshot({ 
                        ...snapshot, 
                        holdings: [...snapshot.holdings, newHolding] 
                      });
                    }}
                  />
                </TabsContent>

                <TabsContent value="liabilities" className="mt-6">
                  <LiabilitiesTable 
                    liabilities={snapshot.liabilities}
                    onUpdate={(id, updates) => {
                      const updated = snapshot.liabilities.map(l => 
                        l.id === id ? { ...l, ...updates } : l
                      );
                      setSnapshot({ ...snapshot, liabilities: updated });
                    }}
                    onDelete={(id) => {
                      const updated = snapshot.liabilities.filter(l => l.id !== id);
                      setSnapshot({ ...snapshot, liabilities: updated });
                    }}
                    onAdd={() => {
                      const newLiability: Liability = {
                        id: `liability-${Date.now()}`,
                        accountId: "manual-1",
                        name: "New Liability",
                        type: "other",
                        apr: 0,
                        balance: 0,
                        monthlyPayment: 0,
                        remainingTermMonths: 0,
                      };
                      setSnapshot({ 
                        ...snapshot, 
                        liabilities: [...snapshot.liabilities, newLiability] 
                      });
                    }}
                  />
                </TabsContent>
              </Tabs>
            </Card>

            {/* Asset Allocation */}
            <AssetAllocationView holdings={snapshot.holdings} />
          </div>
        </div>
      </div>
    </div>
  );
}
