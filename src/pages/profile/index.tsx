import { SeeAboutApp, LikeCount, LikeIncoming } from "@/features/profile"
import { ProfileHeader } from "@/entities/profile"
import { BasicInformation } from "@/ui/index.ts"
import { useGetLikesToMeQuery, useGetMyLikesQuery } from "@/shared/api/likes.ts"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"

const Profile = () => {
  const {
    user: currentUser,
    isFetching: userFetching,
    isLoading: userLoading,
    userToken,
  } = useCurrentUser()
  const userId = userToken?.userId
  const { data: likesToMe, isFetching: likesToMeFetching } =
    useGetLikesToMeQuery(userId ?? "", {
      skip: !userId,
    })
  const { data: myLikes, isFetching: myLikesFetching } = useGetMyLikesQuery(
    userId ?? "",
    {
      skip: !userId,
    }
  )
  const isPending =
    userLoading ||
    userFetching ||
    myLikesFetching ||
    !currentUser ||
    likesToMeFetching
  return (
    <div
      data-testid="profile"
      className="flex flex-col gap-4 px-[4px] pt-[20px] pb-[170px]"
    >
      <ProfileHeader currentUser={currentUser} />
      <LikeIncoming likesToMe={likesToMe} isPending={isPending} />
      <div className="flex mini-mobile:gap-[5px] gap-3.5 justify-between pt-[7px]">
        <LikeCount myLikes={myLikes} isPending={isPending} />
        <SeeAboutApp />
      </div>
      {/*<SubscriptionStatus />*/}
      <BasicInformation />
    </div>
  )
}

export default Profile
