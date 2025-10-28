import { useFinancialData } from "@/contexts/FinancialDataContext";
import { NetWorthKPI } from "@/components/dashboard/NetWorthKPI";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { LiquidAssetsPanel } from "@/components/dashboard/LiquidAssetsPanel";
import { HoldingsTable } from "@/components/dashboard/HoldingsTable";
import { LiabilitiesTable } from "@/components/dashboard/LiabilitiesTable";
import { AssetAllocationView } from "@/components/dashboard/AssetAllocationView";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Database, LayoutDashboard } from "lucide-react";
import type { Holding, Liability } from "@/types/financial";
import { updateSnapshotHoldings, updateSnapshotLiabilities } from "@/utils/snapshotHelpers";

export default function NetWorthDashboard() {
  const { snapshot, setSnapshot } = useFinancialData();

  if (!snapshot) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Page Description */}
          <div className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/20">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Net Worth Dashboard</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>What you'll find here:</strong> A comprehensive view of your <strong>net worth</strong> 
                  (assets minus liabilities). Track all your holdings (checking, savings, brokerage, real estate, vehicles) 
                  and liabilities (mortgage, auto loans, credit cards). See asset allocation by class (cash, stocks, bonds, 
                  real estate), liquid assets breakdown, and connection status for each account. This is your financial 
                  snapshot—the foundation for all other analyses.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 p-8 rounded-lg bg-card border-2 border-dashed text-center">
            <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Data Loaded</h2>
            <p className="text-sm text-muted-foreground">
              Add your financial information in the "Automatic Account Aggregation" tab or load sample data
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Description */}
        <div className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <LayoutDashboard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Net Worth Dashboard</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What you'll find here:</strong> A comprehensive view of your <strong>net worth</strong> 
                (assets minus liabilities). Track all your holdings (checking, savings, brokerage, real estate, vehicles) 
                and liabilities (mortgage, auto loans, credit cards). See asset allocation by class (cash, stocks, bonds, 
                real estate), liquid assets breakdown, and connection status for each account. This is your financial 
                snapshot—the foundation for all other analyses.
              </p>
            </div>
          </div>
        </div>
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
                      setSnapshot(updateSnapshotHoldings(snapshot, updated));
                    }}
                    onDelete={(id) => {
                      const updated = snapshot.holdings.filter(h => h.id !== id);
                      setSnapshot(updateSnapshotHoldings(snapshot, updated));
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
                      setSnapshot(updateSnapshotHoldings(snapshot, [...snapshot.holdings, newHolding]));
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
                      setSnapshot(updateSnapshotLiabilities(snapshot, updated));
                    }}
                    onDelete={(id) => {
                      const updated = snapshot.liabilities.filter(l => l.id !== id);
                      setSnapshot(updateSnapshotLiabilities(snapshot, updated));
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
                      setSnapshot(updateSnapshotLiabilities(snapshot, [...snapshot.liabilities, newLiability]));
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
