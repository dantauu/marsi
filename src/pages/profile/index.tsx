import {
  SubscriptionStatus,
  CopyProfile,
  LikeCount,
  Progress,
} from "@/features/profile"
import { ProfileHeader } from "@/entities/profile"
import { BasicInformation } from "@/ui/index.ts"

const Profile = () => {
  return (
    <div data-testid="profile" className="px-[8px] pt-[20px] pb-[300px]">
      <ProfileHeader />
      <Progress />
      <div className="flex flex-col mini-mobile:flex-row mini-mobile:gap-[5px] gap-3 justify-between pt-[20px]">
        <LikeCount />
        <CopyProfile />
      </div>
      <SubscriptionStatus />
      <BasicInformation />
    </div>
  )
}

export default Profile
