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
  
  // POLICY: Default Account Type = Margin for ALL experience levels
  const accountType: "cash" | "margin" | "cash or margin" = "margin";
  
  console.log('broker_setup_accountType_recommended: "margin"');
  
  return {
    requiredPermission,
    requiredPermissionText: PERMISSION_TEXT[requiredPermission],
    minBalance,
    accountType,
    derivedFrom: selectedStrategies
  };
}
