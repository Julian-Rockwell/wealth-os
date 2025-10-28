import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Lock, TrendingUp } from "lucide-react";
import type { TradingStrategy, StrategyInfo } from "@/types/trading";

interface StrategySelectorProps {
  selectedStrategy: TradingStrategy | null;
  onStrategySelect: (strategy: TradingStrategy) => void;
  currentTradingAccountValue: number;
  multiStrategyUnlocked: boolean;
}

const STRATEGIES: StrategyInfo[] = [
  {
    id: "options_wheel",
    name: "Options Wheel",
    description: "Sell cash-secured puts, get assigned, sell covered calls. Consistent income generation.",
    minCapital: 5000,
    riskLevel: "medium",
    timeCommitment: "2-3 hours/week",
    locked: false,
  },
  {
    id: "swing_trading",
    name: "Swing Trading",
    description: "Hold positions for 2-10 days. Technical analysis-based entries and exits.",
    minCapital: 2500,
    riskLevel: "medium",
    timeCommitment: "5-7 hours/week",
    locked: false,
  },
  {
    id: "day_trading",
    name: "Day Trading",
    description: "Intraday positions. Requires active monitoring and quick decision-making.",
    minCapital: 25000,
    riskLevel: "high",
    timeCommitment: "20+ hours/week",
    locked: false,
  },
  {
    id: "spreads",
    name: "Credit Spreads",
    description: "Defined-risk options strategies. Lower capital requirements, predictable outcomes.",
    minCapital: 1000,
    riskLevel: "low",
    timeCommitment: "1-2 hours/week",
    locked: false,
  },
  {
    id: "covered_calls",
    name: "Covered Calls",
    description: "Own stock, sell calls for premium. Conservative income enhancement.",
    minCapital: 3000,
    riskLevel: "low",
    timeCommitment: "1 hour/week",
    locked: false,
  },
];

export function StrategySelector({
  selectedStrategy,
  onStrategySelect,
  currentTradingAccountValue,
  multiStrategyUnlocked,
}: StrategySelectorProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Select Active Strategy
        </CardTitle>
        <CardDescription>
          {multiStrategyUnlocked
            ? "Multi-strategy unlocked! You can diversify across strategies."
            : "Start with one strategy. Multi-strategy unlocks at $50K trading capital."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!multiStrategyUnlocked && (
          <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm text-warning-foreground">
              <strong>⚠️ Single Strategy Mode:</strong> Focus on mastering one approach before diversifying.
              Multi-strategy unlocks when your trading account reaches $50,000.
            </p>
          </div>
        )}

        <RadioGroup value={selectedStrategy || ""} onValueChange={(v) => onStrategySelect(v as TradingStrategy)}>
          <div className="space-y-3">
            {STRATEGIES.map((strategy) => {
              const canAfford = currentTradingAccountValue >= strategy.minCapital;
              const isLocked = !multiStrategyUnlocked && selectedStrategy && selectedStrategy !== strategy.id;

              return (
                <div
                  key={strategy.id}
                  className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors ${
                    selectedStrategy === strategy.id
                      ? "border-primary bg-primary/5"
                      : isLocked || !canAfford
                      ? "border-muted bg-muted/20 opacity-60"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem
                    value={strategy.id}
                    id={strategy.id}
                    disabled={isLocked || !canAfford}
                    className="mt-1"
                  />
                  <Label htmlFor={strategy.id} className="flex-1 cursor-pointer space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{strategy.name}</span>
                      <div className="flex items-center gap-2">
                        {isLocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                        <Badge variant="outline" className={getRiskColor(strategy.riskLevel)}>
                          {strategy.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        Min: ${strategy.minCapital.toLocaleString()}
                        {!canAfford && (
                          <span className="text-destructive ml-1">(Insufficient capital)</span>
                        )}
                      </span>
                      <span>{strategy.timeCommitment}</span>
                    </div>
                  </Label>
                </div>
              );
            })}
          </div>
        </RadioGroup>

        {selectedStrategy && (
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm text-success-foreground">
              ✅ <strong>{STRATEGIES.find(s => s.id === selectedStrategy)?.name}</strong> selected. 
              Focus on this strategy until you've built consistent profitability.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
