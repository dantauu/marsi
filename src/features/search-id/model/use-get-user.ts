import { useGetUserByIdQuery } from "@/shared/api/user.ts"

export const useGetUser = ({ id }: { id: string }) => {
  const shouldFetch = Boolean(id && id != "undefined")
  const {
    data: user,
    isLoading,
    isFetching,
  } = useGetUserByIdQuery(id, {
    skip: !shouldFetch,
  })

  return { user, isFetching, isLoading }
}
