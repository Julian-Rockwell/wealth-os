import type { Transaction } from "@/types/dashboard";
import type { StagingTransaction } from "@/types/financial";

export type TransactionClassification = "Income" | "Expense" | "Transfer" | "Savings" | "Adjustment" | "unknown";

export interface ClassifiedTransaction {
  transaction_id: string;
  date: string;
  amount: number;
  classification: TransactionClassification;
  subcategory: string;
  reason: string;
}

export interface ClassificationResult {
  period: {
    start: string;
    end: string;
  };
  totals: {
    income: number;
    expenses: number;
    excluded_transfers: number;
    adjustments: number;
    unknown_unclassified: number;
  };
  by_category: {
    income: {
      payroll: number;
      interest: number;
      dividends: number;
      other: number;
    };
    expenses: {
      housing: number;
      utilities: number;
      food: number;
      transport: number;
      interest_fees: number;
      taxes: number;
      other: number;
    };
  };
  transactions: ClassifiedTransaction[];
  audit: {
    pairings: Array<{ from_txn: string; to_txn: string; type: string }>;
    assumptions: string[];
    unknown_samples: string[];
  };
}

// Keywords for classification
const PAYROLL_KEYWORDS = ["PAYROLL", "PPD", "ADP", "GUSTO", "PAYCHEX", "DIRECT DEP", "SALARY", "W-2", "Acme Corp"];
const TRANSFER_KEYWORDS = ["XFER", "ONLINE TRANSFER", "ZELLE", "MOVE MONEY", "INTERNAL", "TRANSFER"];
const CARD_PAYMENT_KEYWORDS = ["CARDMEMBER", "AUTOPAY", "PAYMENT THANK YOU", "CREDIT CARD PAYMENT", "Chase Credit Card"];
const P2P_KEYWORDS = ["VENMO", "CASH APP", "PAYPAL"];
const REFUND_KEYWORDS = ["REFUND", "RETURN", "REVERSAL", "CHARGEBACK"];
const MORTGAGE_KEYWORDS = ["MORTGAGE", "FirstHome Mortgage"];
const LOAN_KEYWORDS = ["LOAN", "Chase Auto", "Nelnet", "Student Loan"];
const UTILITY_KEYWORDS = ["ELECTRIC", "ENERGY", "WATER", "GAS", "INTERNET", "WIRELESS", "Austin Energy", "AT&T"];
const FOOD_KEYWORDS = ["GROCERY", "HEB", "WHOLE FOODS", "SAFEWAY", "RESTAURANT", "BBQ", "FOOD"];
const CHILDCARE_KEYWORDS = ["CHILDCARE", "DAYCARE", "PRESCHOOL", "BABYSITTER", "CHILD CARE"];
const INSURANCE_KEYWORDS = ["INSURANCE", "GEICO", "STATE FARM", "ALLSTATE", "PROGRESSIVE"];
const GROCERY_KEYWORDS = ["GROCERY", "GROCERIES", "HEB", "WHOLE FOODS", "SAFEWAY", "TRADER JOE", "KROGER", "PUBLIX"];
const HOUSING_KEYWORDS = ["MORTGAGE", "RENT", "HOA", "FirstHome Mortgage", "LANDLORD"];
const HEALTHCARE_KEYWORDS = ["PHARMACY", "DOCTOR", "HOSPITAL", "MEDICAL", "CVS", "WALGREENS", "HEALTHCARE"];
const GIG_KEYWORDS = ["UBER", "LYFT", "UPWORK", "FIVERR", "DOORDASH", "INSTACART"];

function matchesKeywords(desc: string, keywords: string[]): boolean {
  const upperDesc = desc.toUpperCase();
  return keywords.some(keyword => upperDesc.includes(keyword.toUpperCase()));
}

