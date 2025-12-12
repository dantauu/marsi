import {
  useFetchToScroll,
  useUserFilters,
  useScrollRestore,
  LikesCount,
  BackToTop,
} from "@/features/search"
import { useMemo } from "react"
import { SwitchButtons } from "@/ui/index.ts"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import { LayoutCardList } from "@/widgets/card"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"
import { NotifyLastCard } from "@/shared/ui/notify-last-card"
import useRouteEmptyFields from "@/shared/lib/utils/route-empty-fileds"
import { FilterButton } from "@/ui"
import { getEnvironment } from "@/shared/lib/utils/get-environment"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { useGetLikes } from "@/shared/lib/hooks/use-get-likes.ts"

const Search = () => {
  useRouteEmptyFields()
  const { isMobile } = usePlatform()
  const { isDev } = getEnvironment()
  const filters = useUserFilters()
  const { ref, users, isLoading, isFetching } = useFetchToScroll(filters)
  const memoizedUsers = useMemo(() => users ?? [], [users])
  const { likesToMe } = useGetLikes()
  const { userToken } = useCurrentUser()

  useScrollRestore("search", [users?.length])
  const showNotify =
    users.length === 0 &&
    (!isDev ? Boolean(userToken?.userId) : true) &&
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
        <LikesCount countLikes={likesToMe} />
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
