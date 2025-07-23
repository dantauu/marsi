import { NotifyLastCard } from "@/features/slides"
import { SliderCard } from "@/entities/slides"
import { FilterButton } from "@/ui"
import { useParams, useSearch } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading"
import { useFetchToSlide } from "@/lib/hooks/use-fetch-scroll.ts"

const Slides = () => {
  const searchParams = useSearch({ strict: false })
  const { id } = useParams({ strict: false })
  const { users, isLoading, currentIndex } = useFetchToSlide(searchParams)
  const selectedUser = users?.find((user) => user?.id === id)
  if (isLoading) return <LoadingBalls />
  if (!users) throw new Error("Error Data")
  console.log("DATAUSERS", users)
  return (
    <div data-testid="slides" className="flex flex-col gap-5 px-2 pb-[90px]">
      <NotifyLastCard currentIndex={currentIndex} usersCount={users.length} />
      <FilterButton />
      <SliderCard data={id ? (selectedUser ? [selectedUser] : []) : users} />
    </div>
  )
}

export default Slides
