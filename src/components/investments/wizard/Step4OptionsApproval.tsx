import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { STRATEGY_REQUIREMENTS } from "@/utils/brokerRequirements";
import type { TradingStrategy } from "@/types/trading";

interface Step4Props {
  selectedStrategy: TradingStrategy;
  onNext: () => void;
  onComplete?: () => void;
}

type ApprovalStatus = 'not-started' | 'submitted' | 'pending' | 'approved';

export function Step4OptionsApproval({ selectedStrategy, onNext }: Step4Props) {
  const { brokerSetup, setBrokerSetup } = useFinancialData();
  const requirements = STRATEGY_REQUIREMENTS[selectedStrategy];
  
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>(
    brokerSetup?.progress.optionsApproved ? 'approved' :
    brokerSetup?.progress.optionsSubmitted ? 'pending' : 'not-started'
  );
  
  const [approvedLevel, setApprovedLevel] = useState<number>(
    brokerSetup?.targetOptionsLevel || requirements.optionsLevelMin
  );

  const handleContinue = () => {
    if (!brokerSetup) return;

    setBrokerSetup({
      ...brokerSetup,
      progress: {
        ...brokerSetup.progress,
        optionsSubmitted: approvalStatus !== 'not-started',
        optionsApproved: approvalStatus === 'approved',
      },
      targetOptionsLevel: approvedLevel as any,
    });

    onNext();
  };

  const levelMet = approvalStatus === 'approved' && approvedLevel >= requirements.optionsLevelMin;
  const canContinue = approvalStatus !== 'not-started';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Options Trading Approval</h3>
        <p className="text-sm text-muted-foreground">
          Apply for options approval through your broker. Track your approval status here.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Required Level: </strong>
          <Badge variant="outline" className="ml-2">
            Level {requirements.optionsLevelMin}+
          </Badge>
          <div className="mt-2 text-sm">
            Your strategy requires at least Level {requirements.optionsLevelMin} options approval 
            to trade the necessary strategies.
          </div>
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <Label>Approval Status</Label>
        <RadioGroup value={approvalStatus} onValueChange={(v) => setApprovalStatus(v as ApprovalStatus)}>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 border rounded-lg p-4">
              <RadioGroupItem value="not-started" id="not-started" />
              <div className="flex-1">
                <Label htmlFor="not-started" className="font-medium cursor-pointer">
                  Not Started
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Haven't applied yet
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 border rounded-lg p-4">
              <RadioGroupItem value="submitted" id="submitted" />
              <div className="flex-1">
                <Label htmlFor="submitted" className="font-medium cursor-pointer">
                  Application Submitted
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Waiting for broker review
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 border rounded-lg p-4">
              <RadioGroupItem value="pending" id="pending" />
              <div className="flex-1">
                <Label htmlFor="pending" className="font-medium cursor-pointer">
                  Under Review
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Broker is processing your application
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 border rounded-lg p-4 bg-green-500/5">
              <RadioGroupItem value="approved" id="approved" />
              <div className="flex-1">
                <Label htmlFor="approved" className="font-medium cursor-pointer flex items-center gap-2">
                  Approved
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Options approval granted
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      {approvalStatus === 'approved' && (
        <div className="space-y-3">
          <Label>Approved Options Level</Label>
          <RadioGroup value={approvedLevel.toString()} onValueChange={(v) => setApprovedLevel(parseInt(v))}>
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value={level.toString()} id={`level-${level}`} />
                  <Label htmlFor={`level-${level}`} className="cursor-pointer">
                    L{level}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {approvalStatus === 'approved' && !levelMet && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Insufficient Level</strong>
            <div className="mt-1">
              Your approved level (L{approvedLevel}) is below the required level (L{requirements.optionsLevelMin}). 
              You may need to re-apply with updated information or contact your broker.
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
        <h4 className="text-sm font-semibold">Options Levels Explained</h4>
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
        disabled={!canContinue}
        className="w-full"
      >
        Continue to Connect & Verify
      </Button>
    </div>
  );
}
