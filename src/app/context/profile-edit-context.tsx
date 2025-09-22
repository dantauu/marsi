import { createContext, useContext } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { EditFormSchema } from "@/lib/schema/profile-edit"

export const EditFormContext = createContext<
  (UseFormReturn<EditFormSchema> & { isDirty?: boolean }) | null
>(null)

export const useEditProfileForm = () => {
  const context = useContext(EditFormContext)
  if (!context)
    throw new Error("useEditForm must be used within a EditFormProvider")
  return context
}
