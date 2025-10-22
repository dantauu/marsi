import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import type { User } from "@/app/types/user"
import SvgSettings from "@/assets/icons/Settings.tsx"
import SvgEdit from "@/assets/icons/Edit.tsx"
import { useAllPercentCount } from "@/lib/utils/get-percent-count"
import { DoesntHavePhoto, HavePhoto } from "@/ui/header"

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
          <div
            onClick={() => navigate({ to: "/profile-edit" })}
            className="relative"
          >
            {currentUser?.photo_url ? (
              <HavePhoto
                currentUser={currentUser}
                colors={colors}
                percent={percent}
              />
            ) : (
              <DoesntHavePhoto colors={colors} percent={percent} />
            )}
            <div className="w-[47px] h-[25px] absolute -bottom-1 right-1 bg-white shadow-easy rounded-[8px]">
              <p
                style={{ color: colors }}
                className="text-center font-HelveticaB"
              >
                {Math.round(percent)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={linkEditProfile}
        className="w-full h-[40px] text-[15px] rounded-full font-ManropeM bg-[#00000012] text-[#00000094]"
        variant="default"
      >
        Редактирование профиля
        <SvgEdit className="w-[27px] h-[27px]" />
      </Button>
    </div>
  )
}
