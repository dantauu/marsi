import { useNavigate, useSearch } from "@tanstack/react-router"
import { Route } from "@/app/routes/_app/_layout/search"
import {
  FilterForm,
  type FilterFormSchema,
  formEmptyValues,
} from "@/app/providers/filter-form"
import { FilterModalForm } from "@/entities/search/ui/filter/filter-form.tsx"

export const FilterModal = () => {
  const navigate = useNavigate({ from: Route.id })
  const search = useSearch({ from: Route.id })

  const defaultValues: FilterFormSchema = {
    minAge: search.minAge ?? formEmptyValues.minAge,
    maxAge: search.maxAge ?? formEmptyValues.maxAge,
    minHeight: search.minHeight ?? formEmptyValues.minHeight,
    maxHeight: search.maxHeight ?? formEmptyValues.maxHeight,
    location: search.location ?? "",
    gender: search.gender ?? "",
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
      location: data.location || undefined,
      gender: data.gender || undefined,
    }

    navigate({ search: { ...search, ...params }, replace: true })
  }

  return (
    <>
      <FilterForm defaultValues={defaultValues} onSubmit={handleSubmit}>
        <FilterModalForm />
      </FilterForm>
    </>
  )
}
