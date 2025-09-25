import { SliderCard } from "@/entities/slides"
import { FilterButton } from "@/ui"
import LoadingBalls from "@/shared/ui/loading"
import { useFetchToSlide } from "@/lib/hooks/use-fetch-scroll.ts"
import { useAppSelector } from "@/redux/hooks.ts"

const Slides = () => {
  const filters = useAppSelector((state) => state.filters)
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value != null
    )
  )
  const { users, isLoading, isFetching } = useFetchToSlide(cleanedFilters)
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingBalls />
      </div>
    )
  return (
    <div data-testid="slides" className="flex flex-col gap-2 pt-3 pb-10">
      <FilterButton className="ml-2" />
      <SliderCard isFetching={isFetching} users={users} />
    </div>
  )
}

export default Slides
