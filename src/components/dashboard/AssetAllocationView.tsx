import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Holding } from "@/types/financial";

interface AssetAllocationViewProps {
  holdings: Holding[];
}

export const AssetAllocationView = ({ holdings }: AssetAllocationViewProps) => {
  // Calculate totals by different groupings
  const byAccountType = holdings.reduce((acc, h) => {
    const key = h.accountType.replace("_", " ");
    acc[key] = (acc[key] || 0) + h.balance;
    return acc;
  }, {} as Record<string, number>);

  const byAssetClass = holdings.reduce((acc, h) => {
    const key = h.assetClass;
    acc[key] = (acc[key] || 0) + h.balance;
    return acc;
  }, {} as Record<string, number>);

  const byLiquidity = holdings.reduce((acc, h) => {
    const key = h.liquidity.replace("_", " ");
    acc[key] = (acc[key] || 0) + h.balance;
    return acc;
  }, {} as Record<string, number>);

  const totalAssets = holdings.reduce((sum, h) => sum + h.balance, 0);

  const formatDataForCharts = (data: Record<string, number>) => {
    return Object.entries(data).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      percentage: ((value / totalAssets) * 100).toFixed(1),
    }));
  };

  const accountTypeData = formatDataForCharts(byAccountType);
  const assetClassData = formatDataForCharts(byAssetClass);
  const liquidityData = formatDataForCharts(byLiquidity);

  const ACCOUNT_TYPE_COLORS = ["#5BB6CE", "#48A0B8", "#3A8DA0", "#2C7A88", "#1E6770"];
  const ASSET_CLASS_COLORS = ["#9B7FD8", "#8865D0", "#754BC8", "#6231C0", "#4F17B8"];
  const LIQUIDITY_COLORS = ["#16A34A", "#F59E0B", "#DC2626"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-medium border">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm text-success">
            ${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-muted-foreground">
            {payload[0].payload.percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const renderDonutChart = (data: any[], colors: string[], title: string) => (
    <div>
      <h4 className="text-sm font-medium mb-3 text-center">{title}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Legend */}
      <div className="mt-3 space-y-1.5">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
              <span>{item.name}</span>
            </div>
            <span className="font-medium">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (holdings.length === 0) {
    return (
      <Card className="p-6 shadow-sm">
        <p className="text-sm text-muted-foreground text-center">
          No holdings to visualize. Add assets in the Holdings tab above.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Asset Distribution</h3>
      
      {/* Three donuts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderDonutChart(accountTypeData, ACCOUNT_TYPE_COLORS, "By Account Type")}
        {renderDonutChart(assetClassData, ASSET_CLASS_COLORS, "By Asset Class")}
        {renderDonutChart(liquidityData, LIQUIDITY_COLORS, "By Liquidity")}
      </div>

      <div className="mt-6 pt-4 border-t flex justify-end">
        <p className="text-sm text-muted-foreground">
          Total Visualized Assets:{" "}
          <span className="font-semibold text-foreground">
            ${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </p>
      </div>
    </Card>
  );
};

