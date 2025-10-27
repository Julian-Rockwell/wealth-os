import type { FinancialSnapshot } from "@/types/financial";
import type { Transaction } from "@/types/dashboard";

// Generate realistic mock transactions for August-October 2025 based on typical family spending
const generateSampleTransactions = (): Transaction[] => {
  return [
    // August 2025
    {id:"t_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250802_1",date:"2025-08-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250802_2",date:"2025-08-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250803_1",date:"2025-08-03",desc:"HEB Grocery",amount:187.43,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250803_2",date:"2025-08-03",desc:"Starbucks Coffee",amount:8.45,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250804_1",date:"2025-08-04",desc:"Shell Gas Station",amount:68.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250805_1",date:"2025-08-05",desc:"Austin Energy",amount:245.80,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250806_1",date:"2025-08-06",desc:"HEB Grocery",amount:124.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250806_2",date:"2025-08-06",desc:"Starbucks Coffee",amount:11.20,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250807_1",date:"2025-08-07",desc:"Austin Water Utility",amount:78.50,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250808_1",date:"2025-08-08",desc:"Target",amount:93.25,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250809_1",date:"2025-08-09",desc:"Chipotle Mexican Grill",amount:24.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chipotle",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250810_1",date:"2025-08-10",desc:"HEB Grocery",amount:203.15,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250810_2",date:"2025-08-10",desc:"Starbucks Coffee",amount:9.75,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250811_1",date:"2025-08-11",desc:"Shell Gas Station",amount:72.15,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250812_1",date:"2025-08-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250813_1",date:"2025-08-13",desc:"Whole Foods Market",amount:87.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250814_1",date:"2025-08-14",desc:"CVS Pharmacy",amount:34.99,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"CVS",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250815_1",date:"2025-08-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
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

    // September 2025
    {id:"t_20250901_1",date:"2025-09-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250902_1",date:"2025-09-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250902_2",date:"2025-09-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250903_1",date:"2025-09-03",desc:"HEB Grocery",amount:195.67,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250903_2",date:"2025-09-03",desc:"Starbucks Coffee",amount:9.85,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250904_1",date:"2025-09-04",desc:"Torchy's Tacos",amount:45.80,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Torchy's Tacos",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250905_1",date:"2025-09-05",desc:"Austin Energy",amount:312.45,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250906_1",date:"2025-09-06",desc:"Target",amount:156.23,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250907_1",date:"2025-09-07",desc:"Austin Water Utility",amount:82.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250907_2",date:"2025-09-07",desc:"Shell Gas Station",amount:71.20,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250908_1",date:"2025-09-08",desc:"HEB Grocery",amount:210.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250909_1",date:"2025-09-09",desc:"Starbucks Coffee",amount:11.50,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250910_1",date:"2025-09-10",desc:"Walgreens",amount:45.67,sign:"debit",category:"need",subcategory:"Healthcare",merchant:"Walgreens",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250912_1",date:"2025-09-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250912_2",date:"2025-09-12",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250913_1",date:"2025-09-13",desc:"HEB Grocery",amount:167.89,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250914_1",date:"2025-09-14",desc:"Shell Gas Station",amount:68.90,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250915_1",date:"2025-09-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250915_2",date:"2025-09-15",desc:"Credit Card Payment",amount:250.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Chase Credit Card",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250915_3",date:"2025-09-15",desc:"AT&T Wireless",amount:185.00,sign:"debit",category:"need",subcategory:"Utilities",merchant:"AT&T",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250916_1",date:"2025-09-16",desc:"Starbucks Coffee",amount:8.95,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250917_1",date:"2025-09-17",desc:"Texas Gas Service",amount:38.75,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Texas Gas Service",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250917_2",date:"2025-09-17",desc:"HEB Grocery",amount:183.45,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250918_1",date:"2025-09-18",desc:"AMC Theaters",amount:56.00,sign:"debit",category:"want",subcategory:"Entertainment",merchant:"AMC",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250920_1",date:"2025-09-20",desc:"Costco",amount:287.92,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Costco",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250921_1",date:"2025-09-21",desc:"Shell Gas Station",amount:73.15,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250922_1",date:"2025-09-22",desc:"Student Loan Payment",amount:180.00,sign:"debit",category:"saving",subcategory:"Extra Debt Payment",merchant:"Nelnet",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250923_1",date:"2025-09-23",desc:"HEB Grocery",amount:189.23,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250924_1",date:"2025-09-24",desc:"Starbucks Coffee",amount:12.40,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250925_1",date:"2025-09-25",desc:"Amazon Purchase",amount:67.89,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Amazon",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250926_1",date:"2025-09-26",desc:"State Farm Insurance",amount:275.00,sign:"debit",category:"need",subcategory:"Insurance",merchant:"State Farm",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250927_1",date:"2025-09-27",desc:"HEB Grocery",amount:201.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20250928_1",date:"2025-09-28",desc:"Shell Gas Station",amount:69.25,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20250930_1",date:"2025-09-30",desc:"Chili's Grill & Bar",amount:64.30,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Chili's",accountId:"acc_chk_5724",confidence:0.98},

    // October 2025
    {id:"t_20251001_1",date:"2025-10-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251002_1",date:"2025-10-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit",category:"need",subcategory:"Rent/Mortgage",merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251002_2",date:"2025-10-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Chase Auto",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251003_1",date:"2025-10-03",desc:"HEB Grocery",amount:201.34,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251004_1",date:"2025-10-04",desc:"Shell Gas Station",amount:74.80,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251005_1",date:"2025-10-05",desc:"Austin Energy",amount:298.30,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Energy",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251005_2",date:"2025-10-05",desc:"Starbucks Coffee",amount:9.25,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251006_1",date:"2025-10-06",desc:"Target",amount:143.78,sign:"debit",category:"want",subcategory:"Shopping",merchant:"Target",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251007_1",date:"2025-10-07",desc:"Austin Water Utility",amount:76.90,sign:"debit",category:"need",subcategory:"Utilities",merchant:"Austin Water",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251008_1",date:"2025-10-08",desc:"HEB Grocery",amount:198.56,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251008_2",date:"2025-10-08",desc:"Starbucks Coffee",amount:11.75,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251010_1",date:"2025-10-10",desc:"Whole Foods Market",amount:112.40,sign:"debit",category:"need",subcategory:"Groceries",merchant:"Whole Foods",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251011_1",date:"2025-10-11",desc:"Shell Gas Station",amount:70.45,sign:"debit",category:"need",subcategory:"Transportation",merchant:"Shell",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251012_1",date:"2025-10-12",desc:"Netflix Subscription",amount:15.49,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Netflix",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251012_2",date:"2025-10-12",desc:"Spotify Premium",amount:10.99,sign:"debit",category:"want",subcategory:"Subscriptions",merchant:"Spotify",accountId:"acc_chk_5724",confidence:0.99},
    {id:"t_20251013_1",date:"2025-10-13",desc:"HEB Grocery",amount:175.23,sign:"debit",category:"need",subcategory:"Groceries",merchant:"HEB",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251014_1",date:"2025-10-14",desc:"Starbucks Coffee",amount:10.60,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98},
    {id:"t_20251015_1",date:"2025-10-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit",category:"need",subcategory:"Income",merchant:"Acme Corp",accountId:"acc_chk_5724",confidence:0.99},
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
    {id:"t_20251027_1",date:"2025-10-27",desc:"Starbucks Coffee",amount:10.15,sign:"debit",category:"want",subcategory:"Dining Out",merchant:"Starbucks",accountId:"acc_chk_5724",confidence:0.98}
  ];
};

const totalAssets = 40799.20 + 25000.00 + 90000.00 + 120000.00 + 43000.00 + 820000.00 + 24000.00; // 1,162,799.20
const totalLiabilities = 510000.00 + 18900.00 + 7800.00 + 12400.00; // 549,100.00
const netWorth = totalAssets - totalLiabilities; // 613,699.20

export const SAMPLE_REYNOLDS_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-08-01",
    endDate: "2025-10-27",
    totalMonths: 3
  },
  accounts: [
    {id:"acc_chk_5724",name:"Chase Private Client Checking •••5724",type:"checking",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_svg_001",name:"Chase Savings — Emergency Fund",type:"savings",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_brg_vaa",name:"Vanguard Brokerage (Taxable)",type:"brokerage",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_401k_fid",name:"Fidelity 401(k) — James",type:"401k",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_ira_roth",name:"Vanguard Roth IRA — Emily",type:"IRA",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_real_home",name:"Primary Residence — Austin, TX",type:"real_estate",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_vehicle_1",name:"2019 Toyota Highlander",type:"vehicle",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"},
    {id:"acc_cc_chase",name:"Chase Credit Card",type:"credit_card",providerStatus:"connected",lastSync:"2025-09-01T10:00:00Z"}
  ],
  holdings: [
    {id:"h_chk",accountId:"acc_chk_5724",name:"Checking Balance",accountType:"checking",assetClass:"cash",liquidity:"liquid",balance:40799.20,currency:"USD",source:"mock"},
    {id:"h_svg",accountId:"acc_svg_001",name:"Emergency Savings",accountType:"savings",assetClass:"cash",liquidity:"liquid",balance:25000.00,currency:"USD",source:"mock"},
    {id:"h_brg",accountId:"acc_brg_vaa",name:"Vanguard Taxable",accountType:"brokerage",assetClass:"stocks",liquidity:"semi_liquid",balance:90000.00,currency:"USD",source:"mock"},
    {id:"h_401k",accountId:"acc_401k_fid",name:"Fidelity 401(k)",accountType:"401k",assetClass:"stocks",liquidity:"illiquid",balance:120000.00,currency:"USD",source:"mock"},
    {id:"h_roth",accountId:"acc_ira_roth",name:"Roth IRA",accountType:"IRA",assetClass:"stocks",liquidity:"illiquid",balance:43000.00,currency:"USD",source:"mock"},
    {id:"h_home",accountId:"acc_real_home",name:"Home Valuation (Zillow)",accountType:"real_estate",assetClass:"real_estate",liquidity:"illiquid",balance:820000.00,currency:"USD",source:"mock"},
    {id:"h_vehicle",accountId:"acc_vehicle_1",name:"Vehicle Value (KBB)",accountType:"vehicle",assetClass:"other",liquidity:"semi_liquid",balance:24000.00,currency:"USD",source:"mock"}
  ],
  liabilities: [
    {id:"l_mort",accountId:"acc_real_home",name:"FirstHome Mortgage",type:"mortgage",apr:4.25,balance:510000.00,monthlyPayment:3650.00,remainingTermMonths:325,notes:"FirstHome Mortgage"},
    {id:"l_auto",accountId:"acc_vehicle_1",name:"Chase Auto Loan",type:"auto",apr:5.9,balance:18900.00,monthlyPayment:540.12,remainingTermMonths:42,notes:"Chase Auto"},
    {id:"l_cc",accountId:"acc_cc_chase",name:"Chase Credit Card",type:"credit_card",apr:22.99,balance:7800.00,monthlyPayment:250.00,remainingTermMonths:0,notes:"High priority"},
    {id:"l_student",accountId:"acc_chk_5724",name:"Student Loan",type:"student",apr:4.9,balance:12400.00,monthlyPayment:180.00,remainingTermMonths:96,notes:"Nelnet"}
  ],
  trends: {
    d30:{abs:-9.48,pct:-0.02},
    d60:{abs:-732.88,pct:-0.18},
    d90:{abs:-4741.88,pct:-1.12},
    series12m:[745000,748000,751000,752500,753000,755000,757000,760000,762000,765000,768000,770000]
  },
  stagingTxns: [],
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
    assets: totalAssets,
    liabilities: totalLiabilities,
    net: netWorth
  },
  uiFlags: {
    reviewedIn11: true,
    readyFor12: true
  }
};

// Export mock transactions as DashboardData
export const SAMPLE_DASHBOARD_DATA = {
  period: {
    start: "2025-08-01",
    end: "2025-10-27",
    months: 3
  },
  txns: generateSampleTransactions()
};
