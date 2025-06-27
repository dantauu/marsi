import { createContext, useContext } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { FilterFormSchema } from "./filter-form"

export const FilterFormContext = createContext<UseFormReturn<FilterFormSchema> | null>(null)

export const useFilterForm = () => {
  const context = useContext(FilterFormContext)
  if (!context) throw new Error("useFilterForm must be used within a FilterFormProvider")
  return context
}
