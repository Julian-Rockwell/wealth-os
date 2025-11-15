import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface AssetsKPICardProps {
  totalAssets: number;
}

export const AssetsKPICard = ({ totalAssets }: AssetsKPICardProps) => {
  return (
    <Card className="p-6 shadow-sm border-l-4 border-l-success">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Total Assets</h3>
        <TrendingUp className="w-4 h-4 text-success" />
      </div>
      <p className="text-3xl font-bold tracking-tight text-success">
        ${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
    </Card>
  );
};
