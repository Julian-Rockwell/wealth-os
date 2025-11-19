import type { TradingStrategy, BrokerId } from "@/types/trading";

export interface StrategyRequirements {
  accountTypeAllowed: ('cash' | 'margin' | 'retirement')[];
  optionsLevelMin: 0 | 1 | 2 | 3 | 4;
  minBalance: number;
}

export interface BrokerInfo {
  id: BrokerId;
  name: string;
  optionsLevels: number[];
  margin: boolean;
  feePerContract: number;
  assignmentFee: number;
  dataFeeds: string;
  api: boolean | 'limited';
  paper: boolean;
  approvalSpeed: 'Fast' | 'Medium' | 'Slow';
}

// Strategy requirements map
export const STRATEGY_REQUIREMENTS: Record<TradingStrategy, StrategyRequirements> = {
  wheel: {
    accountTypeAllowed: ['cash', 'margin'],
    optionsLevelMin: 2,
    minBalance: 20000
  },
  spy_bcs: {
    accountTypeAllowed: ['margin'],
    optionsLevelMin: 3,
    minBalance: 10000
  },
  mean_reversion_stocks: {
    accountTypeAllowed: ['cash', 'margin'],
    optionsLevelMin: 0,
    minBalance: 2000
  },
  earnings_vip: {
    accountTypeAllowed: ['cash', 'margin'],
    optionsLevelMin: 1,
    minBalance: 15000
  },
  dividend_capture: {
    accountTypeAllowed: ['cash', 'margin'],
    optionsLevelMin: 0,
    minBalance: 2000
  }
};

// Static broker data
export const BROKERS: BrokerInfo[] = [
  {
    id: 'tradier',
    name: 'Tradier',
    optionsLevels: [0, 1, 2, 3],
    margin: true,
    feePerContract: 0.35,
    assignmentFee: 0,
    dataFeeds: 'Basic/Pro',
    api: true,
    paper: true,
    approvalSpeed: 'Fast'
  },
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    optionsLevels: [0, 1, 2, 3, 4],
    margin: true,
    feePerContract: 0.65,
    assignmentFee: 0,
    dataFeeds: 'Tiered',
    api: true,
    paper: true,
    approvalSpeed: 'Medium'
  },
  {
    id: 'schwab',
    name: 'TD Ameritrade / Schwab',
    optionsLevels: [0, 1, 2, 3],
    margin: true,
    feePerContract: 0.65,
    assignmentFee: 0,
    dataFeeds: 'Included',
    api: 'limited',
    paper: true,
    approvalSpeed: 'Medium'
  },
  {
    id: 'etrade',
    name: 'E*TRADE',
    optionsLevels: [0, 1, 2, 3],
    margin: true,
    feePerContract: 0.65,
    assignmentFee: 0,
    dataFeeds: 'Included',
    api: false,
    paper: true,
    approvalSpeed: 'Medium'
  },
  {
    id: 'fidelity',
    name: 'Fidelity',
    optionsLevels: [0, 1, 2, 3],
    margin: true,
    feePerContract: 0.65,
    assignmentFee: 0,
    dataFeeds: 'Included',
    api: false,
    paper: false,
    approvalSpeed: 'Slow'
  },
  {
    id: 'tradezero',
    name: 'TradeZero',
    optionsLevels: [0, 1, 2, 3],
    margin: true,
    feePerContract: 0.59,
    assignmentFee: 0,
    dataFeeds: 'Pro',
    api: true,
    paper: true,
    approvalSpeed: 'Fast'
  }
];

// Filtering & scoring logic
export function filterCompatibleBrokers(
  strategy: TradingStrategy
): BrokerInfo[] {
  const req = STRATEGY_REQUIREMENTS[strategy];
  return BROKERS.filter(broker => {
    const supportsLevel = broker.optionsLevels.includes(req.optionsLevelMin);
    const supportsMargin = req.accountTypeAllowed.includes('margin') 
      ? broker.margin === true 
      : true;
    return supportsLevel && supportsMargin;
  });
}

export function scoreBroker(broker: BrokerInfo, req: StrategyRequirements): number {
  let score = 0;
  if (broker.optionsLevels.includes(req.optionsLevelMin)) score += 0.6;
  score += (1 - broker.feePerContract / 1.0) * 0.3; // Lower fees = better
  if (broker.paper) score += 0.1;
  return score;
}

export function getBestMatchBroker(
  strategy: TradingStrategy
): BrokerInfo | null {
  const compatible = filterCompatibleBrokers(strategy);
  if (compatible.length === 0) return null;
  
  const req = STRATEGY_REQUIREMENTS[strategy];
  const scored = compatible.map(b => ({
    broker: b,
    score: scoreBroker(b, req)
  }));
  
  scored.sort((a, b) => b.score - a.score);
  return scored[0].broker;
}
