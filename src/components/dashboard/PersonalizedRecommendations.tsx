import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Tag, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import type { DashboardData } from "@/types/dashboard";

interface PersonalizedRecommendationsProps {
  data: DashboardData;
}

export const PersonalizedRecommendations = ({ data }: PersonalizedRecommendationsProps) => {
  const handleApply = (title: string) => {
    toast.success(`Applied recommendation: ${title}`);
  };

  // Generate dynamic recommendations
  const generateRecommendations = () => {
    const monthlyExpenses = (data.expenses.needs.total + data.expenses.wants.total + data.expenses.savings.total) / data.period.months;
    const wantsMonthly = data.expenses.wants.total / data.period.months;
    const savingsRate = data.expenses.savings.pct;
    
    const totalSavings = Math.round(
      data.recommendations.immediate.reduce((sum, rec) => sum + rec.estMonthlySave, 0)
    );

    return {
      quickWins: data.recommendations.immediate,
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
        <Lightbulb className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold">Personalized Recommendations</h3>
      </div>

      {/* Quick Wins */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <span className="text-lg">🎯</span>
            Quick Wins
          </h4>
          <span className="text-sm font-semibold text-success">
            Save ${recommendations.totalSavings}/month
          </span>
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
      </div>

      <Separator className="my-6" />

      {/* This Week */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm flex items-center gap-2 mb-3">
          <span className="text-lg">📋</span>
          This Week
        </h4>
        
        <ul className="space-y-2">
          {recommendations.thisWeek.map((task, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="my-6" />

      {/* Long-term Strategy */}
      <div>
        <h4 className="font-semibold text-sm flex items-center gap-2 mb-4">
          <span className="text-lg">🏗️</span>
          Budget Restructuring Plan
        </h4>
        
        <div className="space-y-4">
          {recommendations.restructuringPlan.map((phase, index) => (
            <div key={index} className="flex items-start gap-3">
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
      </div>
    </Card>
  );
};
