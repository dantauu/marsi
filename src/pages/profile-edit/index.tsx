import { EditMainInfo, PhotoEdit } from "@/features/profile-edit"
import {
  type EditFormSchema,
  EditProfileProvider,
  useFormEmptyValues,
} from "@/app/providers/profile-edit-form"
import { SaveNavBar } from "@/widgets/nav-bar/save-edit-profile"
import { useAppSelector } from "@/redux/hooks.ts"
import { Overlay } from "@/widgets/overlay"
import { useUpdateUserMutation } from "@/shared/api/user.ts"
import { useTelegram } from "@/app/providers/telegram"
import LoadingBalls from "@/shared/ui/loading"
import { useNotify } from "@/lib/hooks/use-notify.ts"

const EditProfile = () => {
  const { isEditOpen } = useAppSelector((state) => state.modal)
  const { user: telegramUser } = useTelegram()
  const [updateUser] = useUpdateUserMutation()
  const { notify } = useNotify()

  const {
    values,
    fallbackValues: defaultValues,
    isLoaded,
  } = useFormEmptyValues()

  const handleSubmit = async (data: EditFormSchema) => {
    if (!defaultValues) return
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

    await notify(
      updateUser({ id: String(telegramUser?.id), ...changedData }).unwrap(),
      {
        success: "Изменения сохранены",
        error: "Ошибка",
        loading: "Сохранение...",
      }
    )

    console.log("Изменённые поля:", changedData)
  }
  if (!isLoaded || !defaultValues) return <LoadingBalls />
  return (
    <EditProfileProvider
      values={values}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      {isEditOpen && <Overlay />}
      <div data-testid="profile-edit" className="pb-[150px] pt-[120px]">
        <SaveNavBar className="pt-[80px]" />
        <PhotoEdit />
        <EditMainInfo className="mt-10" />
      </div>
    </EditProfileProvider>
  )
}

export default EditProfile
