import {
  type EditFormSchema,
  EditProfileProvider,
  useFormEmptyValues,
} from "@/app/providers/profile-edit-form"
import { EditMainInfo } from "@/features/profile-edit"

export const ProfileEditForm = () => {
  const emptyValues = useFormEmptyValues()

  const defaultValues: EditFormSchema = {
    photo_url: emptyValues.photo_url,
    first_name: emptyValues.first_name,
    age: emptyValues.age,
    height: emptyValues.height,
    city: emptyValues.city,
    gender: emptyValues.gender,
    goal: emptyValues.goal,
  }

  const handleSubmit = (data: EditFormSchema) => {
    const changedEntries = Object.entries(data).filter(([key, value]) => {
      const defaultValue = defaultValues[key as keyof EditFormSchema]

      if (Array.isArray(value) && Array.isArray(defaultValue)) {
        return (
          value.length !== defaultValue.length ||
          value.some((v, i) => v !== defaultValue[i])
        )
      }

      return value !== defaultValue
    })

    const changedData = Object.fromEntries(changedEntries)

    console.log("Изменённые поля:", changedData)
  }

  return (
    <>
      <EditProfileProvider
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <EditMainInfo />
      </EditProfileProvider>
    </>
  )
}
