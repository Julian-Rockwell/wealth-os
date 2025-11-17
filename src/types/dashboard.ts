export type TransactionCategory = "need" | "want" | "saving";

export interface Transaction {
  id: string;
  date: string;
  desc: string;
  amount: number;
  sign: "debit" | "credit";
  category: TransactionCategory;
  subcategory: string;
  merchant: string;
  accountId: string;
  confidence: number;
  liquidity?: "discretionary" | "committed" | "fixed";
}

export interface Account {
  id: string;
  name: string;
  type: "bank" | "card" | "other";
}

export interface ExpenseCategory {
  total: number;
  pct: number;
  subs: Record<string, number>;
}

export interface DashboardData {
  period: {
    start: string;
    end: string;
    months: number;
  };
  accounts: Account[];
  income: {
    avgMonthly: number;
    stability: "stable" | "variable" | "growing";
  };
  expenses: {
    needs: ExpenseCategory;
    wants: ExpenseCategory;
    savings: ExpenseCategory;
  };
  cashflow: {
    monthlySurplus: number;
  };
  txns: Transaction[];
  recommendations: {
    immediate: Array<{
      title: string;
      estMonthlySave: number;
      category: string;
    }>;
  };
}

export interface DashboardFilters {
  dateRange?: { start: string; end: string };
  accounts?: string[];
  minConfidence?: number;
  searchTerm?: string;
  category?: TransactionCategory | "all";
  subcategory?: string;
}
