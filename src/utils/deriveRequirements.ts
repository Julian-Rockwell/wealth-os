import { TradingStrategy, DerivedBrokerRequirements } from "@/types/trading";
import { STRATEGY_ALIGNMENT } from "@/utils/strategyAlignmentMatrix";
import { 
  getHighestPermission, 
  requiresMargin, 
  PERMISSION_TEXT 
} from "@/constants/permissions";

export function deriveRequirementsFromStrategies(
  selectedStrategies: TradingStrategy[],
  experienceLevel?: number
): DerivedBrokerRequirements {
  if (selectedStrategies.length === 0) {
    return {
      requiredPermission: "stocks",
      requiredPermissionText: PERMISSION_TEXT["stocks"],
      minBalance: 0,
      accountType: "cash",
      derivedFrom: []
    };
  }
  
  // Obtener requisitos de cada estrategia
  const permissions = selectedStrategies.map(
    s => STRATEGY_ALIGNMENT[s].requiredPermission
  );
  const balances = selectedStrategies.map(
    s => STRATEGY_ALIGNMENT[s].minSuggested
  );
  
  // Calcular máximos
  const requiredPermission = getHighestPermission(permissions);
  const minBalance = Math.max(...balances);
  
  // Derivar Account Type desde Experience Level (Rockwell recommendation)
  let accountType: "cash" | "margin" | "cash or margin" = "cash";
  if (experienceLevel) {
    if (experienceLevel >= 4) {
      accountType = "cash or margin"; // Experience 4-5: can choose
    } else {
      accountType = "cash"; // Experience 1-3: cash only (beginner-friendly)
    }
  } else if (requiresMargin(requiredPermission)) {
    // Fallback: if permission requires margin
    accountType = "margin";
  }
  
  return {
    requiredPermission,
    requiredPermissionText: PERMISSION_TEXT[requiredPermission],
    minBalance,
    accountType,
    derivedFrom: selectedStrategies
  };
}
