import { SubscriptionStatus, Progress, LikeCount } from "@/features/profile"
import { ProfileHeader } from "@/entities/profile"
import { BasicInformation } from "@/ui/index.ts"

const Profile = () => {
  return (
    <div data-testid="profile" className="px-[4px] pt-[20px] pb-[300px]">
      <ProfileHeader />
      <div className="flex flex-col mini-mobile:flex-row mini-mobile:gap-[5px] gap-3 justify-between pt-[20px]">
        <LikeCount />
        <Progress />
      </div>
      <SubscriptionStatus />
      <BasicInformation />
    </div>
  )
}

export default Profile
