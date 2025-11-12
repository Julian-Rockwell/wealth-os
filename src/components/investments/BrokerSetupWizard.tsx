import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Step1ChooseBroker } from "./wizard/Step1ChooseBroker";
import { Step2AccountType } from "./wizard/Step2AccountType";
import { Step3Funding } from "./wizard/Step3Funding";
import { Step4OptionsApproval } from "./wizard/Step4OptionsApproval";
import { Step5Connect } from "./wizard/Step5Connect";
import type { TradingStrategy } from "@/types/trading";

interface BrokerSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStrategy: TradingStrategy;
  initialStep?: number;
  onComplete?: () => void;
}

export function BrokerSetupWizard({ 
  isOpen, 
  onClose, 
  selectedStrategy, 
  initialStep = 1,
  onComplete
}: BrokerSetupWizardProps) {
  const { brokerSetup, setBrokerSetup } = useFinancialData();
  const [currentStep, setCurrentStep] = useState(brokerSetup?.wizardStep || initialStep);

  const steps = [
    { number: 1, title: "Choose Broker", component: Step1ChooseBroker },
    { number: 2, title: "Account & Options", component: Step2AccountType },
    { number: 3, title: "Funding", component: Step3Funding },
    { number: 4, title: "Options Approval", component: Step4OptionsApproval },
    { number: 5, title: "Connect & Verify", component: Step5Connect },
  ];

  const currentStepData = steps[currentStep - 1];
  const StepComponent = currentStepData.component;
  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (brokerSetup) {
        setBrokerSetup({ ...brokerSetup, wizardStep: nextStep });
      }
      console.log(`step_completed: ${currentStep}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (brokerSetup) {
        setBrokerSetup({ ...brokerSetup, wizardStep: prevStep });
      }
    }
  };

  const handleComplete = () => {
    console.log('broker_setup_completed');
    if (brokerSetup) {
      setBrokerSetup({ ...brokerSetup, wizardStep: 1 });
    }
    onClose();
    onComplete?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Broker Setup Wizard</DialogTitle>
          <DialogDescription>
            Step {currentStep} of {steps.length}: {currentStepData.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Progress value={progress} className="h-2" />

          <div className="min-h-[400px]">
            <StepComponent 
              selectedStrategy={selectedStrategy}
              onNext={handleNext}
              onComplete={handleComplete}
            />
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < steps.length && (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            Broker approvals and account terms are controlled by the broker. 
            This information is educational, not financial advice.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
