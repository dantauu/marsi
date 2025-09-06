import { useEffect } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useInitUserMutation } from "@/shared/api/user.ts"

export const useInitUser = () => {
  const [initUser, { isLoading, isError, isSuccess, error }] =
    useInitUserMutation()
  const { user } = useTelegram()

  useEffect(() => {
    console.log("INIT USER TRIGGERED", user)
    if (!user) return
    const key = `user-initialized-${user?.id}`
    if (localStorage.getItem(key)) return

    initUser({
      id: String(user.id),
      first_name: user.first_name,
      photo_url: user.photo_url ? [user.photo_url] : [],
      username: user.username,
    })
    localStorage.setItem(key, "true")
  }, [user])

  useEffect(() => {
    console.log("data", { isLoading, isError, isSuccess, error })
  }, [isLoading, isError, isSuccess, error])
}
