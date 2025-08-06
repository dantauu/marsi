import SvgArrow from "@/assets/icons/Arrow"
import SvgLocation from "@/assets/icons/Location"
import { cn } from "@/lib/utils/cn.tsx"
import Button from "@/shared/ui/buttons/button.tsx"
import { useCallback } from "react"
import { useFilterForm } from "@/app/context/filter-form-context.tsx"
import { useWatch } from "react-hook-form"
import { AnimatePresence } from "framer-motion"
import { LocationsModal } from "@/widgets/modals/locations-modal"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { openLocationsModal } from "@/redux/slices/modal-slice.ts"

const Location = () => {
  const { control } = useFilterForm()
  const { isLocationsOpen } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const handleOpenModal = () => {
    dispatch(openLocationsModal())
  }
  const [city, region] = useWatch({ control, name: ["city", "region"] })
  return (
    <>
      <div onClick={() => handleOpenModal()} className="flex flex-col gap-2">
        <div className="">
          <p className="font-HelveticaB text-[20px]">Местоположение</p>
        </div>
        <div className="h-[60px] w-full flex justify-center items-center px-1 rounded-[10px] gap-2 bg-black">
          {!city && (
            <SvgLocation className="w-[34px] h-[36px] mini-mobile:w-[44px] mini-mobile:h-[46px]" />
          )}
          <div className="flex items-center gap-2">
            <p className="text-white font-ManropeM text-[15.5px] mini-mobile:text-[17.5px]">
              {city ? `${city}, ${region}` : "Выберите мастоположение"}
            </p>
            {!city && <SvgArrow className="text-white w-[20px] h-[20px]" />}
          </div>
        </div>
      </div>
      <AnimatePresence>{isLocationsOpen && <LocationsModal />}</AnimatePresence>
    </>
  )
}

const Gender = () => {
  const genders = [
    { id: "female", gender: "Женский" },
    { id: "male", gender: "Мужской" },
  ]
  const { setValue, control } = useFilterForm()
  const [gender] = useWatch({ control, name: ["gender"] })

  const handleButtonClick = useCallback(
    (button: string) => {
      const buttonIsActive = button === gender
      setValue("gender", buttonIsActive ? "" : button, {
        shouldDirty: true,
      })
    },
    [gender, setValue]
  )

  const isButtonActive = (button: string) => button === gender

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
              `w-[130px] h-[45px] mini-mobile:w-[140px] mini-mobile:h-[50px] mini-mobile:text-[20px] text-[18px] font-ManropeM duration-300 ${isButtonActive(item.id) && "bg-main-red"}`
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
