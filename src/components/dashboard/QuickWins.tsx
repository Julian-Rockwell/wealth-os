import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Tag, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface QuickWinsProps {
  recommendations: {
    immediate: Array<{
      title: string;
      estMonthlySave: number;
      category: string;
    }>;
  };
  onApply?: (recommendation: { title: string; estMonthlySave: number; category: string }) => void;
}

export const QuickWins = ({ recommendations, onApply }: QuickWinsProps) => {
  const [appliedRecs, setAppliedRecs] = useState<Set<string>>(new Set());

  const handleApply = (rec: { title: string; estMonthlySave: number; category: string }) => {
    setAppliedRecs(prev => new Set(prev).add(rec.title));
    toast.success(`Applied: ${rec.title}`, {
      description: `This recommendation is now tracked. Review related transactions to implement changes.`
    });
    onApply?.(rec);
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
              variant={appliedRecs.has(rec.title) ? "default" : "outline"}
              onClick={() => handleApply(rec)}
              className="ml-4"
              disabled={appliedRecs.has(rec.title)}
            >
              {appliedRecs.has(rec.title) ? (
                <>
                  <CheckCircle2 className="w-3 h-3 mr-2" />
                  Applied
                </>
              ) : (
                <>
                  <Tag className="w-3 h-3 mr-2" />
                  Apply
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
