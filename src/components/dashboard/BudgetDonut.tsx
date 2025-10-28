import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import type { DashboardData } from "@/types/dashboard";
import type { ViewMode } from "@/pages/Dashboard";
import { validate50_30_20 } from "@/utils/transactionClassifier";

interface BudgetDonutProps {
  data: DashboardData;
  viewMode: ViewMode;
  period: 30 | 60 | 90;
}

export const BudgetDonut = ({ data, viewMode, period }: BudgetDonutProps) => {
  // Filter transactions based on period
  const now = new Date();
  const periodDaysAgo = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);
  
  const filteredTxns = data.txns.filter(t => {
    const date = new Date(t.date);
    return date >= periodDaysAgo && date <= now;
  });

  // Calculate data based on viewMode
  const getViewData = () => {
    switch (viewMode) {
      case "category":
        // Calculate from filtered transactions - map singular to plural
        const categoryTotals = { needs: 0, wants: 0, savings: 0 };
        filteredTxns.forEach(txn => {
          if (txn.sign === "debit") {
            // Map singular category names to plural for display
            if (txn.category === "need") categoryTotals.needs += txn.amount;
            else if (txn.category === "want") categoryTotals.wants += txn.amount;
            else if (txn.category === "saving") categoryTotals.savings += txn.amount;
          }
        });
        
        // Calculate total income for 50/30/20 rule
        const totalIncome = filteredTxns
          .filter(t => t.sign === "credit")
          .reduce((sum, t) => sum + t.amount, 0);
        
        return {
          title: "50/30/20 Distribution",
          items: [
            { label: "Needs (50%)", value: categoryTotals.needs, color: "bg-needs", pct: totalIncome > 0 ? (categoryTotals.needs / totalIncome) * 100 : 0 },
            { label: "Wants (30%)", value: categoryTotals.wants, color: "bg-wants", pct: totalIncome > 0 ? (categoryTotals.wants / totalIncome) * 100 : 0 },
            { label: "Savings (20%)", value: categoryTotals.savings, color: "bg-savings", pct: totalIncome > 0 ? (categoryTotals.savings / totalIncome) * 100 : 0 },
          ]
        };
      
      case "subcategory":
        const subTotals: Record<string, { value: number; color: string }> = {};
        filteredTxns.filter(t => t.sign === "debit").forEach(txn => {
          if (!subTotals[txn.subcategory]) {
            subTotals[txn.subcategory] = { 
              value: 0, 
              color: txn.category === "need" ? "bg-needs" : txn.category === "want" ? "bg-wants" : "bg-savings" 
            };
          }
          subTotals[txn.subcategory].value += txn.amount;
        });
        const allSubs = Object.entries(subTotals)
          .map(([label, data]) => ({ label, ...data }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);
        const subsTotal = allSubs.reduce((sum, item) => sum + item.value, 0);
        return {
          title: "Top 5 Subcategories",
          items: allSubs.map(item => ({
            ...item,
            pct: subsTotal > 0 ? (item.value / subsTotal) * 100 : 0
          }))
        };
      
      case "merchant":
        const merchantTotals: Record<string, number> = {};
        filteredTxns.filter(t => t.sign === "debit").forEach(txn => {
          merchantTotals[txn.merchant] = (merchantTotals[txn.merchant] || 0) + txn.amount;
        });
        const topMerchants = Object.entries(merchantTotals)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5);
        const merchTotal = topMerchants.reduce((sum, [, v]) => sum + v, 0);
        return {
          title: "Top 5 Merchants",
          items: topMerchants.map(([merchant, value]) => ({
            label: merchant,
            value,
            color: "bg-primary",
            pct: merchTotal > 0 ? (value / merchTotal) * 100 : 0
          }))
        };
      
      case "liquidity":
        const liquidityData = filteredTxns.filter(t => t.sign === "debit").reduce((acc, txn) => {
          const category = txn.subcategory.includes("Rent") || txn.subcategory.includes("Insurance") ? "fixed" :
                          txn.subcategory.includes("Emergency") || txn.subcategory.includes("Debt") ? "committed" :
                          "discretionary";
          acc[category] = (acc[category] || 0) + txn.amount;
          return acc;
        }, {} as Record<string, number>);
        const liqTotal = Object.values(liquidityData).reduce((sum, v) => sum + v, 0);
        return {
          title: "Spending Liquidity",
          items: [
            { label: "Fixed Expenses", value: liquidityData.fixed || 0, color: "bg-destructive", pct: liqTotal > 0 ? ((liquidityData.fixed || 0) / liqTotal) * 100 : 0 },
            { label: "Committed", value: liquidityData.committed || 0, color: "bg-warning", pct: liqTotal > 0 ? ((liquidityData.committed || 0) / liqTotal) * 100 : 0 },
            { label: "Discretionary", value: liquidityData.discretionary || 0, color: "bg-success", pct: liqTotal > 0 ? ((liquidityData.discretionary || 0) / liqTotal) * 100 : 0 },
          ]
        };
      
      default:
        return {
          title: "Budget Distribution",
          items: [
            { label: "Needs", value: data.expenses.needs.total, color: "bg-needs", pct: data.expenses.needs.pct },
            { label: "Wants", value: data.expenses.wants.total, color: "bg-wants", pct: data.expenses.wants.pct },
            { label: "Savings", value: data.expenses.savings.total, color: "bg-savings", pct: data.expenses.savings.pct },
          ]
        };
    }
  };

  const viewData = getViewData();
  const total = viewData.items.reduce((sum, item) => sum + item.value, 0);

  // Validate 50/30/20 rule when in category view
  const budgetValidation = viewMode === "category" ? (() => {
    // Calculate total income from credits
    const totalIncome = filteredTxns
      .filter(t => t.sign === "credit")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const needs = viewData.items.find(i => i.label.includes("Needs"))?.value || 0;
    const wants = viewData.items.find(i => i.label.includes("Wants"))?.value || 0;
    const savings = viewData.items.find(i => i.label.includes("Savings"))?.value || 0;
    
    return validate50_30_20(totalIncome, needs, wants, savings);
  })() : null;

  // Calculate angles for conic gradient
  let currentAngle = 0;
  const gradientStops = viewData.items.map((item, index) => {
    const angle = (item.value / total) * 360;
    const start = currentAngle;
    currentAngle += angle;
    return `hsl(var(--${item.color.replace('bg-', '')})) ${start}deg ${currentAngle}deg`;
  }).join(', ');

  const conicGradient = `conic-gradient(${gradientStops})`;

  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">{viewData.title}</h3>
        {viewMode === "category" && (
          <InfoTooltip content={
            <div className="space-y-2">
              <p><strong>50/30/20 Budget Rule:</strong></p>
              <p className="text-xs">• <strong>50% Needs:</strong> Essential expenses (housing, utilities, groceries, insurance)</p>
              <p className="text-xs">• <strong>30% Wants:</strong> Discretionary spending (dining out, entertainment, shopping)</p>
              <p className="text-xs">• <strong>20% Savings:</strong> Emergency fund, investments, debt repayment</p>
            </div>
          } />
        )}
      </div>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div
          className="w-full h-full rounded-full"
          style={{ background: conicGradient }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{period}</p>
                <p className="text-xs text-muted-foreground">Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {viewData.items.map((item, index) => {
          // Determine validation status for category view
          let isValid: boolean | null = null;
          let targetPct: number | null = null;
          
          if (viewMode === "category" && budgetValidation) {
            if (item.label.includes("Needs")) {
              isValid = budgetValidation.needsValid;
              targetPct = 50;
            } else if (item.label.includes("Wants")) {
              isValid = budgetValidation.wantsValid;
              targetPct = 30;
            } else if (item.label.includes("Savings")) {
              isValid = budgetValidation.savingsValid;
              targetPct = 20;
            }
          }

          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                <span className="text-sm truncate">{item.label}</span>
                {isValid !== null && (
                  isValid ? (
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                  )
                )}
              </div>
              <div className="text-right ml-2">
                <p className="text-sm font-semibold">
                  {targetPct !== null && (
                    <span className="text-xs text-muted-foreground mr-1">{targetPct}% →</span>
                  )}
                  {item.pct.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">${item.value.toFixed(0)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show 50/30/20 alerts when in category view */}
      {viewMode === "category" && budgetValidation && budgetValidation.alerts.length > 0 && (
        <div className="mt-4 space-y-2">
          {budgetValidation.alerts.map((alert, idx) => (
            <Alert key={idx} variant="destructive" className="py-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-xs ml-2">
                {alert}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </Card>
  );
};
