import { useTelegram } from "@/app/providers/telegram"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { useEffect, useState } from "react"

export const useUserMe = () => {
  const { user: telegramUser } = useTelegram()
  const [userId, setUserId] = useState<string | null>(null)
  const telegramUserId = telegramUser?.id

  useEffect(() => {
    if (!telegramUserId) return
    const key = `user-initialized-${telegramUserId}`
    const stored = localStorage.getItem(key)
    if (stored) {
      setUserId(String(telegramUserId))
    }
  }, [telegramUserId])

    const query = useGetUserByIdQuery(String(userId), {
      skip: !userId,
    })

  return {
    user: query.data ?? null,
    isError: query.isError,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  }
}
