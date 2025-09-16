import { NotifyLastCard } from "@/features/slides"
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
  const { users, isLoading, currentIndex } = useFetchToSlide(cleanedFilters)
  if (isLoading) return <LoadingBalls />
  console.log("DATAUSERS", users)
  return (
    <div data-testid="slides" className="flex flex-col gap-2 pt-3">
      <NotifyLastCard currentIndex={currentIndex} usersCount={users.users.length} />
      <FilterButton />
      <SliderCard data={users.users} />
    </div>
  )
}

export default Slides
