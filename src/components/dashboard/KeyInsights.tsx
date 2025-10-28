import { Card } from "@/components/ui/card";
import { TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import type { DashboardData } from "@/types/dashboard";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface KeyInsightsProps {
  data: DashboardData;
}

export const KeyInsights = ({ data }: KeyInsightsProps) => {
  // Calculate insights from data
  const generateInsights = () => {
    const txns = data.txns.filter(t => t.sign === "debit");
    
    // Biggest opportunity - find category with highest spend that's reducible
    const categoryTotals = {
      "Dining Out": 0,
      "Shopping": 0,
      "Entertainment": 0,
      "Subscriptions": 0
    };
    
    txns.forEach(txn => {
      if (txn.category === "want" && categoryTotals[txn.subcategory as keyof typeof categoryTotals] !== undefined) {
        categoryTotals[txn.subcategory as keyof typeof categoryTotals] += txn.amount;
      }
    });
    
    // Only show opportunities > $50/month
    const validOpportunities = Object.entries(categoryTotals)
      .map(([subcat, total]) => ({
        subcat,
        monthlyAmount: Math.round(total / data.period.months),
        reduction: Math.round((total / data.period.months) * 0.3)
      }))
      .filter(opp => opp.reduction >= 50)
      .sort((a, b) => b.reduction - a.reduction);
    
    const topOpportunity = validOpportunities.length > 0 ? validOpportunities[0] : null;
    
    // If multiple opportunities, group them
    let opportunityText = "";
    if (validOpportunities.length > 1) {
      const top3 = validOpportunities.slice(0, 3);
      const totalSave = top3.reduce((sum, opp) => sum + opp.reduction, 0);
      const categories = top3.map(o => o.subcat).join(", ");
      opportunityText = `Save $${totalSave}/mo by reducing ${categories} (30% each)`;
    } else if (topOpportunity) {
      opportunityText = `${topOpportunity.subcat} - save $${topOpportunity.reduction}/mo by reducing 30%`;
    } else {
      opportunityText = "No significant savings opportunities detected. Keep monitoring!";
    }
    
    // Positive trend - find well-controlled essential category
    const essentialCategories: Record<string, number> = {};
    txns.forEach(txn => {
      if (txn.category === "need" && !["Rent/Mortgage", "Insurance", "Transportation"].includes(txn.subcategory)) {
        essentialCategories[txn.subcategory] = (essentialCategories[txn.subcategory] || 0) + txn.amount;
      }
    });
    
    const sortedEssentials = Object.entries(essentialCategories)
      .filter(([, amount]) => amount > 0)
      .sort(([, a], [, b]) => a - b);
    
    const positiveSubcat = sortedEssentials.length > 0 
      ? sortedEssentials[0] 
      : ["Groceries", 500] as [string, number];
    const positiveAmount = Math.round((positiveSubcat[1] || 0) / data.period.months);
    
    // Red flag - find concerning pattern
    const subcatDetails: Record<string, { amount: number; count: number; merchants: Set<string> }> = {};
    txns.forEach(txn => {
      if (!subcatDetails[txn.subcategory]) {
        subcatDetails[txn.subcategory] = { amount: 0, count: 0, merchants: new Set() };
      }
      subcatDetails[txn.subcategory].amount += txn.amount;
      subcatDetails[txn.subcategory].count += 1;
      subcatDetails[txn.subcategory].merchants.add(txn.merchant);
    });
    
    // Look for high-frequency discretionary spending
    const redFlagSubcat = Object.entries(subcatDetails)
      .filter(([subcat, details]) => {
        // Focus on wants with high frequency or amount
        const txn = txns.find(t => t.subcategory === subcat);
        return txn?.category === "want" && (details.count >= 8 || details.amount > 200);
      })
      .sort(([, a], [, b]) => b.amount - a.amount)[0];
    
    const redFlagAmount = Math.round((redFlagSubcat?.[1].amount || 0) / data.period.months);
    const redFlagCount = redFlagSubcat?.[1].count || 0;

    return {
      biggest_opportunity: {
        insight: opportunityText
      },
      positive_trend: {
        insight: `${positiveSubcat?.[0] || "Essential costs"} well-managed at $${positiveAmount}/mo.`
      },
      red_flag: {
        insight: `${redFlagSubcat?.[0] || "Frequent spending"}: ${redFlagCount} transactions ($${redFlagAmount}/mo) - review for savings.`
      }
    };
  };

  const insights = generateInsights();

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="p-5 shadow-soft border-l-4 border-l-primary">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-2">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Biggest Opportunity
              </h4>
              <InfoTooltip content={
                <div className="space-y-2">
                  <p><strong>How it's calculated:</strong></p>
                  <p className="text-xs">We analyze your "Wants" spending categories and identify the highest opportunities where a 30% reduction would save you $50+/month.</p>
                  <p className="text-xs">If multiple opportunities exist, we group the top 3 for maximum impact.</p>
                </div>
              } />
            </div>
            <p className="text-sm font-medium leading-relaxed">
              {insights.biggest_opportunity.insight}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 shadow-soft border-l-4 border-l-success">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Positive Trend
            </h4>
            <p className="text-sm font-medium leading-relaxed">
              {insights.positive_trend.insight}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 shadow-soft border-l-4 border-l-destructive">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Red Flag
            </h4>
            <p className="text-sm font-medium leading-relaxed">
              {insights.red_flag.insight}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
