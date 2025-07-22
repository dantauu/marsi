import { LikeCard } from "@/shared/ui/like-card"
import { useGetMyLikesQuery } from "@/shared/api/user.ts"

export const MyLikesCard = () => {
  const { data: users } = useGetMyLikesQuery()
  return <LikeCard users={users} isLocked={false} />
}
