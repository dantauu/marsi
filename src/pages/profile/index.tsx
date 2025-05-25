import { useTelegram } from "../../app/providers/telegram"
import { useState } from "react"

import SvgEgit from "../../assets/icons/Egit"
import Button from "../../shared/ui/button"
import Progress from "../../features/profile/ui/progress/inde"
import LikeCount from "../../features/profile/ui/like-count"
import Copy from "../../features/profile/ui/copy"

interface ProfileForm {
  name: string
  age?: string
  avatar?: string
}

const Profile = () => {
  const { user } = useTelegram()
  const [profile, _setProfile] = useState<ProfileForm>({
    name: user?.first_name || "",
    age: "",
    avatar: user?.photo_url || "",
  })
  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setProfile((prevProfile) => ({
  //     ...prevProfile,
  //     name: e.target.value,
  //   }))
  // }

  return (
    <div className="px-[8px] pt-[20px]">
      <div className="flex items-center justify-between mx-auto">
        <Button className="w-[130px] h-[42px] font-ManropeM" variant="green">
          Изменить
          <SvgEgit />
        </Button>
        <div className="flex items-center gap-2">
          <div className="">
            <p className="font-ManropeEB text-[20px]">
              {profile.name || "Не указано"}, {profile.age || "16"}
            </p>
          </div>
          <div className="">
            {profile.avatar ? (
              <img
                className="w-[78px] h-[78px] rounded-full"
                src={profile.avatar}
                alt=""
              />
            ) : (
              <div className="w-[78px] h-[78px] bg-[#e0e0e0] rounded-full"></div>
            )}
          </div>
        </div>
        {/* <input
        type="text"
        value={profile.name}
        onChange={handleNameChange}
        placeholder="Введите имя"
        className="border p-2"
      /> */}
      </div>
      <Progress />
      <div className="flex justify-between pt-[20px]">
        <LikeCount />
        <Copy />
      </div>
    </div>
  )
}

export default Profile
