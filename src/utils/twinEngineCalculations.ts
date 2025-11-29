// Twin-Engine Projection Calculation Model
// Separate Active and Passive balances with Traditional benchmark

export interface TwinEngineSettings {
  // Foundation
  currentAge: number;
  savingsPassive: number;
  savingsActive: number;
  monthlyContrib: number;
  
  // Lifestyle
  annualExpenses: number;
  inflationRate: number;
  enableStepDown: boolean;
  stepDownAge: number;
  stepDownPercent: number;
  
  // Wealth OS Strategy
  tradingCap: number;
  activeReturn: number;
  passiveYield: number;
  activeDuration: number;
  activeCashOutPercent: number;
  taxRate: number;
  
  // Withdrawal Plan
  withdrawalStrategy: 'growth' | 'freedom' | 'custom';
  customWithdrawalYear: number;
  customWithdrawalAmount: number;
  retirementIncome: number;
  
  // Benchmark
  tradReturn: number;
  
  // System
  startYear: number;
}

export interface TwinEngineRow {
  year: number;
  age: number;
  
  // Balances
  activeBalance: number;
  passiveBalance: number;
  totalWealthOS: number;
  tradBalance: number;
  
  // Income Flows
  activeProfitNet: number;
  passiveIncome: number;
  tradSafeIncome: number;
  expenses: number;
  retirementIncome: number;
  
  // Ledger Details
  activeProfitGross: number;
  activeTax: number;
  spilloverNet: number;
  passiveGrowth: number;
  withdrawalAmount: number;
  withdrawalTax: number;
  
  netWallet: number;
  tradWithdrawal: number;
  
  rpicScore: number;
  
  // Flags
  isCapHit: boolean;
  isFreedom: boolean;
  isActivePhase: boolean;
}

export interface TwinEngineMilestones {
  capHitYear: number | null;
  freedomYear: number | null;
  tradFreedomYear: number | null;
  activeStoppedYear: number | null;
  wealthOSCapitalNeeded: number;
  tradCapitalNeeded: number;
}

export interface TwinEngineResult {
  rows: TwinEngineRow[];
  milestones: TwinEngineMilestones;
}

