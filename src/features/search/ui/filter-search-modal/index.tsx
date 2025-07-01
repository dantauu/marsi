import SvgArrow from "@/assets/icons/Arrow"
import SvgLocation from "@/assets/icons/Location"
import { cn } from "@/lib/utils"
import Button from "@/shared/ui/buttons/button.tsx"
import { useCallback, useState } from "react"
import { useFilterForm } from "@/app/providers/filter-form/filter-form-context.tsx"
import { useWatch } from "react-hook-form"
import { useDebounce } from "@/lib/hooks/use-debounce.ts"
import { useGetLocationsQuery } from "@/redux/api/locations.ts"
import type { Locations } from "@/app/types/global.ts"
import { AnimatePresence, motion } from "framer-motion"
import SvgCross from "@/assets/icons/Cross.tsx"

const Location = () => {
  const [open, setOpen] = useState(false)
  const { control } = useFilterForm()
  const [city, region] = useWatch({ control, name: ["city", "region"] })
  return (
    <>
      <div onClick={() => setOpen(true)} className="flex flex-col gap-2">
        <div className="">
          <p className="font-HelveticaB text-[20px]">Местоположение</p>
        </div>
        <div className="h-[60px] flex justify-start items-center px-2 rounded-[10px] gap-2 bg-black">
          <SvgLocation />
          <div className="w-full flex justify-between items-center gap-2">
            <p className="text-white font-ManropeM text-[18px]">
              {city ? `${city}, ${region}` : "Выберите мастоположение"}
            </p>
            <SvgArrow className="text-white w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && <LocationsModal setOpen={setOpen} />}
      </AnimatePresence>
    </>
  )
}

const LocationsModal = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { setValue } = useFilterForm()
  const [inputValue, setInputValue] = useState("")
  const debouncedSearch = useDebounce(inputValue, 700)
  const { data: locations, isLoading } = useGetLocationsQuery({
    search: debouncedSearch,
    limit: 10,
  })
  const handleSelect = (location: Locations) => {
    setValue("city", location.name, { shouldDirty: true })
    setValue("region", location.region, { shouldDirty: true })
    setOpen(false)
  }
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{
        type: "tween",
        stiffness: 300,
      }}
      className="absolute px-2 left-0 bottom-0 z-60 w-full h-full bg-[#fff]"
    >
      <div className="relative py-5 flex justify-center items-center">
        <h1 className="font-HelveticaB text-[21px]">Местположение</h1>
        <SvgCross
          className="absolute right-5 h-10 w-10 text-main-red"
          onClick={() => setOpen(false)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Откуда вы ?"
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value
            const capitalized = value.charAt(0).toUpperCase() + value.slice(1)
            setInputValue(capitalized)
          }}
          className="border p-2 rounded-xl w-full"
        />

        {isLoading && <p>Загрузка...</p>}

        <div className="pt-7 flex flex-col gap-4">
          {locations?.length ? (
            <>
              {locations?.map((item) => (
                <p
                  className="font-ManropeM"
                  onClick={() => handleSelect(item)}
                  key={item.id}
                >
                  {item.name}, {item.region}
                </p>
              ))}
            </>
          ) : (
            <p className="text-2xl">Ничего не найдено</p>
          )}
        </div>
      </div>
    </motion.div>
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
      setValue("gender", buttonIsActive ? button : button, {
        shouldDirty: true,
      })
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
              `w-[140px] h-[50px] text-[20px] font-ManropeM duration-300 ${isButtonActive(item.id) && "bg-main-red"}`
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
