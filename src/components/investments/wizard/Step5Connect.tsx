import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, Rocket } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { deriveRequirementsFromStrategies } from "@/utils/deriveRequirements";
import { BROKERS } from "@/utils/brokerRequirements";
import { PERMISSION_TO_LEVEL } from "@/constants/permissions";
import type { TradingStrategy } from "@/types/trading";

interface Step5Props {
  selectedStrategy: TradingStrategy;
  onNext?: () => void;
  onComplete: () => void;
}

export function Step5Connect({ selectedStrategy, onComplete }: Step5Props) {
  const { brokerSetup, setBrokerSetup, availableCapital, selectedStrategies, strategyAssessmentAnswers } = useFinancialData();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(brokerSetup?.progress.connected || false);
  
  const experienceLevel = strategyAssessmentAnswers.experience 
    ? parseInt(strategyAssessmentAnswers.experience) 
    : undefined;
  
  const requirements = useMemo(() => {
    return deriveRequirementsFromStrategies(selectedStrategies || [selectedStrategy], experienceLevel);
  }, [selectedStrategies, selectedStrategy, experienceLevel]);
  
  const broker = BROKERS.find(b => b.id === brokerSetup?.chosenBroker);

  const handleConnect = async () => {
    setIsConnecting(true);
    console.log('broker_connection_initiated');
    
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!brokerSetup) return;

    setBrokerSetup({
      ...brokerSetup,
      progress: {
        ...brokerSetup.progress,
        connected: true,
      },
    });

    setIsConnected(true);
    setIsConnecting(false);
    console.log('broker_connection_complete');
  };

  const requiredLevel = PERMISSION_TO_LEVEL[requirements.requiredPermission];
  
  const checks = [
    {
      label: 'Broker Account Configured',
      status: broker ? 'pass' : 'fail',
      detail: broker?.name,
    },
    {
      label: 'Suggested Balance Met',
      status: availableCapital >= requirements.minBalance ? 'pass' : 'fail',
      detail: `Suggested: $${requirements.minBalance.toLocaleString()}, Available: $${availableCapital.toLocaleString()}`,
    },
    {
      label: 'Permissions Confirmed',
      status: brokerSetup?.progress.optionsApproved && brokerSetup.targetOptionsLevel >= requiredLevel ? 'pass' : 'fail',
      detail: `Required: ${requirements.requiredPermissionText}`,
    },
    {
      label: 'Funds Settled',
      status: brokerSetup?.progress.funded ? 'pass' : 'fail',
      detail: brokerSetup?.progress.funded ? 'Complete' : 'Pending',
    },
  ];

  const allChecksPassed = checks.every(c => c.status === 'pass') && isConnected;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Connect & Verify</h3>
        <p className="text-sm text-muted-foreground">
          Connect your broker to Wealth OS and verify all requirements are met.
        </p>
      </div>

      {!isConnected ? (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Ready to Connect</h4>
                <p className="text-sm text-muted-foreground">
                  Click the button below to establish a connection with {broker?.name}
                </p>
              </div>
              <Button 
                onClick={handleConnect}
                disabled={isConnecting}
                size="lg"
                className="w-full max-w-xs mx-auto"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect to Wealth OS'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h4 className="font-semibold text-green-600">Connection Established</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Successfully connected to {broker?.name}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Verification Checklist</h4>
        {checks.map((check, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 border rounded-lg p-4"
          >
            {check.status === 'pass' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{check.label}</span>
                <Badge 
                  variant="outline" 
                  className={check.status === 'pass' ? 'bg-green-500/10 text-green-600' : ''}
                >
                  {check.status === 'pass' ? 'Pass' : 'Not Met'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {check.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {allChecksPassed && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Setup Complete!</h4>
                <p className="text-sm text-muted-foreground">
                  Your broker is configured and ready. You can now proceed to Paper Trading 
                  to practice your strategy.
                </p>
              </div>
              <Button 
                onClick={onComplete}
                size="lg"
                className="w-full max-w-xs mx-auto"
              >
                Proceed to Paper Trading
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!allChecksPassed && isConnected && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Some requirements are not yet met. Complete the outstanding items before 
            proceeding to Paper Trading.
          </p>
        </div>
      )}
    </div>
  );
}
