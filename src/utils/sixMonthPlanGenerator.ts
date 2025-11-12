import type { SixMonthPlan, SixMonthPlanInputs, MonthPlan, PlanTask } from "@/types/sixMonthPlan";

export function generateSixMonthPlan(inputs: SixMonthPlanInputs): SixMonthPlan {
  const {
    currentMonthExpenses,
    avgMonthlyIncome,
    avgMonthlyExpenses,
    cashFlowMonthly,
    liquidAssets,
    emergencyFundReq,
    highAprDebts,
    allDebts,
    readinessScore,
    rpicMonthly,
    availableCapital
  } = inputs;

  const assumptions = {
    inflation: 0.03,
    minEmergencyMonths: 6,
    incomeBoostRangeMonthly: [200, 800] as [number, number],
    maxRiskCapitalShare: 0.6
  };

  // Calculate emergency fund gap
  const emergencyFundGap = Math.max(emergencyFundReq - liquidAssets, 0);
  const monthlyEFContribution = emergencyFundGap > 0 ? Math.ceil(emergencyFundGap / 6) : 0;

  // Calculate debt payoff strategy
  const sortedHighAprDebts = [...highAprDebts].sort((a, b) => b.apr - a.apr);
  const primaryDebt = sortedHighAprDebts[0];

  // Generate months
  const months: MonthPlan[] = [];
  let runningCashFlow = cashFlowMonthly;
  let runningEFBalance = liquidAssets;
  let runningDebtBalance = highAprDebts.reduce((sum, d) => sum + d.balance, 0);
  let cumulativeSavings = 0;
  let cumulativeInterestSaved = 0;

  for (let i = 1; i <= 6; i++) {
    const tasks: PlanTask[] = [];
    
    // Month 1-2: Foundation and audit
    if (i === 1) {
      tasks.push({
        id: `exp-${i}-001`,
        type: "expense_cut",
        title: "Audit and cancel unused subscriptions",
        details: "Review bank statements for recurring charges. Target: Cancel 3-5 unused services.",
        estMonthlyImpact: 45
      });
      cumulativeSavings += 45;
      runningCashFlow += 45;
    }

    if (i === 2) {
      tasks.push({
        id: `exp-${i}-001`,
        type: "expense_cut",
        title: "Optimize utility and phone bills",
        details: "Negotiate internet/phone plans. Switch to lower-cost providers if available.",
        estMonthlyImpact: 30
      });
      cumulativeSavings += 30;
      runningCashFlow += 30;
    }

    // Emergency fund contributions (all months if gap exists)
    if (emergencyFundGap > 0 && runningEFBalance < emergencyFundReq) {
      const contribution = Math.min(monthlyEFContribution, emergencyFundReq - runningEFBalance);
      tasks.push({
        id: `ef-${i}-001`,
        type: "emergency_fund",
        title: "Emergency Fund contribution",
        details: `Transfer $${contribution.toFixed(0)} to high-yield savings account.`,
        amount: contribution
      });
      runningEFBalance += contribution;
    }

    // High-interest debt payoff (if exists and EF is on track)
    if (primaryDebt && runningEFBalance >= emergencyFundReq * 0.5) {
      const extraPayment = Math.min(200, primaryDebt.balance * 0.1);
      const totalPayment = primaryDebt.monthlyPayment + extraPayment;
      const monthlyInterest = (primaryDebt.balance * primaryDebt.apr / 100) / 12;
      const interestSaved = monthlyInterest * 0.3; // Approximate savings from faster payoff
      
      tasks.push({
        id: `deb-${i}-001`,
        type: "debt_paydown",
        title: `Extra payment on ${primaryDebt.name}`,
        details: `Pay $${totalPayment.toFixed(0)}/month (${primaryDebt.apr.toFixed(1)}% APR). Extra $${extraPayment.toFixed(0)} above minimum.`,
        principalPaydown: extraPayment,
        estInterestSaved: interestSaved
      });
      
      runningDebtBalance = Math.max(0, runningDebtBalance - extraPayment);
      cumulativeInterestSaved += interestSaved;
    }

    // Income boost suggestions (months 3-4)
    if (i === 3) {
      tasks.push({
        id: `inc-${i}-001`,
        type: "income_boost",
        title: "Start freelance/gig work",
        details: "Leverage existing skills on platforms like Upwork, Fiverr, or local services. Target: $300-500/month.",
        estMonthlyImpact: 400
      });
    }

    if (i === 4) {
      tasks.push({
        id: `inc-${i}-001`,
        type: "income_boost",
        title: "Negotiate raise or seek promotion",
        details: "Document achievements, research market rates, schedule discussion with manager.",
        estMonthlyImpact: 250
      });
    }

    // Blocked actions if readiness low
    const blockedActions = readinessScore < 80 ? [{
      reason: "Foundation score below 80",
      name: "Deploy capital to active trading",
      unblocksWhen: "Emergency fund full + high-APR debts paid + score ≥ 80"
    }] : undefined;

    months.push({
      monthIndex: i,
      theme: i <= 2 ? "Stabilize and audit" : i <= 4 ? "Optimize and boost" : "Scale and deploy",
      tasks,
      kpis: {
        cashFlowRunRate: runningCashFlow,
        emergencyFundProgress: Math.min(100, (runningEFBalance / emergencyFundReq) * 100),
        highAprBalance: runningDebtBalance
      },
      blockedActions
    });
  }

  // Calculate final rollup
  const nextStepValue: "paper_trading" | "continue_foundation" = 
    (runningEFBalance >= emergencyFundReq && runningDebtBalance === 0) 
      ? "paper_trading" 
      : "continue_foundation";
      
  const rollup = {
    totalMonthlySavings: cumulativeSavings,
    totalOneTimeSavings: 0,
    totalInterestSaved: cumulativeInterestSaved,
    emergencyFundEnding: runningEFBalance,
    readinessProjected: Math.min(100, readinessScore + (emergencyFundGap > 0 && runningEFBalance >= emergencyFundReq ? 15 : 0)),
    nextStep: nextStepValue
  };

  return {
    planId: `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    generatedAt: new Date().toISOString(),
    inputs,
    assumptions,
    months,
    rollup,
    cta: {
      addToActionPlan: true,
      scheduleMonthlyReassessment: true
    }
  };
}
