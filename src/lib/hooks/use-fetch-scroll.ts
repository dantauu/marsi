import { Route } from "@/app/routes/_app/_layout/search"
import { useGetUsersQuery } from "@/shared/api/user.ts"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export const useFetchToScroll = () => {
  const { inView, ref } = useInView({ threshold: 0.5 })
  const searchParams = useSearch({ from: Route.id })
  const navigate = useNavigate({ from: Route.id })

  const limit = Number(searchParams.limit) || 5
  // const offset = Number(searchParams.offset) || 0


  const { data: users = [], isLoading, isSuccess, isFetching } = useGetUsersQuery({ ...searchParams, limit, offset: 0 })
  console.log("USERS", users)
  console.log("LIMIT", limit)

  const useDataResponse = () => {
    useEffect(() => {
      if (inView && !isFetching && users?.length >= limit) {
        navigate({
          search: () => ({
            ...searchParams,
            limit: limit + 5,
          })
        })
      }
    }, [inView, isSuccess])
  }

  return { ref, items: users, useDataResponse, isLoading, isFetching }
}