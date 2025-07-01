import { useSearch } from "@tanstack/react-router"

export const useFilterParams = () => {
  const search = useSearch({ strict: false })
  return search
}
