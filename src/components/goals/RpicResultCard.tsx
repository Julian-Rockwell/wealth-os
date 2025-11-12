import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RpicResult } from "@/utils/rpicCalculations";
import { getReadinessPathway } from "@/utils/rpicCalculations";
import { TrendingUp, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RpicResultCardProps {
  rpic: RpicResult;
  foundationScore?: number;
}

export function RpicResultCard({ rpic, foundationScore }: RpicResultCardProps) {
  const navigate = useNavigate();
  const pathway = getReadinessPathway(foundationScore);
  
  const getColorClass = (color: string) => {
    switch(color) {
      case "success": return "text-success border-success bg-success/10";
      case "warning": return "text-warning border-warning bg-warning/10";
      case "destructive": return "text-destructive border-destructive bg-destructive/10";
      default: return "text-primary border-primary bg-primary/10";
    }
  };

  const getNavigationConfig = () => {
    if (!foundationScore) {
      return { text: "Complete Snapshot", path: "/dashboard" };
    }
    if (foundationScore >= 80) {
      return { text: "Go to Investments", path: "/investments" };
    }
    if (foundationScore >= 60) {
      return { text: "Strengthen Foundation", path: "/dashboard" };
    }
    return { text: "Review Dashboard", path: "/dashboard" };
  };

  const navConfig = getNavigationConfig();

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Your RPIC Target
            </CardTitle>
            <CardDescription>
              Goal-based. 3 questions. Clear roadmap.
            </CardDescription>
          </div>
          <Badge variant="outline" className={getColorClass(pathway.color)}>
            {pathway.title}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* RPIC Index */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-muted-foreground">RPIC Index</p>
            <Badge variant={rpic.rpicIndex >= 120 ? "default" : "outline"}>
              Target: 120%
            </Badge>
          </div>
          <p className="text-4xl font-bold text-primary">
            {rpic.rpicIndex.toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {rpic.rpicIndex >= 120 
              ? "✅ On track! Your passive income can cover your lifestyle with buffer"
              : `Need ${(120 - rpic.rpicIndex).toFixed(0)}% more to reach target (6-8 year goal)`}
          </p>
        </div>

        {/* RPIC Values */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">Monthly RPIC</p>
            <p className="text-3xl font-bold text-primary">
              ${rpic.monthlyRpic.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-muted-foreground">Target passive income per month</p>
          </div>
          <div className="space-y-2 p-4 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-sm text-muted-foreground">Annual RPIC</p>
            <p className="text-3xl font-bold text-accent">
              ${rpic.annualRpic.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-muted-foreground">Target passive income per year</p>
          </div>
        </div>

        {/* Capital Requirements */}
        <div className="space-y-3 p-4 rounded-lg bg-secondary border border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <p className="text-sm font-semibold">Required Capital Comparison</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Traditional (4% rule)</p>
              <p className="text-xl font-bold text-foreground">
                ${(rpic.targetCapitalPassive / 1000).toFixed(0)}K
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Wealth OS (12-15% yield)</p>
              <p className="text-xl font-bold text-success">
                ${(rpic.targetCapitalActive / 1000).toFixed(0)}K
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Wealth OS requires{" "}
              <span className="font-semibold text-success">
                {((1 - rpic.targetCapitalActive / rpic.targetCapitalPassive) * 100).toFixed(0)}% less capital
              </span>{" "}
              due to higher yield strategy
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              variant={foundationScore && foundationScore >= 80 ? "default" : "outline"}
              onClick={() => navigate(navConfig.path)}
            >
              {navConfig.text}
            </Button>
            <Button variant="outline" onClick={() => window.open("https://docs.example.com/rpic", "_blank")}>
              Learn More
            </Button>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground italic text-center">
          * Conservative buffer of 15% baked into calculations for safety margin
        </p>
      </CardContent>
    </Card>
  );
}
