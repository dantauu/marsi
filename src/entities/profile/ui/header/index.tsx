import SvgEdit from "@/assets/icons/Edit.tsx"
import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"

export const ProfileHeader = () => {
  const navigate = useNavigate()
  const { user } = useUserMe()

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
            {user?.first_name || "Не указано"}, {user?.age || "16"}
          </p>
        </div>
        <div onClick={() => navigate({ to: "/profile-edit" })} className="">
          {user?.photo_url ? (
            <img
              className="w-[72px] h-[72px] rounded-full object-cover mini-mobile:w-[78px] mini-mobile:h-[78px]"
              src={
                Array.isArray(user.photo_url)
                  ? (user.photo_url[0] ?? "")
                  : (user.photo_url ?? "")
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
