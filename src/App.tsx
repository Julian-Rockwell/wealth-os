import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FinancialDataProvider } from "@/contexts/FinancialDataContext";
import UnifiedPanel from "./pages/UnifiedPanel";
import Documentation from "./pages/Documentation";
import AngularMigrationGuide from "./pages/AngularMigrationGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FinancialDataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UnifiedPanel />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/angular-migration" element={<AngularMigrationGuide />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FinancialDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
