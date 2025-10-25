import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GoalQuestionsCardProps {
  timing: string;
  lifestyle: number;
  geography: number;
  onTimingChange: (value: string) => void;
  onLifestyleChange: (value: number) => void;
  onGeographyChange: (value: number) => void;
}

export function GoalQuestionsCard({
  timing,
  lifestyle,
  geography,
  onTimingChange,
  onLifestyleChange,
  onGeographyChange,
}: GoalQuestionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>3-Question Goal Input</CardTitle>
        <CardDescription>
          Define your financial independence target in three simple questions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question 1: Timing */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-base font-semibold">1. When do you want to reach RPIC?</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Your timeline affects the strategy: aggressive growth for ASAP, 
                    balanced for 10 years, conservative for 15-20 years.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup value={timing} onValueChange={onTimingChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="asap" id="asap" />
              <Label htmlFor="asap" className="font-normal cursor-pointer">
                ASAP (Aggressive growth strategy)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="10y" id="10y" />
              <Label htmlFor="10y" className="font-normal cursor-pointer">
                10 years (Balanced approach)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="15-20y" id="15-20y" />
              <Label htmlFor="15-20y" className="font-normal cursor-pointer">
                15-20 years (Conservative path)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flexible" id="flexible" />
              <Label htmlFor="flexible" className="font-normal cursor-pointer">
                Flexible timeline
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Question 2: Lifestyle */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-base font-semibold">2. What lifestyle multiplier?</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    0.8x = Simplified lifestyle, 1.0x = Current lifestyle, 
                    1.2x = Enhanced comfort, 1.5x = Luxury upgrade
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup value={lifestyle.toString()} onValueChange={(v) => onLifestyleChange(parseFloat(v))}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0.8" id="lifestyle-0.8" />
              <Label htmlFor="lifestyle-0.8" className="font-normal cursor-pointer">
                0.8x (Simplified)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.0" id="lifestyle-1.0" />
              <Label htmlFor="lifestyle-1.0" className="font-normal cursor-pointer">
                1.0x (Current)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.2" id="lifestyle-1.2" />
              <Label htmlFor="lifestyle-1.2" className="font-normal cursor-pointer">
                1.2x (Enhanced)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.5" id="lifestyle-1.5" />
              <Label htmlFor="lifestyle-1.5" className="font-normal cursor-pointer">
                1.5x (Luxury)
              </Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2 pt-2">
            <Label htmlFor="custom-lifestyle" className="text-sm">Custom:</Label>
            <Input
              id="custom-lifestyle"
              type="number"
              step="0.1"
              min="0.5"
              max="3"
              value={lifestyle}
              onChange={(e) => onLifestyleChange(parseFloat(e.target.value) || 1.0)}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">x</span>
          </div>
        </div>

        {/* Question 3: Geography */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-base font-semibold">3. Geographic cost adjustment?</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Adjust for lower (0.8x) or higher (1.2x) cost of living in your target location. 
                    Choose 1.0x if staying put or undecided.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup value={geography.toString()} onValueChange={(v) => onGeographyChange(parseFloat(v))}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0.8" id="geo-0.8" />
              <Label htmlFor="geo-0.8" className="font-normal cursor-pointer">
                0.8x (Lower cost location)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.0" id="geo-1.0" />
              <Label htmlFor="geo-1.0" className="font-normal cursor-pointer">
                1.0x (Same location)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.2" id="geo-1.2" />
              <Label htmlFor="geo-1.2" className="font-normal cursor-pointer">
                1.2x (Higher cost location)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.0" id="geo-undecided" />
              <Label htmlFor="geo-undecided" className="font-normal cursor-pointer">
                Undecided
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
