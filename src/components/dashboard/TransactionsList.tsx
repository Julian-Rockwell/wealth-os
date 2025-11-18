import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Building2, ChevronDown, Home, Car, ShoppingCart, Utensils, Heart, 
  Zap, Film, ShoppingBag, CreditCard, PiggyBank, TrendingUp, Trash2, 
  RotateCcw, Upload, X
} from "lucide-react";
import type { Transaction, TransactionCategory, DashboardFilters } from "@/types/dashboard";
import { StatementUploadDialog } from "./StatementUploadDialog";
import { toast } from "sonner";

interface TransactionsListProps {
  transactions: Transaction[];
  onUpdate: (id: string, updates: Partial<Transaction>) => void;
  onDelete: (id: string) => void;
  onUploadTransactions: (newTransactions: Transaction[], fileName: string) => void;
  filters: DashboardFilters;
  setFilters: (filters: DashboardFilters) => void;
  accounts: Array<{ id: string; name: string }>;
}

interface ConnectedBank {
  id: string;
  name: string;
  accountType: string;
  lastSync: string;
}

interface UploadedStatement {
  fileName: string;
  uploadDate: string;
  transactionCount: number;
}

const subcategoryIcons: Record<string, typeof Home> = {
  "Housing": Home,
  "Transportation": Car,
  "Groceries": ShoppingCart,
  "Dining": Utensils,
  "Healthcare": Heart,
  "Utilities": Zap,
  "Entertainment": Film,
  "Shopping": ShoppingBag,
  "Subscriptions": CreditCard,
  "Emergency Fund": PiggyBank,
  "Investment": TrendingUp,
  "Retirement": TrendingUp,
};

const subcategoryDescriptions: Record<string, string> = {
  "Housing": "Rent, mortgage, property taxes, home insurance",
  "Transportation": "Gas, car payments, insurance, maintenance, public transit",
  "Groceries": "Supermarket, food shopping, household supplies",
  "Utilities": "Electricity, water, internet, phone bills",
  "Healthcare": "Doctor visits, prescriptions, health insurance",
  "Dining": "Restaurants, coffee shops, takeout, delivery",
  "Entertainment": "Movies, concerts, events, hobbies",
  "Shopping": "Clothing, electronics, general retail",
  "Subscriptions": "Streaming services, apps, memberships",
  "Emergency Fund": "Savings for unexpected expenses",
  "Investment": "Brokerage contributions, stocks, bonds",
  "Retirement": "401k, IRA, pension contributions",
};

