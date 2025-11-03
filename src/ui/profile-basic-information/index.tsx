import Block from "@/shared/ui/blocks/block.tsx"
import { getGenderFormat } from "@/lib/utils/format-gender.ts"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { useNavigate } from "@tanstack/react-router"

export const BasicInformation = () => {
  const { user } = useCurrentUser()
  const navigate = useNavigate()
  const fields = [
    { label: "Имя", value: user?.first_name },
    { label: "Возраст", value: user?.age },
    { label: "Пол", value: getGenderFormat(user?.gender) },
    { label: "Город", value: user?.city },
    { label: "Цель", value: user?.goal },
  ]
  return (
    <div
      onClick={() => navigate({ to: "/profile-edit" })}
      className="mt-[10px] px-[8px] py-[8px] rounded-[10px] bg-[var(--color-basic-info)]"
    >
      <Block
        className="flex items-center justify-center max-w-[300px] mx-auto"
        text={<>Моя ключевая информация</>}
      />
      <div className="flex flex-col gap-3 mt-[20px]">
        {fields.map(({ label, value }) => (
          <Block key={label} text={`${label}: ${value || "Не указано"}`} />
        ))}
      </div>
    </div>
  )
}
