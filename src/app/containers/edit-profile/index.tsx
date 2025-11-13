import {
  EditProfileProvider,
  useFormEmptyValues,
} from "@/app/providers/profile-edit-form"
import { type EditFormSchema } from "@/lib/schemes/profile-edit"
import {
  useDeletePhotoMutation,
  useUpdateUserMutation,
} from "@/shared/api/user.ts"
import { useTelegram } from "@/app/providers/telegram"
import { getNormalizeGender } from "@/lib/utils/format-gender.ts"
import { EditProfileContent } from "@/pages/profile-edit"
import { useNotify } from "@/shared/lib/hooks/use-notify.tsx"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { getPhotoVariant } from "@/lib/utils/photo-variant"

const EditProfileContainer = () => {
  const { user: telegramUser } = useTelegram()
  const [updateUser] = useUpdateUserMutation()
  const [deletePhoto] = useDeletePhotoMutation()
  const { notify } = useNotify()
  const { userToken } = useCurrentUser()
  const userId = userToken?.userId

  const {
    values,
    fallbackValues: defaultValues,
    isLoading,
  } = useFormEmptyValues()

  const extractKeyFromUrl = (url: string) => {
    const bucket = import.meta.env.VITE_MINIO_BUCKET_NAME;
    const idx = url.indexOf(`${bucket}/`);
    return idx !== -1 ? url.slice(idx + bucket.length + 1) : url;
  };

  const handleSubmit = async (data: EditFormSchema) => {
    if (!defaultValues && !userId) return
    const validatePhoto = (data.photo_url || []).filter(
      (url) => getPhotoVariant(url)?.trim() !== ""
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
      await deletePhoto(extractKeyFromUrl(fileName)).unwrap()
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
  if (isLoading || !defaultValues) return <LoadingBalls />
  return (
    <EditProfileProvider
      values={values}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      <EditProfileContent />
    </EditProfileProvider>
  )
}

export default EditProfileContainer
