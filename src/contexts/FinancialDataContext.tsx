import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { FinancialSnapshot } from "@/types/financial";
import type { DashboardData } from "@/types/dashboard";
import type { PaperTradingProgress, TradingStrategy } from "@/types/trading";
import type { RpicResult } from "@/utils/rpicCalculations";

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
  monthlyIncome: number | null;
  setMonthlyIncome: (income: number | null) => void;
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
    setMonthlyIncomeState(null);
    localStorage.removeItem("financialSnapshot");
    localStorage.removeItem("dashboardData");
    localStorage.removeItem("paperTradingData");
    localStorage.removeItem("draftData");
    localStorage.removeItem("availableCapital");
    localStorage.removeItem("rpicResult");
    localStorage.removeItem("selectedStrategy");
    localStorage.removeItem("monthlyIncome");
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
        monthlyIncome,
        setMonthlyIncome,
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
