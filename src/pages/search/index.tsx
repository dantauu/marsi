import LayoutSwitch from "../../features/search/ui/layout-switch"
import LikeCountNotify from "../../features/search/ui/like-count-notify"
import FilterButton from "../../intities/search/ui/filter/filter-button"
import CardHuman from "../../widgets/card/ui"

const Search = () => {
  return (
    <div className="px-[8px] pb-[200px]">
      <LikeCountNotify />
      <div className="flex items-center justify-between pb-[20px]">
        <FilterButton />
        <LayoutSwitch />
      </div>
      <CardHuman />
    </div>
  )
}

export default Search
