import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { Holding } from "@/types/financial";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { useFinancialData } from "@/contexts/FinancialDataContext";

interface LiquidAssetsPanelProps {
  holdings: Holding[];
}

export const LiquidAssetsPanel = ({ holdings }: LiquidAssetsPanelProps) => {
  const [includeRetirement, setIncludeRetirement] = useState(false);
  const { setAvailableCapital } = useFinancialData();

  const liquidAssets = holdings
    .filter(h => h.liquidity === "liquid")
    .reduce((sum, h) => sum + h.balance, 0);

  const emergencyFundReserve = liquidAssets * 0.25; // 25% as placeholder
  const availableToInvest = liquidAssets - emergencyFundReserve;

  const retirementAssets = holdings
    .filter(h => h.accountType === "401k" || h.accountType === "IRA")
    .reduce((sum, h) => sum + h.balance, 0);

  const totalAvailable = includeRetirement ? availableToInvest + retirementAssets : availableToInvest;

  // Update context whenever totalAvailable changes
  useEffect(() => {
    setAvailableCapital(totalAvailable);
  }, [totalAvailable, setAvailableCapital]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Liquid Assets */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Liquid Assets</p>
          <p className="text-2xl font-bold text-primary">
            ${liquidAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Emergency Fund Reserve */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Emergency Fund Reserve</p>
          <p className="text-lg font-semibold">
            ${emergencyFundReserve.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Available to Invest */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Available to Invest</p>
          <p className="text-lg font-semibold text-success">
            ${availableToInvest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Total Available */}
        <div className="bg-success/10 p-4 rounded-lg border border-success/20">
          <p className="text-sm text-muted-foreground mb-1">Total Available</p>
          <p className="text-2xl font-bold text-success">
            ${totalAvailable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Include Retirement Toggle */}
      <div className="mt-6 pt-4 border-t flex items-center justify-between">
        <Label htmlFor="retirement-toggle" className="text-sm">
          Include Retirement Accounts
        </Label>
        <Switch
          id="retirement-toggle"
          checked={includeRetirement}
          onCheckedChange={setIncludeRetirement}
        />
      </div>

      {includeRetirement && (
        <div className="flex justify-between items-center text-xs mt-2 text-muted-foreground">
          <span>+ Retirement Assets</span>
          <span className="font-medium">
            ${retirementAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}
    </>
  );
};

