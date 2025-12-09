import Button from "@/shared/ui/buttons/button.tsx"
import { cn } from "@/lib/utils/cn.tsx"

type SaveSettingsFilter = {
  onApprove?: () => void
  onCancel?: () => void
  disabled: boolean
}

export const DeleteAccountBar = ({
  onApprove,
  onCancel,
  disabled,
}: SaveSettingsFilter) => {
  return (
    <div className="flex justify-between items-center h-[93px] pb-[12px] fixed bottom-0 left-0 w-full px-[20px] rounded-tr-[28px] rounded-tl-[28px] bg-[var(--color-bg-nav-filters)] z-50">
      <Button
        type="button"
        className="w-[128px] h-[43px] mini-mobile:w-[138px] mini-mobile:h-[48px] mini-mobile:text-[16px] font-ManropeM text-[15px]"
        variant="green"
        onClick={onCancel}
      >
        Отмена
      </Button>
      <Button
        type="button"
        disabled={disabled}
        className={cn(
          "w-[128px] h-[43px] mini-mobile:w-[138px] mini-mobile:h-[48px] mini-mobile:text-[16px] font-ManropeM text-[15px]",
          disabled && "opacity-55"
        )}
        variant="red"
        onClick={onApprove}
      >
        Удалить
      </Button>
    </div>
  )
}
