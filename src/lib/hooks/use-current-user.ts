import { useTelegram } from "@/app/providers/telegram"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { useInitUser } from "@/lib/hooks/use-init-user.ts"

export const useUserMe = () => {
  const { isInitLoading, isInit } = useInitUser()
  const { user: telegramUser } = useTelegram()
  const telegramUserId = telegramUser?.id

  const {
    data: user,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useGetUserByIdQuery(String(telegramUserId), {
    skip: !telegramUserId || !isInit,
  })
  return {
    user: user ?? null,
    isError,
    isLoading: isInitLoading || isLoading,
    isFetching,
    error,
    refetch,
  }
}
