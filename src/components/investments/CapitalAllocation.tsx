import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { toast } from "sonner";
import type { FinancialSnapshot } from "@/types/financial";
import { calculateAllocationWaterfall } from "@/utils/investmentCalculations";

interface CapitalAllocationProps {
  snapshot: FinancialSnapshot;
}

export function CapitalAllocation({ snapshot }: CapitalAllocationProps) {
  const [emergencyFundMonths, setEmergencyFundMonths] = useState<number>(6);
  const [activeAccountPercent, setActiveAccountPercent] = useState<number>(60);
  
  const allocation = calculateAllocationWaterfall(snapshot, emergencyFundMonths);
  const reservePercent = 100 - activeAccountPercent;
  
  const customActiveAccount = allocation.availableForInvesting * (activeAccountPercent / 100);
  const customReserve = allocation.availableForInvesting * (reservePercent / 100);

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
          Systematic waterfall from liquid assets to active investment capital
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Allocation Parameters</CardTitle>
          <CardDescription>Adjust your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium mb-2">Emergency Fund Target</div>
              <Select
                value={emergencyFundMonths.toString()}
                onValueChange={(v) => setEmergencyFundMonths(Number(v))}
              >
                <SelectTrigger>
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
              <div className="text-sm font-medium mb-2">
                Active Account Allocation: {activeAccountPercent}%
              </div>
              <Slider
                value={[activeAccountPercent]}
                onValueChange={(v) => setActiveAccountPercent(v[0])}
                min={40}
                max={60}
                step={5}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>40%</span>
                <span>50%</span>
                <span>60%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Waterfall Visualization */}
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
                <span className="text-sm font-medium">Active Trading Account ({activeAccountPercent}%)</span>
                <span className="font-bold text-green-600">
                  {customActiveAccount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </span>
              </div>
              <div className="h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-semibold">
                For Active Trading
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-yellow-500" />
            </div>

            {/* Liquid Reserve */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Liquid Reserve ({reservePercent}%)</span>
                <span className="font-bold text-yellow-600">
                  {customReserve.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </span>
              </div>
              <div className="h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-semibold">
                Opportunity Fund
              </div>
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
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Active Trading Account</div>
                <div className="text-2xl font-bold text-green-700">
                  {customActiveAccount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {activeAccountPercent}% of available capital
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Liquid Reserve</div>
                <div className="text-2xl font-bold text-yellow-700">
                  {customReserve.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {reservePercent}% for opportunities
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAcceptRecommendation}>
                Accept Recommendation
              </Button>
              <Button variant="outline" onClick={handleLearnMore}>
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
