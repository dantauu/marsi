import { EditAbout, EditMainInfo, PictureEdit } from "@/features/profile-edit"
import {
  type EditFormSchema,
  EditProfileProvider, useFormEmptyValues,
} from "@/app/providers/profile-edit-form"
import { SaveNavBar } from "@/widgets/nav-bar/save"
import { useAppSelector } from "@/redux/hooks.ts"
import { Overlay } from "@/widgets/overlay"
import { useUpdateUserMutation } from "@/redux/api/user.ts"
import { useTelegram } from "@/app/providers/telegram"
import LoadingBalls from "@/shared/ui/loading"

const EditProfile = () => {
  const { isEditOpen } = useAppSelector((state) => state.modal)
  const { user: telegramUser } = useTelegram()
  const [updateUser] = useUpdateUserMutation()

  const { values: defaultValues, isLoading } = useFormEmptyValues()

  const handleSubmit = async (data: EditFormSchema) => {
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
    if (telegramUser) {
      await updateUser({ id: String(telegramUser.id), ...changedData })
    }

    console.log("Изменённые поля:", changedData)
  }
  if (isLoading) return <LoadingBalls />
  return (
    <EditProfileProvider defaultValues={defaultValues} onSubmit={handleSubmit}>
      {isEditOpen && <Overlay />}
      <div data-testid="profile-edit" className="pb-[150px] pt-[120px]">
        <SaveNavBar className="pt-[80px]" />
        <PictureEdit />
        <EditMainInfo />
        <EditAbout className="mt-7" />
      </div>
    </EditProfileProvider>
  )
}

export default EditProfile
