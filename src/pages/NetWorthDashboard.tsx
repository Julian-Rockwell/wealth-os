import { useFinancialData } from "@/contexts/FinancialDataContext";
import { NetWorthKPICard } from "@/components/dashboard/NetWorthKPICard";
import { AssetsKPICard } from "@/components/dashboard/AssetsKPICard";
import { LiabilitiesKPICard } from "@/components/dashboard/LiabilitiesKPICard";
import { LiquidAssetsPanel } from "@/components/dashboard/LiquidAssetsPanel";
import { HoldingsTable } from "@/components/dashboard/HoldingsTable";
import { LiabilitiesTable } from "@/components/dashboard/LiabilitiesTable";
import { AssetAllocationView } from "@/components/dashboard/AssetAllocationView";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Database, LayoutDashboard, AlertTriangle } from "lucide-react";
import type { Holding, Liability } from "@/types/financial";
import { updateSnapshotHoldings, updateSnapshotLiabilities } from "@/utils/snapshotHelpers";

export default function NetWorthDashboard() {
  const { snapshot, setSnapshot } = useFinancialData();

  console.log({snapshot})

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

        {/* Main Layout - Vertical Stack */}
        <div className="space-y-6">
          {/* Top KPIs - 3 cards horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NetWorthKPICard snapshot={snapshot} />
            <AssetsKPICard totalAssets={snapshot.netWorth.assets} />
            <LiabilitiesKPICard 
              totalLiabilities={snapshot.netWorth.liabilities} 
              liabilities={snapshot.liabilities}
            />
          </div>

          {/* Consolidated Card */}
          <Card className="p-6 shadow-sm">
            <div><h3 className="text-lg font-semibold mb-6">Asset Distribution</h3><AssetAllocationView holdings={snapshot.holdings} /></div>
            <div className="my-8 border-t" />
            <div><h3 className="text-lg font-semibold mb-6">Liquid Assets</h3><LiquidAssetsPanel holdings={snapshot.holdings} /></div>
            <div className="my-8 border-t" />
            <div>
              <h3 className="text-lg font-semibold mb-6">Financial Data</h3>
              
              {/* KPIs de Liabilities - Siempre visibles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Debt</p>
                  <p className="text-2xl font-bold text-destructive">
                    ${snapshot.netWorth.liabilities.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-2xl font-bold">
                    ${snapshot.liabilities.reduce((sum, l) => sum + l.monthlyPayment, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Weighted Avg APR</p>
                  <p className="text-2xl font-bold">
                    {snapshot.netWorth.liabilities > 0 
                      ? (snapshot.liabilities.reduce((sum, l) => sum + (l.apr * l.balance), 0) / snapshot.netWorth.liabilities).toFixed(2)
                      : '0.00'}%
                  </p>
                </div>
              </div>
              
              {/* Priority Levels */}
              <div className="flex items-center justify-between mb-6 p-3 bg-muted/20 rounded border">
                <span className="text-sm font-medium text-muted-foreground">Priority Levels:</span>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">
                      <span className="font-semibold text-destructive">URGENT</span> &gt;18% APR
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-sm">
                      <span className="font-semibold text-warning">Consider</span> 8-18% APR
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-success/20" />
                    <span className="text-sm">
                      <span className="font-semibold text-success">Maintain</span> &lt;8% APR
                    </span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="holdings" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="holdings">Holdings & Assets</TabsTrigger>
                <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
              </TabsList>
              <TabsContent value="holdings" className="mt-4"><HoldingsTable holdings={snapshot.holdings} onUpdate={(id, updates) => setSnapshot(updateSnapshotHoldings(snapshot, snapshot.holdings.map(h => h.id === id ? { ...h, ...updates } : h)))} onDelete={(id) => setSnapshot(updateSnapshotHoldings(snapshot, snapshot.holdings.filter(h => h.id !== id)))} onAdd={() => setSnapshot(updateSnapshotHoldings(snapshot, [...snapshot.holdings, { id: `holding-${Date.now()}`, accountId: "manual-1", name: "New Asset", accountType: "other", assetClass: "other", liquidity: "liquid", balance: 0, currency: "USD", source: "manual" }]))} /></TabsContent>
              <TabsContent value="liabilities" className="mt-4"><LiabilitiesTable liabilities={snapshot.liabilities} onUpdate={(id, updates) => setSnapshot(updateSnapshotLiabilities(snapshot, snapshot.liabilities.map(l => l.id === id ? { ...l, ...updates } : l)))} onDelete={(id) => setSnapshot(updateSnapshotLiabilities(snapshot, snapshot.liabilities.filter(l => l.id !== id)))} onAdd={() => setSnapshot(updateSnapshotLiabilities(snapshot, [...snapshot.liabilities, { id: `liability-${Date.now()}`, accountId: "manual-1", name: "New Liability", type: "other", apr: 0, balance: 0, monthlyPayment: 0, remainingTermMonths: 0 }]))} /></TabsContent>
            </Tabs></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
