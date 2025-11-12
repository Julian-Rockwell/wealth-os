export interface SixMonthPlanInputs {
  currentMonthExpenses: number;
  avgMonthlyIncome: number;
  avgMonthlyExpenses: number;
  cashFlowMonthly: number;
  liquidAssets: number;
  emergencyFundReq: number;
  highAprDebts: Array<{
    id: string;
    name: string;
    type: string;
    apr: number;
    balance: number;
    monthlyPayment: number;
  }>;
  allDebts: Array<{
    id: string;
    name: string;
    apr: number;
    balance: number;
    monthlyPayment: number;
  }>;
  readinessScore: number;
  rpicMonthly: number;
  rpicAnnual: number;
  availableCapital: number;
}

export interface PlanTask {
  id: string;
  type: "expense_cut" | "income_boost" | "debt_paydown" | "emergency_fund" | "capital_allocation";
  title: string;
  details: string;
  estMonthlyImpact?: number;
  principalPaydown?: number;
  estInterestSaved?: number;
  amount?: number;
}

export interface MonthPlan {
  monthIndex: number;
  theme: string;
  tasks: PlanTask[];
  kpis: {
    cashFlowRunRate: number;
    emergencyFundProgress: number;
    highAprBalance: number;
  };
  blockedActions?: Array<{
    reason: string;
    name: string;
    unblocksWhen: string;
  }>;
}

export interface PlanRollup {
  totalMonthlySavings: number;
  totalOneTimeSavings: number;
  totalInterestSaved: number;
  emergencyFundEnding: number;
  readinessProjected: number;
  nextStep: "paper_trading" | "continue_foundation";
}

export interface SixMonthPlan {
  planId: string;
  generatedAt: string;
  inputs: SixMonthPlanInputs;
  assumptions: {
    inflation: number;
    minEmergencyMonths: number;
    incomeBoostRangeMonthly: [number, number];
    maxRiskCapitalShare: number;
  };
  months: MonthPlan[];
  rollup: PlanRollup;
  cta: {
    addToActionPlan: boolean;
    scheduleMonthlyReassessment: boolean;
  };
}
