import Progress from "@/features/profile/ui/progress"
import LikeCount from "@/features/profile/ui/like-count"
import Copy from "@/features/profile/ui/copy"
import Subscribe from "@/features/profile/ui/subscribe"
import MainInfo from "@/entities/profile/ui/main-info"
import ProfileHeader from "@/entities/profile/ui/header"

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
