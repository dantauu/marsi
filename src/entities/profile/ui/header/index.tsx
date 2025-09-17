import SvgEdit from "@/assets/icons/Edit.tsx"
import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import type { User } from "@/app/types/user"

type ProfileHeaderProps = {
  currentUser: User | null
}

export const ProfileHeader = ({ currentUser }: ProfileHeaderProps) => {
  const navigate = useNavigate()

  const linkEditProfile = () => {
    navigate({ to: "/profile-edit" })
  }
  return (
    <div className="flex items-center justify-between mx-auto shadow-shadow-block rounded-[10px] p-1">
      <Button
        onClick={linkEditProfile}
        className="w-[116px] h-[39px] text-[14px] mini-mobile:text-[16px] mini-mobile:w-[130px] mini-mobile:h-[42px] font-ManropeM"
        variant="green"
      >
        Изменить
        <SvgEdit />
      </Button>
      <div className="flex items-center gap-2">
        <div className="">
          <p className="font-ManropeEB text-[16px] mini-mobile:text-[19px]">
            {currentUser?.first_name || "Не указано"}, {currentUser?.age || "?"}
          </p>
        </div>
        <div onClick={() => navigate({ to: "/profile-edit" })} className="">
          {currentUser?.photo_url ? (
            <img
              className="w-[72px] h-[72px] rounded-full object-cover mini-mobile:w-[78px] mini-mobile:h-[78px]"
              src={
                Array.isArray(currentUser.photo_url)
                  ? (currentUser.photo_url[0] ?? "")
                  : (currentUser.photo_url ?? "")
              }
              alt=""
            />
          ) : (
            <div className="w-[72px] h-[72px] bg-[#e0e0e0] rounded-full mini-mobile:w-[78px] mini-mobile:h-[78px]"></div>
          )}
        </div>
      </div>
    </div>
  )
}
