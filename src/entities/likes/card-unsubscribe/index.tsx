import { LikeCard } from "@/shared/ui/like-card"
import { useGetLikesToMeQuery } from "@/shared/api/user.ts"

export const LikesToMeCard = () => {
  const { data: users } = useGetLikesToMeQuery()
  return <LikeCard users={users} isLocked={false} />
}