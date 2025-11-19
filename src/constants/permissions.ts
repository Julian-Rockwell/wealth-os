import { PermissionLevel } from "@/types/trading";

export const PERMISSIONS_ORDER: PermissionLevel[] = [
  "stocks",
  "wheel", 
  "spreads",
  "naked"
];

export const PERMISSION_TEXT: Record<PermissionLevel, string> = {
  stocks: "Buy & sell stocks",
  wheel: "Sell cash secured puts & sell covered calls",
  spreads: "Spreads",
  naked: "Naked calls"
};

export const PERMISSION_TO_LEVEL: Record<PermissionLevel, number> = {
  stocks: 0,
  wheel: 1,
  spreads: 2,
  naked: 3
};

export function getHighestPermission(permissions: PermissionLevel[]): PermissionLevel {
  return permissions.reduce((highest, current) => {
    const currentIndex = PERMISSIONS_ORDER.indexOf(current);
    const highestIndex = PERMISSIONS_ORDER.indexOf(highest);
    return currentIndex > highestIndex ? current : highest;
  }, "stocks");
}

export function requiresMargin(permission: PermissionLevel): boolean {
  return PERMISSION_TO_LEVEL[permission] >= PERMISSION_TO_LEVEL["spreads"];
}
