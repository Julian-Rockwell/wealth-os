import { TrendingUp, Download, RotateCcw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { SAMPLE_REYNOLDS_DATA } from "@/utils/sampleData";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const { setSnapshot, resetAllData } = useFinancialData();
  
  const handleExport = (format: "json" | "csv") => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`);
  };

  const handleNewAnalysis = () => {
    resetAllData();
    toast.info("Restarting analysis...");
    navigate("/");
  };

  const handleLoadSampleData = () => {
    if (confirm("Load Reynolds Family demo data? This will replace any existing data.")) {
      resetAllData();
      setSnapshot(SAMPLE_REYNOLDS_DATA);
      toast.success("Sample data loaded successfully!");
    }
  };

  return (
    <header className="border-b bg-card shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Rockwell Wealth OS</h1>
              <p className="text-sm text-muted-foreground">Budget Analysis Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleLoadSampleData}>
              <Database className="w-4 h-4 mr-2" />
              Load Sample Data
            </Button>
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
  );
};
