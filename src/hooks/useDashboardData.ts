import { useState, useCallback, useEffect } from "react";
import type { DashboardData, Transaction, DashboardFilters } from "@/types/dashboard";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { SAMPLE_DASHBOARD_DATA } from "@/utils/sampleData";

// Mock data generator
const generateMockData = (): DashboardData => {
  const transactions: Transaction[] = [];
  const categories = {
    needs: ["Rent/Mortgage", "Utilities", "Groceries", "Insurance", "Transportation"],
    wants: ["Dining Out", "Entertainment", "Shopping", "Subscriptions", "Travel"],
    savings: ["Emergency Fund", "Investments", "401k", "Extra Debt Payment"],
  };

  const merchants = {
    needs: ["Landlord Payment", "Electric Co", "Water Dept", "Whole Foods", "Safeway", "Shell Gas"],
    wants: ["Netflix", "Spotify", "Amazon", "Starbucks", "Target", "AMC Theaters"],
    savings: ["Vanguard", "Fidelity", "Discover Savings", "Credit Card Payment"],
  };

  // Generate 3 months of transactions
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  for (let i = 0; i < 150; i++) {
    const daysOffset = Math.floor(Math.random() * 90);
    const txDate = new Date(startDate);
    txDate.setDate(txDate.getDate() + daysOffset);

    const categoryType = Math.random() < 0.5 ? "need" : Math.random() < 0.7 ? "want" : "saving";
    const subcats = categories[categoryType + "s" as keyof typeof categories];
    const mrchnts = merchants[categoryType + "s" as keyof typeof merchants];

    transactions.push({
      id: `tx-${i}`,
      date: txDate.toISOString().split("T")[0],
      desc: mrchnts[Math.floor(Math.random() * mrchnts.length)],
      amount: categoryType === "need"
        ? Math.random() * 500 + 50
        : categoryType === "want"
        ? Math.random() * 200 + 10
        : Math.random() * 1000 + 100,
      sign: "debit",
      category: categoryType,
      subcategory: subcats[Math.floor(Math.random() * subcats.length)],
      merchant: mrchnts[Math.floor(Math.random() * mrchnts.length)],
      accountId: `acc-${Math.floor(Math.random() * 2) + 1}`,
      confidence: Math.random() * 0.3 + 0.7,
    });
  }

  // Add some income transactions
  for (let i = 0; i < 3; i++) {
    const month = new Date(startDate);
    month.setMonth(month.getMonth() + i);
    month.setDate(1);

    transactions.push({
      id: `income-${i}`,
      date: month.toISOString().split("T")[0],
      desc: "Payroll Deposit",
      amount: 5000 + Math.random() * 500,
      sign: "credit",
      category: "need",
      subcategory: "Income",
      merchant: "Employer",
      accountId: "acc-1",
      confidence: 1.0,
    });
  }

  transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalNeeds = transactions
    .filter((t) => t.category === "need" && t.sign === "debit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalWants = transactions
    .filter((t) => t.category === "want")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalSavings = transactions
    .filter((t) => t.category === "saving")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = totalNeeds + totalWants + totalSavings;
  const avgIncome = transactions
    .filter((t) => t.sign === "credit")
    .reduce((sum, t) => sum + t.amount, 0) / 3;

  return {
    period: {
      start: startDate.toISOString().split("T")[0],
      end: new Date().toISOString().split("T")[0],
      months: 3,
    },
    accounts: [
      { id: "acc-1", name: "Chase Checking", type: "bank" },
      { id: "acc-2", name: "Amex Gold", type: "card" },
    ],
    income: {
      avgMonthly: avgIncome,
      stability: "stable",
    },
    expenses: {
      needs: {
        total: totalNeeds,
        pct: (totalNeeds / totalExpenses) * 100,
        subs: {
          "Rent/Mortgage": totalNeeds * 0.4,
          Utilities: totalNeeds * 0.2,
          Groceries: totalNeeds * 0.25,
          Transportation: totalNeeds * 0.15,
        },
      },
      wants: {
        total: totalWants,
        pct: (totalWants / totalExpenses) * 100,
        subs: {
          "Dining Out": totalWants * 0.35,
          Entertainment: totalWants * 0.25,
          Shopping: totalWants * 0.3,
          Subscriptions: totalWants * 0.1,
        },
      },
      savings: {
        total: totalSavings,
        pct: (totalSavings / totalExpenses) * 100,
        subs: {
          "Emergency Fund": totalSavings * 0.4,
          Investments: totalSavings * 0.4,
          "401k": totalSavings * 0.2,
        },
      },
    },
    cashflow: {
      monthlySurplus: avgIncome - totalExpenses / 3,
    },
    txns: transactions,
    recommendations: {
      immediate: [
        {
          title: "Reduce dining out expenses",
          estMonthlySave: 250,
          category: "wants",
        },
        {
          title: "Review subscription services",
          estMonthlySave: 75,
          category: "wants",
        },
        {
          title: "Optimize grocery spending",
          estMonthlySave: 120,
          category: "needs",
        },
      ],
    },
  };
};

export const useDashboardData = () => {
  const { snapshot } = useFinancialData();
  
  // Use Reynolds data if available, otherwise generate mock
  const getInitialData = (): DashboardData => {
    // Only use sample data if snapshot exists AND has the Reynolds sample data loaded
    if (snapshot && snapshot.analyzedPeriod.startDate === "2025-08-01" && SAMPLE_DASHBOARD_DATA.txns.length > 0) {
      const transactions = SAMPLE_DASHBOARD_DATA.txns;
      
      // Calculate totals from real data
      const totalNeeds = transactions
        .filter((t) => t.category === "need" && t.sign === "debit")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalWants = transactions
        .filter((t) => t.category === "want")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalSavings = transactions
        .filter((t) => t.category === "saving")
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalExpenses = totalNeeds + totalWants + totalSavings;
      const avgIncome = transactions
        .filter((t) => t.sign === "credit")
        .reduce((sum, t) => sum + t.amount, 0) / 3;
      
      // Calculate subcategory breakdowns
      const needsSubs: Record<string, number> = {};
      const wantsSubs: Record<string, number> = {};
      const savingsSubs: Record<string, number> = {};
      
      transactions.forEach(t => {
        if (t.sign === "debit") {
          if (t.category === "need") {
            needsSubs[t.subcategory] = (needsSubs[t.subcategory] || 0) + t.amount;
          } else if (t.category === "want") {
            wantsSubs[t.subcategory] = (wantsSubs[t.subcategory] || 0) + t.amount;
          } else if (t.category === "saving") {
            savingsSubs[t.subcategory] = (savingsSubs[t.subcategory] || 0) + t.amount;
          }
        }
      });
      
      return {
        period: {
          start: SAMPLE_DASHBOARD_DATA.period.start,
          end: SAMPLE_DASHBOARD_DATA.period.end,
          months: SAMPLE_DASHBOARD_DATA.period.months
        },
        accounts: snapshot.accounts.map(acc => ({
          id: acc.id,
          name: acc.name,
          type: acc.type as "bank" | "card" | "other"
        })),
        income: {
          avgMonthly: avgIncome,
          stability: "stable"
        },
        expenses: {
          needs: {
            total: totalNeeds,
            pct: (totalNeeds / totalExpenses) * 100,
            subs: needsSubs
          },
          wants: {
            total: totalWants,
            pct: (totalWants / totalExpenses) * 100,
            subs: wantsSubs
          },
          savings: {
            total: totalSavings,
            pct: (totalSavings / totalExpenses) * 100,
            subs: savingsSubs
          }
        },
        cashflow: {
          monthlySurplus: avgIncome - totalExpenses / 3
        },
        txns: transactions,
        recommendations: {
          immediate: [
            {
              title: "Reduce dining out expenses",
              estMonthlySave: Math.round(wantsSubs["Dining Out"] / 3 * 0.25) || 100,
              category: "wants"
            },
            {
              title: "Review subscription services",
              estMonthlySave: Math.round(wantsSubs["Subscriptions"] / 3 * 0.5) || 50,
              category: "wants"
            },
            {
              title: "Shop more efficiently at bulk stores",
              estMonthlySave: Math.round(needsSubs["Groceries"] / 3 * 0.1) || 80,
              category: "needs"
            }
          ]
        }
      };
    }
    
    return generateMockData();
  };
  
  const [data, setData] = useState<DashboardData>(() => getInitialData());
  const [filters, setFilters] = useState<DashboardFilters>({});
  
  // Re-initialize data when snapshot changes (e.g., after reset or loading sample data)
  useEffect(() => {
    setData(getInitialData());
  }, [snapshot]);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setData((prev) => {
      const newTxns = prev.txns.map((t) => (t.id === id ? { ...t, ...updates } : t));
      
      // Recalculate totals
      const totalNeeds = newTxns
        .filter((t) => t.category === "need" && t.sign === "debit")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalWants = newTxns
        .filter((t) => t.category === "want")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalSavings = newTxns
        .filter((t) => t.category === "saving")
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalExpenses = totalNeeds + totalWants + totalSavings;

      return {
        ...prev,
        txns: newTxns,
        expenses: {
          needs: {
            ...prev.expenses.needs,
            total: totalNeeds,
            pct: (totalNeeds / totalExpenses) * 100,
          },
          wants: {
            ...prev.expenses.wants,
            total: totalWants,
            pct: (totalWants / totalExpenses) * 100,
          },
          savings: {
            ...prev.expenses.savings,
            total: totalSavings,
            pct: (totalSavings / totalExpenses) * 100,
          },
        },
        cashflow: {
          monthlySurplus: prev.income.avgMonthly - totalExpenses / prev.period.months,
        },
      };
    });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setData((prev) => {
      const newTxns = prev.txns.filter((t) => t.id !== id);
      
      // Recalculate totals
      const totalNeeds = newTxns
        .filter((t) => t.category === "need" && t.sign === "debit")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalWants = newTxns
        .filter((t) => t.category === "want")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalSavings = newTxns
        .filter((t) => t.category === "saving")
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalExpenses = totalNeeds + totalWants + totalSavings;

      return {
        ...prev,
        txns: newTxns,
        expenses: {
          needs: {
            ...prev.expenses.needs,
            total: totalNeeds,
            pct: (totalNeeds / totalExpenses) * 100,
          },
          wants: {
            ...prev.expenses.wants,
            total: totalWants,
            pct: (totalWants / totalExpenses) * 100,
          },
          savings: {
            ...prev.expenses.savings,
            total: totalSavings,
            pct: (totalSavings / totalExpenses) * 100,
          },
        },
        cashflow: {
          monthlySurplus: prev.income.avgMonthly - totalExpenses / prev.period.months,
        },
      };
    });
  }, []);

  return {
    data,
    updateTransaction,
    deleteTransaction,
    filters,
    setFilters,
  };
};
