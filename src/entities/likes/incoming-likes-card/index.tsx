import { LikeCard } from "@/shared/ui/like-card"
import {
  useGetLikesToMeQuery,
  useUnlikeIncomingUserMutation,
} from "@/shared/api/likes.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import LoadingBalls from "@/shared/ui/loading"

export const IncomingLikesList = () => {
  const { user: userMe, isLoading: userLoading } = useUserMe()
  const {
    data: users,
    isFetching,
    refetch,
  } = useGetLikesToMeQuery(userMe?.id ?? "", {
    skip: !userMe?.id,
  })
  const [unlikeUser, { isLoading: unlikeLoading }] =
    useUnlikeIncomingUserMutation()
  const handleUnlike = async (likerId: string) => {
    if (!userMe?.id) return
    const scrollY = window.scrollY
    try {
      await unlikeUser({ likerId, likedId: userMe?.id })
      await refetch()
      window.scrollTo({ top: scrollY })
    } catch (error) {
      console.error(error)
    }
  }

  if (userLoading || unlikeLoading || isFetching || !userMe)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingBalls />
      </div>
    )
  return (
    <LikeCard
      isMessage={true}
      users={users}
      likesTitle={"Входящие лайки"}
      onUnlike={handleUnlike}
      isLocked={false}
    />
  )
}
