import { useFilterForm } from "@/app/context/filter-form-context.tsx"
import { useState } from "react"
import { useDebounce } from "@/lib/hooks/use-debounce.ts"
import { useGetLocationsQuery } from "@/redux/api/locations.ts"
import type { Locations } from "@/app/types/global.d.ts"
import { motion } from "framer-motion"
import SvgCross from "@/assets/icons/Cross.tsx"
import { useAppDispatch } from "@/redux/hooks.ts"
import { closeLocationsModal } from "@/redux/slices/modal-slice.ts"
import LoadingBalls from "@/shared/ui/loading"

export const LocationsModal = () => {
  const { setValue } = useFilterForm()
  const [inputValue, setInputValue] = useState("")
  const debouncedSearch = useDebounce(inputValue, 700)
  const { data: locations, isLoading } = useGetLocationsQuery({
    search: debouncedSearch,
    limit: 10,
  })
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(closeLocationsModal())
  const handleSelect = (location: Locations) => {
    setValue("city", location.name, { shouldDirty: true })
    setValue("region", location.region, { shouldDirty: true })
    handleClose()
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
          onClick={() => handleClose()}
        />
      </div>
      <div>
        {isLoading ? (
          <LoadingBalls />
        ) : (
          <input
            type="text"
            placeholder="Выберите местоположение"
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value
              const capitalized = value.charAt(0).toUpperCase() + value.slice(1)
              setInputValue(capitalized)
            }}
            className="border p-2 rounded-xl w-full"
          />
        )}

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
