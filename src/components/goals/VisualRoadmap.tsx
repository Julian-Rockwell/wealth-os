import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Milestone } from "@/utils/rpicCalculations";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Target } from "lucide-react";

interface VisualRoadmapProps {
  milestones: Milestone[];
}

export function VisualRoadmap({ milestones }: VisualRoadmapProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "Achieved";
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage >= 100) {
      return <CheckCircle2 className="h-6 w-6 text-success" />;
    }
    return <Circle className="h-6 w-6 text-muted-foreground" />;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return "text-success";
    if (percentage >= 50) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Visual Roadmap to RPIC
        </CardTitle>
        <CardDescription>
          Track your progress through key milestones on your journey to financial independence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />

          {/* Milestones */}
          <div className="space-y-6">
            {milestones.map((milestone, index) => {
              const isLast = index === milestones.length - 1;
              const isTraditional = milestone.label === "Traditional Path";
              
              return (
                <div key={index} className="relative flex items-start gap-4 pl-10">
                  {/* Icon */}
                  <div className="absolute left-0 flex items-center justify-center">
                    {getStatusIcon(milestone.percentage)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold ${getStatusColor(milestone.percentage)}`}>
                        {milestone.label}
                      </h4>
                      {isTraditional ? (
                        <Badge variant="outline" className="text-xs">
                          Comparison
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {milestone.percentage >= 100 ? "Complete" : `${milestone.percentage.toFixed(0)}%`}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${(milestone.amount / 1000).toFixed(0)}K
                      </span>
                      <span className={`font-medium ${milestone.percentage >= 100 ? "text-success" : "text-foreground"}`}>
                        {formatDate(milestone.eta)}
                      </span>
                    </div>

                    {/* Progress bar for non-traditional milestones */}
                    {!isTraditional && (
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary transition-all duration-500"
                          style={{ width: `${Math.min(100, milestone.percentage)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Start marker */}
          <div className="flex items-center gap-2 pl-10 pt-6 border-t border-border mt-6">
            <Badge variant="outline" className="text-xs">
              Start: Today
            </Badge>
            <span className="text-xs text-muted-foreground">
              Begin your journey to financial independence
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
