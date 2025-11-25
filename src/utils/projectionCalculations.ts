import type { ProjectionSettings } from "@/contexts/FinancialDataContext";

export interface ProjectionRow {
  year: number;
  tradingAccount: number;
  goalPercent: number;
  tradingProfits: number;
  cashInOut: number;
  excessProfits: number;
  incomeAccount: number;
  passiveIncome: number;
  rpicIndex: number;
}

export function calculateProjectionRows(settings: ProjectionSettings): ProjectionRow[] {
  const rows: ProjectionRow[] = [];
  
  for (let i = 0; i < 20; i++) {
    const year = settings.startYear + i;
    const isFirstRow = i === 0;
    const prevRow = i > 0 ? rows[i - 1] : null;
    
    // Trading Account (Version-2 formula)
    let tradingAccount: number;
    if (isFirstRow) {
      tradingAccount = settings.initialTradingAccount;
    } else {
      const prevTrading = prevRow!.tradingAccount;
      const prevProfit = prevRow!.tradingProfits;
      const prevCash = prevRow!.cashInOut;
      const accountSize = settings.accountSizeComfortable;
      
      if (prevTrading + prevProfit + prevCash < accountSize) {
        tradingAccount = prevTrading + prevProfit + prevCash;
      } else if (prevTrading + prevCash >= accountSize) {
        tradingAccount = prevTrading + prevCash;
      } else {
        tradingAccount = accountSize;
      }
    }

    const goalPercent = settings.rowGoalPercents[i] || 60;
    const tradingProfits = tradingAccount * (goalPercent / 100);
    const cashInOut = settings.rowCashInOut[i] || 0;

    // Excess Profits (Version-2 formula)
    let excessProfits = 0;
    if (!isFirstRow) {
      const prevTrading = prevRow!.tradingAccount;
      const accountSize = settings.accountSizeComfortable;
      
      if (prevTrading + tradingProfits + cashInOut >= accountSize) {
        if (prevTrading + cashInOut >= accountSize) {
          excessProfits = tradingProfits;
        } else {
          excessProfits = (prevTrading + tradingProfits + cashInOut) - accountSize;
        }
      }
    }

    // Income Account
    const incomeAccount = isFirstRow 
      ? settings.currentRetirementSavings
      : prevRow!.incomeAccount * (1 + settings.incomeGoalPercent / 100) + excessProfits;

    // Passive Income
    const passiveIncome = incomeAccount * (settings.incomeGoalPercent / 100);

    // RPIC Index
    const rpicIndex = settings.costOfLiving > 0 
      ? (passiveIncome / settings.costOfLiving) * 100 
      : 0;

    rows.push({
      year,
      tradingAccount,
      goalPercent,
      tradingProfits,
      cashInOut,
      excessProfits,
      incomeAccount,
      passiveIncome,
      rpicIndex
    });
  }

  return rows;
}
