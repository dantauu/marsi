import { useForm } from "react-hook-form"
import { type PropsWithChildren, useCallback, useEffect, useState } from "react"
import { EditFormContext } from "@/app/context/profile-edit-context.tsx"
import { zodResolver } from "@hookform/resolvers/zod"
import type { User } from "@/app/types/user"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { type EditFormSchema, editSchema } from "@/lib/schemes/profile-edit"

function fetchUser(user?: User | null): Partial<EditFormSchema> {
  if (!user) return {}

  return {
    photo_url: user.photo_url ?? { items: [] },
    first_name: user.first_name ?? "",
    age: user.age ?? null,
    height: user.height?.toString() ?? "",
    city: user.city ?? "",
    about_me: user.about_me ?? null,
    gender: user.gender ?? "",
    goal: user.goal ?? "",
    hobbies: Array.isArray(user.hobbies) ? user.hobbies : [],
    deleted_photos: [],
  }
}

export function useFormEmptyValues(): {
  fallbackValues: EditFormSchema
  values: Partial<EditFormSchema> | null
  isFetching: boolean
  isLoading: boolean
} {
  const { user, isFetching, isLoading } = useCurrentUser()

  const fallbackUser = {
    photo_url: { items: [] },
    first_name: "",
    age: null,
    height: "",
    city: "",
    about_me: null,
    gender: "",
    goal: "",
    hobbies: [],
  }

  return {
    values: fetchUser(user),
    fallbackValues: fallbackUser,
    isFetching: isFetching,
    isLoading: isLoading,
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

  const { refetch } = useCurrentUser()

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
