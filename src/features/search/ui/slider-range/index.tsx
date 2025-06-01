import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center"
)
const trackVariants = cva(
  "relative h-[5px] w-full grow overflow-hidden rounded-full bg-grey-2"
)
const rangeVariants = cva("absolute h-full bg-yellow")
const thumbVariants = cva(
  "block h-[13px] w-[15px] cursor-pointer rounded-[5px] bg-yellow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
)

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants(), className)}
    {...props}
  >
    <SliderPrimitive.Track className={trackVariants()}>
      <SliderPrimitive.Range className={rangeVariants()} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={thumbVariants()} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

interface SliderRangeProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  className?: string
}

const SliderRange = ({ className, ...props }: SliderRangeProps) => {
  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-[5px] w-full grow overflow-hidden rounded-full bg-gray-600">
        <SliderPrimitive.Range className="absolute h-full bg-main-green" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-8 w-8 rounded-full border-2 border-main-green bg-main-green ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      <SliderPrimitive.Thumb className="block h-8 w-8 rounded-full border-2 border-main-green bg-main-green ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
}

export { Slider, SliderRange }
