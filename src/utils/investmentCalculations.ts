import type { FinancialSnapshot, Holding, Liability, StagingTransaction } from "@/types/financial";
import { classifyTransactions } from "./transactionClassifier";
import { generateFoundationPlan } from "./foundationPlan";

export interface ReadinessFactor {
  name: string;
  status: "pass" | "warning" | "fail";
  score: number;
  details: string;
  formula: string;
}

export interface ReadinessResult {
  totalScore: number;
  factors: ReadinessFactor[];
  recommendation: string;
  actionPlan: string[];
}

export function calculateMonthlyExpenses(transactions: StagingTransaction[]): number {
  if (!transactions || transactions.length === 0) {
    return 0;
  }

  // Use deterministic classification to calculate expenses (excluding transfers)
  const classification = classifyTransactions(transactions);
  
  // Calculate rolling 30-day expense average
  // Formula: (total expenses / days in period) × 30
  const sortedTxns = [...transactions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  if (sortedTxns.length === 0) return 0;
  
  const startDate = new Date(sortedTxns[0].date);
  const endDate = new Date(sortedTxns[sortedTxns.length - 1].date);
  const daysDiff = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  
  const totalExpenses = classification.totals.expenses;
  const dailyAvg = totalExpenses / daysDiff;
  
  return dailyAvg * 30; // Rolling 30-day average
}

export function calculateLiquidAssets(holdings: Holding[]): number {
  return holdings
    .filter(h => h.liquidity === "liquid")
    .reduce((sum, h) => sum + h.balance, 0);
}

export function calculateHighInterestDebt(liabilities: Liability[]): number {
  if (!liabilities || liabilities.length === 0) {
    return 0;
  }
  return liabilities
    .filter(l => l.apr > 18)
    .reduce((sum, l) => sum + l.balance, 0);
}

export function calculateIncomeStability(transactions: StagingTransaction[]): { 
  status: "pass" | "warning" | "fail"; 
  cv: number;
  details: string;
} {
  if (!transactions || transactions.length === 0) {
    return { status: "fail", cv: 100, details: "No transaction data" };
  }

  // Use classification to get only actual income (not transfers)
  const classification = classifyTransactions(transactions);
  const incomeTransactions = classification.transactions
    .filter(t => t.classification === "Income" && t.subcategory === "payroll")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  if (incomeTransactions.length < 3) {
    return { status: "fail", cv: 100, details: "Insufficient history (<3 pay periods)" };
  }
  
  // Calculate coefficient of variation (CV = std/mean)
  const amounts = incomeTransactions.map(t => t.amount);
  const mean = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
  
  if (mean === 0) {
    return { status: "fail", cv: 100, details: "No income detected" };
  }
  
  // Remove outliers (>3σ)
  const stdDev = Math.sqrt(amounts.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) / amounts.length);
  const filteredAmounts = amounts.filter(a => Math.abs(a - mean) <= 3 * stdDev);
  
  if (filteredAmounts.length < 3) {
    return { status: "warning", cv: 35, details: "High variance in pay amounts" };
  }
  
  const filteredMean = filteredAmounts.reduce((sum, a) => sum + a, 0) / filteredAmounts.length;
  const filteredStdDev = Math.sqrt(filteredAmounts.reduce((sum, a) => sum + Math.pow(a - filteredMean, 2), 0) / filteredAmounts.length);
  const cv = (filteredStdDev / filteredMean) * 100;
  
  // Check cadence consistency
  const intervals: number[] = [];
  for (let i = 1; i < incomeTransactions.length; i++) {
    const days = Math.ceil(
      (new Date(incomeTransactions[i].date).getTime() - new Date(incomeTransactions[i - 1].date).getTime()) 
      / (1000 * 60 * 60 * 24)
    );
    intervals.push(days);
  }
  
  const avgInterval = intervals.reduce((sum, i) => sum + i, 0) / intervals.length;
  const consistentIntervals = intervals.filter(i => Math.abs(i - avgInterval) <= 3).length;
  const cadenceConsistency = (consistentIntervals / intervals.length) * 100;
  
  // Status determination
  if (cv <= 15 || cadenceConsistency >= 80) {
    return { status: "pass", cv, details: `CV: ${cv.toFixed(1)}%, Cadence: ${cadenceConsistency.toFixed(0)}% consistent` };
  } else if (cv <= 35) {
    return { status: "warning", cv, details: `CV: ${cv.toFixed(1)}%, Cadence: ${cadenceConsistency.toFixed(0)}% consistent` };
  } else {
    return { status: "fail", cv, details: `CV: ${cv.toFixed(1)}%, Cadence: ${cadenceConsistency.toFixed(0)}% consistent` };
  }
}

