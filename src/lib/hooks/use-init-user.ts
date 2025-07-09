import { useInitUserMutation } from "@/redux/api/user.ts"
import { useTelegram } from "@/app/providers/telegram"
import { useEffect } from "react"

export const useInitUser = () => {
  const [initUser] = useInitUserMutation()
  const { user } = useTelegram()

  useEffect(() => {
    if (!user) return

    initUser({
      id: user.id,
      first_name: user.first_name,
      photo_url: user.photo_url,
    })
  }, [user])
}