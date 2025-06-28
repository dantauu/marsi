import SvgArrow from "@/assets/icons/Arrow"
import SvgLocation from "@/assets/icons/Location"
import { cn } from "@/lib/utils"
import Button from "@/shared/ui/buttons/button.tsx"
import { useCallback } from "react"
import { useFilterForm } from "@/app/providers/filter-form/filter-form-context.tsx"
import { useWatch } from "react-hook-form"

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
    { id: "female", gender: "Женский" },
    { id: "male", gender: "Мужской" },
  ]
  const { setValue, control } = useFilterForm()
  const [ gender ] = useWatch({ control, name: ["gender"] })

  const handleButtonClick = useCallback(
    (button: string) => {
      const buttonIsActive = button === gender
      setValue("gender", buttonIsActive ? "" : button, { shouldDirty: true })
    },
    [gender, setValue]
  )

  const isButtonActive = (button: string) => button === gender

  console.log("ACTIVE", isButtonActive)

  return (
    <div className="flex flex-col gap-2">
      <p className="font-HelveticaB text-[20px]">Пол</p>
      <div className="flex justify-between">
        {genders.map((item) => (
          <Button
            type={"button"}
            key={item.id}
            onClick={() => handleButtonClick(item.id)}
            className={cn(
              `w-[140px] h-[50px] text-[20px] font-ManropeM duration-300 ${isButtonActive(item.id)  && "bg-main-red"}`
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
