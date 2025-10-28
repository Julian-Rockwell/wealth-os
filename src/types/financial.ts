// Financial data types for Feature 1.1 Command Center

export type AccountType = "checking" | "savings" | "brokerage" | "401k" | "IRA" | "real_estate" | "vehicle" | "credit_card" | "other";
export type AssetClass = "cash" | "stocks" | "bonds" | "real_estate" | "commodities" | "crypto" | "other";

/**
 * Asset liquidity classification based on conversion to cash timeline:
 * - liquid: <1 week (checking, savings, money market)
 * - semi_liquid: 1-4 weeks (brokerage, taxable investments)
 * - illiquid: >4 weeks (real estate, vehicles, retirement accounts)
 */
export type Liquidity = "liquid" | "semi_liquid" | "illiquid";
export type LiabilityType = "mortgage" | "auto" | "student" | "credit_card" | "personal" | "other";
export type AccountStatus = "connected" | "needs_attention" | "disconnected";
export type DataSource = "file" | "manual" | "mock";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  providerStatus: AccountStatus;
  lastSync: string; // ISO date
  balance?: number;
}

export interface Holding {
  id: string;
  accountId: string;
  name: string;
  accountType: AccountType;
  assetClass: AssetClass;
  liquidity: Liquidity;
  balance: number;
  currency: string;
  source: DataSource;
  notes?: string;
}

export interface Liability {
  id: string;
  accountId: string;
  name: string;
  type: LiabilityType;
  apr: number;
  balance: number;
  monthlyPayment: number;
  remainingTermMonths: number;
  notes?: string;
}

export interface StagingTransaction {
  id: string;
  date: string; // YYYY-MM-DD
  desc: string;
  amount: number;
  sign: "debit" | "credit";
  merchant: string;
  accountId: string;
  source: DataSource;
  confidence: number;
}

export interface TrendData {
  abs: number;
  pct: number;
}

export interface Trends {
  d30: TrendData;
  d60: TrendData;
  d90: TrendData;
  series12m?: number[];
}

export interface SyncLogEntry {
  accountId: string;
  status: AccountStatus;
  ts: string; // ISO date
}

export interface FinancialSnapshot {
  accounts: Account[];
  holdings: Holding[];
  liabilities: Liability[];
  trends: Trends;
  stagingTxns: StagingTransaction[];
  syncLog: SyncLogEntry[];
  netWorth: {
    assets: number;
    liabilities: number;
    net: number;
  };
  analyzedPeriod: {
    startDate: string;
    endDate: string;
    totalMonths: number;
  };
  uiFlags: {
    reviewedIn11: boolean;
    readyFor12: boolean;
  };
}

export interface IngestSummary {
  accounts: number;
  monthsCovered: number;
  txnsCount: number;
  filesProcessed: number;
}
