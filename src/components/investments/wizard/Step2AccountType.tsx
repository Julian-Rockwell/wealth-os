import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { STRATEGY_REQUIREMENTS } from "@/utils/brokerRequirements";
import type { TradingStrategy } from "@/types/trading";

interface Step2Props {
  selectedStrategy: TradingStrategy;
  onNext: () => void;
  onComplete?: () => void;
}

export function Step2AccountType({ selectedStrategy, onNext }: Step2Props) {
  const { brokerSetup, setBrokerSetup } = useFinancialData();
  const requirements = STRATEGY_REQUIREMENTS[selectedStrategy];
  
  const [accountType, setAccountType] = useState<'cash' | 'margin' | 'retirement' | null>(
    brokerSetup?.accountType || null
  );

  const handleContinue = () => {
    if (!accountType || !brokerSetup) return;

    setBrokerSetup({
      ...brokerSetup,
      accountType,
      targetOptionsLevel: requirements.optionsLevelMin,
    });

    onNext();
  };

  const accountTypes = [
    {
      value: 'cash',
      label: 'Cash Account',
      description: 'No margin borrowing. Settled funds required. Good for beginners.',
      allowed: requirements.accountTypeAllowed.includes('cash')
    },
    {
      value: 'margin',
      label: 'Margin Account',
      description: 'Allows borrowing and advanced strategies. Required for spreads.',
      allowed: requirements.accountTypeAllowed.includes('margin')
    },
    {
      value: 'retirement',
      label: 'Retirement Account (IRA)',
      description: 'Tax-advantaged but limited options strategies.',
      allowed: requirements.accountTypeAllowed.includes('retirement')
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
        <AlertDescription>
          <strong>Required Options Level: </strong>
          <Badge variant="outline" className="ml-2">
            Level {requirements.optionsLevelMin}+
          </Badge>
          <div className="mt-2 text-sm">
            Your strategy requires at least Level {requirements.optionsLevelMin} options approval.
          </div>
        </AlertDescription>
      </Alert>

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

      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
        <h4 className="text-sm font-semibold">Tips for Options Approval</h4>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
          <li>
            Be truthful about your trading experience and financial situation
          </li>
          <li>
            For Level 2+: Indicate you have options trading knowledge
          </li>
          <li>
            For Level 3+: Show experience with spreads and risk management
          </li>
          <li>
            Investment objective: Select "Income" or "Growth" rather than "Preservation"
          </li>
          <li>
            If denied, you can re-apply after gaining more experience or adjusting your profile
          </li>
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
