import { useEffect } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts"
import Cookies from "js-cookie"

export const useInitUser = () => {
  const [initUser, { isLoading, isError, isSuccess, error }] =
    useInitUserMutation()
  const { user } = useTelegram()
  const [authUser] = useAuthUserMutation()

  useEffect(() => {
    if (!user) return
    const initialize = async () => {
      try {
        if (Cookies.get("jwt")) return

        const initUserPayload = {
          id: String(user.id),
          first_name: user.first_name,
          photo_url: user.photo_url ? [user.photo_url] : [],
          username: user.username,
        }
        const initData = await initUser(initUserPayload).unwrap()

        const { access_token } = await authUser(initData).unwrap()
        Cookies.set("jwt", access_token, { expires: 7 })
      } catch (error) {
        console.error(error)
      }
    }
    initialize()
  }, [user, initUser, authUser])

  useEffect(() => {
    console.log("data", { isLoading, isError, isSuccess, error })
  }, [isLoading, isError, isSuccess, error])
  return {isSuccess}
}
