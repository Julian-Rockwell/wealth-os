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

// REYNOLDS FAMILY: "TIGHT BUDGET" - High income, high expenses (95-97% spending)
// Target: ~$11,700/month expenses from $12,150 income = 96% spending
// Distribution: ~55% Needs, ~33% Wants, ~7% Savings
const generateReynoldsTransactions = (): Transaction[] => {
  return [
    // August 2025 - Income: $24,300 (bi-weekly x2)
    {id:"t_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250802_1",date:"2025-08-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250802_2",date:"2025-08-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250803_1",date:"2025-08-03",desc:"HEB Grocery",amount:287.43,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250803_2",date:"2025-08-03",desc:"Starbucks Coffee",amount:18.45,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250804_1",date:"2025-08-04",desc:"Shell Gas Station",amount:78.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250804_2",date:"2025-08-04",desc:"Target Shopping",amount:156.80,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250805_1",date:"2025-08-05",desc:"Austin Energy",amount:325.80,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250805_2",date:"2025-08-05",desc:"Whole Foods Market",amount:142.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250806_1",date:"2025-08-06",desc:"HEB Grocery",amount:224.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250806_2",date:"2025-08-06",desc:"Starbucks Coffee",amount:21.20,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250806_3",date:"2025-08-06",desc:"P.F. Chang's Restaurant",amount:94.70,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"P.F. Chang's",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250807_1",date:"2025-08-07",desc:"Austin Water Utility",amount:88.50,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250807_2",date:"2025-08-07",desc:"Amazon Purchase - Electronics",amount:234.99,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250808_1",date:"2025-08-08",desc:"Target",amount:178.25,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250808_2",date:"2025-08-08",desc:"Chipotle Mexican Grill",amount:42.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chipotle",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250809_1",date:"2025-08-09",desc:"HEB Grocery",amount:203.15,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250809_2",date:"2025-08-09",desc:"Starbucks Coffee",amount:15.75,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250810_1",date:"2025-08-10",desc:"Shell Gas Station",amount:82.15,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250810_2",date:"2025-08-10",desc:"Home Depot - Home Improvement",amount:267.45,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Home Depot",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250811_1",date:"2025-08-11",desc:"Torchy's Tacos",amount:52.30,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Torchy's Tacos",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250812_1",date:"2025-08-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250812_2",date:"2025-08-12",desc:"HBO Max Subscription",amount:15.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"HBO Max",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250812_3",date:"2025-08-12",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250812_4",date:"2025-08-12",desc:"Disney+ Subscription",amount:13.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Disney+",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250813_1",date:"2025-08-13",desc:"Whole Foods Market",amount:167.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250813_2",date:"2025-08-13",desc:"LA Fitness Gym Membership",amount:89.99,sign:"debit",category:"want",subcategory:"Fitness",merchant:"LA Fitness",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250814_1",date:"2025-08-14",desc:"CVS Pharmacy",amount:64.99,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"CVS",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250814_2",date:"2025-08-14",desc:"Starbucks Coffee",amount:17.90,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250815_1",date:"2025-08-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250815_2",date:"2025-08-15",desc:"Credit Card Payment",amount:350.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250815_3",date:"2025-08-15",desc:"AT&T Wireless",amount:195.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250816_1",date:"2025-08-16",desc:"HEB Grocery",amount:196.89,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250816_2",date:"2025-08-16",desc:"Amazon Prime Subscription",amount:14.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250817_1",date:"2025-08-17",desc:"Texas Gas Service",amount:65.20,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Texas Gas Service",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250817_2",date:"2025-08-17",desc:"Olive Garden Restaurant",amount:86.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Olive Garden",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250818_1",date:"2025-08-18",desc:"Shell Gas Station",amount:75.30,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250818_2",date:"2025-08-18",desc:"Starbucks Coffee",amount:19.95,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250819_1",date:"2025-08-19",desc:"Costco",amount:412.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Costco",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250819_2",date:"2025-08-19",desc:"Target Shopping",amount:198.30,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250820_1",date:"2025-08-20",desc:"P.F. Chang's",amount:107.60,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"P.F. Chang's",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250821_1",date:"2025-08-21",desc:"Shell Gas Station",amount:79.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250822_1",date:"2025-08-22",desc:"Student Loan Payment",amount:180.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Nelnet",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250822_2",date:"2025-08-22",desc:"Starbucks Coffee",amount:16.30,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250823_1",date:"2025-08-23",desc:"HEB Grocery",amount:218.23,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250823_2",date:"2025-08-23",desc:"AMC Theaters - Movie Night",amount:78.00,sign:"debit",category:"want",subcategory:"Entertainment",merchant:"AMC",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250824_1",date:"2025-08-24",desc:"Amazon Purchase",amount:189.99,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250825_1",date:"2025-08-25",desc:"Shell Gas Station",amount:80.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250825_2",date:"2025-08-25",desc:"Starbucks Coffee",amount:18.30,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250826_1",date:"2025-08-26",desc:"State Farm Insurance",amount:285.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250826_2",date:"2025-08-26",desc:"Panera Bread",amount:45.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Panera Bread",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250827_1",date:"2025-08-27",desc:"HEB Grocery",amount:205.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250827_2",date:"2025-08-27",desc:"Best Buy - Electronics",amount:342.50,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Best Buy",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250828_1",date:"2025-08-28",desc:"Home Depot",amount:187.89,sign:"debit",category:"need",subcategory:"Home Maintenance",merchant:"Home Depot",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250829_1",date:"2025-08-29",desc:"Chili's Grill & Bar",amount:72.45,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chili's",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250830_1",date:"2025-08-30",desc:"Shell Gas Station",amount:76.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},

    // September 2025 - Income: $24,300
    {id:"t_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250902_1",date:"2025-09-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250902_2",date:"2025-09-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250903_1",date:"2025-09-03",desc:"HEB Grocery",amount:295.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250903_2",date:"2025-09-03",desc:"Starbucks Coffee",amount:19.85,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250904_1",date:"2025-09-04",desc:"Torchy's Tacos",amount:55.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Torchy's Tacos",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250905_1",date:"2025-09-05",desc:"Austin Energy",amount:352.45,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250905_2",date:"2025-09-05",desc:"Target Shopping",amount:276.23,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250906_1",date:"2025-09-06",desc:"Shell Gas Station",amount:81.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250907_1",date:"2025-09-07",desc:"Austin Water Utility",amount:92.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250907_2",date:"2025-09-07",desc:"Amazon Purchase",amount:156.40,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250908_1",date:"2025-09-08",desc:"HEB Grocery",amount:230.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250909_1",date:"2025-09-09",desc:"Starbucks Coffee",amount:21.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250909_2",date:"2025-09-09",desc:"P.F. Chang's Restaurant",amount:112.70,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"P.F. Chang's",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250910_1",date:"2025-09-10",desc:"Walgreens",amount:75.67,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"Walgreens",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250911_1",date:"2025-09-11",desc:"Shell Gas Station",amount:77.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250912_1",date:"2025-09-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250912_2",date:"2025-09-12",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250912_3",date:"2025-09-12",desc:"HBO Max Subscription",amount:15.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"HBO Max",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250912_4",date:"2025-09-12",desc:"Disney+ Subscription",amount:13.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Disney+",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250913_1",date:"2025-09-13",desc:"HEB Grocery",amount:207.89,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250913_2",date:"2025-09-13",desc:"LA Fitness Gym Membership",amount:89.99,sign:"debit",category:"want",subcategory:"Fitness",merchant:"LA Fitness",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250914_1",date:"2025-09-14",desc:"Shell Gas Station",amount:78.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250915_1",date:"2025-09-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250915_2",date:"2025-09-15",desc:"Credit Card Payment",amount:350.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250915_3",date:"2025-09-15",desc:"AT&T Wireless",amount:195.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250916_1",date:"2025-09-16",desc:"Starbucks Coffee",amount:18.95,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250916_2",date:"2025-09-16",desc:"Amazon Prime Subscription",amount:14.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250917_1",date:"2025-09-17",desc:"Texas Gas Service",amount:58.75,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Texas Gas Service",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250917_2",date:"2025-09-17",desc:"HEB Grocery",amount:223.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250918_1",date:"2025-09-18",desc:"AMC Theaters",amount:86.00,sign:"debit",category:"want",subcategory:"Entertainment",merchant:"AMC",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250918_2",date:"2025-09-18",desc:"Chipotle Mexican Grill",amount:47.30,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chipotle",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250920_1",date:"2025-09-20",desc:"Costco",amount:387.92,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Costco",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250921_1",date:"2025-09-21",desc:"Shell Gas Station",amount:83.15,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250921_2",date:"2025-09-21",desc:"Target Shopping",amount:242.80,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250922_1",date:"2025-09-22",desc:"Student Loan Payment",amount:180.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Nelnet",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250923_1",date:"2025-09-23",desc:"HEB Grocery",amount:219.23,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250924_1",date:"2025-09-24",desc:"Starbucks Coffee",amount:22.40,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250925_1",date:"2025-09-25",desc:"Amazon Purchase",amount:167.89,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250925_2",date:"2025-09-25",desc:"Olive Garden Restaurant",amount:94.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Olive Garden",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250926_1",date:"2025-09-26",desc:"State Farm Insurance",amount:285.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250927_1",date:"2025-09-27",desc:"HEB Grocery",amount:231.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250928_1",date:"2025-09-28",desc:"Shell Gas Station",amount:79.25,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250930_1",date:"2025-09-30",desc:"Chili's Grill & Bar",amount:84.30,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chili's",accountId:"acc_chk_5724",confidence:0.98},

    // October 2025 - Income: $24,300
    {id:"t_20251001_1",date:"2025-10-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251002_1",date:"2025-10-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251002_2",date:"2025-10-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251003_1",date:"2025-10-03",desc:"HEB Grocery",amount:281.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251003_2",date:"2025-10-03",desc:"Starbucks Coffee",amount:20.75,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251004_1",date:"2025-10-04",desc:"Shell Gas Station",amount:84.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251004_2",date:"2025-10-04",desc:"Target Shopping",amount:298.45,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251005_1",date:"2025-10-05",desc:"Austin Energy",amount:338.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251005_2",date:"2025-10-05",desc:"P.F. Chang's Restaurant",amount:118.60,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"P.F. Chang's",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251006_1",date:"2025-10-06",desc:"HEB Grocery",amount:243.78,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251007_1",date:"2025-10-07",desc:"Austin Water Utility",amount:86.90,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251007_2",date:"2025-10-07",desc:"Amazon Purchase",amount:214.30,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251008_1",date:"2025-10-08",desc:"HEB Grocery",amount:218.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251008_2",date:"2025-10-08",desc:"Starbucks Coffee",amount:21.75,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251010_1",date:"2025-10-10",desc:"Whole Foods Market",amount:182.40,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251010_2",date:"2025-10-10",desc:"Best Buy - Electronics",amount:456.80,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Best Buy",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251011_1",date:"2025-10-11",desc:"Shell Gas Station",amount:80.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251012_1",date:"2025-10-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251012_2",date:"2025-10-12",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251012_3",date:"2025-10-12",desc:"HBO Max Subscription",amount:15.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"HBO Max",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251012_4",date:"2025-10-12",desc:"Disney+ Subscription",amount:13.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Disney+",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251013_1",date:"2025-10-13",desc:"HEB Grocery",amount:215.23,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251013_2",date:"2025-10-13",desc:"LA Fitness Gym Membership",amount:89.99,sign:"debit",category:"want",subcategory:"Fitness",merchant:"LA Fitness",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251014_1",date:"2025-10-14",desc:"Starbucks Coffee",amount:19.60,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251015_1",date:"2025-10-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251015_2",date:"2025-10-15",desc:"Credit Card Payment",amount:350.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251015_3",date:"2025-10-15",desc:"AT&T Wireless",amount:195.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251016_1",date:"2025-10-16",desc:"Amazon Prime Subscription",amount:14.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251017_1",date:"2025-10-17",desc:"Texas Gas Service",amount:61.50,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Texas Gas Service",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251017_2",date:"2025-10-17",desc:"HEB Grocery",amount:226.90,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251018_1",date:"2025-10-18",desc:"Shell Gas Station",amount:77.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251019_1",date:"2025-10-19",desc:"Olive Garden",amount:103.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Olive Garden",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251020_1",date:"2025-10-20",desc:"Costco",amount:398.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Costco",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251020_2",date:"2025-10-20",desc:"AMC Theaters",amount:92.00,sign:"debit",category:"want",subcategory:"Entertainment",merchant:"AMC",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251021_1",date:"2025-10-21",desc:"Starbucks Coffee",amount:18.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251022_1",date:"2025-10-22",desc:"Student Loan Payment",amount:180.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Nelnet",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251023_1",date:"2025-10-23",desc:"HEB Grocery",amount:232.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251024_1",date:"2025-10-24",desc:"Amazon Purchase",amount:212.34,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251025_1",date:"2025-10-25",desc:"Shell Gas Station",amount:82.30,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251026_1",date:"2025-10-26",desc:"State Farm Insurance",amount:285.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251027_1",date:"2025-10-27",desc:"Starbucks Coffee",amount:20.15,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251027_2",date:"2025-10-27",desc:"Torchy's Tacos",amount:58.90,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Torchy's Tacos",accountId:"acc_chk_5724",confidence:0.98},
  ];
};

// JOHNSON FAMILY: "SAVING MODE" - Moderate income, low expenses (70-75% spending)
// Target: ~$5,250/month expenses from $7,000 income = 75% spending
// Distribution: ~50% Needs, ~20% Wants, ~30% Savings
const generateJohnsonTransactions = (): Transaction[] => {
  return [
    // August 2025 - Income: $7,000 (bi-weekly)
    {id:"t_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Johnson LLC",amount:3500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Johnson LLC",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250815_1",date:"2025-08-15",desc:"Payroll Deposit - Johnson LLC",amount:3500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Johnson LLC",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250802_1",date:"2025-08-02",desc:"Rent Payment - City Apartments",amount:1500.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"City Apartments",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250805_1",date:"2025-08-05",desc:"HEB Grocery",amount:250.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5725",confidence:0.98},
    {id:"t_20250810_1",date:"2025-08-10",desc:"Shell Gas Station",amount:60.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250812_1",date:"2025-08-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250815_2",date:"2025-08-15",desc:"Credit Card Payment",amount:500.00,sign:"debit",category:"saving",subcategory:"Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250820_1",date:"2025-08-20",desc:"Amazon Purchase",amount:120.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5725",confidence:0.98},
    {id:"t_20250825_1",date:"2025-08-25",desc:"HEB Grocery",amount:230.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5725",confidence:0.98},
    {id:"t_20250828_1",date:"2025-08-28",desc:"AT&T Wireless",amount:90.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250830_1",date:"2025-08-30",desc:"Starbucks Coffee",amount:25.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5725",confidence:0.98},

    // September 2025 - Income: $7,000
    {id:"t_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Johnson LLC",amount:3500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Johnson LLC",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250915_1",date:"2025-09-15",desc:"Payroll Deposit - Johnson LLC",amount:3500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Johnson LLC",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250902_1",date:"2025-09-02",desc:"Rent Payment - City Apartments",amount:1500.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"City Apartments",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250905_1",date:"2025-09-05",desc:"HEB Grocery",amount:260.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5725",confidence:0.98},
    {id:"t_20250910_1",date:"2025-09-10",desc:"Shell Gas Station",amount:65.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250912_1",date:"2025-09-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250915_2",date:"2025-09-15",desc:"Credit Card Payment",amount:500.00,sign:"debit",category:"saving",subcategory:"Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250920_1",date:"2025-09-20",desc:"Amazon Purchase",amount:130.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5725",confidence:0.98},
    {id:"t_20250925_1",date:"2025-09-25",desc:"HEB Grocery",amount:240.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5725",confidence:0.98},
    {id:"t_20250928_1",date:"2025-09-28",desc:"AT&T Wireless",amount:90.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20250930_1",date:"2025-09-30",desc:"Starbucks Coffee",amount:30.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5725",confidence:0.98},

    // October 2025 - Income: $7,000
    {id:"t_20251001_1",date:"2025-10-01",desc:"Payroll Deposit - Johnson LLC",amount:3500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Johnson LLC",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20251015_1",date:"2025-10-15",desc:"Payroll Deposit - Johnson LLC",amount:3500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Johnson LLC",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20251002_1",date:"2025-10-02",desc:"Rent Payment - City Apartments",amount:1500.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"City Apartments",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20251005_1",date:"2025-10-05",desc:"HEB Grocery",amount:255.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5725",confidence:0.98},
    {id:"t_20251010_1",date:"2025-10-10",desc:"Shell Gas Station",amount:62.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20251012_1",date:"2025-10-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20251015_2",date:"2025-10-15",desc:"Credit Card Payment",amount:500.00,sign:"debit",category:"saving",subcategory:"Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20251020_1",date:"2025-10-20",desc:"Amazon Purchase",amount:125.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5725",confidence:0.98},
    {id:"t_20251025_1",date:"2025-10-25",desc:"HEB Grocery",amount:235.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5725",confidence:0.98},
    {id:"t_20251028_1",date:"2025-10-28",desc:"AT&T Wireless",amount:90.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5725",confidence:0.99},
    {id:"t_20251030_1",date:"2025-10-30",desc:"Starbucks Coffee",amount:28.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5725",confidence:0.98},
  ];
};

// AUSTIN FAMILY: "BALANCED" - Moderate income, moderate expenses (80-85% spending)
// Target: ~$8,000/month expenses from $9,500 income = 84% spending
// Distribution: ~50% Needs, ~30% Wants, ~20% Savings
const generateAustinTransactions = (): Transaction[] => {
  return [
    // August 2025 - Income: $9,500 (bi-weekly + side gig)
    {id:"t_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Austin Corp",amount:4000.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Austin Corp",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250810_1",date:"2025-08-10",desc:"Side Gig Payment",amount:1500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Freelance",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250815_1",date:"2025-08-15",desc:"Payroll Deposit - Austin Corp",amount:4000.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Austin Corp",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250802_1",date:"2025-08-02",desc:"Mortgage Payment - Green Valley",amount:1800.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Green Valley",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250805_1",date:"2025-08-05",desc:"HEB Grocery",amount:300.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5726",confidence:0.98},
    {id:"t_20250810_2",date:"2025-08-10",desc:"Shell Gas Station",amount:70.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250812_1",date:"2025-08-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250815_2",date:"2025-08-15",desc:"Credit Card Payment",amount:400.00,sign:"debit",category:"saving",subcategory:"Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250820_1",date:"2025-08-20",desc:"Amazon Purchase",amount:180.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5726",confidence:0.98},
    {id:"t_20250825_1",date:"2025-08-25",desc:"HEB Grocery",amount:260.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5726",confidence:0.98},
    {id:"t_20250828_1",date:"2025-08-28",desc:"AT&T Wireless",amount:95.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250830_1",date:"2025-08-30",desc:"Starbucks Coffee",amount:35.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5726",confidence:0.98},

    // September 2025 - Income: $9,500
    {id:"t_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Austin Corp",amount:4000.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Austin Corp",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250910_1",date:"2025-09-10",desc:"Side Gig Payment",amount:1500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Freelance",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250915_1",date:"2025-09-15",desc:"Payroll Deposit - Austin Corp",amount:4000.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Austin Corp",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250902_1",date:"2025-09-02",desc:"Mortgage Payment - Green Valley",amount:1800.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Green Valley",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250905_1",date:"2025-09-05",desc:"HEB Grocery",amount:310.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5726",confidence:0.98},
    {id:"t_20250910_2",date:"2025-09-10",desc:"Shell Gas Station",amount:75.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250912_1",date:"2025-09-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250915_2",date:"2025-09-15",desc:"Credit Card Payment",amount:400.00,sign:"debit",category:"saving",subcategory:"Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250920_1",date:"2025-09-20",desc:"Amazon Purchase",amount:190.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5726",confidence:0.98},
    {id:"t_20250925_1",date:"2025-09-25",desc:"HEB Grocery",amount:270.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5726",confidence:0.98},
    {id:"t_20250928_1",date:"2025-09-28",desc:"AT&T Wireless",amount:95.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20250930_1",date:"2025-09-30",desc:"Starbucks Coffee",amount:38.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5726",confidence:0.98},

    // October 2025 - Income: $9,500
    {id:"t_20251001_1",date:"2025-10-01",desc:"Payroll Deposit - Austin Corp",amount:4000.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Austin Corp",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20251010_1",date:"2025-10-10",desc:"Side Gig Payment",amount:1500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Freelance",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20251015_1",date:"2025-10-15",desc:"Payroll Deposit - Austin Corp",amount:4000.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Austin Corp",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20251002_1",date:"2025-10-02",desc:"Mortgage Payment - Green Valley",amount:1800.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Green Valley",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20251005_1",date:"2025-10-05",desc:"HEB Grocery",amount:305.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5726",confidence:0.98},
    {id:"t_20251010_2",date:"2025-10-10",desc:"Shell Gas Station",amount:72.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20251012_1",date:"2025-10-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20251015_2",date:"2025-10-15",desc:"Credit Card Payment",amount:400.00,sign:"debit",category:"saving",subcategory:"Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20251020_1",date:"2025-10-20",desc:"Amazon Purchase",amount:185.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5726",confidence:0.98},
    {id:"t_20251025_1",date:"2025-10-25",desc:"HEB Grocery",amount:265.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5726",confidence:0.98},
    {id:"t_20251028_1",date:"2025-10-28",desc:"AT&T Wireless",amount:95.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5726",confidence:0.99},
    {id:"t_20251030_1",date:"2025-10-30",desc:"Starbucks Coffee",amount:36.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5726",confidence:0.98},
  ];
};

// PHOENIX FAMILY: "FRUGAL" - Low income, very low expenses (60-65% spending)
// Target: ~$3,000/month expenses from $4,500 income = 67% spending
// Distribution: ~50% Needs, ~15% Wants, ~35% Savings
const generatePhoenixTransactions = (): Transaction[] => {
  return [
    // August 2025 - Income: $4,500 (monthly)
    {id:"t_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Phoenix Inc",amount:4500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Phoenix Inc",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250802_1",date:"2025-08-02",desc:"Rent Payment - Oak Apartments",amount:1200.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Oak Apartments",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250805_1",date:"2025-08-05",desc:"HEB Grocery",amount:180.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5727",confidence:0.98},
    {id:"t_20250810_1",date:"2025-08-10",desc:"Shell Gas Station",amount:50.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250812_1",date:"2025-08-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250815_1",date:"2025-08-15",desc:"Credit Card Payment",amount:300.00,sign:"debit",category:"saving",subcategory:"Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250820_1",date:"2025-08-20",desc:"Amazon Purchase",amount:80.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5727",confidence:0.98},
    {id:"t_20250825_1",date:"2025-08-25",desc:"HEB Grocery",amount:190.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5727",confidence:0.98},
    {id:"t_20250828_1",date:"2025-08-28",desc:"AT&T Wireless",amount:80.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250830_1",date:"2025-08-30",desc:"Starbucks Coffee",amount:15.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5727",confidence:0.98},

    // September 2025 - Income: $4,500
    {id:"t_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Phoenix Inc",amount:4500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Phoenix Inc",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250902_1",date:"2025-09-02",desc:"Rent Payment - Oak Apartments",amount:1200.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Oak Apartments",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250905_1",date:"2025-09-05",desc:"HEB Grocery",amount:185.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5727",confidence:0.98},
    {id:"t_20250910_1",date:"2025-09-10",desc:"Shell Gas Station",amount:55.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250912_1",date:"2025-09-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250915_1",date:"2025-09-15",desc:"Credit Card Payment",amount:300.00,sign:"debit",category:"saving",subcategory:"Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250920_1",date:"2025-09-20",desc:"Amazon Purchase",amount:85.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5727",confidence:0.98},
    {id:"t_20250925_1",date:"2025-09-25",desc:"HEB Grocery",amount:195.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5727",confidence:0.98},
    {id:"t_20250928_1",date:"2025-09-28",desc:"AT&T Wireless",amount:80.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20250930_1",date:"2025-09-30",desc:"Starbucks Coffee",amount:18.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5727",confidence:0.98},

    // October 2025 - Income: $4,500
    {id:"t_20251001_1",date:"2025-10-01",desc:"Payroll Deposit - Phoenix Inc",amount:4500.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Phoenix Inc",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20251002_1",date:"2025-10-02",desc:"Rent Payment - Oak Apartments",amount:1200.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"Oak Apartments",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20251005_1",date:"2025-10-05",desc:"HEB Grocery",amount:190.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5727",confidence:0.98},
    {id:"t_20251010_1",date:"2025-10-10",desc:"Shell Gas Station",amount:52.00,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20251012_1",date:"2025-10-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20251015_1",date:"2025-10-15",desc:"Credit Card Payment",amount:300.00,sign:"debit",category:"saving",subcategory:"Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20251020_1",date:"2025-10-20",desc:"Amazon Purchase",amount:90.00,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5727",confidence:0.98},
    {id:"t_20251025_1",date:"2025-10-25",desc:"HEB Grocery",amount:185.00,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5727",confidence:0.98},
    {id:"t_20251028_1",date:"2025-10-28",desc:"AT&T Wireless",amount:80.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5727",confidence:0.99},
    {id:"t_20251030_1",date:"2025-10-30",desc:"Starbucks Coffee",amount:16.00,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5727",confidence:0.98},
  ];
};

// Snapshot data for the Reynolds family (example)
const SAMPLE_REYNOLDS_DATA: FinancialSnapshot = {
  id: "snapshot_reynolds_2025",
  userId: "user_reynolds",
  createdAt: "2025-11-01T00:00:00Z",
  analyzedPeriod: {
    totalMonths: 3,
    startDate: "2025-08-01",
    endDate: "2025-10-31"
  },
  transactions: generateReynoldsTransactions().map(toStagingTransaction),
  accounts: [
    {
      id: "acc_chk_5724",
      name: "Checking Account",
      type: "checking",
      balance: 5000,
      institution: "Bank of America"
    }
  ],
  goals: [],
  investments: [],
  paperTradingProgress: {} as PaperTradingProgress
};

// Snapshot data for the Johnson family (example)
const SAMPLE_JOHNSON_DATA: FinancialSnapshot = {
  id: "snapshot_johnson_2025",
  userId: "user_johnson",
  createdAt: "2025-11-01T00:00:00Z",
  analyzedPeriod: {
    totalMonths: 3,
    startDate: "2025-08-01",
    endDate: "2025-10-31"
  },
  transactions: generateJohnsonTransactions().map(toStagingTransaction),
  accounts: [
    {
      id: "acc_chk_5725",
      name: "Checking Account",
      type: "checking",
      balance: 3000,
      institution: "Chase"
    }
  ],
  goals: [],
  investments: [],
  paperTradingProgress: {} as PaperTradingProgress
};

// Snapshot data for the Austin family (example)
const SAMPLE_AUSTIN_DATA: FinancialSnapshot = {
  id: "snapshot_austin_2025",
  userId: "user_austin",
  createdAt: "2025-11-01T00:00:00Z",
  analyzedPeriod: {
    totalMonths: 3,
    startDate: "2025-08-01",
    endDate: "2025-10-31"
  },
  transactions: generateAustinTransactions().map(toStagingTransaction),
  accounts: [
    {
      id: "acc_chk_5726",
      name: "Checking Account",
      type: "checking",
      balance: 4000,
      institution: "Wells Fargo"
    }
  ],
  goals: [],
  investments: [],
  paperTradingProgress: {} as PaperTradingProgress
};

// Snapshot data for the Phoenix family (example)
const SAMPLE_PHOENIX_DATA: FinancialSnapshot = {
  id: "snapshot_phoenix_2025",
  userId: "user_phoenix",
  createdAt: "2025-11-01T00:00:00Z",
  analyzedPeriod: {
    totalMonths: 3,
    startDate: "2025-08-01",
    endDate: "2025-10-31"
  },
  transactions: generatePhoenixTransactions().map(toStagingTransaction),
  accounts: [
    {
      id: "acc_chk_5727",
      name: "Checking Account",
      type: "checking",
      balance: 2000,
      institution: "Capital One"
    }
  ],
  goals: [],
  investments: [],
  paperTradingProgress: {} as PaperTradingProgress
};

export {
  generateReynoldsTransactions,
  generateJohnsonTransactions,
  generateAustinTransactions,
  generatePhoenixTransactions,
  SAMPLE_REYNOLDS_DATA,
  SAMPLE_JOHNSON_DATA,
  SAMPLE_AUSTIN_DATA,
  SAMPLE_PHOENIX_DATA
};
