import { useNavigate } from "@tanstack/react-router"
import { GetFields } from "@/lib/utils/get-fields"
import { useEffect } from "react"
import { getEnvironment } from "@/shared/lib/utils/get-environment"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"

const useRouteEmptyFields = () => {
  const { isDev } = getEnvironment()
  const { isEmpty } = GetFields()
  const { userToken, user } = useCurrentUser()
  const userId = userToken?.userId
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) return
    if (isEmpty && !isDev && userId) navigate({ to: "/fill-fields" })
  }, [isEmpty, navigate, isDev, userId, user])
}

export default useRouteEmptyFields
