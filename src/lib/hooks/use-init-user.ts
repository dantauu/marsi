import { useEffect, useState } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts"

export const useInitUser = () => {
  const [initUser] = useInitUserMutation()
  const [authUser] = useAuthUserMutation()
  const { user, webApp } = useTelegram()
  const [isToken, setIsToken] = useState<string | null>(localStorage.getItem("jwt"))
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!webApp || initialized) return

    const interval = setInterval(async () => {
      if (!user || isToken) return

      try {
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
        setInitialized(true)
        clearInterval(interval)
      } catch (err) {
        console.error(err)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [webApp, user, isToken, initUser, authUser, initialized])

  return { isToken }
}
