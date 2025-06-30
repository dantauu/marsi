import { AnimatePresence } from "framer-motion"
import { useAppSelector } from "@/redux/hooks"
import { motion } from "framer-motion"
import { useCallback } from "react"
import SaveSettingsNav from "@/shared/ui/nav-bar/save-settings-nav.tsx"
import { Gender, Location } from "@/features/search"
import { FilterSlide } from "@/ui"
import { useNavigate } from "@tanstack/react-router"
import { Route } from "@/app/routes/_app/_layout/search"
import { formEmptyValues } from "@/app/providers/filter-form"
import { useWatch } from "react-hook-form"
import { useFilterForm } from "@/app/providers/filter-form/filter-form-context.tsx"
import { useModalDrag } from "@/entities/search/lib/drag"

export const FilterModalForm = () => {
  const form = useFilterForm()
  const { reset, setValue, control } = form
  const navigate = useNavigate({ from: Route.id })
  const { isOpen } = useAppSelector((state) => state.modal)
  const { y, dragStart, handleDrag, handleDragEnd, bgOpacity, dragControls } =
    useModalDrag()

  const resetFilter = () => {
    reset(formEmptyValues)
    navigate({
      search: {
        minAge: undefined,
        maxAge: undefined,
        minHeight: undefined,
        maxHeight: undefined,
        city: undefined,
        region: undefined,
        gender: undefined,
      },
      replace: true,
    })
  }
  const [minAge, maxAge, minHeight, maxHeight] = useWatch({
    control,
    name: ["minAge", "maxAge", "minHeight", "maxHeight"],
  })

  const handleSliderAge = useCallback((values: number[]) => {
    setValue("minAge", values[0], { shouldDirty: true })
    setValue("maxAge", values[1], { shouldDirty: true })
  }, [])

  const handleSliderHeight = useCallback((values: number[]) => {
    setValue("minHeight", values[0], { shouldDirty: true })
    setValue("maxHeight", values[1], { shouldDirty: true })
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ opacity: bgOpacity }}
          className="fixed inset-0 z-10 bg-[#00000087]"
        >
          <motion.div
            className="absolute bottom-0 bg-[#fff] rounded-t-[60px] w-full h-[80%] overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "tween",
              stiffness: 300,
            }}
            drag="y"
            dragDirectionLock
            dragElastic={0.7}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            dragControls={dragControls}
            dragListener={false}
            style={{ y }}
          >
            <motion.div
              className="flex items-center justify-center w-full h-[45px] border-b-2 border-[#e9e7e7]"
              onPointerDown={dragStart}
              onTouchStart={dragStart}
              style={{ touchAction: "none" }}
            >
              <div
                className={`w-[60px] h-[7px] bg-[#0000002c] rounded-full mx-auto `}
              ></div>
            </motion.div>

            <div className="flex flex-col gap-10 pt-[40px] pb-[200px] px-4 overflow-auto h-full">
              <FilterSlide
                title="Возраст"
                values={[minAge, maxAge]}
                setValues={handleSliderAge}
                min={16}
                max={100}
              />
              <FilterSlide
                title="Рост"
                values={[minHeight, maxHeight]}
                setValues={handleSliderHeight}
                min={140}
                max={230}
              />
              <Location />
              <Gender />
              <SaveSettingsNav reset={resetFilter} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
