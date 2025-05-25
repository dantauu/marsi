import { useTelegram } from "../../app/providers/telegram"
import { useState } from "react"

import SvgEgit from "../../assets/icons/Egit"
import Button from "../../shared/ui/button"

interface ProfileForm {
  name: string
  age?: string
  avatar?: string
}

const Profile = () => {
  const { user } = useTelegram()
  const [profile, _setProfile] = useState<ProfileForm>({
    name: user?.first_name || "",
    age: user?.language_code,
    avatar: user?.photo_url || "",
  })
  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setProfile((prevProfile) => ({
  //     ...prevProfile,
  //     name: e.target.value,
  //   }))
  // }

  return (
    <div className="flex items-center gap-3 px-[15px] pt-[20px] mx-auto">
      <Button className="w-[120px] h-[40px] font-ManropeM" variant="green">
        Изменить
        <SvgEgit />
      </Button>
      <div className="flex items-center gap-2">
        <div className="">
          <p className="">
            Имя: {profile.name || "Не указано"}, {profile.age || "16"}
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
  )
}

export default Profile
