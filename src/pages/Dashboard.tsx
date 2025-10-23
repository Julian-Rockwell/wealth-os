import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KpiPanel } from "@/components/dashboard/KpiPanel";
import { ViewToggle } from "@/components/dashboard/ViewToggle";
import { FiltersCard } from "@/components/dashboard/FiltersCard";
import { BudgetDonut } from "@/components/dashboard/BudgetDonut";
import { MonthlyStackedBars } from "@/components/dashboard/MonthlyStackedBars";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { QuickWins } from "@/components/dashboard/QuickWins";
import { useDashboardData } from "@/hooks/useDashboardData";

export type ViewMode = "category" | "subcategory" | "merchant" | "liquidity" | "custom";

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>("category");
  const { data, updateTransaction, filters, setFilters } = useDashboardData();

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

            <QuickWins recommendations={data.recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
}
