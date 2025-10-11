import { useNavigate } from "@tanstack/react-router"
import { GetFields } from "@/lib/utils/get-fields"
import { useEffect } from "react"
import { getEnvironment } from "@/shared/lib/utils/get-environment"
import { useUserMe } from "@/shared/lib/hooks/use-user-me.ts"

const useRouteEmptyFields = () => {
  const { isDev } = getEnvironment()
  const { isEmpty } = GetFields()
  const { user } = useUserMe()
  const navigate = useNavigate()
  useEffect(() => {
    if (isEmpty && !isDev && user?.id) navigate({ to: "/fill-fields" })
  }, [isEmpty, navigate, isDev, user?.id])
}

export default useRouteEmptyFields
