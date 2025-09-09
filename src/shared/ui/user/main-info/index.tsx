import type { User } from "@/app/types/user"

export const MainInfoUser = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-scroll bg-white rounded-[29px] shadow-shadow-block">
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
        <div className="flex">
          {user?.hobbies?.length ? (
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {user.hobbies?.map((item, index) => (
                <p
                  key={index}
                  className="shadow-shadow-block p-1 rounded-[5px]"
                >
                  {item}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-[18px]">Не указано</p>
          )}
        </div>
      </div>
    </div>
  )
}
