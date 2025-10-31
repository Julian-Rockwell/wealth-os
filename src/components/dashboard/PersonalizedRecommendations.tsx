import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Tag, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import type { DashboardData } from "@/types/dashboard";

interface PersonalizedRecommendationsProps {
  data: DashboardData;
}

export const PersonalizedRecommendations = ({ data }: PersonalizedRecommendationsProps) => {
  const handleApply = (title: string) => {
    toast.success(`Applied recommendation: ${title}`);
  };

  // Generate Quick Wins dynamically from transaction data
  const generateQuickWins = () => {
    const txns = data.txns.filter(t => t.sign === "debit");
    
    // Analyze "wants" subcategories for savings opportunities
    const wantsSubs: Record<string, { total: number; count: number }> = {};
    
    txns.forEach(txn => {
      if (txn.category === "want") {
        if (!wantsSubs[txn.subcategory]) {
          wantsSubs[txn.subcategory] = { total: 0, count: 0 };
        }
        wantsSubs[txn.subcategory].total += txn.amount;
        wantsSubs[txn.subcategory].count += 1;
      }
    });
    
    // Sort by highest spending
    const sortedWants = Object.entries(wantsSubs)
      .sort(([, a], [, b]) => b.total - a.total);
    
    const recommendations: Array<{title: string; estMonthlySave: number; category: string}> = [];
    
    // Top 3 categories with highest savings potential
    sortedWants.slice(0, 3).forEach(([subcat, subcatData]) => {
      const monthlyAvg = subcatData.total / data.period.months;
      const potentialSave = Math.round(monthlyAvg * 0.25); // 25% reduction estimate
      
      if (potentialSave > 20) { // Only if savings are significant
        recommendations.push({
          title: `Reduce ${subcat} spending`,
          estMonthlySave: potentialSave,
          category: "wants"
        });
      }
    });
    
    // Analyze subscriptions specifically
    const subscriptionTotal = wantsSubs["Subscriptions"]?.total || 0;
    if (subscriptionTotal > 0) {
      const monthlySubcost = subscriptionTotal / data.period.months;
      recommendations.push({
        title: "Review and cancel unused subscriptions",
        estMonthlySave: Math.round(monthlySubcost * 0.30),
        category: "wants"
      });
    }
    
    // Analyze groceries if they exceed threshold
    const groceriesTotal = data.expenses.needs.subs["Groceries"] || 0;
    const monthlyGroceries = groceriesTotal / data.period.months;
    
    if (monthlyGroceries > 500) { // If spending more than $500/month on groceries
      recommendations.push({
        title: "Optimize grocery shopping with meal planning",
        estMonthlySave: Math.round(monthlyGroceries * 0.15),
        category: "needs"
      });
    }
    
    return recommendations.slice(0, 3); // Maximum 3 quick wins
  };

  // Generate dynamic recommendations
  const generateRecommendations = () => {
    const monthlyExpenses = (data.expenses.needs.total + data.expenses.wants.total + data.expenses.savings.total) / data.period.months;
    const wantsMonthly = data.expenses.wants.total / data.period.months;
    const savingsRate = data.expenses.savings.pct;
    
    const quickWins = generateQuickWins();
    const totalSavings = Math.round(
      quickWins.reduce((sum, rec) => sum + rec.estMonthlySave, 0)
    );

    return {
      quickWins,
      totalSavings,
      thisWeek: [
        `Review and optimize ${Object.keys(data.expenses.wants.subs).length} spending categories`,
        `Set up automatic savings transfer: $${Math.round(totalSavings * 0.6)}/month`,
        `Compare and switch to lower-cost alternatives for top expenses`,
      ],
      restructuringPlan: [
        {
          phase: "Month 1-2",
          action: savingsRate < 10 
            ? "Establish emergency fund baseline with $200/month"
            : "Increase emergency fund to 3 months of expenses"
        },
        {
          phase: "Month 3-4",
          action: wantsMonthly > monthlyExpenses * 0.35
            ? "Optimize recurring wants expenses to hit 30% target"
            : "Maintain spending discipline and track progress"
        },
        {
          phase: "Month 5-6",
          action: savingsRate < 20
            ? "Increase savings rate to target 20%"
            : "Explore investment opportunities for excess savings"
        },
      ]
    };
  };

  const recommendations = generateRecommendations();

  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-6">
        <Bot className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold">Personalized Recommendations <span className="text-xs text-muted-foreground font-normal ml-2">(strange calculation - Rocky's help here)</span></h3>
      </div>

      <Tabs defaultValue="quick-wins" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick-wins">🎯 Quick Wins</TabsTrigger>
          <TabsTrigger value="this-week">📋 This Week</TabsTrigger>
          <TabsTrigger value="budget-plan">🏗️ Budget Plan</TabsTrigger>
        </TabsList>

        {/* Quick Wins Tab */}
        <TabsContent value="quick-wins" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-sm">Save ${recommendations.totalSavings}/month</h4>
          </div>
          
          <div className="space-y-3">
            {recommendations.quickWins.map((rec, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-soft transition-shadow"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">{rec.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Potential savings: <span className="font-semibold text-success">${rec.estMonthlySave}/month</span>
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleApply(rec.title)}
                  className="ml-4"
                >
                  <Tag className="w-3 h-3 mr-2" />
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* This Week Tab */}
        <TabsContent value="this-week" className="space-y-4 mt-6">
          <ul className="space-y-3">
            {recommendations.thisWeek.map((task, index) => (
              <li key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{task}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        {/* Budget Restructuring Plan Tab */}
        <TabsContent value="budget-plan" className="space-y-4 mt-6">
          <div className="space-y-4">
            {recommendations.restructuringPlan.map((phase, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-primary mb-1">
                    {phase.phase}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {phase.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
