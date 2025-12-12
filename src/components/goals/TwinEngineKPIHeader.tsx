import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Landmark, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { TwinEngineKPIs, TwinEngineMilestones } from "@/utils/twinEngineCalculations";

interface TwinEngineKPIHeaderProps {
  kpis: TwinEngineKPIs;
  milestones: TwinEngineMilestones;
}

const formatMoney = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${value.toFixed(0)}`;
};

export function TwinEngineKPIHeader({ kpis, milestones }: TwinEngineKPIHeaderProps) {
  // Determine if traditional strategy failed but Wealth OS succeeded
  const tradFailed = !milestones.tradFreedomYear && milestones.freedomYear;

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

      {/* Time Saved - with conditional logic */}
      <Card className={`bg-gradient-to-br border ${
        tradFailed 
          ? "from-orange-500/10 to-orange-500/5 border-orange-500/20" 
          : "from-green-500/10 to-green-500/5 border-green-500/20"
      }`}>
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-xs text-muted-foreground font-medium">Time Saved</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        The traditional withdrawal rate (4%) of your traditional portfolio 
                        never satisfies your annual gross expenses.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {tradFailed ? (
                <>
                  <p className="text-2xl font-bold text-orange-500">Unattainable</p>
                  <p className="text-xs text-muted-foreground mt-1">Trad. Strategy Failed</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-green-600">
                    {kpis.timeSaved !== null ? `${kpis.timeSaved.toFixed(1)} Yrs` : 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Earlier than Traditional</p>
                </>
              )}
            </div>
            <div className={`p-2 rounded-full ${tradFailed ? "bg-orange-500/10" : "bg-green-500/10"}`}>
              <Clock className={`w-5 h-5 ${tradFailed ? "text-orange-500" : "text-green-600"}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generational Wealth (renamed from Legacy Potential) */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Generational Wealth</p>
              <p className="text-2xl font-bold text-purple-600">
                {kpis.legacyValue ? formatMoney(kpis.legacyValue) : '-'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-muted-foreground">
                  {kpis.legacyAge ? `Projected Estate at Age ${kpis.legacyAge}` : ''}
                </p>
              </div>
              {kpis.tradLegacyValue && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Trad: {formatMoney(kpis.tradLegacyValue)}
                </p>
              )}
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
