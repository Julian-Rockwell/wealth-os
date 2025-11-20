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

  const handleContinue = () => {
    if (!brokerSetup) return;

    // Convert "cash or margin" to actual account type for storage
    let finalAccountType: 'cash' | 'margin' | 'retirement';
    
    if (requirements.accountType === "cash or margin") {
      // For experienced traders, default to margin but they could choose cash
      finalAccountType = "margin";
    } else {
      finalAccountType = requirements.accountType as 'cash' | 'margin';
    }

    setBrokerSetup({
      ...brokerSetup,
      accountType: finalAccountType,
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

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle>Recommended Account Type</AlertTitle>
        <AlertDescription>
          <div className="space-y-2">
            <p>
              Based on your experience level {experienceLevel ? `(${experienceLevel})` : ''}, we recommend:
            </p>
            <p className="font-semibold text-foreground capitalize">
              {requirements.accountType} Account
            </p>
            {experienceLevel && experienceLevel <= 3 && (
              <p className="text-xs mt-2">
                💡 Rockwell Trading recommends cash accounts for first-year traders to build discipline 
                and avoid overleveraging.
              </p>
            )}
            {requirements.accountType === "cash or margin" && (
              <p className="text-xs mt-2">
                ✅ With your experience level, you can choose either Cash or Margin account based on your 
                strategy needs and risk tolerance.
              </p>
            )}
          </div>
        </AlertDescription>
      </Alert>
      
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
