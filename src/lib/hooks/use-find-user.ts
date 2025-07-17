import { useGetUsersQuery } from "@/shared/api/user.ts"
import { useTelegram } from "@/app/providers/telegram"

export const useFindUser = () => {
  const { data: users } = useGetUsersQuery()
  const { user: telegramUser } = useTelegram()
  const user = users?.find((user) => Number(user?.id) === telegramUser?.id)

  return { user }
}