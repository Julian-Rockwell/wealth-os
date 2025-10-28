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
    
    // 1. Analyze ALL subcategories with intelligent savings calculation
    const subcatAnalysis: Record<string, {
      amount: number;
      category: 'need' | 'want' | 'saving';
      count: number;
      merchants: Set<string>;
      potentialSavings: number;
      reductionPct: number;
    }> = {};

    txns.forEach(txn => {
      if (!subcatAnalysis[txn.subcategory]) {
        subcatAnalysis[txn.subcategory] = {
          amount: 0,
          category: txn.category,
          count: 0,
          merchants: new Set(),
          potentialSavings: 0,
          reductionPct: 0
        };
      }
      subcatAnalysis[txn.subcategory].amount += txn.amount;
      subcatAnalysis[txn.subcategory].count += 1;
      subcatAnalysis[txn.subcategory].merchants.add(txn.merchant);
    });

    // 2. Calculate potential savings INTELLIGENTLY
    const optimizableNeeds = ['Groceries', 'Utilities', 'Phone/Internet', 'Healthcare'];
    
    Object.keys(subcatAnalysis).forEach(subcat => {
      const item = subcatAnalysis[subcat];
      const monthlyAmount = item.amount / data.period.months;
      
      // Smart reduction logic by category
      if (item.category === 'want') {
        // Wants: 30% reduction is realistic
        item.potentialSavings = monthlyAmount * 0.3;
        item.reductionPct = 30;
      } else if (item.category === 'need' && optimizableNeeds.includes(subcat)) {
        // Optimizable Needs: 15% reduction
        item.potentialSavings = monthlyAmount * 0.15;
        item.reductionPct = 15;
      } else if (subcat === 'Subscriptions') {
        // Subscriptions: 50% elimination (many are unused)
        item.potentialSavings = monthlyAmount * 0.5;
        item.reductionPct = 50;
      }
    });

    // 3. Filter and sort opportunities (>$50/mo savings)
    const opportunities = Object.entries(subcatAnalysis)
      .map(([subcat, item]) => ({
        subcat,
        monthlyAmount: Math.round(item.amount / data.period.months),
        potentialSavings: Math.round(item.potentialSavings),
        category: item.category,
        count: item.count,
        reductionPct: item.reductionPct
      }))
      .filter(opp => opp.potentialSavings >= 50)
      .sort((a, b) => b.potentialSavings - a.potentialSavings);

    // 4. Generate grouped insight
    let opportunityText = "";
    if (opportunities.length === 0) {
      opportunityText = "Your spending is well-optimized. Keep monitoring for new opportunities!";
    } else if (opportunities.length === 1) {
      const opp = opportunities[0];
      opportunityText = `${opp.subcat}: Save $${opp.potentialSavings}/mo (${opp.reductionPct}% reduction from $${opp.monthlyAmount}/mo)`;
    } else {
      // Group top opportunities for maximum impact
      const top = opportunities.slice(0, Math.min(5, opportunities.length));
      const totalSavings = top.reduce((sum, opp) => sum + opp.potentialSavings, 0);
      const categories = top.map(o => `${o.subcat} ($${o.potentialSavings})`).join(", ");
      opportunityText = `Save $${totalSavings}/mo by optimizing: ${categories}`;
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
                  <p className="text-xs">We analyze ALL your spending categories and calculate realistic savings:</p>
                  <p className="text-xs">• <strong>Wants</strong> (Dining, Shopping, Entertainment): 30% reduction</p>
                  <p className="text-xs">• <strong>Optimizable Needs</strong> (Groceries, Utilities): 15% reduction</p>
                  <p className="text-xs">• <strong>Subscriptions</strong>: 50% elimination</p>
                  <p className="text-xs mt-1">Only shows opportunities that save $50+/month.</p>
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