export const TransactionsList = ({ 
  transactions, 
  onDelete, 
  onUploadTransactions,
  filters,
  setFilters,
  accounts
}: TransactionsListProps) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [connectedBanks, setConnectedBanks] = useState<ConnectedBank[]>([
    {
      id: "chase-1",
      name: "Chase Bank",
      accountType: "Checking ****2345",
      lastSync: new Date().toLocaleDateString()
    }
  ]);
  const [uploadedStatements, setUploadedStatements] = useState<UploadedStatement[]>([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});

  // Filter transactions (only account and searchTerm)
  const filteredTransactions = transactions
    .filter((txn) => txn.sign === "debit")
    .filter((txn) => {
      if (filters.accounts && filters.accounts.length > 0) {
        if (!filters.accounts.includes(txn.accountId)) return false;
      }
      if (filters.searchTerm) {
        const matchesSearch = txn.merchant.toLowerCase().includes(filters.searchTerm.toLowerCase());
        if (!matchesSearch) return false;
      }
      return true;
    });

  // Group transactions by category and subcategory
  const groupedByCategory = filteredTransactions.reduce((acc, txn) => {
    if (!acc[txn.category]) {
      acc[txn.category] = {};
    }
    if (!acc[txn.category][txn.subcategory]) {
      acc[txn.category][txn.subcategory] = [];
    }
    acc[txn.category][txn.subcategory].push(txn);
    return acc;
  }, {} as Record<TransactionCategory, Record<string, Transaction[]>>);

  // Calculate category totals
  const getCategoryTotal = (category: TransactionCategory) => {
    return filteredTransactions
      .filter((txn) => txn.category === category)
      .reduce((sum, txn) => sum + txn.amount, 0);
  };

  // Calculate category percentage of total expenses
  const totalExpenses = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  const getCategoryPercentage = (category: TransactionCategory) => {
    const total = getCategoryTotal(category);
    return totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
  };

  const toggleSubcategory = (key: string) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const handleConnectBank = () => {
    toast.info("Bank connection is demo only - no real data syncing");
  };

  const handleDisconnectBank = (bankId: string) => {
    setConnectedBanks((prev) => prev.filter((b) => b.id !== bankId));
    toast.success("Bank disconnected");
  };

  const handleUploadComplete = (newTransactions: Transaction[], fileName: string) => {
    onUploadTransactions(newTransactions, fileName);
    setUploadedStatements((prev) => [
      ...prev,
      {
        fileName,
        uploadDate: new Date().toLocaleDateString(),
        transactionCount: newTransactions.length
      }
    ]);
  };

  const handleDeleteStatement = (fileName: string) => {
    // Remove statement from list
    setUploadedStatements((prev) => prev.filter((s) => s.fileName !== fileName));
    
    // Remove associated transactions
    const filePrefix = fileName.replace(/\.[^/.]+$/, "");
    const txnsToDelete = transactions.filter((txn) => txn.id.startsWith(filePrefix));
    txnsToDelete.forEach((txn) => onDelete(txn.id));
    
    toast.success(`Removed ${fileName} and its transactions`);
  };

  const renderCategoryColumn = (category: TransactionCategory, title: string, colorClass: string) => {
    const categoryData = groupedByCategory[category] || {};
    const categoryTotal = getCategoryTotal(category);
    const categoryPercentage = getCategoryPercentage(category);
    
    // Sort subcategories by total amount descending
    const sortedSubcategories = Object.entries(categoryData).sort(
      ([, txnsA], [, txnsB]) => {
        const totalA = txnsA.reduce((sum, t) => sum + t.amount, 0);
        const totalB = txnsB.reduce((sum, t) => sum + t.amount, 0);
        return totalB - totalA;
      }
    );

    return (
      <div className="space-y-3">
        {/* Category Header */}
        <div className="pb-2 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{title}</h3>
            <Badge variant="outline" className={colorClass}>
              {categoryPercentage.toFixed(0)}%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            ${categoryTotal.toFixed(2)}
          </p>
        </div>

        {/* Subcategories */}
        <div className="space-y-2">
          {sortedSubcategories.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No transactions in this category
            </p>
          ) : (
            sortedSubcategories.map(([subcategory, txns]) => {
              const subcategoryTotal = txns.reduce((sum, t) => sum + t.amount, 0);
              const key = `${category}-${subcategory}`;
              const isExpanded = expandedSubcategories[key] ?? false;
              const Icon = subcategoryIcons[subcategory] || ShoppingBag;
              const description = subcategoryDescriptions[subcategory] || "";

              return (
                <Collapsible key={key} open={isExpanded} onOpenChange={() => toggleSubcategory(key)}>
                  <CollapsibleTrigger className="w-full">
                    <div className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-sm">{subcategory}</span>
                          <Badge variant="secondary" className="text-xs">
                            {txns.length}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            ${subcategoryTotal.toFixed(2)}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      {description && (
                        <p className="text-xs text-muted-foreground mt-1 text-left">
                          {description}
                        </p>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-6 mt-2 space-y-1">
                      {txns
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((txn) => (
                          <div
                            key={txn.id}
                            className="p-2 rounded border bg-background/50 flex items-center justify-between text-sm"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{txn.merchant}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(txn.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                ${txn.amount.toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete(txn.id);
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>
            We use only the last 90 days of transactions from connected accounts.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Connected Banks & Uploaded Statements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Connected Banks */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">Connected Banks</h4>
                <Button variant="outline" size="sm" onClick={handleConnectBank}>
                  <Building2 className="w-3 h-3 mr-1" />
                  Connect Bank
                </Button>
              </div>
              <div className="space-y-2">
                {connectedBanks.map((bank) => (
                  <div key={bank.id} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                    <div>
                      <p className="text-sm font-medium">{bank.name}</p>
                      <p className="text-xs text-muted-foreground">{bank.accountType}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDisconnectBank(bank.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Uploaded Statements */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">Uploaded Statements</h4>
                <Button variant="outline" size="sm" onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="w-3 h-3 mr-1" />
                  Upload Statement
                </Button>
              </div>
              <div className="space-y-2">
                {uploadedStatements.length === 0 ? (
                  <p className="text-xs text-muted-foreground p-2">No statements uploaded yet</p>
                ) : (
                  uploadedStatements.map((statement, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                      <div>
                        <p className="text-sm font-medium truncate">{statement.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {statement.transactionCount} transactions • {statement.uploadDate}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStatement(statement.fileName)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Filters */}
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium mb-1.5 block">Account</label>
              <Select
                value={filters.accounts?.[0] || "all"}
                onValueChange={(value) => {
                  if (value === "all") {
                    setFilters({ ...filters, accounts: undefined });
                  } else {
                    setFilters({ ...filters, accounts: [value] });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All accounts</SelectItem>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium mb-1.5 block">Merchant name</label>
              <Input
                placeholder="Search merchants..."
                value={filters.searchTerm || ""}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              />
            </div>

            <Button variant="outline" onClick={handleResetFilters}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset filters
            </Button>
          </div>

          <Separator />

          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {renderCategoryColumn("need", "Needs", "border-blue-500 text-blue-600")}
            {renderCategoryColumn("want", "Wants", "border-orange-500 text-orange-600")}
            {renderCategoryColumn("saving", "Savings", "border-green-500 text-green-600")}
          </div>
        </CardContent>
      </Card>

      <StatementUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUploadComplete={handleUploadComplete}
      />
    </>
  );
};
