import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { FinancialSnapshot } from "@/types/financial";
import type { DashboardData } from "@/types/dashboard";
import type { PaperTradingProgress, TradingStrategy, BrokerSetup, StrategyAssessmentAnswers, StrategyMatchResult, DerivedBrokerRequirements } from "@/types/trading";
import type { RpicResult } from "@/utils/rpicCalculations";
import type { SixMonthPlan } from "@/types/sixMonthPlan";
import { resolveStrategyAlias } from "@/constants/strategies";
import { deriveRequirementsFromStrategies } from "@/utils/deriveRequirements";
import { type TwinEngineSettings, getDefaultTwinEngineSettings } from "@/utils/twinEngineCalculations";

// Re-export TwinEngineSettings as ProjectionSettings for backward compatibility
export type ProjectionSettings = TwinEngineSettings;

interface DraftData {
  mockConnections: any[];
  files: any[];
  manualHoldings: any[];
  manualLiabilities: any[];
}

interface FinancialDataContextType {
  snapshot: FinancialSnapshot | null;
  setSnapshot: (snapshot: FinancialSnapshot | null) => void;
  dashboardData: DashboardData | null;
  setDashboardData: (data: DashboardData | null) => void;
  paperTradingData: PaperTradingProgress | null;
  setPaperTradingData: (data: PaperTradingProgress | null) => void;
  draftData: DraftData;
  setDraftData: (data: DraftData) => void;
  availableCapital: number;
  setAvailableCapital: (amount: number) => void;
  rpicResult: RpicResult | null;
  setRpicResult: (result: RpicResult | null) => void;
  selectedStrategy: TradingStrategy | null;
  setSelectedStrategy: (strategy: TradingStrategy | null) => void;
  selectedStrategies: TradingStrategy[];
  setSelectedStrategies: (strategies: TradingStrategy[]) => void;
  strategyAssessmentAnswers: StrategyAssessmentAnswers;
  setStrategyAssessmentAnswers: (answers: StrategyAssessmentAnswers) => void;
  strategyMatchResults: StrategyMatchResult[] | null;
  setStrategyMatchResults: (results: StrategyMatchResult[] | null) => void;
  brokerRequirements: DerivedBrokerRequirements | null;
  setBrokerRequirements: (requirements: DerivedBrokerRequirements | null) => void;
  monthlyIncome: number | null;
  setMonthlyIncome: (income: number | null) => void;
  brokerSetup: BrokerSetup | null;
  setBrokerSetup: (setup: BrokerSetup | null) => void;
  sixMonthPlan: SixMonthPlan | null;
  setSixMonthPlan: (plan: SixMonthPlan | null) => void;
  projectionSettings: ProjectionSettings | null;
  setProjectionSettings: (settings: ProjectionSettings | null) => void;
  resetAllData: () => void;
}

const FinancialDataContext = createContext<FinancialDataContextType | undefined>(undefined);