export function calculateTwinEngineProjection(settings: TwinEngineSettings): TwinEngineResult {
  const {
    currentAge,
    savingsPassive,
    savingsActive,
    monthlyContrib,
    annualExpenses,
    inflationRate,
    enableStepDown,
    stepDownAge,
    stepDownPercent,
    tradingCap,
    activeReturn,
    passiveYield,
    activeDuration,
    activeCashOutPercent,
    taxRate,
    withdrawalStrategy,
    customWithdrawalYear,
    customWithdrawalAmount,
    retirementIncome,
    tradReturn,
    startYear
  } = settings;

  const data: TwinEngineRow[] = [];
  const endYear = startYear + 40;
  const stopActiveYear = startYear + activeDuration;

  let currentActive = savingsActive;
  let currentPassive = savingsPassive;
  let currentTrad = savingsActive + savingsPassive;
  let currentExpenses = annualExpenses;

  let capHitYear: number | null = null;
  let freedomYear: number | null = null;
  let tradFreedomYear: number | null = null;
  let activeStoppedYear: number | null = null;
  let wealthOSCapitalNeeded = 0;
  let tradCapitalNeeded = 0;

  for (let year = startYear; year <= endYear; year++) {
    const age = currentAge + (year - startYear);
    const isActivePhase = year < stopActiveYear;

    // 0. Expense Step Down Logic
    if (enableStepDown && age === stepDownAge) {
      currentExpenses = currentExpenses * (1 - (stepDownPercent / 100));
    }

    // Inflation adjustment (apply after first year)
    if (year > startYear) {
      currentExpenses = currentExpenses * (1 + inflationRate / 100);
    }

    // Contributions & Other Income
    let annualContrib = monthlyContrib * 12;
    const annualRetirementIncome = retirementIncome * 12;

    // Check if we are retired (Withdrawing)
    let isRetired = false;
    if (withdrawalStrategy === 'custom' && year >= customWithdrawalYear) isRetired = true;
    if (withdrawalStrategy === 'freedom' && freedomYear && year >= freedomYear) isRetired = true;

    if (isRetired) {
      annualContrib = 0; // Stop accumulation contributions
    }

    // --- 1. TRADITIONAL PATH ---
    const tradGrowth = currentTrad * (tradReturn / 100);
    let tradContribApplied = 0;
    let tradWithdrawalApplied = 0;
    const tradSafeIncome = (currentTrad + tradGrowth) * 0.04;

    if (!tradFreedomYear && tradSafeIncome >= currentExpenses) {
      tradFreedomYear = year;
      tradCapitalNeeded = currentTrad + tradGrowth;
    }

    const isTradRetired = !!tradFreedomYear && year >= tradFreedomYear;

    if (isTradRetired) {
      tradContribApplied = 0;
      const grossWithdrawalNeeded = currentExpenses / (1 - (taxRate / 100));
      if ((currentTrad + tradGrowth) >= grossWithdrawalNeeded) {
        tradWithdrawalApplied = grossWithdrawalNeeded;
      } else {
        tradWithdrawalApplied = currentTrad + tradGrowth;
      }
      currentTrad = currentTrad + tradGrowth - tradWithdrawalApplied;
    } else {
      tradContribApplied = monthlyContrib * 12;
      currentTrad = currentTrad + tradGrowth + tradContribApplied;
    }

    // --- 2. WEALTH OS LOGIC ---
    let contribToActive = 0;
    let contribToPassive = 0;
    let activeProfitGross = 0;
    let activeTax = 0;
    let activeProfitNet = 0;
    let spilloverNet = 0;
    let cashOutEventAmount = 0;

    // Passive growth (start of year)
    let passiveGrowth = currentPassive * (passiveYield / 100);
    let withdrawalAmount = 0;
    let withdrawalTax = 0;

    // A. ACTIVE ENGINE
    if (isActivePhase) {
      if (currentActive < tradingCap) {
        const roomInActive = tradingCap - currentActive;
        if (annualContrib <= roomInActive) {
          contribToActive = annualContrib;
        } else {
          contribToActive = roomInActive;
          contribToPassive = annualContrib - roomInActive;
        }
      } else {
        contribToPassive = annualContrib;
      }

      activeProfitGross = currentActive * (activeReturn / 100);
      activeTax = activeProfitGross * (taxRate / 100);
      activeProfitNet = activeProfitGross - activeTax;

      let potentialActiveBalance = currentActive + activeProfitNet + contribToActive;
      if (potentialActiveBalance > tradingCap) {
        spilloverNet = potentialActiveBalance - tradingCap;
        currentActive = tradingCap;
        if (!capHitYear) capHitYear = year;
      } else {
        currentActive = potentialActiveBalance;
      }
    } else {
      // After active phase ends
      if (!activeStoppedYear) {
        activeStoppedYear = year;
        // Liquidate active account
        const cashOutAmount = currentActive * (activeCashOutPercent / 100);
        cashOutEventAmount = cashOutAmount * (1 - taxRate / 100);
        const moveToPassive = currentActive - cashOutAmount;
        currentPassive += moveToPassive;
        currentActive = 0;
      }
      contribToPassive = annualContrib;
    }

    // B. FREEDOM TRIGGER
    const passiveIncomeGen = passiveGrowth;
    const rpicScore = currentExpenses > 0 ? (passiveIncomeGen / currentExpenses) * 100 : 0;

    if (!freedomYear && rpicScore >= 100) {
      freedomYear = year;
      wealthOSCapitalNeeded = currentActive + currentPassive;
    }

    // C. WITHDRAWAL ENGINE
    let netNeeded = 0;
    if (isRetired || (freedomYear && year >= freedomYear)) {
      if (withdrawalStrategy === 'freedom' || (withdrawalStrategy === 'growth' && freedomYear && year >= freedomYear)) {
        netNeeded = Math.max(0, currentExpenses - annualRetirementIncome);
      } else if (withdrawalStrategy === 'custom') {
        netNeeded = Math.max(0, customWithdrawalAmount - annualRetirementIncome);
      }
    }

    let surplusIncome = 0;
    if (isRetired || (freedomYear && year >= freedomYear)) {
      const baseNeed = withdrawalStrategy === 'custom' ? customWithdrawalAmount : currentExpenses;
      if (annualRetirementIncome > baseNeed) {
        surplusIncome = annualRetirementIncome - baseNeed;
        netNeeded = 0;
      }
    }

    if (netNeeded > 0) {
      withdrawalAmount = netNeeded / (1 - (taxRate / 100));
      withdrawalTax = withdrawalAmount * (taxRate / 100);

      if (currentPassive < withdrawalAmount) {
        withdrawalAmount = currentPassive;
        withdrawalTax = withdrawalAmount * (taxRate / 100);
      }
    }

    // D. PASSIVE BALANCE UPDATE
    let nextPassiveBalance = currentPassive + passiveGrowth + contribToPassive
      + spilloverNet + surplusIncome - withdrawalAmount;
    if (nextPassiveBalance < 0) nextPassiveBalance = 0;

    // E. RECORD DATA
    const netWalletBase = withdrawalAmount - withdrawalTax;
    const totalWallet = netWalletBase + annualRetirementIncome;

    data.push({
      year,
      age,
      activeBalance: Math.round(currentActive),
      passiveBalance: Math.round(currentPassive),
      totalWealthOS: Math.round(currentActive + currentPassive),
      tradBalance: Math.round(currentTrad),
      activeProfitNet: Math.round(activeProfitNet),
      passiveIncome: Math.round(passiveGrowth),
      tradSafeIncome: Math.round(tradSafeIncome),
      expenses: Math.round(currentExpenses),
      retirementIncome: Math.round(annualRetirementIncome),
      activeProfitGross: Math.round(activeProfitGross),
      activeTax: Math.round(activeTax),
      spilloverNet: Math.round(spilloverNet),
      passiveGrowth: Math.round(passiveGrowth),
      withdrawalAmount: Math.round(withdrawalAmount),
      withdrawalTax: Math.round(withdrawalTax),
      netWallet: Math.round(totalWallet + cashOutEventAmount),
      tradWithdrawal: Math.round(tradWithdrawalApplied),
      rpicScore: parseFloat(rpicScore.toFixed(1)),
      isCapHit: !!capHitYear && year >= capHitYear,
      isFreedom: !!freedomYear && year >= freedomYear,
      isActivePhase
    });

    // Update passive for next iteration
    currentPassive = nextPassiveBalance;
  }

  return {
    rows: data,
    milestones: {
      capHitYear,
      freedomYear,
      tradFreedomYear,
      activeStoppedYear,
      wealthOSCapitalNeeded,
      tradCapitalNeeded
    }
  };
}

