import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { deriveRequirementsFromStrategies } from "@/utils/deriveRequirements";
import { PERMISSION_TO_LEVEL } from "@/constants/permissions";
import type { TradingStrategy } from "@/types/trading";

interface Step2Props {
  selectedStrategy: TradingStrategy;
  onNext: () => void;
  onComplete?: () => void;
}

export function Step2AccountType({ selectedStrategy, onNext }: Step2Props) {
  const { brokerSetup, setBrokerSetup, selectedStrategies, strategyAssessmentAnswers } = useFinancialData();
  
  const experienceLevel = strategyAssessmentAnswers.experience 
    ? parseInt(strategyAssessmentAnswers.experience) 
    : undefined;
  
  const requirements = useMemo(() => {
    return deriveRequirementsFromStrategies(selectedStrategies || [selectedStrategy], experienceLevel);
  }, [selectedStrategies, selectedStrategy, experienceLevel]);

  // POLICY: Default to Margin, derive usageHint
  const usageHint: 'cash_discipline' | 'normal' = 
    (experienceLevel && experienceLevel <= 2) ? 'cash_discipline' : 'normal';
  
  const [selectedAccountType, setSelectedAccountType] = useState<'cash' | 'margin' | 'retirement'>(
    brokerSetup?.accountType || 'margin'
  );
  
  const [cashOverrideWarning, setCashOverrideWarning] = useState<string | null>(null);
  const [cashBlockError, setCashBlockError] = useState<string | null>(null);

  const requiresMarginPermissions = PERMISSION_TO_LEVEL[requirements.requiredPermission] >= PERMISSION_TO_LEVEL["spreads"];

  const handleAccountTypeChange = (value: 'cash' | 'margin' | 'retirement') => {
    setSelectedAccountType(value);
    setCashOverrideWarning(null);
    setCashBlockError(null);
    
    if (value === 'cash') {
      if (requiresMarginPermissions) {
        // BLOCK: spreads/naked require margin
        setCashBlockError("This strategy requires margin approval. Please keep Account Type = Margin.");
        console.log('cash_override_attempted', { requiredPermission: requirements.requiredPermission });
      } else {
        // WARN: stocks/wheel can use cash but margin is recommended
        setCashOverrideWarning("Cash accounts can limit option permissions. You may need a margin upgrade later.");
      }
    }
  };

  const handleContinue = () => {
    if (!brokerSetup) return;
    
    // Block if trying to continue with Cash when spreads/naked required
    if (selectedAccountType === 'cash' && requiresMarginPermissions) {
      return;
    }

    setBrokerSetup({
      ...brokerSetup,
      accountType: selectedAccountType,
      targetOptionsLevel: PERMISSION_TO_LEVEL[requirements.requiredPermission] as 0 | 1 | 2 | 3 | 4,
      usageHint: selectedAccountType === 'margin' ? usageHint : 'normal',
    });
    
    console.log('usageHint:', usageHint);

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Account Type & Options Level</h3>
        <p className="text-sm text-muted-foreground">
          Select the account type that fits your needs and ensure you apply for 
          the correct options approval level.
        </p>
      </div>

      {/* Caution Banner for Experience 1-2 */}
      {experienceLevel && experienceLevel <= 2 && (
        <Alert className="bg-amber-500/5 border-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-700 dark:text-amber-400">Caution for New Traders</AlertTitle>
          <AlertDescription className="text-amber-600 dark:text-amber-300">
            Open Margin to future-proof your account, but <strong>use it like Cash</strong> for the first year: 
            avoid borrowing on margin and focus on foundational execution.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Label className="text-base font-semibold">Select Account Type</Label>
        <RadioGroup value={selectedAccountType} onValueChange={handleAccountTypeChange}>
          <div className="space-y-3">
            {/* Cash Account */}
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Cash Account</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Trade with settled funds only. Best for beginners to build discipline.
                </p>
              </Label>
            </div>

            {/* Margin Account - RECOMMENDED */}
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors border-primary/40 bg-primary/5">
              <RadioGroupItem value="margin" id="margin" />
              <Label htmlFor="margin" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Margin Account</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                    Recommended
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Future-proof option. Required for spreads and advanced strategies.
                  {experienceLevel && experienceLevel <= 2 && " Use like cash initially."}
                </p>
              </Label>
            </div>

            {/* Retirement Account */}
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="retirement" id="retirement" />
              <Label htmlFor="retirement" className="flex-1 cursor-pointer">
                <span className="font-semibold">Retirement Account (IRA)</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Tax-advantaged account. Limited margin, specific rules apply.
                </p>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Cash Override Warning */}
      {cashOverrideWarning && (
        <Alert className="bg-amber-500/5 border-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-600 dark:text-amber-300">
            {cashOverrideWarning}
          </AlertDescription>
        </Alert>
      )}

      {/* Cash Block Error */}
      {cashBlockError && (
        <Alert className="bg-destructive/10 border-destructive/20">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            {cashBlockError}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Guidance bullets */}
      <div className="bg-muted/50 border rounded-lg p-4">
        <h4 className="font-medium mb-2 text-sm">Tips for Options Approval</h4>
        <ul className="text-sm space-y-2 text-muted-foreground">
          <li>• Complete the broker's options application honestly</li>
          {PERMISSION_TO_LEVEL[requirements.requiredPermission] >= PERMISSION_TO_LEVEL["wheel"] && (
            <li>• Indicate you have options trading knowledge</li>
          )}
          {PERMISSION_TO_LEVEL[requirements.requiredPermission] >= PERMISSION_TO_LEVEL["spreads"] && (
            <li>• Show experience with spreads & risk management</li>
          )}
          <li>• Higher net worth and income improve approval chances</li>
          <li>• Paper trading experience demonstrates readiness</li>
        </ul>
      </div>

      <div className="bg-muted/50 border rounded-lg p-4">
        <h4 className="font-medium mb-3">Example Options Levels</h4>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li><strong>Level 0:</strong> No options trading</li>
          <li><strong>Level 1:</strong> Covered calls, protective puts</li>
          <li><strong>Level 2:</strong> Long calls/puts, cash-secured puts</li>
          <li><strong>Level 3:</strong> Spreads (required for advanced strategies)</li>
          <li><strong>Level 4:</strong> Naked calls/puts (advanced, high risk)</li>
        </ul>
      </div>

      <Button
        onClick={handleContinue}
        className="w-full"
        disabled={!!cashBlockError}
      >
        Continue to Funding
      </Button>
    </div>
  );
}
