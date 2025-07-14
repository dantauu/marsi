import { z } from "zod"
import { useForm } from "react-hook-form"
import { type PropsWithChildren, useCallback, useEffect, useRef } from "react"
import { EditFormContext } from "./profile-edit-context.tsx"
import { useTelegram } from "@/app/providers/telegram"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetUsersQuery } from "@/shared/api/user.ts"
import type { User } from "@/app/types/global"

export const editSchema = z.object({
  photo_url: z.array(z.string()),
  first_name: z.string(),
  age: z
    .string()
    .nonempty({ message: "Введите возраст" }) // пустая строка
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
  }
}

export function useFormEmptyValues(): {
  fallbackValues: EditFormSchema
  values: Partial<EditFormSchema> | null
  isLoaded: boolean
} {
  const { user: telegramUser } = useTelegram()
  const { data: users, isFetching } = useGetUsersQuery()
  const user = users?.find((u) => Number(u.id) === telegramUser?.id) ?? null

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
  const hasReset = useRef(false)

  useEffect(() => {
    if (values && !hasReset.current) {
      form.reset({ ...defaultValues, ...values })
      hasReset.current = true
    }
  }, [values, defaultValues, form])

  const handleSubmit = useCallback(
    (data: EditFormSchema) => {
      const result = editSchema.safeParse(data)
      if (!result.success) {
        console.warn("Invalid edit form:", result.error)
        return
      }
      onSubmit(data)
    },
    [onSubmit]
  )

  return (
    <EditFormContext.Provider value={form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>{children}</form>
    </EditFormContext.Provider>
  )
}