function classifyTransaction(
  txn: Transaction | StagingTransaction,
  allTransactions: (Transaction | StagingTransaction)[]
): { classification: TransactionClassification; subcategory: string; reason: string } {
  const desc = txn.desc || "";
  const merchant = "merchant" in txn ? txn.merchant : "";
  const amount = txn.amount;
  const sign = txn.sign;

  // 1. Check for refunds and chargebacks (Adjustment)
  if (matchesKeywords(desc, REFUND_KEYWORDS)) {
    return {
      classification: "Adjustment",
      subcategory: "refund",
      reason: "Transaction descriptor indicates refund or chargeback"
    };
  }

  // 2. Check for credit card payments (Transfer)
  if (matchesKeywords(desc, CARD_PAYMENT_KEYWORDS) || matchesKeywords(merchant, CARD_PAYMENT_KEYWORDS)) {
    return {
      classification: "Transfer",
      subcategory: "cc_payment",
      reason: "Credit card payment from deposit account"
    };
  }

  // 3. Check for transfers
  if (matchesKeywords(desc, TRANSFER_KEYWORDS)) {
    return {
      classification: "Transfer",
      subcategory: "internal_transfer",
      reason: "Descriptor indicates internal account transfer"
    };
  }

  // 4. Check for mortgage payments (Essential Need - Housing)
  if (matchesKeywords(desc, MORTGAGE_KEYWORDS) || matchesKeywords(merchant, MORTGAGE_KEYWORDS) || matchesKeywords(desc, HOUSING_KEYWORDS)) {
    return {
      classification: "Expense",
      subcategory: "housing",
      reason: "Essential housing expense (mortgage/rent payment)"
    };
  }

  // 5. Check for loan payments (Debt payments are Needs - minimum payment portion)
  if (matchesKeywords(desc, LOAN_KEYWORDS) || matchesKeywords(merchant, LOAN_KEYWORDS)) {
    return {
      classification: "Expense",
      subcategory: "debt_payment",
      reason: "Debt payment (classified as Need)"
    };
  }

  // 6. Check for payroll (Income)
  if (sign === "credit" && (matchesKeywords(desc, PAYROLL_KEYWORDS) || matchesKeywords(merchant, PAYROLL_KEYWORDS))) {
    return {
      classification: "Income",
      subcategory: "payroll",
      reason: "Payroll deposit identified by descriptor and credit sign"
    };
  }

  // 7. Check for gig/freelance income
  if (sign === "credit" && (matchesKeywords(desc, GIG_KEYWORDS) || matchesKeywords(merchant, GIG_KEYWORDS))) {
    return {
      classification: "Income",
      subcategory: "freelance",
      reason: "Gig/freelance income"
    };
  }

  // 8. Check for P2P transactions
  if (matchesKeywords(desc, P2P_KEYWORDS) || matchesKeywords(merchant, P2P_KEYWORDS)) {
    // Default to transfer for P2P unless clear indicators suggest otherwise
    return {
      classification: "Transfer",
      subcategory: "p2p_transfer",
      reason: "P2P transaction, likely between user accounts"
    };
  }

  // 9. Classify based on merchant/category for debits (Expenses)
  if (sign === "debit") {
    // Childcare (Essential Need)
    if (matchesKeywords(desc, CHILDCARE_KEYWORDS) || matchesKeywords(merchant, CHILDCARE_KEYWORDS)) {
      return {
        classification: "Expense",
        subcategory: "childcare",
        reason: "Essential childcare expense"
      };
    }

    // Insurance (Essential Need)
    if (matchesKeywords(desc, INSURANCE_KEYWORDS) || matchesKeywords(merchant, INSURANCE_KEYWORDS)) {
      return {
        classification: "Expense",
        subcategory: "insurance",
        reason: "Essential insurance payment"
      };
    }

    // Healthcare (Essential Need)
    if (matchesKeywords(desc, HEALTHCARE_KEYWORDS) || matchesKeywords(merchant, HEALTHCARE_KEYWORDS)) {
      return {
        classification: "Expense",
        subcategory: "healthcare",
        reason: "Healthcare/medical expense"
      };
    }

    // Utilities
    if (matchesKeywords(desc, UTILITY_KEYWORDS) || matchesKeywords(merchant, UTILITY_KEYWORDS)) {
      return {
        classification: "Expense",
        subcategory: "utilities",
        reason: "Utility bill payment"
      };
    }

    // Food/Groceries (prioritize grocery keywords for better classification)
    if (matchesKeywords(desc, GROCERY_KEYWORDS) || matchesKeywords(merchant, GROCERY_KEYWORDS)) {
      return {
        classification: "Expense",
        subcategory: "food",
        reason: "Grocery purchase (essential food expense)"
      };
    }

    // Restaurants (after groceries check)
    if (matchesKeywords(desc, FOOD_KEYWORDS) || matchesKeywords(merchant, FOOD_KEYWORDS)) {
      return {
        classification: "Expense",
        subcategory: "food",
        reason: "Food purchase"
      };
    }

    // Transportation
    if (merchant.toUpperCase().includes("SHELL") || merchant.toUpperCase().includes("GAS") || 
        desc.toUpperCase().includes("FUEL") || desc.toUpperCase().includes("GASOLINE")) {
      return {
        classification: "Expense",
        subcategory: "transport",
        reason: "Transportation/fuel expense"
      };
    }

    // General retail
    if (merchant.toUpperCase().includes("TARGET") || 
        merchant.toUpperCase().includes("AMAZON") || 
        merchant.toUpperCase().includes("COSTCO") ||
        merchant.toUpperCase().includes("HOME DEPOT")) {
      return {
        classification: "Expense",
        subcategory: "other",
        reason: "Retail purchase"
      };
    }

    // Subscriptions
    if (merchant.toUpperCase().includes("NETFLIX") || 
        merchant.toUpperCase().includes("SPOTIFY") ||
        desc.toUpperCase().includes("SUBSCRIPTION")) {
      return {
        classification: "Expense",
        subcategory: "other",
        reason: "Subscription service"
      };
    }

    // Default debit to expense
    return {
      classification: "Expense",
      subcategory: "other",
      reason: "Debit transaction without transfer indicators"
    };
  }

  // 10. Credits that aren't payroll
  if (sign === "credit") {
    // Could be interest, dividends, or other income
    if (desc.toUpperCase().includes("INTEREST") || desc.toUpperCase().includes("DIVIDEND")) {
      return {
        classification: "Income",
        subcategory: desc.toUpperCase().includes("INTEREST") ? "interest" : "dividends",
        reason: "Investment income"
      };
    }

    // Default credit to unknown if not clearly identified
    return {
      classification: "unknown",
      subcategory: "unclassified_credit",
      reason: "Credit transaction without clear income classification"
    };
  }

  // 11. Default to unknown
  return {
    classification: "unknown",
    subcategory: "unclassified",
    reason: "Insufficient information for deterministic classification"
  };
}

