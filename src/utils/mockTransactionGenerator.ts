import type { Transaction } from "@/types/dashboard";

const MOCK_MERCHANTS = {
  needs: [
    "Walmart Grocery", "Target Essentials", "Kroger", "Whole Foods", "Safeway",
    "Shell Gas Station", "Chevron", "Exxon", "BP Gas",
    "AT&T", "Verizon", "Comcast", "Duke Energy", "PG&E",
    "CVS Pharmacy", "Walgreens", "Kaiser Permanente", "UnitedHealth"
  ],
  wants: [
    "Amazon", "Netflix", "Spotify", "Hulu", "Disney+",
    "Starbucks", "Chipotle", "McDonald's", "Subway", "Panera Bread",
    "AMC Theaters", "Regal Cinemas", "Nike", "Adidas", "H&M", "Zara",
    "Best Buy", "Apple Store", "GameStop"
  ],
  savings: [
    "Vanguard", "Fidelity", "Charles Schwab", "Betterment",
    "Ally Bank Savings", "Marcus Savings", "Capital One 360"
  ]
};

const SUBCATEGORY_MAP: Record<string, { category: "need" | "want" | "saving"; subcategory: string }> = {
  "Walmart Grocery": { category: "need", subcategory: "Groceries" },
  "Target Essentials": { category: "need", subcategory: "Groceries" },
  "Kroger": { category: "need", subcategory: "Groceries" },
  "Whole Foods": { category: "need", subcategory: "Groceries" },
  "Safeway": { category: "need", subcategory: "Groceries" },
  "Shell Gas Station": { category: "need", subcategory: "Transportation" },
  "Chevron": { category: "need", subcategory: "Transportation" },
  "Exxon": { category: "need", subcategory: "Transportation" },
  "BP Gas": { category: "need", subcategory: "Transportation" },
  "AT&T": { category: "need", subcategory: "Utilities" },
  "Verizon": { category: "need", subcategory: "Utilities" },
  "Comcast": { category: "need", subcategory: "Utilities" },
  "Duke Energy": { category: "need", subcategory: "Utilities" },
  "PG&E": { category: "need", subcategory: "Utilities" },
  "CVS Pharmacy": { category: "need", subcategory: "Healthcare" },
  "Walgreens": { category: "need", subcategory: "Healthcare" },
  "Kaiser Permanente": { category: "need", subcategory: "Healthcare" },
  "UnitedHealth": { category: "need", subcategory: "Healthcare" },
  "Amazon": { category: "want", subcategory: "Shopping" },
  "Netflix": { category: "want", subcategory: "Subscriptions" },
  "Spotify": { category: "want", subcategory: "Subscriptions" },
  "Hulu": { category: "want", subcategory: "Subscriptions" },
  "Disney+": { category: "want", subcategory: "Subscriptions" },
  "Starbucks": { category: "want", subcategory: "Dining" },
  "Chipotle": { category: "want", subcategory: "Dining" },
  "McDonald's": { category: "want", subcategory: "Dining" },
  "Subway": { category: "want", subcategory: "Dining" },
  "Panera Bread": { category: "want", subcategory: "Dining" },
  "AMC Theaters": { category: "want", subcategory: "Entertainment" },
  "Regal Cinemas": { category: "want", subcategory: "Entertainment" },
  "Nike": { category: "want", subcategory: "Shopping" },
  "Adidas": { category: "want", subcategory: "Shopping" },
  "H&M": { category: "want", subcategory: "Shopping" },
  "Zara": { category: "want", subcategory: "Shopping" },
  "Best Buy": { category: "want", subcategory: "Shopping" },
  "Apple Store": { category: "want", subcategory: "Shopping" },
  "GameStop": { category: "want", subcategory: "Entertainment" },
  "Vanguard": { category: "saving", subcategory: "Investment" },
  "Fidelity": { category: "saving", subcategory: "Investment" },
  "Charles Schwab": { category: "saving", subcategory: "Investment" },
  "Betterment": { category: "saving", subcategory: "Investment" },
  "Ally Bank Savings": { category: "saving", subcategory: "Emergency Fund" },
  "Marcus Savings": { category: "saving", subcategory: "Emergency Fund" },
  "Capital One 360": { category: "saving", subcategory: "Emergency Fund" }
};

/**
 * Generates mock transactions from uploaded statement files
 */
export const generateMockTransactions = (fileName: string, accountId: string = "acc-uploaded"): Transaction[] => {
  const count = Math.floor(Math.random() * 16) + 25; // 25-40 transactions
  const transactions: Transaction[] = [];
  
  // Get date range for last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  // Distribute transactions across categories (roughly 50/30/20)
  const needsCount = Math.floor(count * 0.5);
  const wantsCount = Math.floor(count * 0.3);
  const savingsCount = count - needsCount - wantsCount;

  let txnIndex = 0;

  // Generate needs transactions
  for (let i = 0; i < needsCount; i++) {
    const merchant = MOCK_MERCHANTS.needs[Math.floor(Math.random() * MOCK_MERCHANTS.needs.length)];
    const info = SUBCATEGORY_MAP[merchant];
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    
    transactions.push({
      id: `${fileName}-txn-${txnIndex++}`,
      date: randomDate.toISOString().split('T')[0],
      desc: `${merchant} - Statement Import`,
      amount: parseFloat((Math.random() * 200 + 20).toFixed(2)), // $20-$220
      sign: "debit",
      category: info.category,
      subcategory: info.subcategory,
      merchant,
      accountId,
      confidence: parseFloat((Math.random() * 0.15 + 0.85).toFixed(2)) // 0.85-1.00
    });
  }

  // Generate wants transactions
  for (let i = 0; i < wantsCount; i++) {
    const merchant = MOCK_MERCHANTS.wants[Math.floor(Math.random() * MOCK_MERCHANTS.wants.length)];
    const info = SUBCATEGORY_MAP[merchant];
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    
    transactions.push({
      id: `${fileName}-txn-${txnIndex++}`,
      date: randomDate.toISOString().split('T')[0],
      desc: `${merchant} - Statement Import`,
      amount: parseFloat((Math.random() * 150 + 10).toFixed(2)), // $10-$160
      sign: "debit",
      category: info.category,
      subcategory: info.subcategory,
      merchant,
      accountId,
      confidence: parseFloat((Math.random() * 0.15 + 0.85).toFixed(2))
    });
  }

  // Generate savings transactions
  for (let i = 0; i < savingsCount; i++) {
    const merchant = MOCK_MERCHANTS.savings[Math.floor(Math.random() * MOCK_MERCHANTS.savings.length)];
    const info = SUBCATEGORY_MAP[merchant];
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    
    transactions.push({
      id: `${fileName}-txn-${txnIndex++}`,
      date: randomDate.toISOString().split('T')[0],
      desc: `${merchant} - Statement Import`,
      amount: parseFloat((Math.random() * 500 + 100).toFixed(2)), // $100-$600
      sign: "debit",
      category: info.category,
      subcategory: info.subcategory,
      merchant,
      accountId,
      confidence: parseFloat((Math.random() * 0.15 + 0.85).toFixed(2))
    });
  }

  // Sort by date descending
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
