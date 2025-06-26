import { LikeCountNotify } from "@/features/search"
import { FilterModal } from "@/entities/search"
import CardHuman from "@/widgets/card/ui"
import { LayoutSwitch } from "@/ui/index.ts"
import { FilterButton } from "@/ui/index.ts"
import { useGetUsersQuery } from "@/redux/api/user.ts"

const Search = () => {
  const { data, isLoading } = useGetUsersQuery()
  if (isLoading) return <p>Загрузка...</p>
  if (!data) throw new Error("Error Data")
  console.log("DATA", data)
  return (
    <div data-testid="search" className="pb-[200px]">
      <LikeCountNotify />
      <div className="flex px-[12px] items-center justify-between pb-[20px]">
        <FilterButton />
        <LayoutSwitch />
      </div>
      <CardHuman data={data} />
      <FilterModal />
    </div>
  )
}

export default Search
