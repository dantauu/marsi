import { useNavigate } from "@tanstack/react-router"
import { GetFields } from "@/lib/utils/get-fields"
import { useEffect } from "react"
import { getEnvironment } from "@/shared/lib/utils/get-environment"

const useRouteEmptyFields = () => {
  const { isDev } = getEnvironment()
  const { isEmpty } = GetFields()
  const navigate = useNavigate()
  useEffect(() => {
    if (isEmpty && !isDev) navigate({ to: "/fill-fields" })
  }, [isEmpty, navigate, isDev])
}

export default useRouteEmptyFields
