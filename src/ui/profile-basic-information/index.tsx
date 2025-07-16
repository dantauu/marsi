import Block from "@/shared/ui/blocks/block.tsx"
import { useGetUsersQuery } from "@/shared/api/user.ts"
import { useTelegram } from "@/app/providers/telegram"

export const BasicInformation = () => {
  const count = 100
  const { data: users } = useGetUsersQuery()
  const { user: telegramUser } = useTelegram()
  const user = users?.find((user) => Number(user?.id) === telegramUser?.id)
  return (
    <div className="mt-[20px] shadow-shadow-block px-[8px] py-[8px] rounded-[10px]">
      <Block
        className="flex items-center justify-center max-w-[300px] mx-auto"
        text={
          <>
            Ключевая информация:
            <span className="text-main-green font-HelveticaB"> {count}%</span>
          </>
        }
      />
      <div className="flex flex-col gap-3 mt-[20px]">
        <Block text={`Имя: ${user?.first_name || "Не указано"}`} />
        <Block text={`Возраст: ${user?.age || "Не указано"}`} />
        <Block text={`Пол: ${user?.gender || "Не указано"}`} />
        <Block text={`Город: ${user?.city || "Не указано"}`} />
        <Block text={`Цель: ${user?.goal || "Не указано"}`} />
      </div>
    </div>
  )
}
