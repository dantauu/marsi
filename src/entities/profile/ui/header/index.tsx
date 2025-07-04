import { useTelegram } from "@/app/providers/telegram"
import SvgEdit from "@/assets/icons/Edit.tsx"
import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

interface ProfileForm {
  name: string
  age?: string
  avatar?: string
}

export const ProfileHeader = () => {
  const navigate = useNavigate()
  const { user } = useTelegram()
  const [profile, _setProfile] = useState<ProfileForm>({
    name: user?.first_name || "",
    age: "",
    avatar: user?.photo_url || "",
  })

  const linkEditProfile = () => {
    navigate({ to: "/profile-edit" })
  }
  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setProfile((prevProfile) => ({
  //     ...prevProfile,
  //     name: e.target.value,
  //   }))
  // }
  return (
    <div className="flex items-center justify-between mx-auto">
      <Button
        onClick={linkEditProfile}
        className="w-[116px] h-[39px] mini-mobile:w-[130px] mini-mobile:h-[42px] font-ManropeM"
        variant="green"
      >
        Изменить
        <SvgEdit />
      </Button>
      <div className="flex items-center gap-2">
        <div className="">
          <p className="font-ManropeEB text-[16px] mini-mobile:text-[19px]">
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
  )
}