/**
 * Maps a subcategory to its corresponding budget category (need/want/saving)
 * Used to properly classify transactions in the 50/30/20 budget rule
 */
export function mapSubcategoryToCategory(subcategory: string): "need" | "want" | "saving" {
  const normalizedSub = subcategory.toLowerCase();
  
  // Needs: Essential expenses that are required for living
  const needsSubs = [
    "housing", "utilities", "food", "transport", "transportation",
    "childcare", "insurance", "healthcare", "debt_payment",
    "rent/mortgage", "groceries", "health", "medical"
  ];
  
  // Savings: Money set aside for future goals or investments
  const savingsSubs = [
    "investment", "investments", "emergency_fund", "emergency fund",
    "401k", "ira", "retirement", "savings", "extra_debt_payment",
    "savings_transfer", "brokerage"
  ];
  
  // Check if it's a Need
  if (needsSubs.some(sub => normalizedSub.includes(sub))) {
    return "need";
  }
  
  // Check if it's a Saving
  if (savingsSubs.some(sub => normalizedSub.includes(sub))) {
    return "saving";
  }
  
  // Default: Everything else is a Want (discretionary spending)
  return "want";
}

function aggregateByCategory(
  transactions: ClassifiedTransaction[]
): ClassificationResult["by_category"] {
  const result: ClassificationResult["by_category"] = {
    income: { payroll: 0, interest: 0, dividends: 0, other: 0 },
    expenses: { housing: 0, utilities: 0, food: 0, transport: 0, interest_fees: 0, taxes: 0, other: 0 }
  };

  transactions.forEach(txn => {
    if (txn.classification === "Income") {
      if (txn.subcategory === "payroll") {
        result.income.payroll += txn.amount;
      } else if (txn.subcategory === "interest") {
        result.income.interest += txn.amount;
      } else if (txn.subcategory === "dividends") {
        result.income.dividends += txn.amount;
      } else {
        result.income.other += txn.amount;
      }
    } else if (txn.classification === "Expense") {
      const absAmount = Math.abs(txn.amount);
      if (txn.subcategory === "housing") {
        result.expenses.housing += absAmount;
      } else if (txn.subcategory === "utilities") {
        result.expenses.utilities += absAmount;
      } else if (txn.subcategory === "food") {
        result.expenses.food += absAmount;
      } else if (txn.subcategory === "transport") {
        result.expenses.transport += absAmount;
      } else if (txn.subcategory === "interest_fees") {
        result.expenses.interest_fees += absAmount;
      } else if (txn.subcategory === "taxes") {
        result.expenses.taxes += absAmount;
      } else {
        result.expenses.other += absAmount;
      }
    }
  });

  return result;
}

