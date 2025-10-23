import type { FinancialSnapshot, StagingTransaction } from "@/types/financial";

// Generate mock transactions for June-August 2025 based on typical family spending
const generateSampleTransactions = (): StagingTransaction[] => {
  return [
    // June 2025
    {id:"t_20250601_1",date:"2025-06-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250602_1",date:"2025-06-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit" as const,merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250602_2",date:"2025-06-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit" as const,merchant:"Chase Auto",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250603_1",date:"2025-06-03",desc:"HEB Grocery",amount:187.43,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250605_1",date:"2025-06-05",desc:"Shell Gas Station",amount:68.20,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250607_1",date:"2025-06-07",desc:"Austin Energy",amount:245.80,sign:"debit" as const,merchant:"Austin Energy",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250608_1",date:"2025-06-08",desc:"Target",amount:124.56,sign:"debit" as const,merchant:"Target",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250610_1",date:"2025-06-10",desc:"HEB Grocery",amount:203.15,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250612_1",date:"2025-06-12",desc:"Netflix Subscription",amount:15.49,sign:"debit" as const,merchant:"Netflix",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250613_1",date:"2025-06-13",desc:"Shell Gas Station",amount:72.15,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250615_1",date:"2025-06-15",desc:"Credit Card Payment",amount:250.00,sign:"debit" as const,merchant:"Chase Credit Card",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250615_2",date:"2025-06-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250617_1",date:"2025-06-17",desc:"HEB Grocery",amount:156.89,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250618_1",date:"2025-06-18",desc:"AT&T Wireless",amount:185.00,sign:"debit" as const,merchant:"AT&T",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250620_1",date:"2025-06-20",desc:"Costco",amount:312.45,sign:"debit" as const,merchant:"Costco",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250621_1",date:"2025-06-21",desc:"Shell Gas Station",amount:65.30,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250622_1",date:"2025-06-22",desc:"Student Loan Payment",amount:180.00,sign:"debit" as const,merchant:"Nelnet",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250624_1",date:"2025-06-24",desc:"HEB Grocery",amount:178.23,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250626_1",date:"2025-06-26",desc:"Amazon Purchase",amount:89.99,sign:"debit" as const,merchant:"Amazon",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250628_1",date:"2025-06-28",desc:"Whole Foods",amount:92.34,sign:"debit" as const,merchant:"Whole Foods",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250630_1",date:"2025-06-30",desc:"Shell Gas Station",amount:70.45,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},

    // July 2025
    {id:"t_20250701_1",date:"2025-07-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250702_1",date:"2025-07-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit" as const,merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250702_2",date:"2025-07-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit" as const,merchant:"Chase Auto",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250703_1",date:"2025-07-03",desc:"HEB Grocery",amount:195.67,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250704_1",date:"2025-07-04",desc:"BBQ Restaurant - July 4th",amount:145.80,sign:"debit" as const,merchant:"Salt Lick BBQ",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250705_1",date:"2025-07-05",desc:"Shell Gas Station",amount:71.20,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250707_1",date:"2025-07-07",desc:"Austin Energy",amount:312.45,sign:"debit" as const,merchant:"Austin Energy",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250708_1",date:"2025-07-08",desc:"Target",amount:156.23,sign:"debit" as const,merchant:"Target",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250710_1",date:"2025-07-10",desc:"HEB Grocery",amount:210.45,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250712_1",date:"2025-07-12",desc:"Netflix Subscription",amount:15.49,sign:"debit" as const,merchant:"Netflix",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250713_1",date:"2025-07-13",desc:"Shell Gas Station",amount:68.90,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250715_1",date:"2025-07-15",desc:"Credit Card Payment",amount:250.00,sign:"debit" as const,merchant:"Chase Credit Card",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250715_2",date:"2025-07-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250717_1",date:"2025-07-17",desc:"HEB Grocery",amount:183.45,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250718_1",date:"2025-07-18",desc:"AT&T Wireless",amount:185.00,sign:"debit" as const,merchant:"AT&T",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250720_1",date:"2025-07-20",desc:"Costco",amount:287.92,sign:"debit" as const,merchant:"Costco",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250721_1",date:"2025-07-21",desc:"Shell Gas Station",amount:73.15,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250722_1",date:"2025-07-22",desc:"Student Loan Payment",amount:180.00,sign:"debit" as const,merchant:"Nelnet",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250724_1",date:"2025-07-24",desc:"HEB Grocery",amount:167.89,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250725_1",date:"2025-07-25",desc:"Home Depot",amount:234.56,sign:"debit" as const,merchant:"Home Depot",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250727_1",date:"2025-07-27",desc:"Amazon Purchase",amount:67.89,sign:"debit" as const,merchant:"Amazon",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250729_1",date:"2025-07-29",desc:"Shell Gas Station",amount:69.25,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250731_1",date:"2025-07-31",desc:"HEB Grocery",amount:189.12,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},

    // August 2025
    {id:"t_20250801_1",date:"2025-08-01",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250802_1",date:"2025-08-02",desc:"Mortgage Payment - FirstHome Mortgage",amount:3650.00,sign:"debit" as const,merchant:"FirstHome Mortgage",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250802_2",date:"2025-08-02",desc:"Auto Loan Payment",amount:540.12,sign:"debit" as const,merchant:"Chase Auto",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250803_1",date:"2025-08-03",desc:"HEB Grocery",amount:201.34,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250805_1",date:"2025-08-05",desc:"Shell Gas Station",amount:74.80,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250807_1",date:"2025-08-07",desc:"Austin Energy",amount:298.30,sign:"debit" as const,merchant:"Austin Energy",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250808_1",date:"2025-08-08",desc:"Target",amount:143.78,sign:"debit" as const,merchant:"Target",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250810_1",date:"2025-08-10",desc:"HEB Grocery",amount:198.56,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250812_1",date:"2025-08-12",desc:"Netflix Subscription",amount:15.49,sign:"debit" as const,merchant:"Netflix",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250813_1",date:"2025-08-13",desc:"Shell Gas Station",amount:70.45,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250815_1",date:"2025-08-15",desc:"Credit Card Payment",amount:250.00,sign:"debit" as const,merchant:"Chase Credit Card",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250815_2",date:"2025-08-15",desc:"Payroll Deposit - Acme Corp W-2",amount:12150.00,sign:"credit" as const,merchant:"Acme Corp",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250817_1",date:"2025-08-17",desc:"HEB Grocery",amount:175.23,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250818_1",date:"2025-08-18",desc:"AT&T Wireless",amount:185.00,sign:"debit" as const,merchant:"AT&T",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250820_1",date:"2025-08-20",desc:"Costco",amount:298.45,sign:"debit" as const,merchant:"Costco",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250821_1",date:"2025-08-21",desc:"Shell Gas Station",amount:67.90,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250822_1",date:"2025-08-22",desc:"Student Loan Payment",amount:180.00,sign:"debit" as const,merchant:"Nelnet",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250824_1",date:"2025-08-24",desc:"HEB Grocery",amount:192.67,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250826_1",date:"2025-08-26",desc:"Amazon Purchase",amount:112.34,sign:"debit" as const,merchant:"Amazon",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250828_1",date:"2025-08-28",desc:"Whole Foods",amount:98.45,sign:"debit" as const,merchant:"Whole Foods",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98},
    {id:"t_20250830_1",date:"2025-08-30",desc:"Shell Gas Station",amount:72.30,sign:"debit" as const,merchant:"Shell",accountId:"acc_chk_5724",source:"file" as const,confidence:0.99},
    {id:"t_20250831_1",date:"2025-08-31",desc:"HEB Grocery",amount:164.89,sign:"debit" as const,merchant:"HEB",accountId:"acc_chk_5724",source:"file" as const,confidence:0.98}
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
