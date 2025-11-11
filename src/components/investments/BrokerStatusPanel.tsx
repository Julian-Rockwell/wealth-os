import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { BROKERS } from "@/utils/brokerRequirements";

export function BrokerStatusPanel() {
  const { brokerSetup } = useFinancialData();

  if (!brokerSetup?.chosenBroker) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Broker Setup Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No broker setup in progress. Start the wizard to begin.
          </p>
        </CardContent>
      </Card>
    );
  }

  const broker = BROKERS.find(b => b.id === brokerSetup.chosenBroker);
  const progress = brokerSetup.progress;

  const steps = [
    { 
      label: 'Broker Selected', 
      status: broker ? 'complete' : 'not-started',
      detail: broker?.name 
    },
    { 
      label: 'Account Type', 
      status: brokerSetup.accountType ? 'complete' : 'not-started',
      detail: brokerSetup.accountType?.toUpperCase() 
    },
    { 
      label: 'Funding', 
      status: progress.funded ? 'complete' : progress.openAccount ? 'in-progress' : 'not-started',
      detail: progress.funded ? 'Complete' : progress.openAccount ? 'In Progress' : 'Not Started'
    },
    { 
      label: 'Options Approval', 
      status: progress.optionsApproved ? 'complete' : progress.optionsSubmitted ? 'in-progress' : 'not-started',
      detail: progress.optionsApproved ? `Level ${brokerSetup.targetOptionsLevel}` : progress.optionsSubmitted ? 'Pending' : 'Not Started'
    },
    { 
      label: 'Connection', 
      status: progress.connected ? 'complete' : 'not-started',
      detail: progress.connected ? 'Connected' : 'Not Connected'
    }
  ];

  const allComplete = steps.every(s => s.status === 'complete');

  const getIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Broker Setup Status</CardTitle>
          {allComplete && (
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
              Ready for Step 4
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              {getIcon(step.status)}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{step.label}</div>
                {step.detail && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {step.detail}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {brokerSetup.notes.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Notes</h4>
            <div className="space-y-1">
              {brokerSetup.notes.map((note, i) => (
                <p key={i} className="text-xs text-muted-foreground">• {note}</p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
