import { useMemo } from "react"
import { useAppSelector } from "@/redux/hooks.ts"

export const useUserFilters = () => {
  const filters = useAppSelector((state) => state.filters)
  return useMemo(
    () =>
      Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== "" && value != null
        )
      ),
    [filters]
  )
}
