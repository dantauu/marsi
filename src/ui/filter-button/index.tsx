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
    <Button onClick={handleClick} className="font-ManropeM shadow-shadow-block p-1 rounded-[7px]" variant="default">
      Фильтры
      <SvgFilterIcon />
    </Button>
  )
}