export const FinancialDataProvider = ({ children }: { children: ReactNode }) => {
  const [snapshot, setSnapshotState] = useState<FinancialSnapshot | null>(() => {
    const stored = localStorage.getItem("financialSnapshot");
    return stored ? JSON.parse(stored) : null;
  });

  const [dashboardData, setDashboardDataState] = useState<DashboardData | null>(() => {
    const stored = localStorage.getItem("dashboardData");
    return stored ? JSON.parse(stored) : null;
  });

  const [paperTradingData, setPaperTradingDataState] = useState<PaperTradingProgress | null>(() => {
    const stored = localStorage.getItem("paperTradingData");
    return stored ? JSON.parse(stored) : null;
  });

  const [draftData, setDraftDataState] = useState<DraftData>(() => {
    const stored = localStorage.getItem("draftData");
    return stored ? JSON.parse(stored) : {
      mockConnections: [],
      files: [],
      manualHoldings: [],
      manualLiabilities: [],
    };
  });

  const [availableCapital, setAvailableCapitalState] = useState<number>(() => {
    const stored = localStorage.getItem("availableCapital");
    return stored ? JSON.parse(stored) : 0;
  });

  const [rpicResult, setRpicResultState] = useState<RpicResult | null>(() => {
    const stored = localStorage.getItem("rpicResult");
    return stored ? JSON.parse(stored) : null;
  });

  const [selectedStrategy, setSelectedStrategyState] = useState<TradingStrategy | null>(() => {
    const stored = localStorage.getItem("selectedStrategy");
    return stored ? JSON.parse(stored) : null;
  });

  const [monthlyIncome, setMonthlyIncomeState] = useState<number | null>(() => {
    const stored = localStorage.getItem("monthlyIncome");
    return stored ? JSON.parse(stored) : null;
  });

  const [brokerSetup, setBrokerSetupState] = useState<BrokerSetup | null>(() => {
    const stored = localStorage.getItem("brokerSetup");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure wizardStep exists for backwards compatibility
      return { ...parsed, wizardStep: parsed.wizardStep || 1 };
    }
    return null;
  });

  const [selectedStrategies, setSelectedStrategiesState] = useState<TradingStrategy[]>(() => {
    const stored = localStorage.getItem("selectedStrategies");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Resolver aliases
      return Array.isArray(parsed) 
        ? parsed.map(s => resolveStrategyAlias(s))
        : [];
    }
    return [];
  });

  const [strategyAssessmentAnswers, setStrategyAssessmentAnswersState] = useState<StrategyAssessmentAnswers>(() => {
    const stored = localStorage.getItem("strategyAssessmentAnswers");
    return stored ? JSON.parse(stored) : { capital: "", risk: "", time: "", experience: "" };
  });

  const [strategyMatchResults, setStrategyMatchResultsState] = useState<StrategyMatchResult[] | null>(() => {
    const saved = localStorage.getItem("strategyMatchResults");
    return saved ? JSON.parse(saved) : null;
  });

  const [brokerRequirements, setBrokerRequirementsState] = useState<DerivedBrokerRequirements | null>(() => {
    const saved = localStorage.getItem("brokerRequirements");
    return saved ? JSON.parse(saved) : null;
  });

  const [sixMonthPlan, setSixMonthPlanState] = useState<SixMonthPlan | null>(() => {
    const stored = localStorage.getItem("sixMonthPlan");
    return stored ? JSON.parse(stored) : null;
  });

  const [projectionSettings, setProjectionSettingsState] = useState<ProjectionSettings | null>(() => {
    const stored = localStorage.getItem("projectionSettings");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Migration: Force taxRate to 0 if it was the legacy default of 18
      if (parsed.taxRate === 18) {
        parsed.taxRate = 0;
      }
      // Migration: Force currentAge to 55 if it was the old default of 20
      if (parsed.currentAge === 20) {
        parsed.currentAge = 55;
      }
      return { ...getDefaultTwinEngineSettings(), ...parsed };
    }
    return getDefaultTwinEngineSettings();
  });

  const setSnapshot = (newSnapshot: FinancialSnapshot | null) => {
    setSnapshotState(newSnapshot);
    if (newSnapshot) {
      localStorage.setItem("financialSnapshot", JSON.stringify(newSnapshot));
    } else {
      localStorage.removeItem("financialSnapshot");
    }
  };

  const setDashboardData = (newData: DashboardData | null) => {
    setDashboardDataState(newData);
    if (newData) {
      localStorage.setItem("dashboardData", JSON.stringify(newData));
    } else {
      localStorage.removeItem("dashboardData");
    }
  };

  const setPaperTradingData = (newData: PaperTradingProgress | null) => {
    setPaperTradingDataState(newData);
    if (newData) {
      localStorage.setItem("paperTradingData", JSON.stringify(newData));
    } else {
      localStorage.removeItem("paperTradingData");
    }
  };

  const setDraftData = (newData: DraftData) => {
    setDraftDataState(newData);
    localStorage.setItem("draftData", JSON.stringify(newData));
  };

  const setAvailableCapital = (amount: number) => {
    setAvailableCapitalState(amount);
    localStorage.setItem("availableCapital", JSON.stringify(amount));
  };

  const setRpicResult = (result: RpicResult | null) => {
    setRpicResultState(result);
    if (result) {
      localStorage.setItem("rpicResult", JSON.stringify(result));
    } else {
      localStorage.removeItem("rpicResult");
    }
  };

  const setSelectedStrategy = (strategy: TradingStrategy | null) => {
    setSelectedStrategyState(strategy);
    if (strategy) {
      localStorage.setItem("selectedStrategy", JSON.stringify(strategy));
    } else {
      localStorage.removeItem("selectedStrategy");
    }
  };

  const setMonthlyIncome = (income: number | null) => {
    setMonthlyIncomeState(income);
    if (income !== null) {
      localStorage.setItem("monthlyIncome", JSON.stringify(income));
    } else {
      localStorage.removeItem("monthlyIncome");
    }
  };

  const setBrokerSetup = (setup: BrokerSetup | null) => {
    setBrokerSetupState(setup);
    if (setup) {
      localStorage.setItem("brokerSetup", JSON.stringify(setup));
    } else {
      localStorage.removeItem("brokerSetup");
    }
  };

  const setSelectedStrategies = (strategies: TradingStrategy[]) => {
    setSelectedStrategiesState(strategies);
    localStorage.setItem("selectedStrategies", JSON.stringify(strategies));
    
    // Auto-derivar requirements
    const requirements = deriveRequirementsFromStrategies(strategies);
    setBrokerRequirements(requirements);
  };

  const setStrategyAssessmentAnswers = (answers: StrategyAssessmentAnswers) => {
    setStrategyAssessmentAnswersState(answers);
    localStorage.setItem("strategyAssessmentAnswers", JSON.stringify(answers));
  };

  const setStrategyMatchResults = (results: StrategyMatchResult[] | null) => {
    setStrategyMatchResultsState(results);
    if (results) {
      localStorage.setItem("strategyMatchResults", JSON.stringify(results));
    } else {
      localStorage.removeItem("strategyMatchResults");
    }
  };

  const setBrokerRequirements = (requirements: DerivedBrokerRequirements | null) => {
    setBrokerRequirementsState(requirements);
    if (requirements) {
      localStorage.setItem("brokerRequirements", JSON.stringify(requirements));
    } else {
      localStorage.removeItem("brokerRequirements");
    }
  };

  const setSixMonthPlan = (plan: SixMonthPlan | null) => {
    setSixMonthPlanState(plan);
    if (plan) {
      localStorage.setItem("sixMonthPlan", JSON.stringify(plan));
    } else {
      localStorage.removeItem("sixMonthPlan");
    }
  };

  const setProjectionSettings = (settings: ProjectionSettings | null) => {
    setProjectionSettingsState(settings);
    if (settings) {
      localStorage.setItem("projectionSettings", JSON.stringify(settings));
    } else {
      localStorage.removeItem("projectionSettings");
    }
  };

  const resetAllData = () => {
    setSnapshotState(null);
    setDashboardDataState(null);
    setPaperTradingDataState(null);
    setDraftDataState({
      mockConnections: [],
      files: [],
      manualHoldings: [],
      manualLiabilities: [],
    });
    setAvailableCapitalState(0);
    setRpicResultState(null);
    setSelectedStrategyState(null);
    setSelectedStrategiesState([]);
    setStrategyAssessmentAnswersState({ capital: "", risk: "", time: "", experience: "" });
    setStrategyMatchResultsState(null);
    setBrokerRequirementsState(null);
    setMonthlyIncomeState(null);
    setBrokerSetupState(null);
    setSixMonthPlanState(null);
    setProjectionSettingsState(null);
    localStorage.removeItem("financialSnapshot");
    localStorage.removeItem("dashboardData");
    localStorage.removeItem("paperTradingData");
    localStorage.removeItem("draftData");
    localStorage.removeItem("availableCapital");
    localStorage.removeItem("rpicResult");
    localStorage.removeItem("selectedStrategy");
    localStorage.removeItem("selectedStrategies");
    localStorage.removeItem("strategyAssessmentAnswers");
    localStorage.removeItem("strategyMatchResults");
    localStorage.removeItem("brokerRequirements");
    localStorage.removeItem("monthlyIncome");
    localStorage.removeItem("brokerSetup");
    localStorage.removeItem("sixMonthPlan");
    localStorage.removeItem("projectionSettings");
  };

  return (
    <FinancialDataContext.Provider
      value={{
        snapshot,
        setSnapshot,
        dashboardData,
        setDashboardData,
        paperTradingData,
        setPaperTradingData,
        draftData,
        setDraftData,
        availableCapital,
        setAvailableCapital,
        rpicResult,
        setRpicResult,
        selectedStrategy,
        setSelectedStrategy,
        selectedStrategies,
        setSelectedStrategies,
        strategyAssessmentAnswers,
        setStrategyAssessmentAnswers,
        strategyMatchResults,
        setStrategyMatchResults,
        brokerRequirements,
        setBrokerRequirements,
      monthlyIncome,
      setMonthlyIncome,
      brokerSetup,
      setBrokerSetup,
      sixMonthPlan,
      setSixMonthPlan,
      projectionSettings,
      setProjectionSettings,
      resetAllData,
    }}
  >
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => {
  const context = useContext(FinancialDataContext);
  if (context === undefined) {
    throw new Error("useFinancialData must be used within a FinancialDataProvider");
  }
  return context;
};
