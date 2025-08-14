import { useParams } from "@tanstack/react-router"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { SearchIdCard } from "@/entities/search-id/ui/card"
import LoadingBalls from "@/shared/ui/loading"
import { ButtonBack } from "@/shared/ui/buttons/button-back"

export const SearchId = () => {
  const { id } = useParams({ strict: false })
  const shouldFetch = Boolean(id && id != "undefined")
  const {
    data: user,
    isLoading,
    isFetching,
  } = useGetUserByIdQuery(id, {
    skip: !shouldFetch,
  })
  if (isLoading || isFetching) return <LoadingBalls />
  return (
    <div className="px-2 pb-30 mt-2">
      <div className="flex justify-end">
        <ButtonBack className="mb-3" path={"/search"} />
      </div>
      <SearchIdCard data={user ? [user] : []} />
    </div>
  )
}
