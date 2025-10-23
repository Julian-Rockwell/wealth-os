import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ViewMode } from "@/pages/Dashboard";

interface ViewToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  const views: Array<{ id: ViewMode; label: string }> = [
    { id: "category", label: "50/30/20" },
    { id: "subcategory", label: "Subcategory" },
    { id: "merchant", label: "Merchant" },
    { id: "liquidity", label: "Liquidity" },
  ];

  return (
    <Card className="p-3 shadow-soft">
      <div className="flex flex-wrap gap-2">
        {views.map((view) => (
          <Button
            key={view.id}
            variant={viewMode === view.id ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode(view.id)}
            className={viewMode === view.id ? "gradient-primary" : ""}
          >
            {view.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};
