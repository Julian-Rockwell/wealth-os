import type { FinancialSnapshot, Holding, Liability, StagingTransaction } from "@/types/financial";
import { classifyTransactions } from "./transactionClassifier";

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
  // Use deterministic classification to calculate expenses (excluding transfers)
  const classification = classifyTransactions(transactions);
  const totalExpenses = classification.totals.expenses;
  
  // Get unique months
  const months = new Set(transactions.map(t => t.date.substring(0, 7)));
  const monthCount = months.size || 1;
  
  return totalExpenses / monthCount;
}

export function calculateLiquidAssets(holdings: Holding[]): number {
  return holdings
    .filter(h => h.liquidity === "liquid")
    .reduce((sum, h) => sum + h.balance, 0);
}

export function calculateHighInterestDebt(liabilities: Liability[]): number {
  return liabilities
    .filter(l => l.apr > 18)
    .reduce((sum, l) => sum + l.balance, 0);
}

export function calculateIncomeStability(transactions: StagingTransaction[]): { status: "pass" | "warning" | "fail"; variance: number } {
  // Use classification to get only actual income (not transfers)
  const classification = classifyTransactions(transactions);
  const incomeTransactions = classification.transactions.filter(t => t.classification === "Income");
  
  if (incomeTransactions.length < 3) {
    return { status: "fail", variance: 100 };
  }
  
  const amounts = incomeTransactions.map(t => t.amount);
  const avg = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
  const variance = Math.sqrt(amounts.reduce((sum, a) => sum + Math.pow(a - avg, 2), 0) / amounts.length) / avg * 100;
  
  if (variance < 15) return { status: "pass", variance };
  if (variance < 30) return { status: "warning", variance };
  return { status: "fail", variance };
}

