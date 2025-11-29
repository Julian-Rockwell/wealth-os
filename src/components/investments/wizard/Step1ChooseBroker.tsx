import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Crown } from "lucide-react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { 
  filterCompatibleBrokers, 
  getBestMatchBroker, 
  STRATEGY_REQUIREMENTS 
} from "@/utils/brokerRequirements";
import type { TradingStrategy, BrokerId } from "@/types/trading";

interface Step1Props {
  selectedStrategy: TradingStrategy;
  onNext: () => void;
  onComplete?: () => void;
}

export function Step1ChooseBroker({ selectedStrategy, onNext }: Step1Props) {
  const { brokerSetup, setBrokerSetup } = useFinancialData();
  
  const compatibleBrokers = filterCompatibleBrokers(selectedStrategy);
  const bestMatch = getBestMatchBroker(selectedStrategy);
  const requirements = STRATEGY_REQUIREMENTS[selectedStrategy];

  const handleSelectBroker = (brokerId: BrokerId) => {
    console.log(`broker_selected: ${brokerId}`);
    
    setBrokerSetup({
      ...brokerSetup,
      chosenBroker: brokerId,
      accountType: brokerSetup?.accountType || null,
      targetOptionsLevel: requirements.optionsLevelMin,
      wizardStep: 1,
      progress: {
        openAccount: false,
        funded: false,
        optionsSubmitted: false,
        optionsApproved: false,
        connected: false,
      },
      notes: [],
    });
    
    onNext();
  };

  if (compatibleBrokers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          No brokers currently meet your strategy requirements.
        </div>
        <p className="text-sm text-muted-foreground">
          Required: Options Level {requirements.optionsLevelMin}+
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Select Your Broker</h3>
        <p className="text-sm text-muted-foreground">
          Choose a broker that meets your strategy requirements. 
          The best match is highlighted based on fees, features, and approval speed.
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Broker</TableHead>
              <TableHead>Fee/Contract</TableHead>
              <TableHead>Paper Trading</TableHead>
              <TableHead>API</TableHead>
              <TableHead>Approval Speed</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compatibleBrokers.map((broker) => {
              const isBestMatch = broker.id === bestMatch?.id;
              const isSelected = brokerSetup?.chosenBroker === broker.id;
              
              return (
                <TableRow key={broker.id} className={isBestMatch ? "bg-primary/5" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{broker.name}</span>
                      {isBestMatch && (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                          <Crown className="w-3 h-3 mr-1" />
                          Best Match
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">${broker.feePerContract}</span>
                  </TableCell>
                  <TableCell>
                    {broker.paper ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {broker.api === true ? 'Yes' : broker.api === 'limited' ? 'Limited' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {broker.approvalSpeed}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {isSelected ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        Selected
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant={isBestMatch ? "default" : "outline"}
                        onClick={() => handleSelectBroker(broker.id)}
                      >
                        Use This Broker
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
