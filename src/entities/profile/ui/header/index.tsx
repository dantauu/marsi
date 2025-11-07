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
  const linkSettings = () => {
    navigate({ to: "/settings" })
  }
  return (
    <div className="flex flex-col gap-2 shadow-easy rounded-[10px] p-1 pb-3 px-2 bg-[var(--color-bg-surface)]">
      <div className="flex items-center justify-between w-full mx-auto">
        <Button
          onClick={linkSettings}
          className="w-[45px] h-[45px] text-[14px] font-ManropeM shadow-easy rounded-full bg-[var(--color-bg-setting)]"
          variant="default"
        >
          <SvgSettings className="w-[35px] h-[35px] text-[var(--color-text-grey)]" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex items-cente">
            <p className="font-ManropeEB text-[16px] mini-mobile:text-[19px] text-ellipsis overflow-hidden max-w-[115px] whitespace-nowrap text-[var(--color-text-black)]">
              {currentUser?.first_name || "Не указано"}
            </p>
            <p className="font-ManropeEB text-[16px] mini-mobile:text-[19px] text-[var(--color-text-black)]">
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
        className="w-full h-[40px] text-[15px] rounded-full font-ManropeM bg-[var(--color-bg-muted-edit)] text-[var(--color-text-grey)]"
        variant="default"
      >
        Редактирование профиля
        <SvgEdit className="w-[27px] h-[27px]" />
      </Button>
    </div>
  )
}
