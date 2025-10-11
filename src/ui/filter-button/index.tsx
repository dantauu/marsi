import SvgFilterIcon from "@/assets/icons/FilterIcon"
import Button from "@/shared/ui/buttons/button.tsx"
import { openFilterModal } from "@/redux/slices/modal-slice"
import { useAppDispatch } from "@/redux/hooks.ts"
import { cn } from "@/lib/utils/cn.tsx"
import { memo } from "react"

export const FilterButton = memo(({ className }: { className?: string }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(openFilterModal())
  }
  return (
    <Button
      onClick={handleClick}
      className={cn(
        "font-ManropeM max-w-[120px] shadow-hard px-1 rounded-[7px] text-[14px] mini-mobile:text-[16px]",
        className
      )}
      variant="default"
    >
      Фильтры
      <SvgFilterIcon className="mini-mobile:w-[30px] w-[27px]" />
    </Button>
  )
})
