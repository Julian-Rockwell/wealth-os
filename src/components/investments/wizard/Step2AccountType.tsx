import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
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

  // Determine recommended account type based on experience
  const recommendedAccountType = experienceLevel && experienceLevel <= 3 ? 'cash' : 'margin';
  
  // Initialize selection with recommended type if not already set
  const [selectedAccountType, setSelectedAccountType] = useState<'cash' | 'margin' | 'retirement'>(
    brokerSetup?.accountType || recommendedAccountType
  );

  const handleContinue = () => {
    if (!brokerSetup) return;

    setBrokerSetup({
      ...brokerSetup,
      accountType: selectedAccountType,
      targetOptionsLevel: PERMISSION_TO_LEVEL[requirements.requiredPermission] as 0 | 1 | 2 | 3 | 4,
    });

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

      <div className="space-y-4">
        <Label className="text-base font-semibold">Select Account Type</Label>
        <RadioGroup value={selectedAccountType} onValueChange={(value) => setSelectedAccountType(value as 'cash' | 'margin' | 'retirement')}>
          <div className="space-y-3">
            {/* Cash Account */}
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Cash Account</span>
                  {recommendedAccountType === 'cash' && (
                    <Badge variant="success" className="text-xs">Recommended</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Trade with settled funds only. Best for beginners to build discipline.
                </p>
              </Label>
            </div>

            {/* Margin Account */}
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="margin" id="margin" />
              <Label htmlFor="margin" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Margin Account</span>
                  {recommendedAccountType === 'margin' && (
                    <Badge variant="success" className="text-xs">Recommended</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Trade with leverage. Required for spreads and advanced strategies.
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

      {experienceLevel && experienceLevel <= 3 && (
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle>Recommendation for Beginners</AlertTitle>
          <AlertDescription>
            💡 Rockwell Trading recommends cash accounts for first-year traders to build discipline 
            and avoid overleveraging.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Guidance bullets condicionales */}
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
      >
        Continue to Funding
      </Button>
    </div>
  );
}
