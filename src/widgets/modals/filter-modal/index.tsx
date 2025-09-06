import { AnimatePresence } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { motion } from "framer-motion"
import { useCallback } from "react"
import { Gender, Location } from "@/features/search"
import { FilterSlide } from "@/ui"
import { formEmptyValues } from "@/app/providers/filter-form"
import { useWatch } from "react-hook-form"
import { useFilterForm } from "@/app/context/filter-form-context.tsx"
import { useModalDrag } from "@/lib/utils/modal-drag"
import SaveSettingsFilter from "@/widgets/nav-bar/save-settings-filter"
import { resetFilters } from "@/redux/slices/filer-store.ts"

export const FilterModal = () => {
  const form = useFilterForm()
  const { reset, setValue, control } = form
  const { isFilterOpen } = useAppSelector((state) => state.modal)
  const { y, dragStart, handleDrag, handleDragEnd, bgOpacity, dragControls } =
    useModalDrag()
  const dispatch = useAppDispatch()

  const resetFilter = () => {
    reset(formEmptyValues)
    sessionStorage.removeItem("searchFilters")
    dispatch(resetFilters())
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
      {isFilterOpen && (
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

            <div className="flex flex-col gap-10 pt-[40px] pb-[200px] px-2 overflow-auto h-full">
              <FilterSlide
                title="Возраст"
                values={[minAge ?? 16, maxAge ?? 100]}
                setValues={handleSliderAge}
                min={16}
                max={100}
              />
              <FilterSlide
                title="Рост"
                values={[minHeight ?? 120, maxHeight ?? 230]}
                setValues={handleSliderHeight}
                min={120}
                max={230}
              />
              <Location />
              <Gender />
              <SaveSettingsFilter reset={resetFilter} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
