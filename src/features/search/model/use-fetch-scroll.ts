import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useGetUsersQuery } from "@/shared/api/user.ts"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { appendUsers, resetUsers } from "@/redux/slices/users.ts"
import { skipToken } from "@reduxjs/toolkit/query"
import { useTelegram } from "@/app/providers/telegram"
import { getEnvironment } from "@/shared/lib/utils/get-environment"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"

const LIMIT = 10
//for search
export const useFetchToScroll = (params = {}) => {
  const users = useAppSelector((state) => state.users.users)
  const dispatch = useAppDispatch()
  const [offset, setOffset] = useState(0)
  const { userToken } = useCurrentUser()
  const id = userToken?.userId
  const { webApp } = useTelegram()
  const { isDev } = getEnvironment()

  const queryArgs = webApp
    ? id
      ? { limit: LIMIT, offset, id, ...params }
      : isDev
        ? { limit: LIMIT, offset, ...params }
        : skipToken
    : { limit: LIMIT, offset, ...params }

  const { ref, inView } = useInView({ threshold: 0.5 })

  const {
    data: newUsers = [],
    isFetching,
    isLoading,
  } = useGetUsersQuery(queryArgs)

  useEffect(() => {
    setOffset(0)
    dispatch(resetUsers())
  }, [params, dispatch])

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

  return { ref, users, isLoading, isFetching }
}

//for swipe-photo
export const useFetchToSlide = (params = {}) => {
  const [offset, setOffset] = useState(0)
  const users = useAppSelector((state) => state.users.users)
  const dispatch = useAppDispatch()
  const currentIndex = useAppSelector((state) => state.slider.currentIndex)
  const { webApp } = useTelegram()
  const { userToken } = useCurrentUser()
  const id = userToken?.userId
  const { isDev } = getEnvironment()

  const queryArgs = webApp
    ? id
      ? { limit: LIMIT, offset, id, ...params }
      : isDev
        ? { limit: LIMIT, offset, ...params }
        : skipToken
    : { limit: LIMIT, offset, ...params }

  const {
    data: newUsers = [],
    isFetching,
    isLoading,
    isSuccess,
  } = useGetUsersQuery(queryArgs)
  const countNewUsers = newUsers.length

  useEffect(() => {
    setOffset(0)
    dispatch(resetUsers())
  }, [params, dispatch])

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