export interface BudgetValidation {
  needsValid: boolean; // needs <= 50%
  wantsValid: boolean; // wants <= 30%
  savingsValid: boolean; // savings >= 20%
  needsPct: number;
  wantsPct: number;
  savingsPct: number;
  alerts: string[];
}

export function validate50_30_20(
  totalIncome: number,
  needs: number,
  wants: number,
  savings: number
): BudgetValidation {
  const alerts: string[] = [];
  
  // Calculate percentages based on income
  const needsPct = totalIncome > 0 ? (needs / totalIncome) * 100 : 0;
  const wantsPct = totalIncome > 0 ? (wants / totalIncome) * 100 : 0;
  const savingsPct = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;
  
  // Validate against targets
  const needsValid = needsPct <= 50;
  const wantsValid = wantsPct <= 30;
  const savingsValid = savingsPct >= 20;
  
  // Generate alerts
  if (!needsValid) {
    alerts.push(`Needs (${needsPct.toFixed(1)}%) exceed 50% target. Consider reducing essential expenses.`);
  }
  if (!wantsValid) {
    alerts.push(`Wants (${wantsPct.toFixed(1)}%) exceed 30% target. Review discretionary spending.`);
  }
  if (!savingsValid) {
    alerts.push(`Savings (${savingsPct.toFixed(1)}%) below 20% target. Increase savings/investments rate.`);
  }
  
  return {
    needsValid,
    wantsValid,
    savingsValid,
    needsPct,
    wantsPct,
    savingsPct,
    alerts
  };
}

/**
 * Validates if a credit transaction is real income (not a transfer or refund)
 * Strictly includes only: payroll, salary, interest, dividends, freelance/gig income
 */
function isValidIncome(txn: Transaction): boolean {
  const desc = txn.desc.toLowerCase();
  const merchant = txn.merchant.toLowerCase();
  const subcategory = txn.subcategory.toLowerCase();

  // EXCLUDE: Transfers, card payments, refunds
  const isTransfer = 
    desc.includes('transfer') ||
    desc.includes('zelle') ||
    desc.includes('venmo') ||
    desc.includes('cash app') ||
    desc.includes('paypal') ||
    desc.includes('p2p') ||
    merchant.includes('transfer');

  const isCardPayment = 
    desc.includes('credit card payment') ||
    desc.includes('payment thank you') ||
    desc.includes('autopay') ||
    merchant.includes('credit card');

  const isRefund = 
    desc.includes('refund') ||
    desc.includes('return') ||
    desc.includes('chargeback') ||
    subcategory.includes('refund');

  const isAssetSale = 
    desc.includes('withdrawal') ||
    desc.includes('redemption') ||
    merchant.includes('brokerage');

  if (isTransfer || isCardPayment || isRefund || isAssetSale) {
    return false;
  }

  // INCLUDE: Real income sources only
  const isPayroll = 
    desc.includes('payroll') ||
    desc.includes('salary') ||
    desc.includes('direct dep') ||
    desc.includes('ppd') ||
    desc.includes('adp') ||
    desc.includes('gusto') ||
    merchant.includes('payroll') ||
    merchant.includes('acme corp') ||
    subcategory.includes('payroll');

  const isInvestmentIncome = 
    desc.includes('interest') ||
    desc.includes('dividend') ||
    subcategory.includes('interest') ||
    subcategory.includes('dividend');

  const isGigIncome = 
    merchant.includes('uber') ||
    merchant.includes('lyft') ||
    merchant.includes('doordash') ||
    merchant.includes('upwork') ||
    merchant.includes('fiverr');

  return isPayroll || isInvestmentIncome || isGigIncome;
}

