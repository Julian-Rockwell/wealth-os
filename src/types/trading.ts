// Trading-related types for paper trading, strategies, and capital management

export interface PaperTrade {
  id: string;
  date: string;
  symbol: string;
  strategy: string;
  planAdherence: boolean; // true if followed the plan
  profitLoss: number;
  notes?: string;
}

export interface TradingChecklist {
  id: string;
  category: string;
  item: string;
  completed: boolean;
  required: boolean;
}

export interface PaperTradingProgress {
  totalTrades: number;
  requiredTrades: number; // 40
  adherenceRate: number; // percentage
  requiredAdherence: number; // 95%
  checklist: TradingChecklist[];
  checklistScore: number; // percentage
  requiredChecklistScore: number; // 70%
  isReadyForLiveTrading: boolean;
}

export type TradingStrategy = 
  | "options_wheel"
  | "swing_trading"
  | "day_trading"
  | "spreads"
  | "covered_calls";

export interface StrategyInfo {
  id: TradingStrategy;
  name: string;
  description: string;
  minCapital: number;
  riskLevel: "low" | "medium" | "high";
  timeCommitment: string;
  locked: boolean;
}

export interface CapitalAllocationState {
  maxTradingAccountCap: number; // $100K default
  currentTradingAccountValue: number;
  feedingToPassive: boolean; // true when cap reached
  monthsAboveCap: number; // track stability for 12+ months
  averageReturnLast12Months: number; // must be >= 20% for full transition
  emergencyFundInstrument: "TBIL" | "HYSA" | "Money Market" | "Other";
  selectedStrategy: TradingStrategy | null;
  multiStrategyUnlocked: boolean; // unlocked when trading account >= $50K
}

export type BrokerId = 'tradier' | 'ibkr' | 'schwab' | 'etrade' | 'fidelity' | 'tradezero';

export interface BrokerSetupProgress {
  openAccount: boolean;
  funded: boolean;
  optionsSubmitted: boolean;
  optionsApproved: boolean;
  connected: boolean;
}

export interface BrokerSetup {
  chosenBroker: BrokerId | null;
  accountType: 'cash' | 'margin' | 'retirement' | null;
  targetOptionsLevel: 0 | 1 | 2 | 3 | 4;
  wizardStep: number;
  progress: BrokerSetupProgress;
  notes: string[];
}
