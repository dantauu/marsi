import { useEffect, useRef, useState } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user"
import Cookies from "js-cookie"

export const useInitUser = () => {
  const [initUser] = useInitUserMutation()
  const [authUser] = useAuthUserMutation()
  const { user } = useTelegram()

  const initializedRef = useRef(false)
  const [ready, setReady] = useState(!!Cookies.get("jwt"))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    if (!user || ready || initializedRef.current) return

    initializedRef.current = true
    setIsLoading(true)

    const run = async () => {
      try {
        const initData = await initUser({
          id: String(user.id),
          first_name: user.first_name,
          photo_url: user.photo_url ? [user.photo_url] : [],
          username: user.username,
        }).unwrap()

        const { access_token } = await authUser(initData).unwrap()
        Cookies.set("jwt", access_token, { expires: 7 })
        setReady(true)
      } catch (e) {
        console.error(e)
        setError(e)
        initializedRef.current = false
      } finally {
        setIsLoading(false)
      }
    }

    run()
  }, [user, ready])

  return { ready, isLoading, error }
}
