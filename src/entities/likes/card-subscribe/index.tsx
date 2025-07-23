import { LikeCard } from "@/shared/ui/like-card"
import { useGetMyLikesQuery } from "@/shared/api/user.ts"
import { useCurrentUser } from "@/lib/hooks/use-current-user.ts"
import LoadingBalls from "@/shared/ui/loading"

export const MyLikesCard = () => {
  const { user: currentUser, isLoading: userLoading } = useCurrentUser()
  const {
    data: users,
    isFetching,
    refetch,
  } = useGetMyLikesQuery(currentUser?.id ?? "", {
    skip: !currentUser?.id,
  })
  if (userLoading || isFetching || !currentUser) return <LoadingBalls />
  return <LikeCard users={users} onUnliked={refetch} isLocked={false} />
}
