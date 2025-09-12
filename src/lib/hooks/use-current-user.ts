import { useTelegram } from "@/app/providers/telegram"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { useInitUser } from "@/lib/hooks/use-init-user.ts"

export const useUserMe = () => {
  const { user: telegramUser } = useTelegram()
  const telegramUserId = telegramUser?.id
  const { isToken } = useInitUser()

  const query = useGetUserByIdQuery(String(telegramUserId), {
    skip: !telegramUserId || !isToken,
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