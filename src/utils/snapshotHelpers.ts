import type { FinancialSnapshot, Holding, Liability } from "@/types/financial";

/**
 * Recalculates net worth based on holdings and liabilities
 */
export const recalculateNetWorth = (
  holdings: Holding[],
  liabilities: Liability[]
): FinancialSnapshot["netWorth"] => {
  const assets = holdings.reduce((sum, h) => sum + h.balance, 0);
  const liabilitiesTotal = liabilities.reduce((sum, l) => sum + l.balance, 0);
  
  return {
    assets,
    liabilities: liabilitiesTotal,
    net: assets - liabilitiesTotal,
  };
};

/**
 * Updates snapshot with new holdings and recalculates net worth
 */
export const updateSnapshotHoldings = (
  snapshot: FinancialSnapshot,
  holdings: Holding[]
): FinancialSnapshot => {
  const netWorth = recalculateNetWorth(holdings, snapshot.liabilities);
  return { ...snapshot, holdings, netWorth };
};

/**
 * Updates snapshot with new liabilities and recalculates net worth
 */
export const updateSnapshotLiabilities = (
  snapshot: FinancialSnapshot,
  liabilities: Liability[]
): FinancialSnapshot => {
  const netWorth = recalculateNetWorth(snapshot.holdings, liabilities);
  return { ...snapshot, liabilities, netWorth };
};
