import { useState } from "react";
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle, TrendingUp, Plus, Link2, Edit3, Trash2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import type { Account, Holding, Liability, FinancialSnapshot, AccountStatus, AccountType, AssetClass, Liquidity, LiabilityType } from "@/types/financial";

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

interface UploadProps {
  onComplete?: () => void;
}

export default function Upload({ onComplete }: UploadProps = {}) {
  const { setSnapshot } = useFinancialData();
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mockConnections, setMockConnections] = useState<MockConnection[]>([]);
  const [manualHoldings, setManualHoldings] = useState<Holding[]>([]);
  const [manualLiabilities, setManualLiabilities] = useState<Liability[]>([]);
  const [editingHoldingId, setEditingHoldingId] = useState<string | null>(null);
  const [editingLiabilityId, setEditingLiabilityId] = useState<string | null>(null);

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

  const removeMockConnection = (id: string) => {
    setMockConnections((prev) => prev.filter(c => c.id !== id));
    toast.success("Connection removed");
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    toast.success("File removed");
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
    setEditingHoldingId(newHolding.id);
  };

  const updateManualHolding = (id: string, updates: Partial<Holding>) => {
    setManualHoldings((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
  };

  const removeManualHolding = (id: string) => {
    setManualHoldings((prev) => prev.filter((h) => h.id !== id));
    toast.success("Asset removed");
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
    setEditingLiabilityId(newLiability.id);
  };

  const updateManualLiability = (id: string, updates: Partial<Liability>) => {
    setManualLiabilities((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
    );
  };

  const removeManualLiability = (id: string) => {
    setManualLiabilities((prev) => prev.filter((l) => l.id !== id));
    toast.success("Liability removed");
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

    // Store via context
    setSnapshot(snapshot);

    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
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
          <p className="text-xl text-muted-foreground mb-6">Let's Analyze Your Spending Patterns</p>
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
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">
                          ${Math.abs(conn.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMockConnection(conn.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
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
                  <div className="space-y-4">
                    {manualHoldings.map((holding) => (
                      <Card key={holding.id} className="p-4">
                        {editingHoldingId === holding.id ? (
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs">Asset Name</Label>
                                  <Input
                                    value={holding.name}
                                    onChange={(e) => updateManualHolding(holding.id, { name: e.target.value })}
                                    placeholder="e.g., My House"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Balance ($)</Label>
                                  <Input
                                    type="number"
                                    value={holding.balance}
                                    onChange={(e) => updateManualHolding(holding.id, { balance: parseFloat(e.target.value) || 0 })}
                                    placeholder="0.00"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Account Type</Label>
                                  <Select
                                    value={holding.accountType}
                                    onValueChange={(value) => updateManualHolding(holding.id, { accountType: value as AccountType })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="checking">Checking</SelectItem>
                                      <SelectItem value="savings">Savings</SelectItem>
                                      <SelectItem value="brokerage">Brokerage</SelectItem>
                                      <SelectItem value="401k">401k</SelectItem>
                                      <SelectItem value="IRA">IRA</SelectItem>
                                      <SelectItem value="real_estate">Real Estate</SelectItem>
                                      <SelectItem value="vehicle">Vehicle</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs">Asset Class</Label>
                                  <Select
                                    value={holding.assetClass}
                                    onValueChange={(value) => updateManualHolding(holding.id, { assetClass: value as AssetClass })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="cash">Cash</SelectItem>
                                      <SelectItem value="stocks">Stocks</SelectItem>
                                      <SelectItem value="bonds">Bonds</SelectItem>
                                      <SelectItem value="real_estate">Real Estate</SelectItem>
                                      <SelectItem value="commodities">Commodities</SelectItem>
                                      <SelectItem value="crypto">Crypto</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs">Liquidity</Label>
                                  <Select
                                    value={holding.liquidity}
                                    onValueChange={(value) => updateManualHolding(holding.id, { liquidity: value as Liquidity })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="liquid">Liquid (&lt;1 week)</SelectItem>
                                      <SelectItem value="semi_liquid">Semi-Liquid (1-4 weeks)</SelectItem>
                                      <SelectItem value="illiquid">Illiquid (&gt;4 weeks)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs">Currency</Label>
                                  <Input
                                    value={holding.currency}
                                    onChange={(e) => updateManualHolding(holding.id, { currency: e.target.value })}
                                    placeholder="USD"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 ml-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingHoldingId(null)}
                                >
                                  <Check className="w-4 h-4 text-success" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeManualHolding(holding.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <p className="font-medium">{holding.name}</p>
                                <span className="text-sm text-muted-foreground">•</span>
                                <p className="text-sm text-muted-foreground capitalize">{holding.accountType.replace('_', ' ')}</p>
                                <span className="text-sm text-muted-foreground">•</span>
                                <p className="font-semibold">${holding.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingHoldingId(holding.id)}
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeManualHolding(holding.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Card>
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
                  <div className="space-y-4">
                    {manualLiabilities.map((liability) => (
                      <Card key={liability.id} className="p-4">
                        {editingLiabilityId === liability.id ? (
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs">Liability Name</Label>
                                  <Input
                                    value={liability.name}
                                    onChange={(e) => updateManualLiability(liability.id, { name: e.target.value })}
                                    placeholder="e.g., Mortgage"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Type</Label>
                                  <Select
                                    value={liability.type}
                                    onValueChange={(value) => updateManualLiability(liability.id, { type: value as LiabilityType })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="mortgage">Mortgage</SelectItem>
                                      <SelectItem value="auto">Auto Loan</SelectItem>
                                      <SelectItem value="student">Student Loan</SelectItem>
                                      <SelectItem value="credit_card">Credit Card</SelectItem>
                                      <SelectItem value="personal">Personal Loan</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs">Balance ($)</Label>
                                  <Input
                                    type="number"
                                    value={liability.balance}
                                    onChange={(e) => updateManualLiability(liability.id, { balance: parseFloat(e.target.value) || 0 })}
                                    placeholder="0.00"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">APR (%)</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={liability.apr}
                                    onChange={(e) => updateManualLiability(liability.id, { apr: parseFloat(e.target.value) || 0 })}
                                    placeholder="0.00"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Monthly Payment ($)</Label>
                                  <Input
                                    type="number"
                                    value={liability.monthlyPayment}
                                    onChange={(e) => updateManualLiability(liability.id, { monthlyPayment: parseFloat(e.target.value) || 0 })}
                                    placeholder="0.00"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Remaining Term (months)</Label>
                                  <Input
                                    type="number"
                                    value={liability.remainingTermMonths}
                                    onChange={(e) => updateManualLiability(liability.id, { remainingTermMonths: parseInt(e.target.value) || 0 })}
                                    placeholder="0"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 ml-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingLiabilityId(null)}
                                >
                                  <Check className="w-4 h-4 text-success" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeManualLiability(liability.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <p className="font-medium">{liability.name}</p>
                                <span className="text-sm text-muted-foreground">•</span>
                                <p className="text-sm text-muted-foreground capitalize">{liability.type.replace('_', ' ')}</p>
                                <span className="text-sm text-muted-foreground">•</span>
                                <p className="font-semibold">${liability.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                <span className="text-sm text-muted-foreground">•</span>
                                <p className="text-sm text-muted-foreground">{liability.apr}% APR</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingLiabilityId(liability.id)}
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeManualLiability(liability.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Card>
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
