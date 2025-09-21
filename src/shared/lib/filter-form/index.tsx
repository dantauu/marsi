import {
  FilterFormProvider,
  formEmptyValues,
} from "@/app/providers/filter-form"
import { useAppDispatch } from "@/redux/hooks.ts"
import { closeFilterModal } from "@/redux/slices/modal-slice.ts"
import { FilterModal } from "@/widgets/modals/filter-modal"
import { setFilters } from "@/redux/slices/filer-store.ts"
import { useEffect } from "react"
import type { FilterFormSchema } from "@/lib/schema/filter"

export const FilterForm = () => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(closeFilterModal())
  }

  const getSavedFilters = (): FilterFormSchema => {
    const saved = sessionStorage.getItem("searchFilters")
    if (saved) {
      return JSON.parse(saved)
    }
    return formEmptyValues
  }

  const defaultValues: FilterFormSchema = getSavedFilters()

  useEffect(() => {
    dispatch(setFilters(defaultValues))
  }, [])

  const handleSubmit = (data: FilterFormSchema) => {
    dispatch(setFilters(data))
    sessionStorage.setItem("searchFilters", JSON.stringify(data))
    handleClose()
  }

  return (
    <FilterFormProvider
      onClose={handleClose}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      <FilterModal />
    </FilterFormProvider>
  )
}
