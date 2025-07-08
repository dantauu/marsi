import type { UserCardSearch } from "@/app/types/global.d.ts"
import Button from "@/shared/ui/buttons/button.tsx"

export const Card = ({ avatar, username, age }: UserCardSearch) => {
  return (
    <div className="flex flex-col gap-2 w-[182px] h-[285px]">
      <div className="w-[182px] h-[253.4px] object-cover bg-[#c2c1c1] rounded-[28px]">
        <img className="w-full h-full rounded-[28px]" src={avatar} alt="" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex">
            <p className="font-ManropeM text-[14.4px]">
              {username}, {age}
            </p>
          </div>
          <div className="w-[8px] h-[8px] bg-main-green rounded-full"></div>
        </div>
        <Button
          className="font-ManropeM w-[80px] h-[28px] text-[13.5px]"
          variant="green"
        >
          Написать
        </Button>
      </div>
    </div>
  )
}
