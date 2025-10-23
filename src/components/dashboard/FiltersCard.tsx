import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DashboardData, DashboardFilters } from "@/types/dashboard";

interface FiltersCardProps {
  data: DashboardData;
  filters: DashboardFilters;
  setFilters: (filters: DashboardFilters) => void;
}

export const FiltersCard = ({ data, filters, setFilters }: FiltersCardProps) => {
  return (
    <Card className="p-4 shadow-soft">
      <h3 className="font-semibold text-sm mb-4">Filters</h3>
      <div className="grid grid-cols-2 gap-4">
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
