import { useGetUserByIdQuery } from "@/shared/api/user.ts"

export const useGetUser = (id: string) => {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useGetUserByIdQuery(id, {
    skip: !id,
  })

  return { user, isFetching, isLoading }
}
