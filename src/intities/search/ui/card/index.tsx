import type { CardProps } from "../../../../app/types/global"
import Button from "../../../../shared/ui/button"

const Card = ({ avatar, name, age }: CardProps) => {
  return (
    <div className="flex flex-col gap-2 w-[175px] h-[285px]">
      <div className="w-[175px] h-[253.4px] bg-[#c2c1c1] rounded-[28px]">
        <img className="w-full h-full" src={avatar} alt="" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex">
            <div className="">
              <p className="font-ManropeM text-[14.4px]">{name},</p>
            </div>
            <div className="">
              <p className="font-ManropeM text-[14.4px]">{age}</p>
            </div>
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

export default Card
