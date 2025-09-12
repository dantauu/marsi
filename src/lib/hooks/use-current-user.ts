import { useTelegram } from "@/app/providers/telegram"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { useAppSelector } from "@/redux/hooks.ts"

export const useUserMe = () => {
  const { user: telegramUser } = useTelegram()
  const telegramUserId = telegramUser?.id
  const token = useAppSelector((state) => state.auth.token)


  const query = useGetUserByIdQuery(String(telegramUserId), {
    skip: !telegramUserId || !token,
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