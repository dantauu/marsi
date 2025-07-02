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
    <Button onClick={handleClick} className="font-ManropeM" variant="default">
      Фильтры
      <SvgFilterIcon />
    </Button>
  )
}
