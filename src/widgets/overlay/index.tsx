import { cn } from "@/lib/utils/cn.tsx"

export const Overlay = ({ className }: { className?: string }) => {
  return <div className={cn("fixed top-0 w-full h-full z-10 bg-[#00000087]", className)}></div>
}
