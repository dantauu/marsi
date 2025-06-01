import { useDispatch } from "react-redux"
import SvgFilterIcon from "@/assets/icons/FilterIcon"
import Button from "@/shared/ui/button"
import { openModal } from "@/redux/slices/modal-slice"

const FilterButton = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(openModal())
  }
  return (
    <Button onClick={handleClick} className="font-ManropeM" variant="default">
      Фильтры
      <SvgFilterIcon />
    </Button>
  )
}

export default FilterButton
