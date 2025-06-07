import { AnimatePresence, useDragControls } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { motion, useMotionValue, useTransform } from "framer-motion"
import type { PanInfo } from "framer-motion"
import { closeModal } from "@/redux/slices/modal-slice"
import React, { useEffect, useState } from "react"
import { FilterSlide } from "@/shared/ui/filter-slide"
import SaveSettingsNav from "@/shared/ui/save-settings-nav"
import { Gender, Location } from "@/features/search"

export const FilterModal = () => {
  const { isOpen } = useAppSelector((state) => state.modal)
  const [valuesAge, setValuesAge] = useState<number[]>([16, 100])
  const [valuesHight, setValuesHight] = useState<number[]>([140, 230])
  const dispatch = useAppDispatch()
  const dragControls = useDragControls()

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

  const dragStart = (event: React.PointerEvent | React.TouchEvent) => {
    if ("touchEvent" in event) {
      dragControls.start(event as unknown as PointerEvent)
    } else {
      dragControls.start(event.nativeEvent as PointerEvent)
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

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

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

              <div className="flex flex-col gap-10 pt-[40px] pb-[100px] px-4 overflow-auto h-full">
                <FilterSlide
                  title="Возраст"
                  values={valuesAge}
                  setValues={setValuesAge}
                  min={16}
                  max={100}
                />
                <FilterSlide
                  title="Рост"
                  values={valuesHight}
                  setValues={setValuesHight}
                  min={140}
                  max={230}
                />
                <Location />
                <Gender />
                <SaveSettingsNav />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
