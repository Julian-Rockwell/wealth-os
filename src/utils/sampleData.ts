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

// Reynolds Family Transactions: Higher expenses, variable income patterns
const generateReynoldsTransactions = (): Transaction[] => {
  return [
    // September 2025
    {id:"t_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250902_1",date:"2025-09-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250902_2",date:"2025-09-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250903_1",date:"2025-09-03",desc:"HEB Grocery",amount:187.43,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250903_2",date:"2025-09-03",desc:"Starbucks Coffee",amount:8.45,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250904_1",date:"2025-09-04",desc:"Shell Gas Station",amount:68.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250905_1",date:"2025-09-05",desc:"Austin Energy",amount:245.80,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250906_1",date:"2025-09-06",desc:"HEB Grocery",amount:124.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250906_2",date:"2025-09-06",desc:"Starbucks Coffee",amount:11.20,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250907_1",date:"2025-09-07",desc:"Austin Water Utility",amount:78.50,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250908_1",date:"2025-09-08",desc:"Target",amount:93.25,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250909_1",date:"2025-09-09",desc:"Chipotle Mexican Grill",amount:24.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chipotle",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250910_1",date:"2025-09-10",desc:"HEB Grocery",amount:203.15,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250910_2",date:"2025-09-10",desc:"Starbucks Coffee",amount:9.75,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250911_1",date:"2025-09-11",desc:"Shell Gas Station",amount:72.15,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250912_1",date:"2025-09-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250913_1",date:"2025-09-13",desc:"Whole Foods Market",amount:87.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250914_1",date:"2025-09-14",desc:"CVS Pharmacy",amount:34.99,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"CVS",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250915_1",date:"2025-09-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250815_2",date:"2025-08-15",desc:"Credit Card Payment",amount:250.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250815_3",date:"2025-08-15",desc:"AT&T Wireless",amount:185.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250816_1",date:"2025-08-16",desc:"HEB Grocery",amount:156.89,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250817_1",date:"2025-08-17",desc:"Texas Gas Service",amount:45.20,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Texas Gas Service",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250818_1",date:"2025-08-18",desc:"Shell Gas Station",amount:65.30,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250818_2",date:"2025-08-18",desc:"Starbucks Coffee",amount:7.95,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250819_1",date:"2025-08-19",desc:"Costco",amount:312.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Costco",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250820_1",date:"2025-08-20",desc:"P.F. Chang's",amount:87.60,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"P.F. Chang's",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250822_1",date:"2025-08-22",desc:"Student Loan Payment",amount:180.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Nelnet",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250823_1",date:"2025-08-23",desc:"HEB Grocery",amount:178.23,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250824_1",date:"2025-08-24",desc:"Amazon Purchase",amount:89.99,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250825_1",date:"2025-08-25",desc:"Shell Gas Station",amount:70.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250825_2",date:"2025-08-25",desc:"Starbucks Coffee",amount:10.30,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250826_1",date:"2025-08-26",desc:"State Farm Insurance",amount:275.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250827_1",date:"2025-08-27",desc:"HEB Grocery",amount:145.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250828_1",date:"2025-08-28",desc:"Home Depot",amount:127.89,sign:"debit",category:"need",subcategory:"Home Maintenance",merchant:"Home Depot",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250829_1",date:"2025-08-29",desc:"Panera Bread",amount:28.45,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Panera Bread",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250812_2",date:"2025-08-12",desc:"ATM Withdrawal - Cash",amount:120.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Wells Fargo ATM",accountId:"acc_chk_5724",confidence:0.68},
    {id:"t_20250819_2",date:"2025-08-19",desc:"Zelle Transfer - Sarah M.",amount:85.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Zelle",accountId:"acc_chk_5724",confidence:0.72},
    {id:"t_20250826_2",date:"2025-08-26",desc:"SQ *Local Coffee",amount:15.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Square Merchant",accountId:"acc_chk_5724",confidence:0.75},

    // October 2025
    {id:"t_20251001_1",date:"2025-10-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251002_1",date:"2025-10-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251002_2",date:"2025-10-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251003_1",date:"2025-10-03",desc:"HEB Grocery",amount:195.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251003_2",date:"2025-10-03",desc:"Starbucks Coffee",amount:9.85,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251004_1",date:"2025-10-04",desc:"Torchy's Tacos",amount:45.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Torchy's Tacos",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251005_1",date:"2025-10-05",desc:"Austin Energy",amount:312.45,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251006_1",date:"2025-10-06",desc:"Target",amount:156.23,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251007_1",date:"2025-10-07",desc:"Austin Water Utility",amount:82.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251007_2",date:"2025-10-07",desc:"Shell Gas Station",amount:71.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251008_1",date:"2025-10-08",desc:"HEB Grocery",amount:210.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251009_1",date:"2025-10-09",desc:"Starbucks Coffee",amount:11.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251010_1",date:"2025-10-10",desc:"Walgreens",amount:45.67,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"Walgreens",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251012_1",date:"2025-10-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251012_2",date:"2025-10-12",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251013_1",date:"2025-10-13",desc:"HEB Grocery",amount:167.89,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251014_1",date:"2025-10-14",desc:"Shell Gas Station",amount:68.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251015_1",date:"2025-10-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251015_2",date:"2025-10-15",desc:"Credit Card Payment",amount:250.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251015_3",date:"2025-10-15",desc:"AT&T Wireless",amount:185.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251016_1",date:"2025-10-16",desc:"Starbucks Coffee",amount:8.95,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251017_1",date:"2025-10-17",desc:"Texas Gas Service",amount:38.75,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Texas Gas Service",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251017_2",date:"2025-10-17",desc:"HEB Grocery",amount:183.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251018_1",date:"2025-10-18",desc:"Shell Gas Station",amount:67.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251019_1",date:"2025-10-19",desc:"Olive Garden",amount:73.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Olive Garden",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251020_1",date:"2025-10-20",desc:"HEB Grocery",amount:192.80,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251021_1",date:"2025-10-21",desc:"Amazon Purchase",amount:127.45,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251022_1",date:"2025-10-22",desc:"Student Loan Payment",amount:180.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Nelnet",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251023_1",date:"2025-10-23",desc:"Costco",amount:298.70,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Costco",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251024_1",date:"2025-10-24",desc:"Shell Gas Station",amount:73.40,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251025_1",date:"2025-10-25",desc:"Starbucks Coffee",amount:10.75,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251026_1",date:"2025-10-26",desc:"State Farm Insurance",amount:275.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251027_1",date:"2025-10-27",desc:"HEB Grocery",amount:167.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251028_1",date:"2025-10-28",desc:"Shell Gas Station",amount:69.25,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251030_1",date:"2025-10-30",desc:"Chili's Grill & Bar",amount:64.30,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chili's",accountId:"acc_chk_5724",confidence:0.98},

    // November 2025
    {id:"t_20251101_1",date:"2025-11-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251102_1",date:"2025-11-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251102_2",date:"2025-11-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251103_1",date:"2025-11-03",desc:"HEB Grocery",amount:201.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251104_1",date:"2025-11-04",desc:"Shell Gas Station",amount:74.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251105_1",date:"2025-11-05",desc:"Austin Energy",amount:298.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251105_2",date:"2025-11-05",desc:"Starbucks Coffee",amount:9.25,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251106_1",date:"2025-11-06",desc:"Target",amount:143.78,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251107_1",date:"2025-11-07",desc:"Austin Water Utility",amount:76.90,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251108_1",date:"2025-11-08",desc:"HEB Grocery",amount:198.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251108_2",date:"2025-11-08",desc:"Starbucks Coffee",amount:11.75,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251110_1",date:"2025-11-10",desc:"Whole Foods Market",amount:112.40,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251111_1",date:"2025-11-11",desc:"Shell Gas Station",amount:70.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251112_1",date:"2025-11-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251112_2",date:"2025-11-12",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251113_1",date:"2025-11-13",desc:"HEB Grocery",amount:175.23,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251114_1",date:"2025-11-14",desc:"Starbucks Coffee",amount:10.60,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251115_1",date:"2025-11-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251015_2",date:"2025-10-15",desc:"Credit Card Payment",amount:250.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251015_3",date:"2025-10-15",desc:"AT&T Wireless",amount:185.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251017_1",date:"2025-10-17",desc:"Texas Gas Service",amount:41.50,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Texas Gas Service",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251017_2",date:"2025-10-17",desc:"HEB Grocery",amount:186.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251018_1",date:"2025-10-18",desc:"Shell Gas Station",amount:67.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251019_1",date:"2025-10-19",desc:"Olive Garden",amount:73.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Olive Garden",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251020_1",date:"2025-10-20",desc:"Costco",amount:298.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Costco",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251021_1",date:"2025-10-21",desc:"Starbucks Coffee",amount:8.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251022_1",date:"2025-10-22",desc:"Student Loan Payment",amount:180.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Nelnet",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251023_1",date:"2025-10-23",desc:"HEB Grocery",amount:192.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251024_1",date:"2025-10-24",desc:"Amazon Purchase",amount:112.34,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251025_1",date:"2025-10-25",desc:"Shell Gas Station",amount:72.30,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251026_1",date:"2025-10-26",desc:"State Farm Insurance",amount:275.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251027_1",date:"2025-10-27",desc:"Starbucks Coffee",amount:10.15,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251009_1",date:"2025-10-09",desc:"Online Payment - PYMT*WEB",amount:95.50,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Web Payment",accountId:"acc_chk_5724",confidence:0.71},
    {id:"t_20251016_1",date:"2025-10-16",desc:"Venmo - Mike Johnson",amount:60.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Venmo",accountId:"acc_chk_5724",confidence:0.65},
    {id:"t_20251023_2",date:"2025-10-23",desc:"ATM Cash Withdrawal",amount:100.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Chase ATM",accountId:"acc_chk_5724",confidence:0.70},
    {id:"t_20251025_2",date:"2025-10-25",desc:"TST* Downtown Market",amount:42.30,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Local Market",accountId:"acc_chk_5724",confidence:0.78}
  ];
};

// Johnson Family Transactions: Lower expenses, stable income, investment-ready
const generateJohnsonTransactions = (): Transaction[] => {
  return [
    // August 2025 - Stable biweekly income
    {id:"tj_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250802_1",date:"2025-08-02",desc:"Mortgage Payment - Rocket Mortgage",amount:2450.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Rocket Mortgage",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250802_2",date:"2025-08-02",desc:"Auto Loan Payment",amount:385.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Honda Finance",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250803_1",date:"2025-08-03",desc:"Whole Foods Market",amount:142.30,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250805_1",date:"2025-08-05",desc:"Xcel Energy",amount:178.45,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xcel Energy",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250806_1",date:"2025-08-06",desc:"King Soopers",amount:98.76,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250807_1",date:"2025-08-07",desc:"Shell Gas Station",amount:54.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250808_1",date:"2025-08-08",desc:"Denver Water",amount:62.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Denver Water",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250810_1",date:"2025-08-10",desc:"King Soopers",amount:115.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250812_1",date:"2025-08-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250814_1",date:"2025-08-14",desc:"Shell Gas Station",amount:58.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250815_1",date:"2025-08-15",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250815_2",date:"2025-08-15",desc:"T-Mobile",amount:125.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"T-Mobile",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250816_1",date:"2025-08-16",desc:"Student Loan Payment",amount:125.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Great Lakes",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250817_1",date:"2025-08-17",desc:"King Soopers",amount:127.89,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250818_1",date:"2025-08-18",desc:"Xfinity Internet",amount:89.99,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xfinity",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250820_1",date:"2025-08-20",desc:"Target",amount:78.34,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250821_1",date:"2025-08-21",desc:"Shell Gas Station",amount:61.15,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250823_1",date:"2025-08-23",desc:"King Soopers",amount:134.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250826_1",date:"2025-08-26",desc:"State Farm Insurance",amount:245.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250827_1",date:"2025-08-27",desc:"Chipotle",amount:32.45,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chipotle",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250828_1",date:"2025-08-28",desc:"Shell Gas Station",amount:57.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250830_1",date:"2025-08-30",desc:"King Soopers",amount:119.23,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},

    // September 2025 - Consistent pattern continues
    {id:"tj_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250902_1",date:"2025-09-02",desc:"Mortgage Payment - Rocket Mortgage",amount:2450.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Rocket Mortgage",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250902_2",date:"2025-09-02",desc:"Auto Loan Payment",amount:385.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Honda Finance",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250903_1",date:"2025-09-03",desc:"King Soopers",amount:145.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250905_1",date:"2025-09-05",desc:"Xcel Energy",amount:195.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xcel Energy",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250906_1",date:"2025-09-06",desc:"Shell Gas Station",amount:59.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250907_1",date:"2025-09-07",desc:"Denver Water",amount:65.80,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Denver Water",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250908_1",date:"2025-09-08",desc:"King Soopers",amount:128.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250910_1",date:"2025-09-10",desc:"Whole Foods Market",amount:87.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250912_1",date:"2025-09-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250913_1",date:"2025-09-13",desc:"Shell Gas Station",amount:62.15,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250915_1",date:"2025-09-15",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250915_2",date:"2025-09-15",desc:"T-Mobile",amount:125.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"T-Mobile",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250916_1",date:"2025-09-16",desc:"Student Loan Payment",amount:125.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Great Lakes",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250917_1",date:"2025-09-17",desc:"King Soopers",amount:136.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250918_1",date:"2025-09-18",desc:"Xfinity Internet",amount:89.99,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xfinity",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250920_1",date:"2025-09-20",desc:"Target",amount:92.56,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250921_1",date:"2025-09-21",desc:"Shell Gas Station",amount:58.30,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250923_1",date:"2025-09-23",desc:"King Soopers",amount:141.78,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250925_1",date:"2025-09-25",desc:"Panera Bread",amount:28.90,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Panera Bread",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20250926_1",date:"2025-09-26",desc:"State Farm Insurance",amount:245.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250927_1",date:"2025-09-27",desc:"Shell Gas Station",amount:60.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20250928_1",date:"2025-09-28",desc:"King Soopers",amount:133.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},

    // October 2025 - Continued stability
    {id:"tj_20251101_1",date:"2025-11-01",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251002_1",date:"2025-10-02",desc:"Mortgage Payment - Rocket Mortgage",amount:2450.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Rocket Mortgage",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251002_2",date:"2025-10-02",desc:"Auto Loan Payment",amount:385.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Honda Finance",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251003_1",date:"2025-10-03",desc:"King Soopers",amount:138.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251005_1",date:"2025-10-05",desc:"Xcel Energy",amount:182.20,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xcel Energy",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251006_1",date:"2025-10-06",desc:"Shell Gas Station",amount:61.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251007_1",date:"2025-10-07",desc:"Denver Water",amount:63.50,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Denver Water",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251008_1",date:"2025-10-08",desc:"King Soopers",amount:142.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251010_1",date:"2025-10-10",desc:"Whole Foods Market",amount:95.60,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251012_1",date:"2025-10-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251013_1",date:"2025-10-13",desc:"Shell Gas Station",amount:59.25,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251115_1",date:"2025-11-15",desc:"Payroll Deposit - Tech Solutions Inc",amount:5850.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Tech Solutions Inc",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251015_2",date:"2025-10-15",desc:"T-Mobile",amount:125.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"T-Mobile",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251016_1",date:"2025-10-16",desc:"Student Loan Payment",amount:125.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Great Lakes",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251017_1",date:"2025-10-17",desc:"King Soopers",amount:129.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251018_1",date:"2025-10-18",desc:"Xfinity Internet",amount:89.99,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Xfinity",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251020_1",date:"2025-10-20",desc:"Target",amount:85.67,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251021_1",date:"2025-10-21",desc:"Shell Gas Station",amount:62.40,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251023_1",date:"2025-10-23",desc:"King Soopers",amount:135.89,sign:"debit",category:"need",subcategory:"Groceries",merchant:"King Soopers",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251025_1",date:"2025-10-25",desc:"Sweet Basil Restaurant",amount:78.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Sweet Basil",accountId:"acc_chk_j001",confidence:0.98},
    {id:"tj_20251026_1",date:"2025-10-26",desc:"State Farm Insurance",amount:245.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_j001",confidence:0.99},
    {id:"tj_20251027_1",date:"2025-10-27",desc:"Shell Gas Station",amount:58.75,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_j001",confidence:0.99}
  ];
};

// Reynolds Family: Has high-interest debt, insufficient emergency fund - needs foundation work
// Designed to fail investment readiness (score < 80)
const reynoldsTotalAssets = 12500.00 + 8000.00 + 90000.00 + 120000.00 + 43000.00 + 820000.00 + 24000.00;
const reynoldsTotalLiabilities = 510000.00 + 18900.00 + 9800.00 + 12400.00;
const reynoldsNetWorth = reynoldsTotalAssets - reynoldsTotalLiabilities;

export const SAMPLE_REYNOLDS_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-09-01",
    endDate: "2025-11-27",
    totalMonths: 3
  },
  accounts: [
    {id:"acc_chk_5724",name:"Chase Private Client Checking •••5724",type:"checking",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_svg_001",name:"Chase Savings — Emergency Fund",type:"savings",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_brg_vaa",name:"Vanguard Brokerage (Taxable)",type:"brokerage",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_401k_fid",name:"Fidelity 401(k) — James",type:"401k",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_ira_roth",name:"Vanguard Roth IRA — Emily",type:"IRA",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_real_home",name:"Primary Residence — Austin, TX",type:"real_estate",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_vehicle_1",name:"2019 Toyota Highlander",type:"vehicle",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_cc_chase",name:"Chase Credit Card",type:"credit_card",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"}
  ],
  holdings: [
    {id:"h_chk",accountId:"acc_chk_5724",name:"Checking Balance",accountType:"checking",assetClass:"cash",liquidity:"liquid",balance:12500.00,currency:"USD",source:"mock"},
    {id:"h_svg",accountId:"acc_svg_001",name:"Emergency Savings",accountType:"savings",assetClass:"cash",liquidity:"liquid",balance:8000.00,currency:"USD",source:"mock"},
    {id:"h_brg",accountId:"acc_brg_vaa",name:"Vanguard Taxable",accountType:"brokerage",assetClass:"stocks",liquidity:"semi_liquid",balance:90000.00,currency:"USD",source:"mock"},
    {id:"h_401k",accountId:"acc_401k_fid",name:"Fidelity 401(k)",accountType:"401k",assetClass:"stocks",liquidity:"illiquid",balance:120000.00,currency:"USD",source:"mock"},
    {id:"h_roth",accountId:"acc_ira_roth",name:"Roth IRA",accountType:"IRA",assetClass:"stocks",liquidity:"illiquid",balance:43000.00,currency:"USD",source:"mock"},
    {id:"h_home",accountId:"acc_real_home",name:"Home Valuation (Zillow)",accountType:"real_estate",assetClass:"real_estate",liquidity:"illiquid",balance:820000.00,currency:"USD",source:"mock"},
    {id:"h_vehicle",accountId:"acc_vehicle_1",name:"Vehicle Value (KBB)",accountType:"vehicle",assetClass:"other",liquidity:"illiquid",balance:24000.00,currency:"USD",source:"mock"}
  ],
  liabilities: [
    {id:"l_mort",accountId:"acc_real_home",name:"FirstHome Mortgage",type:"mortgage",apr:4.25,balance:510000.00,monthlyPayment:3650.00,remainingTermMonths:325,notes:"FirstHome Mortgage"},
    {id:"l_auto",accountId:"acc_vehicle_1",name:"Chase Auto Loan",type:"auto",apr:5.9,balance:18900.00,monthlyPayment:540.12,remainingTermMonths:42,notes:"Chase Auto"},
    {id:"l_cc",accountId:"acc_cc_chase",name:"Chase Credit Card",type:"credit_card",apr:22.99,balance:9800.00,monthlyPayment:250.00,remainingTermMonths:0,notes:"High priority - needs payoff"},
    {id:"l_student",accountId:"acc_chk_5724",name:"Student Loan",type:"student",apr:4.9,balance:12400.00,monthlyPayment:180.00,remainingTermMonths:96,notes:"Nelnet"}
  ],
  trends: {
    d30:{abs:-9.48,pct:-0.02},
    d60:{abs:-732.88,pct:-0.18},
    d90:{abs:-4741.88,pct:-1.12},
    series12m:[745000,748000,751000,752500,753000,755000,757000,760000,762000,765000,768000,770000]
  },
  stagingTxns: generateReynoldsTransactions().map(toStagingTransaction),
  syncLog: [
    {accountId:"acc_chk_5724",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_brg_vaa",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_401k_fid",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_ira_roth",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_svg_001",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_real_home",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_vehicle_1",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_cc_chase",status:"connected",ts:"2025-09-01T10:00:00Z"}
  ],
  netWorth: {
    assets: reynoldsTotalAssets,
    liabilities: reynoldsTotalLiabilities,
    net: reynoldsNetWorth
  },
  uiFlags: {
    reviewedIn11: true,
    readyFor12: true
  }
};

// Johnson Family: Investment-ready (passes 5-factor assessment)
const johnsonTotalAssets = 45000.00 + 35000.00 + 65000.00 + 95000.00 + 38000.00 + 625000.00 + 19000.00;
const johnsonTotalLiabilities = 380000.00 + 14500.00 + 8900.00;
const johnsonNetWorth = johnsonTotalAssets - johnsonTotalLiabilities;

export const SAMPLE_JOHNSON_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-09-01",
    endDate: "2025-11-27",
    totalMonths: 3
  },
  accounts: [
    {id:"acc_chk_j001",name:"Wells Fargo Checking •••4892",type:"checking",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_svg_j002",name:"Ally Savings — Emergency Reserve",type:"savings",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_brg_j003",name:"Schwab Brokerage",type:"brokerage",providerStatus:"connected",lastSync:"2025-10-01T10:00:00Z"},
    {id:"acc_401k_j004",name:"Vanguard 401(k) — Sarah",type:"401k",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_ira_j005",name:"Fidelity Roth IRA — Michael",type:"IRA",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_real_j006",name:"Primary Residence — Denver, CO",type:"real_estate",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_vehicle_j007",name:"2020 Honda CR-V",type:"vehicle",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"}
  ],
  holdings: [
    {id:"h_chk_j",accountId:"acc_chk_j001",name:"Checking Balance",accountType:"checking",assetClass:"cash",liquidity:"liquid",balance:45000.00,currency:"USD",source:"mock"},
    {id:"h_svg_j",accountId:"acc_svg_j002",name:"Emergency Savings",accountType:"savings",assetClass:"cash",liquidity:"liquid",balance:35000.00,currency:"USD",source:"mock"},
    {id:"h_brg_j",accountId:"acc_brg_j003",name:"Schwab Taxable",accountType:"brokerage",assetClass:"stocks",liquidity:"semi_liquid",balance:65000.00,currency:"USD",source:"mock"},
    {id:"h_401k_j",accountId:"acc_401k_j004",name:"Vanguard 401(k)",accountType:"401k",assetClass:"stocks",liquidity:"illiquid",balance:95000.00,currency:"USD",source:"mock"},
    {id:"h_roth_j",accountId:"acc_ira_j005",name:"Roth IRA",accountType:"IRA",assetClass:"stocks",liquidity:"illiquid",balance:38000.00,currency:"USD",source:"mock"},
    {id:"h_home_j",accountId:"acc_real_j006",name:"Home Valuation (Redfin)",accountType:"real_estate",assetClass:"real_estate",liquidity:"illiquid",balance:625000.00,currency:"USD",source:"mock"},
    {id:"h_vehicle_j",accountId:"acc_vehicle_j007",name:"Vehicle Value (KBB)",accountType:"vehicle",assetClass:"other",liquidity:"illiquid",balance:19000.00,currency:"USD",source:"mock"}
  ],
  liabilities: [
    {id:"l_mort_j",accountId:"acc_real_j006",name:"Rocket Mortgage",type:"mortgage",apr:3.5,balance:380000.00,monthlyPayment:2450.00,remainingTermMonths:285,notes:"Rocket Mortgage"},
    {id:"l_auto_j",accountId:"acc_vehicle_j007",name:"Honda Finance",type:"auto",apr:4.5,balance:14500.00,monthlyPayment:385.00,remainingTermMonths:38,notes:"Honda Finance"},
    {id:"l_student_j",accountId:"acc_chk_j001",name:"Federal Student Loan",type:"student",apr:3.8,balance:8900.00,monthlyPayment:125.00,remainingTermMonths:72,notes:"Great Lakes"}
  ],
  trends: {
    d30:{abs:1250.00,pct:0.24},
    d60:{abs:2480.00,pct:0.48},
    d90:{abs:3720.00,pct:0.72},
    series12m:[510000,512000,514000,515500,517000,519000,521000,523000,525000,527000,529000,531000]
  },
  stagingTxns: generateJohnsonTransactions().map(toStagingTransaction),
  syncLog: [
    {accountId:"acc_chk_j001",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_svg_j002",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_brg_j003",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_401k_j004",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_ira_j005",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_real_j006",status:"connected",ts:"2025-09-01T10:00:00Z"},
    {accountId:"acc_vehicle_j007",status:"connected",ts:"2025-09-01T10:00:00Z"}
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

// Export Reynolds transactions as default DashboardData
export const SAMPLE_DASHBOARD_DATA: DashboardData = {
  period: {
    start: "2025-09-01",
    end: "2025-11-27",
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
  recommendations: { immediate: [] } // Generated dynamically in PersonalizedRecommendations component
};

// Export Johnson transactions as separate DashboardData
export const SAMPLE_JOHNSON_DASHBOARD_DATA: DashboardData = {
  period: {
    start: "2025-09-01",
    end: "2025-11-27",
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
  recommendations: { immediate: [] } // Generated dynamically in PersonalizedRecommendations component
};

// Paper Trading Progress Data for Reynolds Family (more aggressive, closer to ready)
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

// Paper Trading Progress Data for Johnson Family (more conservative, further from ready)
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

// ============== AUSTIN FAMILY ==============
// Austin Family Transactions: Middle-class family with childcare expenses and brokerage transfers
const generateAustinTransactions = (): Transaction[] => {
  return [
    // August 2025
    {id:"ta_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Tech Company",amount:12150.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Tech Company",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250802_1",date:"2025-08-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250802_2",date:"2025-08-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250803_1",date:"2025-08-03",desc:"HEB Grocery Store",amount:187.50,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250804_1",date:"2025-08-04",desc:"Shell Gas Station",amount:94.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250805_1",date:"2025-08-05",desc:"Austin Energy Electric",amount:245.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250805_2",date:"2025-08-05",desc:"Childcare Services - KidsCamp",amount:1100.00,sign:"debit",category:"need",subcategory:"Childcare",merchant:"KidsCamp",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250806_1",date:"2025-08-06",desc:"Spectrum Internet",amount:82.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Spectrum",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250807_1",date:"2025-08-07",desc:"Austin Water Utility",amount:50.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250808_1",date:"2025-08-08",desc:"Whole Foods Market",amount:125.30,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250809_1",date:"2025-08-09",desc:"Torchy's Tacos",amount:45.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Torchy's Tacos",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250810_1",date:"2025-08-10",desc:"HEB Grocery Store",amount:156.70,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250812_1",date:"2025-08-12",desc:"Shell Gas Station",amount:88.50,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250813_1",date:"2025-08-13",desc:"Blue Cross Blue Shield Health Insurance",amount:420.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"BCBS",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250814_1",date:"2025-08-14",desc:"State Farm Auto Insurance",amount:215.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250815_1",date:"2025-08-15",desc:"Payroll Deposit - Tech Company",amount:12150.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Tech Company",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250815_2",date:"2025-08-15",desc:"Credit Card Payment",amount:1250.00,sign:"debit",category:"saving",subcategory:"Credit Card Payment",merchant:"Chase Credit Card",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250816_1",date:"2025-08-16",desc:"CVS Pharmacy - Medical Supplies",amount:160.00,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"CVS",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250817_1",date:"2025-08-17",desc:"HEB Grocery Store",amount:142.80,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250818_1",date:"2025-08-18",desc:"Target Shopping",amount:87.90,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250819_1",date:"2025-08-19",desc:"LA Fitness Gym Membership",amount:45.00,sign:"debit",category:"want",subcategory:"Fitness",merchant:"LA Fitness",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250820_1",date:"2025-08-20",desc:"Chipotle Mexican Grill",amount:32.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chipotle",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250821_1",date:"2025-08-21",desc:"Shell Gas Station",amount:92.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250822_1",date:"2025-08-22",desc:"HEB Grocery Store",amount:168.40,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250823_1",date:"2025-08-23",desc:"Amazon Purchase - Household Items",amount:94.60,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250825_1",date:"2025-08-25",desc:"Transfer to Vanguard Brokerage",amount:1200.00,sign:"debit",category:"saving",subcategory:"Investment Transfer",merchant:"Vanguard",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250827_1",date:"2025-08-27",desc:"Shell Gas Station",amount:96.30,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250828_1",date:"2025-08-28",desc:"Refund - Online Purchase Return",amount:600.00,sign:"credit",category:"want",subcategory:"Refund",merchant:"Amazon",accountId:"acc_chk_a001",confidence:0.85},
    {id:"ta_20250829_1",date:"2025-08-29",desc:"HEB Grocery Store",amount:134.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250830_1",date:"2025-08-30",desc:"Zelle Transfer - Friend Payment",amount:500.00,sign:"debit",category:"want",subcategory:"Transfer",merchant:"Zelle",accountId:"acc_chk_a001",confidence:0.75},

    // September 2025
    {id:"ta_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Tech Company",amount:12150.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Tech Company",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250902_1",date:"2025-09-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250902_2",date:"2025-09-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250903_1",date:"2025-09-03",desc:"HEB Grocery Store",amount:198.60,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250904_1",date:"2025-09-04",desc:"Shell Gas Station",amount:102.40,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250905_1",date:"2025-09-05",desc:"Austin Energy Electric",amount:268.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250905_2",date:"2025-09-05",desc:"Childcare Services - KidsCamp",amount:1100.00,sign:"debit",category:"need",subcategory:"Childcare",merchant:"KidsCamp",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250906_1",date:"2025-09-06",desc:"Spectrum Internet",amount:82.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Spectrum",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250907_1",date:"2025-09-07",desc:"Austin Water Utility",amount:48.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250908_1",date:"2025-09-08",desc:"Whole Foods Market",amount:138.70,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250909_1",date:"2025-09-09",desc:"P.F. Chang's Restaurant",amount:78.90,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"P.F. Chang's",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250910_1",date:"2025-09-10",desc:"HEB Grocery Store",amount:172.30,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250912_1",date:"2025-09-12",desc:"Shell Gas Station",amount:95.70,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250913_1",date:"2025-09-13",desc:"Blue Cross Blue Shield Health Insurance",amount:420.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"BCBS",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250914_1",date:"2025-09-14",desc:"State Farm Auto Insurance",amount:215.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250915_1",date:"2025-09-15",desc:"Payroll Deposit - Tech Company",amount:12150.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Tech Company",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250915_2",date:"2025-09-15",desc:"Credit Card Payment",amount:1350.00,sign:"debit",category:"saving",subcategory:"Credit Card Payment",merchant:"Chase Credit Card",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250916_1",date:"2025-09-16",desc:"CVS Pharmacy - Medical Supplies",amount:85.00,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"CVS",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250917_1",date:"2025-09-17",desc:"HEB Grocery Store",amount:159.20,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250918_1",date:"2025-09-18",desc:"Target Shopping",amount:112.40,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250919_1",date:"2025-09-19",desc:"LA Fitness Gym Membership",amount:45.00,sign:"debit",category:"want",subcategory:"Fitness",merchant:"LA Fitness",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250920_1",date:"2025-09-20",desc:"Olive Garden Restaurant",amount:68.30,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Olive Garden",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250921_1",date:"2025-09-21",desc:"Shell Gas Station",amount:99.10,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250922_1",date:"2025-09-22",desc:"HEB Grocery Store",amount:185.50,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250923_1",date:"2025-09-23",desc:"Amazon Purchase - Kids Toys",amount:156.80,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20250925_1",date:"2025-09-25",desc:"Transfer to Vanguard Brokerage",amount:2000.00,sign:"debit",category:"saving",subcategory:"Investment Transfer",merchant:"Vanguard",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250927_1",date:"2025-09-27",desc:"Shell Gas Station",amount:91.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20250929_1",date:"2025-09-29",desc:"HEB Grocery Store",amount:147.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},

    // October 2025
    {id:"ta_20251101_1",date:"2025-11-01",desc:"Payroll Deposit - Tech Company",amount:12150.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Tech Company",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251002_1",date:"2025-10-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251002_2",date:"2025-10-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251003_1",date:"2025-10-03",desc:"HEB Grocery Store",amount:176.40,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251004_1",date:"2025-10-04",desc:"Shell Gas Station",amount:89.60,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251005_1",date:"2025-10-05",desc:"Austin Energy Electric",amount:232.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251005_2",date:"2025-10-05",desc:"Childcare Services - KidsCamp",amount:1100.00,sign:"debit",category:"need",subcategory:"Childcare",merchant:"KidsCamp",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251006_1",date:"2025-10-06",desc:"Spectrum Internet",amount:82.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Spectrum",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251007_1",date:"2025-10-07",desc:"Austin Water Utility",amount:47.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251008_1",date:"2025-10-08",desc:"Whole Foods Market",amount:149.80,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251009_1",date:"2025-10-09",desc:"Chili's Grill & Bar",amount:54.70,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chili's",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251010_1",date:"2025-10-10",desc:"HEB Grocery Store",amount:164.80,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251011_1",date:"2025-10-11",desc:"Shell Gas Station",amount:97.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251012_1",date:"2025-10-12",desc:"Blue Cross Blue Shield Health Insurance",amount:420.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"BCBS",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251013_1",date:"2025-10-13",desc:"State Farm Auto Insurance",amount:215.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251014_1",date:"2025-10-14",desc:"Emergency Fund Transfer",amount:1500.00,sign:"debit",category:"saving",subcategory:"Savings Deposit",merchant:"Chase Savings",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251115_1",date:"2025-11-15",desc:"Payroll Deposit - Tech Company",amount:12150.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Tech Company",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251015_2",date:"2025-10-15",desc:"Credit Card Payment",amount:1480.00,sign:"debit",category:"saving",subcategory:"Credit Card Payment",merchant:"Chase Credit Card",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251015_3",date:"2025-10-15",desc:"401(k) Contribution",amount:900.00,sign:"debit",category:"saving",subcategory:"Retirement",merchant:"Fidelity 401k",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251016_1",date:"2025-10-16",desc:"CVS Pharmacy - Medical Supplies",amount:72.50,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"CVS",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251017_1",date:"2025-10-17",desc:"HEB Grocery Store",amount:181.70,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251018_1",date:"2025-10-18",desc:"Target Shopping",amount:95.60,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251019_1",date:"2025-10-19",desc:"LA Fitness Gym Membership",amount:45.00,sign:"debit",category:"want",subcategory:"Fitness",merchant:"LA Fitness",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251020_1",date:"2025-10-20",desc:"Red Lobster Restaurant",amount:89.40,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Red Lobster",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251021_1",date:"2025-10-21",desc:"Shell Gas Station",amount:93.50,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251022_1",date:"2025-10-22",desc:"HEB Grocery Store",amount:167.20,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251023_1",date:"2025-10-23",desc:"Amazon Purchase - Electronics",amount:234.50,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251024_1",date:"2025-10-24",desc:"Hotel Stay - Vacation Travel",amount:2290.00,sign:"debit",category:"want",subcategory:"Travel",merchant:"Hilton Hotels",accountId:"acc_chk_a001",confidence:0.98},
    {id:"ta_20251025_1",date:"2025-10-25",desc:"Transfer to Vanguard Brokerage",amount:1200.00,sign:"debit",category:"saving",subcategory:"Investment Transfer",merchant:"Vanguard",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251027_1",date:"2025-10-27",desc:"Shell Gas Station",amount:98.40,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_a001",confidence:0.99},
    {id:"ta_20251029_1",date:"2025-10-29",desc:"HEB Grocery Store",amount:153.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_a001",confidence:0.98},
  ];
};

// Austin Family: Middle-class with some savings potential
const austinTotalAssets = 40799.00 + 4400.00 + 80000.00 + 520000.00 + 28000.00;
const austinTotalLiabilities = 415000.00 + 14000.00 + 6500.00;
const austinNetWorth = austinTotalAssets - austinTotalLiabilities;

export const SAMPLE_AUSTIN_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-09-01",
    endDate: "2025-11-29",
    totalMonths: 3
  },
  accounts: [
    {id:"acc_chk_a001",name:"Chase Checking •••8923",type:"checking",providerStatus:"connected",lastSync:"2025-11-15T10:00:00Z"},
    {id:"acc_brg_a002",name:"Vanguard Brokerage",type:"brokerage",providerStatus:"connected",lastSync:"2025-11-15T10:00:00Z"},
    {id:"acc_401k_a003",name:"Fidelity 401(k)",type:"401k",providerStatus:"needs_attention",lastSync:"2025-10-20T10:00:00Z"},
    {id:"acc_real_a004",name:"Primary Residence — Austin, TX",type:"real_estate",providerStatus:"connected",lastSync:"2025-11-15T10:00:00Z"},
    {id:"acc_vehicle_a005",name:"2021 Honda Accord",type:"vehicle",providerStatus:"connected",lastSync:"2025-11-15T10:00:00Z"}
  ],
  holdings: [
    {id:"h_chk_a",accountId:"acc_chk_a001",name:"Checking Balance",accountType:"checking",assetClass:"cash",liquidity:"liquid",balance:40799.00,currency:"USD",source:"mock"},
    {id:"h_brg_a",accountId:"acc_brg_a002",name:"Vanguard Taxable",accountType:"brokerage",assetClass:"stocks",liquidity:"semi_liquid",balance:4400.00,currency:"USD",source:"mock"},
    {id:"h_401k_a",accountId:"acc_401k_a003",name:"Fidelity 401(k)",accountType:"401k",assetClass:"stocks",liquidity:"illiquid",balance:80000.00,currency:"USD",source:"mock"},
    {id:"h_home_a",accountId:"acc_real_a004",name:"Home Valuation (Zillow)",accountType:"real_estate",assetClass:"real_estate",liquidity:"illiquid",balance:520000.00,currency:"USD",source:"mock"},
    {id:"h_vehicle_a",accountId:"acc_vehicle_a005",name:"Vehicle Value (KBB)",accountType:"vehicle",assetClass:"other",liquidity:"illiquid",balance:28000.00,currency:"USD",source:"mock"}
  ],
  liabilities: [
    {id:"l_mort_a",accountId:"acc_real_a004",name:"FirstHome Mortgage",type:"mortgage",apr:3.75,balance:415000.00,monthlyPayment:3650.00,remainingTermMonths:298,notes:"FirstHome Mortgage"},
    {id:"l_auto_a",accountId:"acc_vehicle_a005",name:"Chase Auto Loan",type:"auto",apr:4.9,balance:14000.00,monthlyPayment:540.12,remainingTermMonths:26,notes:"Chase Auto"},
    {id:"l_cc_a",accountId:"acc_chk_a001",name:"Chase Credit Card",type:"credit_card",apr:18.99,balance:6500.00,monthlyPayment:1300.00,remainingTermMonths:0,notes:"Variable monthly payment"}
  ],
  trends: {
    d30:{abs:850.00,pct:0.18},
    d60:{abs:1720.00,pct:0.36},
    d90:{abs:2580.00,pct:0.54},
    series12m:[620000,622000,624000,626000,628000,630000,632000,634000,636000,638000,640000,642000]
  },
  stagingTxns: generateAustinTransactions().map(toStagingTransaction),
  syncLog: [
    {accountId:"acc_chk_a001",status:"connected",ts:"2025-10-15T10:00:00Z"},
    {accountId:"acc_brg_a002",status:"connected",ts:"2025-10-15T10:00:00Z"},
    {accountId:"acc_401k_a003",status:"needs_attention",ts:"2025-09-20T10:00:00Z"},
    {accountId:"acc_real_a004",status:"connected",ts:"2025-10-15T10:00:00Z"},
    {accountId:"acc_vehicle_a005",status:"connected",ts:"2025-10-15T10:00:00Z"}
  ],
  netWorth: {
    assets: austinTotalAssets,
    liabilities: austinTotalLiabilities,
    net: austinNetWorth
  },
  uiFlags: {
    reviewedIn11: true,
    readyFor12: true
  }
};

export const SAMPLE_AUSTIN_DASHBOARD_DATA: DashboardData = {
  period: {
    start: "2025-09-01",
    end: "2025-11-29",
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
  txns: generateAustinTransactions(),
  recommendations: { immediate: [] }
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

// ============== PHOENIX FAMILY ==============
// Phoenix Family Transactions: Lower income with gig work, multiple debts
const generatePhoenixTransactions = (): Transaction[] => {
  return [
    // August 2025
    {id:"tp_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Main Job",amount:3900.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Main Employer",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250802_1",date:"2025-08-02",desc:"Rent Payment",amount:1700.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Rental Management",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250802_2",date:"2025-08-02",desc:"Auto Loan Payment",amount:410.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Bank of America Auto",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250803_1",date:"2025-08-03",desc:"Fry's Food Store",amount:87.30,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250804_1",date:"2025-08-04",desc:"Uber Rideshare Earnings",amount:680.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"Uber",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20250805_1",date:"2025-08-05",desc:"APS Electric Utility",amount:145.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"APS",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250806_1",date:"2025-08-06",desc:"Cox Internet",amount:75.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Cox",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250807_1",date:"2025-08-07",desc:"Fry's Food Store",amount:92.50,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250808_1",date:"2025-08-08",desc:"Shell Gas Station",amount:62.40,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250809_1",date:"2025-08-09",desc:"T-Mobile Phone Bill",amount:35.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"T-Mobile",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250810_1",date:"2025-08-10",desc:"DoorDash Delivery Earnings",amount:420.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"DoorDash",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20250811_1",date:"2025-08-11",desc:"Personal Loan Payment",amount:320.00,sign:"debit",category:"need",subcategory:"Debt Payment",merchant:"LendingClub",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250812_1",date:"2025-08-12",desc:"Student Loan Payment",amount:125.00,sign:"debit",category:"need",subcategory:"Debt Payment",merchant:"Navient",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250813_1",date:"2025-08-13",desc:"Walmart Grocery",amount:78.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Walmart",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250814_1",date:"2025-08-14",desc:"Shell Gas Station",amount:58.30,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250815_1",date:"2025-08-15",desc:"Payroll Deposit - Main Job",amount:3900.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Main Employer",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250815_2",date:"2025-08-15",desc:"State Farm Auto Insurance",amount:185.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250816_1",date:"2025-08-16",desc:"Fry's Food Store",amount:103.20,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250817_1",date:"2025-08-17",desc:"Uber Rideshare Earnings",amount:590.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"Uber",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20250818_1",date:"2025-08-18",desc:"Store Card Payment",amount:40.00,sign:"debit",category:"need",subcategory:"Debt Payment",merchant:"Target Card",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250819_1",date:"2025-08-19",desc:"Chipotle Mexican Grill",amount:18.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chipotle",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250820_1",date:"2025-08-20",desc:"Fry's Food Store",amount:89.40,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250821_1",date:"2025-08-21",desc:"Shell Gas Station",amount:65.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250822_1",date:"2025-08-22",desc:"CVS Pharmacy",amount:42.30,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"CVS",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250823_1",date:"2025-08-23",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250824_1",date:"2025-08-24",desc:"DoorDash Delivery Earnings",amount:510.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"DoorDash",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20250825_1",date:"2025-08-25",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250826_1",date:"2025-08-26",desc:"Walmart Grocery",amount:96.70,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Walmart",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250827_1",date:"2025-08-27",desc:"Shell Gas Station",amount:61.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250828_1",date:"2025-08-28",desc:"McDonald's Fast Food",amount:12.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"McDonald's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250829_1",date:"2025-08-29",desc:"Amazon Purchase",amount:45.60,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250830_1",date:"2025-08-30",desc:"Fry's Food Store",amount:84.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250831_1",date:"2025-08-31",desc:"Transfer to IRA Savings",amount:150.00,sign:"debit",category:"saving",subcategory:"Retirement",merchant:"Fidelity IRA",accountId:"acc_chk_p001",confidence:0.99},

    // September 2025
    {id:"tp_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Main Job",amount:3900.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Main Employer",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250902_1",date:"2025-09-02",desc:"Rent Payment",amount:1700.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Rental Management",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250902_2",date:"2025-09-02",desc:"Auto Loan Payment",amount:410.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Bank of America Auto",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250903_1",date:"2025-09-03",desc:"Fry's Food Store",amount:94.80,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250904_1",date:"2025-09-04",desc:"Uber Rideshare Earnings",amount:720.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"Uber",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20250905_1",date:"2025-09-05",desc:"APS Electric Utility",amount:158.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"APS",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250906_1",date:"2025-09-06",desc:"Cox Internet",amount:75.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Cox",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250907_1",date:"2025-09-07",desc:"Fry's Food Store",amount:101.40,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250908_1",date:"2025-09-08",desc:"Shell Gas Station",amount:69.50,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250909_1",date:"2025-09-09",desc:"T-Mobile Phone Bill",amount:35.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"T-Mobile",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250910_1",date:"2025-09-10",desc:"DoorDash Delivery Earnings",amount:455.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"DoorDash",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20250911_1",date:"2025-09-11",desc:"Personal Loan Payment",amount:320.00,sign:"debit",category:"need",subcategory:"Debt Payment",merchant:"LendingClub",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250912_1",date:"2025-09-12",desc:"Student Loan Payment",amount:125.00,sign:"debit",category:"need",subcategory:"Debt Payment",merchant:"Navient",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250913_1",date:"2025-09-13",desc:"Walmart Grocery",amount:85.60,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Walmart",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250914_1",date:"2025-09-14",desc:"Shell Gas Station",amount:63.70,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250915_1",date:"2025-09-15",desc:"Payroll Deposit - Main Job",amount:3900.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Main Employer",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250915_2",date:"2025-09-15",desc:"State Farm Auto Insurance",amount:185.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250916_1",date:"2025-09-16",desc:"Fry's Food Store",amount:98.30,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250917_1",date:"2025-09-17",desc:"Uber Rideshare Earnings",amount:640.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"Uber",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20250918_1",date:"2025-09-18",desc:"Store Card Payment",amount:40.00,sign:"debit",category:"need",subcategory:"Debt Payment",merchant:"Target Card",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250919_1",date:"2025-09-19",desc:"Taco Bell Fast Food",amount:14.20,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Taco Bell",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250920_1",date:"2025-09-20",desc:"Fry's Food Store",amount:91.80,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250921_1",date:"2025-09-21",desc:"Shell Gas Station",amount:68.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250922_1",date:"2025-09-22",desc:"Walgreens Pharmacy",amount:38.50,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"Walgreens",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250923_1",date:"2025-09-23",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250924_1",date:"2025-09-24",desc:"DoorDash Delivery Earnings",amount:485.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"DoorDash",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20250925_1",date:"2025-09-25",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250926_1",date:"2025-09-26",desc:"Walmart Grocery",amount:88.40,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Walmart",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250927_1",date:"2025-09-27",desc:"Shell Gas Station",amount:64.50,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20250928_1",date:"2025-09-28",desc:"Subway Sandwich Shop",amount:16.90,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Subway",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250929_1",date:"2025-09-29",desc:"Target Shopping",amount:52.30,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250930_1",date:"2025-09-30",desc:"Fry's Food Store",amount:93.70,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20250930_2",date:"2025-09-30",desc:"Transfer to IRA Savings",amount:150.00,sign:"debit",category:"saving",subcategory:"Retirement",merchant:"Fidelity IRA",accountId:"acc_chk_p001",confidence:0.99},

    // October 2025
    {id:"tp_20251101_1",date:"2025-11-01",desc:"Payroll Deposit - Main Job",amount:3900.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Main Employer",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251002_1",date:"2025-10-02",desc:"Rent Payment",amount:1700.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Rental Management",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251002_2",date:"2025-10-02",desc:"Auto Loan Payment",amount:410.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Bank of America Auto",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251003_1",date:"2025-10-03",desc:"Fry's Food Store",amount:89.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251004_1",date:"2025-10-04",desc:"Uber Rideshare Earnings",amount:695.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"Uber",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20251005_1",date:"2025-10-05",desc:"APS Electric Utility",amount:142.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"APS",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251006_1",date:"2025-10-06",desc:"Cox Internet",amount:75.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Cox",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251007_1",date:"2025-10-07",desc:"Fry's Food Store",amount:97.60,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251008_1",date:"2025-10-08",desc:"Shell Gas Station",amount:66.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251009_1",date:"2025-10-09",desc:"T-Mobile Phone Bill",amount:35.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"T-Mobile",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251010_1",date:"2025-10-10",desc:"DoorDash Delivery Earnings",amount:470.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"DoorDash",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20251011_1",date:"2025-10-11",desc:"Personal Loan Payment",amount:320.00,sign:"debit",category:"need",subcategory:"Debt Payment",merchant:"LendingClub",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251012_1",date:"2025-10-12",desc:"Student Loan Payment",amount:125.00,sign:"debit",category:"need",subcategory:"Debt Payment",merchant:"Navient",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251013_1",date:"2025-10-13",desc:"Walmart Grocery",amount:91.20,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Walmart",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251014_1",date:"2025-10-14",desc:"Shell Gas Station",amount:62.40,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251115_1",date:"2025-11-15",desc:"Payroll Deposit - Main Job",amount:3900.00,sign:"credit",category:"need",subcategory:"Payroll",merchant:"Main Employer",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251015_2",date:"2025-10-15",desc:"State Farm Auto Insurance",amount:185.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251016_1",date:"2025-10-16",desc:"Fry's Food Store",amount:102.50,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251017_1",date:"2025-10-17",desc:"Uber Rideshare Earnings",amount:615.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"Uber",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20251018_1",date:"2025-10-18",desc:"Store Card Payment",amount:40.00,sign:"debit",category:"need",subcategory:"Debt Payment",merchant:"Target Card",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251019_1",date:"2025-10-19",desc:"Pizza Hut Delivery",amount:22.40,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Pizza Hut",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251020_1",date:"2025-10-20",desc:"Fry's Food Store",amount:86.30,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251021_1",date:"2025-10-21",desc:"Shell Gas Station",amount:67.10,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251022_1",date:"2025-10-22",desc:"CVS Pharmacy",amount:45.80,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"CVS",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251023_1",date:"2025-10-23",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251024_1",date:"2025-10-24",desc:"DoorDash Delivery Earnings",amount:505.00,sign:"credit",category:"need",subcategory:"Gig Income",merchant:"DoorDash",accountId:"acc_chk_p001",confidence:0.95},
    {id:"tp_20251025_1",date:"2025-10-25",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251026_1",date:"2025-10-26",desc:"Walmart Grocery",amount:94.80,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Walmart",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251027_1",date:"2025-10-27",desc:"Shell Gas Station",amount:65.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251028_1",date:"2025-10-28",desc:"Starbucks Coffee",amount:8.75,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251029_1",date:"2025-10-29",desc:"Amazon Prime Subscription",amount:14.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Amazon",accountId:"acc_chk_p001",confidence:0.99},
    {id:"tp_20251030_1",date:"2025-10-30",desc:"Fry's Food Store",amount:88.50,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Fry's",accountId:"acc_chk_p001",confidence:0.98},
    {id:"tp_20251031_1",date:"2025-10-31",desc:"Transfer to IRA Savings",amount:150.00,sign:"debit",category:"saving",subcategory:"Retirement",merchant:"Fidelity IRA",accountId:"acc_chk_p001",confidence:0.99},
  ];
};

// Phoenix Family: Lower income, multiple high-interest debts, struggling
const phoenixTotalAssets = 3400.00 + 1200.00 + 9200.00 + 11000.00;
const phoenixTotalLiabilities = 14000.00 + 7500.00 + 9000.00 + 1100.00;
const phoenixNetWorth = phoenixTotalAssets - phoenixTotalLiabilities;

export const SAMPLE_PHOENIX_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-09-01",
    endDate: "2025-11-30",
    totalMonths: 3
  },
  accounts: [
    {id:"acc_chk_p001",name:"Bank of America Checking •••2341",type:"checking",providerStatus:"connected",lastSync:"2025-11-20T10:00:00Z"},
    {id:"acc_svg_p002",name:"Emergency Fund Savings",type:"savings",providerStatus:"needs_attention",lastSync:"2025-10-15T10:00:00Z"},
    {id:"acc_ira_p003",name:"Fidelity IRA Account",type:"IRA",providerStatus:"connected",lastSync:"2025-11-20T10:00:00Z"},
    {id:"acc_vehicle_p004",name:"2017 Toyota Camry",type:"vehicle",providerStatus:"disconnected",lastSync:"2025-08-10T10:00:00Z"}
  ],
  holdings: [
    {id:"h_chk_p",accountId:"acc_chk_p001",name:"Checking Balance",accountType:"checking",assetClass:"cash",liquidity:"liquid",balance:3400.00,currency:"USD",source:"mock"},
    {id:"h_svg_p",accountId:"acc_svg_p002",name:"Emergency Savings",accountType:"savings",assetClass:"cash",liquidity:"liquid",balance:1200.00,currency:"USD",source:"mock"},
    {id:"h_ira_p",accountId:"acc_ira_p003",name:"Fidelity IRA",accountType:"IRA",assetClass:"stocks",liquidity:"illiquid",balance:9200.00,currency:"USD",source:"mock"},
    {id:"h_vehicle_p",accountId:"acc_vehicle_p004",name:"Vehicle Value (KBB)",accountType:"vehicle",assetClass:"other",liquidity:"illiquid",balance:11000.00,currency:"USD",source:"mock"}
  ],
  liabilities: [
    {id:"l_auto_p",accountId:"acc_vehicle_p004",name:"Bank of America Auto Loan",type:"auto",apr:6.9,balance:14000.00,monthlyPayment:410.00,remainingTermMonths:34,notes:"Bank of America Auto"},
    {id:"l_personal_p",accountId:"acc_chk_p001",name:"Personal Loan - LendingClub",type:"personal",apr:20.99,balance:7500.00,monthlyPayment:320.00,remainingTermMonths:24,notes:"High interest - priority payoff"},
    {id:"l_student_p",accountId:"acc_chk_p001",name:"Student Loan - Navient",type:"student",apr:5.5,balance:9000.00,monthlyPayment:125.00,remainingTermMonths:72,notes:"Federal loan"},
    {id:"l_cc_p",accountId:"acc_chk_p001",name:"Target Store Card",type:"credit_card",apr:24.99,balance:1100.00,monthlyPayment:40.00,remainingTermMonths:0,notes:"Store card"}
  ],
  trends: {
    d30:{abs:-320.00,pct:-1.45},
    d60:{abs:-580.00,pct:-2.63},
    d90:{abs:-890.00,pct:-4.04},
    series12m:[18000,17800,17600,17400,17200,17000,16800,16600,16400,16200,16000,15800]
  },
  stagingTxns: generatePhoenixTransactions().map(toStagingTransaction),
  syncLog: [
    {accountId:"acc_chk_p001",status:"connected",ts:"2025-10-20T10:00:00Z"},
    {accountId:"acc_svg_p002",status:"needs_attention",ts:"2025-09-15T10:00:00Z"},
    {accountId:"acc_ira_p003",status:"connected",ts:"2025-10-20T10:00:00Z"},
    {accountId:"acc_vehicle_p004",status:"disconnected",ts:"2025-08-10T10:00:00Z"}
  ],
  netWorth: {
    assets: phoenixTotalAssets,
    liabilities: phoenixTotalLiabilities,
    net: phoenixNetWorth
  },
  uiFlags: {
    reviewedIn11: true,
    readyFor12: true
  }
};

export const SAMPLE_PHOENIX_DASHBOARD_DATA: DashboardData = {
  period: {
    start: "2025-09-01",
    end: "2025-11-30",
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
