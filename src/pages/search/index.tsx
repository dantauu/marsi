import { LikeCountNotify } from "@/features/search"
import { FilterModal, FilterButton } from "@/entities/search"
import CardHuman from "@/widgets/card/ui"
import { LayoutSwitch } from "@/ui/layout-switch"

const Search = () => {
  return (
    <div className="pb-[200px]">
      <LikeCountNotify />
      <div className="flex px-[12px] items-center justify-between pb-[20px]">
        <FilterButton />
        <LayoutSwitch />
      </div>
      <CardHuman />
      <FilterModal />
    </div>
  )
}

export default Search
