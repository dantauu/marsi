import { z } from "zod"
import { useForm } from "react-hook-form"
import { type PropsWithChildren, useCallback } from "react"
import { EditFormContext } from "./profile-edit-context.tsx"
import { useTelegram } from "@/app/providers/telegram"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetUsersQuery } from "@/redux/api/user.ts"

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

export function useFormEmptyValues(): EditFormSchema {
  const { data: users } = useGetUsersQuery()
  const { user: telegramUser } = useTelegram()
  const user = users?.find((u) => u.id === telegramUser?.id)

  return {
    photo_url: Array.isArray(user?.photo_url)
      ? user.photo_url
      : user?.photo_url
        ? [user.photo_url]
        : [],

    first_name: user?.first_name ?? "",
    age: user?.age ?? "16",
    height: user?.height ?? "140",
    city: user?.city ?? "",
    gender: user?.gender ?? "",
    goal: user?.goal ?? "",
    hobbies: user?.hobbies ?? [],
  }
}

type EditFormProps = PropsWithChildren<{
  defaultValues: EditFormSchema
  onSubmit: (data: EditFormSchema) => void
}>

export function EditProfileProvider({
  defaultValues,
  onSubmit,
  children,
}: EditFormProps) {
  const form = useForm<EditFormSchema>({
    resolver: zodResolver(editSchema),
    mode: "onChange",
    defaultValues,
  })

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
