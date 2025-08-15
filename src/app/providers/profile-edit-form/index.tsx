import { z } from "zod"
import { useForm } from "react-hook-form"
import { type PropsWithChildren, useCallback, useEffect } from "react"
import { EditFormContext } from "@/app/context/profile-edit-context.tsx"
import { zodResolver } from "@hookform/resolvers/zod"
import type { User } from "@/app/types/global"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"

export const editSchema = z.object({
  photo_url: z.array(z.string()),
  first_name: z.string(),
  age: z
    .string()
    .nonempty({ message: "Введите возраст" })
    .refine(
      (val) => {
        const num = Number(val)
        return !isNaN(num) && num >= 16 && num <= 100
      },
      {
        message: "Возраст должен быть от 16 до 100",
      }
    ),
  gender: z.string(),
  city: z.string(),
  height: z.string(),
  goal: z.string(),
  hobbies: z.array(z.string()),
  deleted_photos: z.array(z.string()).optional(),
})

export type EditFormSchema = z.infer<typeof editSchema>

function fetchUser(user?: User | null): Partial<EditFormSchema> {
  if (!user) return {}

  return {
    photo_url: Array.isArray(user.photo_url) ? user.photo_url : [],
    first_name: user.first_name ?? "",
    age: user.age?.toString() ?? "16",
    height: user.height?.toString() ?? "140",
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
    age: "16",
    height: "140",
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
  useEffect(() => {
    if (values) {
      form.reset({ ...defaultValues, ...values })
    }
  }, [values, defaultValues, form])
  const { refetch } = useUserMe()

  const handleSubmit = useCallback(
    async (data: EditFormSchema) => {
      const result = editSchema.safeParse(data)
      if (!result.success) {
        console.warn("Invalid edit form:", result.error)
        return
      }
     await onSubmit(data)
      await refetch()
    },
    [onSubmit, refetch]
  )

  return (
    <EditFormContext.Provider
      value={{ ...form, isDirty: form.formState.isDirty }}
    >
      <form onSubmit={form.handleSubmit(handleSubmit)}>{children}</form>
    </EditFormContext.Provider>
  )
}
