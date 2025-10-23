import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface FileUploadState {
  file: File;
  progress: number;
  status: "uploading" | "processing" | "complete" | "error";
  months?: number;
  transactions?: number;
}

export default function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const totalMonths = files.reduce((sum, f) => sum + (f.months || 0), 0);
  const totalTransactions = files.reduce((sum, f) => sum + (f.transactions || 0), 0);
  const allComplete = files.length > 0 && files.every((f) => f.status === "complete");
  const hasMinimumData = totalMonths >= 3;

  const handleAnalyze = () => {
    if (!hasMinimumData) {
      toast.error("Please upload at least 3 months of financial data");
      return;
    }

    setIsAnalyzing(true);
    toast.success("Starting analysis...");

    // Simulate analysis and navigate to dashboard
    setTimeout(() => {
      navigate("/app");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6 shadow-medium">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Rockwell Wealth OS
          </h1>
          <p className="text-xl text-muted-foreground mb-6">50/30/20 Budget Analyzer</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Upload at least 3 months of bank/credit card statements in any format (PDF, CSV, Excel, images).
            The more data you provide, the more accurate your analysis will be.
          </p>
        </div>

        {/* Requirements Checklist */}
        <Card className="p-6 mb-8 shadow-soft">
          <h3 className="font-semibold mb-4">Before You Begin:</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Gather 3+ months of consecutive bank/credit card statements
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Supported formats: PDF, CSV, Excel (.xlsx, .xls), or images (PNG, JPG)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <p className="text-sm text-muted-foreground">Maximum file size: 50MB per file</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Include all major accounts for comprehensive analysis
              </p>
            </div>
          </div>
        </Card>

        {/* Upload Zone */}
        <Card
          className={`p-12 mb-8 border-2 border-dashed transition-all cursor-pointer shadow-soft ${
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
          <div className="space-y-4 mb-8">
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

        {/* Summary */}
        {allComplete && (
          <Card className="p-6 mb-8 shadow-medium border-2 border-primary/20 bg-primary/5">
            <h3 className="font-semibold mb-4">Data Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary">{files.length}</p>
                <p className="text-sm text-muted-foreground">Files Uploaded</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">{totalMonths}</p>
                <p className="text-sm text-muted-foreground">Months Detected</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{totalTransactions}</p>
                <p className="text-sm text-muted-foreground">Transactions</p>
              </div>
            </div>
            {!hasMinimumData && (
              <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-sm text-warning-foreground">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Need at least 3 months of data for accurate analysis
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Analyze Button */}
        {allComplete && (
          <Button
            size="lg"
            className="w-full gradient-primary shadow-medium text-lg h-14"
            onClick={handleAnalyze}
            disabled={!hasMinimumData || isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze My Spending"}
          </Button>
        )}
      </div>
    </div>
  );
}
