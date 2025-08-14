import { EditMainInfo, PhotoEdit } from "@/features/profile-edit"
import {
  type EditFormSchema,
  EditProfileProvider,
  useFormEmptyValues,
} from "@/app/providers/profile-edit-form"
import { SaveNavBar } from "@/widgets/nav-bar/save-edit-profile"
import { useAppSelector } from "@/redux/hooks.ts"
import { Overlay } from "@/widgets/overlay"
import {
  useDeletePhotoMutation,
  useUpdateUserMutation,
} from "@/shared/api/user.ts"
import { useTelegram } from "@/app/providers/telegram"
import LoadingBalls from "@/shared/ui/loading"
import { useNotify } from "@/lib/hooks/use-notify.ts"
import { getNormalizeGender } from "@/lib/utils/format-gender.ts"
// import { ButtonBack } from "@/shared/ui/buttons/button-back"
import { useMemo } from "react"
import { useUnsavedChanges } from "@/lib/hooks/use-unsaved-changes.ts"
import Button from "@/shared/ui/buttons/button.tsx"

const EditProfile = () => {
  const { isEditOpen } = useAppSelector((state) => state.modal)
  const { user: telegramUser } = useTelegram()
  const [updateUser] = useUpdateUserMutation()
  const [deletePhoto] = useDeletePhotoMutation()
  const { notify } = useNotify()

  const {
    values,
    fallbackValues: defaultValues,
    isLoaded,
  } = useFormEmptyValues()

  const isDirty = useMemo(() => {
    if (!values) return false
    return JSON.stringify(values) !== JSON.stringify(defaultValues)
  }, [values, defaultValues])
  const { showModal, setShowModal, confirmLeave, navigate } = useUnsavedChanges(isDirty)

  const handleSubmit = async (data: EditFormSchema) => {
    if (!defaultValues) return
    const validatePhoto = (data.photo_url || []).filter(
      (url) => url.trim() !== ""
    )
    const finalData = {
      ...data,
      photo_url: validatePhoto.length > 0 ? validatePhoto : undefined,
    }

    const changedEntries = Object.entries(finalData).filter(([key, value]) => {
      const defaultValue = defaultValues[key as keyof EditFormSchema]

      if (Array.isArray(value) && Array.isArray(defaultValue)) {
        return (
          value.length !== defaultValue.length ||
          value.some((v, i) => v !== defaultValue[i])
        )
      }

      return value !== defaultValue
    })

    const { deleted_photos = [] } = data

    const changedData = Object.fromEntries(
      changedEntries.filter(([key]) => key !== "deleted_photos")
    )
    for (const fileName of deleted_photos) {
      await deletePhoto(fileName).unwrap()
    }

    const gender = changedData.gender

    const normalizeData = {
      ...changedData,
      gender:
        typeof gender === "string" ? getNormalizeGender(gender) : undefined,
    }

    await notify(
      updateUser({ id: String(telegramUser?.id), ...normalizeData }).unwrap(),
      {
        success: "Изменения сохранены",
        error: "Ошибка",
        loading: "Сохранение...",
      }
    )

    console.log("Изменённые поля:", changedEntries)
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
        {/*<ButtonBack path={"/profile"} />*/}
        <Button type={"button"} variant={"default"} onClick={() => navigate("/profile")}>Назад</Button>
        <PhotoEdit />
        <EditMainInfo className="mt-10" />
      </div>
      <>
        {showModal && (
          <div className="fixed bg-white top-0 flex justify-center items-center h-full">
            <p>Внимание! Вы не сохранили изменения.</p>
            <Button type={"button"} variant={"default"} onClick={confirmLeave}>Уйти</Button>
            <Button type={"button"} variant={"default"} onClick={() => setShowModal(false)}>Остаться</Button>
          </div>
        )}
      </>
    </EditProfileProvider>
  )
}

export default EditProfile
