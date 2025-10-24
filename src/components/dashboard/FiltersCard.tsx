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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
