import { SliderCard } from "@/entities/slides"
import { FilterButton } from "@/ui"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import { useFetchToSlide } from "@/lib/hooks/use-fetch-scroll.ts"
import { useAppSelector } from "@/redux/hooks.ts"
import { useBlockScroll } from "@/shared/lib/hooks/use-block-scroll.ts"
import useRouteEmptyFields from "@/shared/lib/utils/route-empty-fileds"
import { useMemo } from "react"

const Slides = () => {
  useRouteEmptyFields()
  useBlockScroll()
  const filters = useAppSelector((state) => state.filters)
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value != null
    )
  )
  const { users, isLoading, isFetching } = useFetchToSlide(cleanedFilters)
  const memoizedUsers = useMemo(() => users ?? [], [users])
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingBalls />
      </div>
    )
  return (
    <div data-testid="slides" className="flex flex-col gap-2 pt-5 pb-10">
      <FilterButton className="ml-2" />
      <SliderCard isFetching={isFetching} users={memoizedUsers} />
    </div>
  )
}

export default Slides
