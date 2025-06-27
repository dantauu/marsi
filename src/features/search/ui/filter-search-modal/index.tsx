import SvgArrow from "@/assets/icons/Arrow"
import SvgLocation from "@/assets/icons/Location"
import { cn } from "@/lib/utils"
import Button from "@/shared/ui/buttons/button.tsx"
import { useState } from "react"

const Location = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <p className="font-HelveticaB text-[20px]">Местоположение</p>
      </div>
      <div className="h-[60px] flex justify-between items-center px-2 rounded-[10px] bg-black">
        <SvgLocation />
        <div className="flex items-center gap-2">
          <p className="text-white font-ManropeM text-[18px]">
            Москва, Московская область
          </p>
          <SvgArrow className="text-white w-[20px] h-[20px]" />
        </div>
      </div>
    </div>
  )
}

const Gender = () => {
  const genders = [
    { id: 1, gender: "Женский" },
    { id: 2, gender: "Мужской" },
  ]
  const [gender, setGender] = useState("")
  const handleClickItem = ({ gender }: { gender: string }) => {
    setGender(gender)
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-HelveticaB text-[20px]">Пол</p>
      <div className="flex justify-between">
        {genders.map((item) => (
          <Button
            type={"button"}
            key={item.id}
            onClick={() => handleClickItem(item)}
            className={cn(
              `w-[140px] h-[50px] text-[20px] font-ManropeM duration-300 ${gender === item.gender && "bg-main-red"}`
            )}
            variant="green"
          >
            {item.gender}
          </Button>
        ))}
      </div>
    </div>
  )
}

export { Gender, Location }
