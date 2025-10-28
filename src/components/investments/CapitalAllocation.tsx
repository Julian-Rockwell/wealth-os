import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, AlertTriangle, DollarSign } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import type { FinancialSnapshot } from "@/types/financial";
import type { TradingStrategy } from "@/types/trading";
import { calculateAllocationWaterfall } from "@/utils/investmentCalculations";
import { StrategySelector } from "./StrategySelector";
import { useFinancialData } from "@/contexts/FinancialDataContext";

interface CapitalAllocationProps {
  snapshot: FinancialSnapshot;
}

export function CapitalAllocation({ snapshot }: CapitalAllocationProps) {
  const { availableCapital } = useFinancialData();
  const [emergencyFundMonths, setEmergencyFundMonths] = useState<number>(6);
  const [emergencyFundInstrument, setEmergencyFundInstrument] = useState<string>("TBIL");
  const [maxTradingAccountCap, setMaxTradingAccountCap] = useState<number>(100000);
  const [currentTradingAccountValue, setCurrentTradingAccountValue] = useState<number>(0);
  const [selectedStrategy, setSelectedStrategy] = useState<TradingStrategy | null>(null);
  
  const allocation = calculateAllocationWaterfall(
    snapshot,
    emergencyFundMonths,
    maxTradingAccountCap,
    currentTradingAccountValue
  );
  
  const multiStrategyUnlocked = currentTradingAccountValue >= 50000;

  const handleAcceptRecommendation = () => {
    toast.success("Allocation saved successfully");
  };

  const handleLearnMore = () => {
    toast.info("Opening allocation education resources...");
  };

  const getBarColor = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-500";
      case "red": return "bg-red-500";
      case "orange": return "bg-orange-500";
      case "green": return "bg-green-500";
      case "yellow": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Capital Allocation Strategy</h3>
        <p className="text-sm text-muted-foreground">
          100% to active trading until cap, then feeding to passive income
        </p>
      </div>

      {/* Available Capital from Dashboard */}
      {availableCapital > 0 && (
        <Alert className="border-primary bg-primary/10">
          <DollarSign className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary-foreground">
            <strong>Liquid Assets Available:</strong> ${availableCapital.toLocaleString('en-US', { minimumFractionDigits: 2 })} 
            {" "}(from Dashboard → Liquid Assets Panel)
          </AlertDescription>
        </Alert>
      )}

      {/* Feeding Status Alert */}
      {allocation.feedingToPassive && (
        <Alert className="border-success bg-success/10">
          <AlertTriangle className="h-4 w-4 text-success" />
          <AlertDescription className="text-success-foreground">
            <strong>Feeding Mode Active:</strong> Trading account has reached cap (${maxTradingAccountCap.toLocaleString()}). 
            All new capital flows to passive income reserve.
          </AlertDescription>
        </Alert>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Controls + Recommendation */}
        <div className="space-y-6">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Allocation Parameters</CardTitle>
              <CardDescription>Adjust your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Emergency Fund Target</Label>
                  <Select
                    value={emergencyFundMonths.toString()}
                    onValueChange={(v) => setEmergencyFundMonths(Number(v))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="4">4 months</SelectItem>
                      <SelectItem value="5">5 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Emergency Fund Instrument</Label>
                  <Select
                    value={emergencyFundInstrument}
                    onValueChange={setEmergencyFundInstrument}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TBIL">T-Bills (TBIL)</SelectItem>
                      <SelectItem value="HYSA">High-Yield Savings (HYSA)</SelectItem>
                      <SelectItem value="Money Market">Money Market Fund</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    ⚠️ Never use emergency fund for trading
                  </p>
                </div>

                <Separator />
                
                <div>
                  <Label className="text-sm font-medium">Trading Account Cap</Label>
                  <Input
                    type="number"
                    value={maxTradingAccountCap}
                    onChange={(e) => setMaxTradingAccountCap(Number(e.target.value))}
                    className="mt-2"
                    min={10000}
                    step={10000}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Max capital for active trading (default: $100K)
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Current Trading Account Value</Label>
                  <Input
                    type="number"
                    value={currentTradingAccountValue}
                    onChange={(e) => setCurrentTradingAccountValue(Number(e.target.value))}
                    className="mt-2"
                    min={0}
                    step={1000}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Current value of your active trading account
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation Summary */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Recommended Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Active Trading Account</div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                      {allocation.activeAccount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {allocation.feedingToPassive ? "Cap reached" : "100% until cap"}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">
                      {allocation.feedingToPassive ? "Passive Income Reserve" : "Liquid Reserve"}
                    </div>
                    <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                      {allocation.reserve.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {allocation.feedingToPassive ? "Receiving 100% of utilities" : "For opportunities"}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Strategy:</strong> {allocation.feedingToPassive 
                      ? "Feed all profits to passive income account until 12+ months stable at ≥20% return"
                      : "Allocate 100% to trading until account reaches cap"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleAcceptRecommendation} disabled={!selectedStrategy}>
                    {selectedStrategy ? "Accept Recommendation" : "Select Strategy First"}
                  </Button>
                  <Button variant="outline" onClick={handleLearnMore}>
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Selector */}
          <StrategySelector
            selectedStrategy={selectedStrategy}
            onStrategySelect={setSelectedStrategy}
            currentTradingAccountValue={currentTradingAccountValue}
            multiStrategyUnlocked={multiStrategyUnlocked}
          />
        </div>

        {/* Right column: Waterfall Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Capital Waterfall</CardTitle>
            <CardDescription>
              Step-by-step allocation from total liquid assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Total Liquid Assets */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Total Liquid Assets</span>
                  <span className="font-bold">
                    {allocation.totalLiquid.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </span>
                </div>
                <div className="h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                  Starting Point
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-red-500" />
              </div>

              {/* Emergency Fund */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">- Emergency Fund ({emergencyFundMonths} months)</span>
                  <span className="font-bold text-red-600">
                    -{allocation.emergencyFund.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </span>
                </div>
                <div className="h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-semibold">
                  Reserved for Safety
                </div>
              </div>

              {allocation.debtPayoff > 0 && (
                <>
                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500" />
                  </div>

                  {/* Debt Payoff */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">- High-Interest Debt Payoff</span>
                      <span className="font-bold text-orange-600">
                        -{allocation.debtPayoff.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </span>
                    </div>
                    <div className="h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-semibold">
                      Eliminate High APR
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-center">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-green-500" />
              </div>

              {/* Available for Investing */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Available for Investing</span>
                  <span className="text-xl font-bold text-green-600">
                    {allocation.availableForInvesting.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Active Account */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    Active Trading Account {allocation.feedingToPassive ? "(Capped)" : "(100%)"}
                  </span>
                  <span className="font-bold text-green-600">
                    {allocation.activeAccount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </span>
                </div>
                <div className={`h-12 rounded-lg flex items-center justify-center text-white font-semibold ${
                  allocation.feedingToPassive ? "bg-green-700" : "bg-green-500"
                }`}>
                  {allocation.feedingToPassive ? "Cap Reached" : "For Active Trading"}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-yellow-500" />
              </div>

              {/* Liquid/Passive Reserve */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {allocation.feedingToPassive ? "Passive Income Reserve" : "Liquid Reserve"}
                  </span>
                  <span className="font-bold text-yellow-600">
                    {allocation.reserve.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </span>
                </div>
                <div className={`h-12 rounded-lg flex items-center justify-center text-white font-semibold ${
                  allocation.feedingToPassive ? "bg-yellow-600" : "bg-yellow-500"
                }`}>
                  {allocation.feedingToPassive ? "Receiving Profits" : "Opportunity Fund"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
