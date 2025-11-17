import { useState } from "react";
import { useFinancialData } from "@/contexts/FinancialDataContext";

import { FiltersCard } from "@/components/dashboard/FiltersCard";
import { Card } from "@/components/ui/card";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { PersonalizedRecommendations } from "@/components/dashboard/PersonalizedRecommendations";
import { UnspentIncomeCard } from "@/components/dashboard/UnspentIncomeCard";
import { SpendingVisualization } from "@/components/dashboard/SpendingVisualization";
import { KeyInsightsContainer } from "@/components/dashboard/KeyInsightsContainer";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, BarChart3 } from "lucide-react";
import { SAMPLE_REYNOLDS_DATA } from "@/utils/sampleData";
import { toast } from "sonner";
export type ViewMode = "category" | "subcategory" | "merchant" | "liquidity" | "custom";

interface DashboardProps {
  onContinue?: () => void;
}

export default function Dashboard({ onContinue }: DashboardProps = {}) {
  const [viewMode, setViewMode] = useState<ViewMode>("category");
  const [period, setPeriod] = useState<30 | 60 | 90>(30);
  const { data, updateTransaction, deleteTransaction, updateIncome, filters, setFilters } = useDashboardData(period);
  const { snapshot, setSnapshot, resetAllData } = useFinancialData();

  const handleLoadSampleData = () => {
    if (confirm("Load Reynolds Family demo data? This will replace any existing data.")) {
      resetAllData();
      setSnapshot(SAMPLE_REYNOLDS_DATA);
      toast.success("Sample data loaded successfully!");
    }
  };

  // If no snapshot, show message
  if (!snapshot) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Page Description */}
          <div className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/20">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Budget Analyzer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>What you'll find here:</strong> Comprehensive transaction analysis with the 
                  <strong> 50/30/20 rule</strong> (Needs/Wants/Savings). View your income vs. expenses over 30/60/90-day periods, 
                  categorize transactions, track spending patterns by merchant or subcategory, and get 
                  <strong> Quick Wins recommendations</strong> to optimize your budget. This is your starting point to understand 
                  your cash flow before moving to Goals or Investments.
                </p>
              </div>
            </div>
          </div>

          {/* Empty State Banner */}
          <div className="mb-6 p-8 rounded-lg bg-card border-2 border-dashed text-center">
            <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Data Loaded</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Load the Reynolds Family demo or add your data in the Command Center
            </p>
            <Button onClick={handleLoadSampleData} className="gradient-primary">
              <Database className="w-4 h-4 mr-2" />
              Load Sample Data
            </Button>
          </div>

          <div className="space-y-6">
            {/* Period Selector */}
            <Card className="p-3 shadow-soft">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Period:</span>
                <div className="flex gap-2">
                  {[30, 60, 90].map((days) => (
                    <Button
                      key={days}
                      variant={period === days ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPeriod(days as 30 | 60 | 90)}
                    >
                      {days}d
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Placeholder for sample data loading */}
          </div>
        </div>
      </div>
    );
  }

  // Budget Analyzer with Financial Snapshot
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Description */}
        <div className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Budget Analyzer</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What you'll find here:</strong> Comprehensive transaction analysis with the 
                <strong> 50/30/20 rule</strong> (Needs/Wants/Savings). View your income vs. expenses over 30/60/90-day periods, 
                categorize transactions, track spending patterns by merchant or subcategory, and get 
                <strong> Quick Wins recommendations</strong> to optimize your budget. This is your starting point to understand 
                your cash flow before moving to Goals or Investments.
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

        <div className="space-y-6">
          {/* Period Selector */}
          <Card className="p-3 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Period:</span>
              <div className="flex gap-2">
                {[30, 60, 90].map((days) => (
                  <Button
                    key={days}
                    variant={period === days ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPeriod(days as 30 | 60 | 90)}
                  >
                    {days}d
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Income/Expenses/Unspent Income - Full Width */}
          <UnspentIncomeCard 
            data={data} 
            period={period}
            onUpdateIncome={updateIncome}
          />

          {/* Spending Visualization with ViewToggle - Full Width */}
          <SpendingVisualization 
            data={data} 
            viewMode={viewMode} 
            setViewMode={setViewMode}
            period={period}
          />

          {/* Key Insights Container - Full Width */}
          <KeyInsightsContainer data={data} />

          {/* Filters - Full Width */}
          <FiltersCard data={data} filters={filters} setFilters={setFilters} />

          {/* Transactions List - Full Width */}
          <TransactionsList 
            key={data.txns[0]?.id || 'no-data'}
            transactions={data.txns} 
            onUpdate={updateTransaction}
            onDelete={deleteTransaction}
            filters={filters}
          />

          {/* Personalized Recommendations - Full Width */}
          <PersonalizedRecommendations data={data} />
        </div>
      </div>
    </div>
  );
}
