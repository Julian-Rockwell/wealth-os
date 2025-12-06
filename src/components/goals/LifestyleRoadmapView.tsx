import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Home, 
  Building2,
  Plane, 
  DollarSign,
  CheckCircle2,
  Circle,
  Milestone,
  Sparkles,
  Crown,
  Wallet
} from "lucide-react";
import type { TwinEngineMilestones, TwinEngineSettings } from "@/utils/twinEngineCalculations";

interface LifestyleRoadmapViewProps {
  milestones: TwinEngineMilestones;
  settings: TwinEngineSettings;
  onSettingsChange?: (updates: Partial<TwinEngineSettings>) => void;
}

const formatMoney = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${value.toFixed(0)}`;
};

// Geography Cost options
const geographyOptions = [
  { id: 'low', label: 'Low Cost', icon: Home, baseAmount: 40000, description: 'LCOL areas' },
  { id: 'medium', label: 'Medium', icon: Building2, baseAmount: 60000, description: 'MCOL areas' },
  { id: 'high', label: 'High Cost', icon: Plane, baseAmount: 90000, description: 'HCOL areas' }
] as const;

// Lifestyle Tier options
const lifestyleOptions = [
  { id: 'essential', label: 'Essential', icon: Wallet, multiplier: 0.75, description: 'Basic needs' },
  { id: 'comfort', label: 'Comfort', icon: Sparkles, multiplier: 1.0, description: 'Balanced life' },
  { id: 'luxury', label: 'Luxury', icon: Crown, multiplier: 1.5, description: 'Premium living' }
] as const;

type GeographyType = typeof geographyOptions[number]['id'];
type LifestyleType = typeof lifestyleOptions[number]['id'];

interface MilestoneItem {
  year: number | null;
  age: number | null;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  achieved: boolean;
}

export function LifestyleRoadmapView({ milestones, settings, onSettingsChange }: LifestyleRoadmapViewProps) {
  const currentYear = new Date().getFullYear();
  
  // Initialize from persisted settings
  const [selectedGeography, setSelectedGeography] = useState<GeographyType>(settings.selectedGeography || 'medium');
  const [selectedLifestyle, setSelectedLifestyle] = useState<LifestyleType>(settings.selectedLifestyle || 'comfort');
  const [lateLifeReduction, setLateLifeReduction] = useState(settings.enableStepDown ?? false);
  
  // Sync from settings when they change externally
  useEffect(() => {
    if (settings.selectedGeography && settings.selectedGeography !== selectedGeography) {
      setSelectedGeography(settings.selectedGeography);
    }
    if (settings.selectedLifestyle && settings.selectedLifestyle !== selectedLifestyle) {
      setSelectedLifestyle(settings.selectedLifestyle);
    }
  }, [settings.selectedGeography, settings.selectedLifestyle]);
  
  // Handle geography change
  const handleGeographyChange = (geo: GeographyType) => {
    setSelectedGeography(geo);
    const geoOption = geographyOptions.find(g => g.id === geo)!;
    const lifeOption = lifestyleOptions.find(l => l.id === selectedLifestyle)!;
    const newExpenses = Math.round(geoOption.baseAmount * lifeOption.multiplier);
    
    if (onSettingsChange) {
      onSettingsChange({ 
        selectedGeography: geo,
        annualExpenses: newExpenses
      });
    }
  };
  
  // Handle lifestyle change
  const handleLifestyleChange = (life: LifestyleType) => {
    setSelectedLifestyle(life);
    const geoOption = geographyOptions.find(g => g.id === selectedGeography)!;
    const lifeOption = lifestyleOptions.find(l => l.id === life)!;
    const newExpenses = Math.round(geoOption.baseAmount * lifeOption.multiplier);
    
    if (onSettingsChange) {
      onSettingsChange({ 
        selectedLifestyle: life,
        annualExpenses: newExpenses
      });
    }
  };
  
  // Handle late life reduction toggle
  const handleLateLifeChange = (checked: boolean) => {
    setLateLifeReduction(checked);
    if (onSettingsChange) {
      onSettingsChange({ enableStepDown: checked });
    }
  };
  
  // Calculate target annual spend based on selections
  const geoOption = geographyOptions.find(g => g.id === selectedGeography)!;
  const lifeOption = lifestyleOptions.find(l => l.id === selectedLifestyle)!;
  const calculatedExpenses = Math.round(geoOption.baseAmount * lifeOption.multiplier);
  
  const [targetAnnualSpend, setTargetAnnualSpend] = useState(settings.annualExpenses || calculatedExpenses);
  
  // Update target when selections change
  useEffect(() => {
    const newCalculated = Math.round(geoOption.baseAmount * lifeOption.multiplier);
    setTargetAnnualSpend(newCalculated);
  }, [selectedGeography, selectedLifestyle, geoOption.baseAmount, lifeOption.multiplier]);
  
  // Propagate slider changes to parent
  const handleSliderChange = (values: number[]) => {
    setTargetAnnualSpend(values[0]);
    if (onSettingsChange) {
      onSettingsChange({ annualExpenses: values[0] });
    }
  };
  
  // Build milestone timeline items
  const milestoneItems: MilestoneItem[] = [
    {
      year: milestones.first25kActiveYear,
      age: milestones.first25kActiveYear ? settings.currentAge + (milestones.first25kActiveYear - settings.startYear) : null,
      label: '$25k Active Profit',
      description: 'First major trading milestone',
      icon: DollarSign,
      color: 'text-primary',
      achieved: !!milestones.first25kActiveYear
    },
    {
      year: milestones.capHitYear,
      age: milestones.capHitYear ? settings.currentAge + (milestones.capHitYear - settings.startYear) : null,
      label: 'Trading Cap Hit',
      description: `Account reached ${formatMoney(settings.tradingCap)} cap`,
      icon: Milestone,
      color: 'text-blue-600',
      achieved: !!milestones.capHitYear
    },
    {
      year: milestones.first100kActiveYear,
      age: milestones.first100kActiveYear ? settings.currentAge + (milestones.first100kActiveYear - settings.startYear) : null,
      label: '$100k Active Profit',
      description: 'Six-figure trading year',
      icon: DollarSign,
      color: 'text-primary',
      achieved: !!milestones.first100kActiveYear
    },
    {
      year: milestones.freedomYear,
      age: milestones.freedomYear ? settings.currentAge + (milestones.freedomYear - settings.startYear) : null,
      label: 'Financial Freedom',
      description: 'Passive income covers expenses',
      icon: CheckCircle2,
      color: 'text-green-600',
      achieved: !!milestones.freedomYear
    },
    {
      year: milestones.first500kPassiveYear,
      age: milestones.first500kPassiveYear ? settings.currentAge + (milestones.first500kPassiveYear - settings.startYear) : null,
      label: '$500k Passive',
      description: 'Half-million passive portfolio',
      icon: DollarSign,
      color: 'text-emerald-600',
      achieved: !!milestones.first500kPassiveYear
    },
    {
      year: milestones.first1M_PassiveYear,
      age: milestones.first1M_PassiveYear ? settings.currentAge + (milestones.first1M_PassiveYear - settings.startYear) : null,
      label: '$1M Passive',
      description: 'Millionaire status',
      icon: DollarSign,
      color: 'text-amber-600',
      achieved: !!milestones.first1M_PassiveYear
    },
    {
      year: milestones.activeStoppedYear,
      age: milestones.activeStoppedYear ? settings.currentAge + (milestones.activeStoppedYear - settings.startYear) : null,
      label: 'Active Trading Ends',
      description: 'Transition to fully passive',
      icon: Milestone,
      color: 'text-orange-600',
      achieved: !!milestones.activeStoppedYear
    },
    {
      year: milestones.first2M_PassiveYear,
      age: milestones.first2M_PassiveYear ? settings.currentAge + (milestones.first2M_PassiveYear - settings.startYear) : null,
      label: '$2M Passive',
      description: 'Multi-millionaire portfolio',
      icon: DollarSign,
      color: 'text-purple-600',
      achieved: !!milestones.first2M_PassiveYear
    },
    {
      year: milestones.first5M_PassiveYear,
      age: milestones.first5M_PassiveYear ? settings.currentAge + (milestones.first5M_PassiveYear - settings.startYear) : null,
      label: '$5M Passive',
      description: 'Generational wealth building',
      icon: DollarSign,
      color: 'text-pink-600',
      achieved: !!milestones.first5M_PassiveYear
    },
    {
      year: milestones.first10M_PassiveYear,
      age: milestones.first10M_PassiveYear ? settings.currentAge + (milestones.first10M_PassiveYear - settings.startYear) : null,
      label: '$10M Passive',
      description: 'Legacy wealth achieved',
      icon: DollarSign,
      color: 'text-rose-600',
      achieved: !!milestones.first10M_PassiveYear
    }
  ].filter(m => m.year !== null).sort((a, b) => (a.year || 0) - (b.year || 0));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Lifestyle Design */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Lifestyle Design
          </CardTitle>
          <CardDescription>
            Select your geography cost and lifestyle tier
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Geography Cost */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">GEOGRAPHY COST</Label>
            <div className="grid grid-cols-3 gap-2">
              {geographyOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedGeography === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleGeographyChange(option.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      isSelected 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatMoney(option.baseAmount)}/yr
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lifestyle Tier */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">LIFESTYLE TIER</Label>
            <div className="grid grid-cols-3 gap-2">
              {lifestyleOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedLifestyle === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleLifestyleChange(option.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      isSelected 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {option.multiplier}x
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Annual Spend Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">TARGET ANNUAL SPEND</Label>
              <span className="text-lg font-semibold text-primary">
                {formatMoney(targetAnnualSpend)}
              </span>
            </div>
            <Slider
              value={[targetAnnualSpend]}
              onValueChange={handleSliderChange}
              min={20000}
              max={200000}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$20k</span>
              <span>$200k</span>
            </div>
          </div>

          {/* Late Life Planning */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
              <Checkbox 
                id="lateLife" 
                checked={lateLifeReduction}
                onCheckedChange={(checked) => handleLateLifeChange(checked === true)}
              />
              <Label htmlFor="lateLife" className="text-sm cursor-pointer">
                Reduce Expenses in Late Retirement?
              </Label>
            </div>
            
            {/* Show Step Down controls when enabled */}
            {lateLifeReduction && (
              <div className="space-y-4 p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Step Down Age</Label>
                    <span className="text-sm font-medium">{settings.stepDownAge} yo</span>
                  </div>
                  <Slider
                    value={[settings.stepDownAge]}
                    onValueChange={(values) => onSettingsChange?.({ stepDownAge: values[0] })}
                    min={60}
                    max={90}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Expense Reduction</Label>
                    <span className="text-sm font-medium">{settings.stepDownPercent}%</span>
                  </div>
                  <Slider
                    value={[settings.stepDownPercent]}
                    onValueChange={(values) => onSettingsChange?.({ stepDownPercent: values[0] })}
                    min={5}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Current Configuration Summary */}
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg space-y-2">
            <div className="text-sm font-medium text-primary">Your Configuration</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Geography</p>
                <p className="font-medium">{geoOption.label}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Lifestyle</p>
                <p className="font-medium">{lifeOption.label}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Annual</p>
                <p className="font-medium">{formatMoney(targetAnnualSpend)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Monthly</p>
                <p className="font-medium">{formatMoney(targetAnnualSpend / 12)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Panel: Wealth Journey - Horizontal Layout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Milestone className="w-5 h-5 text-green-600" />
            Your Wealth Journey
          </CardTitle>
          <CardDescription>
            Key milestones on your path to financial freedom
          </CardDescription>
        </CardHeader>
        <CardContent>
          {milestoneItems.length > 0 ? (
            <div className="space-y-2">
              {/* Header row */}
              <div className="grid grid-cols-[auto_60px_50px_1fr] gap-3 px-2 pb-2 border-b text-xs font-medium text-muted-foreground">
                <div className="w-5" />
                <div>Year</div>
                <div>Age</div>
                <div>Milestone</div>
              </div>
              
              {/* Milestone rows */}
              {milestoneItems.map((item, index) => {
                const Icon = item.icon;
                const isPast = item.year && item.year <= currentYear;
                
                return (
                  <div 
                    key={index} 
                    className={`grid grid-cols-[auto_60px_50px_1fr] gap-3 items-center px-2 py-2 rounded-lg transition-colors ${
                      isPast ? 'bg-green-50 dark:bg-green-950/20' : 'hover:bg-muted/50'
                    }`}
                  >
                    {/* Status icon */}
                    <div className={`flex items-center justify-center w-5 h-5 rounded-full ${
                      isPast ? 'bg-green-500' : 'bg-muted border-2 border-border'
                    }`}>
                      {isPast ? (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      ) : (
                        <Circle className="w-2 h-2 text-muted-foreground" />
                      )}
                    </div>
                    
                    {/* Year */}
                    <Badge variant="outline" className="text-xs justify-center">
                      {item.year}
                    </Badge>
                    
                    {/* Age */}
                    <span className="text-sm text-muted-foreground">
                      {item.age} yo
                    </span>
                    
                    {/* Milestone info */}
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
                      <div className="min-w-0">
                        <span className="font-medium text-sm">{item.label}</span>
                        <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Milestone className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No milestones projected yet</p>
              <p className="text-sm">Adjust your settings to see your wealth journey</p>
            </div>
          )}

          {/* Wealth OS Advantage */}
          {milestones.freedomYear && milestones.tradFreedomYear && milestones.tradFreedomYear > milestones.freedomYear && (
            <div className="mt-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
              <div className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">
                Wealth OS Advantage
              </div>
              <p className="text-sm text-green-600 dark:text-green-500">
                Reach freedom <strong>{milestones.tradFreedomYear - milestones.freedomYear} years earlier</strong> than the traditional path 
                (Year {milestones.freedomYear} vs {milestones.tradFreedomYear})
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}