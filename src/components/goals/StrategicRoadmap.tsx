import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import type { TwinEngineMilestones, TwinEngineSettings } from "@/utils/twinEngineCalculations";

interface StrategicRoadmapProps {
  milestones: TwinEngineMilestones;
  settings: TwinEngineSettings;
}

const formatMoney = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export function StrategicRoadmap({ milestones, settings }: StrategicRoadmapProps) {
  const stopTradingYear = settings.startYear + settings.activeDuration;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategic Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-stretch gap-4">
          {/* Phase 1: The Sprint */}
          <div className="flex-1 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                Phase 1: The Sprint
              </div>
              <h3 className="text-xl font-bold mb-3">Active Growth</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Trade actively for {settings.activeDuration} Years. Max out cap to {formatMoney(settings.tradingCap)}.
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">Spillover Mode: </span>
                <span className="font-medium text-primary">
                  {milestones.capHitYear ? `Year ${milestones.capHitYear}` : 'Building...'}
                </span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex lg:hidden items-center justify-center">
            <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
          </div>

          {/* Phase 2: The Transition */}
          <div className="flex-1 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl p-6 border border-orange-500/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
                Phase 2: The Transition
              </div>
              <h3 className="text-xl font-bold mb-3">Stop Trading</h3>
              <p className="text-sm text-muted-foreground mb-4">
                At Year {stopTradingYear}, liquidate active account. 
                Cash out {settings.activeCashOutPercent}% for life/toys.
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">Move to Passive: </span>
                <span className="font-medium text-orange-600">100% Coast</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex lg:hidden items-center justify-center">
            <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
          </div>

          {/* Phase 3: Freedom */}
          <div className="flex-1 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-6 border border-green-500/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">
                Phase 3: Freedom
              </div>
              <h3 className="text-xl font-bold mb-3">Financial Independence</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Passive Yield covers Expenses + Tax. Work becomes optional.
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">Target Date: </span>
                <span className="font-medium text-green-600">
                  {milestones.freedomYear || '...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
