import { LikeCard } from "@/shared/ui/like-card"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { useGetUsersStatus, useDeleteLike } from "@/features/likes"
import { useGetLikes } from "@/shared/lib/hooks/use-get-likes.ts"
import { LoadingCircleBase } from "@/shared/ui/loading/circle.tsx"

export const IncomingLikesList = () => {
  const { user: currentUser, isLoading: userLoading } = useCurrentUser()
  const {
    likesToMe,
    fetchingLikesToMe,
    errorLikesToMe,
    loadingLikesToMe,
    successLikesToMe,
  } = useGetLikes()
  const { handleUnlike, isPending } = useDeleteLike({
    currentUser,
    variant: "incoming_like",
  })
  useGetUsersStatus({
    isFetching: fetchingLikesToMe,
    isSuccess: successLikesToMe,
    isError: errorLikesToMe,
  })
  if (userLoading || loadingLikesToMe || !currentUser)
    return <LoadingCircleBase />
  return (
    <LikeCard
      isMessage={true}
      users={likesToMe}
      likesTitle={"Входящие лайки"}
      isUnlikeIncomingLoading={isPending}
      onUnlike={handleUnlike}
      isLocked={false}
    />
  )
}
