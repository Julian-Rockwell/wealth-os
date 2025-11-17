import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import type { DashboardData } from "@/types/dashboard";

interface KeyInsightsContainerProps {
  data: DashboardData;
}

export const KeyInsightsContainer = ({ data }: KeyInsightsContainerProps) => {
  // Generate insights from data (same logic as KeyInsights.tsx)
  const generateInsights = () => {
    const txns = data.txns.filter(t => t.sign === "debit");
    
    // Analyze ALL subcategories with intelligent savings calculation
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

    // Calculate potential savings INTELLIGENTLY
    const optimizableNeeds = ['Groceries', 'Utilities', 'Phone/Internet', 'Healthcare'];
    
    Object.keys(subcatAnalysis).forEach(subcat => {
      const item = subcatAnalysis[subcat];
      const monthlyAmount = item.amount / data.period.months;
      
      if (item.category === 'want') {
        item.potentialSavings = monthlyAmount * 0.3;
        item.reductionPct = 30;
      } else if (item.category === 'need' && optimizableNeeds.includes(subcat)) {
        item.potentialSavings = monthlyAmount * 0.15;
        item.reductionPct = 15;
      } else if (subcat === 'Subscriptions') {
        item.potentialSavings = monthlyAmount * 0.5;
        item.reductionPct = 50;
      }
    });

    // Filter and sort opportunities
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

    // Generate grouped insight
    let opportunityText = "";
    if (opportunities.length === 0) {
      opportunityText = "Your spending is well-optimized. Keep monitoring for new opportunities!";
    } else if (opportunities.length === 1) {
      const opp = opportunities[0];
      opportunityText = `${opp.subcat}: Save $${opp.potentialSavings}/mo (${opp.reductionPct}% reduction from $${opp.monthlyAmount}/mo)`;
    } else {
      const top = opportunities.slice(0, Math.min(5, opportunities.length));
      const totalSavings = top.reduce((sum, opp) => sum + opp.potentialSavings, 0);
      const categories = top.map(o => `${o.subcat} ($${o.potentialSavings})`).join(", ");
      opportunityText = `Save $${totalSavings}/mo by optimizing: ${categories}`;
    }
    
    // Positive trend
    const essentialCategories: Record<string, number> = {};
    txns.forEach(txn => {
      if (txn.category === "need" && !["Rent/Mortgage", "Insurance", "Transportation"].includes(txn.subcategory)) {
        essentialCategories[txn.subcategory] = (essentialCategories[txn.subcategory] || 0) + txn.amount;
      }
    });
    
    const sortedEssentials = Object.entries(essentialCategories)
      .map(([cat, amount]) => ({ cat, amount: amount / data.period.months }))
      .sort((a, b) => a.amount - b.amount);
    
    const positiveTrendText = sortedEssentials.length > 0
      ? `${sortedEssentials[0].cat} is well-managed at $${sortedEssentials[0].amount.toFixed(0)}/mo. Great discipline on essentials!`
      : "Continue monitoring essential spending for improvement opportunities.";

    // Red flag
    const merchantFrequency: Record<string, { count: number; total: number; category: string }> = {};
    txns.forEach(txn => {
      if (!merchantFrequency[txn.merchant]) {
        merchantFrequency[txn.merchant] = { count: 0, total: 0, category: txn.category };
      }
      merchantFrequency[txn.merchant].count += 1;
      merchantFrequency[txn.merchant].total += txn.amount;
    });

    const discretionaryMerchants = Object.entries(merchantFrequency)
      .filter(([_, data]) => data.category === "want")
      .map(([merchant, merchantData]) => ({
        merchant,
        count: merchantData.count,
        total: merchantData.total,
        avgTransaction: merchantData.total / merchantData.count,
        monthlyTotal: merchantData.total / data.period.months
      }))
      .sort((a, b) => b.monthlyTotal - a.monthlyTotal);

    const redFlagText = discretionaryMerchants.length > 0
      ? `${discretionaryMerchants[0].merchant}: $${discretionaryMerchants[0].monthlyTotal.toFixed(0)}/mo (${discretionaryMerchants[0].count} visits). Consider reducing frequency.`
      : "No major red flags detected. Stay vigilant!";

    return {
      opportunity: opportunityText,
      positiveTrend: positiveTrendText,
      redFlag: redFlagText
    };
  };

  const insights = generateInsights();

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>Key Insights <span className="text-xs text-muted-foreground font-normal ml-2">(strange calculation)</span></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Biggest Opportunity */}
          <Card className="border-l-4 border-l-primary shadow-sm">
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-primary">Biggest Opportunity</h4>
                </div>
                <InfoTooltip content="Identifies categories with the highest potential for cost reduction based on spending patterns and category type." />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {insights.opportunity}
              </p>
            </div>
          </Card>

          {/* Positive Trend */}
          <Card className="border-l-4 border-l-success shadow-sm">
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <h4 className="font-semibold text-success">Positive Trend</h4>
                </div>
                <InfoTooltip content="Highlights well-managed essential spending categories where you're exercising good financial discipline." />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {insights.positiveTrend}
              </p>
            </div>
          </Card>

          {/* Red Flag */}
          <Card className="border-l-4 border-l-destructive shadow-sm">
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h4 className="font-semibold text-destructive">Red Flag</h4>
                </div>
                <InfoTooltip content="Identifies discretionary merchants with high spending frequency or amount that may warrant attention." />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {insights.redFlag}
              </p>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
