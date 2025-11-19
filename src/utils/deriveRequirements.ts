import { TradingStrategy, DerivedBrokerRequirements } from "@/types/trading";
import { STRATEGY_ALIGNMENT } from "@/utils/strategyAlignmentMatrix";
import { 
  getHighestPermission, 
  requiresMargin, 
  PERMISSION_TEXT 
} from "@/constants/permissions";

export function deriveRequirementsFromStrategies(
  selectedStrategies: TradingStrategy[]
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
  const accountType = requiresMargin(requiredPermission) ? "margin" : "cash";
  
  return {
    requiredPermission,
    requiredPermissionText: PERMISSION_TEXT[requiredPermission],
    minBalance,
    accountType,
    derivedFrom: selectedStrategies
  };
}
