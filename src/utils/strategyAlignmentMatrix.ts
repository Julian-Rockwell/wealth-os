import { TradingStrategy, StrategyAlignmentMatrix, StrategyMatchResult } from "@/types/trading";

// Strategy Alignment Matrix - valores directos del grid
export const STRATEGY_ALIGNMENT: Record<TradingStrategy, StrategyAlignmentMatrix> = {
  mean_reversion_stocks: {
    capital:    [100, 100, 100, 100, 100],
    risk:       [100, 100, 100, 100, 100],
    dailyTime:  [100, 100, 100, 0,   0],
    experience: [100, 100, 100, 100, 100],
    minSuggested: 2000,
    requiredPermission: "stocks"
  },
  wheel: {
    capital:    [25,  100, 100, 100, 100],
    risk:       [25,  50,  75,  100, 100],
    dailyTime:  [25,  100, 100, 0,   0],
    experience: [25,  100, 100, 100, 100],
    minSuggested: 20000,
    requiredPermission: "wheel"
  },
  earnings_vip: {
    capital:    [25,  100, 100, 100, 100],
    risk:       [25,  50,  100, 100, 100],
    dailyTime:  [25,  100, 100, 0,   0],
    experience: [25,  50,  100, 100, 100],
    minSuggested: 15000,
    requiredPermission: "wheel"
  },
  dividend_capture: {
    capital:    [100, 100, 100, 100, 100],
    risk:       [25,  50,  100, 100, 100],
    dailyTime:  [100, 100, 100, 0,   0],
    experience: [100, 100, 100, 100, 100],
    minSuggested: 2000,
    requiredPermission: "stocks"
  },
  spy_bcs: {
    capital:    [25,  100, 100, 100, 100],
    risk:       [25,  50,  100, 100, 100],
    dailyTime:  [25,  100, 100, 0,   0],
    experience: [25,  75,  100, 100, 100],
    minSuggested: 10000,
    requiredPermission: "spreads"
  }
};

export interface AssessmentAnswers {
  capital: number;    // 1-5
  risk: number;       // 1-5
  time: number;       // 1-5
  experience: number; // 1-5
}

export function calculateStrategyMatch(
  strategy: TradingStrategy,
  answers: AssessmentAnswers
): StrategyMatchResult {
  const matrix = STRATEGY_ALIGNMENT[strategy];
  
  // Obtener % de match por factor (arrays indexados 0-4, levels son 1-5)
  const matchCapital = matrix.capital[answers.capital - 1];
  const matchRisk = matrix.risk[answers.risk - 1];
  const matchDailyTime = matrix.dailyTime[answers.time - 1];
  const matchExperience = matrix.experience[answers.experience - 1];
  
  // Promedio simple
  const matchPercent = Math.round(
    (matchCapital + matchRisk + matchDailyTime + matchExperience) / 4
  );
  
  return {
    strategyId: strategy,
    matchPercent,
    factorMatches: {
      capital: matchCapital,
      risk: matchRisk,
      dailyTime: matchDailyTime,
      experience: matchExperience
    }
  };
}

export function calculateAllStrategyMatches(
  answers: AssessmentAnswers,
  includeAdvanced: boolean = false
): StrategyMatchResult[] {
  const strategies: TradingStrategy[] = [
    "mean_reversion_stocks",
    "wheel",
    "earnings_vip",
    "dividend_capture"
  ];
  
  if (includeAdvanced) {
    strategies.push("spy_bcs");
  }
  
  return strategies
    .map(strategy => calculateStrategyMatch(strategy, answers))
    .sort((a, b) => b.matchPercent - a.matchPercent);
}
