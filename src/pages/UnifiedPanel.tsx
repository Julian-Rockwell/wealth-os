import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Download, RotateCcw, BarChart3, Target, TrendingDown, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import Upload from "./Upload";
import Dashboard from "./Dashboard";
import Investments from "./Investments";
import Goals from "./Goals";

export default function UnifiedPanel() {
  const [activeTab, setActiveTab] = useState("intake");
  const { resetAllData, snapshot } = useFinancialData();

  const handleExport = (format: "json" | "csv") => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`);
  };

  const handleNewAnalysis = () => {
    resetAllData();
    setActiveTab("intake");
    toast.info("Starting new analysis...");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Rockwell Wealth OS</h1>
                <p className="text-sm text-muted-foreground">Financial Command Center</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleNewAnalysis}>
                <RotateCcw className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("json")}>
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="intake" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Command Center
            </TabsTrigger>
            <TabsTrigger 
              value="command" 
              className="flex items-center gap-2"
              disabled={!snapshot}
            >
              <BarChart3 className="w-4 h-4" />
              Budget Analyzer
            </TabsTrigger>
            <TabsTrigger 
              value="investments" 
              className="flex items-center gap-2"
              disabled={!snapshot}
            >
              <TrendingUp className="w-4 h-4" />
              Investments
            </TabsTrigger>
            <TabsTrigger value="reports" disabled className="flex items-center gap-2 opacity-50">
              <BarChart3 className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="cashflow" disabled className="flex items-center gap-2 opacity-50">
              <TrendingDown className="w-4 h-4" />
              Cash Flow
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="flex items-center gap-2"
              disabled={!snapshot}
            >
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="advice" disabled className="flex items-center gap-2 opacity-50">
              <Lightbulb className="w-4 h-4" />
              Advice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="intake" className="mt-0">
            <Upload onComplete={() => setActiveTab("command")} />
          </TabsContent>

          <TabsContent value="command" className="mt-0">
            <Dashboard />
          </TabsContent>

          <TabsContent value="investments" className="mt-0">
            <Investments />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <div className="text-center py-20 text-muted-foreground">
              Coming soon: Spending by Category, Income, Trends
            </div>
          </TabsContent>

          <TabsContent value="cashflow" className="mt-0">
            <div className="text-center py-20 text-muted-foreground">
              Coming soon: Monthly inflow/outflow with projections
            </div>
          </TabsContent>

          <TabsContent value="goals" className="mt-0">
            <Goals />
          </TabsContent>

          <TabsContent value="advice" className="mt-0">
            <div className="text-center py-20 text-muted-foreground">
              Coming soon: Rocky AI insights and actions
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
