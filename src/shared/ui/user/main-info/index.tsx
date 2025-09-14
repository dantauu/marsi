import type { User } from "@/app/types/user"
import Button from "@/shared/ui/buttons/button.tsx"
import SvgCross from "@/assets/icons/Cross.tsx"
import SvgPoint from "@/assets/icons/Point.tsx"
import SvgRuler from "@/assets/icons/Ruler.tsx"
import SvgTarget from "@/assets/icons/Target.tsx"

type MainInfoUserProps = {
  user: User
  setIsMore: (value: boolean) => void
}

export const MainInfoUser = ({ user, setIsMore }: MainInfoUserProps) => {
  return (
    <div className="">
      <div className="relative">
        <img
          className="w-full h-full max-h-[450px] min-h-[390px] object-cover rounded-t-[10px]"
          src={
            Array.isArray(user?.photo_url)
              ? user?.photo_url[0]
              : user?.photo_url
          }
        />
        <Button
          onClick={() => setIsMore(false)}
          className="absolute rounded-full z-10 top-4 right-4 p-1 bg-white text-[#0008]"
          variant={"default"}
        >
          <SvgCross className="w-[40px] h-[40px]" />
        </Button>
      </div>
      <div className="absolute w-full max-w-[550px] max-h-[56.5vh] -mt-6 flex h-full flex-col gap-5 p-4 bg-white rounded-[29px] shadow-shadow-block">
        <div className="flex items-center gap-2">
          <p className="text-[24px]">{user?.first_name || "Не указано"},</p>
          <p className="text-[20px]">{user?.age || "Не указано"},</p>
          <div className="flex items-end -ml-2 -mt-1">
            <SvgPoint className="w-[35px] h-[35px] text-[#0005]" />
            <p className="text-[20px]">{user?.city || "Не указано"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center -ml-2">
            <SvgRuler className="w-[40px] h-[40px] fill-[#0005] text-[#0005]" />
            <p className="text-[20px]">
              {user?.height || "Не указано"} {user?.height && "см"}
            </p>
          </div>
          <div className="flex items-center gap-2 -ml-1">
            <SvgTarget className="w-[40px] h-[40px] fill-[#0005]" />
            <p className="text-[18px] pt-1">{user?.goal || "Не указано"}</p>
          </div>
        </div>
        <div className="flex flex-col">
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
