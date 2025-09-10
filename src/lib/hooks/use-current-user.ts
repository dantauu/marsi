import { useTelegram } from "@/app/providers/telegram"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { useInitUser } from "@/lib/hooks/use-init-user.ts"

export const useUserMe = () => {
  const { user: telegramUser } = useTelegram()
  const { isLoading, authLoading } = useInitUser()
  const telegramUserId = telegramUser?.id

  const query = useGetUserByIdQuery(String(telegramUserId), {
    skip: !telegramUserId || isLoading || authLoading
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
