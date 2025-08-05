import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useGetUsersQuery } from "@/shared/api/user"
import type { User } from "@/app/types/global"
import { useAppSelector } from "@/redux/hooks.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"

const LIMIT = 10
//for search
export const useFetchToScroll = (params = {}) => {
  const [offset, setOffset] = useState(0)
  const [users, setUsers] = useState<User[]>([])
  const { user } = useUserMe()
  const id = user?.id

  const { ref, inView } = useInView({ threshold: 0.5 })

  const {
    data: newUsers = [],
    isFetching,
    isLoading,
  } = useGetUsersQuery({ limit: LIMIT, offset, id, ...params })

  useEffect(() => {
    setOffset(0)
    setUsers([])
  }, [JSON.stringify(params)])

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

  return { ref, users, isLoading, isFetching }
}

//for swipe-photo
export const useFetchToSlide = (params = {}) => {
  const [offset, setOffset] = useState(0)
  const [users, setUsers] = useState<User[]>([])
  const currentIndex = useAppSelector((state) => state.slider.currentIndex)
  const { user } = useUserMe()
  const id = user?.id

  const {
    data: newUsers = [],
    isFetching,
    isLoading,
  } = useGetUsersQuery({ limit: LIMIT, offset, id, ...params })
  const countNewUsers = newUsers.length

  useEffect(() => {
    setOffset(0)
    setUsers([])
  }, [JSON.stringify(params)])

  useEffect(() => {
    if (countNewUsers > 0) {
      setUsers((prev) => [...prev, ...newUsers])
    }
  }, [newUsers])

  useEffect(() => {
    if (currentIndex >= users.length - 2 && !isFetching && countNewUsers > 0) {
      setOffset((prev) => prev + LIMIT)
    }
  }, [users.length, currentIndex])

  return { users, isLoading, currentIndex }
}
