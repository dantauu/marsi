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
import Button from "@/shared/ui/buttons/button"
import { useNavigate } from "@tanstack/react-router"
import SvgArrow from "@/assets/icons/Arrow.tsx"

const EditProfile = () => {
  const navigate = useNavigate()
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
        <Button
          className="w-[115px] h-[40px] rounded-[7px] mx-2 mb-7 shadow-shadow-block text-[19px] text-[#000] font-ManropeM"
          onClick={() => navigate({ to: "/profile" })}
          variant="default"
        >
          <SvgArrow className="w-[20px] h-[20px] rotate-180 text-[#0007]" />{" "}
          Назад
        </Button>
        <PhotoEdit />
        <EditMainInfo className="mt-10" />
      </div>
    </EditProfileProvider>
  )
}

export default EditProfile
