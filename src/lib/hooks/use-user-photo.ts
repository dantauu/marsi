import { useGetUsersQuery } from "@/redux/api/user.ts"
import { MockCardData } from "@/lib/data/cards.ts"
import type { FilteredUsers, UserCardSearch } from "@/app/types/global"

export const useUserPhoto = ({ params }: { params?: FilteredUsers } = {}) => {
  const { data: user } = useGetUsersQuery(params)
  const userPhoto = new Map(user?.map((item) => [item.id, item.photo_url]))

  const mockAvatar = new Map<number, string>(
    MockCardData.map((item) => [item.id, item.avatar])
  )

  const photoMap = (item: UserCardSearch) => {
    return  userPhoto.get(item.id) ?? mockAvatar.get(item.id) ?? ""
  }
  return {userPhoto, mockAvatar, photoMap}
}