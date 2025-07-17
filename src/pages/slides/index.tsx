import { NotifyLastCard } from "@/features/slides"
import { SliderCard } from "@/entities/slides"
import { FilterButton } from "@/ui"
import { useGetUsersQuery } from "@/shared/api/user.ts"
import { useParams, useSearch } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading"

const Slides = () => {
  const searchParams = useSearch({ strict: false })
  const { id } = useParams({ strict: false })
  const { data: users, isLoading } = useGetUsersQuery(searchParams)
  const selectedUser = users?.find((user) => user?.id === id)

  if (isLoading) return <LoadingBalls />
  if (!users) throw new Error("Error Data")
  console.log("DATAUSERS", users)
  return (
    <div data-testid="slides" className="flex flex-col gap-5 px-2 pb-[90px]">
      <NotifyLastCard />
      <FilterButton />
      <SliderCard data={id ? (selectedUser ? [selectedUser] : []) : users} />
    </div>
  )
}

export default Slides
