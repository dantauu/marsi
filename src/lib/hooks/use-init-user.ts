import { useEffect, useRef } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts"
import Cookies from "js-cookie"

export const useInitUser = () => {
  const [initUser, { isLoading, isError, isSuccess, error }] =
    useInitUserMutation()
  const { user } = useTelegram()
  const [authUser] = useAuthUserMutation()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!user || Cookies.get("jwt") || initializedRef.current) return
    const initialize = async () => {
      try {
        initializedRef.current = true
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
        initializedRef.current = false
      }
    }
    initialize()
  }, [user])

  useEffect(() => {
    console.log("data", { isLoading, isError, isSuccess, error })
  }, [isLoading, isError, isSuccess, error])
  return {isLoading, isSuccess}
}