export function calculateMonthlyCashFlow(transactions: StagingTransaction[]): number {
  if (!transactions || transactions.length === 0) {
    return 0;
  }

  // Use classification to get actual income and expenses (excluding transfers)
  const classification = classifyTransactions(transactions);
  const netCashFlow = classification.totals.income - classification.totals.expenses;
  
  // Calculate based on actual days in period for accuracy
  const sortedTxns = [...transactions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  if (sortedTxns.length === 0) return 0;
  
  const startDate = new Date(sortedTxns[0].date);
  const endDate = new Date(sortedTxns[sortedTxns.length - 1].date);
  const daysDiff = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Convert to monthly average
  return (netCashFlow / daysDiff) * 30;
}

export function calculateReadinessScore(
  snapshot: FinancialSnapshot,
  emergencyFundMonths: number = 6
): ReadinessResult {
  const factors: ReadinessFactor[] = [];
  let totalScore = 0;

  // Factor 1: Emergency Fund Coverage
  const monthlyExpenses = calculateMonthlyExpenses(snapshot.stagingTxns);
  const requiredEmergencyFund = monthlyExpenses * emergencyFundMonths;
  const liquidAssets = calculateLiquidAssets(snapshot.holdings);
  
  let efStatus: "pass" | "warning" | "fail";
  let efScore = 0;
  let efDetails = "";
  
  if (monthlyExpenses === 0 || !snapshot.stagingTxns || snapshot.stagingTxns.length === 0) {
    efStatus = "fail";
    efScore = 0;
    efDetails = "—% (confirm expenses)";
  } else {
    const emergencyFundCoverage = requiredEmergencyFund > 0 ? liquidAssets / requiredEmergencyFund : 0;
    const coveragePct = Math.min(100, emergencyFundCoverage * 100);
    
    if (emergencyFundCoverage >= 1) {
      efStatus = "pass";
      efScore = 20;
    } else if (emergencyFundCoverage >= 0.5) {
      efStatus = "warning";
      efScore = 10;
    } else {
      efStatus = "fail";
      efScore = 0;
    }
    
    efDetails = `${coveragePct.toFixed(0)}% covered (${liquidAssets.toLocaleString("en-US", { style: "currency", currency: "USD" })} / ${requiredEmergencyFund.toLocaleString("en-US", { style: "currency", currency: "USD" })})`;
  }
  
  factors.push({
    name: "Emergency Fund Coverage",
    status: efStatus,
    score: efScore,
    details: efDetails,
    formula: `Liquid assets / (Monthly expenses × ${emergencyFundMonths} months)`
  });
  totalScore += efScore;

  // Factor 2: High-Interest Debt Management
  const highInterestDebt = calculateHighInterestDebt(snapshot.liabilities);
  let hidStatus: "pass" | "warning" | "fail";
  let hidScore = 0;
  let hidDetails = "";
  
  if (!snapshot.liabilities || snapshot.liabilities.length === 0) {
    hidStatus = "pass";
    hidScore = 20;
    hidDetails = "No debts on file";
  } else {
    if (highInterestDebt === 0) {
      hidStatus = "pass";
      hidScore = 20;
      hidDetails = "$0 at >18% APR";
    } else if (highInterestDebt <= 2500) {
      hidStatus = "warning";
      hidScore = 10;
      hidDetails = `${highInterestDebt.toLocaleString("en-US", { style: "currency", currency: "USD" })} at >18% APR`;
    } else {
      hidStatus = "fail";
      hidScore = 0;
      hidDetails = `${highInterestDebt.toLocaleString("en-US", { style: "currency", currency: "USD" })} at >18% APR`;
    }
  }
  
  factors.push({
    name: "High-Interest Debt Management",
    status: hidStatus,
    score: hidScore,
    details: hidDetails,
    formula: "Sum of liabilities with APR > 18%"
  });
  totalScore += hidScore;

  // Factor 3: Income Stability
  const incomeStability = calculateIncomeStability(snapshot.stagingTxns);
  const isScore = incomeStability.status === "pass" ? 20 : incomeStability.status === "warning" ? 10 : 0;
  
  factors.push({
    name: "Income Stability",
    status: incomeStability.status,
    score: isScore,
    details: incomeStability.details,
    formula: "Coefficient of variation on paycheck amounts (last 6 months)"
  });
  totalScore += isScore;

  // Factor 4: Monthly Cash Flow
  const monthlyCashFlow = calculateMonthlyCashFlow(snapshot.stagingTxns);
  let cfStatus: "pass" | "warning" | "fail";
  let cfScore = 0;
  
  if (monthlyCashFlow > 250) {
    cfStatus = "pass";
    cfScore = 20;
  } else if (Math.abs(monthlyCashFlow) <= 250) {
    cfStatus = "warning";
    cfScore = 10;
  } else {
    cfStatus = "fail";
    cfScore = 0;
  }
  
  factors.push({
    name: "Monthly Cash Flow",
    status: cfStatus,
    score: cfScore,
    details: `${monthlyCashFlow.toLocaleString("en-US", { style: "currency", currency: "USD" })}/month average`,
    formula: "Average monthly income - average monthly expenses"
  });
  totalScore += cfScore;

  // Factor 5: Capital Availability
  const capitalAvailable = liquidAssets - requiredEmergencyFund;
  let caStatus: "pass" | "warning" | "fail";
  let caScore = 0;
  
  if (capitalAvailable >= 25000) {
    caStatus = "pass";
    caScore = 20;
  } else if (capitalAvailable >= 5000) {
    caStatus = "warning";
    caScore = 10;
  } else {
    caStatus = "fail";
    caScore = 0;
  }
  
  factors.push({
    name: "Capital Availability",
    status: caStatus,
    score: caScore,
    details: `${capitalAvailable.toLocaleString("en-US", { style: "currency", currency: "USD" })} available beyond emergency fund`,
    formula: "Liquid assets - emergency fund requirement"
  });
  totalScore += caScore;

  // Generate recommendation and action plan
  let recommendation = "";
  let actionPlan: string[] = [];
  
  if (totalScore >= 80) {
    recommendation = "Ready: Your financial foundation is solid. You can proceed with optimization.";
  } else {
    // Use the enhanced foundation plan generator
    actionPlan = generateFoundationPlan(factors, snapshot, emergencyFundMonths);
    
    if (totalScore >= 60) {
      recommendation = "Foundation: A 90-day preparation plan will strengthen your base.";
    } else {
      recommendation = "Significant Work: A 6-month foundation-building plan is recommended.";
    }
  }

  return {
    totalScore,
    factors,
    recommendation,
    actionPlan
  };
}

export function calculateEquityOpportunities(snapshot: FinancialSnapshot) {
  // Only real estate holdings - vehicles excluded per business decision
  // (vehicle value needs to be at least $60k to be worthwhile, focusing on real estate only)
  const realEstateHoldings = snapshot.holdings.filter(h => h.assetClass === "real_estate");
  
  const opportunities = [];
  
  for (const holding of realEstateHoldings) {
    // Find associated liability
    const liability = snapshot.liabilities.find(l => l.accountId === holding.accountId);
    const equity = holding.balance - (liability?.balance || 0);
    
    if (equity > 30000) {
      // HELOC formula: Banks lend up to 80% of total asset value minus existing mortgage
      // NOT 80% of equity (that would be incorrect)
      const maxLTV = 0.8; // 80% maximum Loan-to-Value ratio
      const maxTotalLoan = holding.balance * maxLTV; // Max loan banks allow (80% of home value)
      const existingLoan = liability?.balance || 0;
      const availableLoan = Math.max(0, maxTotalLoan - existingLoan); // Available HELOC
      
      // Only show opportunity if available loan meets minimum threshold
      if (availableLoan < 30000) {
        continue;
      }
      
      const loanAmount = availableLoan; // Use available HELOC amount
      
      // PLACEHOLDER VALUES (should be real-time rates in production):
      const estimatedAPR = 7.0; // Fixed example: 7% HELOC rate
      // Interest-only formula: (Principal × APR) / 12
      const monthlyPayment = (loanAmount * (estimatedAPR / 100)) / 12;
      const targetReturn = 0.25; // Fixed example: 25% annual return target
      // Annual interest cost = Loan Amount × APR (since interest-only)
      const annualCost = monthlyPayment * 12;
      const potentialGain = loanAmount * targetReturn - annualCost;
      
      opportunities.push({
        assetName: holding.name,
        assetType: holding.assetClass,
        homeValue: holding.balance,
        existingMortgage: existingLoan,
        equity,
        loanAmount,
        estimatedAPR,
        monthlyPayment,
        annualInterestCost: annualCost,
        targetReturn: targetReturn * 100,
        netGainYear1: potentialGain
      });
    }
  }
  
  return opportunities;
}

export function calculateDebtPayoffScenarios(liabilities: Liability[]) {
  const highInterestDebts = liabilities.filter(l => l.apr > 18);
  
  return highInterestDebts.map(debt => {
    const monthlyRate = debt.apr / 100 / 12;
    const currentPayment = debt.monthlyPayment;
    
    // Calculate current months dynamically using amortization formula:
    // n = -ln(1 - (P*r)/A) / ln(1+r)
    // Where P = balance, r = monthly rate, A = monthly payment
    let currentMonths: number;
    
    if (currentPayment > 0 && debt.balance > 0 && monthlyRate > 0) {
      const interestPortion = debt.balance * monthlyRate;
      
      if (currentPayment <= interestPortion) {
        // Payment doesn't cover interest - perpetual debt
        currentMonths = 999;
      } else {
        currentMonths = Math.ceil(
          -Math.log(1 - (debt.balance * monthlyRate) / currentPayment) / 
          Math.log(1 + monthlyRate)
        );
      }
    } else if (debt.remainingTermMonths > 0) {
      currentMonths = debt.remainingTermMonths;
    } else {
      currentMonths = currentPayment > 0 ? Math.ceil(debt.balance / currentPayment) : 0;
    }
    
    // Calculate total cost with PRECISE amortization (not simple multiplication)
    // Total cost = sum of all payments with compound interest
    let currentTotalCost = 0;
    let remainingBalance = debt.balance;
    for (let i = 0; i < currentMonths && remainingBalance > 0; i++) {
      const interest = remainingBalance * monthlyRate;
      const principal = Math.min(currentPayment - interest, remainingBalance);
      currentTotalCost += currentPayment;
      remainingBalance -= principal;
    }
    // Add any remaining balance if loop didn't cover it
    if (remainingBalance > 0) {
      currentTotalCost += remainingBalance;
    }
    
    // Accelerated scenario: 1.5x payment
    const acceleratedPayment = Math.round(currentPayment * 1.5);
    let acceleratedMonths = 0;
    let acceleratedTotalCost = 0;
    
    if (acceleratedPayment > debt.balance * monthlyRate) {
      acceleratedMonths = Math.ceil(
        -Math.log(1 - (debt.balance * monthlyRate) / acceleratedPayment) / 
        Math.log(1 + monthlyRate)
      );
      
      // Calculate accelerated total cost with precise amortization
      remainingBalance = debt.balance;
      for (let i = 0; i < acceleratedMonths && remainingBalance > 0; i++) {
        const interest = remainingBalance * monthlyRate;
        const principal = Math.min(acceleratedPayment - interest, remainingBalance);
        acceleratedTotalCost += acceleratedPayment;
        remainingBalance -= principal;
      }
      if (remainingBalance > 0) {
        acceleratedTotalCost += remainingBalance;
      }
    }
    
    // Lump sum payoff - just the balance, no interest
    const lumpSumCost = debt.balance;
    
    // Interest avoided for lump sum = total interest that would have been paid
    const currentInterestTotal = currentTotalCost - debt.balance;
    const acceleratedInterestTotal = acceleratedTotalCost - debt.balance;
    
    // Calculate savings
    const acceleratedSavings = Math.max(0, currentTotalCost - acceleratedTotalCost);
    const lumpSumSavings = Math.max(0, currentTotalCost - lumpSumCost);
    const interestAvoided = Math.max(0, currentInterestTotal);
    
    return {
      name: debt.name,
      balance: debt.balance,
      apr: debt.apr,
      currentPayment,
      currentMonths,
      currentTotalCost,
      acceleratedMonths,
      acceleratedPayment,
      acceleratedTotalCost,
      acceleratedSavings,
      lumpSumCost,
      lumpSumSavings,
      interestAvoided,
      recommendation: lumpSumCost < acceleratedSavings ? "immediate" : "accelerated"
    };
  });
}

export function calculateAllocationWaterfall(
  snapshot: FinancialSnapshot,
  emergencyFundMonths: number = 6,
  maxTradingAccountCap: number = 100000,
  currentTradingAccountValue: number = 0
) {
  const liquidAssets = calculateLiquidAssets(snapshot.holdings);
  const monthlyExpenses = calculateMonthlyExpenses(snapshot.stagingTxns);
  const emergencyFundRequired = monthlyExpenses * emergencyFundMonths;
  const highInterestDebt = calculateHighInterestDebt(snapshot.liabilities);
  
  const afterEmergencyFund = Math.max(0, liquidAssets - emergencyFundRequired);
  const afterDebtPayoff = Math.max(0, afterEmergencyFund - highInterestDebt);
  
  // NEW LOGIC: 100% to trading until cap is reached
  const feedingToPassive = currentTradingAccountValue >= maxTradingAccountCap;
  
  let activeAccountRecommended: number;
  let reserveRecommended: number;
  
  if (feedingToPassive) {
    // Once cap reached, feed 100% of new capital to passive/reserve
    activeAccountRecommended = 0;
    reserveRecommended = afterDebtPayoff;
  } else {
    // Before cap: 100% to active trading account
    const remainingCapacity = maxTradingAccountCap - currentTradingAccountValue;
    activeAccountRecommended = Math.min(afterDebtPayoff, remainingCapacity);
    reserveRecommended = Math.max(0, afterDebtPayoff - activeAccountRecommended);
  }
  
  return {
    totalLiquid: liquidAssets,
    emergencyFund: Math.min(liquidAssets, emergencyFundRequired),
    debtPayoff: Math.min(afterEmergencyFund, highInterestDebt),
    availableForInvesting: afterDebtPayoff,
    activeAccount: activeAccountRecommended,
    reserve: reserveRecommended,
    maxTradingAccountCap,
    currentTradingAccountValue,
    feedingToPassive,
    steps: [
      { label: "Total Liquid Assets", amount: liquidAssets, color: "blue" },
      { label: "Emergency Fund", amount: -Math.min(liquidAssets, emergencyFundRequired), color: "red" },
      { label: "Debt Payoff", amount: -Math.min(afterEmergencyFund, highInterestDebt), color: "orange" },
      { label: "Active Trading Account", amount: activeAccountRecommended, color: "green" },
      { label: feedingToPassive ? "Passive Income Reserve" : "Liquid Reserve", amount: reserveRecommended, color: "yellow" }
    ]
  };
}
