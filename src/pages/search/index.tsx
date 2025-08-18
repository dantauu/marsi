import { LikeCountNotify } from "@/features/search"
import { LayoutSwitchButtons } from "@/ui/index.ts"
import { FilterButton } from "@/ui/index.ts"
import { Route } from "@/app/routes/_app/_layout/search"
import { useSearch } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading"
import { LayoutCard } from "@/widgets/card"
import { useFetchToScroll } from "@/lib/hooks/use-fetch-scroll.ts"
import { useGetLikesToMeQuery } from "@/shared/api/user.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import { useScrollRestore } from "@/lib/hooks/use-scroll-restore.ts"
import { useAppSelector } from "@/redux/hooks.ts"

const Search = () => {
  const searchParams = useSearch({ from: Route.id })
  const filters = useAppSelector((state) => state.filters)
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value != null
    )
  )
  const { ref, users, isLoading, isFetching } = useFetchToScroll(cleanedFilters)
  useScrollRestore("search", [users?.length])
  const { user: currentUser } = useUserMe()
  const { data: countLikes } = useGetLikesToMeQuery(currentUser?.id ?? "")
  console.log("searchParams", searchParams)
  if (isLoading) return <LoadingBalls />
  if (!users) throw new Error("Error Data")
  return (
    <div data-testid="search" className="pb-[200px]">
      <LikeCountNotify countLikes={countLikes} />
      <div className="flex px-[12px] items-center justify-between pb-[20px]">
        <FilterButton />
        <LayoutSwitchButtons />
      </div>
      {users && <LayoutCard data={users} />}
      {isFetching && <LoadingBalls />}
      {!isLoading && <div className="w-full h-2" ref={ref}></div>}
    </div>
  )
}

export default Search
