import { useEffect, useRef } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts"

export const useInitUser = () => {
  const [initUser, {isSuccess}] =
    useInitUserMutation()
  const { user } = useTelegram()
  const [authUser] = useAuthUserMutation()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!user || localStorage.get("jwt") || initializedRef.current) return
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
        localStorage.set("jwt", access_token, { expires: 7 })
      } catch (error) {
        console.error(error)
        initializedRef.current = false
      }
    }
    initialize()
  }, [user])
  return { isSuccess }
}
