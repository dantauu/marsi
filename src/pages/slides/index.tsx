import { NotifyLastCard } from "@/features/slides"
import { SliderCard } from "@/entities/slides"
import { FilterButton } from "@/ui"
import { useSearch } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading"
import { useFetchToSlide } from "@/lib/hooks/use-fetch-scroll.ts"

const Slides = () => {
  const searchParams = useSearch({ strict: false })
  const { users, isLoading, currentIndex } = useFetchToSlide(searchParams)
  if (isLoading) return <LoadingBalls />
  console.log("DATAUSERS", users)
  return (
    <div data-testid="slides" className="flex flex-col gap-5 pt-3 px-2 pb-[90px]">
      <NotifyLastCard currentIndex={currentIndex} usersCount={users.length} />
      <FilterButton />
      <SliderCard data={users} />
    </div>
  )
}

export default Slides
