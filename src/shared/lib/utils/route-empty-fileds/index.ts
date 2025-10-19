import { useNavigate } from "@tanstack/react-router"
import { GetFields } from "@/lib/utils/get-fields"
import { useEffect } from "react"
import { getEnvironment } from "@/shared/lib/utils/get-environment"
import { useUserData } from "@/shared/lib/hooks/use-user-data.ts"

const useRouteEmptyFields = () => {
  const { isDev } = getEnvironment()
  const { isEmpty } = GetFields()
  const { user } = useUserData()
  const navigate = useNavigate()
  useEffect(() => {
    if (isEmpty && !isDev && user?.id) navigate({ to: "/fill-fields" })
  }, [isEmpty, navigate, isDev, user?.id])
}

export default useRouteEmptyFields
