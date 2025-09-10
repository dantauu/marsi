import { useEffect, useRef, useState } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts"
import Cookies from "js-cookie"

export const useInitUser = () => {
  const [initUser] = useInitUserMutation()
  const [authUser] = useAuthUserMutation()
  const { user } = useTelegram()

  const initializedRef = useRef(false)   // защита от повторного запуска
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    if (!user || Cookies.get("jwt") || initializedRef.current) return

    const initialize = async () => {
      try {
        initializedRef.current = true
        setIsLoading(true)
        setError(null)

        const initUserPayload = {
          id: String(user.id),
          first_name: user.first_name,
          photo_url: user.photo_url ? [user.photo_url] : [],
          username: user.username,
        }

        const initData = await initUser(initUserPayload).unwrap()
        const { access_token } = await authUser(initData).unwrap()

        Cookies.set("jwt", access_token, { expires: 7 })
        setIsSuccess(true)
      } catch (err) {
        console.error(err)
        initializedRef.current = false // разрешаем ретрай
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    initialize()
  }, [user])

  return { isLoading, isSuccess, error }
}
