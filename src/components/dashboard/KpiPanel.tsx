import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import type { DashboardData, DashboardFilters } from "@/types/dashboard";

interface KpiPanelProps {
  data: DashboardData;
  filters: DashboardFilters;
  setFilters: (filters: DashboardFilters) => void;
}

export const KpiPanel = ({ data, filters, setFilters }: KpiPanelProps) => {
  const needsTarget = 50;
  const wantsTarget = 30;
  const savingsTarget = 20;

  const needsDiff = data.expenses.needs.pct - needsTarget;
  const wantsDiff = data.expenses.wants.pct - wantsTarget;
  const savingsDiff = data.expenses.savings.pct - savingsTarget;

  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      {/* Period Info */}
      <Card className="p-4 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Analysis Period</h3>
        </div>
        <p className="text-2xl font-bold">{data.period.months} Months</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(data.period.start).toLocaleDateString()} - {new Date(data.period.end).toLocaleDateString()}
        </p>
      </Card>

      {/* Income KPI */}
      <Card className="p-4 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-success" />
          <h3 className="font-semibold text-sm">Avg Monthly Income</h3>
        </div>
        <p className="text-2xl font-bold">${data.income.avgMonthly.toFixed(0)}</p>
        <p className="text-xs text-muted-foreground mt-1 capitalize">{data.income.stability}</p>
      </Card>

      {/* Expenses KPI */}
      <Card className="p-4 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-destructive" />
          <h3 className="font-semibold text-sm">Avg Monthly Expenses</h3>
        </div>
        <p className="text-2xl font-bold">
          ${((data.expenses.needs.total + data.expenses.wants.total + data.expenses.savings.total) / data.period.months).toFixed(0)}
        </p>
      </Card>

      {/* Cash Flow KPI */}
      <Card className="p-4 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          {data.cashflow.monthlySurplus >= 0 ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          <h3 className="font-semibold text-sm">Monthly Cash Flow</h3>
        </div>
        <p className={`text-2xl font-bold ${data.cashflow.monthlySurplus >= 0 ? "text-success" : "text-destructive"}`}>
          {data.cashflow.monthlySurplus >= 0 ? "+" : ""}${data.cashflow.monthlySurplus.toFixed(0)}
        </p>
      </Card>

      {/* 50/30/20 Gauge */}
      <Card className="p-4 shadow-soft">
        <h3 className="font-semibold text-sm mb-4">50/30/20 Score</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Needs</span>
              <span className={needsDiff > 5 ? "text-warning" : needsDiff < -5 ? "text-success" : "text-muted-foreground"}>
                {data.expenses.needs.pct.toFixed(1)}% / 50%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-needs rounded-full transition-all"
                style={{ width: `${Math.min(data.expenses.needs.pct, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Wants</span>
              <span className={wantsDiff > 5 ? "text-warning" : wantsDiff < -5 ? "text-success" : "text-muted-foreground"}>
                {data.expenses.wants.pct.toFixed(1)}% / 30%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-wants rounded-full transition-all"
                style={{ width: `${Math.min(data.expenses.wants.pct, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Savings</span>
              <span className={savingsDiff < -5 ? "text-warning" : savingsDiff > 5 ? "text-success" : "text-muted-foreground"}>
                {data.expenses.savings.pct.toFixed(1)}% / 20%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-savings rounded-full transition-all"
                style={{ width: `${Math.min(data.expenses.savings.pct, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 shadow-soft">
        <h3 className="font-semibold text-sm mb-4">Filters</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="account-filter" className="text-xs">Account</Label>
            <Select>
              <SelectTrigger id="account-filter" className="h-9 text-sm">
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
              className="h-9 text-sm"
              value={filters.searchTerm || ""}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
