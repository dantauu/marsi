import Block from "@/shared/ui/blocks/block.tsx"
import { getGenderFormat } from "@/lib/utils/format-gender.ts"
import { usePercentCount } from "@/lib/utils/get-percent-count"
import { useCurrentUser } from "@/lib/hooks/use-current-user.ts"

export const BasicInformation = () => {
  const { user } = useCurrentUser()
  const { colors, percent } = usePercentCount()
  return (
    <div className="mt-[20px] shadow-shadow-block px-[8px] py-[8px] rounded-[10px]">
      <Block
        className="flex items-center justify-center max-w-[300px] mx-auto"
        text={
          <>
            Ключевая информация:
            <span style={{ color: colors }} className="font-HelveticaB">
              {" "}
              {percent}%
            </span>
          </>
        }
      />
      <div className="flex flex-col gap-3 mt-[20px]">
        <Block text={`Имя: ${user?.first_name || "Не указано"}`} />
        <Block text={`Возраст: ${user?.age || "Не указано"}`} />
        <Block text={`Пол: ${getGenderFormat(user?.gender) || "Не указано"}`} />
        <Block text={`Город: ${user?.city || "Не указано"}`} />
        <Block text={`Цель: ${user?.goal || "Не указано"}`} />
      </div>
    </div>
  )
}
