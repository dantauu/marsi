import SvgFilterIcon from "../../../../assets/icons/FilterIcon"
import Button from "../../../../shared/ui/button"

const FilterButton = () => {
  return (
    <Button className="font-ManropeM" variant="default">
      Фильтры
      <SvgFilterIcon />
    </Button>
  )
}

export default FilterButton
