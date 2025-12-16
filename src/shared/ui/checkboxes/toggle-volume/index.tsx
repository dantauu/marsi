import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { useIsMiniMobile } from "@/shared/lib/hooks/use-media-query.ts"
import { memo } from "react"
import { toggleMute } from "@/redux/slices/volume.ts"

export const ToggleNotifyVolume = memo(() => {
  const dispatch = useAppDispatch()
  const muted = useAppSelector((state) => state.volume.muted)
  const isMiniMobile = useIsMiniMobile()
  const variants = {
    off: { x: 2 },
    on: { x: isMiniMobile ? 31 : 34 },
  }
  return (
    <div
      onClick={() => dispatch(toggleMute())}
      className={`relative flex items-center justify-between w-[65px] h-[35px] mini-mobile:w-[72px] mini-mobile:h-[40px] cursor-pointer rounded-full ${muted ? "bg-[#bebebe]" : "bg-[#38d4af]"}`}
    >
      <motion.div
        animate={muted ? "off" : "on"}
        variants={variants}
        transition={{ duration: 0.23, ease: "linear" }}
        className="absolute left-0 w-[32px] h-[32px] mini-mobile:w-[36px] mini-mobile:h-[36px] bg-white rounded-full z-0"
      />
    </div>
  )
})
