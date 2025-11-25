import { TradingStrategy } from "@/types/trading";

export const CANONICAL_STRATEGIES: Array<{
  id: TradingStrategy;
  label: string;
  shortLabel: string;
}> = [
  {
    id: "mean_reversion_stocks",
    label: "Mean Reversion (e.g, Win The Fear - WTF)",
    shortLabel: "WTF",
  },
  {
    id: "wheel",
    label: "Options Income (e.g, The Wheel)",
    shortLabel: "Wheel",
  },
  {
    id: "earnings_vip",
    label: "Option Events (e.g, Earnings VIP)",
    shortLabel: "Earnings VIP",
  },
  {
    id: "dividend_capture",
    label: "Stock Events (e.g, Div. Capture)",
    shortLabel: "Dividend Capture",
  },
];

export const ADVANCED_STRATEGIES: Array<{
  id: TradingStrategy;
  label: string;
  parent: TradingStrategy;
}> = [
  {
    id: "spy_bcs",
    label: "SPY BCS (Credit Spreads)",
    parent: "earnings_vip",
  },
];

// Alias map for backward compatibility
export const ALIAS_TO_CANONICAL: Record<string, TradingStrategy> = {
  options_wheel: "wheel",
  covered_calls: "wheel",
  spreads: "spy_bcs",
  swing_trading: "mean_reversion_stocks",
  day_trading: "mean_reversion_stocks",
};

export function resolveStrategyAlias(strategyId: string): TradingStrategy {
  return (ALIAS_TO_CANONICAL[strategyId] as TradingStrategy) || (strategyId as TradingStrategy);
}
