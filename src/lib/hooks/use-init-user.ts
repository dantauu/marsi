import { useEffect } from "react"
import { useTelegram } from "@/app/providers/telegram"
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts"
import { useGetUserByIdQuery } from "@/shared/api/user.ts"
import { useAppDispatch } from "@/redux/hooks.ts"
import { setToken } from "@/redux/slices/auth.ts"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { getEnvironment } from "@/shared/lib/utils/get-environment"
import type { UserInit } from "@/app/types/user"

export const useInitUser = () => {
  const { isDev } = getEnvironment()
  const { user } = useTelegram()
  const [initUser] = useInitUserMutation()
  const [authUser] = useAuthUserMutation()
  const dispatch = useAppDispatch()
  const { userToken } = useCurrentUser()
  const userId = userToken?.userId

  const { isError } = useGetUserByIdQuery(userId ?? "", {
    skip: !userId,
  })

  useEffect(() => {
    if (!user || isDev) return

    const initialize = async () => {
      try {
        if (userId && isError) {
          dispatch(setToken(null))
        }

        if (!userId) {
          const initUserPayload: UserInit = {
            id: String(user.id),
            first_name: user.first_name,
            photo_url: user.photo_url,
            username: user.username,
          } as UserInit

          const initData = await initUser(initUserPayload).unwrap()
          const { access_token } = await authUser(initData).unwrap()

          dispatch(setToken(access_token))
        }
      } catch (error) {
        console.error(error)
      }
    }

    initialize()
  }, [user, userId, isError, initUser, authUser, isDev])
}
