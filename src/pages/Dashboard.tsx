import { useState } from "react";
import { useFinancialData } from "@/contexts/FinancialDataContext";

import { ViewToggle } from "@/components/dashboard/ViewToggle";
import { FiltersCard } from "@/components/dashboard/FiltersCard";
import { BudgetDonut } from "@/components/dashboard/BudgetDonut";
import { Card } from "@/components/ui/card";
import { MonthlyStackedBars } from "@/components/dashboard/MonthlyStackedBars";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { KeyInsights } from "@/components/dashboard/KeyInsights";
import { PersonalizedRecommendations } from "@/components/dashboard/PersonalizedRecommendations";
import { IncomeExpensesKPI } from "@/components/dashboard/IncomeExpensesKPI";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database } from "lucide-react";
import { SAMPLE_REYNOLDS_DATA } from "@/utils/sampleData";
import { toast } from "sonner";
export type ViewMode = "category" | "subcategory" | "merchant" | "liquidity" | "custom";

interface DashboardProps {
  onContinue?: () => void;
}

export default function Dashboard({ onContinue }: DashboardProps = {}) {
  const [viewMode, setViewMode] = useState<ViewMode>("category");
  const [period, setPeriod] = useState<30 | 60 | 90>(30);
  const { data, updateTransaction, deleteTransaction, filters, setFilters } = useDashboardData();
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

            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            
            <div className="grid md:grid-cols-2 gap-6">
              <BudgetDonut data={data} viewMode={viewMode} period={period} />
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
    );
  }

  // Budget Analyzer with Financial Snapshot
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

          {/* Income & Expenses KPIs */}
          <IncomeExpensesKPI data={data} period={period} />

          {/* View Toggle */}
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          
          {/* Two Column Layout: Budget Visualizations + Filters & Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: 1/3 width */}
            <div className="lg:col-span-1 space-y-6 flex flex-col">
              <BudgetDonut data={data} viewMode={viewMode} period={period} />
              <MonthlyStackedBars data={data} />
            </div>

            {/* Right Column: 2/3 width */}
            <div className="lg:col-span-2 space-y-6 flex flex-col">
              <FiltersCard data={data} filters={filters} setFilters={setFilters} />
              
              <div className="flex-1">
                <TransactionsTable 
                  transactions={data.txns} 
                  onUpdate={updateTransaction}
                  onDelete={deleteTransaction}
                  filters={filters}
                />
              </div>
            </div>
          </div>

          {/* Key Insights - 3 Cards */}
          <KeyInsights data={data} />

          {/* Personalized Recommendations */}
          <PersonalizedRecommendations data={data} />
        </div>
      </div>
    </div>
  );
}
