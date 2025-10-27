import type { FinancialSnapshot, StagingTransaction } from "@/types/financial";

// Generate realistic mock transactions for June-August 2025 based on typical family spending
const generateSampleTransactions = (): StagingTransaction[] => {
  return [
    // June 2025
    {id:"t_20250601_1",date:"2025-06-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250602_1",date:"2025-06-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit" as const,merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250602_2",date:"2025-06-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit" as const,merchant:"Chase Auto",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250603_1",date:"2025-06-03",desc:"HEB Grocery",amount:187.43,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250603_2",date:"2025-06-03",desc:"Starbucks Coffee",amount:8.45,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250604_1",date:"2025-06-04",desc:"Shell Gas Station",amount:68.20,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250005_1",date:"2025-06-05",desc:"Austin Energy",amount:245.80,sign:"debit" as const,merchant:"Austin Energy",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250006_1",date:"2025-06-06",desc:"HEB Grocery",amount:124.56,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250006_2",date:"2025-06-06",desc:"Starbucks Coffee",amount:11.20,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250007_1",date:"2025-06-07",desc:"Austin Water Utility",amount:78.50,sign:"debit" as const,merchant:"Austin Water",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250008_1",date:"2025-06-08",desc:"Target",amount:93.25,sign:"debit" as const,merchant:"Target",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250009_1",date:"2025-06-09",desc:"Chipotle Mexican Grill",amount:24.80,sign:"debit" as const,merchant:"Chipotle",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250010_1",date:"2025-06-10",desc:"HEB Grocery",amount:203.15,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250010_2",date:"2025-06-10",desc:"Starbucks Coffee",amount:9.75,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250011_1",date:"2025-06-11",desc:"Shell Gas Station",amount:72.15,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250012_1",date:"2025-06-12",desc:"Netflix Subscription",amount:15.49,sign:"debit" as const,merchant:"Netflix",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250013_1",date:"2025-06-13",desc:"Whole Foods Market",amount:87.34,sign:"debit" as const,merchant:"Whole Foods",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250014_1",date:"2025-06-14",desc:"CVS Pharmacy",amount:34.99,sign:"debit" as const,merchant:"CVS",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250015_1",date:"2025-06-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250015_2",date:"2025-06-15",desc:"Credit Card Payment",amount:250.00,sign:"debit" as const,merchant:"Chase Credit Card",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250015_3",date:"2025-06-15",desc:"AT&T Wireless",amount:185.00,sign:"debit" as const,merchant:"AT&T",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250016_1",date:"2025-06-16",desc:"HEB Grocery",amount:156.89,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250017_1",date:"2025-06-17",desc:"Texas Gas Service",amount:45.20,sign:"debit" as const,merchant:"Texas Gas Service",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250018_1",date:"2025-06-18",desc:"Shell Gas Station",amount:65.30,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250018_2",date:"2025-06-18",desc:"Starbucks Coffee",amount:7.95,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250019_1",date:"2025-06-19",desc:"Costco",amount:312.45,sign:"debit" as const,merchant:"Costco",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250020_1",date:"2025-06-20",desc:"P.F. Chang's",amount:87.60,sign:"debit" as const,merchant:"P.F. Chang's",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250022_1",date:"2025-06-22",desc:"Student Loan Payment",amount:180.00,sign:"debit" as const,merchant:"Nelnet",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250023_1",date:"2025-06-23",desc:"HEB Grocery",amount:178.23,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250024_1",date:"2025-06-24",desc:"Amazon Purchase",amount:89.99,sign:"debit" as const,merchant:"Amazon",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250025_1",date:"2025-06-25",desc:"Shell Gas Station",amount:70.45,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250025_2",date:"2025-06-25",desc:"Starbucks Coffee",amount:10.30,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250026_1",date:"2025-06-26",desc:"State Farm Insurance",amount:275.00,sign:"debit" as const,merchant:"State Farm",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250027_1",date:"2025-06-27",desc:"HEB Grocery",amount:145.67,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250028_1",date:"2025-06-28",desc:"Home Depot",amount:127.89,sign:"debit" as const,merchant:"Home Depot",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250029_1",date:"2025-06-29",desc:"Panera Bread",amount:28.45,sign:"debit" as const,merchant:"Panera Bread",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},

    // July 2025
    {id:"t_20250701_1",date:"2025-07-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250702_1",date:"2025-07-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit" as const,merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250702_2",date:"2025-07-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit" as const,merchant:"Chase Auto",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250703_1",date:"2025-07-03",desc:"HEB Grocery",amount:195.67,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250703_2",date:"2025-07-03",desc:"Starbucks Coffee",amount:9.85,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250704_1",date:"2025-07-04",desc:"Salt Lick BBQ - July 4th",amount:145.80,sign:"debit" as const,merchant:"Salt Lick BBQ",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250005_1",date:"2025-07-05",desc:"Austin Energy",amount:312.45,sign:"debit" as const,merchant:"Austin Energy",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250006_1",date:"2025-07-06",desc:"Target",amount:156.23,sign:"debit" as const,merchant:"Target",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250007_1",date:"2025-07-07",desc:"Austin Water Utility",amount:82.30,sign:"debit" as const,merchant:"Austin Water",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250007_2",date:"2025-07-07",desc:"Shell Gas Station",amount:71.20,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250008_1",date:"2025-07-08",desc:"HEB Grocery",amount:210.45,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250009_1",date:"2025-07-09",desc:"Starbucks Coffee",amount:11.50,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250010_1",date:"2025-07-10",desc:"Walgreens",amount:45.67,sign:"debit" as const,merchant:"Walgreens",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250012_1",date:"2025-07-12",desc:"Netflix Subscription",amount:15.49,sign:"debit" as const,merchant:"Netflix",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250012_2",date:"2025-07-12",desc:"Spotify Premium",amount:10.99,sign:"debit" as const,merchant:"Spotify",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250013_1",date:"2025-07-13",desc:"HEB Grocery",amount:167.89,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250014_1",date:"2025-07-14",desc:"Shell Gas Station",amount:68.90,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250015_1",date:"2025-07-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250015_2",date:"2025-07-15",desc:"Credit Card Payment",amount:250.00,sign:"debit" as const,merchant:"Chase Credit Card",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250015_3",date:"2025-07-15",desc:"AT&T Wireless",amount:185.00,sign:"debit" as const,merchant:"AT&T",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250016_1",date:"2025-07-16",desc:"Starbucks Coffee",amount:8.95,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250017_1",date:"2025-07-17",desc:"Texas Gas Service",amount:38.75,sign:"debit" as const,merchant:"Texas Gas Service",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250017_2",date:"2025-07-17",desc:"HEB Grocery",amount:183.45,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250018_1",date:"2025-07-18",desc:"AMC Theaters",amount:56.00,sign:"debit" as const,merchant:"AMC",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250020_1",date:"2025-07-20",desc:"Costco",amount:287.92,sign:"debit" as const,merchant:"Costco",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250021_1",date:"2025-07-21",desc:"Shell Gas Station",amount:73.15,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250022_1",date:"2025-07-22",desc:"Student Loan Payment",amount:180.00,sign:"debit" as const,merchant:"Nelnet",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250023_1",date:"2025-07-23",desc:"HEB Grocery",amount:189.23,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250024_1",date:"2025-07-24",desc:"Starbucks Coffee",amount:12.40,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250025_1",date:"2025-07-25",desc:"Amazon Purchase",amount:67.89,sign:"debit" as const,merchant:"Amazon",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250026_1",date:"2025-07-26",desc:"State Farm Insurance",amount:275.00,sign:"debit" as const,merchant:"State Farm",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250027_1",date:"2025-07-27",desc:"HEB Grocery",amount:201.56,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250028_1",date:"2025-07-28",desc:"Shell Gas Station",amount:69.25,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250030_1",date:"2025-07-30",desc:"Chili's Grill & Bar",amount:64.30,sign:"debit" as const,merchant:"Chili's",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},

    // August 2025
    {id:"t_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250802_1",date:"2025-08-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit" as const,merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250802_2",date:"2025-08-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit" as const,merchant:"Chase Auto",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250803_1",date:"2025-08-03",desc:"HEB Grocery",amount:201.34,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250804_1",date:"2025-08-04",desc:"Shell Gas Station",amount:74.80,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250805_1",date:"2025-08-05",desc:"Austin Energy",amount:298.30,sign:"debit" as const,merchant:"Austin Energy",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250005_2",date:"2025-08-05",desc:"Starbucks Coffee",amount:9.25,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250806_1",date:"2025-08-06",desc:"Target",amount:143.78,sign:"debit" as const,merchant:"Target",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250007_1",date:"2025-08-07",desc:"Austin Water Utility",amount:76.90,sign:"debit" as const,merchant:"Austin Water",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250008_1",date:"2025-08-08",desc:"HEB Grocery",amount:198.56,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250008_2",date:"2025-08-08",desc:"Starbucks Coffee",amount:11.75,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250010_1",date:"2025-08-10",desc:"Whole Foods Market",amount:112.40,sign:"debit" as const,merchant:"Whole Foods",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250011_1",date:"2025-08-11",desc:"Shell Gas Station",amount:70.45,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250012_1",date:"2025-08-12",desc:"Netflix Subscription",amount:15.49,sign:"debit" as const,merchant:"Netflix",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250012_2",date:"2025-08-12",desc:"Spotify Premium",amount:10.99,sign:"debit" as const,merchant:"Spotify",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250013_1",date:"2025-08-13",desc:"HEB Grocery",amount:175.23,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250014_1",date:"2025-08-14",desc:"Starbucks Coffee",amount:10.60,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250015_1",date:"2025-08-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250015_2",date:"2025-08-15",desc:"Credit Card Payment",amount:250.00,sign:"debit" as const,merchant:"Chase Credit Card",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250015_3",date:"2025-08-15",desc:"AT&T Wireless",amount:185.00,sign:"debit" as const,merchant:"AT&T",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250017_1",date:"2025-08-17",desc:"Texas Gas Service",amount:41.50,sign:"debit" as const,merchant:"Texas Gas Service",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250017_2",date:"2025-08-17",desc:"HEB Grocery",amount:186.90,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250018_1",date:"2025-08-18",desc:"Shell Gas Station",amount:67.90,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250019_1",date:"2025-08-19",desc:"Olive Garden",amount:73.50,sign:"debit" as const,merchant:"Olive Garden",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250020_1",date:"2025-08-20",desc:"Costco",amount:298.45,sign:"debit" as const,merchant:"Costco",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250021_1",date:"2025-08-21",desc:"Starbucks Coffee",amount:8.80,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250022_1",date:"2025-08-22",desc:"Student Loan Payment",amount:180.00,sign:"debit" as const,merchant:"Nelnet",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250023_1",date:"2025-08-23",desc:"HEB Grocery",amount:192.67,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250024_1",date:"2025-08-24",desc:"Amazon Purchase",amount:112.34,sign:"debit" as const,merchant:"Amazon",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250025_1",date:"2025-08-25",desc:"Shell Gas Station",amount:72.30,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250026_1",date:"2025-08-26",desc:"State Farm Insurance",amount:275.00,sign:"debit" as const,merchant:"State Farm",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250027_1",date:"2025-08-27",desc:"Starbucks Coffee",amount:10.15,sign:"debit" as const,merchant:"Starbucks",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250028_1",date:"2025-08-28",desc:"HEB Grocery",amount:178.45,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250029_1",date:"2025-08-29",desc:"Lowe's",amount:89.99,sign:"debit" as const,merchant:"Lowe's",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250030_1",date:"2025-08-30",desc:"Panera Bread",amount:31.20,sign:"debit" as const,merchant:"Panera Bread",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98}
  ];
};

const totalAssets = 40799.20 + 25000.00 + 90000.00 + 120000.00 + 43000.00 + 820000.00 + 24000.00; // 1,162,799.20
const totalLiabilities = 510000.00 + 18900.00 + 7800.00 + 12400.00; // 549,100.00
const netWorth = totalAssets - totalLiabilities; // 613,699.20

export const SAMPLE_REYNOLDS_DATA: FinancialSnapshot = {
  analyzedPeriod: {
    startDate: "2025-06-01",
    endDate: "2025-08-31",
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
  stagingTxns: generateSampleTransactions(),
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
