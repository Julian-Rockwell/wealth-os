import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Landmark, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { TwinEngineKPIs, TwinEngineMilestones, TwinEngineSettings } from "@/utils/twinEngineCalculations";

interface TwinEngineKPIHeaderProps {
  kpis: TwinEngineKPIs;
  milestones: TwinEngineMilestones;
  settings: TwinEngineSettings;
}

const formatMoney = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${value.toFixed(0)}`;
};

export function TwinEngineKPIHeader({ kpis, milestones, settings }: TwinEngineKPIHeaderProps) {
  // Determine if traditional strategy failed but Wealth OS succeeded
  const tradFailed = !milestones.tradFreedomYear && milestones.freedomYear;

  // Calculate ages for tooltip
  const wealthOSFreedomAge = kpis.freedomAge;
  const tradFreedomAge = milestones.tradFreedomYear 
    ? settings.currentAge + (milestones.tradFreedomYear - settings.startYear)
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Freedom Date */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Freedom Date</p>
              <p className="text-2xl font-bold text-primary">
                {kpis.freedomYear ? `Year ${kpis.freedomYear}` : 'Late'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {kpis.freedomAge ? `Age ${kpis.freedomAge}` : 'Check assumptions'}
              </p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WealthOS Advantage (renamed from Time Saved) */}
      <Card className={`bg-gradient-to-br border ${
        tradFailed 
          ? "from-orange-500/10 to-orange-500/5 border-orange-500/20" 
          : "from-green-500/10 to-green-500/5 border-green-500/20"
      }`}>
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-xs text-muted-foreground font-medium">WealthOS Advantage</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        {tradFailed 
                          ? "The standard 4% withdrawal rule isn't enough to cover your target lifestyle. WealthOS's higher returns are required to achieve financial freedom."
                          : wealthOSFreedomAge && tradFreedomAge
                            ? `WealthOS achieves freedom at age ${wealthOSFreedomAge} vs. Traditional at age ${tradFreedomAge}.`
                            : "Comparison between WealthOS and Traditional retirement strategies."
                        }
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {tradFailed ? (
                <>
                  <p className="text-2xl font-bold text-orange-500">Traditional Strategy Failed</p>
                  <p className="text-xs text-muted-foreground mt-1">WealthOS is required</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-green-600">
                    {kpis.timeSaved !== null ? `${kpis.timeSaved.toFixed(1)} Years Saved` : 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">vs. Traditional Retirement</p>
                </>
              )}
            </div>
            <div className={`p-2 rounded-full ${tradFailed ? "bg-orange-500/10" : "bg-green-500/10"}`}>
              <Clock className={`w-5 h-5 ${tradFailed ? "text-orange-500" : "text-green-600"}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projected Wealth at Horizon (renamed from Generational Wealth) */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Projected Wealth at Horizon (Age {kpis.legacyAge || settings.targetAge})
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {kpis.legacyValue ? formatMoney(kpis.legacyValue) : '-'}
              </p>
              <div className="mt-1 space-y-0.5">
                {kpis.tradLegacyValue && (
                  <p className="text-xs text-muted-foreground">
                    vs Traditional Retirement ({formatMoney(kpis.tradLegacyValue)})
                  </p>
                )}
                {kpis.costOfWaiting && kpis.costOfWaiting > 0 && (
                  <p className="text-xs text-destructive font-medium mt-2">
                    Cost of Waiting: {formatMoney(kpis.costOfWaiting)}
                  </p>
                )}
                {kpis.costOfWaiting && kpis.costOfWaiting > 0 && (
                  <p className="text-xs text-muted-foreground">
                    (Lost compounding if you delay 1 year)
                  </p>
                )}
              </div>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Landmark className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}