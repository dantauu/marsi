import { useEffect, useRef, useState } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts"

export const useInitUser = () => {
  const [initUser] =
    useInitUserMutation()
  const { user } = useTelegram()
  const [authUser] = useAuthUserMutation()
  const initializedRef = useRef(false)
  const [isToken, setIsToken] = useState<string | null>(localStorage.getItem("jwt"))

  useEffect(() => {
    if (!user || isToken || initializedRef.current) return
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
        localStorage.setItem("jwt", access_token)
        setIsToken(access_token)
      } catch (error) {
        console.error(error)
        initializedRef.current = false
      }
    }
    initialize()
  }, [user, isToken])
  return { isToken }
}
