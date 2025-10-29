import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import type { DashboardData, DashboardFilters } from "@/types/dashboard";

interface FiltersCardProps {
  data: DashboardData;
  filters: DashboardFilters;
  setFilters: (filters: DashboardFilters) => void;
}

export const FiltersCard = ({ data, filters, setFilters }: FiltersCardProps) => {
  const handleReset = () => {
    setFilters({});
  };

  return (
    <Card className="p-4 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="h-8 text-xs"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="category-filter" className="text-xs">Category</Label>
          <Select 
            value={filters.category || "all"}
            onValueChange={(value) => setFilters({ 
              ...filters, 
              category: value === "all" ? undefined : value as any
            })}
          >
            <SelectTrigger id="category-filter" className="h-9 text-sm mt-1">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="need">Needs Only</SelectItem>
              <SelectItem value="want">Wants Only</SelectItem>
              <SelectItem value="saving">Savings Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subcategory-filter" className="text-xs">Subcategory</Label>
          <Select 
            value={filters.subcategory || "all"}
            onValueChange={(value) => setFilters({ 
              ...filters, 
              subcategory: value === "all" ? undefined : value
            })}
          >
            <SelectTrigger id="subcategory-filter" className="h-9 text-sm mt-1">
              <SelectValue placeholder="All subcategories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subcategories</SelectItem>
              <SelectItem value="Groceries">Groceries</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Dining">Dining</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Rent/Mortgage">Rent/Mortgage</SelectItem>
              <SelectItem value="Insurance">Insurance</SelectItem>
              <SelectItem value="Childcare">Childcare</SelectItem>
              <SelectItem value="Phone/Internet">Phone/Internet</SelectItem>
              <SelectItem value="Subscriptions">Subscriptions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="account-filter" className="text-xs">Account</Label>
          <Select>
            <SelectTrigger id="account-filter" className="h-9 text-sm mt-1">
              <SelectValue placeholder="All accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All accounts</SelectItem>
              {data.accounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="confidence-filter" className="text-xs">Confidence</Label>
          <Select 
            value={filters.minConfidence?.toString() || "all"}
            onValueChange={(value) => setFilters({ 
              ...filters, 
              minConfidence: value === "all" ? undefined : parseInt(value) 
            })}
          >
            <SelectTrigger id="confidence-filter" className="h-9 text-sm mt-1">
              <SelectValue placeholder="All confidence levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All confidence levels</SelectItem>
              <SelectItem value="90">&lt; 90%</SelectItem>
              <SelectItem value="80">&lt; 80%</SelectItem>
              <SelectItem value="70">&lt; 70%</SelectItem>
              <SelectItem value="60">&lt; 60%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="search-filter" className="text-xs">Search Merchant</Label>
          <Input
            id="search-filter"
            placeholder="Search..."
            className="h-9 text-sm mt-1"
            value={filters.searchTerm || ""}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
};
