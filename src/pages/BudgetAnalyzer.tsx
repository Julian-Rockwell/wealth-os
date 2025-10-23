import { useState } from "react";
import { BudgetDonut } from "@/components/dashboard/BudgetDonut";
import { MonthlyStackedBars } from "@/components/dashboard/MonthlyStackedBars";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { KeyInsights } from "@/components/dashboard/KeyInsights";
import { PersonalizedRecommendations } from "@/components/dashboard/PersonalizedRecommendations";
import { useDashboardData } from "@/hooks/useDashboardData";
import type { ViewMode } from "./Dashboard";

export const BudgetAnalyzer = () => {
  const [viewMode] = useState<ViewMode>("category");
  const { data, updateTransaction, filters, setFilters } = useDashboardData();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <BudgetDonut data={data} viewMode={viewMode} />
        <MonthlyStackedBars data={data} />
      </div>

      <TransactionsTable 
        transactions={data.txns} 
        onUpdate={updateTransaction}
        filters={filters}
      />

      <KeyInsights data={data} />

      <PersonalizedRecommendations data={data} />
    </div>
  );
};
