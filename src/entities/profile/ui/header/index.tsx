import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import type { User } from "@/app/types/user"
import SvgSettings from "@/assets/icons/Settings.tsx"
import SvgEdit from "@/assets/icons/Edit.tsx"
import mock from "@/assets/images/men-two.png"
import { useAllPercentCount } from "@/lib/utils/get-percent-count"

type ProfileHeaderProps = {
  currentUser: User | null
}

export const ProfileHeader = ({ currentUser }: ProfileHeaderProps) => {
  const navigate = useNavigate()
  const { colors, percent } = useAllPercentCount()

  const linkEditProfile = () => {
    navigate({ to: "/profile-edit" })
  }
  return (
    <div className="flex flex-col gap-2 shadow-easy rounded-[10px] p-1 pb-3 px-2">
    <div className="flex items-center justify-between w-full mx-auto">
      <Button
        onClick={linkEditProfile}
        className="w-[45px] h-[45px] text-[14px] text-[#00000094] font-ManropeM shadow-easy rounded-full"
        variant="default"
      >
        <SvgSettings className="w-[35px] h-[35px]" />
      </Button>
      <div className="flex items-center gap-2">
        <div className="flex items-cente">
          <p className="font-ManropeEB text-[16px] mini-mobile:text-[19px] text-ellipsis overflow-hidden max-w-[115px] whitespace-nowrap">
            {currentUser?.first_name || "Не указано"}
          </p>
          <p className="font-ManropeEB text-[16px] mini-mobile:text-[19px]">
            ,{currentUser?.age || "?"}
          </p>
        </div>
        <div onClick={() => navigate({ to: "/profile-edit" })} className="relative">
          {!currentUser?.photo_url ? (
            <div className="relative w-[87px] h-[87px] mini-mobile:w-[93px] mini-mobile:h-[93px]">
            <img
                className="w-[70px] h-[70px] absolute inset-[10%] mini-mobile:inset-[9%] rounded-full object-cover mini-mobile:w-[76px] mini-mobile:h-[76px]"
                src={mock}
                alt=""
              />
              <svg
                className="absolute top-0 left-0 w-full h-full rotate-[-90deg]"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="#e0e0e0"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke={colors}
                  strokeWidth="4"
                  strokeDasharray={Math.PI * 2 * 46}
                  strokeDashoffset={Math.PI * 2 * 46 * (1 - percent / 100)}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          ) : (
            <div className="relative w-[80px] h-[80px] mini-mobile:w-[86px] mini-mobile:h-[86px]">
              <div className="absolute inset-[8%] bg-[#e0e0e0] rounded-full" />
              <svg
                className="absolute top-0 left-0 w-full h-full rotate-[-90deg]"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="#e0e0e0"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke={colors}
                  strokeWidth="4"
                  strokeDasharray={Math.PI * 2 * 46}
                  strokeDashoffset={Math.PI * 2 * 46 * (1 - percent)}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          )}
          <div className="w-[47px] h-[25px] absolute -bottom-1 right-1 bg-white shadow-easy rounded-[8px]">
            <p style={{ color: colors }} className="text-center font-HelveticaB">{Math.round(percent)}%</p>
          </div>
        </div>
      </div>
    </div>
      <Button onClick={linkEditProfile} className="w-full h-[40px] text-[15px] rounded-full font-ManropeM shadow-easy text-[#00000094]" variant="default">
        Редактирование профиля
        <SvgEdit className="w-[27px] h-[27px]" />
      </Button>
    </div>
  )
}
