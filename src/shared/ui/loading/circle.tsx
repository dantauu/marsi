import { cn } from "@/lib/utils/cn.tsx"
import SvgSpinnerCircle from "@/assets/icons/SpinnerCircle.tsx"

const LoadingCircle = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center h-10">
      <SvgSpinnerCircle className={cn("w-10 h-10", className)} />
    </div>
  )
}

export const LoadingCircleBase = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 z-20 bg-[#0004] w-[75px] h-[75px] rounded-xl"
      )}
    >
      <SvgSpinnerCircle className="w-10 h-10 text-[var(--color-text-grey)]" />
    </div>
  )
}

export default LoadingCircle
