import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  User, 
  TrendingUp, 
  Wallet,
  Clock,
  Settings,
  ChevronDown,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { TwinEngineSettings } from "@/utils/twinEngineCalculations";

interface TwinEngineSettingsPanelProps {
  settings: TwinEngineSettings;
  onSettingsChange: (settings: TwinEngineSettings) => void;
}

const formatMoney = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  tooltip?: string;
}

function InputSlider({ label, value, onChange, min, max, step, suffix = '', tooltip }: InputSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Label className="text-sm text-muted-foreground">{label}</Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="w-3 h-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <span className="text-sm font-medium">{value}{suffix}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
}

interface InputCurrencyProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

function InputCurrency({ label, value, onChange }: InputCurrencyProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="pl-7"
        />
      </div>
    </div>
  );
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  colorClass?: string;
  children: React.ReactNode;
}

function CollapsibleSection({ title, icon: Icon, isOpen, onToggle, colorClass = "text-foreground", children }: CollapsibleSectionProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50 rounded-lg transition-colors">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${colorClass}`} />
          <span className={`font-medium ${colorClass}`}>{title}</span>
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-4 space-y-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function TwinEngineSettingsPanel({ settings, onSettingsChange }: TwinEngineSettingsPanelProps) {
  const [openSections, setOpenSections] = useState({
    foundation: true,
    activeTrading: true,
    passiveIncome: false,
    postRetirement: false,
    advanced: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateSetting = <K extends keyof TwinEngineSettings>(key: K, value: TwinEngineSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Projection Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 p-2">
        {/* Foundation Section */}
        <CollapsibleSection
          title="Foundation"
          icon={User}
          colorClass="text-primary"
          isOpen={openSections.foundation}
          onToggle={() => toggleSection('foundation')}
        >
          <InputSlider
            label="Current Age"
            value={settings.currentAge}
            onChange={(val) => updateSetting('currentAge', val)}
            min={30}
            max={95}
            step={1}
            suffix=" yo"
          />
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Starting Balances</div>
            <div className="text-lg font-semibold">
              {formatMoney(settings.savingsPassive + settings.savingsActive)}
            </div>
          </div>

          <InputSlider
            label="Est. Tax Rate"
            value={settings.taxRate}
            onChange={(val) => updateSetting('taxRate', val)}
            min={0}
            max={50}
            step={1}
            suffix="%"
            tooltip="Estimated tax rate on trading profits and withdrawals"
          />
        </CollapsibleSection>

        {/* Active Trading Section */}
        <CollapsibleSection
          title="Active Trading"
          icon={TrendingUp}
          colorClass="text-green-600"
          isOpen={openSections.activeTrading}
          onToggle={() => toggleSection('activeTrading')}
        >
          <InputCurrency
            label="Initial Trading Alloc (Active)"
            value={settings.savingsActive}
            onChange={(val) => updateSetting('savingsActive', val)}
          />

          <InputCurrency
            label="Trading Account Cap"
            value={settings.tradingCap}
            onChange={(val) => updateSetting('tradingCap', val)}
          />

          <InputCurrency
            label="Monthly Contribution"
            value={settings.monthlyContrib}
            onChange={(val) => updateSetting('monthlyContrib', val)}
          />

          <InputSlider
            label="Active ROI"
            value={settings.activeReturn}
            onChange={(val) => updateSetting('activeReturn', val)}
            min={5}
            max={60}
            step={1}
            suffix="%"
          />

          {/* Simulate Learning Curve (Ramp Up) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Label className="text-sm text-muted-foreground">Simulate Learning Curve</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Start at 50% ROI and scale up linearly over the ramp-up period</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              checked={settings.enableRampUp}
              onCheckedChange={(val) => updateSetting('enableRampUp', val)}
            />
          </div>

          {settings.enableRampUp && (
            <InputSlider
              label="Ramp Up Duration"
              value={settings.rampUpDuration}
              onChange={(val) => updateSetting('rampUpDuration', val)}
              min={6}
              max={60}
              step={6}
              suffix=" Months"
              tooltip="How many months to reach full ROI target (6-month increments)"
            />
          )}
        </CollapsibleSection>

        {/* Passive Income Section */}
        <CollapsibleSection
          title="Passive Income"
          icon={Wallet}
          colorClass="text-cyan-600"
          isOpen={openSections.passiveIncome}
          onToggle={() => toggleSection('passiveIncome')}
        >
          <InputCurrency
            label="Current Retirement (Passive)"
            value={settings.savingsPassive}
            onChange={(val) => updateSetting('savingsPassive', val)}
          />

          <InputSlider
            label="Passive Yield"
            value={settings.passiveYield}
            onChange={(val) => updateSetting('passiveYield', val)}
            min={2}
            max={20}
            step={0.5}
            suffix="%"
          />
        </CollapsibleSection>

        {/* Post Retirement Section */}
        <CollapsibleSection
          title="Post Retirement"
          icon={Clock}
          colorClass="text-orange-600"
          isOpen={openSections.postRetirement}
          onToggle={() => toggleSection('postRetirement')}
        >
          <InputCurrency
            label="Post-Retirement Income (Mo)"
            value={settings.retirementIncome}
            onChange={(val) => updateSetting('retirementIncome', val)}
          />
          <p className="text-xs text-muted-foreground">
            Social Security, Pension, etc. (Offsets Withdrawal need)
          </p>

          <InputSlider
            label="Income Start Age"
            value={settings.retirementIncomeStartAge}
            onChange={(val) => updateSetting('retirementIncomeStartAge', val)}
            min={55}
            max={75}
            step={1}
            suffix=" yo"
            tooltip="Age when Social Security or pension income begins"
          />
        </CollapsibleSection>

        {/* Advanced Settings Section */}
        <CollapsibleSection
          title="Advanced Settings"
          icon={Settings}
          colorClass="text-muted-foreground"
          isOpen={openSections.advanced}
          onToggle={() => toggleSection('advanced')}
        >
          <InputSlider
            label="Inflation Assumption"
            value={settings.inflationRate}
            onChange={(val) => updateSetting('inflationRate', val)}
            min={0}
            max={10}
            step={0.5}
            suffix="%"
          />

          <InputSlider
            label="Traditional Market Return"
            value={settings.tradReturn}
            onChange={(val) => updateSetting('tradReturn', val)}
            min={2}
            max={12}
            step={0.5}
            suffix="%"
          />

          <InputSlider
            label="Active Trading Duration"
            value={settings.activeDuration}
            onChange={(val) => updateSetting('activeDuration', val)}
            min={1}
            max={20}
            step={1}
            suffix=" Years"
            tooltip="How many years you plan to actively trade"
          />

          <InputSlider
            label="Active Cash Out %"
            value={settings.activeCashOutPercent}
            onChange={(val) => updateSetting('activeCashOutPercent', val)}
            min={0}
            max={100}
            step={5}
            suffix="%"
            tooltip="Percentage of active account to cash out when transitioning to passive"
          />

          {/* Withdrawal Strategy */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Withdrawal Strategy</Label>
            <Select
              value={settings.withdrawalStrategy}
              onValueChange={(val) => updateSetting('withdrawalStrategy', val as TwinEngineSettings['withdrawalStrategy'])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth">Reinvest Everything (Growth)</SelectItem>
                <SelectItem value="freedom">Cover Expenses (Net)</SelectItem>
                <SelectItem value="custom">Custom Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.withdrawalStrategy === 'custom' && (
            <>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Start Year</Label>
                <Input
                  type="number"
                  value={settings.customWithdrawalYear}
                  onChange={(e) => updateSetting('customWithdrawalYear', parseInt(e.target.value) || settings.startYear)}
                />
              </div>
              <InputCurrency
                label="Annual Net Needed"
                value={settings.customWithdrawalAmount}
                onChange={(val) => updateSetting('customWithdrawalAmount', val)}
              />
            </>
          )}

          {/* Yield Cap */}
          <InputSlider
            label="Yield Cap %"
            value={settings.yieldCapPercent}
            onChange={(val) => updateSetting('yieldCapPercent', val)}
            min={50}
            max={100}
            step={5}
            suffix="%"
            tooltip="Maximum percentage of passive yield that can be withdrawn. Protects principal."
          />

          {/* Annual Cost of Living */}
          <InputCurrency
            label="Annual Cost of Living"
            value={settings.annualExpenses}
            onChange={(val) => updateSetting('annualExpenses', val)}
          />
        </CollapsibleSection>
      </CardContent>
    </Card>
  );
}
