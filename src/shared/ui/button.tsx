import type React from "react"
import { cn } from "../../lib/utils"

const variants = {
  green:
    "bg-[#31C29F] flex items-center gap-[10px] text-white rounded-[10px] cursor-pointer",
  red: "bg-[#F84963] text-white cursor-pointer",
  pink: "bg-[#FF559F] cursor-pointer",
  default: "bg-none cursor-pointer",
} as const

type Variant = keyof typeof variants

type ButtonProps = {
  variant: Variant
  children: React.ReactNode
  className?: string
}

const Button = ({ variant, children, className }: ButtonProps) => {
  const varinantName = variants[variant]
  return (
    <div className="">
      <button className={cn(varinantName, className)}>{children}</button>
    </div>
  )
}
export default Button
