import { Subscribe, Copy, LikeCount, Progress } from "@/features/profile"
import { ProfileHeader, MainInfo } from "@/entities/profile"

const Profile = () => {
  return (
    <div className="px-[8px] pt-[20px] pb-[300px]">
      <ProfileHeader />
      <Progress />
      <div className="flex flex-col mini-mobile:flex-row mini-mobile:gap-[5px] gap-3 justify-between pt-[20px]">
        <LikeCount />
        <Copy />
      </div>
      <Subscribe />
      <MainInfo />
    </div>
  )
}

export default Profile
