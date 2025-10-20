import { useTelegram } from "@/app/providers/telegram"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { useAppSelector } from "@/redux/hooks.ts"
import { parseToken } from "@/lib/utils/jwt"

export const useCurrentUser = () => {
  const { user: telegramUser } = useTelegram()
  const token = useAppSelector((state) => state.auth.token)
  const payload = parseToken(token)
  const userDataToken = payload
    ? {
        userId: payload?.sub ?? null,
      }
    : null
  const userId = telegramUser?.id ?? userDataToken?.userId

  const query = useGetUserByIdQuery(String(userId), {
    skip: !userId || !token,
  })

  return {
    user: query.data ?? null,
    userToken: userDataToken,
    isError: query.isError,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  }
}