/**
 * Filters transactions for 50/30/20 budget calculation
 * Excludes: transfers, card payments, refunds, non-operational flows
 * Returns only operational debits (true expenses) and credits (true income)
 */
export function filterOperationalTransactions(
  transactions: Transaction[]
): { 
  operationalDebits: Transaction[]; 
  operationalCredits: Transaction[]; 
} {
  const operationalDebits: Transaction[] = [];
  const operationalCredits: Transaction[] = [];

  transactions.forEach(txn => {
    const desc = txn.desc.toLowerCase();
    const merchant = txn.merchant.toLowerCase();
    const subcategory = txn.subcategory.toLowerCase();

    // EXCLUDE from operational flow:
    const isTransfer = 
      desc.includes('zelle') ||
      desc.includes('venmo') ||
      desc.includes('atm withdrawal') ||
      desc.includes('credit card payment') ||
      merchant.includes('credit card') ||
      (desc.includes('transfer') && !desc.includes('emergency fund')) ||
      (subcategory.includes('transfer') && !subcategory.includes('savings'));

    const isRefund = 
      desc.includes('refund') ||
      desc.includes('chargeback') ||
      desc.includes('return') ||
      subcategory.includes('refund');

    // INCLUDE operational debits (true expenses including mortgage, loans, childcare, etc.)
    if (txn.sign === 'debit' && !isTransfer && !isRefund) {
      // Exclude transactions with "Income" subcategory (data quality issue)
      if (subcategory !== 'income') {
        operationalDebits.push(txn);
      }
    }

    // INCLUDE only VALIDATED income credits
    if (txn.sign === 'credit' && isValidIncome(txn)) {
      operationalCredits.push(txn);
    }
  });

  return { operationalDebits, operationalCredits };
}

export function classifyTransactions(
  transactions: (Transaction | StagingTransaction)[]
): ClassificationResult {
  const classified: ClassifiedTransaction[] = [];
  const pairings: Array<{ from_txn: string; to_txn: string; type: string }> = [];
  const assumptions: string[] = [
    "Loan payments treated as transfers (principal only; interest portion not itemized)",
    "Credit card payments from deposit accounts classified as transfers",
    "P2P transactions defaulted to transfers unless clear merchant indicators",
    "Pending transactions excluded from analysis"
  ];
  const unknownSamples: string[] = [];

  let income = 0;
  let expenses = 0;
  let transfers = 0;
  let adjustments = 0;
  let unknown = 0;

  // Sort transactions by date
  const sortedTxns = [...transactions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Get period
  const period = sortedTxns.length > 0 ? {
    start: sortedTxns[0].date,
    end: sortedTxns[sortedTxns.length - 1].date
  } : {
    start: "",
    end: ""
  };

  // Classify each transaction
  sortedTxns.forEach(txn => {
    const { classification, subcategory, reason } = classifyTransaction(txn, sortedTxns);

    const classifiedTxn: ClassifiedTransaction = {
      transaction_id: txn.id,
      date: txn.date,
      amount: txn.amount,
      classification,
      subcategory,
      reason
    };

    classified.push(classifiedTxn);

    // Aggregate totals
    switch (classification) {
      case "Income":
        income += txn.amount;
        break;
      case "Expense":
        expenses += Math.abs(txn.amount);
        break;
      case "Transfer":
      case "Savings":
        transfers += Math.abs(txn.amount);
        break;
      case "Adjustment":
        adjustments += txn.amount;
        break;
      case "unknown":
        unknown += Math.abs(txn.amount);
        if (unknownSamples.length < 5) {
          unknownSamples.push(txn.id);
        }
        break;
    }
  });

  const by_category = aggregateByCategory(classified);

  return {
    period,
    totals: {
      income: Math.round(income * 100) / 100,
      expenses: Math.round(expenses * 100) / 100,
      excluded_transfers: Math.round(transfers * 100) / 100,
      adjustments: Math.round(adjustments * 100) / 100,
      unknown_unclassified: Math.round(unknown * 100) / 100
    },
    by_category,
    transactions: classified,
    audit: {
      pairings,
      assumptions,
      unknown_samples: unknownSamples
    }
  };
}
