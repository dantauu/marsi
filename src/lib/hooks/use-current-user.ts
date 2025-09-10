import { useTelegram } from "@/app/providers/telegram"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"

export const useUserMe = () => {
  const { user: telegramUser } = useTelegram()
  const telegramUserId = telegramUser?.id

  const query = useGetUserByIdQuery(String(telegramUserId), {
    skip: !telegramUserId
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
