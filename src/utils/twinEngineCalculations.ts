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
  
  // Lifestyle Design Persistence
  selectedGeography: 'low' | 'medium' | 'high';
  selectedLifestyle: 'essential' | 'comfort' | 'luxury';
  
  // Wealth OS Strategy
  tradingCap: number;
  activeReturn: number;
  passiveYield: number;
  activeDuration: number;
  activeCashOutPercent: number;
  taxRate: number;
  
  // NEW: Ramp Up Settings
  enableRampUp: boolean;
  rampUpDuration: number;
  
  // NEW: Yield Cap
  yieldCapPercent: number;
  
  // Withdrawal Plan
  withdrawalStrategy: 'growth' | 'freedom' | 'custom';
  customWithdrawalYear: number;
  customWithdrawalAmount: number;
  retirementIncome: number;
  
  // NEW: Retirement Income Start Age
  retirementIncomeStartAge: number;
  
  // Benchmark
  tradReturn: number;
  
  // System
  startYear: number;
  
  // NEW v4.2: Planning Horizon & Trade Indefinitely
  targetAge: number;
  tradeIndefinitely: boolean;
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
  
  // NEW: Gross Expenses and Gap
  grossExpenses: number;
  expenseShortfall: number;
  
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
  
  // NEW: Expanded Milestones
  first25kActiveYear: number | null;
  first100kActiveYear: number | null;
  first500kPassiveYear: number | null;
  first1M_PassiveYear: number | null;
  first2M_PassiveYear: number | null;
  first5M_PassiveYear: number | null;
  first10M_PassiveYear: number | null;
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
    enableRampUp,
    rampUpDuration,
    yieldCapPercent,
    withdrawalStrategy,
    customWithdrawalYear,
    customWithdrawalAmount,
    retirementIncome,
    retirementIncomeStartAge,
    tradReturn,
    startYear
  } = settings;

  const data: TwinEngineRow[] = [];
  
  // Dynamic duration: Run until targetAge (default 106), minimum 10 years
  const planningTargetAge = settings.targetAge || 106;
  const yearsToTargetAge = planningTargetAge - currentAge;
  const projectionYears = Math.max(10, yearsToTargetAge);
  const endYear = startYear + projectionYears;
  
  // Trade Indefinitely logic: if true, never stop; else use activeDuration
  const stopActiveYear = settings.tradeIndefinitely ? endYear + 1 : startYear + activeDuration;

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
  
  // Expanded milestones
  let first25kActiveYear: number | null = null;
  let first100kActiveYear: number | null = null;
  let first500kPassiveYear: number | null = null;
  let first1M_PassiveYear: number | null = null;
  let first2M_PassiveYear: number | null = null;
  let first5M_PassiveYear: number | null = null;
  let first10M_PassiveYear: number | null = null;

  for (let year = startYear; year <= endYear; year++) {
    const age = currentAge + (year - startYear);
    const isActivePhase = year < stopActiveYear;
    const yearsIntoProjection = year - startYear;

    // Calculate effective active return with Blended Rate ramp up (using months)
    let effectiveActiveReturn = activeReturn;
    if (enableRampUp) {
      const rampUpYears = rampUpDuration / 12; // Convert months to years
      const yearStart = yearsIntoProjection;
      const yearEnd = yearsIntoProjection + 1;
      
      if (yearEnd <= rampUpYears) {
        // Entire year is within ramp-up period
        // Average efficiency for this year: midpoint of year's ramp range
        const startEfficiency = 0.5 + (0.5 * (yearStart / rampUpYears));
        const endEfficiency = 0.5 + (0.5 * (yearEnd / rampUpYears));
        const avgEfficiency = (startEfficiency + endEfficiency) / 2;
        effectiveActiveReturn = activeReturn * avgEfficiency;
      } else if (yearStart >= rampUpYears) {
        // Entire year is after ramp-up - full ROI
        effectiveActiveReturn = activeReturn;
      } else {
        // Blended year: part in ramp-up, part at full ROI
        const monthsInRamp = (rampUpYears - yearStart) * 12;
        const monthsAtFull = 12 - monthsInRamp;
        
        // Average efficiency during ramp portion
        const rampStartEff = 0.5 + (0.5 * (yearStart / rampUpYears));
        const rampEndEff = 1.0; // End of ramp = 100%
        const avgRampEff = (rampStartEff + rampEndEff) / 2;
        
        // Blended rate: weighted average
        const blendedEfficiency = (monthsInRamp * avgRampEff + monthsAtFull * 1.0) / 12;
        effectiveActiveReturn = activeReturn * blendedEfficiency;
      }
    }

    // 0. Expense Step Down Logic
    if (enableStepDown && age === stepDownAge) {
      currentExpenses = currentExpenses * (1 - (stepDownPercent / 100));
    }

    // Inflation adjustment (apply after first year)
    if (year > startYear) {
      currentExpenses = currentExpenses * (1 + inflationRate / 100);
    }

    // Gross expenses (pre-tax equivalent)
    const grossExpenses = currentExpenses / (1 - (taxRate / 100));

    // Contributions & Other Income
    let annualContrib = monthlyContrib * 12;
    
    // Retirement income only starts at specified age
    const annualRetirementIncome = age >= retirementIncomeStartAge ? retirementIncome * 12 : 0;

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

      activeProfitGross = currentActive * (effectiveActiveReturn / 100);
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
      
      // Track active profit milestones
      if (!first25kActiveYear && activeProfitNet >= 25000) {
        first25kActiveYear = year;
      }
      if (!first100kActiveYear && activeProfitNet >= 100000) {
        first100kActiveYear = year;
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
    const rpicScore = grossExpenses > 0 ? (passiveIncomeGen / grossExpenses) * 100 : 0;

    if (!freedomYear && rpicScore >= 100) {
      freedomYear = year;
      wealthOSCapitalNeeded = currentActive + currentPassive;
    }

    // C. WITHDRAWAL ENGINE with Yield Cap
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

      // Apply Yield Cap - can't withdraw more than yieldCapPercent of passive income
      const maxWithdrawal = passiveGrowth * (yieldCapPercent / 100);
      if (withdrawalAmount > maxWithdrawal && maxWithdrawal > 0) {
        withdrawalAmount = maxWithdrawal;
        withdrawalTax = withdrawalAmount * (taxRate / 100);
      }

      if (currentPassive < withdrawalAmount) {
        withdrawalAmount = currentPassive;
        withdrawalTax = withdrawalAmount * (taxRate / 100);
      }
    }

    // D. PASSIVE BALANCE UPDATE
    let nextPassiveBalance = currentPassive + passiveGrowth + contribToPassive
      + spilloverNet + surplusIncome - withdrawalAmount;
    if (nextPassiveBalance < 0) nextPassiveBalance = 0;
    
    // Track passive balance milestones before updating
    if (!first500kPassiveYear && nextPassiveBalance >= 500000) {
      first500kPassiveYear = year;
    }
    if (!first1M_PassiveYear && nextPassiveBalance >= 1000000) {
      first1M_PassiveYear = year;
    }
    if (!first2M_PassiveYear && nextPassiveBalance >= 2000000) {
      first2M_PassiveYear = year;
    }
    if (!first5M_PassiveYear && nextPassiveBalance >= 5000000) {
      first5M_PassiveYear = year;
    }
    if (!first10M_PassiveYear && nextPassiveBalance >= 10000000) {
      first10M_PassiveYear = year;
    }

    // E. RECORD DATA
    const netWalletBase = withdrawalAmount - withdrawalTax;
    const totalWallet = netWalletBase + annualRetirementIncome;
    
    // Calculate expense shortfall (gap)
    const expenseShortfall = Math.max(0, currentExpenses - totalWallet);

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
      grossExpenses: Math.round(grossExpenses),
      expenseShortfall: Math.round(expenseShortfall),
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
      tradCapitalNeeded,
      first25kActiveYear,
      first100kActiveYear,
      first500kPassiveYear,
      first1M_PassiveYear,
      first2M_PassiveYear,
      first5M_PassiveYear,
      first10M_PassiveYear
    }
  };
}

