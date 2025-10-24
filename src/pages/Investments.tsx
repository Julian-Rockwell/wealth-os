import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { ReadinessScore } from "@/components/investments/ReadinessScore";
import { OptimizeAssets } from "@/components/investments/OptimizeAssets";
import { CapitalAllocation } from "@/components/investments/CapitalAllocation";

export default function Investments() {
  const { snapshot } = useFinancialData();
  const [activeTab, setActiveTab] = useState("readiness");

  if (!snapshot) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Please load financial data from the Command Center first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Investment Planning</h2>
        <p className="text-muted-foreground mt-1">
          Assess readiness, optimize assets, and allocate capital strategically
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="readiness">Readiness Score</TabsTrigger>
          <TabsTrigger value="optimize">Optimize Assets</TabsTrigger>
          <TabsTrigger value="allocation">Capital Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="readiness" className="mt-6">
          <ReadinessScore snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="optimize" className="mt-6">
          <OptimizeAssets snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="allocation" className="mt-6">
          <CapitalAllocation snapshot={snapshot} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
