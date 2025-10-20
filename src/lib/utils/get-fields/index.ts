import { useUserData } from "@/shared/lib/hooks/use-user-data.ts"
import type { User } from "@/app/types/user"

export const GetFields = () => {
  const { user } = useUserData()
  const requiredData: { key: keyof User; label: string }[] = [
    { key: "age", label: "Возраст" },
    { key: "photo_url", label: "Фото" },
    { key: "height", label: "Рост" },
    { key: "city", label: "Местоположение" },
    { key: "gender", label: "Пол" },
  ]
  const emptyFields = requiredData
    .filter(({ key }) => !user?.[key])
    .map(({ label }) => label)

  const isEmpty = emptyFields.length > 0
  return { emptyFields, isEmpty }
}
