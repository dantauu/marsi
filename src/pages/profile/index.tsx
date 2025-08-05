import { SubscriptionStatus, Progress, LikeCount } from "@/features/profile"
import { ProfileHeader } from "@/entities/profile"
import { BasicInformation } from "@/ui/index.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import { useGetLikesToMeQuery, useGetMyLikesQuery } from "@/shared/api/user.ts"

const Profile = () => {
  const {
    user: currentUser,
    isFetching: userFetching,
    isLoading: userLoading,
  } = useUserMe()
  const { data: likesToMe, isFetching: likesToMeFetching } =
    useGetLikesToMeQuery(currentUser?.id ?? "", {
      skip: !currentUser?.id,
    })
  const { data: myLikes, isFetching: myLikesFetching } = useGetMyLikesQuery(
    currentUser?.id ?? "",
    {
      skip: !currentUser?.id,
    }
  )
  const isPending =
    userLoading ||
    userFetching ||
    myLikesFetching ||
    !currentUser ||
    likesToMeFetching
  return (
    <div data-testid="profile" className="px-[4px] pt-[20px] pb-[300px]">
      <ProfileHeader />
      <div className="flex flex-col mini-mobile:flex-row mini-mobile:gap-[5px] gap-3 justify-between pt-[20px]">
        <LikeCount
          myLikes={myLikes}
          likesToMe={likesToMe}
          isPending={isPending}
        />
        <Progress />
      </div>
      <SubscriptionStatus />
      <BasicInformation />
    </div>
  )
}

export default Profile
