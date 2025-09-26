import { useParams } from "@tanstack/react-router"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { SearchIdCard } from "@/entities/search-id/ui/card"
import LoadingBalls from "@/shared/ui/loading"
import { useBlockScroll } from "@/shared/lib/hooks/use-block-scroll.ts"

export const SearchId = () => {
  const { id } = useParams({ strict: false })
  const shouldFetch = Boolean(id && id != "undefined")
  useBlockScroll()
  const {
    data: user,
    isLoading,
    isFetching,
  } = useGetUserByIdQuery(id, {
    skip: !shouldFetch,
  })
  if (isLoading || isFetching) return <LoadingBalls />
  return (
    <div className="px-2 mt-7">
      <SearchIdCard data={user ? [user] : []} />
    </div>
  )
}
