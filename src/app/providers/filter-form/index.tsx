import { z } from "zod"
import { useForm } from "react-hook-form"
import { type PropsWithChildren, useCallback } from "react"
import { FilterFormContext } from "./filter-form-context.tsx"

export const filterSchema = z.object({
  minAge: z.number(),
  maxAge: z.number(),
  minHeight: z.number(),
  maxHeight: z.number(),
  location: z.string(),
  gender: z.string(),
})

export type FilterFormSchema = z.infer<typeof filterSchema>

export const formEmptyValues: FilterFormSchema = {
  minAge: 16,
  maxAge: 100,
  minHeight: 140,
  maxHeight: 230,
  location: "",
  gender: "",
}

type FilterFormProps = PropsWithChildren<{
  defaultValues: FilterFormSchema
  onSubmit: (data: FilterFormSchema) => void
  onClose?: () => void
}>

export function FilterForm({
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
