import { AnimatePresence } from "framer-motion"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { motion, useMotionValue, useTransform } from "framer-motion"
import type { PanInfo } from "framer-motion"
import { closeModal } from "../../../../redux/slices/modal-slice"
import { SliderRange } from "../../../../features/search/ui/slider-range"
import { useState } from "react"

const FilterModal = () => {
  const { isOpen } = useAppSelector((state) => state.modal)
  const [values, setValues] = useState<number[]>([16, 100])

  const dispatch = useAppDispatch()

  const y = useMotionValue(0)
  const bgOpacity = useTransform(y, [-50, 0, 700], [1, 1, 0])

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      dispatch(closeModal())
    }
  }

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y < 0) {
      y.set(0)
    }
  }

  return (
    <>
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
              className="absolute bottom-0 bg-[#fff] rounded-t-[60px] w-full h-[600px] overflow-hidden"
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
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              style={{ y }}
            >
              <div className="w-[50px] h-[4px] bg-gray-600 rounded-full mx-auto mt-[12px] mb-[20px]" />

              <div className="px-6">
                <h2 className="text-black text-xl font-ManropeEB mb-4">
                  Фильтры
                </h2>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between">
                    <span className="font-ManropeM text-black text-[18px]">
                      От {values[0]}
                    </span>
                    <span className="font-ManropeM text-black text-[18px]">
                      До {values[1]}
                    </span>
                  </div>
                  <SliderRange
                    defaultValue={values}
                    value={values}
                    onValueChange={setValues}
                    step={1}
                    min={16}
                    max={100}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FilterModal
