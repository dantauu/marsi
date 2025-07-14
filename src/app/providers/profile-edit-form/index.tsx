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

export function useFormEmptyValues(): {values: EditFormSchema, isLoading: boolean} {
  const { user: telegramUser } = useTelegram()
  const { data: users } = useGetUsersQuery()
  const user = users?.find((u) => Number(u.id) === telegramUser?.id)

  const fallbackUser = {
    photo_url: [],
    first_name: telegramUser?.first_name ?? "",
    age: "16",
    height: "140",
    city: "",
    gender: "",
    goal: "",
    hobbies: [],
  }

  const filledUser = user ?? fallbackUser

  return {
    values: {
    photo_url: Array.isArray(filledUser?.photo_url)
      ? filledUser?.photo_url
      : filledUser?.photo_url
        ? [filledUser?.photo_url]
        : [],
    first_name: filledUser?.first_name ?? "",
    age: filledUser?.age ?? "16",
    height: filledUser?.height ?? "140",
    city: filledUser?.city ?? "",
    gender: filledUser?.gender ?? "",
    goal: filledUser?.goal ?? "",
    hobbies: filledUser?.hobbies ?? [],
    },
    isLoading: false
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
