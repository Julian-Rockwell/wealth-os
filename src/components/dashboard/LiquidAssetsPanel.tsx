import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Droplet } from "lucide-react";
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
    <Card className="p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <Droplet className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Liquid Assets <span className="text-xs text-muted-foreground font-normal">(fixed examples)</span></h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-1 mb-1">
            <p className="text-sm text-muted-foreground">Total Liquid Assets</p>
            <InfoTooltip
              content={
                <div className="space-y-2">
                  <div className="font-semibold">Only includes assets accessible within 1 week:</div>
                  <div className="text-xs space-y-1">
                    <div>✓ Checking accounts</div>
                    <div>✓ Savings accounts</div>
                    <div>✓ Money market funds</div>
                  </div>
                  <div className="font-semibold mt-2">Excludes:</div>
                  <div className="text-xs space-y-1">
                    <div>✗ Brokerage (semi-liquid)</div>
                    <div>✗ Vehicles (illiquid)</div>
                    <div>✗ Real estate (illiquid)</div>
                    <div>✗ Retirement accounts (illiquid)</div>
                  </div>
                </div>
              }
            />
          </div>
          <p className="text-2xl font-bold text-primary">
            ${liquidAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Emergency Fund Reserve</span>
            <span className="text-sm font-semibold">
              ${emergencyFundReserve.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b">
            <span className="text-sm text-muted-foreground">Available to Invest</span>
            <span className="text-sm font-semibold text-success">
              ${availableToInvest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
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
            <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
              <div className="flex justify-between items-center">
                <span className="text-sm">+ Retirement Assets</span>
                <span className="text-sm font-semibold text-accent">
                  ${retirementAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}

          <div className="p-4 rounded-lg bg-success/10 border border-success/20 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Available</span>
              <span className="text-xl font-bold text-success">
                ${totalAvailable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
