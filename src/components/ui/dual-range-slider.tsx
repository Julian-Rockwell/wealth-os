import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
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
  
  const handleChange = (newValues: number[]) => {
    const [newMin, newMax] = newValues;
    if (newMax - newMin < minGap) return;
    onValueChange([newMin, newMax]);
  };

  return (
    <SliderPrimitive.Root
      value={value}
      onValueChange={handleChange}
      min={min}
      max={max}
      step={step}
      className={cn("relative flex w-full touch-none select-none items-center h-5", className)}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb 
        className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-shadow hover:shadow-lg" 
        aria-label="Minimum value"
      />
      <SliderPrimitive.Thumb 
        className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-shadow hover:shadow-lg" 
        aria-label="Maximum value"
      />
    </SliderPrimitive.Root>
  );
}
