import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { useIsMiniMobile } from "@/shared/lib/hooks/use-media-query.ts"
import { memo } from "react"
import { toggleTheme } from "@/redux/slices/theme-switch.ts"

export const ToggleSwitch = memo(() => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme_switch.theme)
  const isMiniMobile = useIsMiniMobile()
  const activeVariants = {
    light: { x: 2 },
    dark: { x: isMiniMobile ? 31 : 34 },
  }
  return (
    <div
      onClick={() => dispatch(toggleTheme())}
      className="relative flex items-center justify-between w-[65px] h-[35px] mini-mobile:w-[72px] mini-mobile:h-[40px] cursor-pointer bg-[var(--color-bg-toggle)] rounded-full"
    >
      <motion.div
        animate={theme}
        variants={activeVariants}
        transition={{ duration: 0.23, ease: "linear" }}
        className="absolute left-0 w-[32px] h-[32px] mini-mobile:w-[36px] mini-mobile:h-[36px] bg-white rounded-full z-0"
      />
    </div>
  )
})
