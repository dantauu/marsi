import { LikeCard } from "@/shared/ui/like-card"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import { useGetUsersStatus, useDeleteLike } from "@/features/likes"
import { useGetLikes } from "@/shared/lib/hooks/use-get-likes.ts"

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
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingBalls />
      </div>
    )
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
