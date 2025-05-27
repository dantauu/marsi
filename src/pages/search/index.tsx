import LayoutSwitch from "../../features/search/ui/layout-switch"
import LikeCountNotify from "../../features/search/ui/like-count-notify"
import FilterButton from "../../intities/search/ui/filter/filter-button"
import CardHuman from "../../widgets/card/ui"

const Search = () => {
  return (
    <div className="pb-[200px]">
      <LikeCountNotify />
      <div className="flex px-[12px] items-center justify-between pb-[20px]">
        <FilterButton />
        <LayoutSwitch />
      </div>
      <CardHuman />
    </div>
  )
}

export default Search
