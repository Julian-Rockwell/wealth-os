import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface DualRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  step?: number;
  minGap?: number;
  className?: string;
}

export function DualRangeSlider({
  min,
  max,
  value,
  onValueChange,
  step = 1,
  minGap = 10,
  className
}: DualRangeSliderProps) {
  const handleValueChange = (newValue: number[]) => {
    if (newValue.length === 2) {
      const [left, right] = newValue;
      // Enforce minimum gap
      if (right - left >= minGap) {
        onValueChange([left, right] as [number, number]);
      }
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleValueChange}
      />
    </div>
  );
}
