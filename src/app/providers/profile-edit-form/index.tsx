import { z } from "zod"
import { useForm } from "react-hook-form"
import { type PropsWithChildren, useCallback, useEffect, useState } from "react"
import { EditFormContext } from "@/app/context/profile-edit-context.tsx"
import { zodResolver } from "@hookform/resolvers/zod"
import type { User } from "@/app/types/user"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"

export const editSchema = z.object({
  photo_url: z.array(z.string()),
  first_name: z.string(),
  age: z
    .number({
      required_error: "Введите возраст",
      invalid_type_error: "Возраст должен быть числом",
    })
    .int("Возраст должен быть целым числом")
    .min(16, "Возраст должен быть не меньше 16")
    .max(100, "Возраст должен быть не больше 100")
    .nullable(),
  gender: z.string().optional(),
  city: z.string().optional(),
  height: z
    .string()
    .refine(
      (val) => {
        if (!val) return true
        const num = Number(val)
        return !isNaN(num) && num >= 120 && num <= 230
      },
      (val) => {
        if (!val) return { message: "" }
        const num = Number(val)
        if (isNaN(num)) return { message: "Рост должен быть числом" }
        if (num < 120) return { message: "Минимальная высота 120" }
        return { message: "Максимальная высота 230" }
      }
    ).optional().nullable(),
  goal: z.string().optional(),
  hobbies: z.array(z.string()).optional(),
  deleted_photos: z.array(z.string()).optional(),
})

export type EditFormSchema = z.infer<typeof editSchema>

function fetchUser(user?: User | null): Partial<EditFormSchema> {
  if (!user) return {}

  return {
    photo_url: Array.isArray(user.photo_url) ? user.photo_url : [],
    first_name: user.first_name ?? "",
    age: user.age ?? null,
    height: user.height?.toString() ?? "",
    city: user.city ?? "",
    gender: user.gender ?? "",
    goal: user.goal ?? "",
    hobbies: Array.isArray(user.hobbies) ? user.hobbies : [],
    deleted_photos: [],
  }
}

export function useFormEmptyValues(): {
  fallbackValues: EditFormSchema
  values: Partial<EditFormSchema> | null
  isLoaded: boolean
} {
  const { user, isFetching } = useUserMe()

  const fallbackUser = {
    photo_url: [],
    first_name: "",
    age: null,
    height: "",
    city: "",
    gender: "",
    goal: "",
    hobbies: [],
  }

  return {
    values: fetchUser(user),
    fallbackValues: fallbackUser,
    isLoaded: !isFetching,
  }
}

type EditFormProps = PropsWithChildren<{
  defaultValues: EditFormSchema
  values: Partial<EditFormSchema> | null
  onSubmit: (data: EditFormSchema) => void
}>

export function EditProfileProvider({
  defaultValues,
  onSubmit,
  values,
  children,
}: EditFormProps) {
  const form = useForm<EditFormSchema>({
    resolver: zodResolver(editSchema),
    mode: "onChange",
    defaultValues,
  })
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    if (!values) return
    if (!initialized) {
      form.reset({ ...defaultValues, ...values })
      setInitialized(true)
    }
  }, [values, defaultValues, initialized, form])

  const { refetch } = useUserMe()

  const handleSubmit = useCallback(
    async (data: EditFormSchema) => {
      const scrollY = window.scrollY
      const result = editSchema.safeParse(data)
      if (!result.success) {
        console.warn("Invalid edit form:", result.error)
        return
      }
      await onSubmit(data)
      form.reset(data)
      await refetch()
      window.scrollTo({ top: scrollY })
    },
    [onSubmit, refetch, form]
  )

  return (
    <EditFormContext.Provider
      value={{ ...form, isDirty: form.formState.isDirty }}
    >
      <form onSubmit={form.handleSubmit(handleSubmit)}>{children}</form>
    </EditFormContext.Provider>
  )
}
