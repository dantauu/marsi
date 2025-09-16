import { LikeCountNotify } from "@/features/search"
import { LayoutSwitchButtons } from "@/ui/index.ts"
import { FilterButton } from "@/ui/index.ts"
import { Route } from "@/app/routes/_app/_layout/search"
import { useSearch } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading"
import { LayoutCard } from "@/widgets/card"
import { useFetchToScroll } from "@/lib/hooks/use-fetch-scroll.ts"
import { useGetLikesToMeQuery } from "@/shared/api/likes.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import { useScrollRestore } from "@/lib/hooks/use-scroll-restore.ts"
import { useAppSelector } from "@/redux/hooks.ts"
import { useTelegram } from "@/app/providers/telegram"

const Search = () => {
  const { webApp } = useTelegram()
  const searchParams = useSearch({ from: Route.id })
  const filters = useAppSelector((state) => state.filters)
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value != null
    )
  )
  const { ref, users, isLoading, isFetching } = useFetchToScroll(cleanedFilters)
  useScrollRestore("search", [users?.users.length])
  const { user: currentUser } = useUserMe()
  const { data: countLikes } = useGetLikesToMeQuery(currentUser?.id ?? "", {
    skip: !currentUser?.id,
  })
  console.log("searchParams", searchParams)
  if (isLoading) return <LoadingBalls />
  if (!users) throw new Error("Error Data")
  const platform = webApp?.platform ?? ""
  const mobile = ["android", "ios"]
  return (
    <div data-testid="search" className="pb-[200px]">
      <div
        className={`fixed z-10 top-0 w-full bg-white ${mobile.includes(platform) ? "pt-[80px]" : "pt-0"}`}
      >
        <LikeCountNotify countLikes={countLikes} />
        <div className="flex px-[12px] items-center justify-between pb-[5px]">
          <FilterButton />
          <LayoutSwitchButtons />
        </div>
      </div>
      <div
        className={`${mobile.includes(platform) ? "pt-[110px]" : "pt-[80px]"}`}
      >
        {users && <LayoutCard data={users.users} />}
      </div>
      {isFetching && <LoadingBalls />}
      <div className="w-full h-2" ref={ref}></div>
    </div>
  )
}

export default Search
