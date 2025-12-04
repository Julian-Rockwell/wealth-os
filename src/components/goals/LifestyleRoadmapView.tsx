import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Home, 
  Plane, 
  DollarSign,
  CheckCircle2,
  Circle,
  Milestone
} from "lucide-react";
import type { TwinEngineMilestones, TwinEngineSettings } from "@/utils/twinEngineCalculations";

interface LifestyleRoadmapViewProps {
  milestones: TwinEngineMilestones;
  settings: TwinEngineSettings;
}

const formatMoney = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${value.toFixed(0)}`;
};

interface LifestylePreset {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  geographyCost: number;
  lifestyleTier: string;
  annualExpenses: number;
}

const lifestylePresets: LifestylePreset[] = [
  {
    id: 'frugal_lcol',
    name: 'Frugal in LCOL',
    icon: Home,
    description: 'Low cost of living area, minimal expenses',
    geographyCost: 0.7,
    lifestyleTier: 'Basic',
    annualExpenses: 36000
  },
  {
    id: 'comfortable_mcol',
    name: 'Comfortable in MCOL',
    icon: MapPin,
    description: 'Mid-cost area with balanced lifestyle',
    geographyCost: 1.0,
    lifestyleTier: 'Comfortable',
    annualExpenses: 60000
  },
  {
    id: 'premium_hcol',
    name: 'Premium in HCOL',
    icon: Plane,
    description: 'High cost area with premium lifestyle',
    geographyCost: 1.5,
    lifestyleTier: 'Premium',
    annualExpenses: 120000
  }
];

interface MilestoneItem {
  year: number | null;
  age: number | null;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  achieved: boolean;
}

export function LifestyleRoadmapView({ milestones, settings }: LifestyleRoadmapViewProps) {
  const currentYear = new Date().getFullYear();
  
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
            Choose a lifestyle preset to see how it affects your projection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Settings Display */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="text-sm font-medium">Current Configuration</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Annual Expenses</p>
                <p className="text-lg font-semibold">{formatMoney(settings.annualExpenses)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Monthly Need</p>
                <p className="text-lg font-semibold">{formatMoney(settings.annualExpenses / 12)}</p>
              </div>
            </div>
          </div>

          {/* Lifestyle Presets */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Quick Presets</div>
            {lifestylePresets.map((preset) => {
              const Icon = preset.icon;
              const isActive = Math.abs(settings.annualExpenses - preset.annualExpenses) < 1000;
              
              return (
                <div
                  key={preset.id}
                  className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    isActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${isActive ? 'bg-primary/20' : 'bg-muted'}`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{preset.name}</span>
                        <Badge variant={isActive ? "default" : "secondary"}>
                          {formatMoney(preset.annualExpenses)}/yr
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{preset.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {preset.lifestyleTier}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {preset.geographyCost}x cost
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Geography Info */}
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded-lg">
            <strong>Tip:</strong> Adjust your annual expenses in the Settings panel to match your target lifestyle. 
            Consider geographic arbitrage for faster financial freedom.
          </div>
        </CardContent>
      </Card>

      {/* Right Panel: Wealth Journey Timeline */}
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
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              
              {/* Milestone items */}
              <div className="space-y-6">
                {milestoneItems.map((item, index) => {
                  const Icon = item.icon;
                  const isPast = item.year && item.year <= currentYear;
                  
                  return (
                    <div key={index} className="relative flex gap-4 pl-2">
                      {/* Timeline dot */}
                      <div className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full ${
                        isPast ? 'bg-green-500' : 'bg-muted border-2 border-border'
                      }`}>
                        {isPast ? (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        ) : (
                          <Circle className="w-2 h-2 text-muted-foreground" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${item.color}`} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            Year {item.year}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Age {item.age}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Milestone className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No milestones projected yet.</p>
              <p className="text-xs mt-1">Adjust your settings to see your wealth journey.</p>
            </div>
          )}

          {/* Traditional Comparison */}
          {milestones.tradFreedomYear && milestones.freedomYear && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">Wealth OS Advantage</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                You'll reach freedom <strong>{milestones.tradFreedomYear - milestones.freedomYear} years earlier</strong> than 
                the traditional path (Year {milestones.freedomYear} vs {milestones.tradFreedomYear}).
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
