import { useEffect, useState } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useInitUserMutation } from "@/shared/api/user.ts"

export const useInitUser = () => {
  const [initUser, { isLoading: isInitLoading, isError, isSuccess, error }] =
    useInitUserMutation()
  const { user } = useTelegram()
  const [isInit, setIsInit] = useState<boolean>(false)

  useEffect(() => {
    console.log("INIT USER TRIGGERED", user)
    if (!user) return

    initUser({
      id: String(user.id),
      first_name: user.first_name,
      photo_url: user.photo_url ? [user.photo_url] : [],
      username: user.username,
    })
      .unwrap()
      .then(() => setIsInit(true))
  }, [user, initUser])

  return { isInitLoading, isError, isSuccess, error, isInit }
}
