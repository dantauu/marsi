import { useEffect, useRef, useState } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useInitUserMutation } from "@/shared/api/user.ts"

export const useInitUser = () => {
  const [initUser, { isLoading: isInitLoading, isError, isSuccess, error }] =
    useInitUserMutation()
  const { user } = useTelegram()
  const calledRef = useRef<Set<string>>(new Set())
  const [isInit, setIsInit] = useState<boolean>(false)

  useEffect(() => {

    console.log("INIT USER TRIGGERED", user)
    if (!user) return
    const id = String(user?.id)
    if (calledRef.current.has(id)) return
    calledRef.current.add(id)

    initUser({
      id: id,
      first_name: user.first_name,
      photo_url: user.photo_url ? [user.photo_url] : [],
      username: user.username,
    })
      .unwrap()
      .then(() => setIsInit(true))
  }, [user])

  return { isInitLoading, isError, isSuccess, error, isInit }
}
