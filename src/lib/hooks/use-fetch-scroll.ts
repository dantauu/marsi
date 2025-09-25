import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useGetUsersQuery } from "@/shared/api/user"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import { appendUsers, resetUsers } from "@/redux/slices/users.ts"

const LIMIT = 10
//for search
export const useFetchToScroll = (params = {}) => {
  const users = useAppSelector((state) => state.users.users)
  const dispatch = useAppDispatch()
  const [offset, setOffset] = useState(0)
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
    dispatch(resetUsers())
  }, [JSON.stringify(params)])

  useEffect(() => {
    if (inView && !isFetching && newUsers.length === LIMIT) {
      setOffset((prev) => prev + LIMIT)
    }
  }, [inView, isFetching, newUsers])

  useEffect(() => {
    if (newUsers.length > 0) {
      dispatch(appendUsers(newUsers))
    }
  }, [newUsers])

  console.log("NEW", newUsers)
  return { ref, users, isLoading, isFetching }
}

//for swipe-photo
export const useFetchToSlide = (params = {}) => {
  const [offset, setOffset] = useState(0)
  const users = useAppSelector((state) => state.users.users)
  const dispatch = useAppDispatch()
  const currentIndex = useAppSelector((state) => state.slider.currentIndex)
  const { user } = useUserMe()
  const id = user?.id

  const {
    data: newUsers = [],
    isFetching,
    isLoading,
    isSuccess,
  } = useGetUsersQuery({ limit: LIMIT, offset, id, ...params })
  const countNewUsers = newUsers.length

  useEffect(() => {
    setOffset(0)
    dispatch(resetUsers())
  }, [JSON.stringify(params)])

  useEffect(() => {
    if (countNewUsers > 0) {
      dispatch(appendUsers(newUsers))
    }
  }, [newUsers])

  useEffect(() => {
    if (currentIndex >= users.length - 2 && !isFetching && countNewUsers > 0) {
      setOffset((prev) => prev + LIMIT)
    }
  }, [users.length, currentIndex])

  return { users, isLoading, isFetching, isSuccess, currentIndex }
}