export function getDefaultTwinEngineSettings(): TwinEngineSettings {
  const currentYear = new Date().getFullYear();
  return {
    currentAge: 55,
    savingsPassive: 400000,
    savingsActive: 100000,
    monthlyContrib: 2000,
    annualExpenses: 70000,
    inflationRate: 3.0,
    enableStepDown: false,
    stepDownAge: 75,
    stepDownPercent: 20,
    tradingCap: 200000,
    activeReturn: 30.0,
    passiveYield: 12.0,
    activeDuration: 10,
    activeCashOutPercent: 0,
    taxRate: 25.0,
    withdrawalStrategy: 'freedom',
    customWithdrawalYear: currentYear + 10,
    customWithdrawalAmount: 100000,
    retirementIncome: 0,
    tradReturn: 7.0,
    startYear: currentYear
  };
}

// KPI Calculations
export interface TwinEngineKPIs {
  freedomYear: number | null;
  freedomAge: number | null;
  timeSaved: number | null;
  wealthOSCapital: number | null;
  tradCapital: number | null;
  capitalSavedPercent: number | null;
  taxRate: number;
}

export function calculateTwinEngineKPIs(result: TwinEngineResult, settings: TwinEngineSettings): TwinEngineKPIs {
  const { milestones } = result;
  
  let timeSaved: number | null = null;
  if (milestones.tradFreedomYear && milestones.freedomYear) {
    timeSaved = milestones.tradFreedomYear - milestones.freedomYear;
  }

  let capitalSavedPercent: number | null = null;
  if (milestones.wealthOSCapitalNeeded > 0 && milestones.tradCapitalNeeded > 0) {
    capitalSavedPercent = Math.round(
      ((milestones.tradCapitalNeeded - milestones.wealthOSCapitalNeeded) / milestones.tradCapitalNeeded) * 100
    );
  }

  const freedomAge = milestones.freedomYear 
    ? settings.currentAge + (milestones.freedomYear - settings.startYear)
    : null;

  return {
    freedomYear: milestones.freedomYear,
    freedomAge,
    timeSaved,
    wealthOSCapital: milestones.wealthOSCapitalNeeded > 0 ? milestones.wealthOSCapitalNeeded : null,
    tradCapital: milestones.tradCapitalNeeded > 0 ? milestones.tradCapitalNeeded : null,
    capitalSavedPercent,
    taxRate: settings.taxRate
  };
}
