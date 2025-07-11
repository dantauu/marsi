import { useEffect, useRef } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useInitUserMutation } from "@/redux/api/user.ts"

export const useInitUser = () => {
  const [initUser, { isLoading, isError, isSuccess, error }] =
    useInitUserMutation()
  const { user } = useTelegram()
  const initialized = useRef(false)

  useEffect(() => {
    console.log("INIT USER TRIGGERED", user)
    if (!user || initialized.current) return

    initialized.current = true

    initUser({
      id: user.id,
      first_name: user.first_name,
      photo_url: user.photo_url,
    })
  }, [user])

  useEffect(() => {
    console.log("data", { isLoading, isError, isSuccess, error })
  }, [isLoading, isError, isSuccess, error])
}
