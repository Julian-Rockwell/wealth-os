import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KpiPanel } from "@/components/dashboard/KpiPanel";
import { ViewToggle } from "@/components/dashboard/ViewToggle";
import { FiltersCard } from "@/components/dashboard/FiltersCard";
import { BudgetDonut } from "@/components/dashboard/BudgetDonut";
import { MonthlyStackedBars } from "@/components/dashboard/MonthlyStackedBars";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { KeyInsights } from "@/components/dashboard/KeyInsights";
import { PersonalizedRecommendations } from "@/components/dashboard/PersonalizedRecommendations";
import { NetWorthKPI } from "@/components/dashboard/NetWorthKPI";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { HoldingsTable } from "@/components/dashboard/HoldingsTable";
import { LiabilitiesTable } from "@/components/dashboard/LiabilitiesTable";
import { LiquidAssetsPanel } from "@/components/dashboard/LiquidAssetsPanel";
import { useDashboardData } from "@/hooks/useDashboardData";
import type { FinancialSnapshot } from "@/types/financial";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export type ViewMode = "category" | "subcategory" | "merchant" | "liquidity" | "custom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("category");
  const { data, updateTransaction, filters, setFilters } = useDashboardData();
  const [snapshot, setSnapshot] = useState<FinancialSnapshot | null>(null);
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("financialSnapshot");
    if (stored) {
      setSnapshot(JSON.parse(stored));
    }
  }, []);

  const handleContinueToAnalyzer = () => {
    if (!reviewed) {
      return;
    }
    // Here we would pass the snapshot to the expense analyzer
    // For now, we stay on the current dashboard which already shows 50/30/20 analysis
  };

  // If no snapshot, show the old dashboard
  if (!snapshot) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <div className="container mx-auto px-4 py-8">
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
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[360px,1fr] gap-6">
          {/* Left Column - Fixed */}
          <div className="space-y-6">
            <NetWorthKPI snapshot={snapshot} />
            <ConnectionStatus accounts={snapshot.accounts} />
            <FiltersCard data={data} filters={filters} setFilters={setFilters} />
          </div>

          {/* Right Column - Scroll */}
          <div className="space-y-6">
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            
            <div className="grid md:grid-cols-2 gap-6">
              <BudgetDonut data={data} viewMode={viewMode} />
              <MonthlyStackedBars data={data} />
            </div>

            <HoldingsTable holdings={snapshot.holdings} />

            <LiabilitiesTable liabilities={snapshot.liabilities} />

            <LiquidAssetsPanel holdings={snapshot.holdings} />

            <TransactionsTable 
              transactions={data.txns} 
              onUpdate={updateTransaction}
              filters={filters}
            />

            <KeyInsights data={data} />

            <PersonalizedRecommendations data={data} />

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
                Continue to Expense Analyzer 1.2
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
