import { useFindUser } from "@/lib/hooks/use-find-user.ts"

export const MainInfoUser = () => {
  const { user } = useFindUser()
  return (
    <div className="flex flex-col gap-2 py-4 px-4">
      <div className="flex flex-col">
        <p className="font-HelveticaB text-[20px]">Цель знакомства</p>
        <p className="text-[18px]">{user?.goal || "Не указано"}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-HelveticaB text-[20px]">Рост</p>
        <p className="text-[18px]">{user?.height || "Не указано"}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-HelveticaB text-[20px]">Город</p>
        <p className="text-[18px]">{user?.city || "Не указано"}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-HelveticaB text-[20px]">Увлечения</p>
        <p className="text-[18px] shadow-shadow-block w-fit px-1 rounded-[8px]">{user?.hobbies || "Не указано"}</p>
      </div>
    </div>
  )
}