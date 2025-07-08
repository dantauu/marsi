import { LikeCountNotify } from "@/features/search"
import CardHuman from "@/widgets/card/ui"
import { LayoutSwitch } from "@/ui/index.ts"
import { FilterButton } from "@/ui/index.ts"
import { useGetUsersQuery } from "@/redux/api/user.ts"
import { Route } from "@/app/routes/_app/_layout/search"
import { useSearch } from "@tanstack/react-router"

const Search = () => {
  const searchParams = useSearch({ from: Route.id })
  const { data: users, isLoading } = useGetUsersQuery(searchParams)

  console.log("searchParams", searchParams)
  if (isLoading) return <p>Загрузка...</p>
  if (!users) throw new Error("Error Data")
  return (
    <div data-testid="search" className="pb-[200px]">
      <LikeCountNotify />
      <div className="flex px-[12px] items-center justify-between pb-[20px]">
        <FilterButton />
        <LayoutSwitch />
      </div>
      <CardHuman data={users} />
    </div>
  )
}

export default Search
