import { useTelegram } from "@/app/providers/telegram"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { useInitUser } from "@/lib/hooks/use-init-user.ts"

export const useUserMe = () => {
  const { user: telegramUser } = useTelegram()
  const { isInit } = useInitUser()
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
  return { user: user ?? null, isError, isLoading: isInit || isLoading, isFetching, error, refetch }
}
