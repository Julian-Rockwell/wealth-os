import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import type { Holding } from "@/types/financial";
import { InfoTooltip } from "@/components/ui/info-tooltip";

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

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--success))",
    "hsl(var(--warning))",
    "hsl(var(--destructive))",
    "hsl(213, 94%, 55%)",
    "hsl(173, 80%, 50%)",
    "hsl(142, 76%, 45%)",
  ];

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

  const renderPieChart = (data: any[]) => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ percentage }) => `${percentage}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = (data: any[]) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="name" 
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  if (holdings.length === 0) {
    return (
      <Card className="p-8 text-center shadow-soft">
        <p className="text-muted-foreground">No holdings data available to visualize</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-soft">
      <h3 className="font-semibold mb-4">Asset Allocation Visualization</h3>
      
      <Tabs defaultValue="account-type" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="account-type">By Account Type</TabsTrigger>
          <TabsTrigger value="asset-class">By Asset Class</TabsTrigger>
          <TabsTrigger value="liquidity">
            <div className="flex items-center gap-1">
              By Liquidity
              <InfoTooltip
                content={
                  <div className="space-y-2">
                    <div className="font-semibold">Why these classifications?</div>
                    <div className="text-xs space-y-1">
                      <div>
                        <strong>Vehicles:</strong> Considered illiquid due to typical 4+ week sale timeline, depreciation considerations, and market volatility.
                      </div>
                      <div>
                        <strong>Retirement accounts:</strong> Illiquid due to tax penalties before age 59.5 and withdrawal restrictions.
                      </div>
                      <div>
                        <strong>Real estate:</strong> Requires extensive time for listing, negotiation, and closing process.
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        <TabsContent value="account-type">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-4">Pie Chart View</h4>
              {renderPieChart(accountTypeData)}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Bar Chart View</h4>
              {renderBarChart(accountTypeData)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="asset-class">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-4">Pie Chart View</h4>
              {renderPieChart(assetClassData)}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Bar Chart View</h4>
              {renderBarChart(assetClassData)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="liquidity">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-4">Pie Chart View</h4>
              {renderPieChart(liquidityData)}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Bar Chart View</h4>
              {renderBarChart(liquidityData)}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-muted">
              <h5 className="font-medium mb-2 text-sm">Liquidity Definitions:</h5>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• <strong>Liquid:</strong> &lt;1 week to access (cash, checking, savings)</li>
                <li>• <strong>Semi-Liquid:</strong> 1-4 weeks (brokerage, some investments)</li>
                <li>• <strong>Illiquid:</strong> &gt;4 weeks (real estate, retirement accounts)</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">Custom Categories</p>
            <p className="text-sm text-muted-foreground">
              Phase 2: User-defined groupings and custom allocation views will be available here.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Visualized Assets</span>
          <span className="text-lg font-bold text-primary">
            ${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </Card>
  );
};
