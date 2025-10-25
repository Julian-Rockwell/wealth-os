import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Settings, RotateCcw } from "lucide-react";

interface AssumptionsPanelProps {
  activeReturn: number;
  passiveYield: number;
  inflation: number;
  onActiveReturnChange: (value: number) => void;
  onPassiveYieldChange: (value: number) => void;
  onInflationChange: (value: number) => void;
  onReset: () => void;
}

export function AssumptionsPanel({
  activeReturn,
  passiveYield,
  inflation,
  onActiveReturnChange,
  onPassiveYieldChange,
  onInflationChange,
  onReset,
}: AssumptionsPanelProps) {
  const presets = [
    { label: "Conservative", active: 18, passive: 8, inflation: 3.5 },
    { label: "Default", active: 25, passive: 10, inflation: 3 },
    { label: "Aggressive", active: 35, passive: 12, inflation: 2.5 },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    onActiveReturnChange(preset.active);
    onPassiveYieldChange(preset.passive);
    onInflationChange(preset.inflation);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Assumptions & What-Ifs
            </CardTitle>
            <CardDescription>
              Adjust parameters to see how they affect your timeline
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Presets */}
        <div className="space-y-2">
          <Label className="text-sm">Quick Presets</Label>
          <div className="flex gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="flex-1"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Return */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="active-return">Active Return Target</Label>
            <span className="text-sm font-semibold text-primary">
              {activeReturn.toFixed(0)}%
            </span>
          </div>
          <Slider
            id="active-return"
            min={10}
            max={50}
            step={1}
            value={[activeReturn]}
            onValueChange={([value]) => onActiveReturnChange(value)}
          />
          <p className="text-xs text-muted-foreground">
            Target return for active trading phase (default: 25%)
          </p>
        </div>

        {/* Passive Yield */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="passive-yield">Passive Yield Target</Label>
            <span className="text-sm font-semibold text-accent">
              {passiveYield.toFixed(0)}%
            </span>
          </div>
          <Slider
            id="passive-yield"
            min={4}
            max={15}
            step={0.5}
            value={[passiveYield]}
            onValueChange={([value]) => onPassiveYieldChange(value)}
          />
          <p className="text-xs text-muted-foreground">
            Target yield for passive income phase (default: 10%)
          </p>
        </div>

        {/* Inflation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="inflation">Inflation Assumption</Label>
            <span className="text-sm font-semibold text-warning">
              {inflation.toFixed(1)}%
            </span>
          </div>
          <Slider
            id="inflation"
            min={1}
            max={6}
            step={0.1}
            value={[inflation]}
            onValueChange={([value]) => onInflationChange(value)}
          />
          <p className="text-xs text-muted-foreground">
            Annual inflation rate for future planning (default: 3%)
          </p>
        </div>

        {/* Note */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground italic">
            💡 All calculations include a conservative buffer. These are planning tools, 
            not guarantees. Results will vary based on market conditions and execution.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
