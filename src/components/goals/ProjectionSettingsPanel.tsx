import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectionSettings } from "@/contexts/FinancialDataContext";

interface ProjectionSettingsPanelProps {
  settings: ProjectionSettings;
  onSettingsChange: (settings: ProjectionSettings) => void;
  autoMonthlyExpenses: number;
}

export function ProjectionSettingsPanel({ 
  settings, 
  onSettingsChange,
  autoMonthlyExpenses 
}: ProjectionSettingsPanelProps) {
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const parseCurrency = (value: string): number => {
    return parseInt(value.replace(/[^0-9]/g, '')) || 0;
  };

  const handleCostOfLivingModeChange = (mode: 'rough' | 'accurate') => {
    onSettingsChange({
      ...settings,
      costOfLivingMode: mode,
      costOfLiving: mode === 'rough' ? autoMonthlyExpenses : settings.costOfLiving
    });
  };

  const handleCostOfLivingChange = (value: string) => {
    onSettingsChange({
      ...settings,
      costOfLiving: parseCurrency(value)
    });
  };

  const suggestedAccountSize = settings.incomeGoalPercent > 0
    ? Math.round((settings.costOfLiving / (settings.incomeGoalPercent / 100)) * 0.35)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projection Settings</CardTitle>
        <CardDescription>Configure your income machine parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cost of Living */}
        <div className="space-y-3">
          <Label>Cost of Living</Label>
          <RadioGroup 
            value={settings.costOfLivingMode} 
            onValueChange={handleCostOfLivingModeChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rough" id="rough" />
              <Label htmlFor="rough" className="font-normal cursor-pointer">Rough Estimate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accurate" id="accurate" />
              <Label htmlFor="accurate" className="font-normal cursor-pointer">Accurate Estimate</Label>
            </div>
          </RadioGroup>
          <Input
            type="text"
            value={formatCurrency(settings.costOfLiving)}
            onChange={(e) => handleCostOfLivingChange(e.target.value)}
            disabled={settings.costOfLivingMode === 'rough'}
            onBlur={() => {
              if (settings.costOfLivingMode === 'accurate') {
                onSettingsChange({ ...settings });
              }
            }}
          />
        </div>

        {/* Current Retirement Savings */}
        <div className="space-y-2">
          <Label htmlFor="retirementSavings">Current Retirement Account Savings</Label>
          <Input
            id="retirementSavings"
            type="text"
            value={formatCurrency(settings.currentRetirementSavings)}
            onChange={(e) => onSettingsChange({
              ...settings,
              currentRetirementSavings: parseCurrency(e.target.value)
            })}
            onBlur={() => onSettingsChange({ ...settings })}
          />
        </div>

        {/* Account Size Comfortable Trading */}
        <div className="space-y-2">
          <Label htmlFor="accountSize">Account Size Comfortable Trading</Label>
          <Input
            id="accountSize"
            type="text"
            value={formatCurrency(settings.accountSizeComfortable)}
            onChange={(e) => onSettingsChange({
              ...settings,
              accountSizeComfortable: parseCurrency(e.target.value)
            })}
            onBlur={() => onSettingsChange({ ...settings })}
          />
          <p className="text-xs text-muted-foreground">
            Suggested: {formatCurrency(suggestedAccountSize)}
          </p>
        </div>

        {/* Start Year */}
        <div className="space-y-2">
          <Label htmlFor="startYear">Start Year</Label>
          <Input
            id="startYear"
            type="number"
            min="2020"
            max="9999"
            value={settings.startYear}
            onChange={(e) => onSettingsChange({
              ...settings,
              startYear: parseInt(e.target.value) || new Date().getFullYear()
            })}
            onBlur={() => onSettingsChange({ ...settings })}
          />
        </div>

        {/* Initial Trading Account */}
        <div className="space-y-2">
          <Label htmlFor="initialTrading">Initial Trading Account</Label>
          <Input
            id="initialTrading"
            type="text"
            value={formatCurrency(settings.initialTradingAccount)}
            onChange={(e) => onSettingsChange({
              ...settings,
              initialTradingAccount: parseCurrency(e.target.value)
            })}
            onBlur={() => onSettingsChange({ ...settings })}
          />
        </div>

        {/* Income Goal Percent */}
        <div className="space-y-2">
          <Label htmlFor="incomeGoal">Income Account Goal per Year %</Label>
          <Input
            id="incomeGoal"
            type="number"
            min="0"
            max="999"
            value={settings.incomeGoalPercent}
            onChange={(e) => onSettingsChange({
              ...settings,
              incomeGoalPercent: parseInt(e.target.value) || 0
            })}
            onBlur={() => onSettingsChange({ ...settings })}
          />
        </div>

        {/* Inflation % */}
        <div className="space-y-2">
          <Label htmlFor="inflationPercent">Inflation %</Label>
          <Input
            id="inflationPercent"
            type="number"
            min="0"
            max="20"
            step="0.1"
            value={settings.inflationPercent}
            onChange={(e) => onSettingsChange({
              ...settings,
              inflationPercent: parseFloat(e.target.value) || 3
            })}
            onBlur={() => onSettingsChange({ ...settings })}
          />
          <p className="text-xs text-muted-foreground">
            Annual inflation rate for expense adjustments (0-20%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
