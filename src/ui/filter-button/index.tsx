import SvgFilterIcon from "@/assets/icons/FilterIcon"
import Button from "@/shared/ui/buttons/button.tsx"
import { openFilterModal } from "@/redux/slices/modal-slice"
import { useAppDispatch } from "@/redux/hooks.ts"

export const FilterButton = () => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(openFilterModal())
  }
  return (
    <Button
      onClick={handleClick}
      className="font-ManropeM ml-2 shadow-shadow-block p-0.5 rounded-[7px] text-[15px] mini-mobile:text-[16px]"
      variant="default"
    >
      Фильтры
      <SvgFilterIcon className="mini-mobile:w-[32px] w-[28px]" />
    </Button>
  )
}
