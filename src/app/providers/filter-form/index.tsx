import { useForm } from "react-hook-form"
import { type PropsWithChildren, useCallback } from "react"
import { FilterFormContext } from "@/app/context/filter-form-context.tsx"
import { type FilterFormSchema, filterSchema } from "@/lib/schema/filter"

export const formEmptyValues: FilterFormSchema = {
  minAge: null,
  maxAge: null,
  minHeight: null,
  maxHeight: null,
  city: "",
  region: "",
  gender: "",
}

type FilterFormProps = PropsWithChildren<{
  defaultValues: FilterFormSchema
  onSubmit: (data: FilterFormSchema) => void
  onClose?: () => void
}>

export function FilterFormProvider({
  defaultValues,
  onSubmit,
  onClose,
  children,
}: FilterFormProps) {
  const form = useForm<FilterFormSchema>({
    mode: "onChange",
    defaultValues,
  })

  const handleSubmit = useCallback(
    (data: FilterFormSchema) => {
      const result = filterSchema.safeParse(data)
      if (!result.success) {
        console.warn("Invalid filter form:", result.error)
        return
      }
      onSubmit(data)
      onClose?.()
    },
    [onSubmit, onClose]
  )

  return (
    <FilterFormContext.Provider value={form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>{children}</form>
    </FilterFormContext.Provider>
  )
}
