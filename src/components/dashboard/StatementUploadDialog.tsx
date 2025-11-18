import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { generateMockTransactions } from "@/utils/mockTransactionGenerator";
import type { Transaction } from "@/types/dashboard";

interface FileUploadState {
  file: File;
  progress: number;
  status: "uploading" | "processing" | "complete" | "error";
  transactionCount?: number;
}

interface StatementUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete: (transactions: Transaction[], fileName: string) => void;
}

export const StatementUploadDialog = ({ open, onOpenChange, onUploadComplete }: StatementUploadDialogProps) => {
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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
    const validFormats = [".pdf", ".csv", ".xlsx", ".xls"];
    const invalidFiles = newFiles.filter(
      (file) => !validFormats.some((format) => file.name.toLowerCase().endsWith(format))
    );

    if (invalidFiles.length > 0) {
      toast.error("Only PDF, CSV, and Excel files are supported");
      return;
    }

    const tooLargeFiles = newFiles.filter((file) => file.size > 20 * 1024 * 1024);
    if (tooLargeFiles.length > 0) {
      toast.error("Files must be under 20MB");
      return;
    }

    const uploadStates: FileUploadState[] = newFiles.map((file) => ({
      file,
      progress: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...uploadStates]);

    // Process each file
    for (let i = files.length; i < files.length + uploadStates.length; i++) {
      simulateFileProcessing(i);
    }
  };

  const simulateFileProcessing = async (index: number) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setFiles((prev) => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index] = { ...updated[index], progress };
        }
        return updated;
      });
    }

    // Change to processing
    setFiles((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], status: "processing" };
      }
      return updated;
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock transactions
    const file = files[index]?.file;
    if (file) {
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      const mockTransactions = generateMockTransactions(fileName);
      
      setFiles((prev) => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index] = { 
            ...updated[index], 
            status: "complete",
            transactionCount: mockTransactions.length
          };
        }
        return updated;
      });

      // Call callback to add transactions to dashboard
      onUploadComplete(mockTransactions, file.name);
      
      toast.success(`${mockTransactions.length} transactions imported from ${file.name}`);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setFiles([]);
    onOpenChange(false);
  };

  const allComplete = files.length > 0 && files.every(f => f.status === "complete");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Bank Statements</DialogTitle>
          <DialogDescription>
            Upload PDF, CSV, or Excel files containing your transaction history. We'll automatically classify your transactions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drag and Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">
              Drag and drop your statement files here
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              or click to browse (PDF, CSV, XLSX - max 20MB)
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept=".pdf,.csv,.xlsx,.xls"
              onChange={handleFileSelect}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((fileState, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border bg-card flex items-center gap-3"
                >
                  <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {fileState.file.name}
                    </p>
                    {fileState.status === "uploading" && (
                      <div className="mt-1">
                        <Progress value={fileState.progress} className="h-1" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploading... {fileState.progress}%
                        </p>
                      </div>
                    )}
                    {fileState.status === "processing" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Processing transactions...
                      </p>
                    )}
                    {fileState.status === "complete" && (
                      <p className="text-xs text-success mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {fileState.transactionCount} transactions imported
                      </p>
                    )}
                  </div>
                  {fileState.status === "complete" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            {allComplete && (
              <Button onClick={handleClose}>
                Done
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
