import { useEffect, useState } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useInitUserMutation } from "@/shared/api/user.ts"

export const useInitUser = () => {
  const [initUser, { isLoading, isError, isSuccess, error }] =
    useInitUserMutation()
  const { user } = useTelegram()
  const [isInit, setIsInit] = useState<boolean>(false)

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
    }).unwrap().finally(() => {
      localStorage.setItem(key, "true")
      setIsInit(true)
    })

  }, [user, initUser])

 return { isInit, isLoading, isError, isSuccess, error }
}
