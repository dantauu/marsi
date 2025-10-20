import { useNavigate } from "@tanstack/react-router"
import { GetFields } from "@/lib/utils/get-fields"
import { useEffect } from "react"
import { getEnvironment } from "@/shared/lib/utils/get-environment"
import { useUserId } from "@/shared/lib/hooks/use-user-id.ts"

const useRouteEmptyFields = () => {
  const { isDev } = getEnvironment()
  const { isEmpty } = GetFields()
  const { userDataToken } = useUserId()
  const userId = userDataToken?.userId
  const navigate = useNavigate()
  useEffect(() => {
    if (isEmpty && !isDev && userId) navigate({ to: "/fill-fields" })
  }, [isEmpty, navigate, isDev, userId])
}

export default useRouteEmptyFields
