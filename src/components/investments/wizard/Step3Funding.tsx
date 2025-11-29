import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DollarSign, AlertCircle } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { deriveRequirementsFromStrategies } from "@/utils/deriveRequirements";
import type { TradingStrategy } from "@/types/trading";

interface Step3Props {
  selectedStrategy: TradingStrategy;
  onNext: () => void;
  onComplete?: () => void;
}

export function Step3Funding({ selectedStrategy, onNext }: Step3Props) {
  const { brokerSetup, setBrokerSetup, availableCapital, selectedStrategies, strategyAssessmentAnswers } = useFinancialData();
  
  const experienceLevel = strategyAssessmentAnswers?.experience 
    ? parseInt(strategyAssessmentAnswers.experience) 
    : undefined;

  const requirements = useMemo(() => {
    return deriveRequirementsFromStrategies(selectedStrategies || [], experienceLevel);
  }, [selectedStrategies, experienceLevel]);
  
  const progress = brokerSetup?.progress || {
    openAccount: false,
    funded: false,
    optionsSubmitted: false,
    optionsApproved: false,
    connected: false,
  };

  const isUnderfunded = availableCapital < requirements.minBalance;

  const handleToggle = (field: 'openAccount' | 'funded') => {
    if (!brokerSetup) return;

    const newProgress = { ...progress, [field]: !progress[field] };
    
    setBrokerSetup({
      ...brokerSetup,
      progress: newProgress,
    });
  };

  const handleContinue = () => {
    onNext();
  };

  const checklist = [
    {
      id: 'openAccount',
      label: 'Account Opened',
      description: 'Successfully created broker account',
      checked: progress.openAccount,
    },
    {
      id: 'transfer',
      label: 'Transfer Initiated',
      description: 'ACH transfer or wire initiated to fund account',
      checked: progress.openAccount && !progress.funded, // Implied step
    },
    {
      id: 'funded',
      label: 'Funds Settled',
      description: 'Minimum balance requirement met and funds available',
      checked: progress.funded,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Fund Your Account</h3>
        <p className="text-sm text-muted-foreground">
          Ensure your account meets the minimum funding requirements for your selected strategy.
        </p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Suggested Balance</div>
                  <div className="text-2xl font-bold">
                    ${requirements.minBalance.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Available Capital</div>
                  <div className={`text-2xl font-bold ${isUnderfunded ? 'text-amber-500' : 'text-green-500'}`}>
                    ${availableCapital.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isUnderfunded && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your available capital is below the suggested balance for this strategy. 
            Consider building more capital before starting live trading.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Label className="text-base">Funding Checklist</Label>
        {checklist.map((item, index) => (
          <div 
            key={item.id}
            className="flex items-start space-x-3 border rounded-lg p-4"
          >
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={() => {
                if (item.id === 'openAccount' || item.id === 'funded') {
                  handleToggle(item.id);
                }
              }}
              disabled={item.id === 'transfer'}
            />
            <div className="flex-1">
              <Label 
                htmlFor={item.id}
                className="font-medium cursor-pointer flex items-center gap-2"
              >
                <span className="text-muted-foreground">
                  {index + 1}.
                </span>
                {item.label}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <h4 className="text-sm font-semibold">Important Notes</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>ACH transfers typically take 2-5 business days to settle</li>
          <li>Wire transfers settle same or next day but may have fees</li>
          <li>You cannot trade options until funds are fully settled</li>
          <li>Start with the minimum and add more as you gain confidence</li>
        </ul>
      </div>

      <Button 
        onClick={handleContinue}
        className="w-full"
      >
        Continue to Options Approval
      </Button>
    </div>
  );
}
