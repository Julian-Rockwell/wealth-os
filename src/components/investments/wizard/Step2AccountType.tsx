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
  const { brokerSetup, setBrokerSetup, selectedStrategies } = useFinancialData();
  
  const requirements = useMemo(() => {
    return deriveRequirementsFromStrategies(selectedStrategies || [selectedStrategy]);
  }, [selectedStrategies, selectedStrategy]);
  
  const [accountType, setAccountType] = useState<'cash' | 'margin' | 'retirement' | null>(
    brokerSetup?.accountType || null
  );

  const handleContinue = () => {
    if (!accountType || !brokerSetup) return;

    setBrokerSetup({
      ...brokerSetup,
      accountType,
      targetOptionsLevel: PERMISSION_TO_LEVEL[requirements.requiredPermission] as 0 | 1 | 2 | 3 | 4,
    });

    onNext();
  };

  const accountTypes = [
    {
      value: 'cash',
      label: 'Cash Account',
      description: 'No margin borrowing. Settled funds required. Good for beginners.',
      allowed: requirements.accountType === 'cash' || true
    },
    {
      value: 'margin',
      label: 'Margin Account',
      description: 'Allows borrowing and advanced strategies. Required for spreads.',
      allowed: true
    },
    {
      value: 'retirement',
      label: 'Retirement Account (IRA)',
      description: 'Tax-advantaged but limited options strategies.',
      allowed: requirements.accountType === 'cash'
    }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Account Type & Options Level</h3>
        <p className="text-sm text-muted-foreground">
          Select the account type that fits your needs and ensure you apply for 
          the correct options approval level.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Required Permissions</AlertTitle>
        <AlertDescription>
          Your selected strategy requires: <strong>{requirements.requiredPermissionText}</strong>
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

      <div className="space-y-4">
        <Label>Choose Account Type</Label>
        <RadioGroup value={accountType || ''} onValueChange={(v) => setAccountType(v as any)}>
          <div className="space-y-3">
            {accountTypes.map((type) => (
              <div
                key={type.value}
                className={`flex items-start space-x-3 border rounded-lg p-4 ${
                  !type.allowed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary'
                }`}
              >
                <RadioGroupItem 
                  value={type.value} 
                  id={type.value}
                  disabled={!type.allowed}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor={type.value} 
                    className={`font-medium ${!type.allowed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {type.label}
                    {!type.allowed && (
                      <Badge variant="outline" className="ml-2 text-xs">Not Compatible</Badge>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
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
        disabled={!accountType}
        className="w-full"
      >
        Continue to Funding
      </Button>
    </div>
  );
}
