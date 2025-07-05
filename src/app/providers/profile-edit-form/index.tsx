import { z } from "zod"
import { useForm } from "react-hook-form"
import { type PropsWithChildren, useCallback } from "react"
import { EditFormContext } from "./profile-edit-context.tsx"
import { useTelegram } from "@/app/providers/telegram"
import { zodResolver } from "@hookform/resolvers/zod"

export const editSchema = z.object({
  photo_url: z.array(z.string()),
  first_name: z.string(),
  age: z.number().min(16, { message: "Минимальный возраст - 16" }).max(100),
  gender: z.string(),
  city: z.string(),
  height: z.number(),
  goal: z.string(),
})

export type EditFormSchema = z.infer<typeof editSchema>

export function useFormEmptyValues(): EditFormSchema {
  const { user } = useTelegram()
  return {
    photo_url:
      typeof user?.photo_url === "string"
        ? [user?.photo_url]
        : Array.isArray(user?.photo_url)
          ? user?.photo_url
          : [],
    first_name: user?.first_name || "",
    age: 100,
    height: 140,
    city: "",
    gender: "",
    goal: "",
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
