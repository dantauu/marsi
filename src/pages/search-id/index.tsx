import { useParams } from "@tanstack/react-router"
import { SearchIdCard } from "@/entities/search-id"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import { useBlockScroll } from "@/shared/lib/hooks/use-block-scroll.ts"
import { useGetUser } from "@/features/search-id"

export const SearchId = () => {
  const { id } = useParams({ strict: false })
  const { isLoading, isFetching, user } = useGetUser(id)
  useBlockScroll()

  if (isLoading || isFetching) return <LoadingBalls />
  return (
    <div className="px-2 mt-7">
      <SearchIdCard data={user ? [user] : []} />
    </div>
  )
}
