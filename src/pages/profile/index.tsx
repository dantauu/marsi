import Progress from "@/features/profile/ui/progress/inde"
import LikeCount from "@/features/profile/ui/like-count"
import Copy from "@/features/profile/ui/copy"
import Subscribe from "@/features/profile/ui/subscribe"
import MainInfo from "@/intities/profile/main-info"
import ProfileHeader from "@/intities/profile/header"

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
