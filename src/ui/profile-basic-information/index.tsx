import Block from "@/shared/ui/blocks/block.tsx"
import { getGenderFormat } from "@/lib/utils/format-gender.ts"
import { usePercentCount } from "@/lib/utils/get-percent-count"
import { useUserData } from "@/shared/lib/hooks/use-user-data.ts"
import { useNavigate } from "@tanstack/react-router"

export const BasicInformation = () => {
  const { user } = useUserData()
  const { colors, percent } = usePercentCount()
  const navigate = useNavigate()
  return (
    <div className="mt-[10px] px-[8px] py-[8px] rounded-[10px] bg-test">
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
        <Block
          onClick={() => navigate({ to: "/profile-edit" })}
          text={`Имя: ${user?.first_name || "Не указано"}`}
        />
        <Block
          onClick={() => navigate({ to: "/profile-edit" })}
          text={`Возраст: ${user?.age || "Не указано"}`}
        />
        <Block
          onClick={() => navigate({ to: "/profile-edit" })}
          text={`Пол: ${getGenderFormat(user?.gender) || "Не указано"}`}
        />
        <Block
          onClick={() => navigate({ to: "/profile-edit" })}
          text={`Город: ${user?.city || "Не указано"}`}
        />
        <Block
          onClick={() => navigate({ to: "/profile-edit" })}
          text={`Цель: ${user?.goal || "Не указано"}`}
        />
      </div>
    </div>
  )
}
