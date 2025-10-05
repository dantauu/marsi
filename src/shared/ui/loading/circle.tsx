import { cn } from "@/lib/utils/cn.tsx"
import SvgSpinnerCircle from "@/assets/icons/SpinnerCircle.tsx"

const LoadingCircle = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center h-10">
      <SvgSpinnerCircle className={cn("w-10 h-10", className)} />
    </div>
  )
}

export default LoadingCircle
