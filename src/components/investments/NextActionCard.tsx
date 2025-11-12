import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Rocket } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { STRATEGY_REQUIREMENTS } from "@/utils/brokerRequirements";

interface NextActionCardProps {
  readinessScore: number;
  onOpenWizard: () => void;
}

export function NextActionCard({ readinessScore, onOpenWizard }: NextActionCardProps) {
  const { selectedStrategy, brokerSetup } = useFinancialData();

  const hasStrategy = !!selectedStrategy;
  const isComplete = brokerSetup?.progress.connected === true;
  const requirements = selectedStrategy ? STRATEGY_REQUIREMENTS[selectedStrategy] : null;

  // If complete, show edit button
  if (isComplete) {
    return (
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Broker Setup Complete</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You're all set! Proceed to Paper Trading to begin practicing your strategy.
              </p>
              <Button variant="outline" onClick={onOpenWizard} className="w-full sm:w-auto">
                Edit Broker Setup
              </Button>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
              Ready for Step 4
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If no strategy selected
  if (!hasStrategy) {
    return (
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <AlertCircle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Next Step: Choose a Strategy</h3>
              <p className="text-sm text-muted-foreground">
                Select a trading strategy below to unlock the Broker Setup wizard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Has strategy but not complete - show start/continue button with warning if low score
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Rocket className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Ready for Broker Setup</h3>
            
            {/* Warning if readiness score < 80 */}
            {readinessScore < 80 && (
              <div className="mb-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-md">
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  ⚠️ Your readiness score is {readinessScore}/100. While you can proceed, 
                  we recommend strengthening your foundation first.
                </p>
              </div>
            )}
            
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p>Your selected strategy requires:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Account Type: {requirements?.accountTypeAllowed.join(' or ')}</li>
                <li>Options Level: L{requirements?.optionsLevelMin}+</li>
                <li>Minimum Balance: ${requirements?.minBalance.toLocaleString()}</li>
              </ul>
            </div>
            <Button onClick={onOpenWizard} className="w-full sm:w-auto">
              {brokerSetup?.chosenBroker ? 'Continue Broker Setup' : 'Start Broker Setup'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
