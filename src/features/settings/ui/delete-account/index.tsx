import Button from "@/shared/ui/buttons/button.tsx"
import { cn } from "@/lib/utils/cn.tsx"

export const DeleteAccount = ({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) => {
  return (
    <div className={cn(className, "px-12")}>
      <Button
        onClick={onClick}
        className="w-full h-[35px] text-[15px] text-[var(--color-text-grey)]"
        variant="default"
      >
        Удалить аккаунт
      </Button>
    </div>
  )
}
