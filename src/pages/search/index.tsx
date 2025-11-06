import { BackToTop, LikesCount } from "@/features/search"
import { SwitchButtons } from "@/ui/index.ts"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import { LayoutCardList } from "@/widgets/card"
import { useFetchToScroll } from "@/lib/hooks/use-fetch-scroll.ts"
import { useGetLikesToMeQuery } from "@/shared/api/likes.ts"
import { useScrollRestore } from "@/lib/hooks/use-scroll-restore.ts"
import { useAppSelector } from "@/redux/hooks.ts"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"
import { NotifyLastCard } from "@/shared/ui/notify-last-card"
import useRouteEmptyFields from "@/shared/lib/utils/route-empty-fileds"
import { FilterButton } from "@/ui"
import { useMemo } from "react"
import { getEnvironment } from "@/shared/lib/utils/get-environment"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"

const Search = () => {
  useRouteEmptyFields()
  const { isMobile } = usePlatform()
  const { isDev } = getEnvironment()
  const filters = useAppSelector((state) => state.filters)
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value != null
    )
  )
  const { ref, users, isLoading, isFetching } = useFetchToScroll(cleanedFilters)
  const memoizedUsers = useMemo(() => users ?? [], [users])
  useScrollRestore("search", [users?.length])
  const { userToken } = useCurrentUser()
  const userid = userToken?.userId
  const { data: countLikes } = useGetLikesToMeQuery(userid ?? "", {
    skip: !userid,
  })
  const showNotify =
    users.length === 0 &&
    (!isDev ? Boolean(userid) : true) &&
    !isFetching &&
    !isLoading
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingBalls />
      </div>
    )
  if (!users) throw new Error("Error Data")
  return (
    <div data-testid="search" className="pb-[200px]">
      <div
        className={`fixed z-10 top-0 w-full max-w-[610px] bg-[var(--color-bg-surface)] ${isMobile ? "pt-[80px]" : "pt-0"}`}
      >
        <LikesCount countLikes={countLikes} />
        <div className="flex w-full mx-auto px-[12px] items-center justify-between pb-[5px]">
          <FilterButton />
          <SwitchButtons />
        </div>
      </div>
      <div className={`${isMobile ? "pt-[110px]" : "pt-[80px]"}`}>
        {users && <LayoutCardList data={memoizedUsers} />}
      </div>
      {showNotify && <NotifyLastCard />}
      <BackToTop />
      {isFetching && <LoadingBalls />}
      <div className="w-full h-2" ref={ref}></div>
    </div>
  )
}

export default Search
