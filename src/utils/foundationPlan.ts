import type { ReadinessFactor } from "./investmentCalculations";
import type { FinancialSnapshot } from "@/types/financial";
import { calculateMonthlyExpenses, calculateLiquidAssets, calculateHighInterestDebt } from "./investmentCalculations";

export { calculateMonthlyExpenses, calculateLiquidAssets, calculateHighInterestDebt };

export function generateFoundationPlan(
  factors: ReadinessFactor[],
  snapshot: FinancialSnapshot,
  emergencyFundMonths: number = 6
): string[] {
  const plan: string[] = [];
  const monthlyExpenses = calculateMonthlyExpenses(snapshot.stagingTxns);
  const liquidAssets = calculateLiquidAssets(snapshot.holdings);
  const highInterestDebt = calculateHighInterestDebt(snapshot.liabilities);
  const requiredEmergencyFund = monthlyExpenses * emergencyFundMonths;

  // Emergency Fund
  const efFactor = factors.find(f => f.name === "Emergency Fund Coverage");
  if (efFactor && efFactor.status !== "pass") {
    const shortage = requiredEmergencyFund - liquidAssets;
    if (shortage > 0) {
      const monthsToSave = Math.ceil(shortage / (monthlyExpenses * 0.2));
      plan.push(
        `🟡 Emergency Fund: Save $${shortage.toFixed(0)} more (${(shortage / monthlyExpenses).toFixed(1)} months of expenses). ` +
        `Target: $${(monthlyExpenses * 0.2).toFixed(0)}/month for ~${monthsToSave} months.`
      );
    }
  }

  // High Interest Debt
  const debtFactor = factors.find(f => f.name === "High-Interest Debt Management");
  if (debtFactor && debtFactor.status !== "pass" && highInterestDebt > 0) {
    const highestDebt = snapshot.liabilities
      .filter(l => l.apr > 18)
      .sort((a, b) => b.apr - a.apr)[0];
    if (highestDebt) {
      const extraPayment = Math.min(500, highestDebt.balance * 0.1);
      const months = Math.ceil(highestDebt.balance / (highestDebt.monthlyPayment + extraPayment));
      plan.push(
        `🟡 High-Interest Debt: Prioritize ${highestDebt.name} (${highestDebt.apr.toFixed(1)}% APR, $${highestDebt.balance.toFixed(0)} balance). ` +
        `Pay $${extraPayment.toFixed(0)} extra/month to clear in ~${months} months.`
      );
    }
  }

  // Income Stability
  const incomeFactor = factors.find(f => f.name === "Income Stability");
  if (incomeFactor && incomeFactor.status !== "pass") {
    plan.push(
      `🟡 Income Stability: Your income varies significantly. Consider building a larger emergency fund (8-12 months) or diversifying income sources.`
    );
  }

  // Monthly Cash Flow
  const cashFlowFactor = factors.find(f => f.name === "Monthly Cash Flow");
  if (cashFlowFactor && cashFlowFactor.status !== "pass") {
    plan.push(
      `🟡 Cash Flow: Monthly cash flow is negative or minimal. Review expenses in Quick Wins or seek additional income streams to achieve +$250/month minimum.`
    );
  }

  // Capital Availability
  const capitalFactor = factors.find(f => f.name === "Capital Availability");
  if (capitalFactor && capitalFactor.status !== "pass") {
    plan.push(
      `🟡 Capital Availability: Build investable capital to $5K minimum (beyond emergency fund) before pursuing active trading strategies.`
    );
  }

  return plan;
}