export function getDefaultTwinEngineSettings(): TwinEngineSettings {
  const currentYear = new Date().getFullYear();
  return {
    currentAge: 45,
    savingsPassive: 400000,
    savingsActive: 100000,
    monthlyContrib: 2000,
    annualExpenses: 60000,
    inflationRate: 3.0,
    enableStepDown: false,
    stepDownAge: 75,
    stepDownPercent: 20,
    selectedGeography: 'medium',
    selectedLifestyle: 'comfort',
    tradingCap: 200000,
    activeReturn: 30.0,
    passiveYield: 12.0,
    activeDuration: 10,
    activeCashOutPercent: 0,
    taxRate: 0, // v4.2: Default 0%
    enableRampUp: false,
    rampUpDuration: 24,
    yieldCapPercent: 80,
    withdrawalStrategy: 'freedom',
    customWithdrawalYear: currentYear + 10,
    customWithdrawalAmount: 100000,
    retirementIncome: 0,
    retirementIncomeStartAge: 67,
    tradReturn: 7.0,
    startYear: currentYear,
    // v4.2: New settings
    targetAge: 106,
    tradeIndefinitely: true
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
  // NEW: Legacy Potential
  legacyValue: number | null;
  legacyAge: number | null;
  tradLegacyValue: number | null;
}

export function calculateTwinEngineKPIs(result: TwinEngineResult, settings: TwinEngineSettings): TwinEngineKPIs {
  const { milestones, rows } = result;
  
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

  // Calculate Legacy Potential (final row values)
  const finalRow = rows[rows.length - 1];
  const legacyValue = finalRow ? finalRow.totalWealthOS : null;
  const legacyAge = finalRow ? finalRow.age : null;
  const tradLegacyValue = finalRow ? finalRow.tradBalance : null;

  return {
    freedomYear: milestones.freedomYear,
    freedomAge,
    timeSaved,
    wealthOSCapital: milestones.wealthOSCapitalNeeded > 0 ? milestones.wealthOSCapitalNeeded : null,
    tradCapital: milestones.tradCapitalNeeded > 0 ? milestones.tradCapitalNeeded : null,
    capitalSavedPercent,
    taxRate: settings.taxRate,
    legacyValue,
    legacyAge,
    tradLegacyValue
  };
}
