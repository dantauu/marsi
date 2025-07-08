import { SliderButtons, NotifyLastCard } from "@/features/slides"
import { SliderCard } from "@/entities/slides"
import { FilterButton } from "@/ui"
import { useGetUsersQuery } from "@/redux/api/user.ts"
import { useSearch } from "@tanstack/react-router"
import { Route } from "@/app/routes/_app/_layout/slides"
import LoadingBalls from "@/shared/ui/loading"

const Slides = () => {
  const searchParams = useSearch({ from: Route.id })
  const { data: users, isLoading } = useGetUsersQuery(searchParams)

  if (isLoading) return <LoadingBalls />
  if (!users) throw new Error("Error Data")
  console.log("DATAUSERS", users)
  return (
    <div data-testid="slides" className="flex flex-col gap-5 px-2 pb-[150px]">
      <NotifyLastCard />
      <FilterButton />
      <SliderCard data={users} />
      <SliderButtons />
    </div>
  )
}

export default Slides
