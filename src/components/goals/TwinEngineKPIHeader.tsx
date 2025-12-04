import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, Landmark } from "lucide-react";
import type { TwinEngineKPIs } from "@/utils/twinEngineCalculations";

interface TwinEngineKPIHeaderProps {
  kpis: TwinEngineKPIs;
}

const formatMoney = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${value.toFixed(0)}`;
};

export function TwinEngineKPIHeader({ kpis }: TwinEngineKPIHeaderProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Time Saved */}
      <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Time Saved</p>
              <p className="text-2xl font-bold text-green-600">
                {kpis.timeSaved !== null ? `${kpis.timeSaved.toFixed(1)} Yrs` : 'N/A'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Earlier than Traditional
              </p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-full">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Capital Required */}
      <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Capital Required</p>
              <p className="text-2xl font-bold text-emerald-600">
                {kpis.wealthOSCapital ? formatMoney(kpis.wealthOSCapital) : '-'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-muted-foreground">
                  vs {kpis.tradCapital ? formatMoney(kpis.tradCapital) : '-'}
                </p>
                {kpis.capitalSavedPercent !== null && kpis.capitalSavedPercent > 0 && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-100">
                    -{kpis.capitalSavedPercent}%
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-full">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legacy Potential (replaces Gross Up Tax) */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Legacy Potential</p>
              <p className="text-2xl font-bold text-purple-600">
                {kpis.legacyValue ? formatMoney(kpis.legacyValue) : '-'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-muted-foreground">
                  {kpis.legacyAge ? `Age ${kpis.legacyAge}` : ''}
                  {kpis.tradLegacyValue ? ` • Trad: ${formatMoney(kpis.tradLegacyValue)}` : ''}
                </p>
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
