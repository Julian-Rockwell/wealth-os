import { Card } from "@/components/ui/card";
import { TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import type { DashboardData } from "@/types/dashboard";

interface KeyInsightsProps {
  data: DashboardData;
}

export const KeyInsights = ({ data }: KeyInsightsProps) => {
  // Calculate insights from data
  const generateInsights = () => {
    const txns = data.txns.filter(t => t.sign === "debit");
    
    // Biggest opportunity - highest spending merchant/category
    const merchantTotals: Record<string, { amount: number; category: string; count: number }> = {};
    txns.forEach(txn => {
      if (!merchantTotals[txn.merchant]) {
        merchantTotals[txn.merchant] = { amount: 0, category: txn.category, count: 0 };
      }
      merchantTotals[txn.merchant].amount += txn.amount;
      merchantTotals[txn.merchant].count += 1;
    });
    
    const topSpending = Object.entries(merchantTotals)
      .sort(([, a], [, b]) => b.amount - a.amount)[0];
    
    const categoryLabel = topSpending?.[1].category === "want" ? "Wants" : 
                         topSpending?.[1].category === "need" ? "Needs" : "Savings";
    const monthlyAmount = Math.round((topSpending?.[1].amount || 0) / data.period.months);
    const reduction = Math.round(monthlyAmount * 0.3); // Suggest 30% reduction
    
    // Positive trend - find well-controlled category
    const subsTotal: Record<string, number> = {};
    Object.entries(data.expenses.needs.subs).forEach(([k, v]) => subsTotal[k] = v);
    Object.entries(data.expenses.wants.subs).forEach(([k, v]) => subsTotal[k] = v);
    Object.entries(data.expenses.savings.subs).forEach(([k, v]) => subsTotal[k] = v);
    
    const sortedSubs = Object.entries(subsTotal).sort(([, a], [, b]) => a - b);
    const positiveSubcat = sortedSubs[Math.floor(sortedSubs.length * 0.3)]; // Pick a moderate one
    const positiveAmount = Math.round((positiveSubcat?.[1] || 0) / data.period.months);
    
    // Red flag - find duplicate/excessive spending
    const subcatCounts: Record<string, { amount: number; merchants: Set<string> }> = {};
    txns.forEach(txn => {
      if (!subcatCounts[txn.subcategory]) {
        subcatCounts[txn.subcategory] = { amount: 0, merchants: new Set() };
      }
      subcatCounts[txn.subcategory].amount += txn.amount;
      subcatCounts[txn.subcategory].merchants.add(txn.merchant);
    });
    
    const redFlagSubcat = Object.entries(subcatCounts)
      .filter(([, v]) => v.merchants.size >= 3)
      .sort(([, a], [, b]) => b.amount - a.amount)[0];
    
    const redFlagAmount = Math.round((redFlagSubcat?.[1].amount || 0) / data.period.months);
    const redFlagCount = redFlagSubcat?.[1].merchants.size || 0;

    return {
      biggest_opportunity: {
        insight: `Reduce ${topSpending?.[0] || "top spending"} (${categoryLabel}) by $${reduction}/month.`
      },
      positive_trend: {
        insight: `${positiveSubcat?.[0] || "Essential spending"} is well-controlled at $${positiveAmount}/month.`
      },
      red_flag: {
        insight: `${redFlagSubcat?.[0] || "Subscriptions"}: $${redFlagAmount}/month across ${redFlagCount} merchants.`
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
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Biggest Opportunity
            </h4>
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
