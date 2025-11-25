import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, TrendingUp } from "lucide-react";
import type { ProjectionSettings } from "@/contexts/FinancialDataContext";
import { calculateProjectionKPIs } from "@/utils/projectionCalculations";

interface ProjectionKPIHeaderProps {
  settings: ProjectionSettings;
}

export function ProjectionKPIHeader({ settings }: ProjectionKPIHeaderProps) {
  const kpis = calculateProjectionKPIs(settings);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Freedom Date */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Freedom Date</p>
              <p className="text-2xl font-bold">
                {kpis.freedomYear !== null ? kpis.freedomYear : "—"}
              </p>
              {kpis.freedomYear !== null && (
                <Badge variant="secondary" className="mt-2 bg-success/10 text-success hover:bg-success/20">
                  Year {kpis.freedomYear}
                </Badge>
              )}
            </div>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Time Saved */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Time Saved</p>
              <p className="text-2xl font-bold">
                {kpis.timeSaved !== null ? `${kpis.timeSaved} yrs` : "—"}
              </p>
              {kpis.timeSaved !== null && kpis.timeSaved > 0 && (
                <Badge variant="secondary" className="mt-2 bg-success/10 text-success hover:bg-success/20">
                  {kpis.timeSaved.toFixed(1)} Yrs Earlier
                </Badge>
              )}
              {kpis.timeSaved !== null && kpis.timeSaved > 0 && (
                <p className="text-xs text-muted-foreground mt-1">than Traditional</p>
              )}
            </div>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Capital Required */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Capital Required</p>
              <p className="text-2xl font-bold">
                {kpis.wealthOSCapital !== null 
                  ? `$${(kpis.wealthOSCapital / 1000).toFixed(0)}k`
                  : "—"
                }
              </p>
              {kpis.wealthOSCapital !== null && kpis.traditionalCapital !== null && (
                <>
                  <p className="text-xs text-muted-foreground mt-1">
                    vs ${(kpis.traditionalCapital / 1000000).toFixed(1)}M (Traditional)
                  </p>
                  {kpis.capitalDifferencePercent !== null && (
                    <Badge variant="secondary" className="mt-1 bg-success/10 text-success hover:bg-success/20">
                      {kpis.capitalDifferencePercent.toFixed(0)}% less
                    </Badge>
                  )}
                </>
              )}
            </div>
            <DollarSign className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Gross-Up Tax */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gross-Up Tax</p>
              <p className="text-2xl font-bold">25%</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                Placeholder
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Withdrawals grossed up</p>
            </div>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
