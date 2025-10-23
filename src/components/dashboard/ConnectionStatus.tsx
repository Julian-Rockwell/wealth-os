import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, XCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import type { Account } from "@/types/financial";

interface ConnectionStatusProps {
  accounts: Account[];
}

export const ConnectionStatus = ({ accounts }: ConnectionStatusProps) => {
  const handleSync = () => {
    toast.success("Syncing accounts...");
  };

  const connectedCount = accounts.filter(a => a.providerStatus === "connected").length;
  const needsAttentionCount = accounts.filter(a => a.providerStatus === "needs_attention").length;
  const disconnectedCount = accounts.filter(a => a.providerStatus === "disconnected").length;

  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Connection Status</h3>
        <Button variant="outline" size="sm" onClick={handleSync}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync
        </Button>
      </div>

      <div className="space-y-3">
        {connectedCount > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <div className="flex-1">
              <p className="text-sm font-medium">Connected</p>
              <p className="text-xs text-muted-foreground">{connectedCount} account(s)</p>
            </div>
          </div>
        )}

        {needsAttentionCount > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10">
            <AlertCircle className="w-5 h-5 text-warning" />
            <div className="flex-1">
              <p className="text-sm font-medium">Needs Attention</p>
              <p className="text-xs text-muted-foreground">{needsAttentionCount} account(s)</p>
            </div>
          </div>
        )}

        {disconnectedCount > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10">
            <XCircle className="w-5 h-5 text-destructive" />
            <div className="flex-1">
              <p className="text-sm font-medium">Disconnected</p>
              <p className="text-xs text-muted-foreground">{disconnectedCount} account(s)</p>
            </div>
          </div>
        )}

        {accounts.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No accounts connected
          </p>
        )}
      </div>

      {accounts.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Last sync: {new Date(accounts[0]?.lastSync || new Date()).toLocaleString()}
          </p>
        </div>
      )}
    </Card>
  );
};
