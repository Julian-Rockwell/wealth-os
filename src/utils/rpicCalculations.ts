import type { FinancialSnapshot } from "@/types/financial";
import type { DashboardData } from "@/types/dashboard";

export interface RpicInputs {
  currentMonthlyExpenses: number;
  timing: "asap" | "10y" | "15-20y" | "flexible";
  lifestyle: number; // 0.8, 1.0, 1.2, 1.5, or custom
  geography: number; // 0.8, 1.0, 1.2, or custom
  inflationBuffer: number; // default 1.15
  activeReturn: number; // default 0.25 (25%)
  passiveYield: number; // default 0.10 (10%)
  inflation: number; // default 0.03 (3%)
  startingCapital: number;
  monthlyContribution: number;
}

export interface RpicResult {
  monthlyRpic: number;
  annualRpic: number;
  targetCapitalPassive: number; // For 4% withdrawal
  targetCapitalActive: number; // For wealth OS hybrid
}

export interface TimelineResult {
  traditional: {
    yearsToTarget: number;
    freedomDate: Date;
    capitalNeeded: number;
    gap: number;
  };
  wealthOS: {
    yearsToTarget: number;
    freedomDate: Date;
    capitalNeeded: number;
    gap: number;
    phase1Years: number;
    phase2Years: number;
    phase3Years: number;
  };
  deltaYears: number;
}

export interface Milestone {
  amount: number;
  label: string;
  percentage: number;
  eta: Date | null;
}

export function calculateMonthlyExpensesFromDashboard(data: DashboardData): number {
  const needs = data.expenses.needs.total;
  const wants = data.expenses.wants.total;
  const savings = data.expenses.savings.total;
  return (needs + wants + savings) / data.period.months;
}

export function getStartingCapital(snapshot: FinancialSnapshot): number {
  return snapshot.holdings
    .filter(h => h.liquidity === "liquid")
    .reduce((sum, h) => sum + h.balance, 0);
}

export function calculateRpic(inputs: RpicInputs): RpicResult {
  const monthlyRpic = 
    inputs.currentMonthlyExpenses * 
    inputs.lifestyle * 
    inputs.geography * 
    inputs.inflationBuffer;
  
  const annualRpic = monthlyRpic * 12;
  
  // Traditional: 4% withdrawal rule
  const targetCapitalPassive = annualRpic / 0.04;
  
  // Wealth OS: higher yield allows lower capital
  const targetCapitalActive = annualRpic / inputs.passiveYield;
  
  return {
    monthlyRpic,
    annualRpic,
    targetCapitalPassive,
    targetCapitalActive,
  };
}

export function calculateTimeline(
  inputs: RpicInputs,
  rpic: RpicResult
): TimelineResult {
  const now = new Date();
  
  // Traditional calculation: 7% growth, 4% withdrawal
  const traditionalYears = calculateYearsToGoal(
    inputs.startingCapital,
    inputs.monthlyContribution,
    rpic.targetCapitalPassive,
    0.07
  );
  
  // Wealth OS: Phase 1 (active), Phase 2 (hybrid), Phase 3 (passive)
  const phase1Capital = Math.min(100000, rpic.targetCapitalActive * 0.4);
  const phase1Years = calculateYearsToGoal(
    inputs.startingCapital,
    inputs.monthlyContribution,
    phase1Capital,
    inputs.activeReturn
  );
  
  const phase2Start = inputs.startingCapital + (phase1Capital - inputs.startingCapital);
  const phase2Target = rpic.targetCapitalActive * 0.8;
  const phase2Years = calculateYearsToGoal(
    phase2Start,
    inputs.monthlyContribution * 1.5, // Higher contributions
    phase2Target,
    (inputs.activeReturn + inputs.passiveYield) / 2
  );
  
  const phase3Years = Math.max(1, (rpic.targetCapitalActive - phase2Target) / (inputs.monthlyContribution * 12 * 1.2));
  
  const wealthOSYears = phase1Years + phase2Years + phase3Years;
  
  const traditionalDate = new Date(now);
  traditionalDate.setFullYear(traditionalDate.getFullYear() + Math.ceil(traditionalYears));
  
  const wealthOSDate = new Date(now);
  wealthOSDate.setFullYear(wealthOSDate.getFullYear() + Math.ceil(wealthOSYears));
  
  return {
    traditional: {
      yearsToTarget: traditionalYears,
      freedomDate: traditionalDate,
      capitalNeeded: rpic.targetCapitalPassive,
      gap: Math.max(0, rpic.targetCapitalPassive - inputs.startingCapital),
    },
    wealthOS: {
      yearsToTarget: wealthOSYears,
      freedomDate: wealthOSDate,
      capitalNeeded: rpic.targetCapitalActive,
      gap: Math.max(0, rpic.targetCapitalActive - inputs.startingCapital),
      phase1Years,
      phase2Years,
      phase3Years,
    },
    deltaYears: traditionalYears - wealthOSYears,
  };
}

function calculateYearsToGoal(
  principal: number,
  monthlyContribution: number,
  targetAmount: number,
  annualReturn: number
): number {
  if (principal >= targetAmount) return 0;
  
  const monthlyRate = annualReturn / 12;
  let balance = principal;
  let months = 0;
  const maxMonths = 600; // 50 years max
  
  while (balance < targetAmount && months < maxMonths) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    months++;
  }
  
  return months / 12;
}

export function generateMilestones(
  rpic: RpicResult,
  timeline: TimelineResult,
  startingCapital: number
): Milestone[] {
  const now = new Date();
  const milestones: Milestone[] = [];
  
  const targets = [
    { amount: 25000, label: "$25K Foundation" },
    { amount: 50000, label: "$50K Growth" },
    { amount: 100000, label: "$100K Scale" },
    { amount: rpic.targetCapitalActive, label: "RPIC Target" },
  ];
  
  targets.forEach(target => {
    const percentage = Math.min(100, (startingCapital / target.amount) * 100);
    
    // Estimate ETA based on wealthOS timeline
    let eta: Date | null = null;
    if (startingCapital < target.amount) {
      const yearsToMilestone = 
        (target.amount / rpic.targetCapitalActive) * timeline.wealthOS.yearsToTarget;
      eta = new Date(now);
      eta.setFullYear(eta.getFullYear() + Math.ceil(yearsToMilestone));
    }
    
    milestones.push({
      amount: target.amount,
      label: target.label,
      percentage,
      eta,
    });
  });
  
  // Add traditional comparator
  milestones.push({
    amount: rpic.targetCapitalPassive,
    label: "Traditional Path",
    percentage: (rpic.targetCapitalActive / rpic.targetCapitalPassive) * 100,
    eta: timeline.traditional.freedomDate,
  });
  
  return milestones;
}

export function getReadinessPathway(foundationScore?: number): {
  status: "ready" | "foundation" | "work";
  title: string;
  cta: string;
  color: string;
} {
  if (!foundationScore) {
    return {
      status: "work",
      title: "Complete Foundation Assessment",
      cta: "Go to Readiness Score",
      color: "warning",
    };
  }
  
  if (foundationScore >= 80) {
    return {
      status: "ready",
      title: "Ready for Active Investing",
      cta: "Continue to Step 3",
      color: "success",
    };
  }
  
  if (foundationScore >= 60) {
    return {
      status: "foundation",
      title: "Foundation Plan Needed",
      cta: "Start 90-Day Plan",
      color: "warning",
    };
  }
  
  return {
    status: "work",
    title: "Significant Work Required",
    cta: "Build 6-Month Plan",
    color: "destructive",
  };
}
