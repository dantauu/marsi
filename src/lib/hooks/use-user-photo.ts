import { useGetUsersQuery } from "@/redux/api/user.ts"
import { MockCardData } from "@/lib/data/cards.ts"

export const useUserPhoto = () => {
  const { data: user, isLoading } = useGetUsersQuery()

  const fallBackAvatars = new Map(
    MockCardData.map((item) => [item.id, item.avatar])
  )

  const photoMap = new Map<number, string>()

  if (user) {
    for (const u of user) {
      photoMap.set(u.id, u.photo_url ?? fallBackAvatars.get(u.id) ?? "")
    }
  }
  return { photoMap, isLoading }
}