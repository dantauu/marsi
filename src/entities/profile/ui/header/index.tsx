import { useTelegram } from "@/app/providers/telegram"
import SvgEdit from "@/assets/icons/Edit.tsx"
import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import { useGetUsersQuery } from "@/shared/api/user.ts"

export const ProfileHeader = () => {
  const navigate = useNavigate()
  const { data: users } = useGetUsersQuery()
  const { user: telegramUser } = useTelegram()
  const user = users?.find((user) => Number(user?.id) === telegramUser?.id)

  const linkEditProfile = () => {
    navigate({ to: "/profile-edit" })
  }
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
            {user?.first_name || "Не указано"}, {user?.age || "16"}
          </p>
        </div>
        <div className="">
          {user?.photo_url ? (
            <img
              className="w-[78px] h-[78px] rounded-full"
              src={
                Array.isArray(user.photo_url)
                  ? (user.photo_url[0] ?? "")
                  : (user.photo_url ?? "")
              }
              alt=""
            />
          ) : (
            <div className="w-[78px] h-[78px] bg-[#e0e0e0] rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  )
}
