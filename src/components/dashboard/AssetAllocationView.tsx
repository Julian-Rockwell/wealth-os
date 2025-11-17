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

  const renderDistributionCard = (
    data: any[], 
    colors: string[], 
    title: string
  ) => (
    <div className="border rounded-lg p-4 bg-muted/20">
      <h4 className="text-sm font-semibold mb-4">{title}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-6 items-center">
        {/* Donut a la izquierda */}
        <div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Listado a la derecha */}
        <div className="space-y-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 px-3 rounded hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0" 
                style={{ backgroundColor: colors[idx % colors.length] }} 
              />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <span className="text-sm font-semibold min-w-[45px] text-right">
              {item.percentage}%
            </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (holdings.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No holdings to visualize. Add assets in the Holdings tab below.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderDistributionCard(accountTypeData, ACCOUNT_TYPE_COLORS, "By Account Type")}
        {renderDistributionCard(assetClassData, ASSET_CLASS_COLORS, "By Asset Class")}
        {renderDistributionCard(liquidityData, LIQUIDITY_COLORS, "By Liquidity")}
      </div>
      
      {/* Footer con total */}
      <div className="flex justify-end pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Total Visualized Assets:{" "}
          <span className="font-semibold text-foreground">
            ${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </p>
      </div>
    </div>
  );
};
