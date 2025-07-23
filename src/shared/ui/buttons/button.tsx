import type React from "react"
import { cn } from "@/lib/utils/cn.tsx"

const variants = {
  green:
    "bg-[#31C29F] flex items-center justify-center gap-[5px] text-white rounded-[8px] cursor-pointer font-ManropeM",
  red: "bg-[#F84963] flex items-center justify-center gap-[5px] text-white justify-center cursor-pointer rounded-[8px] font-ManropeM",
  pink: "bg-[#FF559F] flex items-center justify-center gap-[5px] justify-center cursor-pointer font-ManropeM",
  default: "flex items-center gap-[5px] bg-none justify-center cursor-pointer",
} as const

type Variant = keyof typeof variants

type ButtonProps = {
  variant: Variant
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: "submit" | "reset" | "button"
  disabled?: boolean
}

const Button = ({
  variant,
  children,
  onClick,
  type,
  disabled,
  className,
}: ButtonProps) => {
  const variantName = variants[variant]
  return (
    <div className="">
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={cn(variantName, className)}
      >
        {children}
      </button>
    </div>
  )
}
export default Button
