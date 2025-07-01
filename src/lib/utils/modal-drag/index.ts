import { useAppDispatch } from "@/redux/hooks.ts"
import {
  type PanInfo,
  useDragControls,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { closeFilterModal } from "@/redux/slices/modal-slice.ts"
import React from "react"

export const useModalDrag = () => {
  const dispatch = useAppDispatch()
  const dragControls = useDragControls()

  const y = useMotionValue(0)
  const bgOpacity = useTransform(y, [-50, 0, 700], [1, 1, 0])

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      dispatch(closeFilterModal())
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

  return {
    y,
    handleDrag,
    dragStart,
    handleDragEnd,
    dragControls,
    bgOpacity,
  }
}
