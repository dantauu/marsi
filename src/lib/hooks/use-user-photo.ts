//TO DO: delete this hook before clean mock data

import { useGetUsersQuery } from "@/shared/api/user.ts"
import { MockCardData } from "@/lib/data/cards.ts"
import type { FilteredUsers } from "@/app/types/global"

export const useUserPhoto = ({
  params = {},
}: { params?: Partial<FilteredUsers> } = {}) => {
  const { data: user } = useGetUsersQuery(params)
  const userPhoto = new Map(user?.map((item) => [item.id, item.photo_url]))

  const mockAvatar = new Map<number, string>(
    MockCardData.map((item) => [item.id, item.avatar])
  )

  return { userPhoto, mockAvatar }
}
