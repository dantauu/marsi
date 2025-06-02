import type React from "react"
import { cn } from "../../lib/utils"

const variants = {
  green:
    "bg-[#31C29F] flex items-center justify-center gap-[5px] text-white rounded-[8px] cursor-pointer",
  red: "bg-[#F84963] text-white justify-center cursor-pointer rounded-[8px]",
  pink: "bg-[#FF559F] justify-center cursor-pointer",
  default: "flex items-center gap-[5px] bg-none justify-center cursor-pointer",
} as const

type Variant = keyof typeof variants

type ButtonProps = {
  variant: Variant
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

const Button = ({ variant, children, onClick, className }: ButtonProps) => {
  const varinantName = variants[variant]
  return (
    <div className="">
      <button onClick={onClick} className={cn(varinantName, className)}>
        {children}
      </button>
    </div>
  )
}
export default Button
