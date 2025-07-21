import { LikeCountNotify } from "@/features/search"
import { LayoutSwitchButtons } from "@/ui/index.ts"
import { FilterButton } from "@/ui/index.ts"
import { Route } from "@/app/routes/_app/_layout/search"
import { useSearch } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading"
import { LayoutCard } from "@/widgets/card"
import { useFetchToScroll } from "@/lib/hooks/use-fetch-scroll.ts"

const Search = () => {
  const searchParams = useSearch({ from: Route.id })
  const { ref, items, isLoading, isFetching, useDataResponse } = useFetchToScroll()
  useDataResponse()
  console.log("searchParams", searchParams)
  if (isLoading) return <LoadingBalls />
  if (!items) throw new Error("Error Data")
  return (
    <div data-testid="search" className="pb-[200px]">
      <LikeCountNotify />
      <div className="flex px-[12px] items-center justify-between pb-[20px]">
        <FilterButton />
        <LayoutSwitchButtons />
      </div>
      {items && <LayoutCard data={items} />}
      {isFetching && <LoadingBalls />}
      {!isLoading && <div ref={ref}></div>}
    </div>
  )
}

export default Search
