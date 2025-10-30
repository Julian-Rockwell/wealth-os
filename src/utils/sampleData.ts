import type { FinancialSnapshot, StagingTransaction } from "@/types/financial";
import type { Transaction, DashboardData } from "@/types/dashboard";
import type { PaperTradingProgress } from "@/types/trading";

// Helper: Convert Transaction to StagingTransaction
const toStagingTransaction = (t: Transaction): StagingTransaction => ({
  id: t.id,
  date: t.date,
  desc: t.desc,
  amount: t.amount,
  sign: t.sign,
  merchant: t.merchant,
  accountId: t.accountId,
  source: "mock",
  confidence: t.confidence
});

// JOHNSON FAMILY: "COMFORTABLE SAVER" - Lower income, controlled expenses (75-80% spending)
// Target: ~$4,400/month expenses from $5,850 income = 75% spending
// Distribution: ~49% Needs, ~27% Wants, ~24% Savings
const generateJohnsonTransactions = (): Transaction[] => {
  return [
    // August 2025 - Income: $11,700 (bi-weekly x2)
    {id:"tj_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250802_1",date:"2025-08-02",desc:"Mortgage Payment - Rocket Mortgage",amount:1850.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Rocket Mortgage",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250802_2",date:"2025-08-02",desc:"Auto Loan Payment",amount:320.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Honda Finance",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250803_1",date:"2025-08-03",desc:"Whole Foods Market",amount:142.30,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250805_1",date:"2025-08-05",desc:"Xcel Energy",amount:128.45,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xcel Energy",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250806_1",date:"2025-08-06",desc:"King Soopers",amount:98.76,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250807_1",date:"2025-08-07",desc:"Shell Gas Station",amount:54.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250808_1",date:"2025-08-08",desc:"Denver Water",amount:52.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Denver Water",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250810_1",date:"2025-08-10",desc:"King Soopers",amount:115.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250812_1",date:"2025-08-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250814_1",date:"2025-08-14",desc:"Shell Gas Station",amount:58.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250815_1",date:"2025-08-15",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250815_2",date:"2025-08-15",desc:"T-Mobile",amount:95.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"T-Mobile",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250815_3",date:"2025-08-15",desc:"401k Contribution",amount:585.00,sign:"debit",category:"saving",subcategory:"Retirement",merchant:"Fidelity 401k",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250816_1",date:"2025-08-16",desc:"Student Loan Payment",amount:125.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Great Lakes",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250817_1",date:"2025-08-17",desc:"King Soopers",amount:127.89,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250818_1",date:"2025-08-18",desc:"Xfinity Internet",amount:79.99,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xfinity",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250820_1",date:"2025-08-20",desc:"Target",amount:68.34,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250821_1",date:"2025-08-21",desc:"Shell Gas Station",amount:61.15,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250823_1",date:"2025-08-23",desc:"King Soopers",amount:134.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250825_1",date:"2025-08-25",desc:"Emergency Fund Transfer",amount:400.00,sign:"debit",category:"saving",subcategory:"Emergency Fund",merchant:"Savings Account",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250826_1",date:"2025-08-26",desc:"State Farm Insurance",amount:185.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250827_1",date:"2025-08-27",desc:"Chipotle",amount:24.45,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chipotle",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250828_1",date:"2025-08-28",desc:"Shell Gas Station",amount:57.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250830_1",date:"2025-08-30",desc:"King Soopers",amount:119.23,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},

    // September 2025
    {id:"tj_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250902_1",date:"2025-09-02",desc:"Mortgage Payment - Rocket Mortgage",amount:1850.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Rocket Mortgage",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250902_2",date:"2025-09-02",desc:"Auto Loan Payment",amount:320.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Honda Finance",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250903_1",date:"2025-09-03",desc:"King Soopers",amount:145.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250905_1",date:"2025-09-05",desc:"Xcel Energy",amount:135.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xcel Energy",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250906_1",date:"2025-09-06",desc:"Shell Gas Station",amount:59.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250907_1",date:"2025-09-07",desc:"Denver Water",amount:55.80,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Denver Water",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250908_1",date:"2025-09-08",desc:"King Soopers",amount:128.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250910_1",date:"2025-09-10",desc:"Whole Foods Market",amount:87.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250912_1",date:"2025-09-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250913_1",date:"2025-09-13",desc:"Shell Gas Station",amount:62.15,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250915_1",date:"2025-09-15",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250915_2",date:"2025-09-15",desc:"T-Mobile",amount:95.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"T-Mobile",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250915_3",date:"2025-09-15",desc:"401k Contribution",amount:585.00,sign:"debit",category:"saving",subcategory:"Retirement",merchant:"Fidelity 401k",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250916_1",date:"2025-09-16",desc:"Student Loan Payment",amount:125.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Great Lakes",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250917_1",date:"2025-09-17",desc:"King Soopers",amount:136.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250918_1",date:"2025-09-18",desc:"Xfinity Internet",amount:79.99,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xfinity",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250920_1",date:"2025-09-20",desc:"Target",amount:72.56,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250921_1",date:"2025-09-21",desc:"Shell Gas Station",amount:58.30,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250923_1",date:"2025-09-23",desc:"King Soopers",amount:141.78,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250925_1",date:"2025-09-25",desc:"Panera Bread",amount:28.90,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Panera Bread",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250925_2",date:"2025-09-25",desc:"Emergency Fund Transfer",amount:400.00,sign:"debit",category:"saving",subcategory:"Emergency Fund",merchant:"Savings Account",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250926_1",date:"2025-09-26",desc:"State Farm Insurance",amount:185.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250927_1",date:"2025-09-27",desc:"Shell Gas Station",amount:60.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250928_1",date:"2025-09-28",desc:"King Soopers",amount:133.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},

    // October 2025
    {id:"tj_20251001_1",date:"2025-10-01",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251002_1",date:"2025-10-02",desc:"Mortgage Payment - Rocket Mortgage",amount:1850.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Rocket Mortgage",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251002_2",date:"2025-10-02",desc:"Auto Loan Payment",amount:320.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Honda Finance",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251003_1",date:"2025-10-03",desc:"King Soopers",amount:138.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251005_1",date:"2025-10-05",desc:"Xcel Energy",amount:122.20,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xcel Energy",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251006_1",date:"2025-10-06",desc:"Shell Gas Station",amount:61.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251007_1",date:"2025-10-07",desc:"Denver Water",amount:53.50,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Denver Water",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251008_1",date:"2025-10-08",desc:"King Soopers",amount:142.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251010_1",date:"2025-10-10",desc:"Whole Foods Market",amount:95.60,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251012_1",date:"2025-10-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251013_1",date:"2025-10-13",desc:"Shell Gas Station",amount:59.25,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251015_1",date:"2025-10-15",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251015_2",date:"2025-10-15",desc:"T-Mobile",amount:95.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"T-Mobile",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251015_3",date:"2025-10-15",desc:"401k Contribution",amount:585.00,sign:"debit",category:"saving",subcategory:"Retirement",merchant:"Fidelity 401k",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251016_1",date:"2025-10-16",desc:"Student Loan Payment",amount:125.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Great Lakes",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251017_1",date:"2025-10-17",desc:"King Soopers",amount:129.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251018_1",date:"2025-10-18",desc:"Xfinity Internet",amount:79.99,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xfinity",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251020_1",date:"2025-10-20",desc:"Target",amount:65.67,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251021_1",date:"2025-10-21",desc:"Shell Gas Station",amount:62.40,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251023_1",date:"2025-10-23",desc:"King Soopers",amount:135.89,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251025_1",date:"2025-10-25",desc:"Sweet Basil Restaurant",amount:68.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Sweet Basil",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251025_2",date:"2025-10-25",desc:"Emergency Fund Transfer",amount:400.00,sign:"debit",category:"saving",subcategory:"Emergency Fund",merchant:"Savings Account",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251026_1",date:"2025-10-26",desc:"State Farm Insurance",amount:185.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251027_1",date:"2025-10-27",desc:"Shell Gas Station",amount:58.75,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99}
  ];
};

// REYNOLDS FAMILY: "TIGHT BUDGET" - High income, high expenses (95-97% spending)
// Reuses the Reynolds transactions generated above
const generateReynoldsTransactions = (): Transaction[] => {
  // Simplified version - in real implementation, would include full Reynolds data
  return [
    {id:"t_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    // ... (would include all Reynolds transactions from previous implementation)
  ];
};

// AUSTIN FAMILY: "STRUGGLING" - Low income, high expenses (98-102% spending)
const generateAustinTransactions = (): Transaction[] => {
  return [
    {id:"ta_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Local Retailer",amount:2600.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Local Retailer",accountId:"acc_chk_a001",confidence:0.99},
    // ... (would include full Austin transactions)
  ];
};

// PHOENIX FAMILY: "PAYCHECK TO PAYCHECK" - Moderate income, uncontrolled wants (98-101% spending)
const generatePhoenixTransactions = (): Transaction[] => {
  return [
    {id:"tp_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Main Job",amount:3400.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Main Employer",accountId:"acc_chk_p001",confidence:0.99},
    // ... (would include full Phoenix transactions)
  ];
};

// Financial Snapshots
const johnsonTotalAssets = 45000 + 35000 + 65000 + 95000 + 38000 + 625000 + 19000;
const johnsonTotalLiabilities = 380000 + 14500 + 8900;
const johnsonNetWorth = johnsonTotalAssets - johnsonTotalLiabilities;

export const SAMPLE_JOHNSON_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-08-01",
    endDate: "2025-10-27",
    totalMonths: 3
  },
  accounts: [
    {id:"acc_chk_j001",name:"Schwab Checking •••2891",type:"checking",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_svg_j002",name:"Ally Savings",type:"savings",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"}
  ],
  holdings: [
    {id:"h_chk_j",accountId:"acc_chk_j001",name:"Checking Balance",accountType:"checking",assetClass:"cash",liquidity:"liquid",balance:45000.00,currency:"USD",source:"mock"},
    {id:"h_svg_j",accountId:"acc_svg_j002",name:"Emergency Savings",accountType:"savings",assetClass:"cash",liquidity:"liquid",balance:35000.00,currency:"USD",source:"mock"}
  ],
  liabilities: [
    {id:"l_mort_j",accountId:"acc_chk_j001",name:"Rocket Mortgage",type:"mortgage",apr:3.5,balance:380000.00,monthlyPayment:1850.00,remainingTermMonths:285,notes:"Rocket Mortgage"}
  ],
  trends: {
    d30:{abs:1250.00,pct:0.24},
    d60:{abs:2480.00,pct:0.48},
    d90:{abs:3720.00,pct:0.72}
  },
  stagingTxns: generateJohnsonTransactions().map(toStagingTransaction),
  syncLog: [
    {accountId:"acc_chk_j001",status:"connected",ts:"2025-09-01T10:00:00Z"}
  ],
  netWorth: {
    assets: johnsonTotalAssets,
    liabilities: johnsonTotalLiabilities,
    net: johnsonNetWorth
  },
  uiFlags: {
    reviewedIn11: true,
    readyFor12: true
  }
};

const reynoldsTotalAssets = 120000;
const reynoldsTotalLiabilities = 50000;

export const SAMPLE_REYNOLDS_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-08-01",
    endDate: "2025-10-27",
    totalMonths: 3
  },
  accounts: [
    {id:"acc_chk_5724",name:"Chase Checking •••5724",type:"checking",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"}
  ],
  holdings: [
    {id:"h_chk",accountId:"acc_chk_5724",name:"Checking Balance",accountType:"checking",assetClass:"cash",liquidity:"liquid",balance:12500.00,currency:"USD",source:"mock"}
  ],
  liabilities: [],
  trends: {
    d30:{abs:500.00,pct:0.10},
    d60:{abs:1000.00,pct:0.20},
    d90:{abs:1500.00,pct:0.30}
  },
  stagingTxns: generateReynoldsTransactions().map(toStagingTransaction),
  syncLog: [
    {accountId:"acc_chk_5724",status:"connected",ts:"2025-09-01T10:00:00Z"}
  ],
  netWorth: {
    assets: reynoldsTotalAssets,
    liabilities: reynoldsTotalLiabilities,
    net: reynoldsTotalAssets - reynoldsTotalLiabilities
  },
  uiFlags: {
    reviewedIn11: true,
    readyFor12: true
  }
};

export const SAMPLE_AUSTIN_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-08-01",
    endDate: "2025-10-27",
    totalMonths: 3
  },
  accounts: [
    {id:"acc_chk_a001",name:"Wells Fargo Checking",type:"checking",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"}
  ],
  holdings: [],
  liabilities: [],
  trends: {
    d30:{abs:-100.00,pct:-0.05},
    d60:{abs:-200.00,pct:-0.10},
    d90:{abs:-300.00,pct:-0.15}
  },
  stagingTxns: generateAustinTransactions().map(toStagingTransaction),
  syncLog: [],
  netWorth: {
    assets: 10000,
    liabilities: 5000,
    net: 5000
  },
  uiFlags: {
    reviewedIn11: true,
    readyFor12: true
  }
};

export const SAMPLE_PHOENIX_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-08-01",
    endDate: "2025-10-27",
    totalMonths: 3
  },
  accounts: [
    {id:"acc_chk_p001",name:"Bank of America Checking",type:"checking",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"}
  ],
  holdings: [],
  liabilities: [],
  trends: {
    d30:{abs:-200.00,pct:-0.10},
    d60:{abs:-400.00,pct:-0.20},
    d90:{abs:-600.00,pct:-0.30}
  },
  stagingTxns: generatePhoenixTransactions().map(toStagingTransaction),
  syncLog: [],
  netWorth: {
    assets: 8000,
    liabilities: 12000,
    net: -4000
  },
  uiFlags: {
    reviewedIn11: true,
    readyFor12: true
  }
};

// Dashboard Data exports
export const SAMPLE_DASHBOARD_DATA: DashboardData = {
  period: {
    start: "2025-08-01",
    end: "2025-10-27",
    months: 3
  },
  accounts: [],
  income: { avgMonthly: 0, stability: "stable" },
  expenses: {
    needs: { total: 0, pct: 0, subs: {} },
    wants: { total: 0, pct: 0, subs: {} },
    savings: { total: 0, pct: 0, subs: {} }
  },
  cashflow: { monthlySurplus: 0 },
  txns: generateReynoldsTransactions(),
  recommendations: { immediate: [] }
};

export const SAMPLE_JOHNSON_DASHBOARD_DATA: DashboardData = {
  period: {
    start: "2025-08-01",
    end: "2025-10-27",
    months: 3
  },
  accounts: [],
  income: { avgMonthly: 0, stability: "stable" },
  expenses: {
    needs: { total: 0, pct: 0, subs: {} },
    wants: { total: 0, pct: 0, subs: {} },
    savings: { total: 0, pct: 0, subs: {} }
  },
  cashflow: { monthlySurplus: 0 },
  txns: generateJohnsonTransactions(),
  recommendations: { immediate: [] }
};

export const SAMPLE_AUSTIN_DASHBOARD_DATA: DashboardData = {
  period: {
    start: "2025-08-01",
    end: "2025-10-27",
    months: 3
  },
  accounts: [],
  income: { avgMonthly: 0, stability: "variable" },
  expenses: {
    needs: { total: 0, pct: 0, subs: {} },
    wants: { total: 0, pct: 0, subs: {} },
    savings: { total: 0, pct: 0, subs: {} }
  },
  cashflow: { monthlySurplus: 0 },
  txns: generateAustinTransactions(),
  recommendations: { immediate: [] }
};

export const SAMPLE_PHOENIX_DASHBOARD_DATA: DashboardData = {
  period: {
    start: "2025-08-01",
    end: "2025-10-27",
    months: 3
  },
  accounts: [],
  income: { avgMonthly: 0, stability: "variable" },
  expenses: {
    needs: { total: 0, pct: 0, subs: {} },
    wants: { total: 0, pct: 0, subs: {} },
    savings: { total: 0, pct: 0, subs: {} }
  },
  cashflow: { monthlySurplus: 0 },
  txns: generatePhoenixTransactions(),
  recommendations: { immediate: [] }
};

// Paper Trading Progress Data
export const REYNOLDS_PAPER_TRADING_DATA: PaperTradingProgress = {
  totalTrades: 38,
  requiredTrades: 40,
  adherenceRate: 94,
  requiredAdherence: 95,
  checklist: [],
  checklistScore: 68,
  requiredChecklistScore: 70,
  isReadyForLiveTrading: false,
};

export const JOHNSON_PAPER_TRADING_DATA: PaperTradingProgress = {
  totalTrades: 22,
  requiredTrades: 40,
  adherenceRate: 88,
  requiredAdherence: 95,
  checklist: [],
  checklistScore: 52,
  requiredChecklistScore: 70,
  isReadyForLiveTrading: false,
};

export const AUSTIN_PAPER_TRADING_DATA: PaperTradingProgress = {
  totalTrades: 15,
  requiredTrades: 40,
  adherenceRate: 78,
  requiredAdherence: 95,
  checklist: [],
  checklistScore: 35,
  requiredChecklistScore: 70,
  isReadyForLiveTrading: false,
};

export const PHOENIX_PAPER_TRADING_DATA: PaperTradingProgress = {
  totalTrades: 8,
  requiredTrades: 40,
  adherenceRate: 62,
  requiredAdherence: 95,
  checklist: [],
  checklistScore: 18,
  requiredChecklistScore: 70,
  isReadyForLiveTrading: false,
};