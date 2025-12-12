import * as React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
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
  return (
    <div className={cn("w-full", className)}>
      <RangeSlider
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(newValue: [number, number]) => {
          if (newValue[1] - newValue[0] >= minGap) {
            onValueChange(newValue);
          }
        }}
        className="range-slider-primary"
      />
    </div>
  );
}
