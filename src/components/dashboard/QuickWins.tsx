import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Tag } from "lucide-react";
import { toast } from "sonner";

interface QuickWinsProps {
  recommendations: {
    immediate: Array<{
      title: string;
      estMonthlySave: number;
      category: string;
    }>;
  };
}

export const QuickWins = ({ recommendations }: QuickWinsProps) => {
  const handleApply = (title: string) => {
    toast.success(`Applied recommendation: ${title}`);
  };

  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-warning" />
        <h3 className="font-semibold">Quick Wins</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Prioritized recommendations to optimize your budget
      </p>

      <div className="space-y-3">
        {recommendations.immediate.map((rec, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-soft transition-shadow"
          >
            <div className="flex-1">
              <p className="font-medium text-sm mb-1">{rec.title}</p>
              <p className="text-xs text-muted-foreground">
                Potential savings: <span className="font-semibold text-success">${rec.estMonthlySave}/mo</span>
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
    </Card>
  );
};
