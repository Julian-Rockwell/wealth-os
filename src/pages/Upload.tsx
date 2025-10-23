import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle, TrendingUp, Plus, Link2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { Account, Holding, Liability, FinancialSnapshot, AccountStatus } from "@/types/financial";

interface FileUploadState {
  file: File;
  progress: number;
  status: "uploading" | "processing" | "complete" | "error";
  months?: number;
  transactions?: number;
}

interface MockConnection {
  id: string;
  name: string;
  status: AccountStatus;
  lastSync: string;
  balance: number;
  type: "bank" | "card" | "investment";
}

export default function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mockConnections, setMockConnections] = useState<MockConnection[]>([]);
  const [manualHoldings, setManualHoldings] = useState<Holding[]>([]);
  const [manualLiabilities, setManualLiabilities] = useState<Liability[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = async (newFiles: File[]) => {
    const validFormats = [".pdf", ".csv", ".xlsx", ".xls", ".png", ".jpg", ".jpeg"];
    const invalidFiles = newFiles.filter(
      (file) => !validFormats.some((format) => file.name.toLowerCase().endsWith(format))
    );

    if (invalidFiles.length > 0) {
      toast.error("Some files have unsupported formats");
      return;
    }

    const tooLargeFiles = newFiles.filter((file) => file.size > 50 * 1024 * 1024);
    if (tooLargeFiles.length > 0) {
      toast.error("Some files exceed 50MB limit");
      return;
    }

    const uploadStates: FileUploadState[] = newFiles.map((file) => ({
      file,
      progress: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...uploadStates]);

    // Simulate file processing
    for (let i = files.length; i < files.length + uploadStates.length; i++) {
      simulateFileProcessing(i);
    }
  };

  const simulateFileProcessing = async (index: number) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setFiles((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], progress };
        return updated;
      });
    }

    // Switch to processing
    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: "processing" };
      return updated;
    });

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Complete with mock data
    const mockMonths = Math.floor(Math.random() * 4) + 3;
    const mockTransactions = Math.floor(Math.random() * 200) + 50;

    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        status: "complete",
        months: mockMonths,
        transactions: mockTransactions,
      };
      return updated;
    });
  };

  const addMockConnection = () => {
    const mockAccounts = [
      { name: "Chase Checking", type: "bank" as const, balance: 5000 + Math.random() * 10000 },
      { name: "Wells Fargo Savings", type: "bank" as const, balance: 20000 + Math.random() * 30000 },
      { name: "Amex Gold Card", type: "card" as const, balance: -(1000 + Math.random() * 3000) },
      { name: "Fidelity 401(k)", type: "investment" as const, balance: 50000 + Math.random() * 100000 },
    ];

    const newAccount = mockAccounts[Math.floor(Math.random() * mockAccounts.length)];
    const connection: MockConnection = {
      id: `mock-${Date.now()}`,
      name: newAccount.name,
      status: "connected",
      lastSync: new Date().toISOString(),
      balance: newAccount.balance,
      type: newAccount.type,
    };

    setMockConnections((prev) => [...prev, connection]);
    toast.success(`Connected to ${newAccount.name}`);
  };

  const addManualHolding = () => {
    const newHolding: Holding = {
      id: `holding-${Date.now()}`,
      accountId: "manual-1",
      name: "New Asset",
      accountType: "other",
      assetClass: "other",
      liquidity: "liquid",
      balance: 0,
      currency: "USD",
      source: "manual",
    };
    setManualHoldings((prev) => [...prev, newHolding]);
  };

  const addManualLiability = () => {
    const newLiability: Liability = {
      id: `liability-${Date.now()}`,
      accountId: "manual-1",
      name: "New Liability",
      type: "other",
      apr: 0,
      balance: 0,
      monthlyPayment: 0,
      remainingTermMonths: 0,
    };
    setManualLiabilities((prev) => [...prev, newLiability]);
  };

  const totalMonths = files.reduce((sum, f) => sum + (f.months || 0), 0);
  const totalTransactions = files.reduce((sum, f) => sum + (f.transactions || 0), 0);
  const allFilesComplete = files.length === 0 || files.every((f) => f.status === "complete");
  const hasMinimumData = totalMonths >= 3 || mockConnections.length >= 2 || manualHoldings.length >= 3;
  const totalAccounts = files.length + mockConnections.length + (manualHoldings.length > 0 ? 1 : 0);

  const handleContinue = () => {
    if (!hasMinimumData) {
      toast.error("Please provide at least 3 months of data or connect 2+ accounts");
      return;
    }

    setIsAnalyzing(true);
    toast.success("Preparing Command Center...");

    // Build financial snapshot
    const snapshot: FinancialSnapshot = {
      accounts: mockConnections.map(c => ({
        id: c.id,
        name: c.name,
        type: c.type === "bank" ? "checking" : c.type === "card" ? "checking" : "brokerage",
        providerStatus: c.status,
        lastSync: c.lastSync,
        balance: c.balance,
      })),
      holdings: manualHoldings,
      liabilities: manualLiabilities,
      trends: {
        d30: { abs: 0, pct: 0 },
        d60: { abs: 0, pct: 0 },
        d90: { abs: 0, pct: 0 },
      },
      stagingTxns: [],
      syncLog: [],
      netWorth: {
        assets: manualHoldings.reduce((sum, h) => sum + h.balance, 0) + mockConnections.reduce((sum, c) => sum + (c.balance > 0 ? c.balance : 0), 0),
        liabilities: manualLiabilities.reduce((sum, l) => sum + l.balance, 0) + mockConnections.reduce((sum, c) => sum + (c.balance < 0 ? Math.abs(c.balance) : 0), 0),
        net: 0,
      },
      analyzedPeriod: {
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
        totalMonths: Math.max(totalMonths, 3),
      },
      uiFlags: {
        reviewedIn11: true,
        readyFor12: true,
      },
    };

    snapshot.netWorth.net = snapshot.netWorth.assets - snapshot.netWorth.liabilities;

    // Store in localStorage
    localStorage.setItem("financialSnapshot", JSON.stringify(snapshot));

    setTimeout(() => {
      navigate("/app");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6 shadow-medium">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Rockwell Wealth OS
          </h1>
          <p className="text-xl text-muted-foreground mb-6">Financial Command Center</p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Upload AT LEAST 3 months of financial statements in any format (PDF, CSV, Excel, images). 
            Connect mock accounts or enter data manually. The more data provided, the more accurate the analysis.
          </p>
        </div>

        {/* Three Input Methods */}
        <Tabs defaultValue="upload" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="mock">
              <Link2 className="w-4 h-4 mr-2" />
              Mock Connect
            </TabsTrigger>
            <TabsTrigger value="upload">
              <UploadIcon className="w-4 h-4 mr-2" />
              Upload Files
            </TabsTrigger>
            <TabsTrigger value="manual">
              <Edit3 className="w-4 h-4 mr-2" />
              Manual Entry
            </TabsTrigger>
          </TabsList>

          {/* Mock Connect Tab */}
          <TabsContent value="mock">
            <Card className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Simulate Account Connections</h3>
                <p className="text-muted-foreground">
                  Mock Plaid/MX integration for demo purposes
                </p>
              </div>
              
              <Button onClick={addMockConnection} className="w-full mb-6" size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Connect Mock Account
              </Button>

              {mockConnections.length > 0 && (
                <div className="space-y-3">
                  {mockConnections.map((conn) => (
                    <div key={conn.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <div>
                          <p className="font-medium">{conn.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Last sync: {new Date(conn.lastSync).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        ${Math.abs(conn.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Upload Files Tab */}
          <TabsContent value="upload">
            <Card
              className={`p-12 border-2 border-dashed transition-all cursor-pointer shadow-soft ${
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                  <UploadIcon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Drop your files here</h3>
                <p className="text-muted-foreground mb-6">or click to browse</p>
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".pdf,.csv,.xlsx,.xls,.png,.jpg,.jpeg"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button asChild size="lg" className="gradient-primary">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Select Files
                  </label>
                </Button>
              </div>
            </Card>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-4 mt-6">
                {files.map((fileState, index) => (
                  <Card key={index} className="p-4 shadow-soft">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          fileState.status === "complete"
                            ? "bg-success/10"
                            : fileState.status === "error"
                            ? "bg-destructive/10"
                            : "bg-primary/10"
                        }`}
                      >
                        {fileState.status === "complete" ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : fileState.status === "error" ? (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        ) : (
                          <FileText className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{fileState.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {fileState.status === "complete"
                            ? `${fileState.months} months • ${fileState.transactions} transactions`
                            : fileState.status === "processing"
                            ? "Processing..."
                            : fileState.status === "uploading"
                            ? "Uploading..."
                            : "Error processing file"}
                        </p>
                        {fileState.status !== "complete" && (
                          <Progress value={fileState.progress} className="mt-2 h-1" />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Manual Entry Tab */}
          <TabsContent value="manual">
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Assets & Holdings</h3>
                  <Button onClick={addManualHolding} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Asset
                  </Button>
                </div>
                {manualHoldings.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No assets added yet. Click "Add Asset" to start.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {manualHoldings.map((holding) => (
                      <div key={holding.id} className="p-3 rounded-lg bg-muted">
                        <p className="font-medium">{holding.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${holding.balance.toLocaleString()} • {holding.assetClass}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Liabilities</h3>
                  <Button onClick={addManualLiability} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Liability
                  </Button>
                </div>
                {manualLiabilities.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No liabilities added yet. Click "Add Liability" to start.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {manualLiabilities.map((liability) => (
                      <div key={liability.id} className="p-3 rounded-lg bg-muted">
                        <p className="font-medium">{liability.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${liability.balance.toLocaleString()} • {liability.apr}% APR
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Pre-flight Summary */}
        {(files.length > 0 || mockConnections.length > 0 || manualHoldings.length > 0) && allFilesComplete && (
          <Card className="p-6 mb-8 shadow-medium border-2 border-primary/20 bg-primary/5">
            <h3 className="font-semibold mb-4">Pre-flight Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary">{totalAccounts}</p>
                <p className="text-sm text-muted-foreground">Accounts Detected</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">{Math.max(totalMonths, 3)}</p>
                <p className="text-sm text-muted-foreground">Months Coverage</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{totalTransactions}</p>
                <p className="text-sm text-muted-foreground">Transactions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{mockConnections.length}</p>
                <p className="text-sm text-muted-foreground">Mock Connections</p>
              </div>
            </div>
            {!hasMinimumData && (
              <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-sm text-warning-foreground">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Need at least 3 months of data or 2+ connected accounts
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Continue Button */}
        {allFilesComplete && (
          <Button
            size="lg"
            className="w-full gradient-primary shadow-medium text-lg h-14"
            onClick={handleContinue}
            disabled={!hasMinimumData || isAnalyzing}
          >
            {isAnalyzing ? "Preparing..." : "Go to Command Center"}
          </Button>
        )}
      </div>
    </div>
  );
}
