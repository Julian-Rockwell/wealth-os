import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BarChart3, LineChart as LineChartIcon } from "lucide-react";
import { 
  ComposedChart,
  Area,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Brush
} from "recharts";
import type { TwinEngineRow, TwinEngineMilestones, TwinEngineSettings } from "@/utils/twinEngineCalculations";

interface TwinEngineChartProps {
  data: TwinEngineRow[];
  milestones: TwinEngineMilestones;
  settings: TwinEngineSettings;
}

const formatMoney = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${value.toFixed(0)}`;
};

const formatMoneyFull = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// v4.5: Right-aligned labels with dx offset
const MultiLineLabel = ({ viewBox, value, fill, fontSize = 10, fontWeight = 'bold', yOffset = 0 }: any) => {
  const lines = Array.isArray(value) ? value : [value];
  const { x, y } = viewBox;
  const baseY = y + yOffset;

  return (
    <text x={x + 10} y={baseY} textAnchor="start" fill={fill} fontSize={fontSize} fontWeight={fontWeight}>
      {lines.map((line: string, i: number) => (
        <tspan x={x + 10} dy={i === 0 ? 10 : 12} key={i}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

export function TwinEngineChart({ data, milestones, settings }: TwinEngineChartProps) {
  const [chartView, setChartView] = useState<'netWorth' | 'income'>('netWorth');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const row = data.find(d => d.year === label);
      const age = row?.age;
      
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-[200px]">
          <p className="font-semibold mb-2 border-b border-border pb-2">
            Year {label} {age ? `(Age ${age})` : ''}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between gap-4 text-sm py-0.5">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-medium">{formatMoneyFull(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomXAxisTick = ({ x, y, payload }: any) => {
    const row = data.find(d => d.year === payload.value);
    const age = row?.age;
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={12} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={10} fontWeight="bold">
          {payload.value}
        </text>
        <text x={0} y={0} dy={24} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={9}>
          {age} yo
        </text>
      </g>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>
              {chartView === 'netWorth' ? 'Net Wealth Projection' : 'Income & Lifestyle Projection'}
            </CardTitle>
            <CardDescription>
              {chartView === 'netWorth' 
                ? 'Total Account Balances vs. Inflation' 
                : 'All figures are Pre-Tax (Gross) for fair comparison'}
            </CardDescription>
          </div>
          <ToggleGroup 
            type="single" 
            value={chartView} 
            onValueChange={(val) => val && setChartView(val as 'netWorth' | 'income')}
            className="h-9"
          >
            <ToggleGroupItem value="netWorth" className="h-9 text-xs gap-1">
              <BarChart3 className="w-3.5 h-3.5" />
              Net Worth
            </ToggleGroupItem>
            <ToggleGroupItem value="income" className="h-9 text-xs gap-1">
              <LineChartIcon className="w-3.5 h-3.5" />
              Annual Income
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={450}>
          <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
            <defs>
              <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="passiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="tradGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
            <XAxis 
              dataKey="year" 
              tick={<CustomXAxisTick />}
              interval={4}
              height={50}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              className="text-xs"
              tickFormatter={formatMoney}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />

            {/* v4.5: Milestone Reference Lines - Right-aligned, Staggered with yOffset */}
            {/* 1. WealthOS Freedom (Top Level - Offset 0) */}
            {milestones.freedomYear && (
              <ReferenceLine 
                x={milestones.freedomYear} 
                stroke="#10b981" 
                strokeDasharray="3 3"
                label={<MultiLineLabel value={["WealthOS Freedom", "Living on Passive Income"]} fill="#10b981" yOffset={0} />}
              />
            )}
            
            {/* 2. Traditional Retirement (Level 2 - Offset 35) */}
            {milestones.tradFreedomYear && (
              <ReferenceLine 
                x={milestones.tradFreedomYear} 
                stroke="#9ca3af" 
                strokeDasharray="3 3"
                label={<MultiLineLabel value={["Traditional Retirement", "Living on 4% Withdrawals"]} fill="#9ca3af" yOffset={35} />}
              />
            )}

            {/* 3. Excess Profit Sweep (Level 3 - Offset 70) */}
            {milestones.capHitYear && (
              <ReferenceLine 
                x={milestones.capHitYear} 
                stroke="#3b82f6" 
                strokeDasharray="3 3"
                label={<MultiLineLabel value={["Excess Profit Sweep", "Threshold Reached"]} fill="#3b82f6" yOffset={70} />}
              />
            )}

            {/* 4. Stop Trading (Level 4 - Offset 105) - CONDITIONAL */}
            {!settings.tradeIndefinitely && milestones.activeStoppedYear && (
              <ReferenceLine 
                x={milestones.activeStoppedYear} 
                stroke="#3b82f6" 
                strokeDasharray="3 3"
                label={<MultiLineLabel value={["Stop", "Trading"]} fill="#3b82f6" yOffset={105} />}
              />
            )}

            {chartView === 'netWorth' ? (
              <>
                {/* Net Worth View */}
                <Area 
                  type="monotone" 
                  dataKey="activeBalance" 
                  name="Active Balance"
                  stroke="hsl(var(--primary))" 
                  fill="url(#activeGradient)"
                  strokeWidth={2}
                  stackId="wealthos"
                />
                <Area 
                  type="monotone" 
                  dataKey="passiveBalance" 
                  name="Passive Balance"
                  stroke="hsl(142, 76%, 36%)" 
                  fill="url(#passiveGradient)"
                  strokeWidth={2}
                  stackId="wealthos"
                />
                <Line 
                  type="monotone" 
                  dataKey="tradBalance" 
                  name="Traditional Balance"
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  dot={false}
                />
              </>
            ) : (
              <>
                {/* v4.5: Income View - All figures are Pre-Tax (Gross) */}
                <Area 
                  type="monotone" 
                  dataKey="activeProfitGross" 
                  name="Active Profit (Gross)"
                  stroke="hsl(var(--primary))" 
                  fill="url(#activeGradient)"
                  strokeWidth={2}
                  stackId="income"
                />
                <Area 
                  type="monotone" 
                  dataKey="passiveIncome" 
                  name="Passive Income (Gross)"
                  stroke="hsl(142, 76%, 36%)" 
                  fill="url(#passiveGradient)"
                  strokeWidth={2}
                  stackId="income"
                />
                <Line 
                  type="monotone" 
                  dataKey="retirementIncome" 
                  name="Other Income (SS/Pension)"
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="tradSafeIncome" 
                  name="Trad. Safe Income (4%)"
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={1.5}
                  strokeDasharray="8 4"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="grossExpenses" 
                  name="Gross Expenses"
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  dot={false}
                />
              </>
            )}

            {/* Brush for timeline zooming/panning */}
            <Brush 
              dataKey="year" 
              height={30} 
              stroke="#3b82f6" 
              travellerWidth={10}
              tickFormatter={(value) => value}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Starting Balances - moved below chart */}
        {(() => {
          const totalStarting = settings.savingsActive + settings.savingsPassive;
          const activePercent = totalStarting > 0 ? (settings.savingsActive / totalStarting) * 100 : 50;
          const passivePercent = totalStarting > 0 ? (settings.savingsPassive / totalStarting) * 100 : 50;
          
          return (
            <div className="bg-muted/30 border border-border rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Starting Point: {settings.startYear} | Age {settings.currentAge}
                </span>
                <span className="text-lg font-bold">{formatMoney(totalStarting)}</span>
              </div>
              
              {/* Progress bar */}
              <div className="h-3 rounded-full overflow-hidden flex bg-muted mb-2">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${activePercent}%` }}
                />
                <div 
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${passivePercent}%` }}
                />
              </div>
              
              {/* Labels */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Active: {formatMoney(settings.savingsActive)}</span>
                <span>Passive: {formatMoney(settings.savingsPassive)}</span>
              </div>
            </div>
          );
        })()}
      </CardContent>
    </Card>
  );
}
