import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useGetUsersQuery } from "@/shared/api/user"
import type { User } from "@/app/types/global"

const LIMIT = 10

export const useFetchToScroll = () => {
  const [offset, setOffset] = useState(0)
  const [users, setUsers] = useState<User[]>([])

  const { ref, inView } = useInView({ threshold: 0.5 })

  const {
    data: newUsers = [],
    isFetching,
    isLoading,
  } = useGetUsersQuery({ limit: LIMIT, offset })

  const useDataResponse = () => {
  useEffect(() => {
    if (inView && !isFetching && newUsers.length === LIMIT) {
      setOffset((prev) => prev + LIMIT)
    }
  }, [inView, isFetching, newUsers])

  useEffect(() => {
    if (newUsers.length > 0) {
      setUsers((prev) => [...prev, ...newUsers])
    }
  }, [newUsers])
    console.log("NEW", newUsers)
  }

  return { ref, items: users, isLoading, isFetching, useDataResponse }
}