export function calculateMonthlyCashFlow(transactions: StagingTransaction[]): number {
  // Use classification to get actual income and expenses (excluding transfers)
  const classification = classifyTransactions(transactions);
  const netCashFlow = classification.totals.income - classification.totals.expenses;
  
  const months = new Set(transactions.map(t => t.date.substring(0, 7)));
  const monthCount = months.size || 1;
  
  return netCashFlow / monthCount;
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
  const emergencyFundCoverage = liquidAssets / requiredEmergencyFund;
  
  let efStatus: "pass" | "warning" | "fail";
  let efScore = 0;
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
  
  factors.push({
    name: "Emergency Fund Coverage",
    status: efStatus,
    score: efScore,
    details: `${(emergencyFundCoverage * 100).toFixed(0)}% covered (${liquidAssets.toLocaleString("en-US", { style: "currency", currency: "USD" })} / ${requiredEmergencyFund.toLocaleString("en-US", { style: "currency", currency: "USD" })})`,
    formula: `Liquid assets / (Monthly expenses × ${emergencyFundMonths} months)`
  });
  totalScore += efScore;

  // Factor 2: High-Interest Debt
  const highInterestDebt = calculateHighInterestDebt(snapshot.liabilities);
  let hidStatus: "pass" | "warning" | "fail";
  let hidScore = 0;
  if (highInterestDebt === 0) {
    hidStatus = "pass";
    hidScore = 20;
  } else if (highInterestDebt < 5000) {
    hidStatus = "warning";
    hidScore = 10;
  } else {
    hidStatus = "fail";
    hidScore = 0;
  }
  
  factors.push({
    name: "High-Interest Debt",
    status: hidStatus,
    score: hidScore,
    details: `${highInterestDebt.toLocaleString("en-US", { style: "currency", currency: "USD" })} at >18% APR`,
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
    details: `Variance: ${incomeStability.variance.toFixed(1)}%`,
    formula: "Income variance over past 6 months (std dev / mean)"
  });
  totalScore += isScore;

  // Factor 4: Monthly Cash Flow
  const monthlyCashFlow = calculateMonthlyCashFlow(snapshot.stagingTxns);
  let cfStatus: "pass" | "warning" | "fail";
  let cfScore = 0;
  if (monthlyCashFlow > 0) {
    cfStatus = "pass";
    cfScore = 20;
  } else if (monthlyCashFlow >= -500) {
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
  } else if (capitalAvailable >= 10000) {
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

  // Generate recommendation
  let recommendation = "";
  const actionPlan: string[] = [];
  
  if (totalScore >= 80) {
    recommendation = "You're ready to proceed with active investing!";
  } else if (totalScore >= 60) {
    recommendation = "Consider a 90-day preparation plan to strengthen your foundation.";
    actionPlan.push("M+1: Build emergency fund to 50% target");
    actionPlan.push("M+2: Address highest-priority debt");
    actionPlan.push("M+3: Review and optimize monthly cash flow");
  } else {
    recommendation = "A 6-month foundation-building plan is recommended before active investing.";
    actionPlan.push("M+1-2: Focus on emergency fund (reach 25% target)");
    actionPlan.push("M+3-4: Create debt payoff strategy for high-interest accounts");
    actionPlan.push("M+5: Stabilize income streams and reduce expenses");
    actionPlan.push("M+6: Build emergency fund to 50% and reassess");
  }

  return {
    totalScore,
    factors,
    recommendation,
    actionPlan
  };
}

export function calculateEquityOpportunities(snapshot: FinancialSnapshot) {
  // Calculate equity from real estate and vehicles
  const realEstateHoldings = snapshot.holdings.filter(h => h.assetClass === "real_estate");
  const vehicleHoldings = snapshot.holdings.filter(h => h.accountType === "vehicle");
  
  const opportunities = [];
  
  for (const holding of [...realEstateHoldings, ...vehicleHoldings]) {
    // Find associated liability
    const liability = snapshot.liabilities.find(l => l.accountId === holding.accountId);
    const equity = holding.balance - (liability?.balance || 0);
    
    if (equity > 30000) {
      const loanAmount = equity * 0.8; // 80% LTV
      const estimatedAPR = 7.0; // Placeholder rate
      const monthlyPayment = (loanAmount * (estimatedAPR / 100 / 12)) / (1 - Math.pow(1 + (estimatedAPR / 100 / 12), -360));
      const targetReturn = 0.25; // 25% annual return target
      const annualCost = monthlyPayment * 12;
      const potentialGain = loanAmount * targetReturn - annualCost;
      
      opportunities.push({
        assetName: holding.name,
        assetType: holding.assetClass,
        equity,
        loanAmount,
        estimatedAPR,
        monthlyPayment,
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
    const currentMonths = debt.remainingTermMonths;
    const totalCurrentCost = debt.monthlyPayment * currentMonths;
    
    // Accelerated scenario: 1.5x payment
    const acceleratedPayment = debt.monthlyPayment * 1.5;
    const monthlyRate = debt.apr / 100 / 12;
    const acceleratedMonths = Math.log(acceleratedPayment / (acceleratedPayment - debt.balance * monthlyRate)) / Math.log(1 + monthlyRate);
    const totalAcceleratedCost = acceleratedPayment * acceleratedMonths;
    
    // Lump sum payoff
    const lumpSumCost = debt.balance;
    
    return {
      name: debt.name,
      balance: debt.balance,
      apr: debt.apr,
      currentMonths,
      currentTotalCost: totalCurrentCost,
      acceleratedMonths: Math.ceil(acceleratedMonths),
      acceleratedPayment,
      acceleratedSavings: totalCurrentCost - totalAcceleratedCost,
      lumpSumSavings: totalCurrentCost - lumpSumCost,
      recommendation: lumpSumCost < totalCurrentCost - lumpSumCost ? "immediate" : "accelerated"
    };
  });
}

export function calculateAllocationWaterfall(
  snapshot: FinancialSnapshot,
  emergencyFundMonths: number = 6
) {
  const liquidAssets = calculateLiquidAssets(snapshot.holdings);
  const monthlyExpenses = calculateMonthlyExpenses(snapshot.stagingTxns);
  const emergencyFundRequired = monthlyExpenses * emergencyFundMonths;
  const highInterestDebt = calculateHighInterestDebt(snapshot.liabilities);
  
  const afterEmergencyFund = Math.max(0, liquidAssets - emergencyFundRequired);
  const afterDebtPayoff = Math.max(0, afterEmergencyFund - highInterestDebt);
  const activeAccountRecommended = afterDebtPayoff * 0.6;
  const reserveRecommended = afterDebtPayoff * 0.4;
  
  return {
    totalLiquid: liquidAssets,
    emergencyFund: Math.min(liquidAssets, emergencyFundRequired),
    debtPayoff: Math.min(afterEmergencyFund, highInterestDebt),
    availableForInvesting: afterDebtPayoff,
    activeAccount: activeAccountRecommended,
    reserve: reserveRecommended,
    steps: [
      { label: "Total Liquid Assets", amount: liquidAssets, color: "blue" },
      { label: "Emergency Fund", amount: -Math.min(liquidAssets, emergencyFundRequired), color: "red" },
      { label: "Debt Payoff", amount: -Math.min(afterEmergencyFund, highInterestDebt), color: "orange" },
      { label: "Active Trading Account", amount: activeAccountRecommended, color: "green" },
      { label: "Liquid Reserve", amount: reserveRecommended, color: "yellow" }
    ]
  };
}
