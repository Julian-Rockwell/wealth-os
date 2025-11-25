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

export interface ChartDataPoint {
  year: number;
  passiveIncome: number;
  activeProfitNet: number;
  otherIncome: number;
  traditionalSafeIncome: number;
  adjustedExpenses: number;
}

export function calculateChartData(settings: ProjectionSettings): ChartDataPoint[] {
  const rows = calculateProjectionRows(settings);
  const inflationRate = settings.inflationPercent / 100;
  
  return rows.map((row, index) => {
    // Active Profit Net: max(0, tradingProfits - excessProfits)
    // After trading limit reached, clamp to 0
    let activeProfitNet = Math.max(0, row.tradingProfits - row.excessProfits);
    if (row.tradingAccount >= settings.accountSizeComfortable && index > 0) {
      activeProfitNet = 0;
    }

    // Adjusted Expenses: costOfLiving * (1 + inflation)^yearIndex
    const adjustedExpenses = settings.costOfLiving * Math.pow(1 + inflationRate, index);

    // Traditional Safe Income: 4% of income account
    const traditionalSafeIncome = row.incomeAccount * 0.04;

    return {
      year: row.year,
      passiveIncome: row.passiveIncome,
      activeProfitNet,
      otherIncome: 0, // Placeholder for future
      traditionalSafeIncome,
      adjustedExpenses,
    };
  });
}

export interface ProjectionMilestones {
  wealthOSFreedomYear: number | null;
  stopTradingYear: number | null;
  traditionalFreedomYear: number | null;
}

export function calculateProjectionMilestones(settings: ProjectionSettings): ProjectionMilestones {
  const chartData = calculateChartData(settings);
  
  let wealthOSFreedomYear: number | null = null;
  let stopTradingYear: number | null = null;
  let traditionalFreedomYear: number | null = null;

  for (const point of chartData) {
    // Wealth OS Freedom: first year where passiveIncome >= adjustedExpenses
    if (wealthOSFreedomYear === null && point.passiveIncome >= point.adjustedExpenses) {
      wealthOSFreedomYear = point.year;
    }

    // Traditional Freedom: first year where traditionalSafeIncome >= adjustedExpenses
    if (traditionalFreedomYear === null && point.traditionalSafeIncome >= point.adjustedExpenses) {
      traditionalFreedomYear = point.year;
    }
  }

  // Stop Trading: first year where tradingAccount >= accountSizeComfortable
  const rows = calculateProjectionRows(settings);
  for (const row of rows) {
    if (stopTradingYear === null && row.tradingAccount >= settings.accountSizeComfortable) {
      stopTradingYear = row.year;
      break;
    }
  }

  return {
    wealthOSFreedomYear,
    stopTradingYear,
    traditionalFreedomYear,
  };
}

export interface ProjectionKPIs {
  freedomYear: number | null;
  timeSaved: number | null;
  wealthOSCapital: number | null;
  traditionalCapital: number | null;
  capitalDifferencePercent: number | null;
}

export function calculateProjectionKPIs(settings: ProjectionSettings): ProjectionKPIs {
  const milestones = calculateProjectionMilestones(settings);
  const rows = calculateProjectionRows(settings);
  const chartData = calculateChartData(settings);

  // Freedom Year = Wealth OS Freedom Year
  const freedomYear = milestones.wealthOSFreedomYear;

  // Time Saved = Traditional - Wealth OS
  let timeSaved: number | null = null;
  if (milestones.traditionalFreedomYear !== null && milestones.wealthOSFreedomYear !== null) {
    timeSaved = milestones.traditionalFreedomYear - milestones.wealthOSFreedomYear;
  }

  // Wealth OS Capital = incomeAccount at freedom year
  let wealthOSCapital: number | null = null;
  if (freedomYear !== null) {
    const freedomRow = rows.find(r => r.year === freedomYear);
    if (freedomRow) {
      wealthOSCapital = freedomRow.incomeAccount;
    }
  }

  // Traditional Capital = adjustedExpenses / 0.04 at freedom year
  let traditionalCapital: number | null = null;
  if (freedomYear !== null) {
    const freedomPoint = chartData.find(p => p.year === freedomYear);
    if (freedomPoint) {
      traditionalCapital = freedomPoint.adjustedExpenses / 0.04;
    }
  }

  // Capital Difference %
  let capitalDifferencePercent: number | null = null;
  if (wealthOSCapital !== null && traditionalCapital !== null && traditionalCapital > 0) {
    capitalDifferencePercent = ((traditionalCapital - wealthOSCapital) / traditionalCapital) * 100;
  }

  return {
    freedomYear,
    timeSaved,
    wealthOSCapital,
    traditionalCapital,
    capitalDifferencePercent,
  };
}
