import type { User } from "@/app/types/user"
import Button from "@/shared/ui/buttons/button.tsx"
import SvgCross from "@/assets/icons/Cross.tsx"

type MainInfoUserProps = {
  user: User
  setIsMore: (value: boolean) => void
}

export const MainInfoUser = ({ user, setIsMore }: MainInfoUserProps) => {
  return (
    <div className="">
      <div className="relative">
        <img className="w-full h-full object-cover rounded-t-[10px]" src={Array.isArray(user?.photo_url) ? user?.photo_url[0] : user?.photo_url} />
        <Button onClick={() => setIsMore(false)} className="absolute rounded-full z-10 top-4 right-4 p-1 bg-white text-[#0008]" variant={"default"}><SvgCross className="w-[40px] h-[40px]" /></Button>
      </div>
    <div className="w-full -mt-6.5 flex h-full flex-col p-4 bg-white rounded-[29px] shadow-shadow-block">
      <div className="flex items-center gap-2">
        <p className="text-[24px]">{user?.first_name || "Не указано"},</p>
        <p className="text-[20px]">{user?.age || "Не указано"}</p>
      </div>
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
    </div>
  )
}