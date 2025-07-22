import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useGetUsersQuery } from "@/shared/api/user"
import type { User } from "@/app/types/global"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { setCurrentIndex } from "@/redux/slices/slider-slice.ts"

const LIMIT = 10
//for search
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

//for slides
export const useFetchToSlide = (params = {}) => {
  const [offset, setOffset] = useState(0)
  const [users, setUsers] = useState<User[]>([])
  const dispatch = useAppDispatch()
  const currentIndex = useAppSelector((state) => state.slider.currentIndex)

  const {
    data: newUsers = [],
    isFetching,
    isLoading,
  } = useGetUsersQuery({ limit: LIMIT, offset, ...params })

  useEffect(() => {
    if (newUsers.length > 0) {
      setUsers(prev => [...prev, ...newUsers])
    }
    console.log("QUERY 1")
  }, [newUsers])

  useEffect(() => {
    if (currentIndex >= users.length - 2 && !isFetching) {
      setOffset(prev => prev + LIMIT)
    }
    console.log("QUERY 2")

  }, [users.length, currentIndex])
  console.log("INDEX:", currentIndex)
  console.log("LENGTH:", users.length)

  const changeCurrentIndex = (index: number) => {
    dispatch(setCurrentIndex(index))
  }

  return { users, isLoading, currentIndex, changeCurrentIndex }
}
