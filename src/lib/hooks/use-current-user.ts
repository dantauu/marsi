import { useTelegram } from "@/app/providers/telegram"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"

export const useCurrentUser = () => {
  const { user: telegramUser } = useTelegram()
  const telegramUserId = telegramUser?.id

  const { data: user, isLoading, isError, isFetching, error, refetch } = useGetUserByIdQuery(String(telegramUserId), {
    skip: !telegramUserId,
  })
  return { user: user ?? null, isError, isLoading, isFetching, error, refetch}
}
