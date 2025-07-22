import { useNavigate, useSearch } from "@tanstack/react-router"
import { Route } from "@/app/routes/_app/_layout/search"
import {
  FilterFormProvider,
  type FilterFormSchema,
  formEmptyValues,
} from "@/app/providers/filter-form"
import { slugify } from "transliteration"
import { useAppDispatch } from "@/redux/hooks.ts"
import { closeFilterModal } from "@/redux/slices/modal-slice.ts"
import { FilterModal } from "@/widgets/modals/filter-modal"

export const FilterForm = () => {
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeFilterModal())
  }
  const navigate = useNavigate({ from: Route.id })
  const searchParams = useSearch({ strict: false })

  const defaultValues: FilterFormSchema = {
    minAge: searchParams.minAge ?? formEmptyValues.minAge,
    maxAge: searchParams.maxAge ?? formEmptyValues.maxAge,
    minHeight: searchParams.minHeight ?? formEmptyValues.minHeight,
    maxHeight: searchParams.maxHeight ?? formEmptyValues.maxHeight,
    city: searchParams.location ?? formEmptyValues.city,
    region: searchParams.region ?? formEmptyValues.region,
    gender: searchParams.gender ?? "",
  }

  const handleSubmit = (data: FilterFormSchema) => {
    const params = {
      minAge: data.minAge !== formEmptyValues.minAge ? data.minAge : undefined,
      maxAge: data.maxAge !== formEmptyValues.maxAge ? data.maxAge : undefined,
      minHeight:
        data.minHeight !== formEmptyValues.minHeight
          ? data.minHeight
          : undefined,
      maxHeight:
        data.maxHeight !== formEmptyValues.maxHeight
          ? data.maxHeight
          : undefined,
      city: data.city ? slugify(data.city) : undefined,
      gender: data.gender || undefined,
    }

    navigate({ search: { ...searchParams, ...params }, replace: true })
  }

  return (
    <>
      <FilterFormProvider
        onClose={handleClose}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <FilterModal />
      </FilterFormProvider>
    </>
  )
}
