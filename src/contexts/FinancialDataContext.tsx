import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { FinancialSnapshot } from "@/types/financial";
import type { DashboardData } from "@/types/dashboard";

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
  draftData: DraftData;
  setDraftData: (data: DraftData) => void;
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

  const [draftData, setDraftDataState] = useState<DraftData>(() => {
    const stored = localStorage.getItem("draftData");
    return stored ? JSON.parse(stored) : {
      mockConnections: [],
      files: [],
      manualHoldings: [],
      manualLiabilities: [],
    };
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

  const setDraftData = (newData: DraftData) => {
    setDraftDataState(newData);
    localStorage.setItem("draftData", JSON.stringify(newData));
  };

  const resetAllData = () => {
    setSnapshotState(null);
    setDashboardDataState(null);
    setDraftDataState({
      mockConnections: [],
      files: [],
      manualHoldings: [],
      manualLiabilities: [],
    });
    localStorage.removeItem("financialSnapshot");
    localStorage.removeItem("dashboardData");
    localStorage.removeItem("draftData");
  };

  return (
    <FinancialDataContext.Provider
      value={{
        snapshot,
        setSnapshot,
        dashboardData,
        setDashboardData,
        draftData,
        setDraftData,
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
