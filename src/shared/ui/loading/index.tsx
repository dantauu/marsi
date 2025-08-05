import SvgSpinnerBalls from "@/assets/icons/SpinnerBalls.tsx"
import { cn } from "@/lib/utils/cn.tsx"

const LoadingBalls = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center h-10">
      <SvgSpinnerBalls className={cn("w-17 h-17", className)} />
    </div>
  )
}

export default LoadingBalls
